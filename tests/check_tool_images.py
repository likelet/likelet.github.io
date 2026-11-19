"""Check generated tool card images: python tests/check_tool_images.py BUILD_DIR."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
import sys
import unittest

BUILD = Path(sys.argv.pop(1))
SOURCE = Path(__file__).resolve().parents[1]


class ToolImages(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.images = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'img' and 'card-img-top' in attrs.get('class', '').split():
            self.images.append(attrs)


class RenderedToolImages(unittest.TestCase):
    def test_every_tool_has_a_published_preview(self):
        images = ToolImages((BUILD / 'tool-db/index.html').read_text(encoding='utf-8')).images
        tools = list((SOURCE / 'content/tool-db').glob('*/index.md'))
        self.assertEqual(len(images), len(tools))
        self.assertGreater(len(images), 0)
        self.assertEqual(len({image['alt'] for image in images}), len(images))
        for image in images:
            with self.subTest(src=image.get('src')):
                path = urlparse(image['src']).path
                self.assertTrue(path, 'Image URL must have a real file path')
                self.assertNotIn('ZgotmplZ', image['src'])
                resource = BUILD / unquote(path).lstrip('/')
                self.assertTrue(resource.is_file(), str(resource))
                data = resource.read_bytes()
                self.assertEqual(data[:4], b'RIFF')
                self.assertEqual(data[8:12], b'WEBP')
                self.assertGreater(int(image['width']), 0)
                self.assertGreater(int(image['height']), 0)


if __name__ == '__main__':
    unittest.main()

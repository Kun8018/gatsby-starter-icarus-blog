// s = Small Square (90×90)
// b = Big Square (160×160)
// t = Small Thumbnail (160×160)
// m = Medium Thumbnail (320×320)
// l = Large Thumbnail (640×640)
// h = Huge Thumbnail (1024×1024)
const defaultPicture = 'M795H8A.jpg';

const parseImgur = (rawImage: string) => {
  if (!rawImage) {
    return `https://i.imgur.com/${defaultPicture}`;
  }

  // Don't resize the png image
  // as there is a transparent bug in imgur
  if (rawImage.match('(png)|(gif)')) {
    // Prevent double http url
    if (rawImage.match('http')) {
      return rawImage;
    }
    return `https://i.imgur.com/${rawImage}`;
  }

  // Prevent double http url
  if (rawImage.match('http') || rawImage.match('https')) {
    return rawImage;
  }
  return `https://i.imgur.com/${rawImage}`;
};

const parseTitle = (title: string, text: string) => `title="${title || text}"`;

const parseImageTag = ({ href, title, text }: { href: string; title: string; text: string }) =>
  `<img class="lozad d-block mx-auto" data-src=${parseImgur(href)} ${parseTitle(title, text)} />`;

const getGalleryImage = ({ href, title, text }: { href: string; title: string; text: string }) =>
  `<a data-fancybox="gallery" href="${parseImgur(href)}">${parseImageTag({
    href,
    title,
    text,
  })}</a>`;

module.exports = {
  parseImgur,
  parseImageTag,
  getGalleryImage,
};

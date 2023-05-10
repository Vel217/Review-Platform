const parseLinks = (str) => {
  if (str === "") {
    return null;
  } else {
    const links = str.split(",");
    const result = [];

    for (let i = 0; i < links.length; i++) {
      const link = links[i].trim();
      if (link.match(/^https?:\/\/.*\.(png|jpg|jpeg|gif)$/i)) {
        result.push(link);
      }
    }

    return result;
  }
};
export default parseLinks;

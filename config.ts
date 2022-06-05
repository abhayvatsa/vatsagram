// https://support.squarespace.com/hc/en-us/articles/206542517-Formatting-your-images-for-display-on-the-web
export const postWidths = [2500, 1500, 1000, 750, 500, 300, 100]; // Squarespace creates seven images sizes listed
export const gridWidths = [750, 500, 300, 100]; // Approximately 1/3 of biggest above. (Grid row has three images)

export const extension = "jpeg";
export const formats = ["webp", "jpeg"]; // Order matters (in order of preference)

export const IMAGES_PER_ROW = 3;
export const NUM_ROWS = 7; // This is # of rows visible for portrait iPhone XL
export const IMAGES_PER_PAGE = IMAGES_PER_ROW * NUM_ROWS;

export const cdn = process.env.CDN_HOST
  ? `http://${process.env.CDN_HOST}:3000`
  : "https://avcdn.now.sh";

// These were guess + check. Maybe optimize?
export const sigma1 = 1.25;
export const gridPreviewSize = 150;
export const sigma2 = 1;
export const postPreviewSize = 300;

// Analytics
export const gaTrackingId = "UA-68683310-2";

// Meta
export const domainName = "vatsagram.com";
export const description = "Vatsagram. Photos first.";
export const author = "Abhay Vatsa, @abhayvatsa";

export const ogImageDefault = "/camera.png";
export const appleIcon = { size: "128x128", href: ogImageDefault };

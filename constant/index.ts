const constants = {
  baseApiUrl: process.env.NEXT_PUBLIC_API_URL || "http://192.168.7.42:4008/api",
};

export const config = {
  imageUnoptimized: true,
};
export default constants;

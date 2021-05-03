import * as crypto from "crypto";

export const maybeGetuserIpAddress = (request : any): any => {
    const headers = request.headers;
    if (!headers) return null;
    const ipAddress = headers['x-forwarded-for'];
    if (!ipAddress) return null;
    return ipAddress;
  };


export const hashData = (data:string): string => {
    const hash = crypto.createHash("md5");
    hash.update(data);
    return hash.digest("hex");
  }
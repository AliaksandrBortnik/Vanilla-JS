import {API_TIMEOUT_SEC} from "./config";

const timeout = (s) => {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async (url) => {
  const response = await Promise.race([
    fetch(url),
    timeout(API_TIMEOUT_SEC)
  ]);

  const data = await response.json();
  if (!response.ok) throw new Error(`No luck getting data. ${data.message}. ${data.status}`);

  return data;
}
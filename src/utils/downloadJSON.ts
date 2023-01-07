/**
 * 将对象导出为 JSON
 * @param data 导出对象
 * @param filename 文件名称
 */
export function downloadJSON<T = object>(data: T, filename: string): void {
  let countryStr = "";
  if (!data) {
    alert("保存的数据为空");
    return;
  }
  if (!filename) filename = "json.json";
  if (typeof data === "object") {
    countryStr = JSON.stringify(data, undefined, 4);
  }
  var blob = new Blob([countryStr], { type: "text/json" }),
    e = document.createEvent("MouseEvents"),
    a = document.createElement("a");
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  e.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
}

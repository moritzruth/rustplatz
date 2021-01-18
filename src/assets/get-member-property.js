export function getMemberProperty(member, propertyName) {
  return typeof member === "string" ? member : member[propertyName]
}

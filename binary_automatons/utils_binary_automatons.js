function copyCSSProperties(node, clonedNode) {
  const styles = window.getComputedStyle(node);
  if (styles.cssText !== '') {
    clonedNode.style.cssText = styles.cssText;
  } else {
    const cssText = Object.values(styles).reduce(
      (css, propertyName) =>
        `${css}${propertyName}:${styles.getPropertyValue(
          propertyName
        )};`
    );

    clonedNode.style.cssText = cssText
  }
}

function get2DArrayString(arr2d) {
  var s = "[";
  for (var y = 0; y < arr2d.length; ++y) {
    var row = arr2d[y];
    var s_inner = "["

    for (var x = 0; x < row.length; ++x) {
      var val = row[x];
      s_inner += val.toString() + ", ";
    }

    s += s_inner + "], ";
  }
  s += "]";
  return s
}

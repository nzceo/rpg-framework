function solveQuadraticEquation(a: any, b: any, c: any) {
    var discriminant = b * b - 4 * a * c;
  
    if (discriminant < 0) {
      return [];
    } else {
      return [
        (-b + Math.sqrt(discriminant)) / (2 * a),
        (-b - Math.sqrt(discriminant)) / (2 * a)
      ];
    }
  }
  
  function solveCubicEquation(a: any, b: any, c: any, d: any) {
    if (!a) return solveQuadraticEquation(b, c, d);
  
    b /= a;
    c /= a;
    d /= a;
  
    var p = (3 * c - b * b) / 3;
    var q = (2 * b * b * b - 9 * b * c + 27 * d) / 27;
  
    if (p === 0) {
      return [Math.pow(-q, 1 / 3)];
    } else if (q === 0) {
      return [Math.sqrt(-p), -Math.sqrt(-p)];
    } else {
      var discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);
  
      if (discriminant === 0) {
        return [Math.pow(q / 2, 1 / 3) - b / 3];
      } else if (discriminant > 0) {
        return [
          Math.pow(-(q / 2) + Math.sqrt(discriminant), 1 / 3) -
            Math.pow(q / 2 + Math.sqrt(discriminant), 1 / 3) -
            b / 3
        ];
      } else {
        var r = Math.sqrt(Math.pow(-(p / 3), 3));
        var phi = Math.acos(-(q / (2 * Math.sqrt(Math.pow(-(p / 3), 3)))));
  
        var s = 2 * Math.pow(r, 1 / 3);
  
        return [
          s * Math.cos(phi / 3) - b / 3,
          s * Math.cos((phi + 2 * Math.PI) / 3) - b / 3,
          s * Math.cos((phi + 4 * Math.PI) / 3) - b / 3
        ];
      }
    }
  }
  
  function roundToDecimal(num: any, dec: any) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  }
  
  export function solveCubicBezier(
    p0: number,
    p1: number,
    p2: number,
    p3: number,
    x: number
  ) {
    p0 -= x;
    p1 -= x;
    p2 -= x;
    p3 -= x;
  
    // var a = p3 - 3 * p2 + 3 * p1 - p0;
    // var b = 3 * p2 - 6 * p1 + 3 * p0;
    // var c = 3 * p1 - 3 * p0;
    // var d = p0;
  
    var roots = solveCubicEquation(
      p3 - 3 * p2 + 3 * p1 - p0,
      3 * p2 - 6 * p1 + 3 * p0,
      3 * p1 - 3 * p0,
      p0
    );
  
    var result = [];
    var root;
    for (var i = 0; i < roots.length; i++) {
      root = roundToDecimal(roots[i], 15);
      if (root >= 0 && root <= 1) result.push(root);
    }
  
    return result;
  }
  
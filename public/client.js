var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS((exports, module) => {
  var Events = function() {
  };
  var EE = function(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  };
  var addListener = function(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt])
      emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
      emitter._events[evt].push(listener);
    else
      emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
  };
  var clearEvent = function(emitter, evt) {
    if (--emitter._eventsCount === 0)
      emitter._events = new Events;
    else
      delete emitter._events[evt];
  };
  var EventEmitter = function() {
    this._events = new Events;
    this._eventsCount = 0;
  };
  var has = Object.prototype.hasOwnProperty;
  var prefix = "~";
  if (Object.create) {
    Events.prototype = Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
      return names;
    for (name in events = this._events) {
      if (has.call(events, name))
        names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers)
      return [];
    if (handlers.fn)
      return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l);i < l; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners)
      return 0;
    if (listeners.fn)
      return 1;
    return listeners.length;
  };
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, undefined, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1);i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0;i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, undefined, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1);j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };
  EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length;i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else
        clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt])
        clearEvent(this, evt);
    } else {
      this._events = new Events;
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;
  EventEmitter.prefixed = prefix;
  EventEmitter.EventEmitter = EventEmitter;
  if (typeof module !== "undefined") {
    module.exports = EventEmitter;
  }
});

// node_modules/earcut/src/earcut.js
var require_earcut = __commonJS((exports, module) => {
  var earcut = function(data, holeIndices, dim) {
    dim = dim || 2;
    var hasHoles = holeIndices && holeIndices.length, outerLen = hasHoles ? holeIndices[0] * dim : data.length, outerNode = linkedList(data, 0, outerLen, dim, true), triangles = [];
    if (!outerNode || outerNode.next === outerNode.prev)
      return triangles;
    var minX, minY, maxX, maxY, x, y, invSize;
    if (hasHoles)
      outerNode = eliminateHoles(data, holeIndices, outerNode, dim);
    if (data.length > 80 * dim) {
      minX = maxX = data[0];
      minY = maxY = data[1];
      for (var i = dim;i < outerLen; i += dim) {
        x = data[i];
        y = data[i + 1];
        if (x < minX)
          minX = x;
        if (y < minY)
          minY = y;
        if (x > maxX)
          maxX = x;
        if (y > maxY)
          maxY = y;
      }
      invSize = Math.max(maxX - minX, maxY - minY);
      invSize = invSize !== 0 ? 32767 / invSize : 0;
    }
    earcutLinked(outerNode, triangles, dim, minX, minY, invSize, 0);
    return triangles;
  };
  var linkedList = function(data, start, end, dim, clockwise) {
    var i, last;
    if (clockwise === signedArea(data, start, end, dim) > 0) {
      for (i = start;i < end; i += dim)
        last = insertNode(i, data[i], data[i + 1], last);
    } else {
      for (i = end - dim;i >= start; i -= dim)
        last = insertNode(i, data[i], data[i + 1], last);
    }
    if (last && equals(last, last.next)) {
      removeNode(last);
      last = last.next;
    }
    return last;
  };
  var filterPoints = function(start, end) {
    if (!start)
      return start;
    if (!end)
      end = start;
    var p = start, again;
    do {
      again = false;
      if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
        removeNode(p);
        p = end = p.prev;
        if (p === p.next)
          break;
        again = true;
      } else {
        p = p.next;
      }
    } while (again || p !== end);
    return end;
  };
  var earcutLinked = function(ear, triangles, dim, minX, minY, invSize, pass) {
    if (!ear)
      return;
    if (!pass && invSize)
      indexCurve(ear, minX, minY, invSize);
    var stop = ear, prev, next;
    while (ear.prev !== ear.next) {
      prev = ear.prev;
      next = ear.next;
      if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
        triangles.push(prev.i / dim | 0);
        triangles.push(ear.i / dim | 0);
        triangles.push(next.i / dim | 0);
        removeNode(ear);
        ear = next.next;
        stop = next.next;
        continue;
      }
      ear = next;
      if (ear === stop) {
        if (!pass) {
          earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);
        } else if (pass === 1) {
          ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
          earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);
        } else if (pass === 2) {
          splitEarcut(ear, triangles, dim, minX, minY, invSize);
        }
        break;
      }
    }
  };
  var isEar = function(ear) {
    var a = ear.prev, b = ear, c = ear.next;
    if (area(a, b, c) >= 0)
      return false;
    var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;
    var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
    var p = c.next;
    while (p !== a) {
      if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
        return false;
      p = p.next;
    }
    return true;
  };
  var isEarHashed = function(ear, minX, minY, invSize) {
    var a = ear.prev, b = ear, c = ear.next;
    if (area(a, b, c) >= 0)
      return false;
    var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;
    var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
    var minZ = zOrder(x0, y0, minX, minY, invSize), maxZ = zOrder(x1, y1, minX, minY, invSize);
    var { prevZ: p, nextZ: n } = ear;
    while (p && p.z >= minZ && n && n.z <= maxZ) {
      if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
        return false;
      p = p.prevZ;
      if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0)
        return false;
      n = n.nextZ;
    }
    while (p && p.z >= minZ) {
      if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
        return false;
      p = p.prevZ;
    }
    while (n && n.z <= maxZ) {
      if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0)
        return false;
      n = n.nextZ;
    }
    return true;
  };
  var cureLocalIntersections = function(start, triangles, dim) {
    var p = start;
    do {
      var a = p.prev, b = p.next.next;
      if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
        triangles.push(a.i / dim | 0);
        triangles.push(p.i / dim | 0);
        triangles.push(b.i / dim | 0);
        removeNode(p);
        removeNode(p.next);
        p = start = b;
      }
      p = p.next;
    } while (p !== start);
    return filterPoints(p);
  };
  var splitEarcut = function(start, triangles, dim, minX, minY, invSize) {
    var a = start;
    do {
      var b = a.next.next;
      while (b !== a.prev) {
        if (a.i !== b.i && isValidDiagonal(a, b)) {
          var c = splitPolygon(a, b);
          a = filterPoints(a, a.next);
          c = filterPoints(c, c.next);
          earcutLinked(a, triangles, dim, minX, minY, invSize, 0);
          earcutLinked(c, triangles, dim, minX, minY, invSize, 0);
          return;
        }
        b = b.next;
      }
      a = a.next;
    } while (a !== start);
  };
  var eliminateHoles = function(data, holeIndices, outerNode, dim) {
    var queue = [], i, len, start, end, list;
    for (i = 0, len = holeIndices.length;i < len; i++) {
      start = holeIndices[i] * dim;
      end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
      list = linkedList(data, start, end, dim, false);
      if (list === list.next)
        list.steiner = true;
      queue.push(getLeftmost(list));
    }
    queue.sort(compareX);
    for (i = 0;i < queue.length; i++) {
      outerNode = eliminateHole(queue[i], outerNode);
    }
    return outerNode;
  };
  var compareX = function(a, b) {
    return a.x - b.x;
  };
  var eliminateHole = function(hole, outerNode) {
    var bridge = findHoleBridge(hole, outerNode);
    if (!bridge) {
      return outerNode;
    }
    var bridgeReverse = splitPolygon(bridge, hole);
    filterPoints(bridgeReverse, bridgeReverse.next);
    return filterPoints(bridge, bridge.next);
  };
  var findHoleBridge = function(hole, outerNode) {
    var p = outerNode, hx = hole.x, hy = hole.y, qx = (-Infinity), m;
    do {
      if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
        var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
        if (x <= hx && x > qx) {
          qx = x;
          m = p.x < p.next.x ? p : p.next;
          if (x === hx)
            return m;
        }
      }
      p = p.next;
    } while (p !== outerNode);
    if (!m)
      return null;
    var stop = m, mx = m.x, my = m.y, tanMin = Infinity, tan;
    p = m;
    do {
      if (hx >= p.x && p.x >= mx && hx !== p.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
        tan = Math.abs(hy - p.y) / (hx - p.x);
        if (locallyInside(p, hole) && (tan < tanMin || tan === tanMin && (p.x > m.x || p.x === m.x && sectorContainsSector(m, p)))) {
          m = p;
          tanMin = tan;
        }
      }
      p = p.next;
    } while (p !== stop);
    return m;
  };
  var sectorContainsSector = function(m, p) {
    return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
  };
  var indexCurve = function(start, minX, minY, invSize) {
    var p = start;
    do {
      if (p.z === 0)
        p.z = zOrder(p.x, p.y, minX, minY, invSize);
      p.prevZ = p.prev;
      p.nextZ = p.next;
      p = p.next;
    } while (p !== start);
    p.prevZ.nextZ = null;
    p.prevZ = null;
    sortLinked(p);
  };
  var sortLinked = function(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize, inSize = 1;
    do {
      p = list;
      list = null;
      tail = null;
      numMerges = 0;
      while (p) {
        numMerges++;
        q = p;
        pSize = 0;
        for (i = 0;i < inSize; i++) {
          pSize++;
          q = q.nextZ;
          if (!q)
            break;
        }
        qSize = inSize;
        while (pSize > 0 || qSize > 0 && q) {
          if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
            e = p;
            p = p.nextZ;
            pSize--;
          } else {
            e = q;
            q = q.nextZ;
            qSize--;
          }
          if (tail)
            tail.nextZ = e;
          else
            list = e;
          e.prevZ = tail;
          tail = e;
        }
        p = q;
      }
      tail.nextZ = null;
      inSize *= 2;
    } while (numMerges > 1);
    return list;
  };
  var zOrder = function(x, y, minX, minY, invSize) {
    x = (x - minX) * invSize | 0;
    y = (y - minY) * invSize | 0;
    x = (x | x << 8) & 16711935;
    x = (x | x << 4) & 252645135;
    x = (x | x << 2) & 858993459;
    x = (x | x << 1) & 1431655765;
    y = (y | y << 8) & 16711935;
    y = (y | y << 4) & 252645135;
    y = (y | y << 2) & 858993459;
    y = (y | y << 1) & 1431655765;
    return x | y << 1;
  };
  var getLeftmost = function(start) {
    var p = start, leftmost = start;
    do {
      if (p.x < leftmost.x || p.x === leftmost.x && p.y < leftmost.y)
        leftmost = p;
      p = p.next;
    } while (p !== start);
    return leftmost;
  };
  var pointInTriangle = function(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) >= (ax - px) * (cy - py) && (ax - px) * (by - py) >= (bx - px) * (ay - py) && (bx - px) * (cy - py) >= (cx - px) * (by - py);
  };
  var isValidDiagonal = function(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && (area(a.prev, a, b.prev) || area(a, b.prev, b)) || equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0);
  };
  var area = function(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  };
  var equals = function(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
  };
  var intersects = function(p1, q1, p2, q2) {
    var o1 = sign(area(p1, q1, p2));
    var o2 = sign(area(p1, q1, q2));
    var o3 = sign(area(p2, q2, p1));
    var o4 = sign(area(p2, q2, q1));
    if (o1 !== o2 && o3 !== o4)
      return true;
    if (o1 === 0 && onSegment(p1, p2, q1))
      return true;
    if (o2 === 0 && onSegment(p1, q2, q1))
      return true;
    if (o3 === 0 && onSegment(p2, p1, q2))
      return true;
    if (o4 === 0 && onSegment(p2, q1, q2))
      return true;
    return false;
  };
  var onSegment = function(p, q, r) {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
  };
  var sign = function(num) {
    return num > 0 ? 1 : num < 0 ? -1 : 0;
  };
  var intersectsPolygon = function(a, b) {
    var p = a;
    do {
      if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b))
        return true;
      p = p.next;
    } while (p !== a);
    return false;
  };
  var locallyInside = function(a, b) {
    return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
  };
  var middleInside = function(a, b) {
    var p = a, inside = false, px = (a.x + b.x) / 2, py = (a.y + b.y) / 2;
    do {
      if (p.y > py !== p.next.y > py && p.next.y !== p.y && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x)
        inside = !inside;
      p = p.next;
    } while (p !== a);
    return inside;
  };
  var splitPolygon = function(a, b) {
    var a2 = new Node(a.i, a.x, a.y), b2 = new Node(b.i, b.x, b.y), an = a.next, bp = b.prev;
    a.next = b;
    b.prev = a;
    a2.next = an;
    an.prev = a2;
    b2.next = a2;
    a2.prev = b2;
    bp.next = b2;
    b2.prev = bp;
    return b2;
  };
  var insertNode = function(i, x, y, last) {
    var p = new Node(i, x, y);
    if (!last) {
      p.prev = p;
      p.next = p;
    } else {
      p.next = last.next;
      p.prev = last;
      last.next.prev = p;
      last.next = p;
    }
    return p;
  };
  var removeNode = function(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;
    if (p.prevZ)
      p.prevZ.nextZ = p.nextZ;
    if (p.nextZ)
      p.nextZ.prevZ = p.prevZ;
  };
  var Node = function(i, x, y) {
    this.i = i;
    this.x = x;
    this.y = y;
    this.prev = null;
    this.next = null;
    this.z = 0;
    this.prevZ = null;
    this.nextZ = null;
    this.steiner = false;
  };
  var signedArea = function(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim;i < end; i += dim) {
      sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
      j = i;
    }
    return sum;
  };
  module.exports = earcut;
  module.exports.default = earcut;
  earcut.deviation = function(data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;
    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) {
      for (var i = 0, len = holeIndices.length;i < len; i++) {
        var start = holeIndices[i] * dim;
        var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        polygonArea -= Math.abs(signedArea(data, start, end, dim));
      }
    }
    var trianglesArea = 0;
    for (i = 0;i < triangles.length; i += 3) {
      var a = triangles[i] * dim;
      var b = triangles[i + 1] * dim;
      var c = triangles[i + 2] * dim;
      trianglesArea += Math.abs((data[a] - data[c]) * (data[b + 1] - data[a + 1]) - (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }
    return polygonArea === 0 && trianglesArea === 0 ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
  };
  earcut.flatten = function(data) {
    var dim = data[0][0].length, result = { vertices: [], holes: [], dimensions: dim }, holeIndex = 0;
    for (var i = 0;i < data.length; i++) {
      for (var j = 0;j < data[i].length; j++) {
        for (var d = 0;d < dim; d++)
          result.vertices.push(data[i][j][d]);
      }
      if (i > 0) {
        holeIndex += data[i - 1].length;
        result.holes.push(holeIndex);
      }
    }
    return result;
  };
});

// node_modules/@pixi/constants/lib/index.mjs
var ENV = ((ENV2) => (ENV2[ENV2.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", ENV2[ENV2.WEBGL = 1] = "WEBGL", ENV2[ENV2.WEBGL2 = 2] = "WEBGL2", ENV2))(ENV || {});
var RENDERER_TYPE = ((RENDERER_TYPE2) => (RENDERER_TYPE2[RENDERER_TYPE2.UNKNOWN = 0] = "UNKNOWN", RENDERER_TYPE2[RENDERER_TYPE2.WEBGL = 1] = "WEBGL", RENDERER_TYPE2[RENDERER_TYPE2.CANVAS = 2] = "CANVAS", RENDERER_TYPE2))(RENDERER_TYPE || {});
var BUFFER_BITS = ((BUFFER_BITS2) => (BUFFER_BITS2[BUFFER_BITS2.COLOR = 16384] = "COLOR", BUFFER_BITS2[BUFFER_BITS2.DEPTH = 256] = "DEPTH", BUFFER_BITS2[BUFFER_BITS2.STENCIL = 1024] = "STENCIL", BUFFER_BITS2))(BUFFER_BITS || {});
var BLEND_MODES = ((BLEND_MODES2) => (BLEND_MODES2[BLEND_MODES2.NORMAL = 0] = "NORMAL", BLEND_MODES2[BLEND_MODES2.ADD = 1] = "ADD", BLEND_MODES2[BLEND_MODES2.MULTIPLY = 2] = "MULTIPLY", BLEND_MODES2[BLEND_MODES2.SCREEN = 3] = "SCREEN", BLEND_MODES2[BLEND_MODES2.OVERLAY = 4] = "OVERLAY", BLEND_MODES2[BLEND_MODES2.DARKEN = 5] = "DARKEN", BLEND_MODES2[BLEND_MODES2.LIGHTEN = 6] = "LIGHTEN", BLEND_MODES2[BLEND_MODES2.COLOR_DODGE = 7] = "COLOR_DODGE", BLEND_MODES2[BLEND_MODES2.COLOR_BURN = 8] = "COLOR_BURN", BLEND_MODES2[BLEND_MODES2.HARD_LIGHT = 9] = "HARD_LIGHT", BLEND_MODES2[BLEND_MODES2.SOFT_LIGHT = 10] = "SOFT_LIGHT", BLEND_MODES2[BLEND_MODES2.DIFFERENCE = 11] = "DIFFERENCE", BLEND_MODES2[BLEND_MODES2.EXCLUSION = 12] = "EXCLUSION", BLEND_MODES2[BLEND_MODES2.HUE = 13] = "HUE", BLEND_MODES2[BLEND_MODES2.SATURATION = 14] = "SATURATION", BLEND_MODES2[BLEND_MODES2.COLOR = 15] = "COLOR", BLEND_MODES2[BLEND_MODES2.LUMINOSITY = 16] = "LUMINOSITY", BLEND_MODES2[BLEND_MODES2.NORMAL_NPM = 17] = "NORMAL_NPM", BLEND_MODES2[BLEND_MODES2.ADD_NPM = 18] = "ADD_NPM", BLEND_MODES2[BLEND_MODES2.SCREEN_NPM = 19] = "SCREEN_NPM", BLEND_MODES2[BLEND_MODES2.NONE = 20] = "NONE", BLEND_MODES2[BLEND_MODES2.SRC_OVER = 0] = "SRC_OVER", BLEND_MODES2[BLEND_MODES2.SRC_IN = 21] = "SRC_IN", BLEND_MODES2[BLEND_MODES2.SRC_OUT = 22] = "SRC_OUT", BLEND_MODES2[BLEND_MODES2.SRC_ATOP = 23] = "SRC_ATOP", BLEND_MODES2[BLEND_MODES2.DST_OVER = 24] = "DST_OVER", BLEND_MODES2[BLEND_MODES2.DST_IN = 25] = "DST_IN", BLEND_MODES2[BLEND_MODES2.DST_OUT = 26] = "DST_OUT", BLEND_MODES2[BLEND_MODES2.DST_ATOP = 27] = "DST_ATOP", BLEND_MODES2[BLEND_MODES2.ERASE = 26] = "ERASE", BLEND_MODES2[BLEND_MODES2.SUBTRACT = 28] = "SUBTRACT", BLEND_MODES2[BLEND_MODES2.XOR = 29] = "XOR", BLEND_MODES2))(BLEND_MODES || {});
var DRAW_MODES = ((DRAW_MODES2) => (DRAW_MODES2[DRAW_MODES2.POINTS = 0] = "POINTS", DRAW_MODES2[DRAW_MODES2.LINES = 1] = "LINES", DRAW_MODES2[DRAW_MODES2.LINE_LOOP = 2] = "LINE_LOOP", DRAW_MODES2[DRAW_MODES2.LINE_STRIP = 3] = "LINE_STRIP", DRAW_MODES2[DRAW_MODES2.TRIANGLES = 4] = "TRIANGLES", DRAW_MODES2[DRAW_MODES2.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", DRAW_MODES2[DRAW_MODES2.TRIANGLE_FAN = 6] = "TRIANGLE_FAN", DRAW_MODES2))(DRAW_MODES || {});
var FORMATS = ((FORMATS2) => (FORMATS2[FORMATS2.RGBA = 6408] = "RGBA", FORMATS2[FORMATS2.RGB = 6407] = "RGB", FORMATS2[FORMATS2.RG = 33319] = "RG", FORMATS2[FORMATS2.RED = 6403] = "RED", FORMATS2[FORMATS2.RGBA_INTEGER = 36249] = "RGBA_INTEGER", FORMATS2[FORMATS2.RGB_INTEGER = 36248] = "RGB_INTEGER", FORMATS2[FORMATS2.RG_INTEGER = 33320] = "RG_INTEGER", FORMATS2[FORMATS2.RED_INTEGER = 36244] = "RED_INTEGER", FORMATS2[FORMATS2.ALPHA = 6406] = "ALPHA", FORMATS2[FORMATS2.LUMINANCE = 6409] = "LUMINANCE", FORMATS2[FORMATS2.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", FORMATS2[FORMATS2.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", FORMATS2[FORMATS2.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL", FORMATS2))(FORMATS || {});
var TARGETS = ((TARGETS2) => (TARGETS2[TARGETS2.TEXTURE_2D = 3553] = "TEXTURE_2D", TARGETS2[TARGETS2.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", TARGETS2[TARGETS2.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", TARGETS2[TARGETS2.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", TARGETS2[TARGETS2.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", TARGETS2[TARGETS2.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", TARGETS2[TARGETS2.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", TARGETS2[TARGETS2.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", TARGETS2[TARGETS2.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z", TARGETS2))(TARGETS || {});
var TYPES = ((TYPES2) => (TYPES2[TYPES2.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", TYPES2[TYPES2.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", TYPES2[TYPES2.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", TYPES2[TYPES2.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", TYPES2[TYPES2.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", TYPES2[TYPES2.UNSIGNED_INT = 5125] = "UNSIGNED_INT", TYPES2[TYPES2.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", TYPES2[TYPES2.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", TYPES2[TYPES2.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", TYPES2[TYPES2.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", TYPES2[TYPES2.BYTE = 5120] = "BYTE", TYPES2[TYPES2.SHORT = 5122] = "SHORT", TYPES2[TYPES2.INT = 5124] = "INT", TYPES2[TYPES2.FLOAT = 5126] = "FLOAT", TYPES2[TYPES2.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", TYPES2[TYPES2.HALF_FLOAT = 36193] = "HALF_FLOAT", TYPES2))(TYPES || {});
var SAMPLER_TYPES = ((SAMPLER_TYPES2) => (SAMPLER_TYPES2[SAMPLER_TYPES2.FLOAT = 0] = "FLOAT", SAMPLER_TYPES2[SAMPLER_TYPES2.INT = 1] = "INT", SAMPLER_TYPES2[SAMPLER_TYPES2.UINT = 2] = "UINT", SAMPLER_TYPES2))(SAMPLER_TYPES || {});
var SCALE_MODES = ((SCALE_MODES2) => (SCALE_MODES2[SCALE_MODES2.NEAREST = 0] = "NEAREST", SCALE_MODES2[SCALE_MODES2.LINEAR = 1] = "LINEAR", SCALE_MODES2))(SCALE_MODES || {});
var WRAP_MODES = ((WRAP_MODES2) => (WRAP_MODES2[WRAP_MODES2.CLAMP = 33071] = "CLAMP", WRAP_MODES2[WRAP_MODES2.REPEAT = 10497] = "REPEAT", WRAP_MODES2[WRAP_MODES2.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT", WRAP_MODES2))(WRAP_MODES || {});
var MIPMAP_MODES = ((MIPMAP_MODES2) => (MIPMAP_MODES2[MIPMAP_MODES2.OFF = 0] = "OFF", MIPMAP_MODES2[MIPMAP_MODES2.POW2 = 1] = "POW2", MIPMAP_MODES2[MIPMAP_MODES2.ON = 2] = "ON", MIPMAP_MODES2[MIPMAP_MODES2.ON_MANUAL = 3] = "ON_MANUAL", MIPMAP_MODES2))(MIPMAP_MODES || {});
var ALPHA_MODES = ((ALPHA_MODES2) => (ALPHA_MODES2[ALPHA_MODES2.NPM = 0] = "NPM", ALPHA_MODES2[ALPHA_MODES2.UNPACK = 1] = "UNPACK", ALPHA_MODES2[ALPHA_MODES2.PMA = 2] = "PMA", ALPHA_MODES2[ALPHA_MODES2.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", ALPHA_MODES2[ALPHA_MODES2.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", ALPHA_MODES2[ALPHA_MODES2.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA", ALPHA_MODES2))(ALPHA_MODES || {});
var CLEAR_MODES = ((CLEAR_MODES2) => (CLEAR_MODES2[CLEAR_MODES2.NO = 0] = "NO", CLEAR_MODES2[CLEAR_MODES2.YES = 1] = "YES", CLEAR_MODES2[CLEAR_MODES2.AUTO = 2] = "AUTO", CLEAR_MODES2[CLEAR_MODES2.BLEND = 0] = "BLEND", CLEAR_MODES2[CLEAR_MODES2.CLEAR = 1] = "CLEAR", CLEAR_MODES2[CLEAR_MODES2.BLIT = 2] = "BLIT", CLEAR_MODES2))(CLEAR_MODES || {});
var GC_MODES = ((GC_MODES2) => (GC_MODES2[GC_MODES2.AUTO = 0] = "AUTO", GC_MODES2[GC_MODES2.MANUAL = 1] = "MANUAL", GC_MODES2))(GC_MODES || {});
var PRECISION = ((PRECISION2) => (PRECISION2.LOW = "lowp", PRECISION2.MEDIUM = "mediump", PRECISION2.HIGH = "highp", PRECISION2))(PRECISION || {});
var MASK_TYPES = ((MASK_TYPES2) => (MASK_TYPES2[MASK_TYPES2.NONE = 0] = "NONE", MASK_TYPES2[MASK_TYPES2.SCISSOR = 1] = "SCISSOR", MASK_TYPES2[MASK_TYPES2.STENCIL = 2] = "STENCIL", MASK_TYPES2[MASK_TYPES2.SPRITE = 3] = "SPRITE", MASK_TYPES2[MASK_TYPES2.COLOR = 4] = "COLOR", MASK_TYPES2))(MASK_TYPES || {});
var MSAA_QUALITY = ((MSAA_QUALITY2) => (MSAA_QUALITY2[MSAA_QUALITY2.NONE = 0] = "NONE", MSAA_QUALITY2[MSAA_QUALITY2.LOW = 2] = "LOW", MSAA_QUALITY2[MSAA_QUALITY2.MEDIUM = 4] = "MEDIUM", MSAA_QUALITY2[MSAA_QUALITY2.HIGH = 8] = "HIGH", MSAA_QUALITY2))(MSAA_QUALITY || {});
var BUFFER_TYPE = ((BUFFER_TYPE2) => (BUFFER_TYPE2[BUFFER_TYPE2.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", BUFFER_TYPE2[BUFFER_TYPE2.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", BUFFER_TYPE2[BUFFER_TYPE2.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER", BUFFER_TYPE2))(BUFFER_TYPE || {});

// node_modules/@pixi/settings/lib/adapter.mjs
var BrowserAdapter = {
  createCanvas: (width, height) => {
    const canvas = document.createElement("canvas");
    return canvas.width = width, canvas.height = height, canvas;
  },
  getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
  getWebGLRenderingContext: () => WebGLRenderingContext,
  getNavigator: () => navigator,
  getBaseUrl: () => document.baseURI ?? window.location.href,
  getFontFaceSet: () => document.fonts,
  fetch: (url, options) => fetch(url, options),
  parseXML: (xml) => new DOMParser().parseFromString(xml, "text/xml")
};

// node_modules/@pixi/settings/lib/settings.mjs
var settings = {
  ADAPTER: BrowserAdapter,
  RESOLUTION: 1,
  CREATE_IMAGE_BITMAP: false,
  ROUND_PIXELS: false
};

// node_modules/ismobilejs/esm/isMobile.js
var createMatch = function(userAgent) {
  return function(regex) {
    return regex.test(userAgent);
  };
};
var appleIphone = /iPhone/i;
var appleIpod = /iPod/i;
var appleTablet = /iPad/i;
var appleUniversal = /\biOS-universal(?:.+)Mac\b/i;
var androidPhone = /\bAndroid(?:.+)Mobile\b/i;
var androidTablet = /Android/i;
var amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i;
var amazonTablet = /Silk/i;
var windowsPhone = /Windows Phone/i;
var windowsTablet = /\bWindows(?:.+)ARM\b/i;
var otherBlackBerry = /BlackBerry/i;
var otherBlackBerry10 = /BB10/i;
var otherOpera = /Opera Mini/i;
var otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
var otherFirefox = /Mobile(?:.+)Firefox\b/i;
var isAppleTabletOnIos13 = function(navigator2) {
  return typeof navigator2 !== "undefined" && navigator2.platform === "MacIntel" && typeof navigator2.maxTouchPoints === "number" && navigator2.maxTouchPoints > 1 && typeof MSStream === "undefined";
};
function isMobile(param) {
  var nav = {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  };
  if (!param && typeof navigator !== "undefined") {
    nav = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      maxTouchPoints: navigator.maxTouchPoints || 0
    };
  } else if (typeof param === "string") {
    nav.userAgent = param;
  } else if (param && param.userAgent) {
    nav = {
      userAgent: param.userAgent,
      platform: param.platform,
      maxTouchPoints: param.maxTouchPoints || 0
    };
  }
  var userAgent = nav.userAgent;
  var tmp = userAgent.split("[FBAN");
  if (typeof tmp[1] !== "undefined") {
    userAgent = tmp[0];
  }
  tmp = userAgent.split("Twitter");
  if (typeof tmp[1] !== "undefined") {
    userAgent = tmp[0];
  }
  var match = createMatch(userAgent);
  var result = {
    apple: {
      phone: match(appleIphone) && !match(windowsPhone),
      ipod: match(appleIpod),
      tablet: !match(appleIphone) && (match(appleTablet) || isAppleTabletOnIos13(nav)) && !match(windowsPhone),
      universal: match(appleUniversal),
      device: (match(appleIphone) || match(appleIpod) || match(appleTablet) || match(appleUniversal) || isAppleTabletOnIos13(nav)) && !match(windowsPhone)
    },
    amazon: {
      phone: match(amazonPhone),
      tablet: !match(amazonPhone) && match(amazonTablet),
      device: match(amazonPhone) || match(amazonTablet)
    },
    android: {
      phone: !match(windowsPhone) && match(amazonPhone) || !match(windowsPhone) && match(androidPhone),
      tablet: !match(windowsPhone) && !match(amazonPhone) && !match(androidPhone) && (match(amazonTablet) || match(androidTablet)),
      device: !match(windowsPhone) && (match(amazonPhone) || match(amazonTablet) || match(androidPhone) || match(androidTablet)) || match(/\bokhttp\b/i)
    },
    windows: {
      phone: match(windowsPhone),
      tablet: match(windowsTablet),
      device: match(windowsPhone) || match(windowsTablet)
    },
    other: {
      blackberry: match(otherBlackBerry),
      blackberry10: match(otherBlackBerry10),
      opera: match(otherOpera),
      firefox: match(otherFirefox),
      chrome: match(otherChrome),
      device: match(otherBlackBerry) || match(otherBlackBerry10) || match(otherOpera) || match(otherFirefox) || match(otherChrome)
    },
    any: false,
    phone: false,
    tablet: false
  };
  result.any = result.apple.device || result.android.device || result.windows.device || result.other.device;
  result.phone = result.apple.phone || result.android.phone || result.windows.phone;
  result.tablet = result.apple.tablet || result.android.tablet || result.windows.tablet;
  return result;
}
// node_modules/@pixi/settings/lib/utils/isMobile.mjs
var isMobileCall = isMobile.default ?? isMobile;
var isMobile3 = isMobileCall(globalThis.navigator);

// node_modules/@pixi/utils/lib/index.mjs
var exports_lib = {};
__export(exports_lib, {
  url: () => {
    {
      return url;
    }
  },
  uid: () => {
    {
      return uid;
    }
  },
  trimCanvas: () => {
    {
      return trimCanvas;
    }
  },
  string2hex: () => {
    {
      return string2hex;
    }
  },
  skipHello: () => {
    {
      return skipHello;
    }
  },
  sign: () => {
    {
      return sign;
    }
  },
  sayHello: () => {
    {
      return sayHello;
    }
  },
  rgb2hex: () => {
    {
      return rgb2hex;
    }
  },
  removeItems: () => {
    {
      return removeItems;
    }
  },
  premultiplyTintToRgba: () => {
    {
      return premultiplyTintToRgba;
    }
  },
  premultiplyTint: () => {
    {
      return premultiplyTint;
    }
  },
  premultiplyRgba: () => {
    {
      return premultiplyRgba;
    }
  },
  premultiplyBlendMode: () => {
    {
      return premultiplyBlendMode;
    }
  },
  path: () => {
    {
      return path;
    }
  },
  nextPow2: () => {
    {
      return nextPow2;
    }
  },
  log2: () => {
    {
      return log2;
    }
  },
  isWebGLSupported: () => {
    {
      return isWebGLSupported;
    }
  },
  isPow2: () => {
    {
      return isPow2;
    }
  },
  isMobile: () => {
    {
      return isMobile3;
    }
  },
  interleaveTypedArrays: () => {
    {
      return interleaveTypedArrays;
    }
  },
  hex2string: () => {
    {
      return hex2string;
    }
  },
  hex2rgb: () => {
    {
      return hex2rgb;
    }
  },
  getResolutionOfUrl: () => {
    {
      return getResolutionOfUrl;
    }
  },
  getCanvasBoundingBox: () => {
    {
      return getCanvasBoundingBox;
    }
  },
  getBufferType: () => {
    {
      return getBufferType;
    }
  },
  earcut: () => {
    {
      return import_earcut.default;
    }
  },
  determineCrossOrigin: () => {
    {
      return determineCrossOrigin;
    }
  },
  detectVideoAlphaMode: () => {
    {
      return detectVideoAlphaMode;
    }
  },
  destroyTextureCache: () => {
    {
      return destroyTextureCache;
    }
  },
  deprecation: () => {
    {
      return deprecation;
    }
  },
  decomposeDataUri: () => {
    {
      return decomposeDataUri;
    }
  },
  createIndicesForQuads: () => {
    {
      return createIndicesForQuads;
    }
  },
  correctBlendMode: () => {
    {
      return correctBlendMode;
    }
  },
  clearTextureCache: () => {
    {
      return clearTextureCache;
    }
  },
  TextureCache: () => {
    {
      return TextureCache;
    }
  },
  ProgramCache: () => {
    {
      return ProgramCache;
    }
  },
  EventEmitter: () => {
    {
      return import_eventemitter3.default;
    }
  },
  DATA_URI: () => {
    {
      return DATA_URI;
    }
  },
  CanvasRenderTarget: () => {
    {
      return CanvasRenderTarget;
    }
  },
  BoundingBox: () => {
    {
      return BoundingBox;
    }
  },
  BaseTextureCache: () => {
    {
      return BaseTextureCache;
    }
  }
});

// node_modules/@pixi/utils/lib/settings.mjs
settings.RETINA_PREFIX = /@([0-9\.]+)x/;
settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = false;

// node_modules/@pixi/utils/lib/index.mjs
var import_eventemitter3 = __toESM(require_eventemitter3(), 1);
var import_earcut = __toESM(require_earcut(), 1);

// node:url
var M = function(s) {
  return typeof s == "string";
};
var S = function(s) {
  return typeof s == "object" && s !== null;
};
var I = function(s) {
  return s === null;
};
var H = function(s) {
  return s == null;
};
var m = function() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
};
var L = function(s, r, t) {
  if (s && S(s) && s instanceof m)
    return s;
  var o = new m;
  return o.parse(s, r, t), o;
};
var at = function(s) {
  return M(s) && (s = L(s)), s instanceof m ? s.format() : m.prototype.format.call(s);
};
var nt = function(s, r) {
  return L(s, false, true).resolve(r);
};
var { URL: K, URLSearchParams: k, [Symbol.for("Bun.lazy")]: F } = globalThis;
var Q = /^([a-z0-9.+-]+:)/i;
var E = /:[0-9]*$/;
var tt = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
var st = ["<", ">", '"', "`", " ", "\r", `
`, "	"];
var ht = ["{", "}", "|", "\\", "^", "`"].concat(st);
var B = ["'"].concat(ht);
var D = ["%", "/", "?", ";", "#"].concat(B);
var G = ["/", "?", "#"];
var et = 255;
var J = /^[+a-z0-9A-Z_-]{0,63}$/;
var rt = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
var ot = { javascript: true, "javascript:": true };
var N = { javascript: true, "javascript:": true };
var R = { http: true, https: true, ftp: true, gopher: true, file: true, "http:": true, "https:": true, "ftp:": true, "gopher:": true, "file:": true };
var Z = { parse(s) {
  var r = decodeURIComponent;
  return (s + "").replace(/\+/g, " ").split("&").filter(Boolean).reduce(function(t, o, a) {
    var l = o.split("="), f = r(l[0] || ""), h = r(l[1] || ""), y = t[f];
    return t[f] = y === undefined ? h : [].concat(y, h), t;
  }, {});
}, stringify(s) {
  var r = encodeURIComponent;
  return Object.keys(s || {}).reduce(function(t, o) {
    return [].concat(s[o]).forEach(function(a) {
      t.push(r(o) + "=" + r(a));
    }), t;
  }, []).join("&").replace(/\s/g, "+");
} };
m.prototype.parse = function(s, r, t) {
  if (!M(s))
    throw new TypeError("Parameter 'url' must be a string, not " + typeof s);
  var o = s.indexOf("?"), a = o !== -1 && o < s.indexOf("#") ? "?" : "#", l = s.split(a), f = /\\/g;
  l[0] = l[0].replace(f, "/"), s = l.join(a);
  var h = s;
  if (h = h.trim(), !t && s.split("#").length === 1) {
    var y = tt.exec(h);
    if (y)
      return this.path = h, this.href = h, this.pathname = y[1], y[2] ? (this.search = y[2], r ? this.query = Z.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : r && (this.search = "", this.query = {}), this;
  }
  var c = Q.exec(h);
  if (c) {
    c = c[0];
    var v = c.toLowerCase();
    this.protocol = v, h = h.substr(c.length);
  }
  if (t || c || h.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var A = h.substr(0, 2) === "//";
    A && !(c && N[c]) && (h = h.substr(2), this.slashes = true);
  }
  if (!N[c] && (A || c && !R[c])) {
    for (var u = -1, n = 0;n < G.length; n++) {
      var b = h.indexOf(G[n]);
      b !== -1 && (u === -1 || b < u) && (u = b);
    }
    var j, p;
    u === -1 ? p = h.lastIndexOf("@") : p = h.lastIndexOf("@", u), p !== -1 && (j = h.slice(0, p), h = h.slice(p + 1), this.auth = decodeURIComponent(j)), u = -1;
    for (var n = 0;n < D.length; n++) {
      var b = h.indexOf(D[n]);
      b !== -1 && (u === -1 || b < u) && (u = b);
    }
    u === -1 && (u = h.length), this.host = h.slice(0, u), h = h.slice(u), this.parseHost(), this.hostname = this.hostname || "";
    var P = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!P)
      for (var e = this.hostname.split(/\./), n = 0, i = e.length;n < i; n++) {
        var d = e[n];
        if (!!d && !d.match(J)) {
          for (var g = "", x = 0, _ = d.length;x < _; x++)
            d.charCodeAt(x) > 127 ? g += "x" : g += d[x];
          if (!g.match(J)) {
            var q = e.slice(0, n), O = e.slice(n + 1), U = d.match(rt);
            U && (q.push(U[1]), O.unshift(U[2])), O.length && (h = "/" + O.join(".") + h), this.hostname = q.join(".");
            break;
          }
        }
      }
    this.hostname.length > et ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), P || (this.hostname = new K(`https://${this.hostname}`).hostname);
    var w = this.port ? ":" + this.port : "", X = this.hostname || "";
    this.host = X + w, this.href += this.host, P && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), h[0] !== "/" && (h = "/" + h));
  }
  if (!ot[v])
    for (var n = 0, i = B.length;n < i; n++) {
      var C = B[n];
      if (h.indexOf(C) !== -1) {
        var z = encodeURIComponent(C);
        z === C && (z = escape(C)), h = h.split(C).join(z);
      }
    }
  var $ = h.indexOf("#");
  $ !== -1 && (this.hash = h.substr($), h = h.slice(0, $));
  var T = h.indexOf("?");
  if (T !== -1 ? (this.search = h.substr(T), this.query = h.substr(T + 1), r && (this.query = Z.parse(this.query)), h = h.slice(0, T)) : r && (this.search = "", this.query = {}), h && (this.pathname = h), R[v] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
    var w = this.pathname || "", Y = this.search || "";
    this.path = w + Y;
  }
  return this.href = this.format(), this;
};
m.prototype.format = function() {
  var s = this.auth || "";
  s && (s = encodeURIComponent(s), s = s.replace(/%3A/i, ":"), s += "@");
  var r = this.protocol || "", t = this.pathname || "", o = this.hash || "", a = false, l = "";
  this.host ? a = s + this.host : this.hostname && (a = s + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (a += ":" + this.port)), this.query && S(this.query) && Object.keys(this.query).length && (l = Z.stringify(this.query));
  var f = this.search || l && "?" + l || "";
  return r && r.substr(-1) !== ":" && (r += ":"), this.slashes || (!r || R[r]) && a !== false ? (a = "//" + (a || ""), t && t.charAt(0) !== "/" && (t = "/" + t)) : a || (a = ""), o && o.charAt(0) !== "#" && (o = "#" + o), f && f.charAt(0) !== "?" && (f = "?" + f), t = t.replace(/[?#]/g, function(h) {
    return encodeURIComponent(h);
  }), f = f.replace("#", "%23"), r + a + t + f + o;
};
m.prototype.resolve = function(s) {
  return this.resolveObject(L(s, false, true)).format();
};
m.prototype.resolveObject = function(s) {
  if (M(s)) {
    var r = new m;
    r.parse(s, false, true), s = r;
  }
  for (var t = new m, o = Object.keys(this), a = 0;a < o.length; a++) {
    var l = o[a];
    t[l] = this[l];
  }
  if (t.hash = s.hash, s.href === "")
    return t.href = t.format(), t;
  if (s.slashes && !s.protocol) {
    for (var f = Object.keys(s), h = 0;h < f.length; h++) {
      var y = f[h];
      y !== "protocol" && (t[y] = s[y]);
    }
    return R[t.protocol] && t.hostname && !t.pathname && (t.path = t.pathname = "/"), t.href = t.format(), t;
  }
  if (s.protocol && s.protocol !== t.protocol) {
    if (!R[s.protocol]) {
      for (var c = Object.keys(s), v = 0;v < c.length; v++) {
        var A = c[v];
        t[A] = s[A];
      }
      return t.href = t.format(), t;
    }
    if (t.protocol = s.protocol, !s.host && !N[s.protocol]) {
      for (var i = (s.pathname || "").split("/");i.length && !(s.host = i.shift()); )
        ;
      s.host || (s.host = ""), s.hostname || (s.hostname = ""), i[0] !== "" && i.unshift(""), i.length < 2 && i.unshift(""), t.pathname = i.join("/");
    } else
      t.pathname = s.pathname;
    if (t.search = s.search, t.query = s.query, t.host = s.host || "", t.auth = s.auth, t.hostname = s.hostname || s.host, t.port = s.port, t.pathname || t.search) {
      var u = t.pathname || "", n = t.search || "";
      t.path = u + n;
    }
    return t.slashes = t.slashes || s.slashes, t.href = t.format(), t;
  }
  var b = t.pathname && t.pathname.charAt(0) === "/", j = s.host || s.pathname && s.pathname.charAt(0) === "/", p = j || b || t.host && s.pathname, P = p, e = t.pathname && t.pathname.split("/") || [], i = s.pathname && s.pathname.split("/") || [], d = t.protocol && !R[t.protocol];
  if (d && (t.hostname = "", t.port = null, t.host && (e[0] === "" ? e[0] = t.host : e.unshift(t.host)), t.host = "", s.protocol && (s.hostname = null, s.port = null, s.host && (i[0] === "" ? i[0] = s.host : i.unshift(s.host)), s.host = null), p = p && (i[0] === "" || e[0] === "")), j)
    t.host = s.host || s.host === "" ? s.host : t.host, t.hostname = s.hostname || s.hostname === "" ? s.hostname : t.hostname, t.search = s.search, t.query = s.query, e = i;
  else if (i.length)
    e || (e = []), e.pop(), e = e.concat(i), t.search = s.search, t.query = s.query;
  else if (!H(s.search)) {
    if (d) {
      t.hostname = t.host = e.shift();
      var g = t.host && t.host.indexOf("@") > 0 ? t.host.split("@") : false;
      g && (t.auth = g.shift(), t.host = t.hostname = g.shift());
    }
    return t.search = s.search, t.query = s.query, (!I(t.pathname) || !I(t.search)) && (t.path = (t.pathname ? t.pathname : "") + (t.search ? t.search : "")), t.href = t.format(), t;
  }
  if (!e.length)
    return t.pathname = null, t.search ? t.path = "/" + t.search : t.path = null, t.href = t.format(), t;
  for (var x = e.slice(-1)[0], _ = (t.host || s.host || e.length > 1) && (x === "." || x === "..") || x === "", q = 0, O = e.length;O >= 0; O--)
    x = e[O], x === "." ? e.splice(O, 1) : x === ".." ? (e.splice(O, 1), q++) : q && (e.splice(O, 1), q--);
  if (!p && !P)
    for (;q--; q)
      e.unshift("..");
  p && e[0] !== "" && (!e[0] || e[0].charAt(0) !== "/") && e.unshift(""), _ && e.join("/").substr(-1) !== "/" && e.push("");
  var U = e[0] === "" || e[0] && e[0].charAt(0) === "/";
  if (d) {
    t.hostname = t.host = U ? "" : e.length ? e.shift() : "";
    var g = t.host && t.host.indexOf("@") > 0 ? t.host.split("@") : false;
    g && (t.auth = g.shift(), t.host = t.hostname = g.shift());
  }
  return p = p || t.host && e.length, p && !U && e.unshift(""), e.length ? t.pathname = e.join("/") : (t.pathname = null, t.path = null), (!I(t.pathname) || !I(t.search)) && (t.path = (t.pathname ? t.pathname : "") + (t.search ? t.search : "")), t.auth = s.auth || t.auth, t.slashes = t.slashes || s.slashes, t.href = t.format(), t;
};
m.prototype.parseHost = function() {
  var s = this.host, r = E.exec(s);
  r && (r = r[0], r !== ":" && (this.port = r.substr(1)), s = s.substr(0, s.length - r.length)), s && (this.hostname = s);
};
var V;
var W;
F && (V = F("pathToFileURL"), W = F("fileURLToPath"));

// node_modules/@pixi/utils/lib/logging/deprecation.mjs
var deprecation = function(version, message, ignoreDepth = 3) {
  if (warnings[message])
    return;
  let stack = new Error().stack;
  typeof stack > "u" ? console.warn("PixiJS Deprecation Warning: ", `${message}
Deprecated since v${version}`) : (stack = stack.split(`
`).splice(ignoreDepth).join(`
`), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", `${message}
Deprecated since v${version}`), console.warn(stack), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", `${message}
Deprecated since v${version}`), console.warn(stack))), warnings[message] = true;
};
var warnings = {};

// node_modules/@pixi/utils/lib/url.mjs
var url = {
  get parse() {
    return deprecation("7.3.0", "utils.url.parse is deprecated, use native URL API instead."), L;
  },
  get format() {
    return deprecation("7.3.0", "utils.url.format is deprecated, use native URL API instead."), at;
  },
  get resolve() {
    return deprecation("7.3.0", "utils.url.resolve is deprecated, use native URL API instead."), nt;
  }
};

// node_modules/@pixi/utils/lib/path.mjs
var assertPath = function(path2) {
  if (typeof path2 != "string")
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(path2)}`);
};
var removeUrlParams = function(url2) {
  return url2.split("?")[0].split("#")[0];
};
var escapeRegExp = function(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
var replaceAll = function(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
};
var normalizeStringPosix = function(path2, allowAboveRoot) {
  let res = "", lastSegmentLength = 0, lastSlash = -1, dots = 0, code = -1;
  for (let i = 0;i <= path2.length; ++i) {
    if (i < path2.length)
      code = path2.charCodeAt(i);
    else {
      if (code === 47)
        break;
      code = 47;
    }
    if (code === 47) {
      if (!(lastSlash === i - 1 || dots === 1))
        if (lastSlash !== i - 1 && dots === 2) {
          if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
            if (res.length > 2) {
              const lastSlashIndex = res.lastIndexOf("/");
              if (lastSlashIndex !== res.length - 1) {
                lastSlashIndex === -1 ? (res = "", lastSegmentLength = 0) : (res = res.slice(0, lastSlashIndex), lastSegmentLength = res.length - 1 - res.lastIndexOf("/")), lastSlash = i, dots = 0;
                continue;
              }
            } else if (res.length === 2 || res.length === 1) {
              res = "", lastSegmentLength = 0, lastSlash = i, dots = 0;
              continue;
            }
          }
          allowAboveRoot && (res.length > 0 ? res += "/.." : res = "..", lastSegmentLength = 2);
        } else
          res.length > 0 ? res += `/${path2.slice(lastSlash + 1, i)}` : res = path2.slice(lastSlash + 1, i), lastSegmentLength = i - lastSlash - 1;
      lastSlash = i, dots = 0;
    } else
      code === 46 && dots !== -1 ? ++dots : dots = -1;
  }
  return res;
};
var path = {
  toPosix(path2) {
    return replaceAll(path2, "\\", "/");
  },
  isUrl(path2) {
    return /^https?:/.test(this.toPosix(path2));
  },
  isDataUrl(path2) {
    return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(path2);
  },
  isBlobUrl(path2) {
    return path2.startsWith("blob:");
  },
  hasProtocol(path2) {
    return /^[^/:]+:/.test(this.toPosix(path2));
  },
  getProtocol(path2) {
    assertPath(path2), path2 = this.toPosix(path2);
    const matchFile = /^file:\/\/\//.exec(path2);
    if (matchFile)
      return matchFile[0];
    const matchProtocol = /^[^/:]+:\/{0,2}/.exec(path2);
    return matchProtocol ? matchProtocol[0] : "";
  },
  toAbsolute(url2, customBaseUrl, customRootUrl) {
    if (assertPath(url2), this.isDataUrl(url2) || this.isBlobUrl(url2))
      return url2;
    const baseUrl = removeUrlParams(this.toPosix(customBaseUrl ?? settings.ADAPTER.getBaseUrl())), rootUrl = removeUrlParams(this.toPosix(customRootUrl ?? this.rootname(baseUrl)));
    return url2 = this.toPosix(url2), url2.startsWith("/") ? path.join(rootUrl, url2.slice(1)) : this.isAbsolute(url2) ? url2 : this.join(baseUrl, url2);
  },
  normalize(path2) {
    if (assertPath(path2), path2.length === 0)
      return ".";
    if (this.isDataUrl(path2) || this.isBlobUrl(path2))
      return path2;
    path2 = this.toPosix(path2);
    let protocol = "";
    const isAbsolute = path2.startsWith("/");
    this.hasProtocol(path2) && (protocol = this.rootname(path2), path2 = path2.slice(protocol.length));
    const trailingSeparator = path2.endsWith("/");
    return path2 = normalizeStringPosix(path2, false), path2.length > 0 && trailingSeparator && (path2 += "/"), isAbsolute ? `/${path2}` : protocol + path2;
  },
  isAbsolute(path2) {
    return assertPath(path2), path2 = this.toPosix(path2), this.hasProtocol(path2) ? true : path2.startsWith("/");
  },
  join(...segments) {
    if (segments.length === 0)
      return ".";
    let joined;
    for (let i = 0;i < segments.length; ++i) {
      const arg = segments[i];
      if (assertPath(arg), arg.length > 0)
        if (joined === undefined)
          joined = arg;
        else {
          const prevArg = segments[i - 1] ?? "";
          this.extname(prevArg) ? joined += `/../${arg}` : joined += `/${arg}`;
        }
    }
    return joined === undefined ? "." : this.normalize(joined);
  },
  dirname(path2) {
    if (assertPath(path2), path2.length === 0)
      return ".";
    path2 = this.toPosix(path2);
    let code = path2.charCodeAt(0);
    const hasRoot = code === 47;
    let end = -1, matchedSlash = true;
    const proto = this.getProtocol(path2), origpath = path2;
    path2 = path2.slice(proto.length);
    for (let i = path2.length - 1;i >= 1; --i)
      if (code = path2.charCodeAt(i), code === 47) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else
        matchedSlash = false;
    return end === -1 ? hasRoot ? "/" : this.isUrl(origpath) ? proto + path2 : proto : hasRoot && end === 1 ? "//" : proto + path2.slice(0, end);
  },
  rootname(path2) {
    assertPath(path2), path2 = this.toPosix(path2);
    let root = "";
    if (path2.startsWith("/") ? root = "/" : root = this.getProtocol(path2), this.isUrl(path2)) {
      const index = path2.indexOf("/", root.length);
      index !== -1 ? root = path2.slice(0, index) : root = path2, root.endsWith("/") || (root += "/");
    }
    return root;
  },
  basename(path2, ext) {
    assertPath(path2), ext && assertPath(ext), path2 = removeUrlParams(this.toPosix(path2));
    let start = 0, end = -1, matchedSlash = true, i;
    if (ext !== undefined && ext.length > 0 && ext.length <= path2.length) {
      if (ext.length === path2.length && ext === path2)
        return "";
      let extIdx = ext.length - 1, firstNonSlashEnd = -1;
      for (i = path2.length - 1;i >= 0; --i) {
        const code = path2.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else
          firstNonSlashEnd === -1 && (matchedSlash = false, firstNonSlashEnd = i + 1), extIdx >= 0 && (code === ext.charCodeAt(extIdx) ? --extIdx === -1 && (end = i) : (extIdx = -1, end = firstNonSlashEnd));
      }
      return start === end ? end = firstNonSlashEnd : end === -1 && (end = path2.length), path2.slice(start, end);
    }
    for (i = path2.length - 1;i >= 0; --i)
      if (path2.charCodeAt(i) === 47) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else
        end === -1 && (matchedSlash = false, end = i + 1);
    return end === -1 ? "" : path2.slice(start, end);
  },
  extname(path2) {
    assertPath(path2), path2 = removeUrlParams(this.toPosix(path2));
    let startDot = -1, startPart = 0, end = -1, matchedSlash = true, preDotState = 0;
    for (let i = path2.length - 1;i >= 0; --i) {
      const code = path2.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      end === -1 && (matchedSlash = false, end = i + 1), code === 46 ? startDot === -1 ? startDot = i : preDotState !== 1 && (preDotState = 1) : startDot !== -1 && (preDotState = -1);
    }
    return startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1 ? "" : path2.slice(startDot, end);
  },
  parse(path2) {
    assertPath(path2);
    const ret = { root: "", dir: "", base: "", ext: "", name: "" };
    if (path2.length === 0)
      return ret;
    path2 = removeUrlParams(this.toPosix(path2));
    let code = path2.charCodeAt(0);
    const isAbsolute = this.isAbsolute(path2);
    let start;
    const protocol = "";
    ret.root = this.rootname(path2), isAbsolute || this.hasProtocol(path2) ? start = 1 : start = 0;
    let startDot = -1, startPart = 0, end = -1, matchedSlash = true, i = path2.length - 1, preDotState = 0;
    for (;i >= start; --i) {
      if (code = path2.charCodeAt(i), code === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      end === -1 && (matchedSlash = false, end = i + 1), code === 46 ? startDot === -1 ? startDot = i : preDotState !== 1 && (preDotState = 1) : startDot !== -1 && (preDotState = -1);
    }
    return startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1 ? end !== -1 && (startPart === 0 && isAbsolute ? ret.base = ret.name = path2.slice(1, end) : ret.base = ret.name = path2.slice(startPart, end)) : (startPart === 0 && isAbsolute ? (ret.name = path2.slice(1, startDot), ret.base = path2.slice(1, end)) : (ret.name = path2.slice(startPart, startDot), ret.base = path2.slice(startPart, end)), ret.ext = path2.slice(startDot, end)), ret.dir = this.dirname(path2), protocol && (ret.dir = protocol + ret.dir), ret;
  },
  sep: "/",
  delimiter: ":"
};

// node_modules/@pixi/utils/lib/browser/detectVideoAlphaMode.mjs
async function detectVideoAlphaMode() {
  return promise ?? (promise = (async () => {
    const gl = document.createElement("canvas").getContext("webgl");
    if (!gl)
      return ALPHA_MODES.UNPACK;
    const video = await new Promise((resolve) => {
      const video2 = document.createElement("video");
      video2.onloadeddata = () => resolve(video2), video2.onerror = () => resolve(null), video2.autoplay = false, video2.crossOrigin = "anonymous", video2.preload = "auto", video2.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=", video2.load();
    });
    if (!video)
      return ALPHA_MODES.UNPACK;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer), gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0), gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false), gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE), gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
    const pixel = new Uint8Array(4);
    return gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel), gl.deleteFramebuffer(framebuffer), gl.deleteTexture(texture), gl.getExtension("WEBGL_lose_context")?.loseContext(), pixel[0] <= pixel[3] ? ALPHA_MODES.PMA : ALPHA_MODES.UNPACK;
  })()), promise;
}
var promise;

// node_modules/@pixi/utils/lib/browser/hello.mjs
var skipHello = function() {
  deprecation("7.0.0", "skipHello is deprecated, please use settings.RENDER_OPTIONS.hello");
};
var sayHello = function() {
  deprecation("7.0.0", `sayHello is deprecated, please use Renderer's "hello" option`);
};

// node_modules/@pixi/utils/lib/browser/isWebGLSupported.mjs
var isWebGLSupported = function() {
  return typeof supported > "u" && (supported = function() {
    const contextOptions = {
      stencil: true,
      failIfMajorPerformanceCaveat: settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
    };
    try {
      if (!settings.ADAPTER.getWebGLRenderingContext())
        return false;
      const canvas = settings.ADAPTER.createCanvas();
      let gl = canvas.getContext("webgl", contextOptions) || canvas.getContext("experimental-webgl", contextOptions);
      const success = !!gl?.getContextAttributes()?.stencil;
      if (gl) {
        const loseContext = gl.getExtension("WEBGL_lose_context");
        loseContext && loseContext.loseContext();
      }
      return gl = null, success;
    } catch {
      return false;
    }
  }()), supported;
};
var supported;

// node_modules/@pixi/colord/index.mjs
var r = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) };
var t = function(r2) {
  return typeof r2 == "string" ? r2.length > 0 : typeof r2 == "number";
};
var n = function(r2, t2, n2) {
  return t2 === undefined && (t2 = 0), n2 === undefined && (n2 = Math.pow(10, t2)), Math.round(n2 * r2) / n2 + 0;
};
var e = function(r2, t2, n2) {
  return t2 === undefined && (t2 = 0), n2 === undefined && (n2 = 1), r2 > n2 ? n2 : r2 > t2 ? r2 : t2;
};
var u = function(r2) {
  return (r2 = isFinite(r2) ? r2 % 360 : 0) > 0 ? r2 : r2 + 360;
};
var a = function(r2) {
  return { r: e(r2.r, 0, 255), g: e(r2.g, 0, 255), b: e(r2.b, 0, 255), a: e(r2.a) };
};
var o = function(r2) {
  return { r: n(r2.r), g: n(r2.g), b: n(r2.b), a: n(r2.a, 3) };
};
var i = /^#([0-9a-f]{3,8})$/i;
var s = function(r2) {
  var t2 = r2.toString(16);
  return t2.length < 2 ? "0" + t2 : t2;
};
var h = function(r2) {
  var { r: t2, g: n2, b: e2, a: u2 } = r2, a2 = Math.max(t2, n2, e2), o2 = a2 - Math.min(t2, n2, e2), i2 = o2 ? a2 === t2 ? (n2 - e2) / o2 : a2 === n2 ? 2 + (e2 - t2) / o2 : 4 + (t2 - n2) / o2 : 0;
  return { h: 60 * (i2 < 0 ? i2 + 6 : i2), s: a2 ? o2 / a2 * 100 : 0, v: a2 / 255 * 100, a: u2 };
};
var b = function(r2) {
  var { h: t2, s: n2, v: e2, a: u2 } = r2;
  t2 = t2 / 360 * 6, n2 /= 100, e2 /= 100;
  var a2 = Math.floor(t2), o2 = e2 * (1 - n2), i2 = e2 * (1 - (t2 - a2) * n2), s2 = e2 * (1 - (1 - t2 + a2) * n2), h2 = a2 % 6;
  return { r: 255 * [e2, i2, o2, o2, s2, e2][h2], g: 255 * [s2, e2, e2, i2, o2, o2][h2], b: 255 * [o2, o2, s2, e2, e2, i2][h2], a: u2 };
};
var g = function(r2) {
  return { h: u(r2.h), s: e(r2.s, 0, 100), l: e(r2.l, 0, 100), a: e(r2.a) };
};
var d = function(r2) {
  return { h: n(r2.h), s: n(r2.s), l: n(r2.l), a: n(r2.a, 3) };
};
var f = function(r2) {
  return b((n2 = (t2 = r2).s, { h: t2.h, s: (n2 *= ((e2 = t2.l) < 50 ? e2 : 100 - e2) / 100) > 0 ? 2 * n2 / (e2 + n2) * 100 : 0, v: e2 + n2, a: t2.a }));
  var t2, n2, e2;
};
var c = function(r2) {
  return { h: (t2 = h(r2)).h, s: (u2 = (200 - (n2 = t2.s)) * (e2 = t2.v) / 100) > 0 && u2 < 200 ? n2 * e2 / 100 / (u2 <= 100 ? u2 : 200 - u2) * 100 : 0, l: u2 / 2, a: t2.a };
  var t2, n2, e2, u2;
};
var l = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
var p = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
var v = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
var m2 = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
var y = { string: [[function(r2) {
  var t2 = i.exec(r2);
  return t2 ? (r2 = t2[1]).length <= 4 ? { r: parseInt(r2[0] + r2[0], 16), g: parseInt(r2[1] + r2[1], 16), b: parseInt(r2[2] + r2[2], 16), a: r2.length === 4 ? n(parseInt(r2[3] + r2[3], 16) / 255, 2) : 1 } : r2.length === 6 || r2.length === 8 ? { r: parseInt(r2.substr(0, 2), 16), g: parseInt(r2.substr(2, 2), 16), b: parseInt(r2.substr(4, 2), 16), a: r2.length === 8 ? n(parseInt(r2.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(r2) {
  var t2 = v.exec(r2) || m2.exec(r2);
  return t2 ? t2[2] !== t2[4] || t2[4] !== t2[6] ? null : a({ r: Number(t2[1]) / (t2[2] ? 100 / 255 : 1), g: Number(t2[3]) / (t2[4] ? 100 / 255 : 1), b: Number(t2[5]) / (t2[6] ? 100 / 255 : 1), a: t2[7] === undefined ? 1 : Number(t2[7]) / (t2[8] ? 100 : 1) }) : null;
}, "rgb"], [function(t2) {
  var n2 = l.exec(t2) || p.exec(t2);
  if (!n2)
    return null;
  var e2, u2, a2 = g({ h: (e2 = n2[1], u2 = n2[2], u2 === undefined && (u2 = "deg"), Number(e2) * (r[u2] || 1)), s: Number(n2[3]), l: Number(n2[4]), a: n2[5] === undefined ? 1 : Number(n2[5]) / (n2[6] ? 100 : 1) });
  return f(a2);
}, "hsl"]], object: [[function(r2) {
  var { r: n2, g: e2, b: u2, a: o2 } = r2, i2 = o2 === undefined ? 1 : o2;
  return t(n2) && t(e2) && t(u2) ? a({ r: Number(n2), g: Number(e2), b: Number(u2), a: Number(i2) }) : null;
}, "rgb"], [function(r2) {
  var { h: n2, s: e2, l: u2, a: a2 } = r2, o2 = a2 === undefined ? 1 : a2;
  if (!t(n2) || !t(e2) || !t(u2))
    return null;
  var i2 = g({ h: Number(n2), s: Number(e2), l: Number(u2), a: Number(o2) });
  return f(i2);
}, "hsl"], [function(r2) {
  var { h: n2, s: a2, v: o2, a: i2 } = r2, s2 = i2 === undefined ? 1 : i2;
  if (!t(n2) || !t(a2) || !t(o2))
    return null;
  var h2 = function(r3) {
    return { h: u(r3.h), s: e(r3.s, 0, 100), v: e(r3.v, 0, 100), a: e(r3.a) };
  }({ h: Number(n2), s: Number(a2), v: Number(o2), a: Number(s2) });
  return b(h2);
}, "hsv"]] };
var N2 = function(r2, t2) {
  for (var n2 = 0;n2 < t2.length; n2++) {
    var e2 = t2[n2][0](r2);
    if (e2)
      return [e2, t2[n2][1]];
  }
  return [null, undefined];
};
var x = function(r2) {
  return typeof r2 == "string" ? N2(r2.trim(), y.string) : typeof r2 == "object" && r2 !== null ? N2(r2, y.object) : [null, undefined];
};
var M2 = function(r2, t2) {
  var n2 = c(r2);
  return { h: n2.h, s: e(n2.s + 100 * t2, 0, 100), l: n2.l, a: n2.a };
};
var H2 = function(r2) {
  return (299 * r2.r + 587 * r2.g + 114 * r2.b) / 1000 / 255;
};
var $ = function(r2, t2) {
  var n2 = c(r2);
  return { h: n2.h, s: n2.s, l: e(n2.l + 100 * t2, 0, 100), a: n2.a };
};
var j = function() {
  function r2(r3) {
    this.parsed = x(r3)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return r2.prototype.isValid = function() {
    return this.parsed !== null;
  }, r2.prototype.brightness = function() {
    return n(H2(this.rgba), 2);
  }, r2.prototype.isDark = function() {
    return H2(this.rgba) < 0.5;
  }, r2.prototype.isLight = function() {
    return H2(this.rgba) >= 0.5;
  }, r2.prototype.toHex = function() {
    return r3 = o(this.rgba), t2 = r3.r, e2 = r3.g, u2 = r3.b, i2 = (a2 = r3.a) < 1 ? s(n(255 * a2)) : "", "#" + s(t2) + s(e2) + s(u2) + i2;
    var r3, t2, e2, u2, a2, i2;
  }, r2.prototype.toRgb = function() {
    return o(this.rgba);
  }, r2.prototype.toRgbString = function() {
    return r3 = o(this.rgba), t2 = r3.r, n2 = r3.g, e2 = r3.b, (u2 = r3.a) < 1 ? "rgba(" + t2 + ", " + n2 + ", " + e2 + ", " + u2 + ")" : "rgb(" + t2 + ", " + n2 + ", " + e2 + ")";
    var r3, t2, n2, e2, u2;
  }, r2.prototype.toHsl = function() {
    return d(c(this.rgba));
  }, r2.prototype.toHslString = function() {
    return r3 = d(c(this.rgba)), t2 = r3.h, n2 = r3.s, e2 = r3.l, (u2 = r3.a) < 1 ? "hsla(" + t2 + ", " + n2 + "%, " + e2 + "%, " + u2 + ")" : "hsl(" + t2 + ", " + n2 + "%, " + e2 + "%)";
    var r3, t2, n2, e2, u2;
  }, r2.prototype.toHsv = function() {
    return r3 = h(this.rgba), { h: n(r3.h), s: n(r3.s), v: n(r3.v), a: n(r3.a, 3) };
    var r3;
  }, r2.prototype.invert = function() {
    return w({ r: 255 - (r3 = this.rgba).r, g: 255 - r3.g, b: 255 - r3.b, a: r3.a });
    var r3;
  }, r2.prototype.saturate = function(r3) {
    return r3 === undefined && (r3 = 0.1), w(M2(this.rgba, r3));
  }, r2.prototype.desaturate = function(r3) {
    return r3 === undefined && (r3 = 0.1), w(M2(this.rgba, -r3));
  }, r2.prototype.grayscale = function() {
    return w(M2(this.rgba, -1));
  }, r2.prototype.lighten = function(r3) {
    return r3 === undefined && (r3 = 0.1), w($(this.rgba, r3));
  }, r2.prototype.darken = function(r3) {
    return r3 === undefined && (r3 = 0.1), w($(this.rgba, -r3));
  }, r2.prototype.rotate = function(r3) {
    return r3 === undefined && (r3 = 15), this.hue(this.hue() + r3);
  }, r2.prototype.alpha = function(r3) {
    return typeof r3 == "number" ? w({ r: (t2 = this.rgba).r, g: t2.g, b: t2.b, a: r3 }) : n(this.rgba.a, 3);
    var t2;
  }, r2.prototype.hue = function(r3) {
    var t2 = c(this.rgba);
    return typeof r3 == "number" ? w({ h: r3, s: t2.s, l: t2.l, a: t2.a }) : n(t2.h);
  }, r2.prototype.isEqual = function(r3) {
    return this.toHex() === w(r3).toHex();
  }, r2;
}();
var w = function(r2) {
  return r2 instanceof j ? r2 : new j(r2);
};
var S2 = [];
var k2 = function(r2) {
  r2.forEach(function(r3) {
    S2.indexOf(r3) < 0 && (r3(j, y), S2.push(r3));
  });
};

// node_modules/@pixi/colord/plugins/names.mjs
function names_default(e2, f2) {
  var a2 = { white: "#ffffff", bisque: "#ffe4c4", blue: "#0000ff", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", antiquewhite: "#faebd7", aqua: "#00ffff", azure: "#f0ffff", whitesmoke: "#f5f5f5", papayawhip: "#ffefd5", plum: "#dda0dd", blanchedalmond: "#ffebcd", black: "#000000", gold: "#ffd700", goldenrod: "#daa520", gainsboro: "#dcdcdc", cornsilk: "#fff8dc", cornflowerblue: "#6495ed", burlywood: "#deb887", aquamarine: "#7fffd4", beige: "#f5f5dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkkhaki: "#bdb76b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", peachpuff: "#ffdab9", darkmagenta: "#8b008b", darkred: "#8b0000", darkorchid: "#9932cc", darkorange: "#ff8c00", darkslateblue: "#483d8b", gray: "#808080", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", deeppink: "#ff1493", deepskyblue: "#00bfff", wheat: "#f5deb3", firebrick: "#b22222", floralwhite: "#fffaf0", ghostwhite: "#f8f8ff", darkviolet: "#9400d3", magenta: "#ff00ff", green: "#008000", dodgerblue: "#1e90ff", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", blueviolet: "#8a2be2", forestgreen: "#228b22", lawngreen: "#7cfc00", indianred: "#cd5c5c", indigo: "#4b0082", fuchsia: "#ff00ff", brown: "#a52a2a", maroon: "#800000", mediumblue: "#0000cd", lightcoral: "#f08080", darkturquoise: "#00ced1", lightcyan: "#e0ffff", ivory: "#fffff0", lightyellow: "#ffffe0", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", linen: "#faf0e6", mediumaquamarine: "#66cdaa", lemonchiffon: "#fffacd", lime: "#00ff00", khaki: "#f0e68c", mediumseagreen: "#3cb371", limegreen: "#32cd32", mediumspringgreen: "#00fa9a", lightskyblue: "#87cefa", lightblue: "#add8e6", midnightblue: "#191970", lightpink: "#ffb6c1", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", mintcream: "#f5fffa", lightslategray: "#778899", lightslategrey: "#778899", navajowhite: "#ffdead", navy: "#000080", mediumvioletred: "#c71585", powderblue: "#b0e0e6", palegoldenrod: "#eee8aa", oldlace: "#fdf5e6", paleturquoise: "#afeeee", mediumturquoise: "#48d1cc", mediumorchid: "#ba55d3", rebeccapurple: "#663399", lightsteelblue: "#b0c4de", mediumslateblue: "#7b68ee", thistle: "#d8bfd8", tan: "#d2b48c", orchid: "#da70d6", mediumpurple: "#9370db", purple: "#800080", pink: "#ffc0cb", skyblue: "#87ceeb", springgreen: "#00ff7f", palegreen: "#98fb98", red: "#ff0000", yellow: "#ffff00", slateblue: "#6a5acd", lavenderblush: "#fff0f5", peru: "#cd853f", palevioletred: "#db7093", violet: "#ee82ee", teal: "#008080", slategray: "#708090", slategrey: "#708090", aliceblue: "#f0f8ff", darkseagreen: "#8fbc8f", darkolivegreen: "#556b2f", greenyellow: "#adff2f", seagreen: "#2e8b57", seashell: "#fff5ee", tomato: "#ff6347", silver: "#c0c0c0", sienna: "#a0522d", lavender: "#e6e6fa", lightgreen: "#90ee90", orange: "#ffa500", orangered: "#ff4500", steelblue: "#4682b4", royalblue: "#4169e1", turquoise: "#40e0d0", yellowgreen: "#9acd32", salmon: "#fa8072", saddlebrown: "#8b4513", sandybrown: "#f4a460", rosybrown: "#bc8f8f", darksalmon: "#e9967a", lightgoldenrodyellow: "#fafad2", snow: "#fffafa", lightgrey: "#d3d3d3", lightgray: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969", olivedrab: "#6b8e23", olive: "#808000" }, r2 = {};
  for (var d2 in a2)
    r2[a2[d2]] = d2;
  var l2 = {};
  e2.prototype.toName = function(f3) {
    if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b))
      return "transparent";
    var d3, i2, n2 = r2[this.toHex()];
    if (n2)
      return n2;
    if (f3 == null ? undefined : f3.closest) {
      var o2 = this.toRgb(), t2 = 1 / 0, b2 = "black";
      if (!l2.length)
        for (var c2 in a2)
          l2[c2] = new e2(a2[c2]).toRgb();
      for (var g2 in a2) {
        var u2 = (d3 = o2, i2 = l2[g2], Math.pow(d3.r - i2.r, 2) + Math.pow(d3.g - i2.g, 2) + Math.pow(d3.b - i2.b, 2));
        u2 < t2 && (t2 = u2, b2 = g2);
      }
      return b2;
    }
  };
  f2.string.push([function(f3) {
    var r3 = f3.toLowerCase(), d3 = r3 === "transparent" ? "#0000" : a2[r3];
    return d3 ? new e2(d3).toRgb() : null;
  }, "name"]);
}

// node_modules/@pixi/color/lib/Color.mjs
k2([names_default]);
var _Color = class _Color2 {
  constructor(value = 16777215) {
    this._value = null, this._components = new Float32Array(4), this._components.fill(1), this._int = 16777215, this.value = value;
  }
  get red() {
    return this._components[0];
  }
  get green() {
    return this._components[1];
  }
  get blue() {
    return this._components[2];
  }
  get alpha() {
    return this._components[3];
  }
  setValue(value) {
    return this.value = value, this;
  }
  set value(value) {
    if (value instanceof _Color2)
      this._value = this.cloneSource(value._value), this._int = value._int, this._components.set(value._components);
    else {
      if (value === null)
        throw new Error("Cannot set PIXI.Color#value to null");
      (this._value === null || !this.isSourceEqual(this._value, value)) && (this.normalize(value), this._value = this.cloneSource(value));
    }
  }
  get value() {
    return this._value;
  }
  cloneSource(value) {
    return typeof value == "string" || typeof value == "number" || value instanceof Number || value === null ? value : Array.isArray(value) || ArrayBuffer.isView(value) ? value.slice(0) : typeof value == "object" && value !== null ? { ...value } : value;
  }
  isSourceEqual(value1, value2) {
    const type1 = typeof value1;
    if (type1 !== typeof value2)
      return false;
    if (type1 === "number" || type1 === "string" || value1 instanceof Number)
      return value1 === value2;
    if (Array.isArray(value1) && Array.isArray(value2) || ArrayBuffer.isView(value1) && ArrayBuffer.isView(value2))
      return value1.length !== value2.length ? false : value1.every((v2, i2) => v2 === value2[i2]);
    if (value1 !== null && value2 !== null) {
      const keys1 = Object.keys(value1), keys2 = Object.keys(value2);
      return keys1.length !== keys2.length ? false : keys1.every((key) => value1[key] === value2[key]);
    }
    return value1 === value2;
  }
  toRgba() {
    const [r2, g2, b2, a2] = this._components;
    return { r: r2, g: g2, b: b2, a: a2 };
  }
  toRgb() {
    const [r2, g2, b2] = this._components;
    return { r: r2, g: g2, b: b2 };
  }
  toRgbaString() {
    const [r2, g2, b2] = this.toUint8RgbArray();
    return `rgba(${r2},${g2},${b2},${this.alpha})`;
  }
  toUint8RgbArray(out) {
    const [r2, g2, b2] = this._components;
    return out = out ?? [], out[0] = Math.round(r2 * 255), out[1] = Math.round(g2 * 255), out[2] = Math.round(b2 * 255), out;
  }
  toRgbArray(out) {
    out = out ?? [];
    const [r2, g2, b2] = this._components;
    return out[0] = r2, out[1] = g2, out[2] = b2, out;
  }
  toNumber() {
    return this._int;
  }
  toLittleEndianNumber() {
    const value = this._int;
    return (value >> 16) + (value & 65280) + ((value & 255) << 16);
  }
  multiply(value) {
    const [r2, g2, b2, a2] = _Color2.temp.setValue(value)._components;
    return this._components[0] *= r2, this._components[1] *= g2, this._components[2] *= b2, this._components[3] *= a2, this.refreshInt(), this._value = null, this;
  }
  premultiply(alpha, applyToRGB = true) {
    return applyToRGB && (this._components[0] *= alpha, this._components[1] *= alpha, this._components[2] *= alpha), this._components[3] = alpha, this.refreshInt(), this._value = null, this;
  }
  toPremultiplied(alpha, applyToRGB = true) {
    if (alpha === 1)
      return (255 << 24) + this._int;
    if (alpha === 0)
      return applyToRGB ? 0 : this._int;
    let r2 = this._int >> 16 & 255, g2 = this._int >> 8 & 255, b2 = this._int & 255;
    return applyToRGB && (r2 = r2 * alpha + 0.5 | 0, g2 = g2 * alpha + 0.5 | 0, b2 = b2 * alpha + 0.5 | 0), (alpha * 255 << 24) + (r2 << 16) + (g2 << 8) + b2;
  }
  toHex() {
    const hexString = this._int.toString(16);
    return `#${"000000".substring(0, 6 - hexString.length) + hexString}`;
  }
  toHexa() {
    const alphaString = Math.round(this._components[3] * 255).toString(16);
    return this.toHex() + "00".substring(0, 2 - alphaString.length) + alphaString;
  }
  setAlpha(alpha) {
    return this._components[3] = this._clamp(alpha), this;
  }
  round(steps) {
    const [r2, g2, b2] = this._components;
    return this._components[0] = Math.round(r2 * steps) / steps, this._components[1] = Math.round(g2 * steps) / steps, this._components[2] = Math.round(b2 * steps) / steps, this.refreshInt(), this._value = null, this;
  }
  toArray(out) {
    out = out ?? [];
    const [r2, g2, b2, a2] = this._components;
    return out[0] = r2, out[1] = g2, out[2] = b2, out[3] = a2, out;
  }
  normalize(value) {
    let r2, g2, b2, a2;
    if ((typeof value == "number" || value instanceof Number) && value >= 0 && value <= 16777215) {
      const int = value;
      r2 = (int >> 16 & 255) / 255, g2 = (int >> 8 & 255) / 255, b2 = (int & 255) / 255, a2 = 1;
    } else if ((Array.isArray(value) || value instanceof Float32Array) && value.length >= 3 && value.length <= 4)
      value = this._clamp(value), [r2, g2, b2, a2 = 1] = value;
    else if ((value instanceof Uint8Array || value instanceof Uint8ClampedArray) && value.length >= 3 && value.length <= 4)
      value = this._clamp(value, 0, 255), [r2, g2, b2, a2 = 255] = value, r2 /= 255, g2 /= 255, b2 /= 255, a2 /= 255;
    else if (typeof value == "string" || typeof value == "object") {
      if (typeof value == "string") {
        const match = _Color2.HEX_PATTERN.exec(value);
        match && (value = `#${match[2]}`);
      }
      const color = w(value);
      color.isValid() && ({ r: r2, g: g2, b: b2, a: a2 } = color.rgba, r2 /= 255, g2 /= 255, b2 /= 255);
    }
    if (r2 !== undefined)
      this._components[0] = r2, this._components[1] = g2, this._components[2] = b2, this._components[3] = a2, this.refreshInt();
    else
      throw new Error(`Unable to convert color ${value}`);
  }
  refreshInt() {
    this._clamp(this._components);
    const [r2, g2, b2] = this._components;
    this._int = (r2 * 255 << 16) + (g2 * 255 << 8) + (b2 * 255 | 0);
  }
  _clamp(value, min = 0, max = 1) {
    return typeof value == "number" ? Math.min(Math.max(value, min), max) : (value.forEach((v2, i2) => {
      value[i2] = Math.min(Math.max(v2, min), max);
    }), value);
  }
};
_Color.shared = new _Color, _Color.temp = new _Color, _Color.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
var Color = _Color;

// node_modules/@pixi/utils/lib/color/hex.mjs
var hex2rgb = function(hex, out = []) {
  return deprecation("7.2.0", "utils.hex2rgb is deprecated, use Color#toRgbArray instead"), Color.shared.setValue(hex).toRgbArray(out);
};
var hex2string = function(hex) {
  return deprecation("7.2.0", "utils.hex2string is deprecated, use Color#toHex instead"), Color.shared.setValue(hex).toHex();
};
var string2hex = function(string) {
  return deprecation("7.2.0", "utils.string2hex is deprecated, use Color#toNumber instead"), Color.shared.setValue(string).toNumber();
};
var rgb2hex = function(rgb) {
  return deprecation("7.2.0", "utils.rgb2hex is deprecated, use Color#toNumber instead"), Color.shared.setValue(rgb).toNumber();
};

// node_modules/@pixi/utils/lib/color/premultiply.mjs
var mapPremultipliedBlendModes = function() {
  const pm = [], npm = [];
  for (let i2 = 0;i2 < 32; i2++)
    pm[i2] = i2, npm[i2] = i2;
  pm[BLEND_MODES.NORMAL_NPM] = BLEND_MODES.NORMAL, pm[BLEND_MODES.ADD_NPM] = BLEND_MODES.ADD, pm[BLEND_MODES.SCREEN_NPM] = BLEND_MODES.SCREEN, npm[BLEND_MODES.NORMAL] = BLEND_MODES.NORMAL_NPM, npm[BLEND_MODES.ADD] = BLEND_MODES.ADD_NPM, npm[BLEND_MODES.SCREEN] = BLEND_MODES.SCREEN_NPM;
  const array = [];
  return array.push(npm), array.push(pm), array;
};
var correctBlendMode = function(blendMode, premultiplied) {
  return premultiplyBlendMode[premultiplied ? 1 : 0][blendMode];
};
var premultiplyRgba = function(rgb, alpha, out, premultiply = true) {
  return deprecation("7.2.0", "utils.premultiplyRgba has moved to Color.premultiply"), Color.shared.setValue(rgb).premultiply(alpha, premultiply).toArray(out ?? new Float32Array(4));
};
var premultiplyTint = function(tint, alpha) {
  return deprecation("7.2.0", "utils.premultiplyTint has moved to Color.toPremultiplied"), Color.shared.setValue(tint).toPremultiplied(alpha);
};
var premultiplyTintToRgba = function(tint, alpha, out, premultiply = true) {
  return deprecation("7.2.0", "utils.premultiplyTintToRgba has moved to Color.premultiply"), Color.shared.setValue(tint).premultiply(alpha, premultiply).toArray(out ?? new Float32Array(4));
};
var premultiplyBlendMode = mapPremultipliedBlendModes();

// node_modules/@pixi/utils/lib/const.mjs
var DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;

// node_modules/@pixi/utils/lib/data/createIndicesForQuads.mjs
var createIndicesForQuads = function(size, outBuffer = null) {
  const totalIndices = size * 6;
  if (outBuffer = outBuffer || new Uint16Array(totalIndices), outBuffer.length !== totalIndices)
    throw new Error(`Out buffer length is incorrect, got ${outBuffer.length} and expected ${totalIndices}`);
  for (let i2 = 0, j2 = 0;i2 < totalIndices; i2 += 6, j2 += 4)
    outBuffer[i2 + 0] = j2 + 0, outBuffer[i2 + 1] = j2 + 1, outBuffer[i2 + 2] = j2 + 2, outBuffer[i2 + 3] = j2 + 0, outBuffer[i2 + 4] = j2 + 2, outBuffer[i2 + 5] = j2 + 3;
  return outBuffer;
};

// node_modules/@pixi/utils/lib/data/getBufferType.mjs
var getBufferType = function(array) {
  if (array.BYTES_PER_ELEMENT === 4)
    return array instanceof Float32Array ? "Float32Array" : array instanceof Uint32Array ? "Uint32Array" : "Int32Array";
  if (array.BYTES_PER_ELEMENT === 2) {
    if (array instanceof Uint16Array)
      return "Uint16Array";
  } else if (array.BYTES_PER_ELEMENT === 1 && array instanceof Uint8Array)
    return "Uint8Array";
  return null;
};

// node_modules/@pixi/utils/lib/data/interleaveTypedArrays.mjs
var interleaveTypedArrays = function(arrays, sizes) {
  let outSize = 0, stride = 0;
  const views = {};
  for (let i2 = 0;i2 < arrays.length; i2++)
    stride += sizes[i2], outSize += arrays[i2].length;
  const buffer = new ArrayBuffer(outSize * 4);
  let out = null, littleOffset = 0;
  for (let i2 = 0;i2 < arrays.length; i2++) {
    const size = sizes[i2], array = arrays[i2], type = getBufferType(array);
    views[type] || (views[type] = new map[type](buffer)), out = views[type];
    for (let j2 = 0;j2 < array.length; j2++) {
      const indexStart = (j2 / size | 0) * stride + littleOffset, index = j2 % size;
      out[indexStart + index] = array[j2];
    }
    littleOffset += size;
  }
  return new Float32Array(buffer);
};
var map = { Float32Array, Uint32Array, Int32Array, Uint8Array };

// node_modules/@pixi/utils/lib/data/pow2.mjs
var nextPow2 = function(v2) {
  return v2 += v2 === 0 ? 1 : 0, --v2, v2 |= v2 >>> 1, v2 |= v2 >>> 2, v2 |= v2 >>> 4, v2 |= v2 >>> 8, v2 |= v2 >>> 16, v2 + 1;
};
var isPow2 = function(v2) {
  return !(v2 & v2 - 1) && !!v2;
};
var log2 = function(v2) {
  let r2 = (v2 > 65535 ? 1 : 0) << 4;
  v2 >>>= r2;
  let shift = (v2 > 255 ? 1 : 0) << 3;
  return v2 >>>= shift, r2 |= shift, shift = (v2 > 15 ? 1 : 0) << 2, v2 >>>= shift, r2 |= shift, shift = (v2 > 3 ? 1 : 0) << 1, v2 >>>= shift, r2 |= shift, r2 | v2 >> 1;
};

// node_modules/@pixi/utils/lib/data/removeItems.mjs
var removeItems = function(arr, startIdx, removeCount) {
  const length = arr.length;
  let i2;
  if (startIdx >= length || removeCount === 0)
    return;
  removeCount = startIdx + removeCount > length ? length - startIdx : removeCount;
  const len = length - removeCount;
  for (i2 = startIdx;i2 < len; ++i2)
    arr[i2] = arr[i2 + removeCount];
  arr.length = len;
};

// node_modules/@pixi/utils/lib/data/sign.mjs
var sign = function(n2) {
  return n2 === 0 ? 0 : n2 < 0 ? -1 : 1;
};

// node_modules/@pixi/utils/lib/data/uid.mjs
var uid = function() {
  return ++nextUid;
};
var nextUid = 0;

// node_modules/@pixi/utils/lib/media/BoundingBox.mjs
var _BoundingBox = class {
  constructor(left, top, right, bottom) {
    this.left = left, this.top = top, this.right = right, this.bottom = bottom;
  }
  get width() {
    return this.right - this.left;
  }
  get height() {
    return this.bottom - this.top;
  }
  isEmpty() {
    return this.left === this.right || this.top === this.bottom;
  }
};
_BoundingBox.EMPTY = new _BoundingBox(0, 0, 0, 0);
var BoundingBox = _BoundingBox;

// node_modules/@pixi/utils/lib/media/caches.mjs
var destroyTextureCache = function() {
  let key;
  for (key in TextureCache)
    TextureCache[key].destroy();
  for (key in BaseTextureCache)
    BaseTextureCache[key].destroy();
};
var clearTextureCache = function() {
  let key;
  for (key in TextureCache)
    delete TextureCache[key];
  for (key in BaseTextureCache)
    delete BaseTextureCache[key];
};
var ProgramCache = {};
var TextureCache = Object.create(null);
var BaseTextureCache = Object.create(null);

// node_modules/@pixi/utils/lib/media/CanvasRenderTarget.mjs
class CanvasRenderTarget {
  constructor(width, height, resolution) {
    this._canvas = settings.ADAPTER.createCanvas(), this._context = this._canvas.getContext("2d"), this.resolution = resolution || settings.RESOLUTION, this.resize(width, height);
  }
  clear() {
    this._checkDestroyed(), this._context.setTransform(1, 0, 0, 1, 0, 0), this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }
  resize(desiredWidth, desiredHeight) {
    this._checkDestroyed(), this._canvas.width = Math.round(desiredWidth * this.resolution), this._canvas.height = Math.round(desiredHeight * this.resolution);
  }
  destroy() {
    this._context = null, this._canvas = null;
  }
  get width() {
    return this._checkDestroyed(), this._canvas.width;
  }
  set width(val) {
    this._checkDestroyed(), this._canvas.width = Math.round(val);
  }
  get height() {
    return this._checkDestroyed(), this._canvas.height;
  }
  set height(val) {
    this._checkDestroyed(), this._canvas.height = Math.round(val);
  }
  get canvas() {
    return this._checkDestroyed(), this._canvas;
  }
  get context() {
    return this._checkDestroyed(), this._context;
  }
  _checkDestroyed() {
    if (this._canvas === null)
      throw new TypeError("The CanvasRenderTarget has already been destroyed");
  }
}

// node_modules/@pixi/utils/lib/media/getCanvasBoundingBox.mjs
var checkRow = function(data, width, y2) {
  for (let x2 = 0, index = 4 * y2 * width;x2 < width; ++x2, index += 4)
    if (data[index + 3] !== 0)
      return false;
  return true;
};
var checkColumn = function(data, width, x2, top, bottom) {
  const stride = 4 * width;
  for (let y2 = top, index = top * stride + 4 * x2;y2 <= bottom; ++y2, index += stride)
    if (data[index + 3] !== 0)
      return false;
  return true;
};
var getCanvasBoundingBox = function(canvas) {
  const { width, height } = canvas, context = canvas.getContext("2d", {
    willReadFrequently: true
  });
  if (context === null)
    throw new TypeError("Failed to get canvas 2D context");
  const data = context.getImageData(0, 0, width, height).data;
  let left = 0, top = 0, right = width - 1, bottom = height - 1;
  for (;top < height && checkRow(data, width, top); )
    ++top;
  if (top === height)
    return BoundingBox.EMPTY;
  for (;checkRow(data, width, bottom); )
    --bottom;
  for (;checkColumn(data, width, left, top, bottom); )
    ++left;
  for (;checkColumn(data, width, right, top, bottom); )
    --right;
  return ++right, ++bottom, new BoundingBox(left, top, right, bottom);
};

// node_modules/@pixi/utils/lib/media/trimCanvas.mjs
var trimCanvas = function(canvas) {
  const boundingBox = getCanvasBoundingBox(canvas), { width, height } = boundingBox;
  let data = null;
  if (!boundingBox.isEmpty()) {
    const context = canvas.getContext("2d");
    if (context === null)
      throw new TypeError("Failed to get canvas 2D context");
    data = context.getImageData(boundingBox.left, boundingBox.top, width, height);
  }
  return { width, height, data };
};

// node_modules/@pixi/utils/lib/network/decomposeDataUri.mjs
var decomposeDataUri = function(dataUri) {
  const dataUriMatch = DATA_URI.exec(dataUri);
  if (dataUriMatch)
    return {
      mediaType: dataUriMatch[1] ? dataUriMatch[1].toLowerCase() : undefined,
      subType: dataUriMatch[2] ? dataUriMatch[2].toLowerCase() : undefined,
      charset: dataUriMatch[3] ? dataUriMatch[3].toLowerCase() : undefined,
      encoding: dataUriMatch[4] ? dataUriMatch[4].toLowerCase() : undefined,
      data: dataUriMatch[5]
    };
};

// node_modules/@pixi/utils/lib/network/determineCrossOrigin.mjs
var determineCrossOrigin = function(url2, loc = globalThis.location) {
  if (url2.startsWith("data:"))
    return "";
  loc = loc || globalThis.location;
  const parsedUrl = new URL(url2, document.baseURI);
  return parsedUrl.hostname !== loc.hostname || parsedUrl.port !== loc.port || parsedUrl.protocol !== loc.protocol ? "anonymous" : "";
};

// node_modules/@pixi/utils/lib/network/getResolutionOfUrl.mjs
var getResolutionOfUrl = function(url2, defaultValue = 1) {
  const resolution = settings.RETINA_PREFIX?.exec(url2);
  return resolution ? parseFloat(resolution[1]) : defaultValue;
};

// node_modules/@pixi/extensions/lib/index.mjs
var ExtensionType = ((ExtensionType2) => (ExtensionType2.Renderer = "renderer", ExtensionType2.Application = "application", ExtensionType2.RendererSystem = "renderer-webgl-system", ExtensionType2.RendererPlugin = "renderer-webgl-plugin", ExtensionType2.CanvasRendererSystem = "renderer-canvas-system", ExtensionType2.CanvasRendererPlugin = "renderer-canvas-plugin", ExtensionType2.Asset = "asset", ExtensionType2.LoadParser = "load-parser", ExtensionType2.ResolveParser = "resolve-parser", ExtensionType2.CacheParser = "cache-parser", ExtensionType2.DetectionParser = "detection-parser", ExtensionType2))(ExtensionType || {});
var normalizeExtension = (ext) => {
  if (typeof ext == "function" || typeof ext == "object" && ext.extension) {
    if (!ext.extension)
      throw new Error("Extension class must have an extension object");
    ext = { ...typeof ext.extension != "object" ? { type: ext.extension } : ext.extension, ref: ext };
  }
  if (typeof ext == "object")
    ext = { ...ext };
  else
    throw new Error("Invalid extension type");
  return typeof ext.type == "string" && (ext.type = [ext.type]), ext;
};
var normalizePriority = (ext, defaultPriority) => normalizeExtension(ext).priority ?? defaultPriority;
var extensions = {
  _addHandlers: {},
  _removeHandlers: {},
  _queue: {},
  remove(...extensions2) {
    return extensions2.map(normalizeExtension).forEach((ext) => {
      ext.type.forEach((type) => this._removeHandlers[type]?.(ext));
    }), this;
  },
  add(...extensions2) {
    return extensions2.map(normalizeExtension).forEach((ext) => {
      ext.type.forEach((type) => {
        const handlers = this._addHandlers, queue = this._queue;
        handlers[type] ? handlers[type](ext) : (queue[type] = queue[type] || [], queue[type].push(ext));
      });
    }), this;
  },
  handle(type, onAdd, onRemove) {
    const addHandlers = this._addHandlers, removeHandlers = this._removeHandlers;
    if (addHandlers[type] || removeHandlers[type])
      throw new Error(`Extension type ${type} already has a handler`);
    addHandlers[type] = onAdd, removeHandlers[type] = onRemove;
    const queue = this._queue;
    return queue[type] && (queue[type].forEach((ext) => onAdd(ext)), delete queue[type]), this;
  },
  handleByMap(type, map2) {
    return this.handle(type, (extension) => {
      map2[extension.name] = extension.ref;
    }, (extension) => {
      delete map2[extension.name];
    });
  },
  handleByList(type, list, defaultPriority = -1) {
    return this.handle(type, (extension) => {
      list.includes(extension.ref) || (list.push(extension.ref), list.sort((a2, b2) => normalizePriority(b2, defaultPriority) - normalizePriority(a2, defaultPriority)));
    }, (extension) => {
      const index = list.indexOf(extension.ref);
      index !== -1 && list.splice(index, 1);
    });
  }
};

// node_modules/@pixi/core/lib/geometry/ViewableBuffer.mjs
class ViewableBuffer {
  constructor(sizeOrBuffer) {
    typeof sizeOrBuffer == "number" ? this.rawBinaryData = new ArrayBuffer(sizeOrBuffer) : sizeOrBuffer instanceof Uint8Array ? this.rawBinaryData = sizeOrBuffer.buffer : this.rawBinaryData = sizeOrBuffer, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData);
  }
  get int8View() {
    return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View;
  }
  get uint8View() {
    return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View;
  }
  get int16View() {
    return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View;
  }
  get uint16View() {
    return this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)), this._uint16View;
  }
  get int32View() {
    return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View;
  }
  view(type) {
    return this[`${type}View`];
  }
  destroy() {
    this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
  }
  static sizeOf(type) {
    switch (type) {
      case "int8":
      case "uint8":
        return 1;
      case "int16":
      case "uint16":
        return 2;
      case "int32":
      case "uint32":
      case "float32":
        return 4;
      default:
        throw new Error(`${type} isn't a valid view type`);
    }
  }
}

// node_modules/@pixi/core/lib/shader/utils/checkMaxIfStatementsInShader.mjs
var generateIfTestSrc = function(maxIfs) {
  let src = "";
  for (let i2 = 0;i2 < maxIfs; ++i2)
    i2 > 0 && (src += `
else `), i2 < maxIfs - 1 && (src += `if(test == ${i2}.0){}`);
  return src;
};
var checkMaxIfStatementsInShader = function(maxIfs, gl) {
  if (maxIfs === 0)
    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
  const shader = gl.createShader(gl.FRAGMENT_SHADER);
  for (;; ) {
    const fragmentSrc = fragTemplate.replace(/%forloop%/gi, generateIfTestSrc(maxIfs));
    if (gl.shaderSource(shader, fragmentSrc), gl.compileShader(shader), !gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      maxIfs = maxIfs / 2 | 0;
    else
      break;
  }
  return maxIfs;
};
var fragTemplate = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}"
].join(`
`);

// node_modules/@pixi/core/lib/state/State.mjs
var BLEND = 0;
var OFFSET = 1;
var CULLING = 2;
var DEPTH_TEST = 3;
var WINDING = 4;
var DEPTH_MASK = 5;

class State {
  constructor() {
    this.data = 0, this.blendMode = BLEND_MODES.NORMAL, this.polygonOffset = 0, this.blend = true, this.depthMask = true;
  }
  get blend() {
    return !!(this.data & 1 << BLEND);
  }
  set blend(value) {
    !!(this.data & 1 << BLEND) !== value && (this.data ^= 1 << BLEND);
  }
  get offsets() {
    return !!(this.data & 1 << OFFSET);
  }
  set offsets(value) {
    !!(this.data & 1 << OFFSET) !== value && (this.data ^= 1 << OFFSET);
  }
  get culling() {
    return !!(this.data & 1 << CULLING);
  }
  set culling(value) {
    !!(this.data & 1 << CULLING) !== value && (this.data ^= 1 << CULLING);
  }
  get depthTest() {
    return !!(this.data & 1 << DEPTH_TEST);
  }
  set depthTest(value) {
    !!(this.data & 1 << DEPTH_TEST) !== value && (this.data ^= 1 << DEPTH_TEST);
  }
  get depthMask() {
    return !!(this.data & 1 << DEPTH_MASK);
  }
  set depthMask(value) {
    !!(this.data & 1 << DEPTH_MASK) !== value && (this.data ^= 1 << DEPTH_MASK);
  }
  get clockwiseFrontFace() {
    return !!(this.data & 1 << WINDING);
  }
  set clockwiseFrontFace(value) {
    !!(this.data & 1 << WINDING) !== value && (this.data ^= 1 << WINDING);
  }
  get blendMode() {
    return this._blendMode;
  }
  set blendMode(value) {
    this.blend = value !== BLEND_MODES.NONE, this._blendMode = value;
  }
  get polygonOffset() {
    return this._polygonOffset;
  }
  set polygonOffset(value) {
    this.offsets = !!value, this._polygonOffset = value;
  }
  static for2d() {
    const state = new State;
    return state.depthTest = false, state.blend = true, state;
  }
}
State.prototype.toString = function() {
  return `[@pixi/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`;
};

// node_modules/@pixi/core/lib/textures/resources/autoDetectResource.mjs
var autoDetectResource = function(source, options) {
  if (!source)
    return null;
  let extension = "";
  if (typeof source == "string") {
    const result = /\.(\w{3,4})(?:$|\?|#)/i.exec(source);
    result && (extension = result[1].toLowerCase());
  }
  for (let i2 = INSTALLED.length - 1;i2 >= 0; --i2) {
    const ResourcePlugin = INSTALLED[i2];
    if (ResourcePlugin.test && ResourcePlugin.test(source, extension))
      return new ResourcePlugin(source, options);
  }
  throw new Error("Unrecognized source type to auto-detect Resource");
};
var INSTALLED = [];

// node_modules/@pixi/runner/lib/Runner.mjs
class Runner {
  constructor(name) {
    this.items = [], this._name = name, this._aliasCount = 0;
  }
  emit(a0, a1, a2, a3, a4, a5, a6, a7) {
    if (arguments.length > 8)
      throw new Error("max arguments reached");
    const { name, items } = this;
    this._aliasCount++;
    for (let i2 = 0, len = items.length;i2 < len; i2++)
      items[i2][name](a0, a1, a2, a3, a4, a5, a6, a7);
    return items === this.items && this._aliasCount--, this;
  }
  ensureNonAliasedItems() {
    this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0));
  }
  add(item) {
    return item[this._name] && (this.ensureNonAliasedItems(), this.remove(item), this.items.push(item)), this;
  }
  remove(item) {
    const index = this.items.indexOf(item);
    return index !== -1 && (this.ensureNonAliasedItems(), this.items.splice(index, 1)), this;
  }
  contains(item) {
    return this.items.includes(item);
  }
  removeAll() {
    return this.ensureNonAliasedItems(), this.items.length = 0, this;
  }
  destroy() {
    this.removeAll(), this.items = null, this._name = null;
  }
  get empty() {
    return this.items.length === 0;
  }
  get name() {
    return this._name;
  }
}
Object.defineProperties(Runner.prototype, {
  dispatch: { value: Runner.prototype.emit },
  run: { value: Runner.prototype.emit }
});

// node_modules/@pixi/core/lib/textures/resources/Resource.mjs
class Resource {
  constructor(width = 0, height = 0) {
    this._width = width, this._height = height, this.destroyed = false, this.internal = false, this.onResize = new Runner("setRealSize"), this.onUpdate = new Runner("update"), this.onError = new Runner("onError");
  }
  bind(baseTexture) {
    this.onResize.add(baseTexture), this.onUpdate.add(baseTexture), this.onError.add(baseTexture), (this._width || this._height) && this.onResize.emit(this._width, this._height);
  }
  unbind(baseTexture) {
    this.onResize.remove(baseTexture), this.onUpdate.remove(baseTexture), this.onError.remove(baseTexture);
  }
  resize(width, height) {
    (width !== this._width || height !== this._height) && (this._width = width, this._height = height, this.onResize.emit(width, height));
  }
  get valid() {
    return !!this._width && !!this._height;
  }
  update() {
    this.destroyed || this.onUpdate.emit();
  }
  load() {
    return Promise.resolve(this);
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  style(_renderer, _baseTexture, _glTexture) {
    return false;
  }
  dispose() {
  }
  destroy() {
    this.destroyed || (this.destroyed = true, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null);
  }
  static test(_source, _extension) {
    return false;
  }
}

// node_modules/@pixi/core/lib/textures/resources/BufferResource.mjs
class BufferResource extends Resource {
  constructor(source, options) {
    const { width, height } = options || {};
    if (!width || !height)
      throw new Error("BufferResource width or height invalid");
    super(width, height), this.data = source, this.unpackAlignment = options.unpackAlignment ?? 4;
  }
  upload(renderer, baseTexture, glTexture) {
    const gl = renderer.gl;
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, this.unpackAlignment), gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === ALPHA_MODES.UNPACK);
    const { realWidth: width, realHeight: height } = baseTexture;
    return glTexture.width === width && glTexture.height === height ? gl.texSubImage2D(baseTexture.target, 0, 0, 0, width, height, baseTexture.format, glTexture.type, this.data) : (glTexture.width = width, glTexture.height = height, gl.texImage2D(baseTexture.target, 0, glTexture.internalFormat, width, height, 0, baseTexture.format, glTexture.type, this.data)), true;
  }
  dispose() {
    this.data = null;
  }
  static test(source) {
    return source === null || source instanceof Int8Array || source instanceof Uint8Array || source instanceof Uint8ClampedArray || source instanceof Int16Array || source instanceof Uint16Array || source instanceof Int32Array || source instanceof Uint32Array || source instanceof Float32Array;
  }
}

// node_modules/@pixi/core/lib/textures/BaseTexture.mjs
var defaultBufferOptions = {
  scaleMode: SCALE_MODES.NEAREST,
  alphaMode: ALPHA_MODES.NPM
};
var _BaseTexture = class _BaseTexture2 extends import_eventemitter3.default {
  constructor(resource = null, options = null) {
    super(), options = Object.assign({}, _BaseTexture2.defaultOptions, options);
    const {
      alphaMode,
      mipmap,
      anisotropicLevel,
      scaleMode,
      width,
      height,
      wrapMode,
      format,
      type,
      target,
      resolution,
      resourceOptions
    } = options;
    resource && !(resource instanceof Resource) && (resource = autoDetectResource(resource, resourceOptions), resource.internal = true), this.resolution = resolution || settings.RESOLUTION, this.width = Math.round((width || 0) * this.resolution) / this.resolution, this.height = Math.round((height || 0) * this.resolution) / this.resolution, this._mipmap = mipmap, this.anisotropicLevel = anisotropicLevel, this._wrapMode = wrapMode, this._scaleMode = scaleMode, this.format = format, this.type = type, this.target = target, this.alphaMode = alphaMode, this.uid = uid(), this.touched = 0, this.isPowerOfTwo = false, this._refreshPOT(), this._glTextures = {}, this.dirtyId = 0, this.dirtyStyleId = 0, this.cacheId = null, this.valid = width > 0 && height > 0, this.textureCacheIds = [], this.destroyed = false, this.resource = null, this._batchEnabled = 0, this._batchLocation = 0, this.parentTextureArray = null, this.setResource(resource);
  }
  get realWidth() {
    return Math.round(this.width * this.resolution);
  }
  get realHeight() {
    return Math.round(this.height * this.resolution);
  }
  get mipmap() {
    return this._mipmap;
  }
  set mipmap(value) {
    this._mipmap !== value && (this._mipmap = value, this.dirtyStyleId++);
  }
  get scaleMode() {
    return this._scaleMode;
  }
  set scaleMode(value) {
    this._scaleMode !== value && (this._scaleMode = value, this.dirtyStyleId++);
  }
  get wrapMode() {
    return this._wrapMode;
  }
  set wrapMode(value) {
    this._wrapMode !== value && (this._wrapMode = value, this.dirtyStyleId++);
  }
  setStyle(scaleMode, mipmap) {
    let dirty;
    return scaleMode !== undefined && scaleMode !== this.scaleMode && (this.scaleMode = scaleMode, dirty = true), mipmap !== undefined && mipmap !== this.mipmap && (this.mipmap = mipmap, dirty = true), dirty && this.dirtyStyleId++, this;
  }
  setSize(desiredWidth, desiredHeight, resolution) {
    return resolution = resolution || this.resolution, this.setRealSize(desiredWidth * resolution, desiredHeight * resolution, resolution);
  }
  setRealSize(realWidth, realHeight, resolution) {
    return this.resolution = resolution || this.resolution, this.width = Math.round(realWidth) / this.resolution, this.height = Math.round(realHeight) / this.resolution, this._refreshPOT(), this.update(), this;
  }
  _refreshPOT() {
    this.isPowerOfTwo = isPow2(this.realWidth) && isPow2(this.realHeight);
  }
  setResolution(resolution) {
    const oldResolution = this.resolution;
    return oldResolution === resolution ? this : (this.resolution = resolution, this.valid && (this.width = Math.round(this.width * oldResolution) / resolution, this.height = Math.round(this.height * oldResolution) / resolution, this.emit("update", this)), this._refreshPOT(), this);
  }
  setResource(resource) {
    if (this.resource === resource)
      return this;
    if (this.resource)
      throw new Error("Resource can be set only once");
    return resource.bind(this), this.resource = resource, this;
  }
  update() {
    this.valid ? (this.dirtyId++, this.dirtyStyleId++, this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = true, this.emit("loaded", this), this.emit("update", this));
  }
  onError(event) {
    this.emit("error", this, event);
  }
  destroy() {
    this.resource && (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), this.resource = null), this.cacheId && (delete BaseTextureCache[this.cacheId], delete TextureCache[this.cacheId], this.cacheId = null), this.valid = false, this.dispose(), _BaseTexture2.removeFromCache(this), this.textureCacheIds = null, this.destroyed = true, this.emit("destroyed", this), this.removeAllListeners();
  }
  dispose() {
    this.emit("dispose", this);
  }
  castToBaseTexture() {
    return this;
  }
  static from(source, options, strict = settings.STRICT_TEXTURE_CACHE) {
    const isFrame = typeof source == "string";
    let cacheId = null;
    if (isFrame)
      cacheId = source;
    else {
      if (!source._pixiId) {
        const prefix = options?.pixiIdPrefix || "pixiid";
        source._pixiId = `${prefix}_${uid()}`;
      }
      cacheId = source._pixiId;
    }
    let baseTexture = BaseTextureCache[cacheId];
    if (isFrame && strict && !baseTexture)
      throw new Error(`The cacheId "${cacheId}" does not exist in BaseTextureCache.`);
    return baseTexture || (baseTexture = new _BaseTexture2(source, options), baseTexture.cacheId = cacheId, _BaseTexture2.addToCache(baseTexture, cacheId)), baseTexture;
  }
  static fromBuffer(buffer, width, height, options) {
    buffer = buffer || new Float32Array(width * height * 4);
    const resource = new BufferResource(buffer, { width, height, ...options?.resourceOptions });
    let format, type;
    return buffer instanceof Float32Array ? (format = FORMATS.RGBA, type = TYPES.FLOAT) : buffer instanceof Int32Array ? (format = FORMATS.RGBA_INTEGER, type = TYPES.INT) : buffer instanceof Uint32Array ? (format = FORMATS.RGBA_INTEGER, type = TYPES.UNSIGNED_INT) : buffer instanceof Int16Array ? (format = FORMATS.RGBA_INTEGER, type = TYPES.SHORT) : buffer instanceof Uint16Array ? (format = FORMATS.RGBA_INTEGER, type = TYPES.UNSIGNED_SHORT) : buffer instanceof Int8Array ? (format = FORMATS.RGBA, type = TYPES.BYTE) : (format = FORMATS.RGBA, type = TYPES.UNSIGNED_BYTE), resource.internal = true, new _BaseTexture2(resource, Object.assign({}, defaultBufferOptions, { type, format }, options));
  }
  static addToCache(baseTexture, id) {
    id && (baseTexture.textureCacheIds.includes(id) || baseTexture.textureCacheIds.push(id), BaseTextureCache[id] && BaseTextureCache[id] !== baseTexture && console.warn(`BaseTexture added to the cache with an id [${id}] that already had an entry`), BaseTextureCache[id] = baseTexture);
  }
  static removeFromCache(baseTexture) {
    if (typeof baseTexture == "string") {
      const baseTextureFromCache = BaseTextureCache[baseTexture];
      if (baseTextureFromCache) {
        const index = baseTextureFromCache.textureCacheIds.indexOf(baseTexture);
        return index > -1 && baseTextureFromCache.textureCacheIds.splice(index, 1), delete BaseTextureCache[baseTexture], baseTextureFromCache;
      }
    } else if (baseTexture?.textureCacheIds) {
      for (let i2 = 0;i2 < baseTexture.textureCacheIds.length; ++i2)
        delete BaseTextureCache[baseTexture.textureCacheIds[i2]];
      return baseTexture.textureCacheIds.length = 0, baseTexture;
    }
    return null;
  }
};
_BaseTexture.defaultOptions = {
  mipmap: MIPMAP_MODES.POW2,
  anisotropicLevel: 0,
  scaleMode: SCALE_MODES.LINEAR,
  wrapMode: WRAP_MODES.CLAMP,
  alphaMode: ALPHA_MODES.UNPACK,
  target: TARGETS.TEXTURE_2D,
  format: FORMATS.RGBA,
  type: TYPES.UNSIGNED_BYTE
}, _BaseTexture._globalBatch = 0;
var BaseTexture = _BaseTexture;

// node_modules/@pixi/core/lib/batch/BatchDrawCall.mjs
class BatchDrawCall {
  constructor() {
    this.texArray = null, this.blend = 0, this.type = DRAW_MODES.TRIANGLES, this.start = 0, this.size = 0, this.data = null;
  }
}

// node_modules/@pixi/core/lib/geometry/Buffer.mjs
var UID = 0;

class Buffer {
  constructor(data, _static = true, index = false) {
    this.data = data || new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = index, this.static = _static, this.id = UID++, this.disposeRunner = new Runner("disposeBuffer");
  }
  update(data) {
    data instanceof Array && (data = new Float32Array(data)), this.data = data || this.data, this._updateID++;
  }
  dispose() {
    this.disposeRunner.emit(this, false);
  }
  destroy() {
    this.dispose(), this.data = null;
  }
  set index(value) {
    this.type = value ? BUFFER_TYPE.ELEMENT_ARRAY_BUFFER : BUFFER_TYPE.ARRAY_BUFFER;
  }
  get index() {
    return this.type === BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
  }
  static from(data) {
    return data instanceof Array && (data = new Float32Array(data)), new Buffer(data);
  }
}

// node_modules/@pixi/core/lib/geometry/Attribute.mjs
class Attribute {
  constructor(buffer, size = 0, normalized = false, type = TYPES.FLOAT, stride, start, instance, divisor = 1) {
    this.buffer = buffer, this.size = size, this.normalized = normalized, this.type = type, this.stride = stride, this.start = start, this.instance = instance, this.divisor = divisor;
  }
  destroy() {
    this.buffer = null;
  }
  static from(buffer, size, normalized, type, stride) {
    return new Attribute(buffer, size, normalized, type, stride);
  }
}

// node_modules/@pixi/core/lib/geometry/utils/interleaveTypedArrays.mjs
var interleaveTypedArrays3 = function(arrays, sizes) {
  let outSize = 0, stride = 0;
  const views = {};
  for (let i2 = 0;i2 < arrays.length; i2++)
    stride += sizes[i2], outSize += arrays[i2].length;
  const buffer = new ArrayBuffer(outSize * 4);
  let out = null, littleOffset = 0;
  for (let i2 = 0;i2 < arrays.length; i2++) {
    const size = sizes[i2], array = arrays[i2], type = getBufferType(array);
    views[type] || (views[type] = new map2[type](buffer)), out = views[type];
    for (let j2 = 0;j2 < array.length; j2++) {
      const indexStart = (j2 / size | 0) * stride + littleOffset, index = j2 % size;
      out[indexStart + index] = array[j2];
    }
    littleOffset += size;
  }
  return new Float32Array(buffer);
};
var map2 = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array
};

// node_modules/@pixi/core/lib/geometry/Geometry.mjs
var byteSizeMap = { 5126: 4, 5123: 2, 5121: 1 };
var UID2 = 0;
var map3 = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array,
  Uint16Array
};

class Geometry {
  constructor(buffers = [], attributes = {}) {
    this.buffers = buffers, this.indexBuffer = null, this.attributes = attributes, this.glVertexArrayObjects = {}, this.id = UID2++, this.instanced = false, this.instanceCount = 1, this.disposeRunner = new Runner("disposeGeometry"), this.refCount = 0;
  }
  addAttribute(id, buffer, size = 0, normalized = false, type, stride, start, instance = false) {
    if (!buffer)
      throw new Error("You must pass a buffer when creating an attribute");
    buffer instanceof Buffer || (buffer instanceof Array && (buffer = new Float32Array(buffer)), buffer = new Buffer(buffer));
    const ids = id.split("|");
    if (ids.length > 1) {
      for (let i2 = 0;i2 < ids.length; i2++)
        this.addAttribute(ids[i2], buffer, size, normalized, type);
      return this;
    }
    let bufferIndex = this.buffers.indexOf(buffer);
    return bufferIndex === -1 && (this.buffers.push(buffer), bufferIndex = this.buffers.length - 1), this.attributes[id] = new Attribute(bufferIndex, size, normalized, type, stride, start, instance), this.instanced = this.instanced || instance, this;
  }
  getAttribute(id) {
    return this.attributes[id];
  }
  getBuffer(id) {
    return this.buffers[this.getAttribute(id).buffer];
  }
  addIndex(buffer) {
    return buffer instanceof Buffer || (buffer instanceof Array && (buffer = new Uint16Array(buffer)), buffer = new Buffer(buffer)), buffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER, this.indexBuffer = buffer, this.buffers.includes(buffer) || this.buffers.push(buffer), this;
  }
  getIndex() {
    return this.indexBuffer;
  }
  interleave() {
    if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer)
      return this;
    const arrays = [], sizes = [], interleavedBuffer = new Buffer;
    let i2;
    for (i2 in this.attributes) {
      const attribute = this.attributes[i2], buffer = this.buffers[attribute.buffer];
      arrays.push(buffer.data), sizes.push(attribute.size * byteSizeMap[attribute.type] / 4), attribute.buffer = 0;
    }
    for (interleavedBuffer.data = interleaveTypedArrays3(arrays, sizes), i2 = 0;i2 < this.buffers.length; i2++)
      this.buffers[i2] !== this.indexBuffer && this.buffers[i2].destroy();
    return this.buffers = [interleavedBuffer], this.indexBuffer && this.buffers.push(this.indexBuffer), this;
  }
  getSize() {
    for (const i2 in this.attributes) {
      const attribute = this.attributes[i2];
      return this.buffers[attribute.buffer].data.length / (attribute.stride / 4 || attribute.size);
    }
    return 0;
  }
  dispose() {
    this.disposeRunner.emit(this, false);
  }
  destroy() {
    this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null;
  }
  clone() {
    const geometry = new Geometry;
    for (let i2 = 0;i2 < this.buffers.length; i2++)
      geometry.buffers[i2] = new Buffer(this.buffers[i2].data.slice(0));
    for (const i2 in this.attributes) {
      const attrib = this.attributes[i2];
      geometry.attributes[i2] = new Attribute(attrib.buffer, attrib.size, attrib.normalized, attrib.type, attrib.stride, attrib.start, attrib.instance);
    }
    return this.indexBuffer && (geometry.indexBuffer = geometry.buffers[this.buffers.indexOf(this.indexBuffer)], geometry.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER), geometry;
  }
  static merge(geometries) {
    const geometryOut = new Geometry, arrays = [], sizes = [], offsets = [];
    let geometry;
    for (let i2 = 0;i2 < geometries.length; i2++) {
      geometry = geometries[i2];
      for (let j2 = 0;j2 < geometry.buffers.length; j2++)
        sizes[j2] = sizes[j2] || 0, sizes[j2] += geometry.buffers[j2].data.length, offsets[j2] = 0;
    }
    for (let i2 = 0;i2 < geometry.buffers.length; i2++)
      arrays[i2] = new map3[getBufferType(geometry.buffers[i2].data)](sizes[i2]), geometryOut.buffers[i2] = new Buffer(arrays[i2]);
    for (let i2 = 0;i2 < geometries.length; i2++) {
      geometry = geometries[i2];
      for (let j2 = 0;j2 < geometry.buffers.length; j2++)
        arrays[j2].set(geometry.buffers[j2].data, offsets[j2]), offsets[j2] += geometry.buffers[j2].data.length;
    }
    if (geometryOut.attributes = geometry.attributes, geometry.indexBuffer) {
      geometryOut.indexBuffer = geometryOut.buffers[geometry.buffers.indexOf(geometry.indexBuffer)], geometryOut.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
      let offset = 0, stride = 0, offset2 = 0, bufferIndexToCount = 0;
      for (let i2 = 0;i2 < geometry.buffers.length; i2++)
        if (geometry.buffers[i2] !== geometry.indexBuffer) {
          bufferIndexToCount = i2;
          break;
        }
      for (const i2 in geometry.attributes) {
        const attribute = geometry.attributes[i2];
        (attribute.buffer | 0) === bufferIndexToCount && (stride += attribute.size * byteSizeMap[attribute.type] / 4);
      }
      for (let i2 = 0;i2 < geometries.length; i2++) {
        const indexBufferData = geometries[i2].indexBuffer.data;
        for (let j2 = 0;j2 < indexBufferData.length; j2++)
          geometryOut.indexBuffer.data[j2 + offset2] += offset;
        offset += geometries[i2].buffers[bufferIndexToCount].data.length / stride, offset2 += indexBufferData.length;
      }
    }
    return geometryOut;
  }
}

// node_modules/@pixi/core/lib/batch/BatchGeometry.mjs
class BatchGeometry extends Geometry {
  constructor(_static = false) {
    super(), this._buffer = new Buffer(null, _static, false), this._indexBuffer = new Buffer(null, _static, true), this.addAttribute("aVertexPosition", this._buffer, 2, false, TYPES.FLOAT).addAttribute("aTextureCoord", this._buffer, 2, false, TYPES.FLOAT).addAttribute("aColor", this._buffer, 4, true, TYPES.UNSIGNED_BYTE).addAttribute("aTextureId", this._buffer, 1, true, TYPES.FLOAT).addIndex(this._indexBuffer);
  }
}

// node_modules/@pixi/math/lib/const.mjs
var PI_2 = Math.PI * 2;
var RAD_TO_DEG = 180 / Math.PI;
var DEG_TO_RAD = Math.PI / 180;
var SHAPES = ((SHAPES2) => (SHAPES2[SHAPES2.POLY = 0] = "POLY", SHAPES2[SHAPES2.RECT = 1] = "RECT", SHAPES2[SHAPES2.CIRC = 2] = "CIRC", SHAPES2[SHAPES2.ELIP = 3] = "ELIP", SHAPES2[SHAPES2.RREC = 4] = "RREC", SHAPES2))(SHAPES || {});

// node_modules/@pixi/math/lib/Point.mjs
class Point {
  constructor(x2 = 0, y2 = 0) {
    this.x = 0, this.y = 0, this.x = x2, this.y = y2;
  }
  clone() {
    return new Point(this.x, this.y);
  }
  copyFrom(p2) {
    return this.set(p2.x, p2.y), this;
  }
  copyTo(p2) {
    return p2.set(this.x, this.y), p2;
  }
  equals(p2) {
    return p2.x === this.x && p2.y === this.y;
  }
  set(x2 = 0, y2 = x2) {
    return this.x = x2, this.y = y2, this;
  }
}
Point.prototype.toString = function() {
  return `[@pixi/math:Point x=${this.x} y=${this.y}]`;
};

// node_modules/@pixi/math/lib/shapes/Rectangle.mjs
var tempPoints = [new Point, new Point, new Point, new Point];

class Rectangle {
  constructor(x2 = 0, y2 = 0, width = 0, height = 0) {
    this.x = Number(x2), this.y = Number(y2), this.width = Number(width), this.height = Number(height), this.type = SHAPES.RECT;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  static get EMPTY() {
    return new Rectangle(0, 0, 0, 0);
  }
  clone() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }
  copyFrom(rectangle) {
    return this.x = rectangle.x, this.y = rectangle.y, this.width = rectangle.width, this.height = rectangle.height, this;
  }
  copyTo(rectangle) {
    return rectangle.x = this.x, rectangle.y = this.y, rectangle.width = this.width, rectangle.height = this.height, rectangle;
  }
  contains(x2, y2) {
    return this.width <= 0 || this.height <= 0 ? false : x2 >= this.x && x2 < this.x + this.width && y2 >= this.y && y2 < this.y + this.height;
  }
  intersects(other, transform) {
    if (!transform) {
      const x02 = this.x < other.x ? other.x : this.x;
      if ((this.right > other.right ? other.right : this.right) <= x02)
        return false;
      const y02 = this.y < other.y ? other.y : this.y;
      return (this.bottom > other.bottom ? other.bottom : this.bottom) > y02;
    }
    const x0 = this.left, x1 = this.right, y0 = this.top, y1 = this.bottom;
    if (x1 <= x0 || y1 <= y0)
      return false;
    const lt = tempPoints[0].set(other.left, other.top), lb = tempPoints[1].set(other.left, other.bottom), rt2 = tempPoints[2].set(other.right, other.top), rb = tempPoints[3].set(other.right, other.bottom);
    if (rt2.x <= lt.x || lb.y <= lt.y)
      return false;
    const s2 = Math.sign(transform.a * transform.d - transform.b * transform.c);
    if (s2 === 0 || (transform.apply(lt, lt), transform.apply(lb, lb), transform.apply(rt2, rt2), transform.apply(rb, rb), Math.max(lt.x, lb.x, rt2.x, rb.x) <= x0 || Math.min(lt.x, lb.x, rt2.x, rb.x) >= x1 || Math.max(lt.y, lb.y, rt2.y, rb.y) <= y0 || Math.min(lt.y, lb.y, rt2.y, rb.y) >= y1))
      return false;
    const nx = s2 * (lb.y - lt.y), ny = s2 * (lt.x - lb.x), n00 = nx * x0 + ny * y0, n10 = nx * x1 + ny * y0, n01 = nx * x0 + ny * y1, n11 = nx * x1 + ny * y1;
    if (Math.max(n00, n10, n01, n11) <= nx * lt.x + ny * lt.y || Math.min(n00, n10, n01, n11) >= nx * rb.x + ny * rb.y)
      return false;
    const mx = s2 * (lt.y - rt2.y), my = s2 * (rt2.x - lt.x), m00 = mx * x0 + my * y0, m10 = mx * x1 + my * y0, m01 = mx * x0 + my * y1, m11 = mx * x1 + my * y1;
    return !(Math.max(m00, m10, m01, m11) <= mx * lt.x + my * lt.y || Math.min(m00, m10, m01, m11) >= mx * rb.x + my * rb.y);
  }
  pad(paddingX = 0, paddingY = paddingX) {
    return this.x -= paddingX, this.y -= paddingY, this.width += paddingX * 2, this.height += paddingY * 2, this;
  }
  fit(rectangle) {
    const x1 = Math.max(this.x, rectangle.x), x2 = Math.min(this.x + this.width, rectangle.x + rectangle.width), y1 = Math.max(this.y, rectangle.y), y2 = Math.min(this.y + this.height, rectangle.y + rectangle.height);
    return this.x = x1, this.width = Math.max(x2 - x1, 0), this.y = y1, this.height = Math.max(y2 - y1, 0), this;
  }
  ceil(resolution = 1, eps = 0.001) {
    const x2 = Math.ceil((this.x + this.width - eps) * resolution) / resolution, y2 = Math.ceil((this.y + this.height - eps) * resolution) / resolution;
    return this.x = Math.floor((this.x + eps) * resolution) / resolution, this.y = Math.floor((this.y + eps) * resolution) / resolution, this.width = x2 - this.x, this.height = y2 - this.y, this;
  }
  enlarge(rectangle) {
    const x1 = Math.min(this.x, rectangle.x), x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width), y1 = Math.min(this.y, rectangle.y), y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);
    return this.x = x1, this.width = x2 - x1, this.y = y1, this.height = y2 - y1, this;
  }
}
Rectangle.prototype.toString = function() {
  return `[@pixi/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
};

// node_modules/@pixi/math/lib/shapes/Circle.mjs
class Circle {
  constructor(x2 = 0, y2 = 0, radius = 0) {
    this.x = x2, this.y = y2, this.radius = radius, this.type = SHAPES.CIRC;
  }
  clone() {
    return new Circle(this.x, this.y, this.radius);
  }
  contains(x2, y2) {
    if (this.radius <= 0)
      return false;
    const r2 = this.radius * this.radius;
    let dx = this.x - x2, dy = this.y - y2;
    return dx *= dx, dy *= dy, dx + dy <= r2;
  }
  getBounds() {
    return new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }
}
Circle.prototype.toString = function() {
  return `[@pixi/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`;
};

// node_modules/@pixi/math/lib/shapes/Ellipse.mjs
class Ellipse {
  constructor(x2 = 0, y2 = 0, halfWidth = 0, halfHeight = 0) {
    this.x = x2, this.y = y2, this.width = halfWidth, this.height = halfHeight, this.type = SHAPES.ELIP;
  }
  clone() {
    return new Ellipse(this.x, this.y, this.width, this.height);
  }
  contains(x2, y2) {
    if (this.width <= 0 || this.height <= 0)
      return false;
    let normx = (x2 - this.x) / this.width, normy = (y2 - this.y) / this.height;
    return normx *= normx, normy *= normy, normx + normy <= 1;
  }
  getBounds() {
    return new Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
  }
}
Ellipse.prototype.toString = function() {
  return `[@pixi/math:Ellipse x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
};

// node_modules/@pixi/math/lib/shapes/Polygon.mjs
class Polygon {
  constructor(...points) {
    let flat = Array.isArray(points[0]) ? points[0] : points;
    if (typeof flat[0] != "number") {
      const p2 = [];
      for (let i2 = 0, il = flat.length;i2 < il; i2++)
        p2.push(flat[i2].x, flat[i2].y);
      flat = p2;
    }
    this.points = flat, this.type = SHAPES.POLY, this.closeStroke = true;
  }
  clone() {
    const points = this.points.slice(), polygon = new Polygon(points);
    return polygon.closeStroke = this.closeStroke, polygon;
  }
  contains(x2, y2) {
    let inside = false;
    const length = this.points.length / 2;
    for (let i2 = 0, j2 = length - 1;i2 < length; j2 = i2++) {
      const xi = this.points[i2 * 2], yi = this.points[i2 * 2 + 1], xj = this.points[j2 * 2], yj = this.points[j2 * 2 + 1];
      yi > y2 != yj > y2 && x2 < (xj - xi) * ((y2 - yi) / (yj - yi)) + xi && (inside = !inside);
    }
    return inside;
  }
}
Polygon.prototype.toString = function() {
  return `[@pixi/math:PolygoncloseStroke=${this.closeStroke}points=${this.points.reduce((pointsDesc, currentPoint) => `${pointsDesc}, ${currentPoint}`, "")}]`;
};

// node_modules/@pixi/math/lib/shapes/RoundedRectangle.mjs
class RoundedRectangle {
  constructor(x2 = 0, y2 = 0, width = 0, height = 0, radius = 20) {
    this.x = x2, this.y = y2, this.width = width, this.height = height, this.radius = radius, this.type = SHAPES.RREC;
  }
  clone() {
    return new RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
  }
  contains(x2, y2) {
    if (this.width <= 0 || this.height <= 0)
      return false;
    if (x2 >= this.x && x2 <= this.x + this.width && y2 >= this.y && y2 <= this.y + this.height) {
      const radius = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
      if (y2 >= this.y + radius && y2 <= this.y + this.height - radius || x2 >= this.x + radius && x2 <= this.x + this.width - radius)
        return true;
      let dx = x2 - (this.x + radius), dy = y2 - (this.y + radius);
      const radius2 = radius * radius;
      if (dx * dx + dy * dy <= radius2 || (dx = x2 - (this.x + this.width - radius), dx * dx + dy * dy <= radius2) || (dy = y2 - (this.y + this.height - radius), dx * dx + dy * dy <= radius2) || (dx = x2 - (this.x + radius), dx * dx + dy * dy <= radius2))
        return true;
    }
    return false;
  }
}
RoundedRectangle.prototype.toString = function() {
  return `[@pixi/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
};

// node_modules/@pixi/math/lib/Matrix.mjs
class Matrix {
  constructor(a2 = 1, b2 = 0, c2 = 0, d2 = 1, tx = 0, ty = 0) {
    this.array = null, this.a = a2, this.b = b2, this.c = c2, this.d = d2, this.tx = tx, this.ty = ty;
  }
  fromArray(array) {
    this.a = array[0], this.b = array[1], this.c = array[3], this.d = array[4], this.tx = array[2], this.ty = array[5];
  }
  set(a2, b2, c2, d2, tx, ty) {
    return this.a = a2, this.b = b2, this.c = c2, this.d = d2, this.tx = tx, this.ty = ty, this;
  }
  toArray(transpose, out) {
    this.array || (this.array = new Float32Array(9));
    const array = out || this.array;
    return transpose ? (array[0] = this.a, array[1] = this.b, array[2] = 0, array[3] = this.c, array[4] = this.d, array[5] = 0, array[6] = this.tx, array[7] = this.ty, array[8] = 1) : (array[0] = this.a, array[1] = this.c, array[2] = this.tx, array[3] = this.b, array[4] = this.d, array[5] = this.ty, array[6] = 0, array[7] = 0, array[8] = 1), array;
  }
  apply(pos, newPos) {
    newPos = newPos || new Point;
    const { x: x2, y: y2 } = pos;
    return newPos.x = this.a * x2 + this.c * y2 + this.tx, newPos.y = this.b * x2 + this.d * y2 + this.ty, newPos;
  }
  applyInverse(pos, newPos) {
    newPos = newPos || new Point;
    const id = 1 / (this.a * this.d + this.c * -this.b), x2 = pos.x, y2 = pos.y;
    return newPos.x = this.d * id * x2 + -this.c * id * y2 + (this.ty * this.c - this.tx * this.d) * id, newPos.y = this.a * id * y2 + -this.b * id * x2 + (-this.ty * this.a + this.tx * this.b) * id, newPos;
  }
  translate(x2, y2) {
    return this.tx += x2, this.ty += y2, this;
  }
  scale(x2, y2) {
    return this.a *= x2, this.d *= y2, this.c *= x2, this.b *= y2, this.tx *= x2, this.ty *= y2, this;
  }
  rotate(angle) {
    const cos = Math.cos(angle), sin = Math.sin(angle), a1 = this.a, c1 = this.c, tx1 = this.tx;
    return this.a = a1 * cos - this.b * sin, this.b = a1 * sin + this.b * cos, this.c = c1 * cos - this.d * sin, this.d = c1 * sin + this.d * cos, this.tx = tx1 * cos - this.ty * sin, this.ty = tx1 * sin + this.ty * cos, this;
  }
  append(matrix) {
    const a1 = this.a, b1 = this.b, c1 = this.c, d1 = this.d;
    return this.a = matrix.a * a1 + matrix.b * c1, this.b = matrix.a * b1 + matrix.b * d1, this.c = matrix.c * a1 + matrix.d * c1, this.d = matrix.c * b1 + matrix.d * d1, this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx, this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty, this;
  }
  setTransform(x2, y2, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY) {
    return this.a = Math.cos(rotation + skewY) * scaleX, this.b = Math.sin(rotation + skewY) * scaleX, this.c = -Math.sin(rotation - skewX) * scaleY, this.d = Math.cos(rotation - skewX) * scaleY, this.tx = x2 - (pivotX * this.a + pivotY * this.c), this.ty = y2 - (pivotX * this.b + pivotY * this.d), this;
  }
  prepend(matrix) {
    const tx1 = this.tx;
    if (matrix.a !== 1 || matrix.b !== 0 || matrix.c !== 0 || matrix.d !== 1) {
      const a1 = this.a, c1 = this.c;
      this.a = a1 * matrix.a + this.b * matrix.c, this.b = a1 * matrix.b + this.b * matrix.d, this.c = c1 * matrix.a + this.d * matrix.c, this.d = c1 * matrix.b + this.d * matrix.d;
    }
    return this.tx = tx1 * matrix.a + this.ty * matrix.c + matrix.tx, this.ty = tx1 * matrix.b + this.ty * matrix.d + matrix.ty, this;
  }
  decompose(transform) {
    const a2 = this.a, b2 = this.b, c2 = this.c, d2 = this.d, pivot = transform.pivot, skewX = -Math.atan2(-c2, d2), skewY = Math.atan2(b2, a2), delta = Math.abs(skewX + skewY);
    return delta < 0.00001 || Math.abs(PI_2 - delta) < 0.00001 ? (transform.rotation = skewY, transform.skew.x = transform.skew.y = 0) : (transform.rotation = 0, transform.skew.x = skewX, transform.skew.y = skewY), transform.scale.x = Math.sqrt(a2 * a2 + b2 * b2), transform.scale.y = Math.sqrt(c2 * c2 + d2 * d2), transform.position.x = this.tx + (pivot.x * a2 + pivot.y * c2), transform.position.y = this.ty + (pivot.x * b2 + pivot.y * d2), transform;
  }
  invert() {
    const a1 = this.a, b1 = this.b, c1 = this.c, d1 = this.d, tx1 = this.tx, n2 = a1 * d1 - b1 * c1;
    return this.a = d1 / n2, this.b = -b1 / n2, this.c = -c1 / n2, this.d = a1 / n2, this.tx = (c1 * this.ty - d1 * tx1) / n2, this.ty = -(a1 * this.ty - b1 * tx1) / n2, this;
  }
  identity() {
    return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
  }
  clone() {
    const matrix = new Matrix;
    return matrix.a = this.a, matrix.b = this.b, matrix.c = this.c, matrix.d = this.d, matrix.tx = this.tx, matrix.ty = this.ty, matrix;
  }
  copyTo(matrix) {
    return matrix.a = this.a, matrix.b = this.b, matrix.c = this.c, matrix.d = this.d, matrix.tx = this.tx, matrix.ty = this.ty, matrix;
  }
  copyFrom(matrix) {
    return this.a = matrix.a, this.b = matrix.b, this.c = matrix.c, this.d = matrix.d, this.tx = matrix.tx, this.ty = matrix.ty, this;
  }
  static get IDENTITY() {
    return new Matrix;
  }
  static get TEMP_MATRIX() {
    return new Matrix;
  }
}
Matrix.prototype.toString = function() {
  return `[@pixi/math:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
};

// node_modules/@pixi/math/lib/groupD8.mjs
var init = function() {
  for (let i2 = 0;i2 < 16; i2++) {
    const row = [];
    rotationCayley.push(row);
    for (let j2 = 0;j2 < 16; j2++) {
      const _ux = signum(ux[i2] * ux[j2] + vx[i2] * uy[j2]), _uy = signum(uy[i2] * ux[j2] + vy[i2] * uy[j2]), _vx = signum(ux[i2] * vx[j2] + vx[i2] * vy[j2]), _vy = signum(uy[i2] * vx[j2] + vy[i2] * vy[j2]);
      for (let k3 = 0;k3 < 16; k3++)
        if (ux[k3] === _ux && uy[k3] === _uy && vx[k3] === _vx && vy[k3] === _vy) {
          row.push(k3);
          break;
        }
    }
  }
  for (let i2 = 0;i2 < 16; i2++) {
    const mat = new Matrix;
    mat.set(ux[i2], uy[i2], vx[i2], vy[i2], 0, 0), rotationMatrices.push(mat);
  }
};
var ux = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1];
var uy = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1];
var vx = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1];
var vy = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1];
var rotationCayley = [];
var rotationMatrices = [];
var signum = Math.sign;
init();
var groupD8 = {
  E: 0,
  SE: 1,
  S: 2,
  SW: 3,
  W: 4,
  NW: 5,
  N: 6,
  NE: 7,
  MIRROR_VERTICAL: 8,
  MAIN_DIAGONAL: 10,
  MIRROR_HORIZONTAL: 12,
  REVERSE_DIAGONAL: 14,
  uX: (ind) => ux[ind],
  uY: (ind) => uy[ind],
  vX: (ind) => vx[ind],
  vY: (ind) => vy[ind],
  inv: (rotation) => rotation & 8 ? rotation & 15 : -rotation & 7,
  add: (rotationSecond, rotationFirst) => rotationCayley[rotationSecond][rotationFirst],
  sub: (rotationSecond, rotationFirst) => rotationCayley[rotationSecond][groupD8.inv(rotationFirst)],
  rotate180: (rotation) => rotation ^ 4,
  isVertical: (rotation) => (rotation & 3) === 2,
  byDirection: (dx, dy) => Math.abs(dx) * 2 <= Math.abs(dy) ? dy >= 0 ? groupD8.S : groupD8.N : Math.abs(dy) * 2 <= Math.abs(dx) ? dx > 0 ? groupD8.E : groupD8.W : dy > 0 ? dx > 0 ? groupD8.SE : groupD8.SW : dx > 0 ? groupD8.NE : groupD8.NW,
  matrixAppendRotationInv: (matrix, rotation, tx = 0, ty = 0) => {
    const mat = rotationMatrices[groupD8.inv(rotation)];
    mat.tx = tx, mat.ty = ty, matrix.append(mat);
  }
};

// node_modules/@pixi/math/lib/ObservablePoint.mjs
class ObservablePoint {
  constructor(cb, scope, x2 = 0, y2 = 0) {
    this._x = x2, this._y = y2, this.cb = cb, this.scope = scope;
  }
  clone(cb = this.cb, scope = this.scope) {
    return new ObservablePoint(cb, scope, this._x, this._y);
  }
  set(x2 = 0, y2 = x2) {
    return (this._x !== x2 || this._y !== y2) && (this._x = x2, this._y = y2, this.cb.call(this.scope)), this;
  }
  copyFrom(p2) {
    return (this._x !== p2.x || this._y !== p2.y) && (this._x = p2.x, this._y = p2.y, this.cb.call(this.scope)), this;
  }
  copyTo(p2) {
    return p2.set(this._x, this._y), p2;
  }
  equals(p2) {
    return p2.x === this._x && p2.y === this._y;
  }
  get x() {
    return this._x;
  }
  set x(value) {
    this._x !== value && (this._x = value, this.cb.call(this.scope));
  }
  get y() {
    return this._y;
  }
  set y(value) {
    this._y !== value && (this._y = value, this.cb.call(this.scope));
  }
}
ObservablePoint.prototype.toString = function() {
  return `[@pixi/math:ObservablePoint x=${this.x} y=${this.y} scope=${this.scope}]`;
};

// node_modules/@pixi/math/lib/Transform.mjs
var _Transform = class {
  constructor() {
    this.worldTransform = new Matrix, this.localTransform = new Matrix, this.position = new ObservablePoint(this.onChange, this, 0, 0), this.scale = new ObservablePoint(this.onChange, this, 1, 1), this.pivot = new ObservablePoint(this.onChange, this, 0, 0), this.skew = new ObservablePoint(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0;
  }
  onChange() {
    this._localID++;
  }
  updateSkew() {
    this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this._localID++;
  }
  updateLocalTransform() {
    const lt = this.localTransform;
    this._localID !== this._currentLocalID && (lt.a = this._cx * this.scale.x, lt.b = this._sx * this.scale.x, lt.c = this._cy * this.scale.y, lt.d = this._sy * this.scale.y, lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c), lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d), this._currentLocalID = this._localID, this._parentID = -1);
  }
  updateTransform(parentTransform) {
    const lt = this.localTransform;
    if (this._localID !== this._currentLocalID && (lt.a = this._cx * this.scale.x, lt.b = this._sx * this.scale.x, lt.c = this._cy * this.scale.y, lt.d = this._sy * this.scale.y, lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c), lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== parentTransform._worldID) {
      const pt = parentTransform.worldTransform, wt = this.worldTransform;
      wt.a = lt.a * pt.a + lt.b * pt.c, wt.b = lt.a * pt.b + lt.b * pt.d, wt.c = lt.c * pt.a + lt.d * pt.c, wt.d = lt.c * pt.b + lt.d * pt.d, wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx, wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty, this._parentID = parentTransform._worldID, this._worldID++;
    }
  }
  setFromMatrix(matrix) {
    matrix.decompose(this), this._localID++;
  }
  get rotation() {
    return this._rotation;
  }
  set rotation(value) {
    this._rotation !== value && (this._rotation = value, this.updateSkew());
  }
};
_Transform.IDENTITY = new _Transform;
var Transform = _Transform;
Transform.prototype.toString = function() {
  return `[@pixi/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`;
};

// node_modules/@pixi/core/lib/shader/defaultProgram.frag.mjs
var defaultFragment = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor *= texture2D(uSampler, vTextureCoord);
}`;

// node_modules/@pixi/core/lib/shader/defaultProgram.vert.mjs
var defaultVertex = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void){
   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
   vTextureCoord = aTextureCoord;
}
`;

// node_modules/@pixi/core/lib/shader/utils/compileShader.mjs
var compileShader = function(gl, type, src) {
  const shader = gl.createShader(type);
  return gl.shaderSource(shader, src), gl.compileShader(shader), shader;
};

// node_modules/@pixi/core/lib/shader/utils/defaultValue.mjs
var booleanArray = function(size) {
  const array = new Array(size);
  for (let i2 = 0;i2 < array.length; i2++)
    array[i2] = false;
  return array;
};
var defaultValue = function(type, size) {
  switch (type) {
    case "float":
      return 0;
    case "vec2":
      return new Float32Array(2 * size);
    case "vec3":
      return new Float32Array(3 * size);
    case "vec4":
      return new Float32Array(4 * size);
    case "int":
    case "uint":
    case "sampler2D":
    case "sampler2DArray":
      return 0;
    case "ivec2":
      return new Int32Array(2 * size);
    case "ivec3":
      return new Int32Array(3 * size);
    case "ivec4":
      return new Int32Array(4 * size);
    case "uvec2":
      return new Uint32Array(2 * size);
    case "uvec3":
      return new Uint32Array(3 * size);
    case "uvec4":
      return new Uint32Array(4 * size);
    case "bool":
      return false;
    case "bvec2":
      return booleanArray(2 * size);
    case "bvec3":
      return booleanArray(3 * size);
    case "bvec4":
      return booleanArray(4 * size);
    case "mat2":
      return new Float32Array([
        1,
        0,
        0,
        1
      ]);
    case "mat3":
      return new Float32Array([
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ]);
    case "mat4":
      return new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ]);
  }
  return null;
};

// node_modules/@pixi/core/lib/shader/utils/uniformParsers.mjs
var uniformParsers = [
  {
    test: (data) => data.type === "float" && data.size === 1 && !data.isArray,
    code: (name) => `
            if(uv["${name}"] !== ud["${name}"].value)
            {
                ud["${name}"].value = uv["${name}"]
                gl.uniform1f(ud["${name}"].location, uv["${name}"])
            }
            `
  },
  {
    test: (data, uniform) => (data.type === "sampler2D" || data.type === "samplerCube" || data.type === "sampler2DArray") && data.size === 1 && !data.isArray && (uniform == null || uniform.castToBaseTexture !== undefined),
    code: (name) => `t = syncData.textureCount++;

            renderer.texture.bind(uv["${name}"], t);

            if(ud["${name}"].value !== t)
            {
                ud["${name}"].value = t;
                gl.uniform1i(ud["${name}"].location, t);
; // eslint-disable-line max-len
            }`
  },
  {
    test: (data, uniform) => data.type === "mat3" && data.size === 1 && !data.isArray && uniform.a !== undefined,
    code: (name) => `
            gl.uniformMatrix3fv(ud["${name}"].location, false, uv["${name}"].toArray(true));
            `,
    codeUbo: (name) => `
                var ${name}_matrix = uv.${name}.toArray(true);

                data[offset] = ${name}_matrix[0];
                data[offset+1] = ${name}_matrix[1];
                data[offset+2] = ${name}_matrix[2];
        
                data[offset + 4] = ${name}_matrix[3];
                data[offset + 5] = ${name}_matrix[4];
                data[offset + 6] = ${name}_matrix[5];
        
                data[offset + 8] = ${name}_matrix[6];
                data[offset + 9] = ${name}_matrix[7];
                data[offset + 10] = ${name}_matrix[8];
            `
  },
  {
    test: (data, uniform) => data.type === "vec2" && data.size === 1 && !data.isArray && uniform.x !== undefined,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${name}"].location, v.x, v.y);
                }`,
    codeUbo: (name) => `
                v = uv.${name};

                data[offset] = v.x;
                data[offset+1] = v.y;
            `
  },
  {
    test: (data) => data.type === "vec2" && data.size === 1 && !data.isArray,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${name}"].location, v[0], v[1]);
                }
            `
  },
  {
    test: (data, uniform) => data.type === "vec4" && data.size === 1 && !data.isArray && uniform.width !== undefined,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${name}"].location, v.x, v.y, v.width, v.height)
                }`,
    codeUbo: (name) => `
                    v = uv.${name};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `
  },
  {
    test: (data, uniform) => data.type === "vec4" && data.size === 1 && !data.isArray && uniform.red !== undefined,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
                    cv[3] = v.alpha;
                    gl.uniform4f(ud["${name}"].location, v.red, v.green, v.blue, v.alpha)
                }`,
    codeUbo: (name) => `
                    v = uv.${name};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                    data[offset+3] = v.alpha;
                `
  },
  {
    test: (data, uniform) => data.type === "vec3" && data.size === 1 && !data.isArray && uniform.red !== undefined,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.a)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
    
                    gl.uniform3f(ud["${name}"].location, v.red, v.green, v.blue)
                }`,
    codeUbo: (name) => `
                    v = uv.${name};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                `
  },
  {
    test: (data) => data.type === "vec4" && data.size === 1 && !data.isArray,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${name}"].location, v[0], v[1], v[2], v[3])
                }`
  }
];

// node_modules/@pixi/core/lib/shader/utils/generateUniformsSync.mjs
var generateUniformsSync = function(group, uniformData) {
  const funcFragments = [`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];
  for (const i2 in group.uniforms) {
    const data = uniformData[i2];
    if (!data) {
      group.uniforms[i2]?.group === true && (group.uniforms[i2].ubo ? funcFragments.push(`
                        renderer.shader.syncUniformBufferGroup(uv.${i2}, '${i2}');
                    `) : funcFragments.push(`
                        renderer.shader.syncUniformGroup(uv.${i2}, syncData);
                    `));
      continue;
    }
    const uniform = group.uniforms[i2];
    let parsed = false;
    for (let j2 = 0;j2 < uniformParsers.length; j2++)
      if (uniformParsers[j2].test(data, uniform)) {
        funcFragments.push(uniformParsers[j2].code(i2, uniform)), parsed = true;
        break;
      }
    if (!parsed) {
      const template = (data.size === 1 && !data.isArray ? GLSL_TO_SINGLE_SETTERS_CACHED : GLSL_TO_ARRAY_SETTERS)[data.type].replace("location", `ud["${i2}"].location`);
      funcFragments.push(`
            cu = ud["${i2}"];
            cv = cu.value;
            v = uv["${i2}"];
            ${template};`);
    }
  }
  return new Function("ud", "uv", "renderer", "syncData", funcFragments.join(`
`));
};
var GLSL_TO_SINGLE_SETTERS_CACHED = {
  float: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,
  vec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,
  vec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,
  vec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,
  int: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  ivec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  ivec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  ivec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  uint: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,
  uvec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,
  uvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,
  uvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,
  bool: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,
  bvec2: `
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  bvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  bvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  sampler2D: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  samplerCube: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  sampler2DArray: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`
};
var GLSL_TO_ARRAY_SETTERS = {
  float: "gl.uniform1fv(location, v)",
  vec2: "gl.uniform2fv(location, v)",
  vec3: "gl.uniform3fv(location, v)",
  vec4: "gl.uniform4fv(location, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  int: "gl.uniform1iv(location, v)",
  ivec2: "gl.uniform2iv(location, v)",
  ivec3: "gl.uniform3iv(location, v)",
  ivec4: "gl.uniform4iv(location, v)",
  uint: "gl.uniform1uiv(location, v)",
  uvec2: "gl.uniform2uiv(location, v)",
  uvec3: "gl.uniform3uiv(location, v)",
  uvec4: "gl.uniform4uiv(location, v)",
  bool: "gl.uniform1iv(location, v)",
  bvec2: "gl.uniform2iv(location, v)",
  bvec3: "gl.uniform3iv(location, v)",
  bvec4: "gl.uniform4iv(location, v)",
  sampler2D: "gl.uniform1iv(location, v)",
  samplerCube: "gl.uniform1iv(location, v)",
  sampler2DArray: "gl.uniform1iv(location, v)"
};

// node_modules/@pixi/core/lib/shader/utils/getTestContext.mjs
var getTestContext = function() {
  if (context === unknownContext || context?.isContextLost()) {
    const canvas = settings.ADAPTER.createCanvas();
    let gl;
    settings.PREFER_ENV >= ENV.WEBGL2 && (gl = canvas.getContext("webgl2", {})), gl || (gl = canvas.getContext("webgl", {}) || canvas.getContext("experimental-webgl", {}), gl ? gl.getExtension("WEBGL_draw_buffers") : gl = null), context = gl;
  }
  return context;
};
var unknownContext = {};
var context = unknownContext;

// node_modules/@pixi/core/lib/shader/utils/getMaxFragmentPrecision.mjs
var getMaxFragmentPrecision = function() {
  if (!maxFragmentPrecision) {
    maxFragmentPrecision = PRECISION.MEDIUM;
    const gl = getTestContext();
    gl && gl.getShaderPrecisionFormat && (maxFragmentPrecision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision ? PRECISION.HIGH : PRECISION.MEDIUM);
  }
  return maxFragmentPrecision;
};
var maxFragmentPrecision;

// node_modules/@pixi/core/lib/shader/utils/logProgramError.mjs
var logPrettyShaderError = function(gl, shader) {
  const shaderSrc = gl.getShaderSource(shader).split(`
`).map((line, index) => `${index}: ${line}`), shaderLog = gl.getShaderInfoLog(shader), splitShader = shaderLog.split(`
`), dedupe = {}, lineNumbers = splitShader.map((line) => parseFloat(line.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"))).filter((n2) => n2 && !dedupe[n2] ? (dedupe[n2] = true, true) : false), logArgs = [""];
  lineNumbers.forEach((number) => {
    shaderSrc[number - 1] = `%c${shaderSrc[number - 1]}%c`, logArgs.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
  });
  const fragmentSourceToLog = shaderSrc.join(`
`);
  logArgs[0] = fragmentSourceToLog, console.error(shaderLog), console.groupCollapsed("click to view full shader code"), console.warn(...logArgs), console.groupEnd();
};
var logProgramError = function(gl, program, vertexShader, fragmentShader) {
  gl.getProgramParameter(program, gl.LINK_STATUS) || (gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS) || logPrettyShaderError(gl, vertexShader), gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS) || logPrettyShaderError(gl, fragmentShader), console.error("PixiJS Error: Could not initialize shader."), gl.getProgramInfoLog(program) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", gl.getProgramInfoLog(program)));
};

// node_modules/@pixi/core/lib/shader/utils/mapSize.mjs
var mapSize = function(type) {
  return GLSL_TO_SIZE[type];
};
var GLSL_TO_SIZE = {
  float: 1,
  vec2: 2,
  vec3: 3,
  vec4: 4,
  int: 1,
  ivec2: 2,
  ivec3: 3,
  ivec4: 4,
  uint: 1,
  uvec2: 2,
  uvec3: 3,
  uvec4: 4,
  bool: 1,
  bvec2: 2,
  bvec3: 3,
  bvec4: 4,
  mat2: 4,
  mat3: 9,
  mat4: 16,
  sampler2D: 1
};

// node_modules/@pixi/core/lib/shader/utils/mapType.mjs
var mapType = function(gl, type) {
  if (!GL_TABLE) {
    const typeNames = Object.keys(GL_TO_GLSL_TYPES);
    GL_TABLE = {};
    for (let i2 = 0;i2 < typeNames.length; ++i2) {
      const tn = typeNames[i2];
      GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn];
    }
  }
  return GL_TABLE[type];
};
var GL_TABLE = null;
var GL_TO_GLSL_TYPES = {
  FLOAT: "float",
  FLOAT_VEC2: "vec2",
  FLOAT_VEC3: "vec3",
  FLOAT_VEC4: "vec4",
  INT: "int",
  INT_VEC2: "ivec2",
  INT_VEC3: "ivec3",
  INT_VEC4: "ivec4",
  UNSIGNED_INT: "uint",
  UNSIGNED_INT_VEC2: "uvec2",
  UNSIGNED_INT_VEC3: "uvec3",
  UNSIGNED_INT_VEC4: "uvec4",
  BOOL: "bool",
  BOOL_VEC2: "bvec2",
  BOOL_VEC3: "bvec3",
  BOOL_VEC4: "bvec4",
  FLOAT_MAT2: "mat2",
  FLOAT_MAT3: "mat3",
  FLOAT_MAT4: "mat4",
  SAMPLER_2D: "sampler2D",
  INT_SAMPLER_2D: "sampler2D",
  UNSIGNED_INT_SAMPLER_2D: "sampler2D",
  SAMPLER_CUBE: "samplerCube",
  INT_SAMPLER_CUBE: "samplerCube",
  UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
  SAMPLER_2D_ARRAY: "sampler2DArray",
  INT_SAMPLER_2D_ARRAY: "sampler2DArray",
  UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
};

// node_modules/@pixi/core/lib/shader/utils/setPrecision.mjs
var setPrecision = function(src, requestedPrecision, maxSupportedPrecision) {
  if (src.substring(0, 9) !== "precision") {
    let precision = requestedPrecision;
    return requestedPrecision === PRECISION.HIGH && maxSupportedPrecision !== PRECISION.HIGH && (precision = PRECISION.MEDIUM), `precision ${precision} float;
${src}`;
  } else if (maxSupportedPrecision !== PRECISION.HIGH && src.substring(0, 15) === "precision highp")
    return src.replace("precision highp", "precision mediump");
  return src;
};

// node_modules/@pixi/core/lib/shader/utils/unsafeEvalSupported.mjs
var unsafeEvalSupported = function() {
  if (typeof unsafeEval == "boolean")
    return unsafeEval;
  try {
    unsafeEval = new Function("param1", "param2", "param3", "return param1[param2] === param3;")({ a: "b" }, "a", "b") === true;
  } catch {
    unsafeEval = false;
  }
  return unsafeEval;
};
var unsafeEval;

// node_modules/@pixi/core/lib/shader/Program.mjs
var UID3 = 0;
var nameCache = {};
var _Program = class _Program2 {
  constructor(vertexSrc, fragmentSrc, name = "pixi-shader", extra = {}) {
    this.extra = {}, this.id = UID3++, this.vertexSrc = vertexSrc || _Program2.defaultVertexSrc, this.fragmentSrc = fragmentSrc || _Program2.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), this.extra = extra, this.vertexSrc.substring(0, 8) !== "#version" && (name = name.replace(/\s+/g, "-"), nameCache[name] ? (nameCache[name]++, name += `-${nameCache[name]}`) : nameCache[name] = 1, this.vertexSrc = `#define SHADER_NAME ${name}
${this.vertexSrc}`, this.fragmentSrc = `#define SHADER_NAME ${name}
${this.fragmentSrc}`, this.vertexSrc = setPrecision(this.vertexSrc, _Program2.defaultVertexPrecision, PRECISION.HIGH), this.fragmentSrc = setPrecision(this.fragmentSrc, _Program2.defaultFragmentPrecision, getMaxFragmentPrecision())), this.glPrograms = {}, this.syncUniforms = null;
  }
  static get defaultVertexSrc() {
    return defaultVertex;
  }
  static get defaultFragmentSrc() {
    return defaultFragment;
  }
  static from(vertexSrc, fragmentSrc, name) {
    const key = vertexSrc + fragmentSrc;
    let program = ProgramCache[key];
    return program || (ProgramCache[key] = program = new _Program2(vertexSrc, fragmentSrc, name)), program;
  }
};
_Program.defaultVertexPrecision = PRECISION.HIGH, _Program.defaultFragmentPrecision = isMobile3.apple.device ? PRECISION.HIGH : PRECISION.MEDIUM;
var Program = _Program;

// node_modules/@pixi/core/lib/shader/UniformGroup.mjs
var UID4 = 0;

class UniformGroup {
  constructor(uniforms, isStatic, isUbo) {
    this.group = true, this.syncUniforms = {}, this.dirtyId = 0, this.id = UID4++, this.static = !!isStatic, this.ubo = !!isUbo, uniforms instanceof Buffer ? (this.buffer = uniforms, this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER, this.autoManage = false, this.ubo = true) : (this.uniforms = uniforms, this.ubo && (this.buffer = new Buffer(new Float32Array(1)), this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER, this.autoManage = true));
  }
  update() {
    this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update();
  }
  add(name, uniforms, _static) {
    if (!this.ubo)
      this.uniforms[name] = new UniformGroup(uniforms, _static);
    else
      throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
  }
  static from(uniforms, _static, _ubo) {
    return new UniformGroup(uniforms, _static, _ubo);
  }
  static uboFrom(uniforms, _static) {
    return new UniformGroup(uniforms, _static ?? true, true);
  }
}

// node_modules/@pixi/core/lib/shader/Shader.mjs
class Shader {
  constructor(program, uniforms) {
    this.uniformBindCount = 0, this.program = program, uniforms ? uniforms instanceof UniformGroup ? this.uniformGroup = uniforms : this.uniformGroup = new UniformGroup(uniforms) : this.uniformGroup = new UniformGroup({}), this.disposeRunner = new Runner("disposeShader");
  }
  checkUniformExists(name, group) {
    if (group.uniforms[name])
      return true;
    for (const i2 in group.uniforms) {
      const uniform = group.uniforms[i2];
      if (uniform.group === true && this.checkUniformExists(name, uniform))
        return true;
    }
    return false;
  }
  destroy() {
    this.uniformGroup = null, this.disposeRunner.emit(this), this.disposeRunner.destroy();
  }
  get uniforms() {
    return this.uniformGroup.uniforms;
  }
  static from(vertexSrc, fragmentSrc, uniforms) {
    const program = Program.from(vertexSrc, fragmentSrc);
    return new Shader(program, uniforms);
  }
}

// node_modules/@pixi/core/lib/batch/BatchShaderGenerator.mjs
class BatchShaderGenerator {
  constructor(vertexSrc, fragTemplate2) {
    if (this.vertexSrc = vertexSrc, this.fragTemplate = fragTemplate2, this.programCache = {}, this.defaultGroupCache = {}, !fragTemplate2.includes("%count%"))
      throw new Error('Fragment template must contain "%count%".');
    if (!fragTemplate2.includes("%forloop%"))
      throw new Error('Fragment template must contain "%forloop%".');
  }
  generateShader(maxTextures) {
    if (!this.programCache[maxTextures]) {
      const sampleValues = new Int32Array(maxTextures);
      for (let i2 = 0;i2 < maxTextures; i2++)
        sampleValues[i2] = i2;
      this.defaultGroupCache[maxTextures] = UniformGroup.from({ uSamplers: sampleValues }, true);
      let fragmentSrc = this.fragTemplate;
      fragmentSrc = fragmentSrc.replace(/%count%/gi, `${maxTextures}`), fragmentSrc = fragmentSrc.replace(/%forloop%/gi, this.generateSampleSrc(maxTextures)), this.programCache[maxTextures] = new Program(this.vertexSrc, fragmentSrc);
    }
    const uniforms = {
      tint: new Float32Array([1, 1, 1, 1]),
      translationMatrix: new Matrix,
      default: this.defaultGroupCache[maxTextures]
    };
    return new Shader(this.programCache[maxTextures], uniforms);
  }
  generateSampleSrc(maxTextures) {
    let src = "";
    src += `
`, src += `
`;
    for (let i2 = 0;i2 < maxTextures; i2++)
      i2 > 0 && (src += `
else `), i2 < maxTextures - 1 && (src += `if(vTextureId < ${i2}.5)`), src += `
{`, src += `
	color = texture2D(uSamplers[${i2}], vTextureCoord);`, src += `
}`;
    return src += `
`, src += `
`, src;
  }
}

// node_modules/@pixi/core/lib/batch/BatchTextureArray.mjs
class BatchTextureArray {
  constructor() {
    this.elements = [], this.ids = [], this.count = 0;
  }
  clear() {
    for (let i2 = 0;i2 < this.count; i2++)
      this.elements[i2] = null;
    this.count = 0;
  }
}

// node_modules/@pixi/core/lib/batch/canUploadSameBuffer.mjs
var canUploadSameBuffer = function() {
  return !isMobile3.apple.device;
};

// node_modules/@pixi/core/lib/batch/maxRecommendedTextures.mjs
var maxRecommendedTextures = function(max) {
  let allowMax = true;
  const navigator2 = settings.ADAPTER.getNavigator();
  if (isMobile3.tablet || isMobile3.phone) {
    if (isMobile3.apple.device) {
      const match = navigator2.userAgent.match(/OS (\d+)_(\d+)?/);
      match && parseInt(match[1], 10) < 11 && (allowMax = false);
    }
    if (isMobile3.android.device) {
      const match = navigator2.userAgent.match(/Android\s([0-9.]*)/);
      match && parseInt(match[1], 10) < 7 && (allowMax = false);
    }
  }
  return allowMax ? max : 4;
};

// node_modules/@pixi/core/lib/batch/ObjectRenderer.mjs
class ObjectRenderer {
  constructor(renderer) {
    this.renderer = renderer;
  }
  flush() {
  }
  destroy() {
    this.renderer = null;
  }
  start() {
  }
  stop() {
    this.flush();
  }
  render(_object) {
  }
}

// node_modules/@pixi/core/lib/batch/texture.frag.mjs
var defaultFragment2 = `varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;
uniform sampler2D uSamplers[%count%];

void main(void){
    vec4 color;
    %forloop%
    gl_FragColor = color * vColor;
}
`;

// node_modules/@pixi/core/lib/batch/texture.vert.mjs
var defaultVertex2 = `precision highp float;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
attribute float aTextureId;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform vec4 tint;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vColor = aColor * tint;
}
`;

// node_modules/@pixi/core/lib/batch/BatchRenderer.mjs
var _BatchRenderer = class _BatchRenderer2 extends ObjectRenderer {
  constructor(renderer) {
    super(renderer), this.setShaderGenerator(), this.geometryClass = BatchGeometry, this.vertexSize = 6, this.state = State.for2d(), this.size = _BatchRenderer2.defaultBatchSize * 4, this._vertexCount = 0, this._indexCount = 0, this._bufferedElements = [], this._bufferedTextures = [], this._bufferSize = 0, this._shader = null, this._packedGeometries = [], this._packedGeometryPoolSize = 2, this._flushId = 0, this._aBuffers = {}, this._iBuffers = {}, this.maxTextures = 1, this.renderer.on("prerender", this.onPrerender, this), renderer.runners.contextChange.add(this), this._dcIndex = 0, this._aIndex = 0, this._iIndex = 0, this._attributeBuffer = null, this._indexBuffer = null, this._tempBoundTextures = [];
  }
  static get defaultMaxTextures() {
    return this._defaultMaxTextures = this._defaultMaxTextures ?? maxRecommendedTextures(32), this._defaultMaxTextures;
  }
  static set defaultMaxTextures(value) {
    this._defaultMaxTextures = value;
  }
  static get canUploadSameBuffer() {
    return this._canUploadSameBuffer = this._canUploadSameBuffer ?? canUploadSameBuffer(), this._canUploadSameBuffer;
  }
  static set canUploadSameBuffer(value) {
    this._canUploadSameBuffer = value;
  }
  get MAX_TEXTURES() {
    return deprecation("7.1.0", "BatchRenderer#MAX_TEXTURES renamed to BatchRenderer#maxTextures"), this.maxTextures;
  }
  static get defaultVertexSrc() {
    return defaultVertex2;
  }
  static get defaultFragmentTemplate() {
    return defaultFragment2;
  }
  setShaderGenerator({
    vertex = _BatchRenderer2.defaultVertexSrc,
    fragment = _BatchRenderer2.defaultFragmentTemplate
  } = {}) {
    this.shaderGenerator = new BatchShaderGenerator(vertex, fragment);
  }
  contextChange() {
    const gl = this.renderer.gl;
    settings.PREFER_ENV === ENV.WEBGL_LEGACY ? this.maxTextures = 1 : (this.maxTextures = Math.min(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS), _BatchRenderer2.defaultMaxTextures), this.maxTextures = checkMaxIfStatementsInShader(this.maxTextures, gl)), this._shader = this.shaderGenerator.generateShader(this.maxTextures);
    for (let i2 = 0;i2 < this._packedGeometryPoolSize; i2++)
      this._packedGeometries[i2] = new this.geometryClass;
    this.initFlushBuffers();
  }
  initFlushBuffers() {
    const {
      _drawCallPool,
      _textureArrayPool
    } = _BatchRenderer2, MAX_SPRITES = this.size / 4, MAX_TA = Math.floor(MAX_SPRITES / this.maxTextures) + 1;
    for (;_drawCallPool.length < MAX_SPRITES; )
      _drawCallPool.push(new BatchDrawCall);
    for (;_textureArrayPool.length < MAX_TA; )
      _textureArrayPool.push(new BatchTextureArray);
    for (let i2 = 0;i2 < this.maxTextures; i2++)
      this._tempBoundTextures[i2] = null;
  }
  onPrerender() {
    this._flushId = 0;
  }
  render(element) {
    element._texture.valid && (this._vertexCount + element.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += element.vertexData.length / 2, this._indexCount += element.indices.length, this._bufferedTextures[this._bufferSize] = element._texture.baseTexture, this._bufferedElements[this._bufferSize++] = element);
  }
  buildTexturesAndDrawCalls() {
    const {
      _bufferedTextures: textures,
      maxTextures
    } = this, textureArrays = _BatchRenderer2._textureArrayPool, batch = this.renderer.batch, boundTextures = this._tempBoundTextures, touch = this.renderer.textureGC.count;
    let TICK = ++BaseTexture._globalBatch, countTexArrays = 0, texArray = textureArrays[0], start = 0;
    batch.copyBoundTextures(boundTextures, maxTextures);
    for (let i2 = 0;i2 < this._bufferSize; ++i2) {
      const tex = textures[i2];
      textures[i2] = null, tex._batchEnabled !== TICK && (texArray.count >= maxTextures && (batch.boundArray(texArray, boundTextures, TICK, maxTextures), this.buildDrawCalls(texArray, start, i2), start = i2, texArray = textureArrays[++countTexArrays], ++TICK), tex._batchEnabled = TICK, tex.touched = touch, texArray.elements[texArray.count++] = tex);
    }
    texArray.count > 0 && (batch.boundArray(texArray, boundTextures, TICK, maxTextures), this.buildDrawCalls(texArray, start, this._bufferSize), ++countTexArrays, ++TICK);
    for (let i2 = 0;i2 < boundTextures.length; i2++)
      boundTextures[i2] = null;
    BaseTexture._globalBatch = TICK;
  }
  buildDrawCalls(texArray, start, finish) {
    const {
      _bufferedElements: elements,
      _attributeBuffer,
      _indexBuffer,
      vertexSize
    } = this, drawCalls = _BatchRenderer2._drawCallPool;
    let dcIndex = this._dcIndex, aIndex = this._aIndex, iIndex = this._iIndex, drawCall = drawCalls[dcIndex];
    drawCall.start = this._iIndex, drawCall.texArray = texArray;
    for (let i2 = start;i2 < finish; ++i2) {
      const sprite = elements[i2], tex = sprite._texture.baseTexture, spriteBlendMode = premultiplyBlendMode[tex.alphaMode ? 1 : 0][sprite.blendMode];
      elements[i2] = null, start < i2 && drawCall.blend !== spriteBlendMode && (drawCall.size = iIndex - drawCall.start, start = i2, drawCall = drawCalls[++dcIndex], drawCall.texArray = texArray, drawCall.start = iIndex), this.packInterleavedGeometry(sprite, _attributeBuffer, _indexBuffer, aIndex, iIndex), aIndex += sprite.vertexData.length / 2 * vertexSize, iIndex += sprite.indices.length, drawCall.blend = spriteBlendMode;
    }
    start < finish && (drawCall.size = iIndex - drawCall.start, ++dcIndex), this._dcIndex = dcIndex, this._aIndex = aIndex, this._iIndex = iIndex;
  }
  bindAndClearTexArray(texArray) {
    const textureSystem = this.renderer.texture;
    for (let j2 = 0;j2 < texArray.count; j2++)
      textureSystem.bind(texArray.elements[j2], texArray.ids[j2]), texArray.elements[j2] = null;
    texArray.count = 0;
  }
  updateGeometry() {
    const {
      _packedGeometries: packedGeometries,
      _attributeBuffer: attributeBuffer,
      _indexBuffer: indexBuffer
    } = this;
    _BatchRenderer2.canUploadSameBuffer ? (packedGeometries[this._flushId]._buffer.update(attributeBuffer.rawBinaryData), packedGeometries[this._flushId]._indexBuffer.update(indexBuffer), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, packedGeometries[this._flushId] = new this.geometryClass), packedGeometries[this._flushId]._buffer.update(attributeBuffer.rawBinaryData), packedGeometries[this._flushId]._indexBuffer.update(indexBuffer), this.renderer.geometry.bind(packedGeometries[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
  }
  drawBatches() {
    const dcCount = this._dcIndex, { gl, state: stateSystem } = this.renderer, drawCalls = _BatchRenderer2._drawCallPool;
    let curTexArray = null;
    for (let i2 = 0;i2 < dcCount; i2++) {
      const { texArray, type, size, start, blend } = drawCalls[i2];
      curTexArray !== texArray && (curTexArray = texArray, this.bindAndClearTexArray(texArray)), this.state.blendMode = blend, stateSystem.set(this.state), gl.drawElements(type, size, gl.UNSIGNED_SHORT, start * 2);
    }
  }
  flush() {
    this._vertexCount !== 0 && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0);
  }
  start() {
    this.renderer.state.set(this.state), this.renderer.texture.ensureSamplerType(this.maxTextures), this.renderer.shader.bind(this._shader), _BatchRenderer2.canUploadSameBuffer && this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
  }
  stop() {
    this.flush();
  }
  destroy() {
    for (let i2 = 0;i2 < this._packedGeometryPoolSize; i2++)
      this._packedGeometries[i2] && this._packedGeometries[i2].destroy();
    this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader && (this._shader.destroy(), this._shader = null), super.destroy();
  }
  getAttributeBuffer(size) {
    const roundedP2 = nextPow2(Math.ceil(size / 8)), roundedSizeIndex = log2(roundedP2), roundedSize = roundedP2 * 8;
    this._aBuffers.length <= roundedSizeIndex && (this._iBuffers.length = roundedSizeIndex + 1);
    let buffer = this._aBuffers[roundedSize];
    return buffer || (this._aBuffers[roundedSize] = buffer = new ViewableBuffer(roundedSize * this.vertexSize * 4)), buffer;
  }
  getIndexBuffer(size) {
    const roundedP2 = nextPow2(Math.ceil(size / 12)), roundedSizeIndex = log2(roundedP2), roundedSize = roundedP2 * 12;
    this._iBuffers.length <= roundedSizeIndex && (this._iBuffers.length = roundedSizeIndex + 1);
    let buffer = this._iBuffers[roundedSizeIndex];
    return buffer || (this._iBuffers[roundedSizeIndex] = buffer = new Uint16Array(roundedSize)), buffer;
  }
  packInterleavedGeometry(element, attributeBuffer, indexBuffer, aIndex, iIndex) {
    const {
      uint32View,
      float32View
    } = attributeBuffer, packedVertices = aIndex / this.vertexSize, uvs = element.uvs, indicies = element.indices, vertexData = element.vertexData, textureId = element._texture.baseTexture._batchLocation, alpha = Math.min(element.worldAlpha, 1), argb = Color.shared.setValue(element._tintRGB).toPremultiplied(alpha, element._texture.baseTexture.alphaMode > 0);
    for (let i2 = 0;i2 < vertexData.length; i2 += 2)
      float32View[aIndex++] = vertexData[i2], float32View[aIndex++] = vertexData[i2 + 1], float32View[aIndex++] = uvs[i2], float32View[aIndex++] = uvs[i2 + 1], uint32View[aIndex++] = argb, float32View[aIndex++] = textureId;
    for (let i2 = 0;i2 < indicies.length; i2++)
      indexBuffer[iIndex++] = packedVertices + indicies[i2];
  }
};
_BatchRenderer.defaultBatchSize = 4096, _BatchRenderer.extension = {
  name: "batch",
  type: ExtensionType.RendererPlugin
}, _BatchRenderer._drawCallPool = [], _BatchRenderer._textureArrayPool = [];
var BatchRenderer = _BatchRenderer;
extensions.add(BatchRenderer);

// node_modules/@pixi/core/lib/filters/defaultFilter.frag.mjs
var defaultFragment3 = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`;

// node_modules/@pixi/core/lib/filters/defaultFilter.vert.mjs
var defaultVertex3 = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;

// node_modules/@pixi/core/lib/filters/Filter.mjs
var _Filter = class _Filter2 extends Shader {
  constructor(vertexSrc, fragmentSrc, uniforms) {
    const program = Program.from(vertexSrc || _Filter2.defaultVertexSrc, fragmentSrc || _Filter2.defaultFragmentSrc);
    super(program, uniforms), this.padding = 0, this.resolution = _Filter2.defaultResolution, this.multisample = _Filter2.defaultMultisample, this.enabled = true, this.autoFit = true, this.state = new State;
  }
  apply(filterManager, input, output, clearMode, _currentState) {
    filterManager.applyFilter(this, input, output, clearMode);
  }
  get blendMode() {
    return this.state.blendMode;
  }
  set blendMode(value) {
    this.state.blendMode = value;
  }
  get resolution() {
    return this._resolution;
  }
  set resolution(value) {
    this._resolution = value;
  }
  static get defaultVertexSrc() {
    return defaultVertex3;
  }
  static get defaultFragmentSrc() {
    return defaultFragment3;
  }
};
_Filter.defaultResolution = 1, _Filter.defaultMultisample = MSAA_QUALITY.NONE;
var Filter = _Filter;

// node_modules/@pixi/core/lib/background/BackgroundSystem.mjs
class BackgroundSystem {
  constructor() {
    this.clearBeforeRender = true, this._backgroundColor = new Color(0), this.alpha = 1;
  }
  init(options) {
    this.clearBeforeRender = options.clearBeforeRender;
    const { backgroundColor, background, backgroundAlpha } = options, color5 = background ?? backgroundColor;
    color5 !== undefined && (this.color = color5), this.alpha = backgroundAlpha;
  }
  get color() {
    return this._backgroundColor.value;
  }
  set color(value) {
    this._backgroundColor.setValue(value);
  }
  get alpha() {
    return this._backgroundColor.alpha;
  }
  set alpha(value) {
    this._backgroundColor.setAlpha(value);
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  destroy() {
  }
}
BackgroundSystem.defaultOptions = {
  backgroundAlpha: 1,
  backgroundColor: 0,
  clearBeforeRender: true
}, BackgroundSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "background"
};
extensions.add(BackgroundSystem);

// node_modules/@pixi/core/lib/batch/BatchSystem.mjs
class BatchSystem {
  constructor(renderer) {
    this.renderer = renderer, this.emptyRenderer = new ObjectRenderer(renderer), this.currentRenderer = this.emptyRenderer;
  }
  setObjectRenderer(objectRenderer) {
    this.currentRenderer !== objectRenderer && (this.currentRenderer.stop(), this.currentRenderer = objectRenderer, this.currentRenderer.start());
  }
  flush() {
    this.setObjectRenderer(this.emptyRenderer);
  }
  reset() {
    this.setObjectRenderer(this.emptyRenderer);
  }
  copyBoundTextures(arr, maxTextures) {
    const { boundTextures } = this.renderer.texture;
    for (let i2 = maxTextures - 1;i2 >= 0; --i2)
      arr[i2] = boundTextures[i2] || null, arr[i2] && (arr[i2]._batchLocation = i2);
  }
  boundArray(texArray, boundTextures, batchId, maxTextures) {
    const { elements, ids, count } = texArray;
    let j2 = 0;
    for (let i2 = 0;i2 < count; i2++) {
      const tex = elements[i2], loc = tex._batchLocation;
      if (loc >= 0 && loc < maxTextures && boundTextures[loc] === tex) {
        ids[i2] = loc;
        continue;
      }
      for (;j2 < maxTextures; ) {
        const bound = boundTextures[j2];
        if (bound && bound._batchEnabled === batchId && bound._batchLocation === j2) {
          j2++;
          continue;
        }
        ids[i2] = j2, tex._batchLocation = j2, boundTextures[j2] = tex;
        break;
      }
    }
  }
  destroy() {
    this.renderer = null;
  }
}
BatchSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "batch"
};
extensions.add(BatchSystem);

// node_modules/@pixi/core/lib/context/ContextSystem.mjs
var CONTEXT_UID_COUNTER = 0;

class ContextSystem {
  constructor(renderer) {
    this.renderer = renderer, this.webGLVersion = 1, this.extensions = {}, this.supports = {
      uint32Indices: false
    }, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this);
  }
  get isLost() {
    return !this.gl || this.gl.isContextLost();
  }
  contextChange(gl) {
    this.gl = gl, this.renderer.gl = gl, this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++;
  }
  init(options) {
    if (options.context)
      this.initFromContext(options.context);
    else {
      const alpha = this.renderer.background.alpha < 1, premultipliedAlpha = options.premultipliedAlpha;
      this.preserveDrawingBuffer = options.preserveDrawingBuffer, this.useContextAlpha = options.useContextAlpha, this.powerPreference = options.powerPreference, this.initFromOptions({
        alpha,
        premultipliedAlpha,
        antialias: options.antialias,
        stencil: true,
        preserveDrawingBuffer: options.preserveDrawingBuffer,
        powerPreference: options.powerPreference
      });
    }
  }
  initFromContext(gl) {
    this.gl = gl, this.validateContext(gl), this.renderer.gl = gl, this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++, this.renderer.runners.contextChange.emit(gl);
    const view = this.renderer.view;
    view.addEventListener !== undefined && (view.addEventListener("webglcontextlost", this.handleContextLost, false), view.addEventListener("webglcontextrestored", this.handleContextRestored, false));
  }
  initFromOptions(options) {
    const gl = this.createContext(this.renderer.view, options);
    this.initFromContext(gl);
  }
  createContext(canvas, options) {
    let gl;
    if (settings.PREFER_ENV >= ENV.WEBGL2 && (gl = canvas.getContext("webgl2", options)), gl)
      this.webGLVersion = 2;
    else if (this.webGLVersion = 1, gl = canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options), !gl)
      throw new Error("This browser does not support WebGL. Try using the canvas renderer");
    return this.gl = gl, this.getExtensions(), this.gl;
  }
  getExtensions() {
    const { gl } = this, common = {
      loseContext: gl.getExtension("WEBGL_lose_context"),
      anisotropicFiltering: gl.getExtension("EXT_texture_filter_anisotropic"),
      floatTextureLinear: gl.getExtension("OES_texture_float_linear"),
      s3tc: gl.getExtension("WEBGL_compressed_texture_s3tc"),
      s3tc_sRGB: gl.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
      etc: gl.getExtension("WEBGL_compressed_texture_etc"),
      etc1: gl.getExtension("WEBGL_compressed_texture_etc1"),
      pvrtc: gl.getExtension("WEBGL_compressed_texture_pvrtc") || gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
      atc: gl.getExtension("WEBGL_compressed_texture_atc"),
      astc: gl.getExtension("WEBGL_compressed_texture_astc")
    };
    this.webGLVersion === 1 ? Object.assign(this.extensions, common, {
      drawBuffers: gl.getExtension("WEBGL_draw_buffers"),
      depthTexture: gl.getExtension("WEBGL_depth_texture"),
      vertexArrayObject: gl.getExtension("OES_vertex_array_object") || gl.getExtension("MOZ_OES_vertex_array_object") || gl.getExtension("WEBKIT_OES_vertex_array_object"),
      uint32ElementIndex: gl.getExtension("OES_element_index_uint"),
      floatTexture: gl.getExtension("OES_texture_float"),
      floatTextureLinear: gl.getExtension("OES_texture_float_linear"),
      textureHalfFloat: gl.getExtension("OES_texture_half_float"),
      textureHalfFloatLinear: gl.getExtension("OES_texture_half_float_linear")
    }) : this.webGLVersion === 2 && Object.assign(this.extensions, common, {
      colorBufferFloat: gl.getExtension("EXT_color_buffer_float")
    });
  }
  handleContextLost(event) {
    event.preventDefault(), setTimeout(() => {
      this.gl.isContextLost() && this.extensions.loseContext && this.extensions.loseContext.restoreContext();
    }, 0);
  }
  handleContextRestored() {
    this.renderer.runners.contextChange.emit(this.gl);
  }
  destroy() {
    const view = this.renderer.view;
    this.renderer = null, view.removeEventListener !== undefined && (view.removeEventListener("webglcontextlost", this.handleContextLost), view.removeEventListener("webglcontextrestored", this.handleContextRestored)), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext();
  }
  postrender() {
    this.renderer.objectRenderer.renderingToScreen && this.gl.flush();
  }
  validateContext(gl) {
    const attributes = gl.getContextAttributes(), isWebGl2 = ("WebGL2RenderingContext" in globalThis) && gl instanceof globalThis.WebGL2RenderingContext;
    isWebGl2 && (this.webGLVersion = 2), attributes && !attributes.stencil && console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
    const hasuint32 = isWebGl2 || !!gl.getExtension("OES_element_index_uint");
    this.supports.uint32Indices = hasuint32, hasuint32 || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
  }
}
ContextSystem.defaultOptions = {
  context: null,
  antialias: false,
  premultipliedAlpha: true,
  preserveDrawingBuffer: false,
  powerPreference: "default"
}, ContextSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "context"
};
extensions.add(ContextSystem);

// node_modules/@pixi/core/lib/framebuffer/Framebuffer.mjs
class Framebuffer {
  constructor(width, height) {
    if (this.width = Math.round(width), this.height = Math.round(height), !this.width || !this.height)
      throw new Error("Framebuffer width or height is zero");
    this.stencil = false, this.depth = false, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new Runner("disposeFramebuffer"), this.multisample = MSAA_QUALITY.NONE;
  }
  get colorTexture() {
    return this.colorTextures[0];
  }
  addColorTexture(index = 0, texture) {
    return this.colorTextures[index] = texture || new BaseTexture(null, {
      scaleMode: SCALE_MODES.NEAREST,
      resolution: 1,
      mipmap: MIPMAP_MODES.OFF,
      width: this.width,
      height: this.height
    }), this.dirtyId++, this.dirtyFormat++, this;
  }
  addDepthTexture(texture) {
    return this.depthTexture = texture || new BaseTexture(null, {
      scaleMode: SCALE_MODES.NEAREST,
      resolution: 1,
      width: this.width,
      height: this.height,
      mipmap: MIPMAP_MODES.OFF,
      format: FORMATS.DEPTH_COMPONENT,
      type: TYPES.UNSIGNED_SHORT
    }), this.dirtyId++, this.dirtyFormat++, this;
  }
  enableDepth() {
    return this.depth = true, this.dirtyId++, this.dirtyFormat++, this;
  }
  enableStencil() {
    return this.stencil = true, this.dirtyId++, this.dirtyFormat++, this;
  }
  resize(width, height) {
    if (width = Math.round(width), height = Math.round(height), !width || !height)
      throw new Error("Framebuffer width and height must not be zero");
    if (!(width === this.width && height === this.height)) {
      this.width = width, this.height = height, this.dirtyId++, this.dirtySize++;
      for (let i2 = 0;i2 < this.colorTextures.length; i2++) {
        const texture = this.colorTextures[i2], resolution = texture.resolution;
        texture.setSize(width / resolution, height / resolution);
      }
      if (this.depthTexture) {
        const resolution = this.depthTexture.resolution;
        this.depthTexture.setSize(width / resolution, height / resolution);
      }
    }
  }
  dispose() {
    this.disposeRunner.emit(this, false);
  }
  destroyDepthTexture() {
    this.depthTexture && (this.depthTexture.destroy(), this.depthTexture = null, ++this.dirtyId, ++this.dirtyFormat);
  }
}

// node_modules/@pixi/core/lib/renderTexture/BaseRenderTexture.mjs
class BaseRenderTexture extends BaseTexture {
  constructor(options = {}) {
    if (typeof options == "number") {
      const width = arguments[0], height = arguments[1], scaleMode = arguments[2], resolution = arguments[3];
      options = { width, height, scaleMode, resolution };
    }
    options.width = options.width ?? 100, options.height = options.height ?? 100, options.multisample ?? (options.multisample = MSAA_QUALITY.NONE), super(null, options), this.mipmap = MIPMAP_MODES.OFF, this.valid = true, this._clear = new Color([0, 0, 0, 0]), this.framebuffer = new Framebuffer(this.realWidth, this.realHeight).addColorTexture(0, this), this.framebuffer.multisample = options.multisample, this.maskStack = [], this.filterStack = [{}];
  }
  set clearColor(value) {
    this._clear.setValue(value);
  }
  get clearColor() {
    return this._clear.value;
  }
  get clear() {
    return this._clear;
  }
  get multisample() {
    return this.framebuffer.multisample;
  }
  set multisample(value) {
    this.framebuffer.multisample = value;
  }
  resize(desiredWidth, desiredHeight) {
    this.framebuffer.resize(desiredWidth * this.resolution, desiredHeight * this.resolution), this.setRealSize(this.framebuffer.width, this.framebuffer.height);
  }
  dispose() {
    this.framebuffer.dispose(), super.dispose();
  }
  destroy() {
    super.destroy(), this.framebuffer.destroyDepthTexture(), this.framebuffer = null;
  }
}

// node_modules/@pixi/core/lib/textures/resources/BaseImageResource.mjs
class BaseImageResource extends Resource {
  constructor(source) {
    const sourceAny = source, width = sourceAny.naturalWidth || sourceAny.videoWidth || sourceAny.width, height = sourceAny.naturalHeight || sourceAny.videoHeight || sourceAny.height;
    super(width, height), this.source = source, this.noSubImage = false;
  }
  static crossOrigin(element, url3, crossorigin) {
    crossorigin === undefined && !url3.startsWith("data:") ? element.crossOrigin = determineCrossOrigin(url3) : crossorigin !== false && (element.crossOrigin = typeof crossorigin == "string" ? crossorigin : "anonymous");
  }
  upload(renderer, baseTexture, glTexture, source) {
    const gl = renderer.gl, width = baseTexture.realWidth, height = baseTexture.realHeight;
    if (source = source || this.source, typeof HTMLImageElement < "u" && source instanceof HTMLImageElement) {
      if (!source.complete || source.naturalWidth === 0)
        return false;
    } else if (typeof HTMLVideoElement < "u" && source instanceof HTMLVideoElement && source.readyState <= 1)
      return false;
    return gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === ALPHA_MODES.UNPACK), !this.noSubImage && baseTexture.target === gl.TEXTURE_2D && glTexture.width === width && glTexture.height === height ? gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, baseTexture.format, glTexture.type, source) : (glTexture.width = width, glTexture.height = height, gl.texImage2D(baseTexture.target, 0, glTexture.internalFormat, baseTexture.format, glTexture.type, source)), true;
  }
  update() {
    if (this.destroyed)
      return;
    const source = this.source, width = source.naturalWidth || source.videoWidth || source.width, height = source.naturalHeight || source.videoHeight || source.height;
    this.resize(width, height), super.update();
  }
  dispose() {
    this.source = null;
  }
}

// node_modules/@pixi/core/lib/textures/resources/ImageResource.mjs
class ImageResource extends BaseImageResource {
  constructor(source, options) {
    if (options = options || {}, typeof source == "string") {
      const imageElement = new Image;
      BaseImageResource.crossOrigin(imageElement, source, options.crossorigin), imageElement.src = source, source = imageElement;
    }
    super(source), !source.complete && this._width && this._height && (this._width = 0, this._height = 0), this.url = source.src, this._process = null, this.preserveBitmap = false, this.createBitmap = (options.createBitmap ?? settings.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap, this.alphaMode = typeof options.alphaMode == "number" ? options.alphaMode : null, this.bitmap = null, this._load = null, options.autoLoad !== false && this.load();
  }
  load(createBitmap) {
    return this._load ? this._load : (createBitmap !== undefined && (this.createBitmap = createBitmap), this._load = new Promise((resolve, reject) => {
      const source = this.source;
      this.url = source.src;
      const completed = () => {
        this.destroyed || (source.onload = null, source.onerror = null, this.update(), this._load = null, this.createBitmap ? resolve(this.process()) : resolve(this));
      };
      source.complete && source.src ? completed() : (source.onload = completed, source.onerror = (event) => {
        reject(event), this.onError.emit(event);
      });
    }), this._load);
  }
  process() {
    const source = this.source;
    if (this._process !== null)
      return this._process;
    if (this.bitmap !== null || !globalThis.createImageBitmap)
      return Promise.resolve(this);
    const createImageBitmap2 = globalThis.createImageBitmap, cors = !source.crossOrigin || source.crossOrigin === "anonymous";
    return this._process = fetch(source.src, {
      mode: cors ? "cors" : "no-cors"
    }).then((r2) => r2.blob()).then((blob) => createImageBitmap2(blob, 0, 0, source.width, source.height, {
      premultiplyAlpha: this.alphaMode === null || this.alphaMode === ALPHA_MODES.UNPACK ? "premultiply" : "none"
    })).then((bitmap) => this.destroyed ? Promise.reject() : (this.bitmap = bitmap, this.update(), this._process = null, Promise.resolve(this))), this._process;
  }
  upload(renderer, baseTexture, glTexture) {
    if (typeof this.alphaMode == "number" && (baseTexture.alphaMode = this.alphaMode), !this.createBitmap)
      return super.upload(renderer, baseTexture, glTexture);
    if (!this.bitmap && (this.process(), !this.bitmap))
      return false;
    if (super.upload(renderer, baseTexture, glTexture, this.bitmap), !this.preserveBitmap) {
      let flag = true;
      const glTextures = baseTexture._glTextures;
      for (const key in glTextures) {
        const otherTex = glTextures[key];
        if (otherTex !== glTexture && otherTex.dirtyId !== baseTexture.dirtyId) {
          flag = false;
          break;
        }
      }
      flag && (this.bitmap.close && this.bitmap.close(), this.bitmap = null);
    }
    return true;
  }
  dispose() {
    this.source.onload = null, this.source.onerror = null, super.dispose(), this.bitmap && (this.bitmap.close(), this.bitmap = null), this._process = null, this._load = null;
  }
  static test(source) {
    return typeof HTMLImageElement < "u" && (typeof source == "string" || source instanceof HTMLImageElement);
  }
}

// node_modules/@pixi/core/lib/textures/TextureUvs.mjs
class TextureUvs {
  constructor() {
    this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8);
  }
  set(frame, baseFrame, rotate) {
    const { width: tw, height: th } = baseFrame;
    if (rotate) {
      const w2 = frame.width / 2 / tw, h2 = frame.height / 2 / th, cX = frame.x / tw + w2, cY = frame.y / th + h2;
      rotate = groupD8.add(rotate, groupD8.NW), this.x0 = cX + w2 * groupD8.uX(rotate), this.y0 = cY + h2 * groupD8.uY(rotate), rotate = groupD8.add(rotate, 2), this.x1 = cX + w2 * groupD8.uX(rotate), this.y1 = cY + h2 * groupD8.uY(rotate), rotate = groupD8.add(rotate, 2), this.x2 = cX + w2 * groupD8.uX(rotate), this.y2 = cY + h2 * groupD8.uY(rotate), rotate = groupD8.add(rotate, 2), this.x3 = cX + w2 * groupD8.uX(rotate), this.y3 = cY + h2 * groupD8.uY(rotate);
    } else
      this.x0 = frame.x / tw, this.y0 = frame.y / th, this.x1 = (frame.x + frame.width) / tw, this.y1 = frame.y / th, this.x2 = (frame.x + frame.width) / tw, this.y2 = (frame.y + frame.height) / th, this.x3 = frame.x / tw, this.y3 = (frame.y + frame.height) / th;
    this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3;
  }
}
TextureUvs.prototype.toString = function() {
  return `[@pixi/core:TextureUvs x0=${this.x0} y0=${this.y0} x1=${this.x1} y1=${this.y1} x2=${this.x2} y2=${this.y2} x3=${this.x3} y3=${this.y3}]`;
};

// node_modules/@pixi/core/lib/textures/Texture.mjs
var removeAllHandlers = function(tex) {
  tex.destroy = function() {
  }, tex.on = function() {
  }, tex.once = function() {
  }, tex.emit = function() {
  };
};
var DEFAULT_UVS = new TextureUvs;

class Texture extends import_eventemitter3.default {
  constructor(baseTexture, frame, orig, trim, rotate, anchor, borders) {
    if (super(), this.noFrame = false, frame || (this.noFrame = true, frame = new Rectangle(0, 0, 1, 1)), baseTexture instanceof Texture && (baseTexture = baseTexture.baseTexture), this.baseTexture = baseTexture, this._frame = frame, this.trim = trim, this.valid = false, this.destroyed = false, this._uvs = DEFAULT_UVS, this.uvMatrix = null, this.orig = orig || frame, this._rotate = Number(rotate || 0), rotate === true)
      this._rotate = 2;
    else if (this._rotate % 2 !== 0)
      throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
    this.defaultAnchor = anchor ? new Point(anchor.x, anchor.y) : new Point(0, 0), this.defaultBorders = borders, this._updateID = 0, this.textureCacheIds = [], baseTexture.valid ? this.noFrame ? baseTexture.valid && this.onBaseTextureUpdated(baseTexture) : this.frame = frame : baseTexture.once("loaded", this.onBaseTextureUpdated, this), this.noFrame && baseTexture.on("update", this.onBaseTextureUpdated, this);
  }
  update() {
    this.baseTexture.resource && this.baseTexture.resource.update();
  }
  onBaseTextureUpdated(baseTexture) {
    if (this.noFrame) {
      if (!this.baseTexture.valid)
        return;
      this._frame.width = baseTexture.width, this._frame.height = baseTexture.height, this.valid = true, this.updateUvs();
    } else
      this.frame = this._frame;
    this.emit("update", this);
  }
  destroy(destroyBase) {
    if (this.baseTexture) {
      if (destroyBase) {
        const { resource } = this.baseTexture;
        resource?.url && TextureCache[resource.url] && Texture.removeFromCache(resource.url), this.baseTexture.destroy();
      }
      this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null;
    }
    this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = false, Texture.removeFromCache(this), this.textureCacheIds = null, this.destroyed = true, this.emit("destroyed", this), this.removeAllListeners();
  }
  clone() {
    const clonedFrame = this._frame.clone(), clonedOrig = this._frame === this.orig ? clonedFrame : this.orig.clone(), clonedTexture = new Texture(this.baseTexture, !this.noFrame && clonedFrame, clonedOrig, this.trim?.clone(), this.rotate, this.defaultAnchor, this.defaultBorders);
    return this.noFrame && (clonedTexture._frame = clonedFrame), clonedTexture;
  }
  updateUvs() {
    this._uvs === DEFAULT_UVS && (this._uvs = new TextureUvs), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
  }
  static from(source, options = {}, strict = settings.STRICT_TEXTURE_CACHE) {
    const isFrame = typeof source == "string";
    let cacheId = null;
    if (isFrame)
      cacheId = source;
    else if (source instanceof BaseTexture) {
      if (!source.cacheId) {
        const prefix = options?.pixiIdPrefix || "pixiid";
        source.cacheId = `${prefix}-${uid()}`, BaseTexture.addToCache(source, source.cacheId);
      }
      cacheId = source.cacheId;
    } else {
      if (!source._pixiId) {
        const prefix = options?.pixiIdPrefix || "pixiid";
        source._pixiId = `${prefix}_${uid()}`;
      }
      cacheId = source._pixiId;
    }
    let texture = TextureCache[cacheId];
    if (isFrame && strict && !texture)
      throw new Error(`The cacheId "${cacheId}" does not exist in TextureCache.`);
    return !texture && !(source instanceof BaseTexture) ? (options.resolution || (options.resolution = getResolutionOfUrl(source)), texture = new Texture(new BaseTexture(source, options)), texture.baseTexture.cacheId = cacheId, BaseTexture.addToCache(texture.baseTexture, cacheId), Texture.addToCache(texture, cacheId)) : !texture && source instanceof BaseTexture && (texture = new Texture(source), Texture.addToCache(texture, cacheId)), texture;
  }
  static fromURL(url3, options) {
    const resourceOptions = Object.assign({ autoLoad: false }, options?.resourceOptions), texture = Texture.from(url3, Object.assign({ resourceOptions }, options), false), resource = texture.baseTexture.resource;
    return texture.baseTexture.valid ? Promise.resolve(texture) : resource.load().then(() => Promise.resolve(texture));
  }
  static fromBuffer(buffer, width, height, options) {
    return new Texture(BaseTexture.fromBuffer(buffer, width, height, options));
  }
  static fromLoader(source, imageUrl, name, options) {
    const baseTexture = new BaseTexture(source, Object.assign({
      scaleMode: BaseTexture.defaultOptions.scaleMode,
      resolution: getResolutionOfUrl(imageUrl)
    }, options)), { resource } = baseTexture;
    resource instanceof ImageResource && (resource.url = imageUrl);
    const texture = new Texture(baseTexture);
    return name || (name = imageUrl), BaseTexture.addToCache(texture.baseTexture, name), Texture.addToCache(texture, name), name !== imageUrl && (BaseTexture.addToCache(texture.baseTexture, imageUrl), Texture.addToCache(texture, imageUrl)), texture.baseTexture.valid ? Promise.resolve(texture) : new Promise((resolve) => {
      texture.baseTexture.once("loaded", () => resolve(texture));
    });
  }
  static addToCache(texture, id) {
    id && (texture.textureCacheIds.includes(id) || texture.textureCacheIds.push(id), TextureCache[id] && TextureCache[id] !== texture && console.warn(`Texture added to the cache with an id [${id}] that already had an entry`), TextureCache[id] = texture);
  }
  static removeFromCache(texture) {
    if (typeof texture == "string") {
      const textureFromCache = TextureCache[texture];
      if (textureFromCache) {
        const index = textureFromCache.textureCacheIds.indexOf(texture);
        return index > -1 && textureFromCache.textureCacheIds.splice(index, 1), delete TextureCache[texture], textureFromCache;
      }
    } else if (texture?.textureCacheIds) {
      for (let i2 = 0;i2 < texture.textureCacheIds.length; ++i2)
        TextureCache[texture.textureCacheIds[i2]] === texture && delete TextureCache[texture.textureCacheIds[i2]];
      return texture.textureCacheIds.length = 0, texture;
    }
    return null;
  }
  get resolution() {
    return this.baseTexture.resolution;
  }
  get frame() {
    return this._frame;
  }
  set frame(frame) {
    this._frame = frame, this.noFrame = false;
    const { x: x2, y: y2, width, height } = frame, xNotFit = x2 + width > this.baseTexture.width, yNotFit = y2 + height > this.baseTexture.height;
    if (xNotFit || yNotFit) {
      const relationship = xNotFit && yNotFit ? "and" : "or", errorX = `X: ${x2} + ${width} = ${x2 + width} > ${this.baseTexture.width}`, errorY = `Y: ${y2} + ${height} = ${y2 + height} > ${this.baseTexture.height}`;
      throw new Error(`Texture Error: frame does not fit inside the base Texture dimensions: ${errorX} ${relationship} ${errorY}`);
    }
    this.valid = width && height && this.baseTexture.valid, !this.trim && !this.rotate && (this.orig = frame), this.valid && this.updateUvs();
  }
  get rotate() {
    return this._rotate;
  }
  set rotate(rotate) {
    this._rotate = rotate, this.valid && this.updateUvs();
  }
  get width() {
    return this.orig.width;
  }
  get height() {
    return this.orig.height;
  }
  castToBaseTexture() {
    return this.baseTexture;
  }
  static get EMPTY() {
    return Texture._EMPTY || (Texture._EMPTY = new Texture(new BaseTexture), removeAllHandlers(Texture._EMPTY), removeAllHandlers(Texture._EMPTY.baseTexture)), Texture._EMPTY;
  }
  static get WHITE() {
    if (!Texture._WHITE) {
      const canvas = settings.ADAPTER.createCanvas(16, 16), context2 = canvas.getContext("2d");
      canvas.width = 16, canvas.height = 16, context2.fillStyle = "white", context2.fillRect(0, 0, 16, 16), Texture._WHITE = new Texture(BaseTexture.from(canvas)), removeAllHandlers(Texture._WHITE), removeAllHandlers(Texture._WHITE.baseTexture);
    }
    return Texture._WHITE;
  }
}

// node_modules/@pixi/core/lib/renderTexture/RenderTexture.mjs
class RenderTexture extends Texture {
  constructor(baseRenderTexture, frame) {
    super(baseRenderTexture, frame), this.valid = true, this.filterFrame = null, this.filterPoolKey = null, this.updateUvs();
  }
  get framebuffer() {
    return this.baseTexture.framebuffer;
  }
  get multisample() {
    return this.framebuffer.multisample;
  }
  set multisample(value) {
    this.framebuffer.multisample = value;
  }
  resize(desiredWidth, desiredHeight, resizeBaseTexture = true) {
    const resolution = this.baseTexture.resolution, width = Math.round(desiredWidth * resolution) / resolution, height = Math.round(desiredHeight * resolution) / resolution;
    this.valid = width > 0 && height > 0, this._frame.width = this.orig.width = width, this._frame.height = this.orig.height = height, resizeBaseTexture && this.baseTexture.resize(width, height), this.updateUvs();
  }
  setResolution(resolution) {
    const { baseTexture } = this;
    baseTexture.resolution !== resolution && (baseTexture.setResolution(resolution), this.resize(baseTexture.width, baseTexture.height, false));
  }
  static create(options) {
    return new RenderTexture(new BaseRenderTexture(options));
  }
}

// node_modules/@pixi/core/lib/renderTexture/RenderTexturePool.mjs
class RenderTexturePool {
  constructor(textureOptions) {
    this.texturePool = {}, this.textureOptions = textureOptions || {}, this.enableFullScreen = false, this._pixelsWidth = 0, this._pixelsHeight = 0;
  }
  createTexture(realWidth, realHeight, multisample = MSAA_QUALITY.NONE) {
    const baseRenderTexture = new BaseRenderTexture(Object.assign({
      width: realWidth,
      height: realHeight,
      resolution: 1,
      multisample
    }, this.textureOptions));
    return new RenderTexture(baseRenderTexture);
  }
  getOptimalTexture(minWidth, minHeight, resolution = 1, multisample = MSAA_QUALITY.NONE) {
    let key;
    minWidth = Math.max(Math.ceil(minWidth * resolution - 0.000001), 1), minHeight = Math.max(Math.ceil(minHeight * resolution - 0.000001), 1), !this.enableFullScreen || minWidth !== this._pixelsWidth || minHeight !== this._pixelsHeight ? (minWidth = nextPow2(minWidth), minHeight = nextPow2(minHeight), key = ((minWidth & 65535) << 16 | minHeight & 65535) >>> 0, multisample > 1 && (key += multisample * 4294967296)) : key = multisample > 1 ? -multisample : -1, this.texturePool[key] || (this.texturePool[key] = []);
    let renderTexture = this.texturePool[key].pop();
    return renderTexture || (renderTexture = this.createTexture(minWidth, minHeight, multisample)), renderTexture.filterPoolKey = key, renderTexture.setResolution(resolution), renderTexture;
  }
  getFilterTexture(input, resolution, multisample) {
    const filterTexture = this.getOptimalTexture(input.width, input.height, resolution || input.resolution, multisample || MSAA_QUALITY.NONE);
    return filterTexture.filterFrame = input.filterFrame, filterTexture;
  }
  returnTexture(renderTexture) {
    const key = renderTexture.filterPoolKey;
    renderTexture.filterFrame = null, this.texturePool[key].push(renderTexture);
  }
  returnFilterTexture(renderTexture) {
    this.returnTexture(renderTexture);
  }
  clear(destroyTextures) {
    if (destroyTextures = destroyTextures !== false, destroyTextures)
      for (const i2 in this.texturePool) {
        const textures = this.texturePool[i2];
        if (textures)
          for (let j2 = 0;j2 < textures.length; j2++)
            textures[j2].destroy(true);
      }
    this.texturePool = {};
  }
  setScreenSize(size) {
    if (!(size.width === this._pixelsWidth && size.height === this._pixelsHeight)) {
      this.enableFullScreen = size.width > 0 && size.height > 0;
      for (const i2 in this.texturePool) {
        if (!(Number(i2) < 0))
          continue;
        const textures = this.texturePool[i2];
        if (textures)
          for (let j2 = 0;j2 < textures.length; j2++)
            textures[j2].destroy(true);
        this.texturePool[i2] = [];
      }
      this._pixelsWidth = size.width, this._pixelsHeight = size.height;
    }
  }
}
RenderTexturePool.SCREEN_KEY = -1;

// node_modules/@pixi/core/lib/utils/Quad.mjs
class Quad extends Geometry {
  constructor() {
    super(), this.addAttribute("aVertexPosition", new Float32Array([
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ])).addIndex([0, 1, 3, 2]);
  }
}

// node_modules/@pixi/core/lib/utils/QuadUv.mjs
class QuadUv extends Geometry {
  constructor() {
    super(), this.vertices = new Float32Array([
      -1,
      -1,
      1,
      -1,
      1,
      1,
      -1,
      1
    ]), this.uvs = new Float32Array([
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ]), this.vertexBuffer = new Buffer(this.vertices), this.uvBuffer = new Buffer(this.uvs), this.addAttribute("aVertexPosition", this.vertexBuffer).addAttribute("aTextureCoord", this.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]);
  }
  map(targetTextureFrame, destinationFrame) {
    let x2 = 0, y2 = 0;
    return this.uvs[0] = x2, this.uvs[1] = y2, this.uvs[2] = x2 + destinationFrame.width / targetTextureFrame.width, this.uvs[3] = y2, this.uvs[4] = x2 + destinationFrame.width / targetTextureFrame.width, this.uvs[5] = y2 + destinationFrame.height / targetTextureFrame.height, this.uvs[6] = x2, this.uvs[7] = y2 + destinationFrame.height / targetTextureFrame.height, x2 = destinationFrame.x, y2 = destinationFrame.y, this.vertices[0] = x2, this.vertices[1] = y2, this.vertices[2] = x2 + destinationFrame.width, this.vertices[3] = y2, this.vertices[4] = x2 + destinationFrame.width, this.vertices[5] = y2 + destinationFrame.height, this.vertices[6] = x2, this.vertices[7] = y2 + destinationFrame.height, this.invalidate(), this;
  }
  invalidate() {
    return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this;
  }
}

// node_modules/@pixi/core/lib/filters/FilterState.mjs
class FilterState {
  constructor() {
    this.renderTexture = null, this.target = null, this.legacy = false, this.resolution = 1, this.multisample = MSAA_QUALITY.NONE, this.sourceFrame = new Rectangle, this.destinationFrame = new Rectangle, this.bindingSourceFrame = new Rectangle, this.bindingDestinationFrame = new Rectangle, this.filters = [], this.transform = null;
  }
  clear() {
    this.target = null, this.filters = null, this.renderTexture = null;
  }
}

// node_modules/@pixi/core/lib/filters/FilterSystem.mjs
var tempPoints2 = [new Point, new Point, new Point, new Point];
var tempMatrix = new Matrix;

class FilterSystem {
  constructor(renderer) {
    this.renderer = renderer, this.defaultFilterStack = [{}], this.texturePool = new RenderTexturePool, this.statePool = [], this.quad = new Quad, this.quadUv = new QuadUv, this.tempRect = new Rectangle, this.activeState = {}, this.globalUniforms = new UniformGroup({
      outputFrame: new Rectangle,
      inputSize: new Float32Array(4),
      inputPixel: new Float32Array(4),
      inputClamp: new Float32Array(4),
      resolution: 1,
      filterArea: new Float32Array(4),
      filterClamp: new Float32Array(4)
    }, true), this.forceClear = false, this.useMaxPadding = false;
  }
  init() {
    this.texturePool.setScreenSize(this.renderer.view);
  }
  push(target, filters) {
    const renderer = this.renderer, filterStack = this.defaultFilterStack, state = this.statePool.pop() || new FilterState, renderTextureSystem = renderer.renderTexture;
    let currentResolution, currentMultisample;
    if (renderTextureSystem.current) {
      const renderTexture = renderTextureSystem.current;
      currentResolution = renderTexture.resolution, currentMultisample = renderTexture.multisample;
    } else
      currentResolution = renderer.resolution, currentMultisample = renderer.multisample;
    let resolution = filters[0].resolution || currentResolution, multisample = filters[0].multisample ?? currentMultisample, padding = filters[0].padding, autoFit = filters[0].autoFit, legacy = filters[0].legacy ?? true;
    for (let i2 = 1;i2 < filters.length; i2++) {
      const filter = filters[i2];
      resolution = Math.min(resolution, filter.resolution || currentResolution), multisample = Math.min(multisample, filter.multisample ?? currentMultisample), padding = this.useMaxPadding ? Math.max(padding, filter.padding) : padding + filter.padding, autoFit = autoFit && filter.autoFit, legacy = legacy || (filter.legacy ?? true);
    }
    filterStack.length === 1 && (this.defaultFilterStack[0].renderTexture = renderTextureSystem.current), filterStack.push(state), state.resolution = resolution, state.multisample = multisample, state.legacy = legacy, state.target = target, state.sourceFrame.copyFrom(target.filterArea || target.getBounds(true)), state.sourceFrame.pad(padding);
    const sourceFrameProjected = this.tempRect.copyFrom(renderTextureSystem.sourceFrame);
    renderer.projection.transform && this.transformAABB(tempMatrix.copyFrom(renderer.projection.transform).invert(), sourceFrameProjected), autoFit ? (state.sourceFrame.fit(sourceFrameProjected), (state.sourceFrame.width <= 0 || state.sourceFrame.height <= 0) && (state.sourceFrame.width = 0, state.sourceFrame.height = 0)) : state.sourceFrame.intersects(sourceFrameProjected) || (state.sourceFrame.width = 0, state.sourceFrame.height = 0), this.roundFrame(state.sourceFrame, renderTextureSystem.current ? renderTextureSystem.current.resolution : renderer.resolution, renderTextureSystem.sourceFrame, renderTextureSystem.destinationFrame, renderer.projection.transform), state.renderTexture = this.getOptimalFilterTexture(state.sourceFrame.width, state.sourceFrame.height, resolution, multisample), state.filters = filters, state.destinationFrame.width = state.renderTexture.width, state.destinationFrame.height = state.renderTexture.height;
    const destinationFrame = this.tempRect;
    destinationFrame.x = 0, destinationFrame.y = 0, destinationFrame.width = state.sourceFrame.width, destinationFrame.height = state.sourceFrame.height, state.renderTexture.filterFrame = state.sourceFrame, state.bindingSourceFrame.copyFrom(renderTextureSystem.sourceFrame), state.bindingDestinationFrame.copyFrom(renderTextureSystem.destinationFrame), state.transform = renderer.projection.transform, renderer.projection.transform = null, renderTextureSystem.bind(state.renderTexture, state.sourceFrame, destinationFrame), renderer.framebuffer.clear(0, 0, 0, 0);
  }
  pop() {
    const filterStack = this.defaultFilterStack, state = filterStack.pop(), filters = state.filters;
    this.activeState = state;
    const globalUniforms = this.globalUniforms.uniforms;
    globalUniforms.outputFrame = state.sourceFrame, globalUniforms.resolution = state.resolution;
    const { inputSize, inputPixel, inputClamp } = globalUniforms;
    if (inputSize[0] = state.destinationFrame.width, inputSize[1] = state.destinationFrame.height, inputSize[2] = 1 / inputSize[0], inputSize[3] = 1 / inputSize[1], inputPixel[0] = Math.round(inputSize[0] * state.resolution), inputPixel[1] = Math.round(inputSize[1] * state.resolution), inputPixel[2] = 1 / inputPixel[0], inputPixel[3] = 1 / inputPixel[1], inputClamp[0] = 0.5 * inputPixel[2], inputClamp[1] = 0.5 * inputPixel[3], inputClamp[2] = state.sourceFrame.width * inputSize[2] - 0.5 * inputPixel[2], inputClamp[3] = state.sourceFrame.height * inputSize[3] - 0.5 * inputPixel[3], state.legacy) {
      const filterArea = globalUniforms.filterArea;
      filterArea[0] = state.destinationFrame.width, filterArea[1] = state.destinationFrame.height, filterArea[2] = state.sourceFrame.x, filterArea[3] = state.sourceFrame.y, globalUniforms.filterClamp = globalUniforms.inputClamp;
    }
    this.globalUniforms.update();
    const lastState = filterStack[filterStack.length - 1];
    if (this.renderer.framebuffer.blit(), filters.length === 1)
      filters[0].apply(this, state.renderTexture, lastState.renderTexture, CLEAR_MODES.BLEND, state), this.returnFilterTexture(state.renderTexture);
    else {
      let flip = state.renderTexture, flop = this.getOptimalFilterTexture(flip.width, flip.height, state.resolution);
      flop.filterFrame = flip.filterFrame;
      let i2 = 0;
      for (i2 = 0;i2 < filters.length - 1; ++i2) {
        i2 === 1 && state.multisample > 1 && (flop = this.getOptimalFilterTexture(flip.width, flip.height, state.resolution), flop.filterFrame = flip.filterFrame), filters[i2].apply(this, flip, flop, CLEAR_MODES.CLEAR, state);
        const t2 = flip;
        flip = flop, flop = t2;
      }
      filters[i2].apply(this, flip, lastState.renderTexture, CLEAR_MODES.BLEND, state), i2 > 1 && state.multisample > 1 && this.returnFilterTexture(state.renderTexture), this.returnFilterTexture(flip), this.returnFilterTexture(flop);
    }
    state.clear(), this.statePool.push(state);
  }
  bindAndClear(filterTexture, clearMode = CLEAR_MODES.CLEAR) {
    const {
      renderTexture: renderTextureSystem,
      state: stateSystem
    } = this.renderer;
    if (filterTexture === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, filterTexture?.filterFrame) {
      const destinationFrame = this.tempRect;
      destinationFrame.x = 0, destinationFrame.y = 0, destinationFrame.width = filterTexture.filterFrame.width, destinationFrame.height = filterTexture.filterFrame.height, renderTextureSystem.bind(filterTexture, filterTexture.filterFrame, destinationFrame);
    } else
      filterTexture !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? renderTextureSystem.bind(filterTexture) : this.renderer.renderTexture.bind(filterTexture, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
    const autoClear = stateSystem.stateId & 1 || this.forceClear;
    (clearMode === CLEAR_MODES.CLEAR || clearMode === CLEAR_MODES.BLIT && autoClear) && this.renderer.framebuffer.clear(0, 0, 0, 0);
  }
  applyFilter(filter, input, output, clearMode) {
    const renderer = this.renderer;
    renderer.state.set(filter.state), this.bindAndClear(output, clearMode), filter.uniforms.uSampler = input, filter.uniforms.filterGlobals = this.globalUniforms, renderer.shader.bind(filter), filter.legacy = !!filter.program.attributeData.aTextureCoord, filter.legacy ? (this.quadUv.map(input._frame, input.filterFrame), renderer.geometry.bind(this.quadUv), renderer.geometry.draw(DRAW_MODES.TRIANGLES)) : (renderer.geometry.bind(this.quad), renderer.geometry.draw(DRAW_MODES.TRIANGLE_STRIP));
  }
  calculateSpriteMatrix(outputMatrix, sprite) {
    const { sourceFrame, destinationFrame } = this.activeState, { orig } = sprite._texture, mappedMatrix = outputMatrix.set(destinationFrame.width, 0, 0, destinationFrame.height, sourceFrame.x, sourceFrame.y), worldTransform = sprite.worldTransform.copyTo(Matrix.TEMP_MATRIX);
    return worldTransform.invert(), mappedMatrix.prepend(worldTransform), mappedMatrix.scale(1 / orig.width, 1 / orig.height), mappedMatrix.translate(sprite.anchor.x, sprite.anchor.y), mappedMatrix;
  }
  destroy() {
    this.renderer = null, this.texturePool.clear(false);
  }
  getOptimalFilterTexture(minWidth, minHeight, resolution = 1, multisample = MSAA_QUALITY.NONE) {
    return this.texturePool.getOptimalTexture(minWidth, minHeight, resolution, multisample);
  }
  getFilterTexture(input, resolution, multisample) {
    if (typeof input == "number") {
      const swap = input;
      input = resolution, resolution = swap;
    }
    input = input || this.activeState.renderTexture;
    const filterTexture = this.texturePool.getOptimalTexture(input.width, input.height, resolution || input.resolution, multisample || MSAA_QUALITY.NONE);
    return filterTexture.filterFrame = input.filterFrame, filterTexture;
  }
  returnFilterTexture(renderTexture) {
    this.texturePool.returnTexture(renderTexture);
  }
  emptyPool() {
    this.texturePool.clear(true);
  }
  resize() {
    this.texturePool.setScreenSize(this.renderer.view);
  }
  transformAABB(matrix, rect) {
    const lt = tempPoints2[0], lb = tempPoints2[1], rt2 = tempPoints2[2], rb = tempPoints2[3];
    lt.set(rect.left, rect.top), lb.set(rect.left, rect.bottom), rt2.set(rect.right, rect.top), rb.set(rect.right, rect.bottom), matrix.apply(lt, lt), matrix.apply(lb, lb), matrix.apply(rt2, rt2), matrix.apply(rb, rb);
    const x0 = Math.min(lt.x, lb.x, rt2.x, rb.x), y0 = Math.min(lt.y, lb.y, rt2.y, rb.y), x1 = Math.max(lt.x, lb.x, rt2.x, rb.x), y1 = Math.max(lt.y, lb.y, rt2.y, rb.y);
    rect.x = x0, rect.y = y0, rect.width = x1 - x0, rect.height = y1 - y0;
  }
  roundFrame(frame, resolution, bindingSourceFrame, bindingDestinationFrame, transform) {
    if (!(frame.width <= 0 || frame.height <= 0 || bindingSourceFrame.width <= 0 || bindingSourceFrame.height <= 0)) {
      if (transform) {
        const { a: a2, b: b2, c: c2, d: d2 } = transform;
        if ((Math.abs(b2) > 0.0001 || Math.abs(c2) > 0.0001) && (Math.abs(a2) > 0.0001 || Math.abs(d2) > 0.0001))
          return;
      }
      transform = transform ? tempMatrix.copyFrom(transform) : tempMatrix.identity(), transform.translate(-bindingSourceFrame.x, -bindingSourceFrame.y).scale(bindingDestinationFrame.width / bindingSourceFrame.width, bindingDestinationFrame.height / bindingSourceFrame.height).translate(bindingDestinationFrame.x, bindingDestinationFrame.y), this.transformAABB(transform, frame), frame.ceil(resolution), this.transformAABB(transform.invert(), frame);
    }
  }
}
FilterSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "filter"
};
extensions.add(FilterSystem);

// node_modules/@pixi/core/lib/framebuffer/GLFramebuffer.mjs
class GLFramebuffer {
  constructor(framebuffer) {
    this.framebuffer = framebuffer, this.stencil = null, this.dirtyId = -1, this.dirtyFormat = -1, this.dirtySize = -1, this.multisample = MSAA_QUALITY.NONE, this.msaaBuffer = null, this.blitFramebuffer = null, this.mipLevel = 0;
  }
}

// node_modules/@pixi/core/lib/framebuffer/FramebufferSystem.mjs
var tempRectangle = new Rectangle;

class FramebufferSystem {
  constructor(renderer) {
    this.renderer = renderer, this.managedFramebuffers = [], this.unknownFramebuffer = new Framebuffer(10, 10), this.msaaSamples = null;
  }
  contextChange() {
    this.disposeAll(true);
    const gl = this.gl = this.renderer.gl;
    if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new Rectangle, this.hasMRT = true, this.writeDepthTexture = true, this.renderer.context.webGLVersion === 1) {
      let nativeDrawBuffersExtension = this.renderer.context.extensions.drawBuffers, nativeDepthTextureExtension = this.renderer.context.extensions.depthTexture;
      settings.PREFER_ENV === ENV.WEBGL_LEGACY && (nativeDrawBuffersExtension = null, nativeDepthTextureExtension = null), nativeDrawBuffersExtension ? gl.drawBuffers = (activeTextures) => nativeDrawBuffersExtension.drawBuffersWEBGL(activeTextures) : (this.hasMRT = false, gl.drawBuffers = () => {
      }), nativeDepthTextureExtension || (this.writeDepthTexture = false);
    } else
      this.msaaSamples = gl.getInternalformatParameter(gl.RENDERBUFFER, gl.RGBA8, gl.SAMPLES);
  }
  bind(framebuffer, frame, mipLevel = 0) {
    const { gl } = this;
    if (framebuffer) {
      const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(framebuffer);
      this.current !== framebuffer && (this.current = framebuffer, gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.framebuffer)), fbo.mipLevel !== mipLevel && (framebuffer.dirtyId++, framebuffer.dirtyFormat++, fbo.mipLevel = mipLevel), fbo.dirtyId !== framebuffer.dirtyId && (fbo.dirtyId = framebuffer.dirtyId, fbo.dirtyFormat !== framebuffer.dirtyFormat ? (fbo.dirtyFormat = framebuffer.dirtyFormat, fbo.dirtySize = framebuffer.dirtySize, this.updateFramebuffer(framebuffer, mipLevel)) : fbo.dirtySize !== framebuffer.dirtySize && (fbo.dirtySize = framebuffer.dirtySize, this.resizeFramebuffer(framebuffer)));
      for (let i2 = 0;i2 < framebuffer.colorTextures.length; i2++) {
        const tex = framebuffer.colorTextures[i2];
        this.renderer.texture.unbind(tex.parentTextureArray || tex);
      }
      if (framebuffer.depthTexture && this.renderer.texture.unbind(framebuffer.depthTexture), frame) {
        const mipWidth = frame.width >> mipLevel, mipHeight = frame.height >> mipLevel, scale = mipWidth / frame.width;
        this.setViewport(frame.x * scale, frame.y * scale, mipWidth, mipHeight);
      } else {
        const mipWidth = framebuffer.width >> mipLevel, mipHeight = framebuffer.height >> mipLevel;
        this.setViewport(0, 0, mipWidth, mipHeight);
      }
    } else
      this.current && (this.current = null, gl.bindFramebuffer(gl.FRAMEBUFFER, null)), frame ? this.setViewport(frame.x, frame.y, frame.width, frame.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height);
  }
  setViewport(x2, y2, width, height) {
    const v2 = this.viewport;
    x2 = Math.round(x2), y2 = Math.round(y2), width = Math.round(width), height = Math.round(height), (v2.width !== width || v2.height !== height || v2.x !== x2 || v2.y !== y2) && (v2.x = x2, v2.y = y2, v2.width = width, v2.height = height, this.gl.viewport(x2, y2, width, height));
  }
  get size() {
    return this.current ? { x: 0, y: 0, width: this.current.width, height: this.current.height } : { x: 0, y: 0, width: this.renderer.width, height: this.renderer.height };
  }
  clear(r2, g2, b2, a2, mask = BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH) {
    const { gl } = this;
    gl.clearColor(r2, g2, b2, a2), gl.clear(mask);
  }
  initFramebuffer(framebuffer) {
    const { gl } = this, fbo = new GLFramebuffer(gl.createFramebuffer());
    return fbo.multisample = this.detectSamples(framebuffer.multisample), framebuffer.glFramebuffers[this.CONTEXT_UID] = fbo, this.managedFramebuffers.push(framebuffer), framebuffer.disposeRunner.add(this), fbo;
  }
  resizeFramebuffer(framebuffer) {
    const { gl } = this, fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
    if (fbo.stencil) {
      gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.stencil);
      let stencilFormat;
      this.renderer.context.webGLVersion === 1 ? stencilFormat = gl.DEPTH_STENCIL : framebuffer.depth && framebuffer.stencil ? stencilFormat = gl.DEPTH24_STENCIL8 : framebuffer.depth ? stencilFormat = gl.DEPTH_COMPONENT24 : stencilFormat = gl.STENCIL_INDEX8, fbo.msaaBuffer ? gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, stencilFormat, framebuffer.width, framebuffer.height) : gl.renderbufferStorage(gl.RENDERBUFFER, stencilFormat, framebuffer.width, framebuffer.height);
    }
    const colorTextures = framebuffer.colorTextures;
    let count = colorTextures.length;
    gl.drawBuffers || (count = Math.min(count, 1));
    for (let i2 = 0;i2 < count; i2++) {
      const texture = colorTextures[i2], parentTexture = texture.parentTextureArray || texture;
      this.renderer.texture.bind(parentTexture, 0), i2 === 0 && fbo.msaaBuffer && (gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.msaaBuffer), gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, parentTexture._glTextures[this.CONTEXT_UID].internalFormat, framebuffer.width, framebuffer.height));
    }
    framebuffer.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(framebuffer.depthTexture, 0);
  }
  updateFramebuffer(framebuffer, mipLevel) {
    const { gl } = this, fbo = framebuffer.glFramebuffers[this.CONTEXT_UID], colorTextures = framebuffer.colorTextures;
    let count = colorTextures.length;
    gl.drawBuffers || (count = Math.min(count, 1)), fbo.multisample > 1 && this.canMultisampleFramebuffer(framebuffer) ? fbo.msaaBuffer = fbo.msaaBuffer || gl.createRenderbuffer() : fbo.msaaBuffer && (gl.deleteRenderbuffer(fbo.msaaBuffer), fbo.msaaBuffer = null, fbo.blitFramebuffer && (fbo.blitFramebuffer.dispose(), fbo.blitFramebuffer = null));
    const activeTextures = [];
    for (let i2 = 0;i2 < count; i2++) {
      const texture = colorTextures[i2], parentTexture = texture.parentTextureArray || texture;
      this.renderer.texture.bind(parentTexture, 0), i2 === 0 && fbo.msaaBuffer ? (gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.msaaBuffer), gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, parentTexture._glTextures[this.CONTEXT_UID].internalFormat, framebuffer.width, framebuffer.height), gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, fbo.msaaBuffer)) : (gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i2, texture.target, parentTexture._glTextures[this.CONTEXT_UID].texture, mipLevel), activeTextures.push(gl.COLOR_ATTACHMENT0 + i2));
    }
    if (activeTextures.length > 1 && gl.drawBuffers(activeTextures), framebuffer.depthTexture && this.writeDepthTexture) {
      const depthTexture = framebuffer.depthTexture;
      this.renderer.texture.bind(depthTexture, 0), gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture._glTextures[this.CONTEXT_UID].texture, mipLevel);
    }
    if ((framebuffer.stencil || framebuffer.depth) && !(framebuffer.depthTexture && this.writeDepthTexture)) {
      fbo.stencil = fbo.stencil || gl.createRenderbuffer();
      let stencilAttachment, stencilFormat;
      this.renderer.context.webGLVersion === 1 ? (stencilAttachment = gl.DEPTH_STENCIL_ATTACHMENT, stencilFormat = gl.DEPTH_STENCIL) : framebuffer.depth && framebuffer.stencil ? (stencilAttachment = gl.DEPTH_STENCIL_ATTACHMENT, stencilFormat = gl.DEPTH24_STENCIL8) : framebuffer.depth ? (stencilAttachment = gl.DEPTH_ATTACHMENT, stencilFormat = gl.DEPTH_COMPONENT24) : (stencilAttachment = gl.STENCIL_ATTACHMENT, stencilFormat = gl.STENCIL_INDEX8), gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.stencil), fbo.msaaBuffer ? gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, stencilFormat, framebuffer.width, framebuffer.height) : gl.renderbufferStorage(gl.RENDERBUFFER, stencilFormat, framebuffer.width, framebuffer.height), gl.framebufferRenderbuffer(gl.FRAMEBUFFER, stencilAttachment, gl.RENDERBUFFER, fbo.stencil);
    } else
      fbo.stencil && (gl.deleteRenderbuffer(fbo.stencil), fbo.stencil = null);
  }
  canMultisampleFramebuffer(framebuffer) {
    return this.renderer.context.webGLVersion !== 1 && framebuffer.colorTextures.length <= 1 && !framebuffer.depthTexture;
  }
  detectSamples(samples) {
    const { msaaSamples } = this;
    let res = MSAA_QUALITY.NONE;
    if (samples <= 1 || msaaSamples === null)
      return res;
    for (let i2 = 0;i2 < msaaSamples.length; i2++)
      if (msaaSamples[i2] <= samples) {
        res = msaaSamples[i2];
        break;
      }
    return res === 1 && (res = MSAA_QUALITY.NONE), res;
  }
  blit(framebuffer, sourcePixels, destPixels) {
    const { current, renderer, gl, CONTEXT_UID } = this;
    if (renderer.context.webGLVersion !== 2 || !current)
      return;
    const fbo = current.glFramebuffers[CONTEXT_UID];
    if (!fbo)
      return;
    if (!framebuffer) {
      if (!fbo.msaaBuffer)
        return;
      const colorTexture = current.colorTextures[0];
      if (!colorTexture)
        return;
      fbo.blitFramebuffer || (fbo.blitFramebuffer = new Framebuffer(current.width, current.height), fbo.blitFramebuffer.addColorTexture(0, colorTexture)), framebuffer = fbo.blitFramebuffer, framebuffer.colorTextures[0] !== colorTexture && (framebuffer.colorTextures[0] = colorTexture, framebuffer.dirtyId++, framebuffer.dirtyFormat++), (framebuffer.width !== current.width || framebuffer.height !== current.height) && (framebuffer.width = current.width, framebuffer.height = current.height, framebuffer.dirtyId++, framebuffer.dirtySize++);
    }
    sourcePixels || (sourcePixels = tempRectangle, sourcePixels.width = current.width, sourcePixels.height = current.height), destPixels || (destPixels = sourcePixels);
    const sameSize = sourcePixels.width === destPixels.width && sourcePixels.height === destPixels.height;
    this.bind(framebuffer), gl.bindFramebuffer(gl.READ_FRAMEBUFFER, fbo.framebuffer), gl.blitFramebuffer(sourcePixels.left, sourcePixels.top, sourcePixels.right, sourcePixels.bottom, destPixels.left, destPixels.top, destPixels.right, destPixels.bottom, gl.COLOR_BUFFER_BIT, sameSize ? gl.NEAREST : gl.LINEAR), gl.bindFramebuffer(gl.READ_FRAMEBUFFER, framebuffer.glFramebuffers[this.CONTEXT_UID].framebuffer);
  }
  disposeFramebuffer(framebuffer, contextLost) {
    const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID], gl = this.gl;
    if (!fbo)
      return;
    delete framebuffer.glFramebuffers[this.CONTEXT_UID];
    const index = this.managedFramebuffers.indexOf(framebuffer);
    index >= 0 && this.managedFramebuffers.splice(index, 1), framebuffer.disposeRunner.remove(this), contextLost || (gl.deleteFramebuffer(fbo.framebuffer), fbo.msaaBuffer && gl.deleteRenderbuffer(fbo.msaaBuffer), fbo.stencil && gl.deleteRenderbuffer(fbo.stencil)), fbo.blitFramebuffer && this.disposeFramebuffer(fbo.blitFramebuffer, contextLost);
  }
  disposeAll(contextLost) {
    const list = this.managedFramebuffers;
    this.managedFramebuffers = [];
    for (let i2 = 0;i2 < list.length; i2++)
      this.disposeFramebuffer(list[i2], contextLost);
  }
  forceStencil() {
    const framebuffer = this.current;
    if (!framebuffer)
      return;
    const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
    if (!fbo || fbo.stencil && framebuffer.stencil)
      return;
    framebuffer.stencil = true;
    const { width: w2, height: h2 } = framebuffer, gl = this.gl, stencil = fbo.stencil = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, stencil);
    let stencilAttachment, stencilFormat;
    this.renderer.context.webGLVersion === 1 ? (stencilAttachment = gl.DEPTH_STENCIL_ATTACHMENT, stencilFormat = gl.DEPTH_STENCIL) : framebuffer.depth ? (stencilAttachment = gl.DEPTH_STENCIL_ATTACHMENT, stencilFormat = gl.DEPTH24_STENCIL8) : (stencilAttachment = gl.STENCIL_ATTACHMENT, stencilFormat = gl.STENCIL_INDEX8), fbo.msaaBuffer ? gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, stencilFormat, w2, h2) : gl.renderbufferStorage(gl.RENDERBUFFER, stencilFormat, w2, h2), gl.framebufferRenderbuffer(gl.FRAMEBUFFER, stencilAttachment, gl.RENDERBUFFER, stencil);
  }
  reset() {
    this.current = this.unknownFramebuffer, this.viewport = new Rectangle;
  }
  destroy() {
    this.renderer = null;
  }
}
FramebufferSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "framebuffer"
};
extensions.add(FramebufferSystem);

// node_modules/@pixi/core/lib/geometry/GeometrySystem.mjs
var byteSizeMap2 = { 5126: 4, 5123: 2, 5121: 1 };

class GeometrySystem {
  constructor(renderer) {
    this.renderer = renderer, this._activeGeometry = null, this._activeVao = null, this.hasVao = true, this.hasInstance = true, this.canUseUInt32ElementIndex = false, this.managedGeometries = {};
  }
  contextChange() {
    this.disposeAll(true);
    const gl = this.gl = this.renderer.gl, context2 = this.renderer.context;
    if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, context2.webGLVersion !== 2) {
      let nativeVaoExtension = this.renderer.context.extensions.vertexArrayObject;
      settings.PREFER_ENV === ENV.WEBGL_LEGACY && (nativeVaoExtension = null), nativeVaoExtension ? (gl.createVertexArray = () => nativeVaoExtension.createVertexArrayOES(), gl.bindVertexArray = (vao) => nativeVaoExtension.bindVertexArrayOES(vao), gl.deleteVertexArray = (vao) => nativeVaoExtension.deleteVertexArrayOES(vao)) : (this.hasVao = false, gl.createVertexArray = () => null, gl.bindVertexArray = () => null, gl.deleteVertexArray = () => null);
    }
    if (context2.webGLVersion !== 2) {
      const instanceExt = gl.getExtension("ANGLE_instanced_arrays");
      instanceExt ? (gl.vertexAttribDivisor = (a2, b2) => instanceExt.vertexAttribDivisorANGLE(a2, b2), gl.drawElementsInstanced = (a2, b2, c2, d2, e2) => instanceExt.drawElementsInstancedANGLE(a2, b2, c2, d2, e2), gl.drawArraysInstanced = (a2, b2, c2, d2) => instanceExt.drawArraysInstancedANGLE(a2, b2, c2, d2)) : this.hasInstance = false;
    }
    this.canUseUInt32ElementIndex = context2.webGLVersion === 2 || !!context2.extensions.uint32ElementIndex;
  }
  bind(geometry, shader) {
    shader = shader || this.renderer.shader.shader;
    const { gl } = this;
    let vaos = geometry.glVertexArrayObjects[this.CONTEXT_UID], incRefCount = false;
    vaos || (this.managedGeometries[geometry.id] = geometry, geometry.disposeRunner.add(this), geometry.glVertexArrayObjects[this.CONTEXT_UID] = vaos = {}, incRefCount = true);
    const vao = vaos[shader.program.id] || this.initGeometryVao(geometry, shader, incRefCount);
    this._activeGeometry = geometry, this._activeVao !== vao && (this._activeVao = vao, this.hasVao ? gl.bindVertexArray(vao) : this.activateVao(geometry, shader.program)), this.updateBuffers();
  }
  reset() {
    this.unbind();
  }
  updateBuffers() {
    const geometry = this._activeGeometry, bufferSystem = this.renderer.buffer;
    for (let i2 = 0;i2 < geometry.buffers.length; i2++) {
      const buffer = geometry.buffers[i2];
      bufferSystem.update(buffer);
    }
  }
  checkCompatibility(geometry, program) {
    const geometryAttributes = geometry.attributes, shaderAttributes = program.attributeData;
    for (const j2 in shaderAttributes)
      if (!geometryAttributes[j2])
        throw new Error(`shader and geometry incompatible, geometry missing the "${j2}" attribute`);
  }
  getSignature(geometry, program) {
    const attribs = geometry.attributes, shaderAttributes = program.attributeData, strings = ["g", geometry.id];
    for (const i2 in attribs)
      shaderAttributes[i2] && strings.push(i2, shaderAttributes[i2].location);
    return strings.join("-");
  }
  initGeometryVao(geometry, shader, incRefCount = true) {
    const gl = this.gl, CONTEXT_UID = this.CONTEXT_UID, bufferSystem = this.renderer.buffer, program = shader.program;
    program.glPrograms[CONTEXT_UID] || this.renderer.shader.generateProgram(shader), this.checkCompatibility(geometry, program);
    const signature = this.getSignature(geometry, program), vaoObjectHash = geometry.glVertexArrayObjects[this.CONTEXT_UID];
    let vao = vaoObjectHash[signature];
    if (vao)
      return vaoObjectHash[program.id] = vao, vao;
    const { buffers, attributes } = geometry, tempStride = {}, tempStart = {};
    for (const j2 in buffers)
      tempStride[j2] = 0, tempStart[j2] = 0;
    for (const j2 in attributes)
      !attributes[j2].size && program.attributeData[j2] ? attributes[j2].size = program.attributeData[j2].size : attributes[j2].size || console.warn(`PIXI Geometry attribute '${j2}' size cannot be determined (likely the bound shader does not have the attribute)`), tempStride[attributes[j2].buffer] += attributes[j2].size * byteSizeMap2[attributes[j2].type];
    for (const j2 in attributes) {
      const attribute = attributes[j2], attribSize = attribute.size;
      attribute.stride === undefined && (tempStride[attribute.buffer] === attribSize * byteSizeMap2[attribute.type] ? attribute.stride = 0 : attribute.stride = tempStride[attribute.buffer]), attribute.start === undefined && (attribute.start = tempStart[attribute.buffer], tempStart[attribute.buffer] += attribSize * byteSizeMap2[attribute.type]);
    }
    vao = gl.createVertexArray(), gl.bindVertexArray(vao);
    for (let i2 = 0;i2 < buffers.length; i2++) {
      const buffer = buffers[i2];
      bufferSystem.bind(buffer), incRefCount && buffer._glBuffers[CONTEXT_UID].refCount++;
    }
    return this.activateVao(geometry, program), vaoObjectHash[program.id] = vao, vaoObjectHash[signature] = vao, gl.bindVertexArray(null), bufferSystem.unbind(BUFFER_TYPE.ARRAY_BUFFER), vao;
  }
  disposeGeometry(geometry, contextLost) {
    if (!this.managedGeometries[geometry.id])
      return;
    delete this.managedGeometries[geometry.id];
    const vaos = geometry.glVertexArrayObjects[this.CONTEXT_UID], gl = this.gl, buffers = geometry.buffers, bufferSystem = this.renderer?.buffer;
    if (geometry.disposeRunner.remove(this), !!vaos) {
      if (bufferSystem)
        for (let i2 = 0;i2 < buffers.length; i2++) {
          const buf = buffers[i2]._glBuffers[this.CONTEXT_UID];
          buf && (buf.refCount--, buf.refCount === 0 && !contextLost && bufferSystem.dispose(buffers[i2], contextLost));
        }
      if (!contextLost) {
        for (const vaoId in vaos)
          if (vaoId[0] === "g") {
            const vao = vaos[vaoId];
            this._activeVao === vao && this.unbind(), gl.deleteVertexArray(vao);
          }
      }
      delete geometry.glVertexArrayObjects[this.CONTEXT_UID];
    }
  }
  disposeAll(contextLost) {
    const all = Object.keys(this.managedGeometries);
    for (let i2 = 0;i2 < all.length; i2++)
      this.disposeGeometry(this.managedGeometries[all[i2]], contextLost);
  }
  activateVao(geometry, program) {
    const gl = this.gl, CONTEXT_UID = this.CONTEXT_UID, bufferSystem = this.renderer.buffer, buffers = geometry.buffers, attributes = geometry.attributes;
    geometry.indexBuffer && bufferSystem.bind(geometry.indexBuffer);
    let lastBuffer = null;
    for (const j2 in attributes) {
      const attribute = attributes[j2], buffer = buffers[attribute.buffer], glBuffer = buffer._glBuffers[CONTEXT_UID];
      if (program.attributeData[j2]) {
        lastBuffer !== glBuffer && (bufferSystem.bind(buffer), lastBuffer = glBuffer);
        const location = program.attributeData[j2].location;
        if (gl.enableVertexAttribArray(location), gl.vertexAttribPointer(location, attribute.size, attribute.type || gl.FLOAT, attribute.normalized, attribute.stride, attribute.start), attribute.instance)
          if (this.hasInstance)
            gl.vertexAttribDivisor(location, attribute.divisor);
          else
            throw new Error("geometry error, GPU Instancing is not supported on this device");
      }
    }
  }
  draw(type, size, start, instanceCount) {
    const { gl } = this, geometry = this._activeGeometry;
    if (geometry.indexBuffer) {
      const byteSize = geometry.indexBuffer.data.BYTES_PER_ELEMENT, glType = byteSize === 2 ? gl.UNSIGNED_SHORT : gl.UNSIGNED_INT;
      byteSize === 2 || byteSize === 4 && this.canUseUInt32ElementIndex ? geometry.instanced ? gl.drawElementsInstanced(type, size || geometry.indexBuffer.data.length, glType, (start || 0) * byteSize, instanceCount || 1) : gl.drawElements(type, size || geometry.indexBuffer.data.length, glType, (start || 0) * byteSize) : console.warn("unsupported index buffer type: uint32");
    } else
      geometry.instanced ? gl.drawArraysInstanced(type, start, size || geometry.getSize(), instanceCount || 1) : gl.drawArrays(type, start, size || geometry.getSize());
    return this;
  }
  unbind() {
    this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null;
  }
  destroy() {
    this.renderer = null;
  }
}
GeometrySystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "geometry"
};
extensions.add(GeometrySystem);

// node_modules/@pixi/core/lib/textures/TextureMatrix.mjs
var tempMat = new Matrix;

class TextureMatrix {
  constructor(texture, clampMargin) {
    this._texture = texture, this.mapCoord = new Matrix, this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = typeof clampMargin > "u" ? 0.5 : clampMargin, this.isSimple = false;
  }
  get texture() {
    return this._texture;
  }
  set texture(value) {
    this._texture = value, this._textureID = -1;
  }
  multiplyUvs(uvs, out) {
    out === undefined && (out = uvs);
    const mat = this.mapCoord;
    for (let i2 = 0;i2 < uvs.length; i2 += 2) {
      const x2 = uvs[i2], y2 = uvs[i2 + 1];
      out[i2] = x2 * mat.a + y2 * mat.c + mat.tx, out[i2 + 1] = x2 * mat.b + y2 * mat.d + mat.ty;
    }
    return out;
  }
  update(forceUpdate) {
    const tex = this._texture;
    if (!tex || !tex.valid || !forceUpdate && this._textureID === tex._updateID)
      return false;
    this._textureID = tex._updateID, this._updateID++;
    const uvs = tex._uvs;
    this.mapCoord.set(uvs.x1 - uvs.x0, uvs.y1 - uvs.y0, uvs.x3 - uvs.x0, uvs.y3 - uvs.y0, uvs.x0, uvs.y0);
    const { orig, trim } = tex;
    trim && (tempMat.set(orig.width / trim.width, 0, 0, orig.height / trim.height, -trim.x / trim.width, -trim.y / trim.height), this.mapCoord.append(tempMat));
    const texBase = tex.baseTexture, frame = this.uClampFrame, margin = this.clampMargin / texBase.resolution, offset = this.clampOffset;
    return frame[0] = (tex._frame.x + margin + offset) / texBase.width, frame[1] = (tex._frame.y + margin + offset) / texBase.height, frame[2] = (tex._frame.x + tex._frame.width - margin + offset) / texBase.width, frame[3] = (tex._frame.y + tex._frame.height - margin + offset) / texBase.height, this.uClampOffset[0] = offset / texBase.realWidth, this.uClampOffset[1] = offset / texBase.realHeight, this.isSimple = tex._frame.width === texBase.width && tex._frame.height === texBase.height && tex.rotate === 0, true;
  }
}

// node_modules/@pixi/core/lib/filters/spriteMask/spriteMaskFilter.frag.mjs
var fragment = `varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D mask;
uniform float alpha;
uniform float npmAlpha;
uniform vec4 maskClamp;

void main(void)
{
    float clip = step(3.5,
        step(maskClamp.x, vMaskCoord.x) +
        step(maskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, maskClamp.z) +
        step(vMaskCoord.y, maskClamp.w));

    vec4 original = texture2D(uSampler, vTextureCoord);
    vec4 masky = texture2D(mask, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    original *= (alphaMul * masky.r * alpha * clip);

    gl_FragColor = original;
}
`;

// node_modules/@pixi/core/lib/filters/spriteMask/spriteMaskFilter.vert.mjs
var vertex = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 otherMatrix;

varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;
}
`;

// node_modules/@pixi/core/lib/filters/spriteMask/SpriteMaskFilter.mjs
class SpriteMaskFilter extends Filter {
  constructor(vertexSrc, fragmentSrc, uniforms) {
    let sprite = null;
    typeof vertexSrc != "string" && fragmentSrc === undefined && uniforms === undefined && (sprite = vertexSrc, vertexSrc = undefined, fragmentSrc = undefined, uniforms = undefined), super(vertexSrc || vertex, fragmentSrc || fragment, uniforms), this.maskSprite = sprite, this.maskMatrix = new Matrix;
  }
  get maskSprite() {
    return this._maskSprite;
  }
  set maskSprite(value) {
    this._maskSprite = value, this._maskSprite && (this._maskSprite.renderable = false);
  }
  apply(filterManager, input, output, clearMode) {
    const maskSprite = this._maskSprite, tex = maskSprite._texture;
    tex.valid && (tex.uvMatrix || (tex.uvMatrix = new TextureMatrix(tex, 0)), tex.uvMatrix.update(), this.uniforms.npmAlpha = tex.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = tex, this.uniforms.otherMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, maskSprite).prepend(tex.uvMatrix.mapCoord), this.uniforms.alpha = maskSprite.worldAlpha, this.uniforms.maskClamp = tex.uvMatrix.uClampFrame, filterManager.applyFilter(this, input, output, clearMode));
  }
}

// node_modules/@pixi/core/lib/mask/MaskData.mjs
class MaskData {
  constructor(maskObject = null) {
    this.type = MASK_TYPES.NONE, this.autoDetect = true, this.maskObject = maskObject || null, this.pooled = false, this.isMaskData = true, this.resolution = null, this.multisample = Filter.defaultMultisample, this.enabled = true, this.colorMask = 15, this._filters = null, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._scissorRectLocal = null, this._colorMask = 15, this._target = null;
  }
  get filter() {
    return this._filters ? this._filters[0] : null;
  }
  set filter(value) {
    value ? this._filters ? this._filters[0] = value : this._filters = [value] : this._filters = null;
  }
  reset() {
    this.pooled && (this.maskObject = null, this.type = MASK_TYPES.NONE, this.autoDetect = true), this._target = null, this._scissorRectLocal = null;
  }
  copyCountersOrReset(maskAbove) {
    maskAbove ? (this._stencilCounter = maskAbove._stencilCounter, this._scissorCounter = maskAbove._scissorCounter, this._scissorRect = maskAbove._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null);
  }
}

// node_modules/@pixi/core/lib/mask/MaskSystem.mjs
class MaskSystem {
  constructor(renderer) {
    this.renderer = renderer, this.enableScissor = true, this.alphaMaskPool = [], this.maskDataPool = [], this.maskStack = [], this.alphaMaskIndex = 0;
  }
  setMaskStack(maskStack) {
    this.maskStack = maskStack, this.renderer.scissor.setMaskStack(maskStack), this.renderer.stencil.setMaskStack(maskStack);
  }
  push(target, maskDataOrTarget) {
    let maskData = maskDataOrTarget;
    if (!maskData.isMaskData) {
      const d2 = this.maskDataPool.pop() || new MaskData;
      d2.pooled = true, d2.maskObject = maskDataOrTarget, maskData = d2;
    }
    const maskAbove = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
    if (maskData.copyCountersOrReset(maskAbove), maskData._colorMask = maskAbove ? maskAbove._colorMask : 15, maskData.autoDetect && this.detect(maskData), maskData._target = target, maskData.type !== MASK_TYPES.SPRITE && this.maskStack.push(maskData), maskData.enabled)
      switch (maskData.type) {
        case MASK_TYPES.SCISSOR:
          this.renderer.scissor.push(maskData);
          break;
        case MASK_TYPES.STENCIL:
          this.renderer.stencil.push(maskData);
          break;
        case MASK_TYPES.SPRITE:
          maskData.copyCountersOrReset(null), this.pushSpriteMask(maskData);
          break;
        case MASK_TYPES.COLOR:
          this.pushColorMask(maskData);
          break;
        default:
          break;
      }
    maskData.type === MASK_TYPES.SPRITE && this.maskStack.push(maskData);
  }
  pop(target) {
    const maskData = this.maskStack.pop();
    if (!(!maskData || maskData._target !== target)) {
      if (maskData.enabled)
        switch (maskData.type) {
          case MASK_TYPES.SCISSOR:
            this.renderer.scissor.pop(maskData);
            break;
          case MASK_TYPES.STENCIL:
            this.renderer.stencil.pop(maskData.maskObject);
            break;
          case MASK_TYPES.SPRITE:
            this.popSpriteMask(maskData);
            break;
          case MASK_TYPES.COLOR:
            this.popColorMask(maskData);
            break;
          default:
            break;
        }
      if (maskData.reset(), maskData.pooled && this.maskDataPool.push(maskData), this.maskStack.length !== 0) {
        const maskCurrent = this.maskStack[this.maskStack.length - 1];
        maskCurrent.type === MASK_TYPES.SPRITE && maskCurrent._filters && (maskCurrent._filters[0].maskSprite = maskCurrent.maskObject);
      }
    }
  }
  detect(maskData) {
    const maskObject = maskData.maskObject;
    maskObject ? maskObject.isSprite ? maskData.type = MASK_TYPES.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(maskData) ? maskData.type = MASK_TYPES.SCISSOR : maskData.type = MASK_TYPES.STENCIL : maskData.type = MASK_TYPES.COLOR;
  }
  pushSpriteMask(maskData) {
    const { maskObject } = maskData, target = maskData._target;
    let alphaMaskFilter = maskData._filters;
    alphaMaskFilter || (alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex], alphaMaskFilter || (alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex] = [new SpriteMaskFilter])), alphaMaskFilter[0].resolution = maskData.resolution, alphaMaskFilter[0].multisample = maskData.multisample, alphaMaskFilter[0].maskSprite = maskObject;
    const stashFilterArea = target.filterArea;
    target.filterArea = maskObject.getBounds(true), this.renderer.filter.push(target, alphaMaskFilter), target.filterArea = stashFilterArea, maskData._filters || this.alphaMaskIndex++;
  }
  popSpriteMask(maskData) {
    this.renderer.filter.pop(), maskData._filters ? maskData._filters[0].maskSprite = null : (this.alphaMaskIndex--, this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null);
  }
  pushColorMask(maskData) {
    const currColorMask = maskData._colorMask, nextColorMask = maskData._colorMask = currColorMask & maskData.colorMask;
    nextColorMask !== currColorMask && this.renderer.gl.colorMask((nextColorMask & 1) !== 0, (nextColorMask & 2) !== 0, (nextColorMask & 4) !== 0, (nextColorMask & 8) !== 0);
  }
  popColorMask(maskData) {
    const currColorMask = maskData._colorMask, nextColorMask = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
    nextColorMask !== currColorMask && this.renderer.gl.colorMask((nextColorMask & 1) !== 0, (nextColorMask & 2) !== 0, (nextColorMask & 4) !== 0, (nextColorMask & 8) !== 0);
  }
  destroy() {
    this.renderer = null;
  }
}
MaskSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "mask"
};
extensions.add(MaskSystem);

// node_modules/@pixi/core/lib/mask/AbstractMaskSystem.mjs
class AbstractMaskSystem {
  constructor(renderer) {
    this.renderer = renderer, this.maskStack = [], this.glConst = 0;
  }
  getStackLength() {
    return this.maskStack.length;
  }
  setMaskStack(maskStack) {
    const { gl } = this.renderer, curStackLen = this.getStackLength();
    this.maskStack = maskStack;
    const newStackLen = this.getStackLength();
    newStackLen !== curStackLen && (newStackLen === 0 ? gl.disable(this.glConst) : (gl.enable(this.glConst), this._useCurrent()));
  }
  _useCurrent() {
  }
  destroy() {
    this.renderer = null, this.maskStack = null;
  }
}

// node_modules/@pixi/core/lib/mask/ScissorSystem.mjs
var tempMatrix2 = new Matrix;
var rectPool = [];
var _ScissorSystem = class _ScissorSystem2 extends AbstractMaskSystem {
  constructor(renderer) {
    super(renderer), this.glConst = settings.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST;
  }
  getStackLength() {
    const maskData = this.maskStack[this.maskStack.length - 1];
    return maskData ? maskData._scissorCounter : 0;
  }
  calcScissorRect(maskData) {
    if (maskData._scissorRectLocal)
      return;
    const prevData = maskData._scissorRect, { maskObject } = maskData, { renderer } = this, renderTextureSystem = renderer.renderTexture, rect = maskObject.getBounds(true, rectPool.pop() ?? new Rectangle);
    this.roundFrameToPixels(rect, renderTextureSystem.current ? renderTextureSystem.current.resolution : renderer.resolution, renderTextureSystem.sourceFrame, renderTextureSystem.destinationFrame, renderer.projection.transform), prevData && rect.fit(prevData), maskData._scissorRectLocal = rect;
  }
  static isMatrixRotated(matrix) {
    if (!matrix)
      return false;
    const { a: a2, b: b2, c: c2, d: d2 } = matrix;
    return (Math.abs(b2) > 0.0001 || Math.abs(c2) > 0.0001) && (Math.abs(a2) > 0.0001 || Math.abs(d2) > 0.0001);
  }
  testScissor(maskData) {
    const { maskObject } = maskData;
    if (!maskObject.isFastRect || !maskObject.isFastRect() || _ScissorSystem2.isMatrixRotated(maskObject.worldTransform) || _ScissorSystem2.isMatrixRotated(this.renderer.projection.transform))
      return false;
    this.calcScissorRect(maskData);
    const rect = maskData._scissorRectLocal;
    return rect.width > 0 && rect.height > 0;
  }
  roundFrameToPixels(frame, resolution, bindingSourceFrame, bindingDestinationFrame, transform) {
    _ScissorSystem2.isMatrixRotated(transform) || (transform = transform ? tempMatrix2.copyFrom(transform) : tempMatrix2.identity(), transform.translate(-bindingSourceFrame.x, -bindingSourceFrame.y).scale(bindingDestinationFrame.width / bindingSourceFrame.width, bindingDestinationFrame.height / bindingSourceFrame.height).translate(bindingDestinationFrame.x, bindingDestinationFrame.y), this.renderer.filter.transformAABB(transform, frame), frame.fit(bindingDestinationFrame), frame.x = Math.round(frame.x * resolution), frame.y = Math.round(frame.y * resolution), frame.width = Math.round(frame.width * resolution), frame.height = Math.round(frame.height * resolution));
  }
  push(maskData) {
    maskData._scissorRectLocal || this.calcScissorRect(maskData);
    const { gl } = this.renderer;
    maskData._scissorRect || gl.enable(gl.SCISSOR_TEST), maskData._scissorCounter++, maskData._scissorRect = maskData._scissorRectLocal, this._useCurrent();
  }
  pop(maskData) {
    const { gl } = this.renderer;
    maskData && rectPool.push(maskData._scissorRectLocal), this.getStackLength() > 0 ? this._useCurrent() : gl.disable(gl.SCISSOR_TEST);
  }
  _useCurrent() {
    const rect = this.maskStack[this.maskStack.length - 1]._scissorRect;
    let y2;
    this.renderer.renderTexture.current ? y2 = rect.y : y2 = this.renderer.height - rect.height - rect.y, this.renderer.gl.scissor(rect.x, y2, rect.width, rect.height);
  }
};
_ScissorSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "scissor"
};
var ScissorSystem = _ScissorSystem;
extensions.add(ScissorSystem);

// node_modules/@pixi/core/lib/mask/StencilSystem.mjs
class StencilSystem extends AbstractMaskSystem {
  constructor(renderer) {
    super(renderer), this.glConst = settings.ADAPTER.getWebGLRenderingContext().STENCIL_TEST;
  }
  getStackLength() {
    const maskData = this.maskStack[this.maskStack.length - 1];
    return maskData ? maskData._stencilCounter : 0;
  }
  push(maskData) {
    const maskObject = maskData.maskObject, { gl } = this.renderer, prevMaskCount = maskData._stencilCounter;
    prevMaskCount === 0 && (this.renderer.framebuffer.forceStencil(), gl.clearStencil(0), gl.clear(gl.STENCIL_BUFFER_BIT), gl.enable(gl.STENCIL_TEST)), maskData._stencilCounter++;
    const colorMask = maskData._colorMask;
    colorMask !== 0 && (maskData._colorMask = 0, gl.colorMask(false, false, false, false)), gl.stencilFunc(gl.EQUAL, prevMaskCount, 4294967295), gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR), maskObject.renderable = true, maskObject.render(this.renderer), this.renderer.batch.flush(), maskObject.renderable = false, colorMask !== 0 && (maskData._colorMask = colorMask, gl.colorMask((colorMask & 1) !== 0, (colorMask & 2) !== 0, (colorMask & 4) !== 0, (colorMask & 8) !== 0)), this._useCurrent();
  }
  pop(maskObject) {
    const gl = this.renderer.gl;
    if (this.getStackLength() === 0)
      gl.disable(gl.STENCIL_TEST);
    else {
      const maskData = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null, colorMask = maskData ? maskData._colorMask : 15;
      colorMask !== 0 && (maskData._colorMask = 0, gl.colorMask(false, false, false, false)), gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR), maskObject.renderable = true, maskObject.render(this.renderer), this.renderer.batch.flush(), maskObject.renderable = false, colorMask !== 0 && (maskData._colorMask = colorMask, gl.colorMask((colorMask & 1) !== 0, (colorMask & 2) !== 0, (colorMask & 4) !== 0, (colorMask & 8) !== 0)), this._useCurrent();
    }
  }
  _useCurrent() {
    const gl = this.renderer.gl;
    gl.stencilFunc(gl.EQUAL, this.getStackLength(), 4294967295), gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
  }
}
StencilSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "stencil"
};
extensions.add(StencilSystem);

// node_modules/@pixi/core/lib/plugin/PluginSystem.mjs
class PluginSystem {
  constructor(renderer) {
    this.renderer = renderer, this.plugins = {}, Object.defineProperties(this.plugins, {
      extract: {
        enumerable: false,
        get() {
          return deprecation("7.0.0", "renderer.plugins.extract has moved to renderer.extract"), renderer.extract;
        }
      },
      prepare: {
        enumerable: false,
        get() {
          return deprecation("7.0.0", "renderer.plugins.prepare has moved to renderer.prepare"), renderer.prepare;
        }
      },
      interaction: {
        enumerable: false,
        get() {
          return deprecation("7.0.0", "renderer.plugins.interaction has been deprecated, use renderer.events"), renderer.events;
        }
      }
    });
  }
  init() {
    const staticMap = this.rendererPlugins;
    for (const o2 in staticMap)
      this.plugins[o2] = new staticMap[o2](this.renderer);
  }
  destroy() {
    for (const o2 in this.plugins)
      this.plugins[o2].destroy(), this.plugins[o2] = null;
  }
}
PluginSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "_plugin"
};
extensions.add(PluginSystem);

// node_modules/@pixi/core/lib/projection/ProjectionSystem.mjs
class ProjectionSystem {
  constructor(renderer) {
    this.renderer = renderer, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new Matrix, this.transform = null;
  }
  update(destinationFrame, sourceFrame, resolution, root) {
    this.destinationFrame = destinationFrame || this.destinationFrame || this.defaultFrame, this.sourceFrame = sourceFrame || this.sourceFrame || destinationFrame, this.calculateProjection(this.destinationFrame, this.sourceFrame, resolution, root), this.transform && this.projectionMatrix.append(this.transform);
    const renderer = this.renderer;
    renderer.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, renderer.globalUniforms.update(), renderer.shader.shader && renderer.shader.syncUniformGroup(renderer.shader.shader.uniforms.globals);
  }
  calculateProjection(_destinationFrame, sourceFrame, _resolution, root) {
    const pm = this.projectionMatrix, sign3 = root ? -1 : 1;
    pm.identity(), pm.a = 1 / sourceFrame.width * 2, pm.d = sign3 * (1 / sourceFrame.height * 2), pm.tx = -1 - sourceFrame.x * pm.a, pm.ty = -sign3 - sourceFrame.y * pm.d;
  }
  setTransform(_matrix) {
  }
  destroy() {
    this.renderer = null;
  }
}
ProjectionSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "projection"
};
extensions.add(ProjectionSystem);

// node_modules/@pixi/core/lib/renderTexture/GenerateTextureSystem.mjs
var tempTransform = new Transform;
var tempRect = new Rectangle;

class GenerateTextureSystem {
  constructor(renderer) {
    this.renderer = renderer, this._tempMatrix = new Matrix;
  }
  generateTexture(displayObject, options) {
    const { region: manualRegion, ...textureOptions } = options || {}, region = manualRegion?.copyTo(tempRect) || displayObject.getLocalBounds(tempRect, true), resolution = textureOptions.resolution || this.renderer.resolution;
    region.width = Math.max(region.width, 1 / resolution), region.height = Math.max(region.height, 1 / resolution), textureOptions.width = region.width, textureOptions.height = region.height, textureOptions.resolution = resolution, textureOptions.multisample ?? (textureOptions.multisample = this.renderer.multisample);
    const renderTexture = RenderTexture.create(textureOptions);
    this._tempMatrix.tx = -region.x, this._tempMatrix.ty = -region.y;
    const transform = displayObject.transform;
    return displayObject.transform = tempTransform, this.renderer.render(displayObject, {
      renderTexture,
      transform: this._tempMatrix,
      skipUpdateTransform: !!displayObject.parent,
      blit: true
    }), displayObject.transform = transform, renderTexture;
  }
  destroy() {
  }
}
GenerateTextureSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "textureGenerator"
};
extensions.add(GenerateTextureSystem);

// node_modules/@pixi/core/lib/renderTexture/RenderTextureSystem.mjs
var tempRect2 = new Rectangle;
var tempRect22 = new Rectangle;

class RenderTextureSystem {
  constructor(renderer) {
    this.renderer = renderer, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new Rectangle, this.destinationFrame = new Rectangle, this.viewportFrame = new Rectangle;
  }
  contextChange() {
    const attributes = this.renderer?.gl.getContextAttributes();
    this._rendererPremultipliedAlpha = !!(attributes && attributes.alpha && attributes.premultipliedAlpha);
  }
  bind(renderTexture = null, sourceFrame, destinationFrame) {
    const renderer = this.renderer;
    this.current = renderTexture;
    let baseTexture, framebuffer, resolution;
    renderTexture ? (baseTexture = renderTexture.baseTexture, resolution = baseTexture.resolution, sourceFrame || (tempRect2.width = renderTexture.frame.width, tempRect2.height = renderTexture.frame.height, sourceFrame = tempRect2), destinationFrame || (tempRect22.x = renderTexture.frame.x, tempRect22.y = renderTexture.frame.y, tempRect22.width = sourceFrame.width, tempRect22.height = sourceFrame.height, destinationFrame = tempRect22), framebuffer = baseTexture.framebuffer) : (resolution = renderer.resolution, sourceFrame || (tempRect2.width = renderer._view.screen.width, tempRect2.height = renderer._view.screen.height, sourceFrame = tempRect2), destinationFrame || (destinationFrame = tempRect2, destinationFrame.width = sourceFrame.width, destinationFrame.height = sourceFrame.height));
    const viewportFrame = this.viewportFrame;
    viewportFrame.x = destinationFrame.x * resolution, viewportFrame.y = destinationFrame.y * resolution, viewportFrame.width = destinationFrame.width * resolution, viewportFrame.height = destinationFrame.height * resolution, renderTexture || (viewportFrame.y = renderer.view.height - (viewportFrame.y + viewportFrame.height)), viewportFrame.ceil(), this.renderer.framebuffer.bind(framebuffer, viewportFrame), this.renderer.projection.update(destinationFrame, sourceFrame, resolution, !framebuffer), renderTexture ? this.renderer.mask.setMaskStack(baseTexture.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(sourceFrame), this.destinationFrame.copyFrom(destinationFrame);
  }
  clear(clearColor, mask) {
    const fallbackColor = this.current ? this.current.baseTexture.clear : this.renderer.background.backgroundColor, color7 = Color.shared.setValue(clearColor || fallbackColor);
    (this.current && this.current.baseTexture.alphaMode > 0 || !this.current && this._rendererPremultipliedAlpha) && color7.premultiply(color7.alpha);
    const destinationFrame = this.destinationFrame, baseFrame = this.current ? this.current.baseTexture : this.renderer._view.screen, clearMask = destinationFrame.width !== baseFrame.width || destinationFrame.height !== baseFrame.height;
    if (clearMask) {
      let { x: x2, y: y2, width, height } = this.viewportFrame;
      x2 = Math.round(x2), y2 = Math.round(y2), width = Math.round(width), height = Math.round(height), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(x2, y2, width, height);
    }
    this.renderer.framebuffer.clear(color7.red, color7.green, color7.blue, color7.alpha, mask), clearMask && this.renderer.scissor.pop();
  }
  resize() {
    this.bind(null);
  }
  reset() {
    this.bind(null);
  }
  destroy() {
    this.renderer = null;
  }
}
RenderTextureSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "renderTexture"
};
extensions.add(RenderTextureSystem);

// node_modules/@pixi/core/lib/shader/GLProgram.mjs
class GLProgram {
  constructor(program, uniformData) {
    this.program = program, this.uniformData = uniformData, this.uniformGroups = {}, this.uniformDirtyGroups = {}, this.uniformBufferBindings = {};
  }
  destroy() {
    this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBufferBindings = null, this.program = null;
  }
}

// node_modules/@pixi/core/lib/shader/utils/getAttributeData.mjs
var getAttributeData = function(program, gl) {
  const attributes = {}, totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (let i2 = 0;i2 < totalAttributes; i2++) {
    const attribData = gl.getActiveAttrib(program, i2);
    if (attribData.name.startsWith("gl_"))
      continue;
    const type = mapType(gl, attribData.type), data = {
      type,
      name: attribData.name,
      size: mapSize(type),
      location: gl.getAttribLocation(program, attribData.name)
    };
    attributes[attribData.name] = data;
  }
  return attributes;
};

// node_modules/@pixi/core/lib/shader/utils/getUniformData.mjs
var getUniformData = function(program, gl) {
  const uniforms = {}, totalUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i2 = 0;i2 < totalUniforms; i2++) {
    const uniformData = gl.getActiveUniform(program, i2), name = uniformData.name.replace(/\[.*?\]$/, ""), isArray = !!uniformData.name.match(/\[.*?\]$/), type = mapType(gl, uniformData.type);
    uniforms[name] = {
      name,
      index: i2,
      type,
      size: uniformData.size,
      isArray,
      value: defaultValue(type, uniformData.size)
    };
  }
  return uniforms;
};

// node_modules/@pixi/core/lib/shader/utils/generateProgram.mjs
var generateProgram = function(gl, program) {
  const glVertShader = compileShader(gl, gl.VERTEX_SHADER, program.vertexSrc), glFragShader = compileShader(gl, gl.FRAGMENT_SHADER, program.fragmentSrc), webGLProgram = gl.createProgram();
  gl.attachShader(webGLProgram, glVertShader), gl.attachShader(webGLProgram, glFragShader);
  const transformFeedbackVaryings = program.extra?.transformFeedbackVaryings;
  if (transformFeedbackVaryings && (typeof gl.transformFeedbackVaryings != "function" ? console.warn("TransformFeedback is not supported but TransformFeedbackVaryings are given.") : gl.transformFeedbackVaryings(webGLProgram, transformFeedbackVaryings.names, transformFeedbackVaryings.bufferMode === "separate" ? gl.SEPARATE_ATTRIBS : gl.INTERLEAVED_ATTRIBS)), gl.linkProgram(webGLProgram), gl.getProgramParameter(webGLProgram, gl.LINK_STATUS) || logProgramError(gl, webGLProgram, glVertShader, glFragShader), program.attributeData = getAttributeData(webGLProgram, gl), program.uniformData = getUniformData(webGLProgram, gl), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(program.vertexSrc)) {
    const keys = Object.keys(program.attributeData);
    keys.sort((a2, b2) => a2 > b2 ? 1 : -1);
    for (let i2 = 0;i2 < keys.length; i2++)
      program.attributeData[keys[i2]].location = i2, gl.bindAttribLocation(webGLProgram, i2, keys[i2]);
    gl.linkProgram(webGLProgram);
  }
  gl.deleteShader(glVertShader), gl.deleteShader(glFragShader);
  const uniformData = {};
  for (const i2 in program.uniformData) {
    const data = program.uniformData[i2];
    uniformData[i2] = {
      location: gl.getUniformLocation(webGLProgram, i2),
      value: defaultValue(data.type, data.size)
    };
  }
  return new GLProgram(webGLProgram, uniformData);
};

// node_modules/@pixi/core/lib/shader/utils/generateUniformBufferSync.mjs
var uboUpdate = function(_ud, _uv, _renderer, _syncData, buffer) {
  _renderer.buffer.update(buffer);
};
var createUBOElements = function(uniformData) {
  const uboElements = uniformData.map((data) => ({
    data,
    offset: 0,
    dataLen: 0,
    dirty: 0
  }));
  let size = 0, chunkSize = 0, offset = 0;
  for (let i2 = 0;i2 < uboElements.length; i2++) {
    const uboElement = uboElements[i2];
    if (size = GLSL_TO_STD40_SIZE[uboElement.data.type], uboElement.data.size > 1 && (size = Math.max(size, 16) * uboElement.data.size), uboElement.dataLen = size, chunkSize % size !== 0 && chunkSize < 16) {
      const lineUpValue = chunkSize % size % 16;
      chunkSize += lineUpValue, offset += lineUpValue;
    }
    chunkSize + size > 16 ? (offset = Math.ceil(offset / 16) * 16, uboElement.offset = offset, offset += size, chunkSize = size) : (uboElement.offset = offset, chunkSize += size, offset += size);
  }
  return offset = Math.ceil(offset / 16) * 16, { uboElements, size: offset };
};
var getUBOData = function(uniforms, uniformData) {
  const usedUniformDatas = [];
  for (const i2 in uniforms)
    uniformData[i2] && usedUniformDatas.push(uniformData[i2]);
  return usedUniformDatas.sort((a2, b2) => a2.index - b2.index), usedUniformDatas;
};
var generateUniformBufferSync = function(group, uniformData) {
  if (!group.autoManage)
    return { size: 0, syncFunc: uboUpdate };
  const usedUniformDatas = getUBOData(group.uniforms, uniformData), { uboElements, size } = createUBOElements(usedUniformDatas), funcFragments = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `];
  for (let i2 = 0;i2 < uboElements.length; i2++) {
    const uboElement = uboElements[i2], uniform = group.uniforms[uboElement.data.name], name = uboElement.data.name;
    let parsed = false;
    for (let j2 = 0;j2 < uniformParsers.length; j2++) {
      const uniformParser = uniformParsers[j2];
      if (uniformParser.codeUbo && uniformParser.test(uboElement.data, uniform)) {
        funcFragments.push(`offset = ${uboElement.offset / 4};`, uniformParsers[j2].codeUbo(uboElement.data.name, uniform)), parsed = true;
        break;
      }
    }
    if (!parsed)
      if (uboElement.data.size > 1) {
        const size2 = mapSize(uboElement.data.type), rowSize = Math.max(GLSL_TO_STD40_SIZE[uboElement.data.type] / 16, 1), elementSize = size2 / rowSize, remainder = (4 - elementSize % 4) % 4;
        funcFragments.push(`
                cv = ud.${name}.value;
                v = uv.${name};
                offset = ${uboElement.offset / 4};

                t = 0;

                for(var i=0; i < ${uboElement.data.size * rowSize}; i++)
                {
                    for(var j = 0; j < ${elementSize}; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ${remainder};
                }

                `);
      } else {
        const template = UBO_TO_SINGLE_SETTERS[uboElement.data.type];
        funcFragments.push(`
                cv = ud.${name}.value;
                v = uv.${name};
                offset = ${uboElement.offset / 4};
                ${template};
                `);
      }
  }
  return funcFragments.push(`
       renderer.buffer.update(buffer);
    `), {
    size,
    syncFunc: new Function("ud", "uv", "renderer", "syncData", "buffer", funcFragments.join(`
`))
  };
};
var UBO_TO_SINGLE_SETTERS = {
  float: `
        data[offset] = v;
    `,
  vec2: `
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,
  vec3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,
  vec4: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,
  mat2: `
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,
  mat3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,
  mat4: `
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `
};
var GLSL_TO_STD40_SIZE = {
  float: 4,
  vec2: 8,
  vec3: 12,
  vec4: 16,
  int: 4,
  ivec2: 8,
  ivec3: 12,
  ivec4: 16,
  uint: 4,
  uvec2: 8,
  uvec3: 12,
  uvec4: 16,
  bool: 4,
  bvec2: 8,
  bvec3: 12,
  bvec4: 16,
  mat2: 16 * 2,
  mat3: 16 * 3,
  mat4: 16 * 4
};

// node_modules/@pixi/core/lib/shader/ShaderSystem.mjs
var UID5 = 0;
var defaultSyncData = { textureCount: 0, uboCount: 0 };

class ShaderSystem {
  constructor(renderer) {
    this.destroyed = false, this.renderer = renderer, this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {}, this._uboCache = {}, this.id = UID5++;
  }
  systemCheck() {
    if (!unsafeEvalSupported())
      throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
  }
  contextChange(gl) {
    this.gl = gl, this.reset();
  }
  bind(shader, dontSync) {
    shader.disposeRunner.add(this), shader.uniforms.globals = this.renderer.globalUniforms;
    const program = shader.program, glProgram = program.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(shader);
    return this.shader = shader, this.program !== program && (this.program = program, this.gl.useProgram(glProgram.program)), dontSync || (defaultSyncData.textureCount = 0, defaultSyncData.uboCount = 0, this.syncUniformGroup(shader.uniformGroup, defaultSyncData)), glProgram;
  }
  setUniforms(uniforms) {
    const shader = this.shader.program, glProgram = shader.glPrograms[this.renderer.CONTEXT_UID];
    shader.syncUniforms(glProgram.uniformData, uniforms, this.renderer);
  }
  syncUniformGroup(group, syncData) {
    const glProgram = this.getGlProgram();
    (!group.static || group.dirtyId !== glProgram.uniformDirtyGroups[group.id]) && (glProgram.uniformDirtyGroups[group.id] = group.dirtyId, this.syncUniforms(group, glProgram, syncData));
  }
  syncUniforms(group, glProgram, syncData) {
    (group.syncUniforms[this.shader.program.id] || this.createSyncGroups(group))(glProgram.uniformData, group.uniforms, this.renderer, syncData);
  }
  createSyncGroups(group) {
    const id = this.getSignature(group, this.shader.program.uniformData, "u");
    return this.cache[id] || (this.cache[id] = generateUniformsSync(group, this.shader.program.uniformData)), group.syncUniforms[this.shader.program.id] = this.cache[id], group.syncUniforms[this.shader.program.id];
  }
  syncUniformBufferGroup(group, name) {
    const glProgram = this.getGlProgram();
    if (!group.static || group.dirtyId !== 0 || !glProgram.uniformGroups[group.id]) {
      group.dirtyId = 0;
      const syncFunc = glProgram.uniformGroups[group.id] || this.createSyncBufferGroup(group, glProgram, name);
      group.buffer.update(), syncFunc(glProgram.uniformData, group.uniforms, this.renderer, defaultSyncData, group.buffer);
    }
    this.renderer.buffer.bindBufferBase(group.buffer, glProgram.uniformBufferBindings[name]);
  }
  createSyncBufferGroup(group, glProgram, name) {
    const { gl } = this.renderer;
    this.renderer.buffer.bind(group.buffer);
    const uniformBlockIndex = this.gl.getUniformBlockIndex(glProgram.program, name);
    glProgram.uniformBufferBindings[name] = this.shader.uniformBindCount, gl.uniformBlockBinding(glProgram.program, uniformBlockIndex, this.shader.uniformBindCount), this.shader.uniformBindCount++;
    const id = this.getSignature(group, this.shader.program.uniformData, "ubo");
    let uboData = this._uboCache[id];
    if (uboData || (uboData = this._uboCache[id] = generateUniformBufferSync(group, this.shader.program.uniformData)), group.autoManage) {
      const data = new Float32Array(uboData.size / 4);
      group.buffer.update(data);
    }
    return glProgram.uniformGroups[group.id] = uboData.syncFunc, glProgram.uniformGroups[group.id];
  }
  getSignature(group, uniformData, preFix) {
    const uniforms = group.uniforms, strings = [`${preFix}-`];
    for (const i2 in uniforms)
      strings.push(i2), uniformData[i2] && strings.push(uniformData[i2].type);
    return strings.join("-");
  }
  getGlProgram() {
    return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null;
  }
  generateProgram(shader) {
    const gl = this.gl, program = shader.program, glProgram = generateProgram(gl, program);
    return program.glPrograms[this.renderer.CONTEXT_UID] = glProgram, glProgram;
  }
  reset() {
    this.program = null, this.shader = null;
  }
  disposeShader(shader) {
    this.shader === shader && (this.shader = null);
  }
  destroy() {
    this.renderer = null, this.destroyed = true;
  }
}
ShaderSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "shader"
};
extensions.add(ShaderSystem);

// node_modules/@pixi/core/lib/startup/StartupSystem.mjs
class StartupSystem {
  constructor(renderer) {
    this.renderer = renderer;
  }
  run(options) {
    const { renderer } = this;
    renderer.runners.init.emit(renderer.options), options.hello && console.log(`PixiJS 7.3.1 - ${renderer.rendererLogId} - https://pixijs.com`), renderer.resize(renderer.screen.width, renderer.screen.height);
  }
  destroy() {
  }
}
StartupSystem.defaultOptions = {
  hello: false
}, StartupSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "startup"
};
extensions.add(StartupSystem);

// node_modules/@pixi/core/lib/state/utils/mapWebGLBlendModesToPixi.mjs
var mapWebGLBlendModesToPixi = function(gl, array = []) {
  return array[BLEND_MODES.NORMAL] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.ADD] = [gl.ONE, gl.ONE], array[BLEND_MODES.MULTIPLY] = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.SCREEN] = [gl.ONE, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.OVERLAY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.DARKEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.LIGHTEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.COLOR_DODGE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.COLOR_BURN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.HARD_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.SOFT_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.DIFFERENCE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.EXCLUSION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.HUE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.SATURATION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.COLOR] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.LUMINOSITY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.NONE] = [0, 0], array[BLEND_MODES.NORMAL_NPM] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.ADD_NPM] = [gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE], array[BLEND_MODES.SCREEN_NPM] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.SRC_IN] = [gl.DST_ALPHA, gl.ZERO], array[BLEND_MODES.SRC_OUT] = [gl.ONE_MINUS_DST_ALPHA, gl.ZERO], array[BLEND_MODES.SRC_ATOP] = [gl.DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.DST_OVER] = [gl.ONE_MINUS_DST_ALPHA, gl.ONE], array[BLEND_MODES.DST_IN] = [gl.ZERO, gl.SRC_ALPHA], array[BLEND_MODES.DST_OUT] = [gl.ZERO, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.DST_ATOP] = [gl.ONE_MINUS_DST_ALPHA, gl.SRC_ALPHA], array[BLEND_MODES.XOR] = [gl.ONE_MINUS_DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA], array[BLEND_MODES.SUBTRACT] = [gl.ONE, gl.ONE, gl.ONE, gl.ONE, gl.FUNC_REVERSE_SUBTRACT, gl.FUNC_ADD], array;
};

// node_modules/@pixi/core/lib/state/StateSystem.mjs
var BLEND2 = 0;
var OFFSET2 = 1;
var CULLING2 = 2;
var DEPTH_TEST2 = 3;
var WINDING2 = 4;
var DEPTH_MASK2 = 5;
var _StateSystem = class _StateSystem2 {
  constructor() {
    this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = BLEND_MODES.NONE, this._blendEq = false, this.map = [], this.map[BLEND2] = this.setBlend, this.map[OFFSET2] = this.setOffset, this.map[CULLING2] = this.setCullFace, this.map[DEPTH_TEST2] = this.setDepthTest, this.map[WINDING2] = this.setFrontFace, this.map[DEPTH_MASK2] = this.setDepthMask, this.checks = [], this.defaultState = new State, this.defaultState.blend = true;
  }
  contextChange(gl) {
    this.gl = gl, this.blendModes = mapWebGLBlendModesToPixi(gl), this.set(this.defaultState), this.reset();
  }
  set(state) {
    if (state = state || this.defaultState, this.stateId !== state.data) {
      let diff = this.stateId ^ state.data, i2 = 0;
      for (;diff; )
        diff & 1 && this.map[i2].call(this, !!(state.data & 1 << i2)), diff = diff >> 1, i2++;
      this.stateId = state.data;
    }
    for (let i2 = 0;i2 < this.checks.length; i2++)
      this.checks[i2](this, state);
  }
  forceState(state) {
    state = state || this.defaultState;
    for (let i2 = 0;i2 < this.map.length; i2++)
      this.map[i2].call(this, !!(state.data & 1 << i2));
    for (let i2 = 0;i2 < this.checks.length; i2++)
      this.checks[i2](this, state);
    this.stateId = state.data;
  }
  setBlend(value) {
    this.updateCheck(_StateSystem2.checkBlendMode, value), this.gl[value ? "enable" : "disable"](this.gl.BLEND);
  }
  setOffset(value) {
    this.updateCheck(_StateSystem2.checkPolygonOffset, value), this.gl[value ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
  }
  setDepthTest(value) {
    this.gl[value ? "enable" : "disable"](this.gl.DEPTH_TEST);
  }
  setDepthMask(value) {
    this.gl.depthMask(value);
  }
  setCullFace(value) {
    this.gl[value ? "enable" : "disable"](this.gl.CULL_FACE);
  }
  setFrontFace(value) {
    this.gl.frontFace(this.gl[value ? "CW" : "CCW"]);
  }
  setBlendMode(value) {
    if (value === this.blendMode)
      return;
    this.blendMode = value;
    const mode = this.blendModes[value], gl = this.gl;
    mode.length === 2 ? gl.blendFunc(mode[0], mode[1]) : gl.blendFuncSeparate(mode[0], mode[1], mode[2], mode[3]), mode.length === 6 ? (this._blendEq = true, gl.blendEquationSeparate(mode[4], mode[5])) : this._blendEq && (this._blendEq = false, gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD));
  }
  setPolygonOffset(value, scale) {
    this.gl.polygonOffset(value, scale);
  }
  reset() {
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false), this.forceState(this.defaultState), this._blendEq = true, this.blendMode = -1, this.setBlendMode(0);
  }
  updateCheck(func, value) {
    const index = this.checks.indexOf(func);
    value && index === -1 ? this.checks.push(func) : !value && index !== -1 && this.checks.splice(index, 1);
  }
  static checkBlendMode(system, state) {
    system.setBlendMode(state.blendMode);
  }
  static checkPolygonOffset(system, state) {
    system.setPolygonOffset(1, state.polygonOffset);
  }
  destroy() {
    this.gl = null;
  }
};
_StateSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "state"
};
var StateSystem = _StateSystem;
extensions.add(StateSystem);

// node_modules/@pixi/core/lib/system/SystemManager.mjs
class SystemManager extends import_eventemitter3.default {
  constructor() {
    super(...arguments), this.runners = {}, this._systemsHash = {};
  }
  setup(config) {
    this.addRunners(...config.runners);
    const priority = (config.priority ?? []).filter((key) => config.systems[key]), orderByPriority = [
      ...priority,
      ...Object.keys(config.systems).filter((key) => !priority.includes(key))
    ];
    for (const i2 of orderByPriority)
      this.addSystem(config.systems[i2], i2);
  }
  addRunners(...runnerIds) {
    runnerIds.forEach((runnerId) => {
      this.runners[runnerId] = new Runner(runnerId);
    });
  }
  addSystem(ClassRef, name) {
    const system = new ClassRef(this);
    if (this[name])
      throw new Error(`Whoops! The name "${name}" is already in use`);
    this[name] = system, this._systemsHash[name] = system;
    for (const i2 in this.runners)
      this.runners[i2].add(system);
    return this;
  }
  emitWithCustomOptions(runner7, options) {
    const systemHashKeys = Object.keys(this._systemsHash);
    runner7.items.forEach((system) => {
      const systemName = systemHashKeys.find((systemId) => this._systemsHash[systemId] === system);
      system[runner7.name](options[systemName]);
    });
  }
  destroy() {
    Object.values(this.runners).forEach((runner7) => {
      runner7.destroy();
    }), this._systemsHash = {};
  }
}

// node_modules/@pixi/core/lib/textures/TextureGCSystem.mjs
var _TextureGCSystem = class _TextureGCSystem2 {
  constructor(renderer) {
    this.renderer = renderer, this.count = 0, this.checkCount = 0, this.maxIdle = _TextureGCSystem2.defaultMaxIdle, this.checkCountMax = _TextureGCSystem2.defaultCheckCountMax, this.mode = _TextureGCSystem2.defaultMode;
  }
  postrender() {
    this.renderer.objectRenderer.renderingToScreen && (this.count++, this.mode !== GC_MODES.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())));
  }
  run() {
    const tm = this.renderer.texture, managedTextures = tm.managedTextures;
    let wasRemoved = false;
    for (let i2 = 0;i2 < managedTextures.length; i2++) {
      const texture = managedTextures[i2];
      texture.resource && this.count - texture.touched > this.maxIdle && (tm.destroyTexture(texture, true), managedTextures[i2] = null, wasRemoved = true);
    }
    if (wasRemoved) {
      let j2 = 0;
      for (let i2 = 0;i2 < managedTextures.length; i2++)
        managedTextures[i2] !== null && (managedTextures[j2++] = managedTextures[i2]);
      managedTextures.length = j2;
    }
  }
  unload(displayObject) {
    const tm = this.renderer.texture, texture = displayObject._texture;
    texture && !texture.framebuffer && tm.destroyTexture(texture);
    for (let i2 = displayObject.children.length - 1;i2 >= 0; i2--)
      this.unload(displayObject.children[i2]);
  }
  destroy() {
    this.renderer = null;
  }
};
_TextureGCSystem.defaultMode = GC_MODES.AUTO, _TextureGCSystem.defaultMaxIdle = 60 * 60, _TextureGCSystem.defaultCheckCountMax = 60 * 10, _TextureGCSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "textureGC"
};
var TextureGCSystem = _TextureGCSystem;
extensions.add(TextureGCSystem);

// node_modules/@pixi/core/lib/textures/GLTexture.mjs
class GLTexture {
  constructor(texture) {
    this.texture = texture, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = false, this.wrapMode = 33071, this.type = TYPES.UNSIGNED_BYTE, this.internalFormat = FORMATS.RGBA, this.samplerType = 0;
  }
}

// node_modules/@pixi/core/lib/textures/utils/mapInternalFormatToSamplerType.mjs
var mapInternalFormatToSamplerType = function(gl) {
  let table;
  return ("WebGL2RenderingContext" in globalThis) && gl instanceof globalThis.WebGL2RenderingContext ? table = {
    [gl.RGB]: SAMPLER_TYPES.FLOAT,
    [gl.RGBA]: SAMPLER_TYPES.FLOAT,
    [gl.ALPHA]: SAMPLER_TYPES.FLOAT,
    [gl.LUMINANCE]: SAMPLER_TYPES.FLOAT,
    [gl.LUMINANCE_ALPHA]: SAMPLER_TYPES.FLOAT,
    [gl.R8]: SAMPLER_TYPES.FLOAT,
    [gl.R8_SNORM]: SAMPLER_TYPES.FLOAT,
    [gl.RG8]: SAMPLER_TYPES.FLOAT,
    [gl.RG8_SNORM]: SAMPLER_TYPES.FLOAT,
    [gl.RGB8]: SAMPLER_TYPES.FLOAT,
    [gl.RGB8_SNORM]: SAMPLER_TYPES.FLOAT,
    [gl.RGB565]: SAMPLER_TYPES.FLOAT,
    [gl.RGBA4]: SAMPLER_TYPES.FLOAT,
    [gl.RGB5_A1]: SAMPLER_TYPES.FLOAT,
    [gl.RGBA8]: SAMPLER_TYPES.FLOAT,
    [gl.RGBA8_SNORM]: SAMPLER_TYPES.FLOAT,
    [gl.RGB10_A2]: SAMPLER_TYPES.FLOAT,
    [gl.RGB10_A2UI]: SAMPLER_TYPES.FLOAT,
    [gl.SRGB8]: SAMPLER_TYPES.FLOAT,
    [gl.SRGB8_ALPHA8]: SAMPLER_TYPES.FLOAT,
    [gl.R16F]: SAMPLER_TYPES.FLOAT,
    [gl.RG16F]: SAMPLER_TYPES.FLOAT,
    [gl.RGB16F]: SAMPLER_TYPES.FLOAT,
    [gl.RGBA16F]: SAMPLER_TYPES.FLOAT,
    [gl.R32F]: SAMPLER_TYPES.FLOAT,
    [gl.RG32F]: SAMPLER_TYPES.FLOAT,
    [gl.RGB32F]: SAMPLER_TYPES.FLOAT,
    [gl.RGBA32F]: SAMPLER_TYPES.FLOAT,
    [gl.R11F_G11F_B10F]: SAMPLER_TYPES.FLOAT,
    [gl.RGB9_E5]: SAMPLER_TYPES.FLOAT,
    [gl.R8I]: SAMPLER_TYPES.INT,
    [gl.R8UI]: SAMPLER_TYPES.UINT,
    [gl.R16I]: SAMPLER_TYPES.INT,
    [gl.R16UI]: SAMPLER_TYPES.UINT,
    [gl.R32I]: SAMPLER_TYPES.INT,
    [gl.R32UI]: SAMPLER_TYPES.UINT,
    [gl.RG8I]: SAMPLER_TYPES.INT,
    [gl.RG8UI]: SAMPLER_TYPES.UINT,
    [gl.RG16I]: SAMPLER_TYPES.INT,
    [gl.RG16UI]: SAMPLER_TYPES.UINT,
    [gl.RG32I]: SAMPLER_TYPES.INT,
    [gl.RG32UI]: SAMPLER_TYPES.UINT,
    [gl.RGB8I]: SAMPLER_TYPES.INT,
    [gl.RGB8UI]: SAMPLER_TYPES.UINT,
    [gl.RGB16I]: SAMPLER_TYPES.INT,
    [gl.RGB16UI]: SAMPLER_TYPES.UINT,
    [gl.RGB32I]: SAMPLER_TYPES.INT,
    [gl.RGB32UI]: SAMPLER_TYPES.UINT,
    [gl.RGBA8I]: SAMPLER_TYPES.INT,
    [gl.RGBA8UI]: SAMPLER_TYPES.UINT,
    [gl.RGBA16I]: SAMPLER_TYPES.INT,
    [gl.RGBA16UI]: SAMPLER_TYPES.UINT,
    [gl.RGBA32I]: SAMPLER_TYPES.INT,
    [gl.RGBA32UI]: SAMPLER_TYPES.UINT,
    [gl.DEPTH_COMPONENT16]: SAMPLER_TYPES.FLOAT,
    [gl.DEPTH_COMPONENT24]: SAMPLER_TYPES.FLOAT,
    [gl.DEPTH_COMPONENT32F]: SAMPLER_TYPES.FLOAT,
    [gl.DEPTH_STENCIL]: SAMPLER_TYPES.FLOAT,
    [gl.DEPTH24_STENCIL8]: SAMPLER_TYPES.FLOAT,
    [gl.DEPTH32F_STENCIL8]: SAMPLER_TYPES.FLOAT
  } : table = {
    [gl.RGB]: SAMPLER_TYPES.FLOAT,
    [gl.RGBA]: SAMPLER_TYPES.FLOAT,
    [gl.ALPHA]: SAMPLER_TYPES.FLOAT,
    [gl.LUMINANCE]: SAMPLER_TYPES.FLOAT,
    [gl.LUMINANCE_ALPHA]: SAMPLER_TYPES.FLOAT,
    [gl.DEPTH_STENCIL]: SAMPLER_TYPES.FLOAT
  }, table;
};

// node_modules/@pixi/core/lib/textures/utils/mapTypeAndFormatToInternalFormat.mjs
var mapTypeAndFormatToInternalFormat = function(gl) {
  let table;
  return ("WebGL2RenderingContext" in globalThis) && gl instanceof globalThis.WebGL2RenderingContext ? table = {
    [TYPES.UNSIGNED_BYTE]: {
      [FORMATS.RGBA]: gl.RGBA8,
      [FORMATS.RGB]: gl.RGB8,
      [FORMATS.RG]: gl.RG8,
      [FORMATS.RED]: gl.R8,
      [FORMATS.RGBA_INTEGER]: gl.RGBA8UI,
      [FORMATS.RGB_INTEGER]: gl.RGB8UI,
      [FORMATS.RG_INTEGER]: gl.RG8UI,
      [FORMATS.RED_INTEGER]: gl.R8UI,
      [FORMATS.ALPHA]: gl.ALPHA,
      [FORMATS.LUMINANCE]: gl.LUMINANCE,
      [FORMATS.LUMINANCE_ALPHA]: gl.LUMINANCE_ALPHA
    },
    [TYPES.BYTE]: {
      [FORMATS.RGBA]: gl.RGBA8_SNORM,
      [FORMATS.RGB]: gl.RGB8_SNORM,
      [FORMATS.RG]: gl.RG8_SNORM,
      [FORMATS.RED]: gl.R8_SNORM,
      [FORMATS.RGBA_INTEGER]: gl.RGBA8I,
      [FORMATS.RGB_INTEGER]: gl.RGB8I,
      [FORMATS.RG_INTEGER]: gl.RG8I,
      [FORMATS.RED_INTEGER]: gl.R8I
    },
    [TYPES.UNSIGNED_SHORT]: {
      [FORMATS.RGBA_INTEGER]: gl.RGBA16UI,
      [FORMATS.RGB_INTEGER]: gl.RGB16UI,
      [FORMATS.RG_INTEGER]: gl.RG16UI,
      [FORMATS.RED_INTEGER]: gl.R16UI,
      [FORMATS.DEPTH_COMPONENT]: gl.DEPTH_COMPONENT16
    },
    [TYPES.SHORT]: {
      [FORMATS.RGBA_INTEGER]: gl.RGBA16I,
      [FORMATS.RGB_INTEGER]: gl.RGB16I,
      [FORMATS.RG_INTEGER]: gl.RG16I,
      [FORMATS.RED_INTEGER]: gl.R16I
    },
    [TYPES.UNSIGNED_INT]: {
      [FORMATS.RGBA_INTEGER]: gl.RGBA32UI,
      [FORMATS.RGB_INTEGER]: gl.RGB32UI,
      [FORMATS.RG_INTEGER]: gl.RG32UI,
      [FORMATS.RED_INTEGER]: gl.R32UI,
      [FORMATS.DEPTH_COMPONENT]: gl.DEPTH_COMPONENT24
    },
    [TYPES.INT]: {
      [FORMATS.RGBA_INTEGER]: gl.RGBA32I,
      [FORMATS.RGB_INTEGER]: gl.RGB32I,
      [FORMATS.RG_INTEGER]: gl.RG32I,
      [FORMATS.RED_INTEGER]: gl.R32I
    },
    [TYPES.FLOAT]: {
      [FORMATS.RGBA]: gl.RGBA32F,
      [FORMATS.RGB]: gl.RGB32F,
      [FORMATS.RG]: gl.RG32F,
      [FORMATS.RED]: gl.R32F,
      [FORMATS.DEPTH_COMPONENT]: gl.DEPTH_COMPONENT32F
    },
    [TYPES.HALF_FLOAT]: {
      [FORMATS.RGBA]: gl.RGBA16F,
      [FORMATS.RGB]: gl.RGB16F,
      [FORMATS.RG]: gl.RG16F,
      [FORMATS.RED]: gl.R16F
    },
    [TYPES.UNSIGNED_SHORT_5_6_5]: {
      [FORMATS.RGB]: gl.RGB565
    },
    [TYPES.UNSIGNED_SHORT_4_4_4_4]: {
      [FORMATS.RGBA]: gl.RGBA4
    },
    [TYPES.UNSIGNED_SHORT_5_5_5_1]: {
      [FORMATS.RGBA]: gl.RGB5_A1
    },
    [TYPES.UNSIGNED_INT_2_10_10_10_REV]: {
      [FORMATS.RGBA]: gl.RGB10_A2,
      [FORMATS.RGBA_INTEGER]: gl.RGB10_A2UI
    },
    [TYPES.UNSIGNED_INT_10F_11F_11F_REV]: {
      [FORMATS.RGB]: gl.R11F_G11F_B10F
    },
    [TYPES.UNSIGNED_INT_5_9_9_9_REV]: {
      [FORMATS.RGB]: gl.RGB9_E5
    },
    [TYPES.UNSIGNED_INT_24_8]: {
      [FORMATS.DEPTH_STENCIL]: gl.DEPTH24_STENCIL8
    },
    [TYPES.FLOAT_32_UNSIGNED_INT_24_8_REV]: {
      [FORMATS.DEPTH_STENCIL]: gl.DEPTH32F_STENCIL8
    }
  } : table = {
    [TYPES.UNSIGNED_BYTE]: {
      [FORMATS.RGBA]: gl.RGBA,
      [FORMATS.RGB]: gl.RGB,
      [FORMATS.ALPHA]: gl.ALPHA,
      [FORMATS.LUMINANCE]: gl.LUMINANCE,
      [FORMATS.LUMINANCE_ALPHA]: gl.LUMINANCE_ALPHA
    },
    [TYPES.UNSIGNED_SHORT_5_6_5]: {
      [FORMATS.RGB]: gl.RGB
    },
    [TYPES.UNSIGNED_SHORT_4_4_4_4]: {
      [FORMATS.RGBA]: gl.RGBA
    },
    [TYPES.UNSIGNED_SHORT_5_5_5_1]: {
      [FORMATS.RGBA]: gl.RGBA
    }
  }, table;
};

// node_modules/@pixi/core/lib/textures/TextureSystem.mjs
class TextureSystem {
  constructor(renderer) {
    this.renderer = renderer, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = false, this.unknownTexture = new BaseTexture, this.hasIntegerTextures = false;
  }
  contextChange() {
    const gl = this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = mapTypeAndFormatToInternalFormat(gl), this.samplerTypes = mapInternalFormatToSamplerType(gl);
    const maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    this.boundTextures.length = maxTextures;
    for (let i2 = 0;i2 < maxTextures; i2++)
      this.boundTextures[i2] = null;
    this.emptyTextures = {};
    const emptyTexture2D = new GLTexture(gl.createTexture());
    gl.bindTexture(gl.TEXTURE_2D, emptyTexture2D.texture), gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[gl.TEXTURE_2D] = emptyTexture2D, this.emptyTextures[gl.TEXTURE_CUBE_MAP] = new GLTexture(gl.createTexture()), gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.emptyTextures[gl.TEXTURE_CUBE_MAP].texture);
    for (let i2 = 0;i2 < 6; i2++)
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    for (let i2 = 0;i2 < this.boundTextures.length; i2++)
      this.bind(null, i2);
  }
  bind(texture, location = 0) {
    const { gl } = this;
    if (texture = texture?.castToBaseTexture(), texture?.valid && !texture.parentTextureArray) {
      texture.touched = this.renderer.textureGC.count;
      const glTexture = texture._glTextures[this.CONTEXT_UID] || this.initTexture(texture);
      this.boundTextures[location] !== texture && (this.currentLocation !== location && (this.currentLocation = location, gl.activeTexture(gl.TEXTURE0 + location)), gl.bindTexture(texture.target, glTexture.texture)), glTexture.dirtyId !== texture.dirtyId ? (this.currentLocation !== location && (this.currentLocation = location, gl.activeTexture(gl.TEXTURE0 + location)), this.updateTexture(texture)) : glTexture.dirtyStyleId !== texture.dirtyStyleId && this.updateTextureStyle(texture), this.boundTextures[location] = texture;
    } else
      this.currentLocation !== location && (this.currentLocation = location, gl.activeTexture(gl.TEXTURE0 + location)), gl.bindTexture(gl.TEXTURE_2D, this.emptyTextures[gl.TEXTURE_2D].texture), this.boundTextures[location] = null;
  }
  reset() {
    this._unknownBoundTextures = true, this.hasIntegerTextures = false, this.currentLocation = -1;
    for (let i2 = 0;i2 < this.boundTextures.length; i2++)
      this.boundTextures[i2] = this.unknownTexture;
  }
  unbind(texture) {
    const { gl, boundTextures } = this;
    if (this._unknownBoundTextures) {
      this._unknownBoundTextures = false;
      for (let i2 = 0;i2 < boundTextures.length; i2++)
        boundTextures[i2] === this.unknownTexture && this.bind(null, i2);
    }
    for (let i2 = 0;i2 < boundTextures.length; i2++)
      boundTextures[i2] === texture && (this.currentLocation !== i2 && (gl.activeTexture(gl.TEXTURE0 + i2), this.currentLocation = i2), gl.bindTexture(texture.target, this.emptyTextures[texture.target].texture), boundTextures[i2] = null);
  }
  ensureSamplerType(maxTextures) {
    const { boundTextures, hasIntegerTextures, CONTEXT_UID } = this;
    if (hasIntegerTextures)
      for (let i2 = maxTextures - 1;i2 >= 0; --i2) {
        const tex = boundTextures[i2];
        tex && tex._glTextures[CONTEXT_UID].samplerType !== SAMPLER_TYPES.FLOAT && this.renderer.texture.unbind(tex);
      }
  }
  initTexture(texture) {
    const glTexture = new GLTexture(this.gl.createTexture());
    return glTexture.dirtyId = -1, texture._glTextures[this.CONTEXT_UID] = glTexture, this.managedTextures.push(texture), texture.on("dispose", this.destroyTexture, this), glTexture;
  }
  initTextureType(texture, glTexture) {
    glTexture.internalFormat = this.internalFormats[texture.type]?.[texture.format] ?? texture.format, glTexture.samplerType = this.samplerTypes[glTexture.internalFormat] ?? SAMPLER_TYPES.FLOAT, this.webGLVersion === 2 && texture.type === TYPES.HALF_FLOAT ? glTexture.type = this.gl.HALF_FLOAT : glTexture.type = texture.type;
  }
  updateTexture(texture) {
    const glTexture = texture._glTextures[this.CONTEXT_UID];
    if (!glTexture)
      return;
    const renderer = this.renderer;
    if (this.initTextureType(texture, glTexture), texture.resource?.upload(renderer, texture, glTexture))
      glTexture.samplerType !== SAMPLER_TYPES.FLOAT && (this.hasIntegerTextures = true);
    else {
      const { realWidth: width, realHeight: height } = texture, gl = renderer.gl;
      (glTexture.width !== width || glTexture.height !== height || glTexture.dirtyId < 0) && (glTexture.width = width, glTexture.height = height, gl.texImage2D(texture.target, 0, glTexture.internalFormat, width, height, 0, texture.format, glTexture.type, null));
    }
    texture.dirtyStyleId !== glTexture.dirtyStyleId && this.updateTextureStyle(texture), glTexture.dirtyId = texture.dirtyId;
  }
  destroyTexture(texture, skipRemove) {
    const { gl } = this;
    if (texture = texture.castToBaseTexture(), texture._glTextures[this.CONTEXT_UID] && (this.unbind(texture), gl.deleteTexture(texture._glTextures[this.CONTEXT_UID].texture), texture.off("dispose", this.destroyTexture, this), delete texture._glTextures[this.CONTEXT_UID], !skipRemove)) {
      const i2 = this.managedTextures.indexOf(texture);
      i2 !== -1 && removeItems(this.managedTextures, i2, 1);
    }
  }
  updateTextureStyle(texture) {
    const glTexture = texture._glTextures[this.CONTEXT_UID];
    glTexture && ((texture.mipmap === MIPMAP_MODES.POW2 || this.webGLVersion !== 2) && !texture.isPowerOfTwo ? glTexture.mipmap = false : glTexture.mipmap = texture.mipmap >= 1, this.webGLVersion !== 2 && !texture.isPowerOfTwo ? glTexture.wrapMode = WRAP_MODES.CLAMP : glTexture.wrapMode = texture.wrapMode, texture.resource?.style(this.renderer, texture, glTexture) || this.setStyle(texture, glTexture), glTexture.dirtyStyleId = texture.dirtyStyleId);
  }
  setStyle(texture, glTexture) {
    const gl = this.gl;
    if (glTexture.mipmap && texture.mipmap !== MIPMAP_MODES.ON_MANUAL && gl.generateMipmap(texture.target), gl.texParameteri(texture.target, gl.TEXTURE_WRAP_S, glTexture.wrapMode), gl.texParameteri(texture.target, gl.TEXTURE_WRAP_T, glTexture.wrapMode), glTexture.mipmap) {
      gl.texParameteri(texture.target, gl.TEXTURE_MIN_FILTER, texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST);
      const anisotropicExt = this.renderer.context.extensions.anisotropicFiltering;
      if (anisotropicExt && texture.anisotropicLevel > 0 && texture.scaleMode === SCALE_MODES.LINEAR) {
        const level = Math.min(texture.anisotropicLevel, gl.getParameter(anisotropicExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
        gl.texParameterf(texture.target, anisotropicExt.TEXTURE_MAX_ANISOTROPY_EXT, level);
      }
    } else
      gl.texParameteri(texture.target, gl.TEXTURE_MIN_FILTER, texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(texture.target, gl.TEXTURE_MAG_FILTER, texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR : gl.NEAREST);
  }
  destroy() {
    this.renderer = null;
  }
}
TextureSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "texture"
};
extensions.add(TextureSystem);

// node_modules/@pixi/core/lib/transformFeedback/TransformFeedbackSystem.mjs
class TransformFeedbackSystem {
  constructor(renderer) {
    this.renderer = renderer;
  }
  contextChange() {
    this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
  }
  bind(transformFeedback) {
    const { gl, CONTEXT_UID } = this, glTransformFeedback = transformFeedback._glTransformFeedbacks[CONTEXT_UID] || this.createGLTransformFeedback(transformFeedback);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, glTransformFeedback);
  }
  unbind() {
    const { gl } = this;
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
  }
  beginTransformFeedback(drawMode, shader) {
    const { gl, renderer } = this;
    shader && renderer.shader.bind(shader), gl.beginTransformFeedback(drawMode);
  }
  endTransformFeedback() {
    const { gl } = this;
    gl.endTransformFeedback();
  }
  createGLTransformFeedback(tf) {
    const { gl, renderer, CONTEXT_UID } = this, glTransformFeedback = gl.createTransformFeedback();
    tf._glTransformFeedbacks[CONTEXT_UID] = glTransformFeedback, gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, glTransformFeedback);
    for (let i2 = 0;i2 < tf.buffers.length; i2++) {
      const buffer = tf.buffers[i2];
      buffer && (renderer.buffer.update(buffer), buffer._glBuffers[CONTEXT_UID].refCount++, gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, i2, buffer._glBuffers[CONTEXT_UID].buffer || null));
    }
    return gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null), tf.disposeRunner.add(this), glTransformFeedback;
  }
  disposeTransformFeedback(tf, contextLost) {
    const glTF = tf._glTransformFeedbacks[this.CONTEXT_UID], gl = this.gl;
    tf.disposeRunner.remove(this);
    const bufferSystem = this.renderer.buffer;
    if (bufferSystem)
      for (let i2 = 0;i2 < tf.buffers.length; i2++) {
        const buffer = tf.buffers[i2];
        if (!buffer)
          continue;
        const buf = buffer._glBuffers[this.CONTEXT_UID];
        buf && (buf.refCount--, buf.refCount === 0 && !contextLost && bufferSystem.dispose(buffer, contextLost));
      }
    glTF && (contextLost || gl.deleteTransformFeedback(glTF), delete tf._glTransformFeedbacks[this.CONTEXT_UID]);
  }
  destroy() {
    this.renderer = null;
  }
}
TransformFeedbackSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "transformFeedback"
};
extensions.add(TransformFeedbackSystem);

// node_modules/@pixi/core/lib/view/ViewSystem.mjs
class ViewSystem {
  constructor(renderer) {
    this.renderer = renderer;
  }
  init(options) {
    this.screen = new Rectangle(0, 0, options.width, options.height), this.element = options.view || settings.ADAPTER.createCanvas(), this.resolution = options.resolution || settings.RESOLUTION, this.autoDensity = !!options.autoDensity;
  }
  resizeView(desiredScreenWidth, desiredScreenHeight) {
    this.element.width = Math.round(desiredScreenWidth * this.resolution), this.element.height = Math.round(desiredScreenHeight * this.resolution);
    const screenWidth = this.element.width / this.resolution, screenHeight = this.element.height / this.resolution;
    this.screen.width = screenWidth, this.screen.height = screenHeight, this.autoDensity && (this.element.style.width = `${screenWidth}px`, this.element.style.height = `${screenHeight}px`), this.renderer.emit("resize", screenWidth, screenHeight), this.renderer.runners.resize.emit(this.screen.width, this.screen.height);
  }
  destroy(removeView) {
    removeView && this.element.parentNode?.removeChild(this.element), this.renderer = null, this.element = null, this.screen = null;
  }
}
ViewSystem.defaultOptions = {
  width: 800,
  height: 600,
  resolution: undefined,
  autoDensity: false
}, ViewSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "_view"
};
extensions.add(ViewSystem);

// node_modules/@pixi/core/lib/settings.mjs
settings.PREFER_ENV = ENV.WEBGL2;
settings.STRICT_TEXTURE_CACHE = false;
settings.RENDER_OPTIONS = {
  ...ContextSystem.defaultOptions,
  ...BackgroundSystem.defaultOptions,
  ...ViewSystem.defaultOptions,
  ...StartupSystem.defaultOptions
};
Object.defineProperties(settings, {
  WRAP_MODE: {
    get() {
      return BaseTexture.defaultOptions.wrapMode;
    },
    set(value) {
      deprecation("7.1.0", "settings.WRAP_MODE is deprecated, use BaseTexture.defaultOptions.wrapMode"), BaseTexture.defaultOptions.wrapMode = value;
    }
  },
  SCALE_MODE: {
    get() {
      return BaseTexture.defaultOptions.scaleMode;
    },
    set(value) {
      deprecation("7.1.0", "settings.SCALE_MODE is deprecated, use BaseTexture.defaultOptions.scaleMode"), BaseTexture.defaultOptions.scaleMode = value;
    }
  },
  MIPMAP_TEXTURES: {
    get() {
      return BaseTexture.defaultOptions.mipmap;
    },
    set(value) {
      deprecation("7.1.0", "settings.MIPMAP_TEXTURES is deprecated, use BaseTexture.defaultOptions.mipmap"), BaseTexture.defaultOptions.mipmap = value;
    }
  },
  ANISOTROPIC_LEVEL: {
    get() {
      return BaseTexture.defaultOptions.anisotropicLevel;
    },
    set(value) {
      deprecation("7.1.0", "settings.ANISOTROPIC_LEVEL is deprecated, use BaseTexture.defaultOptions.anisotropicLevel"), BaseTexture.defaultOptions.anisotropicLevel = value;
    }
  },
  FILTER_RESOLUTION: {
    get() {
      return deprecation("7.1.0", "settings.FILTER_RESOLUTION is deprecated, use Filter.defaultResolution"), Filter.defaultResolution;
    },
    set(value) {
      Filter.defaultResolution = value;
    }
  },
  FILTER_MULTISAMPLE: {
    get() {
      return deprecation("7.1.0", "settings.FILTER_MULTISAMPLE is deprecated, use Filter.defaultMultisample"), Filter.defaultMultisample;
    },
    set(value) {
      Filter.defaultMultisample = value;
    }
  },
  SPRITE_MAX_TEXTURES: {
    get() {
      return BatchRenderer.defaultMaxTextures;
    },
    set(value) {
      deprecation("7.1.0", "settings.SPRITE_MAX_TEXTURES is deprecated, use BatchRenderer.defaultMaxTextures"), BatchRenderer.defaultMaxTextures = value;
    }
  },
  SPRITE_BATCH_SIZE: {
    get() {
      return BatchRenderer.defaultBatchSize;
    },
    set(value) {
      deprecation("7.1.0", "settings.SPRITE_BATCH_SIZE is deprecated, use BatchRenderer.defaultBatchSize"), BatchRenderer.defaultBatchSize = value;
    }
  },
  CAN_UPLOAD_SAME_BUFFER: {
    get() {
      return BatchRenderer.canUploadSameBuffer;
    },
    set(value) {
      deprecation("7.1.0", "settings.CAN_UPLOAD_SAME_BUFFER is deprecated, use BatchRenderer.canUploadSameBuffer"), BatchRenderer.canUploadSameBuffer = value;
    }
  },
  GC_MODE: {
    get() {
      return TextureGCSystem.defaultMode;
    },
    set(value) {
      deprecation("7.1.0", "settings.GC_MODE is deprecated, use TextureGCSystem.defaultMode"), TextureGCSystem.defaultMode = value;
    }
  },
  GC_MAX_IDLE: {
    get() {
      return TextureGCSystem.defaultMaxIdle;
    },
    set(value) {
      deprecation("7.1.0", "settings.GC_MAX_IDLE is deprecated, use TextureGCSystem.defaultMaxIdle"), TextureGCSystem.defaultMaxIdle = value;
    }
  },
  GC_MAX_CHECK_COUNT: {
    get() {
      return TextureGCSystem.defaultCheckCountMax;
    },
    set(value) {
      deprecation("7.1.0", "settings.GC_MAX_CHECK_COUNT is deprecated, use TextureGCSystem.defaultCheckCountMax"), TextureGCSystem.defaultCheckCountMax = value;
    }
  },
  PRECISION_VERTEX: {
    get() {
      return Program.defaultVertexPrecision;
    },
    set(value) {
      deprecation("7.1.0", "settings.PRECISION_VERTEX is deprecated, use Program.defaultVertexPrecision"), Program.defaultVertexPrecision = value;
    }
  },
  PRECISION_FRAGMENT: {
    get() {
      return Program.defaultFragmentPrecision;
    },
    set(value) {
      deprecation("7.1.0", "settings.PRECISION_FRAGMENT is deprecated, use Program.defaultFragmentPrecision"), Program.defaultFragmentPrecision = value;
    }
  }
});
// node_modules/@pixi/ticker/lib/const.mjs
var UPDATE_PRIORITY = ((UPDATE_PRIORITY2) => (UPDATE_PRIORITY2[UPDATE_PRIORITY2.INTERACTION = 50] = "INTERACTION", UPDATE_PRIORITY2[UPDATE_PRIORITY2.HIGH = 25] = "HIGH", UPDATE_PRIORITY2[UPDATE_PRIORITY2.NORMAL = 0] = "NORMAL", UPDATE_PRIORITY2[UPDATE_PRIORITY2.LOW = -25] = "LOW", UPDATE_PRIORITY2[UPDATE_PRIORITY2.UTILITY = -50] = "UTILITY", UPDATE_PRIORITY2))(UPDATE_PRIORITY || {});

// node_modules/@pixi/ticker/lib/TickerListener.mjs
class TickerListener {
  constructor(fn, context2 = null, priority = 0, once = false) {
    this.next = null, this.previous = null, this._destroyed = false, this.fn = fn, this.context = context2, this.priority = priority, this.once = once;
  }
  match(fn, context2 = null) {
    return this.fn === fn && this.context === context2;
  }
  emit(deltaTime) {
    this.fn && (this.context ? this.fn.call(this.context, deltaTime) : this.fn(deltaTime));
    const redirect = this.next;
    return this.once && this.destroy(true), this._destroyed && (this.next = null), redirect;
  }
  connect(previous) {
    this.previous = previous, previous.next && (previous.next.previous = this), this.next = previous.next, previous.next = this;
  }
  destroy(hard = false) {
    this._destroyed = true, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
    const redirect = this.next;
    return this.next = hard ? null : redirect, this.previous = null, redirect;
  }
}

// node_modules/@pixi/ticker/lib/Ticker.mjs
var _Ticker = class _Ticker2 {
  constructor() {
    this.autoStart = false, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = false, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = false, this._lastFrame = -1, this._head = new TickerListener(null, null, 1 / 0), this.deltaMS = 1 / _Ticker2.targetFPMS, this.elapsedMS = 1 / _Ticker2.targetFPMS, this._tick = (time) => {
      this._requestId = null, this.started && (this.update(time), this.started && this._requestId === null && this._head.next && (this._requestId = requestAnimationFrame(this._tick)));
    };
  }
  _requestIfNeeded() {
    this._requestId === null && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
  }
  _cancelIfNeeded() {
    this._requestId !== null && (cancelAnimationFrame(this._requestId), this._requestId = null);
  }
  _startIfPossible() {
    this.started ? this._requestIfNeeded() : this.autoStart && this.start();
  }
  add(fn, context2, priority = UPDATE_PRIORITY.NORMAL) {
    return this._addListener(new TickerListener(fn, context2, priority));
  }
  addOnce(fn, context2, priority = UPDATE_PRIORITY.NORMAL) {
    return this._addListener(new TickerListener(fn, context2, priority, true));
  }
  _addListener(listener) {
    let current = this._head.next, previous = this._head;
    if (!current)
      listener.connect(previous);
    else {
      for (;current; ) {
        if (listener.priority > current.priority) {
          listener.connect(previous);
          break;
        }
        previous = current, current = current.next;
      }
      listener.previous || listener.connect(previous);
    }
    return this._startIfPossible(), this;
  }
  remove(fn, context2) {
    let listener = this._head.next;
    for (;listener; )
      listener.match(fn, context2) ? listener = listener.destroy() : listener = listener.next;
    return this._head.next || this._cancelIfNeeded(), this;
  }
  get count() {
    if (!this._head)
      return 0;
    let count = 0, current = this._head;
    for (;current = current.next; )
      count++;
    return count;
  }
  start() {
    this.started || (this.started = true, this._requestIfNeeded());
  }
  stop() {
    this.started && (this.started = false, this._cancelIfNeeded());
  }
  destroy() {
    if (!this._protected) {
      this.stop();
      let listener = this._head.next;
      for (;listener; )
        listener = listener.destroy(true);
      this._head.destroy(), this._head = null;
    }
  }
  update(currentTime = performance.now()) {
    let elapsedMS;
    if (currentTime > this.lastTime) {
      if (elapsedMS = this.elapsedMS = currentTime - this.lastTime, elapsedMS > this._maxElapsedMS && (elapsedMS = this._maxElapsedMS), elapsedMS *= this.speed, this._minElapsedMS) {
        const delta = currentTime - this._lastFrame | 0;
        if (delta < this._minElapsedMS)
          return;
        this._lastFrame = currentTime - delta % this._minElapsedMS;
      }
      this.deltaMS = elapsedMS, this.deltaTime = this.deltaMS * _Ticker2.targetFPMS;
      const head = this._head;
      let listener = head.next;
      for (;listener; )
        listener = listener.emit(this.deltaTime);
      head.next || this._cancelIfNeeded();
    } else
      this.deltaTime = this.deltaMS = this.elapsedMS = 0;
    this.lastTime = currentTime;
  }
  get FPS() {
    return 1000 / this.elapsedMS;
  }
  get minFPS() {
    return 1000 / this._maxElapsedMS;
  }
  set minFPS(fps) {
    const minFPS = Math.min(this.maxFPS, fps), minFPMS = Math.min(Math.max(0, minFPS) / 1000, _Ticker2.targetFPMS);
    this._maxElapsedMS = 1 / minFPMS;
  }
  get maxFPS() {
    return this._minElapsedMS ? Math.round(1000 / this._minElapsedMS) : 0;
  }
  set maxFPS(fps) {
    if (fps === 0)
      this._minElapsedMS = 0;
    else {
      const maxFPS = Math.max(this.minFPS, fps);
      this._minElapsedMS = 1 / (maxFPS / 1000);
    }
  }
  static get shared() {
    if (!_Ticker2._shared) {
      const shared = _Ticker2._shared = new _Ticker2;
      shared.autoStart = true, shared._protected = true;
    }
    return _Ticker2._shared;
  }
  static get system() {
    if (!_Ticker2._system) {
      const system = _Ticker2._system = new _Ticker2;
      system.autoStart = true, system._protected = true;
    }
    return _Ticker2._system;
  }
};
_Ticker.targetFPMS = 0.06;
var Ticker = _Ticker;

// node_modules/@pixi/ticker/lib/settings.mjs
Object.defineProperties(settings, {
  TARGET_FPMS: {
    get() {
      return Ticker.targetFPMS;
    },
    set(value) {
      deprecation("7.1.0", "settings.TARGET_FPMS is deprecated, use Ticker.targetFPMS"), Ticker.targetFPMS = value;
    }
  }
});

// node_modules/@pixi/ticker/lib/TickerPlugin.mjs
class TickerPlugin {
  static init(options) {
    options = Object.assign({
      autoStart: true,
      sharedTicker: false
    }, options), Object.defineProperty(this, "ticker", {
      set(ticker) {
        this._ticker && this._ticker.remove(this.render, this), this._ticker = ticker, ticker && ticker.add(this.render, this, UPDATE_PRIORITY.LOW);
      },
      get() {
        return this._ticker;
      }
    }), this.stop = () => {
      this._ticker.stop();
    }, this.start = () => {
      this._ticker.start();
    }, this._ticker = null, this.ticker = options.sharedTicker ? Ticker.shared : new Ticker, options.autoStart && this.start();
  }
  static destroy() {
    if (this._ticker) {
      const oldTicker = this._ticker;
      this.ticker = null, oldTicker.destroy();
    }
  }
}
TickerPlugin.extension = ExtensionType.Application;
extensions.add(TickerPlugin);
// node_modules/@pixi/core/lib/autoDetectRenderer.mjs
var autoDetectRenderer = function(options) {
  for (const RendererType of renderers)
    if (RendererType.test(options))
      return new RendererType(options);
  throw new Error("Unable to auto-detect a suitable renderer.");
};
var renderers = [];
extensions.handleByList(ExtensionType.Renderer, renderers);

// node_modules/@pixi/core/lib/fragments/default.vert.mjs
var $defaultVertex = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`;

// node_modules/@pixi/core/lib/fragments/defaultFilter.vert.mjs
var $defaultFilterVertex = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;

// node_modules/@pixi/core/lib/fragments/index.mjs
var defaultVertex4 = $defaultVertex;
var defaultFilterVertex = $defaultFilterVertex;

// node_modules/@pixi/core/lib/framebuffer/MultisampleSystem.mjs
class MultisampleSystem {
  constructor(renderer) {
    this.renderer = renderer;
  }
  contextChange(gl) {
    let samples;
    if (this.renderer.context.webGLVersion === 1) {
      const framebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null), samples = gl.getParameter(gl.SAMPLES), gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    } else {
      const framebuffer = gl.getParameter(gl.DRAW_FRAMEBUFFER_BINDING);
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null), samples = gl.getParameter(gl.SAMPLES), gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, framebuffer);
    }
    samples >= MSAA_QUALITY.HIGH ? this.multisample = MSAA_QUALITY.HIGH : samples >= MSAA_QUALITY.MEDIUM ? this.multisample = MSAA_QUALITY.MEDIUM : samples >= MSAA_QUALITY.LOW ? this.multisample = MSAA_QUALITY.LOW : this.multisample = MSAA_QUALITY.NONE;
  }
  destroy() {
  }
}
MultisampleSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "_multisample"
};
extensions.add(MultisampleSystem);

// node_modules/@pixi/core/lib/geometry/GLBuffer.mjs
class GLBuffer {
  constructor(buffer) {
    this.buffer = buffer || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0;
  }
}

// node_modules/@pixi/core/lib/geometry/BufferSystem.mjs
class BufferSystem {
  constructor(renderer) {
    this.renderer = renderer, this.managedBuffers = {}, this.boundBufferBases = {};
  }
  destroy() {
    this.renderer = null;
  }
  contextChange() {
    this.disposeAll(true), this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
  }
  bind(buffer) {
    const { gl, CONTEXT_UID } = this, glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
    gl.bindBuffer(buffer.type, glBuffer.buffer);
  }
  unbind(type) {
    const { gl } = this;
    gl.bindBuffer(type, null);
  }
  bindBufferBase(buffer, index) {
    const { gl, CONTEXT_UID } = this;
    if (this.boundBufferBases[index] !== buffer) {
      const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
      this.boundBufferBases[index] = buffer, gl.bindBufferBase(gl.UNIFORM_BUFFER, index, glBuffer.buffer);
    }
  }
  bindBufferRange(buffer, index, offset) {
    const { gl, CONTEXT_UID } = this;
    offset = offset || 0;
    const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
    gl.bindBufferRange(gl.UNIFORM_BUFFER, index || 0, glBuffer.buffer, offset * 256, 256);
  }
  update(buffer) {
    const { gl, CONTEXT_UID } = this, glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
    if (buffer._updateID !== glBuffer.updateID)
      if (glBuffer.updateID = buffer._updateID, gl.bindBuffer(buffer.type, glBuffer.buffer), glBuffer.byteLength >= buffer.data.byteLength)
        gl.bufferSubData(buffer.type, 0, buffer.data);
      else {
        const drawType = buffer.static ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW;
        glBuffer.byteLength = buffer.data.byteLength, gl.bufferData(buffer.type, buffer.data, drawType);
      }
  }
  dispose(buffer, contextLost) {
    if (!this.managedBuffers[buffer.id])
      return;
    delete this.managedBuffers[buffer.id];
    const glBuffer = buffer._glBuffers[this.CONTEXT_UID], gl = this.gl;
    buffer.disposeRunner.remove(this), glBuffer && (contextLost || gl.deleteBuffer(glBuffer.buffer), delete buffer._glBuffers[this.CONTEXT_UID]);
  }
  disposeAll(contextLost) {
    const all = Object.keys(this.managedBuffers);
    for (let i2 = 0;i2 < all.length; i2++)
      this.dispose(this.managedBuffers[all[i2]], contextLost);
  }
  createGLBuffer(buffer) {
    const { CONTEXT_UID, gl } = this;
    return buffer._glBuffers[CONTEXT_UID] = new GLBuffer(gl.createBuffer()), this.managedBuffers[buffer.id] = buffer, buffer.disposeRunner.add(this), buffer._glBuffers[CONTEXT_UID];
  }
}
BufferSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "buffer"
};
extensions.add(BufferSystem);

// node_modules/@pixi/core/lib/render/ObjectRendererSystem.mjs
class ObjectRendererSystem {
  constructor(renderer) {
    this.renderer = renderer;
  }
  render(displayObject, options) {
    const renderer = this.renderer;
    let renderTexture, clear, transform, skipUpdateTransform;
    if (options && (renderTexture = options.renderTexture, clear = options.clear, transform = options.transform, skipUpdateTransform = options.skipUpdateTransform), this.renderingToScreen = !renderTexture, renderer.runners.prerender.emit(), renderer.emit("prerender"), renderer.projection.transform = transform, !renderer.context.isLost) {
      if (renderTexture || (this.lastObjectRendered = displayObject), !skipUpdateTransform) {
        const cacheParent = displayObject.enableTempParent();
        displayObject.updateTransform(), displayObject.disableTempParent(cacheParent);
      }
      renderer.renderTexture.bind(renderTexture), renderer.batch.currentRenderer.start(), (clear ?? renderer.background.clearBeforeRender) && renderer.renderTexture.clear(), displayObject.render(renderer), renderer.batch.currentRenderer.flush(), renderTexture && (options.blit && renderer.framebuffer.blit(), renderTexture.baseTexture.update()), renderer.runners.postrender.emit(), renderer.projection.transform = null, renderer.emit("postrender");
    }
  }
  destroy() {
    this.renderer = null, this.lastObjectRendered = null;
  }
}
ObjectRendererSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "objectRenderer"
};
extensions.add(ObjectRendererSystem);

// node_modules/@pixi/core/lib/Renderer.mjs
var _Renderer = class _Renderer2 extends SystemManager {
  constructor(options) {
    super(), this.type = RENDERER_TYPE.WEBGL, options = Object.assign({}, settings.RENDER_OPTIONS, options), this.gl = null, this.CONTEXT_UID = 0, this.globalUniforms = new UniformGroup({
      projectionMatrix: new Matrix
    }, true);
    const systemConfig = {
      runners: [
        "init",
        "destroy",
        "contextChange",
        "resolutionChange",
        "reset",
        "update",
        "postrender",
        "prerender",
        "resize"
      ],
      systems: _Renderer2.__systems,
      priority: [
        "_view",
        "textureGenerator",
        "background",
        "_plugin",
        "startup",
        "context",
        "state",
        "texture",
        "buffer",
        "geometry",
        "framebuffer",
        "transformFeedback",
        "mask",
        "scissor",
        "stencil",
        "projection",
        "textureGC",
        "filter",
        "renderTexture",
        "batch",
        "objectRenderer",
        "_multisample"
      ]
    };
    this.setup(systemConfig), ("useContextAlpha" in options) && (deprecation("7.0.0", "options.useContextAlpha is deprecated, use options.premultipliedAlpha and options.backgroundAlpha instead"), options.premultipliedAlpha = options.useContextAlpha && options.useContextAlpha !== "notMultiplied", options.backgroundAlpha = options.useContextAlpha === false ? 1 : options.backgroundAlpha), this._plugin.rendererPlugins = _Renderer2.__plugins, this.options = options, this.startup.run(this.options);
  }
  static test(options) {
    return options?.forceCanvas ? false : isWebGLSupported();
  }
  render(displayObject, options) {
    this.objectRenderer.render(displayObject, options);
  }
  resize(desiredScreenWidth, desiredScreenHeight) {
    this._view.resizeView(desiredScreenWidth, desiredScreenHeight);
  }
  reset() {
    return this.runners.reset.emit(), this;
  }
  clear() {
    this.renderTexture.bind(), this.renderTexture.clear();
  }
  destroy(removeView = false) {
    this.runners.destroy.items.reverse(), this.emitWithCustomOptions(this.runners.destroy, {
      _view: removeView
    }), super.destroy();
  }
  get plugins() {
    return this._plugin.plugins;
  }
  get multisample() {
    return this._multisample.multisample;
  }
  get width() {
    return this._view.element.width;
  }
  get height() {
    return this._view.element.height;
  }
  get resolution() {
    return this._view.resolution;
  }
  set resolution(value) {
    this._view.resolution = value, this.runners.resolutionChange.emit(value);
  }
  get autoDensity() {
    return this._view.autoDensity;
  }
  get view() {
    return this._view.element;
  }
  get screen() {
    return this._view.screen;
  }
  get lastObjectRendered() {
    return this.objectRenderer.lastObjectRendered;
  }
  get renderingToScreen() {
    return this.objectRenderer.renderingToScreen;
  }
  get rendererLogId() {
    return `WebGL ${this.context.webGLVersion}`;
  }
  get clearBeforeRender() {
    return deprecation("7.0.0", "renderer.clearBeforeRender has been deprecated, please use renderer.background.clearBeforeRender instead."), this.background.clearBeforeRender;
  }
  get useContextAlpha() {
    return deprecation("7.0.0", "renderer.useContextAlpha has been deprecated, please use renderer.context.premultipliedAlpha instead."), this.context.useContextAlpha;
  }
  get preserveDrawingBuffer() {
    return deprecation("7.0.0", "renderer.preserveDrawingBuffer has been deprecated, we cannot truly know this unless pixi created the context"), this.context.preserveDrawingBuffer;
  }
  get backgroundColor() {
    return deprecation("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead."), this.background.color;
  }
  set backgroundColor(value) {
    deprecation("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead."), this.background.color = value;
  }
  get backgroundAlpha() {
    return deprecation("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."), this.background.alpha;
  }
  set backgroundAlpha(value) {
    deprecation("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."), this.background.alpha = value;
  }
  get powerPreference() {
    return deprecation("7.0.0", "renderer.powerPreference has been deprecated, we can only know this if pixi creates the context"), this.context.powerPreference;
  }
  generateTexture(displayObject, options) {
    return this.textureGenerator.generateTexture(displayObject, options);
  }
};
_Renderer.extension = {
  type: ExtensionType.Renderer,
  priority: 1
}, _Renderer.__plugins = {}, _Renderer.__systems = {};
var Renderer = _Renderer;
extensions.handleByMap(ExtensionType.RendererPlugin, Renderer.__plugins);
extensions.handleByMap(ExtensionType.RendererSystem, Renderer.__systems);
extensions.add(Renderer);

// node_modules/@pixi/core/lib/textures/resources/AbstractMultiResource.mjs
class AbstractMultiResource extends Resource {
  constructor(length, options) {
    const { width, height } = options || {};
    super(width, height), this.items = [], this.itemDirtyIds = [];
    for (let i2 = 0;i2 < length; i2++) {
      const partTexture = new BaseTexture;
      this.items.push(partTexture), this.itemDirtyIds.push(-2);
    }
    this.length = length, this._load = null, this.baseTexture = null;
  }
  initFromArray(resources, options) {
    for (let i2 = 0;i2 < this.length; i2++)
      resources[i2] && (resources[i2].castToBaseTexture ? this.addBaseTextureAt(resources[i2].castToBaseTexture(), i2) : resources[i2] instanceof Resource ? this.addResourceAt(resources[i2], i2) : this.addResourceAt(autoDetectResource(resources[i2], options), i2));
  }
  dispose() {
    for (let i2 = 0, len = this.length;i2 < len; i2++)
      this.items[i2].destroy();
    this.items = null, this.itemDirtyIds = null, this._load = null;
  }
  addResourceAt(resource, index) {
    if (!this.items[index])
      throw new Error(`Index ${index} is out of bounds`);
    return resource.valid && !this.valid && this.resize(resource.width, resource.height), this.items[index].setResource(resource), this;
  }
  bind(baseTexture) {
    if (this.baseTexture !== null)
      throw new Error("Only one base texture per TextureArray is allowed");
    super.bind(baseTexture);
    for (let i2 = 0;i2 < this.length; i2++)
      this.items[i2].parentTextureArray = baseTexture, this.items[i2].on("update", baseTexture.update, baseTexture);
  }
  unbind(baseTexture) {
    super.unbind(baseTexture);
    for (let i2 = 0;i2 < this.length; i2++)
      this.items[i2].parentTextureArray = null, this.items[i2].off("update", baseTexture.update, baseTexture);
  }
  load() {
    if (this._load)
      return this._load;
    const promises = this.items.map((item) => item.resource).filter((item) => item).map((item) => item.load());
    return this._load = Promise.all(promises).then(() => {
      const { realWidth, realHeight } = this.items[0];
      return this.resize(realWidth, realHeight), this.update(), Promise.resolve(this);
    }), this._load;
  }
}

// node_modules/@pixi/core/lib/textures/resources/ArrayResource.mjs
class ArrayResource extends AbstractMultiResource {
  constructor(source, options) {
    const { width, height } = options || {};
    let urls, length;
    Array.isArray(source) ? (urls = source, length = source.length) : length = source, super(length, { width, height }), urls && this.initFromArray(urls, options);
  }
  addBaseTextureAt(baseTexture, index) {
    if (baseTexture.resource)
      this.addResourceAt(baseTexture.resource, index);
    else
      throw new Error("ArrayResource does not support RenderTexture");
    return this;
  }
  bind(baseTexture) {
    super.bind(baseTexture), baseTexture.target = TARGETS.TEXTURE_2D_ARRAY;
  }
  upload(renderer, texture, glTexture) {
    const { length, itemDirtyIds, items } = this, { gl } = renderer;
    glTexture.dirtyId < 0 && gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, glTexture.internalFormat, this._width, this._height, length, 0, texture.format, glTexture.type, null);
    for (let i2 = 0;i2 < length; i2++) {
      const item = items[i2];
      itemDirtyIds[i2] < item.dirtyId && (itemDirtyIds[i2] = item.dirtyId, item.valid && gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, 0, i2, item.resource.width, item.resource.height, 1, texture.format, glTexture.type, item.resource.source));
    }
    return true;
  }
}

// node_modules/@pixi/core/lib/textures/resources/CanvasResource.mjs
class CanvasResource extends BaseImageResource {
  constructor(source) {
    super(source);
  }
  static test(source) {
    const { OffscreenCanvas: OffscreenCanvas2 } = globalThis;
    return OffscreenCanvas2 && source instanceof OffscreenCanvas2 ? true : globalThis.HTMLCanvasElement && source instanceof HTMLCanvasElement;
  }
}

// node_modules/@pixi/core/lib/textures/resources/CubeResource.mjs
var _CubeResource = class _CubeResource2 extends AbstractMultiResource {
  constructor(source, options) {
    const { width, height, autoLoad, linkBaseTexture } = options || {};
    if (source && source.length !== _CubeResource2.SIDES)
      throw new Error(`Invalid length. Got ${source.length}, expected 6`);
    super(6, { width, height });
    for (let i2 = 0;i2 < _CubeResource2.SIDES; i2++)
      this.items[i2].target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + i2;
    this.linkBaseTexture = linkBaseTexture !== false, source && this.initFromArray(source, options), autoLoad !== false && this.load();
  }
  bind(baseTexture) {
    super.bind(baseTexture), baseTexture.target = TARGETS.TEXTURE_CUBE_MAP;
  }
  addBaseTextureAt(baseTexture, index, linkBaseTexture) {
    if (linkBaseTexture === undefined && (linkBaseTexture = this.linkBaseTexture), !this.items[index])
      throw new Error(`Index ${index} is out of bounds`);
    if (!this.linkBaseTexture || baseTexture.parentTextureArray || Object.keys(baseTexture._glTextures).length > 0)
      if (baseTexture.resource)
        this.addResourceAt(baseTexture.resource, index);
      else
        throw new Error("CubeResource does not support copying of renderTexture.");
    else
      baseTexture.target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + index, baseTexture.parentTextureArray = this.baseTexture, this.items[index] = baseTexture;
    return baseTexture.valid && !this.valid && this.resize(baseTexture.realWidth, baseTexture.realHeight), this.items[index] = baseTexture, this;
  }
  upload(renderer, _baseTexture, glTexture) {
    const dirty = this.itemDirtyIds;
    for (let i2 = 0;i2 < _CubeResource2.SIDES; i2++) {
      const side = this.items[i2];
      (dirty[i2] < side.dirtyId || glTexture.dirtyId < _baseTexture.dirtyId) && (side.valid && side.resource ? (side.resource.upload(renderer, side, glTexture), dirty[i2] = side.dirtyId) : dirty[i2] < -1 && (renderer.gl.texImage2D(side.target, 0, glTexture.internalFormat, _baseTexture.realWidth, _baseTexture.realHeight, 0, _baseTexture.format, glTexture.type, null), dirty[i2] = -1));
    }
    return true;
  }
  static test(source) {
    return Array.isArray(source) && source.length === _CubeResource2.SIDES;
  }
};
_CubeResource.SIDES = 6;
var CubeResource = _CubeResource;

// node_modules/@pixi/core/lib/textures/resources/ImageBitmapResource.mjs
class ImageBitmapResource extends BaseImageResource {
  constructor(source, options) {
    options = options || {};
    let baseSource, url3, ownsImageBitmap;
    typeof source == "string" ? (baseSource = ImageBitmapResource.EMPTY, url3 = source, ownsImageBitmap = true) : (baseSource = source, url3 = null, ownsImageBitmap = false), super(baseSource), this.url = url3, this.crossOrigin = options.crossOrigin ?? true, this.alphaMode = typeof options.alphaMode == "number" ? options.alphaMode : null, this.ownsImageBitmap = options.ownsImageBitmap ?? ownsImageBitmap, this._load = null, options.autoLoad !== false && this.load();
  }
  load() {
    return this._load ? this._load : (this._load = new Promise(async (resolve, reject) => {
      if (this.url === null) {
        resolve(this);
        return;
      }
      try {
        const response = await settings.ADAPTER.fetch(this.url, {
          mode: this.crossOrigin ? "cors" : "no-cors"
        });
        if (this.destroyed)
          return;
        const imageBlob = await response.blob();
        if (this.destroyed)
          return;
        const imageBitmap = await createImageBitmap(imageBlob, {
          premultiplyAlpha: this.alphaMode === null || this.alphaMode === ALPHA_MODES.UNPACK ? "premultiply" : "none"
        });
        if (this.destroyed) {
          imageBitmap.close();
          return;
        }
        this.source = imageBitmap, this.update(), resolve(this);
      } catch (e2) {
        if (this.destroyed)
          return;
        reject(e2), this.onError.emit(e2);
      }
    }), this._load);
  }
  upload(renderer, baseTexture, glTexture) {
    return this.source instanceof ImageBitmap ? (typeof this.alphaMode == "number" && (baseTexture.alphaMode = this.alphaMode), super.upload(renderer, baseTexture, glTexture)) : (this.load(), false);
  }
  dispose() {
    this.ownsImageBitmap && this.source instanceof ImageBitmap && this.source.close(), super.dispose(), this._load = null;
  }
  static test(source) {
    return !!globalThis.createImageBitmap && typeof ImageBitmap < "u" && (typeof source == "string" || source instanceof ImageBitmap);
  }
  static get EMPTY() {
    return ImageBitmapResource._EMPTY = ImageBitmapResource._EMPTY ?? settings.ADAPTER.createCanvas(0, 0), ImageBitmapResource._EMPTY;
  }
}

// node_modules/@pixi/core/lib/textures/resources/SVGResource.mjs
var _SVGResource = class _SVGResource2 extends BaseImageResource {
  constructor(sourceBase64, options) {
    options = options || {}, super(settings.ADAPTER.createCanvas()), this._width = 0, this._height = 0, this.svg = sourceBase64, this.scale = options.scale || 1, this._overrideWidth = options.width, this._overrideHeight = options.height, this._resolve = null, this._crossorigin = options.crossorigin, this._load = null, options.autoLoad !== false && this.load();
  }
  load() {
    return this._load ? this._load : (this._load = new Promise((resolve) => {
      if (this._resolve = () => {
        this.update(), resolve(this);
      }, _SVGResource2.SVG_XML.test(this.svg.trim())) {
        if (!btoa)
          throw new Error("Your browser doesn't support base64 conversions.");
        this.svg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.svg)))}`;
      }
      this._loadSvg();
    }), this._load);
  }
  _loadSvg() {
    const tempImage = new Image;
    BaseImageResource.crossOrigin(tempImage, this.svg, this._crossorigin), tempImage.src = this.svg, tempImage.onerror = (event) => {
      this._resolve && (tempImage.onerror = null, this.onError.emit(event));
    }, tempImage.onload = () => {
      if (!this._resolve)
        return;
      const { width: svgWidth, height: svgHeight } = tempImage;
      if (!svgWidth || !svgHeight)
        throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
      let width = svgWidth * this.scale, height = svgHeight * this.scale;
      (this._overrideWidth || this._overrideHeight) && (width = this._overrideWidth || this._overrideHeight / svgHeight * svgWidth, height = this._overrideHeight || this._overrideWidth / svgWidth * svgHeight), width = Math.round(width), height = Math.round(height);
      const canvas = this.source;
      canvas.width = width, canvas.height = height, canvas._pixiId = `canvas_${uid()}`, canvas.getContext("2d").drawImage(tempImage, 0, 0, svgWidth, svgHeight, 0, 0, width, height), this._resolve(), this._resolve = null;
    };
  }
  static getSize(svgString) {
    const sizeMatch = _SVGResource2.SVG_SIZE.exec(svgString), size = {};
    return sizeMatch && (size[sizeMatch[1]] = Math.round(parseFloat(sizeMatch[3])), size[sizeMatch[5]] = Math.round(parseFloat(sizeMatch[7]))), size;
  }
  dispose() {
    super.dispose(), this._resolve = null, this._crossorigin = null;
  }
  static test(source, extension) {
    return extension === "svg" || typeof source == "string" && source.startsWith("data:image/svg+xml") || typeof source == "string" && _SVGResource2.SVG_XML.test(source);
  }
};
_SVGResource.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, _SVGResource.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;
var SVGResource = _SVGResource;

// node_modules/@pixi/core/lib/textures/resources/VideoResource.mjs
var _VideoResource = class _VideoResource2 extends BaseImageResource {
  constructor(source, options) {
    if (options = options || {}, !(source instanceof HTMLVideoElement)) {
      const videoElement = document.createElement("video");
      options.autoLoad !== false && videoElement.setAttribute("preload", "auto"), options.playsinline !== false && (videoElement.setAttribute("webkit-playsinline", ""), videoElement.setAttribute("playsinline", "")), options.muted === true && (videoElement.setAttribute("muted", ""), videoElement.muted = true), options.loop === true && videoElement.setAttribute("loop", ""), options.autoPlay !== false && videoElement.setAttribute("autoplay", ""), typeof source == "string" && (source = [source]);
      const firstSrc = source[0].src || source[0];
      BaseImageResource.crossOrigin(videoElement, firstSrc, options.crossorigin);
      for (let i2 = 0;i2 < source.length; ++i2) {
        const sourceElement = document.createElement("source");
        let { src, mime } = source[i2];
        if (src = src || source[i2], src.startsWith("data:"))
          mime = src.slice(5, src.indexOf(";"));
        else if (!src.startsWith("blob:")) {
          const baseSrc = src.split("?").shift().toLowerCase(), ext = baseSrc.slice(baseSrc.lastIndexOf(".") + 1);
          mime = mime || _VideoResource2.MIME_TYPES[ext] || `video/${ext}`;
        }
        sourceElement.src = src, mime && (sourceElement.type = mime), videoElement.appendChild(sourceElement);
      }
      source = videoElement;
    }
    super(source), this.noSubImage = true, this._autoUpdate = true, this._isConnectedToTicker = false, this._updateFPS = options.updateFPS || 0, this._msToNextUpdate = 0, this.autoPlay = options.autoPlay !== false, this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this), this._videoFrameRequestCallbackHandle = null, this._load = null, this._resolve = null, this._reject = null, this._onCanPlay = this._onCanPlay.bind(this), this._onError = this._onError.bind(this), this._onPlayStart = this._onPlayStart.bind(this), this._onPlayStop = this._onPlayStop.bind(this), this._onSeeked = this._onSeeked.bind(this), options.autoLoad !== false && this.load();
  }
  update(_deltaTime = 0) {
    if (!this.destroyed) {
      if (this._updateFPS) {
        const elapsedMS = Ticker.shared.elapsedMS * this.source.playbackRate;
        this._msToNextUpdate = Math.floor(this._msToNextUpdate - elapsedMS);
      }
      (!this._updateFPS || this._msToNextUpdate <= 0) && (super.update(), this._msToNextUpdate = this._updateFPS ? Math.floor(1000 / this._updateFPS) : 0);
    }
  }
  _videoFrameRequestCallback() {
    this.update(), this.destroyed ? this._videoFrameRequestCallbackHandle = null : this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(this._videoFrameRequestCallback);
  }
  load() {
    if (this._load)
      return this._load;
    const source = this.source;
    return (source.readyState === source.HAVE_ENOUGH_DATA || source.readyState === source.HAVE_FUTURE_DATA) && source.width && source.height && (source.complete = true), source.addEventListener("play", this._onPlayStart), source.addEventListener("pause", this._onPlayStop), source.addEventListener("seeked", this._onSeeked), this._isSourceReady() ? this._onCanPlay() : (source.addEventListener("canplay", this._onCanPlay), source.addEventListener("canplaythrough", this._onCanPlay), source.addEventListener("error", this._onError, true)), this._load = new Promise((resolve, reject) => {
      this.valid ? resolve(this) : (this._resolve = resolve, this._reject = reject, source.load());
    }), this._load;
  }
  _onError(event) {
    this.source.removeEventListener("error", this._onError, true), this.onError.emit(event), this._reject && (this._reject(event), this._reject = null, this._resolve = null);
  }
  _isSourcePlaying() {
    const source = this.source;
    return !source.paused && !source.ended && this._isSourceReady();
  }
  _isSourceReady() {
    return this.source.readyState > 2;
  }
  _onPlayStart() {
    this.valid || this._onCanPlay(), this._configureAutoUpdate();
  }
  _onPlayStop() {
    this._configureAutoUpdate();
  }
  _onSeeked() {
    this._autoUpdate && !this._isSourcePlaying() && (this._msToNextUpdate = 0, this.update(), this._msToNextUpdate = 0);
  }
  _onCanPlay() {
    const source = this.source;
    source.removeEventListener("canplay", this._onCanPlay), source.removeEventListener("canplaythrough", this._onCanPlay);
    const valid = this.valid;
    this._msToNextUpdate = 0, this.update(), this._msToNextUpdate = 0, !valid && this._resolve && (this._resolve(this), this._resolve = null, this._reject = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && source.play();
  }
  dispose() {
    this._configureAutoUpdate();
    const source = this.source;
    source && (source.removeEventListener("play", this._onPlayStart), source.removeEventListener("pause", this._onPlayStop), source.removeEventListener("seeked", this._onSeeked), source.removeEventListener("canplay", this._onCanPlay), source.removeEventListener("canplaythrough", this._onCanPlay), source.removeEventListener("error", this._onError, true), source.pause(), source.src = "", source.load()), super.dispose();
  }
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(value) {
    value !== this._autoUpdate && (this._autoUpdate = value, this._configureAutoUpdate());
  }
  get updateFPS() {
    return this._updateFPS;
  }
  set updateFPS(value) {
    value !== this._updateFPS && (this._updateFPS = value, this._configureAutoUpdate());
  }
  _configureAutoUpdate() {
    this._autoUpdate && this._isSourcePlaying() ? !this._updateFPS && this.source.requestVideoFrameCallback ? (this._isConnectedToTicker && (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = false, this._msToNextUpdate = 0), this._videoFrameRequestCallbackHandle === null && (this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(this._videoFrameRequestCallback))) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker || (Ticker.shared.add(this.update, this), this._isConnectedToTicker = true, this._msToNextUpdate = 0)) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker && (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = false, this._msToNextUpdate = 0));
  }
  static test(source, extension) {
    return globalThis.HTMLVideoElement && source instanceof HTMLVideoElement || _VideoResource2.TYPES.includes(extension);
  }
};
_VideoResource.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"], _VideoResource.MIME_TYPES = {
  ogv: "video/ogg",
  mov: "video/quicktime",
  m4v: "video/mp4"
};
var VideoResource = _VideoResource;

// node_modules/@pixi/core/lib/textures/resources/index.mjs
INSTALLED.push(ImageBitmapResource, ImageResource, CanvasResource, VideoResource, SVGResource, BufferResource, CubeResource, ArrayResource);

// node_modules/@pixi/display/lib/Bounds.mjs
class Bounds {
  constructor() {
    this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.rect = null, this.updateID = -1;
  }
  isEmpty() {
    return this.minX > this.maxX || this.minY > this.maxY;
  }
  clear() {
    this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0;
  }
  getRectangle(rect) {
    return this.minX > this.maxX || this.minY > this.maxY ? Rectangle.EMPTY : (rect = rect || new Rectangle(0, 0, 1, 1), rect.x = this.minX, rect.y = this.minY, rect.width = this.maxX - this.minX, rect.height = this.maxY - this.minY, rect);
  }
  addPoint(point) {
    this.minX = Math.min(this.minX, point.x), this.maxX = Math.max(this.maxX, point.x), this.minY = Math.min(this.minY, point.y), this.maxY = Math.max(this.maxY, point.y);
  }
  addPointMatrix(matrix, point) {
    const { a: a2, b: b2, c: c2, d: d2, tx, ty } = matrix, x2 = a2 * point.x + c2 * point.y + tx, y2 = b2 * point.x + d2 * point.y + ty;
    this.minX = Math.min(this.minX, x2), this.maxX = Math.max(this.maxX, x2), this.minY = Math.min(this.minY, y2), this.maxY = Math.max(this.maxY, y2);
  }
  addQuad(vertices) {
    let minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY, x2 = vertices[0], y2 = vertices[1];
    minX = x2 < minX ? x2 : minX, minY = y2 < minY ? y2 : minY, maxX = x2 > maxX ? x2 : maxX, maxY = y2 > maxY ? y2 : maxY, x2 = vertices[2], y2 = vertices[3], minX = x2 < minX ? x2 : minX, minY = y2 < minY ? y2 : minY, maxX = x2 > maxX ? x2 : maxX, maxY = y2 > maxY ? y2 : maxY, x2 = vertices[4], y2 = vertices[5], minX = x2 < minX ? x2 : minX, minY = y2 < minY ? y2 : minY, maxX = x2 > maxX ? x2 : maxX, maxY = y2 > maxY ? y2 : maxY, x2 = vertices[6], y2 = vertices[7], minX = x2 < minX ? x2 : minX, minY = y2 < minY ? y2 : minY, maxX = x2 > maxX ? x2 : maxX, maxY = y2 > maxY ? y2 : maxY, this.minX = minX, this.minY = minY, this.maxX = maxX, this.maxY = maxY;
  }
  addFrame(transform, x0, y0, x1, y1) {
    this.addFrameMatrix(transform.worldTransform, x0, y0, x1, y1);
  }
  addFrameMatrix(matrix, x0, y0, x1, y1) {
    const { a: a2, b: b2, c: c2, d: d2, tx, ty } = matrix;
    let minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY, x2 = a2 * x0 + c2 * y0 + tx, y2 = b2 * x0 + d2 * y0 + ty;
    minX = x2 < minX ? x2 : minX, minY = y2 < minY ? y2 : minY, maxX = x2 > maxX ? x2 : maxX, maxY = y2 > maxY ? y2 : maxY, x2 = a2 * x1 + c2 * y0 + tx, y2 = b2 * x1 + d2 * y0 + ty, minX = x2 < minX ? x2 : minX, minY = y2 < minY ? y2 : minY, maxX = x2 > maxX ? x2 : maxX, maxY = y2 > maxY ? y2 : maxY, x2 = a2 * x0 + c2 * y1 + tx, y2 = b2 * x0 + d2 * y1 + ty, minX = x2 < minX ? x2 : minX, minY = y2 < minY ? y2 : minY, maxX = x2 > maxX ? x2 : maxX, maxY = y2 > maxY ? y2 : maxY, x2 = a2 * x1 + c2 * y1 + tx, y2 = b2 * x1 + d2 * y1 + ty, minX = x2 < minX ? x2 : minX, minY = y2 < minY ? y2 : minY, maxX = x2 > maxX ? x2 : maxX, maxY = y2 > maxY ? y2 : maxY, this.minX = minX, this.minY = minY, this.maxX = maxX, this.maxY = maxY;
  }
  addVertexData(vertexData, beginOffset, endOffset) {
    let minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY;
    for (let i2 = beginOffset;i2 < endOffset; i2 += 2) {
      const x2 = vertexData[i2], y2 = vertexData[i2 + 1];
      minX = x2 < minX ? x2 : minX, minY = y2 < minY ? y2 : minY, maxX = x2 > maxX ? x2 : maxX, maxY = y2 > maxY ? y2 : maxY;
    }
    this.minX = minX, this.minY = minY, this.maxX = maxX, this.maxY = maxY;
  }
  addVertices(transform, vertices, beginOffset, endOffset) {
    this.addVerticesMatrix(transform.worldTransform, vertices, beginOffset, endOffset);
  }
  addVerticesMatrix(matrix, vertices, beginOffset, endOffset, padX = 0, padY = padX) {
    const { a: a2, b: b2, c: c2, d: d2, tx, ty } = matrix;
    let minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY;
    for (let i2 = beginOffset;i2 < endOffset; i2 += 2) {
      const rawX = vertices[i2], rawY = vertices[i2 + 1], x2 = a2 * rawX + c2 * rawY + tx, y2 = d2 * rawY + b2 * rawX + ty;
      minX = Math.min(minX, x2 - padX), maxX = Math.max(maxX, x2 + padX), minY = Math.min(minY, y2 - padY), maxY = Math.max(maxY, y2 + padY);
    }
    this.minX = minX, this.minY = minY, this.maxX = maxX, this.maxY = maxY;
  }
  addBounds(bounds) {
    const minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY;
    this.minX = bounds.minX < minX ? bounds.minX : minX, this.minY = bounds.minY < minY ? bounds.minY : minY, this.maxX = bounds.maxX > maxX ? bounds.maxX : maxX, this.maxY = bounds.maxY > maxY ? bounds.maxY : maxY;
  }
  addBoundsMask(bounds, mask) {
    const _minX = bounds.minX > mask.minX ? bounds.minX : mask.minX, _minY = bounds.minY > mask.minY ? bounds.minY : mask.minY, _maxX = bounds.maxX < mask.maxX ? bounds.maxX : mask.maxX, _maxY = bounds.maxY < mask.maxY ? bounds.maxY : mask.maxY;
    if (_minX <= _maxX && _minY <= _maxY) {
      const minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY;
      this.minX = _minX < minX ? _minX : minX, this.minY = _minY < minY ? _minY : minY, this.maxX = _maxX > maxX ? _maxX : maxX, this.maxY = _maxY > maxY ? _maxY : maxY;
    }
  }
  addBoundsMatrix(bounds, matrix) {
    this.addFrameMatrix(matrix, bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
  }
  addBoundsArea(bounds, area) {
    const _minX = bounds.minX > area.x ? bounds.minX : area.x, _minY = bounds.minY > area.y ? bounds.minY : area.y, _maxX = bounds.maxX < area.x + area.width ? bounds.maxX : area.x + area.width, _maxY = bounds.maxY < area.y + area.height ? bounds.maxY : area.y + area.height;
    if (_minX <= _maxX && _minY <= _maxY) {
      const minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY;
      this.minX = _minX < minX ? _minX : minX, this.minY = _minY < minY ? _minY : minY, this.maxX = _maxX > maxX ? _maxX : maxX, this.maxY = _maxY > maxY ? _maxY : maxY;
    }
  }
  pad(paddingX = 0, paddingY = paddingX) {
    this.isEmpty() || (this.minX -= paddingX, this.maxX += paddingX, this.minY -= paddingY, this.maxY += paddingY);
  }
  addFramePad(x0, y0, x1, y1, padX, padY) {
    x0 -= padX, y0 -= padY, x1 += padX, y1 += padY, this.minX = this.minX < x0 ? this.minX : x0, this.maxX = this.maxX > x1 ? this.maxX : x1, this.minY = this.minY < y0 ? this.minY : y0, this.maxY = this.maxY > y1 ? this.maxY : y1;
  }
}

// node_modules/@pixi/display/lib/DisplayObject.mjs
class DisplayObject extends exports_lib.EventEmitter {
  constructor() {
    super(), this.tempDisplayObjectParent = null, this.transform = new Transform, this.alpha = 1, this.visible = true, this.renderable = true, this.cullable = false, this.cullArea = null, this.parent = null, this.worldAlpha = 1, this._lastSortedIndex = 0, this._zIndex = 0, this.filterArea = null, this.filters = null, this._enabledFilters = null, this._bounds = new Bounds, this._localBounds = null, this._boundsID = 0, this._boundsRect = null, this._localBoundsRect = null, this._mask = null, this._maskRefCount = 0, this._destroyed = false, this.isSprite = false, this.isMask = false;
  }
  static mixin(source) {
    const keys = Object.keys(source);
    for (let i2 = 0;i2 < keys.length; ++i2) {
      const propertyName = keys[i2];
      Object.defineProperty(DisplayObject.prototype, propertyName, Object.getOwnPropertyDescriptor(source, propertyName));
    }
  }
  get destroyed() {
    return this._destroyed;
  }
  _recursivePostUpdateTransform() {
    this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform);
  }
  updateTransform() {
    this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
  }
  getBounds(skipUpdate, rect) {
    return skipUpdate || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._bounds.updateID !== this._boundsID && (this.calculateBounds(), this._bounds.updateID = this._boundsID), rect || (this._boundsRect || (this._boundsRect = new Rectangle), rect = this._boundsRect), this._bounds.getRectangle(rect);
  }
  getLocalBounds(rect) {
    rect || (this._localBoundsRect || (this._localBoundsRect = new Rectangle), rect = this._localBoundsRect), this._localBounds || (this._localBounds = new Bounds);
    const transformRef = this.transform, parentRef = this.parent;
    this.parent = null, this._tempDisplayObjectParent.worldAlpha = parentRef?.worldAlpha ?? 1, this.transform = this._tempDisplayObjectParent.transform;
    const worldBounds = this._bounds, worldBoundsID = this._boundsID;
    this._bounds = this._localBounds;
    const bounds = this.getBounds(false, rect);
    return this.parent = parentRef, this.transform = transformRef, this._bounds = worldBounds, this._bounds.updateID += this._boundsID - worldBoundsID, bounds;
  }
  toGlobal(position, point, skipUpdate = false) {
    return skipUpdate || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(position, point);
  }
  toLocal(position, from, point, skipUpdate) {
    return from && (position = from.toGlobal(position, point, skipUpdate)), skipUpdate || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(position, point);
  }
  setParent(container) {
    if (!container || !container.addChild)
      throw new Error("setParent: Argument must be a Container");
    return container.addChild(this), container;
  }
  removeFromParent() {
    this.parent?.removeChild(this);
  }
  setTransform(x2 = 0, y2 = 0, scaleX = 1, scaleY = 1, rotation = 0, skewX = 0, skewY = 0, pivotX = 0, pivotY = 0) {
    return this.position.x = x2, this.position.y = y2, this.scale.x = scaleX || 1, this.scale.y = scaleY || 1, this.rotation = rotation, this.skew.x = skewX, this.skew.y = skewY, this.pivot.x = pivotX, this.pivot.y = pivotY, this;
  }
  destroy(_options) {
    this.removeFromParent(), this._destroyed = true, this.transform = null, this.parent = null, this._bounds = null, this.mask = null, this.cullArea = null, this.filters = null, this.filterArea = null, this.hitArea = null, this.eventMode = "auto", this.interactiveChildren = false, this.emit("destroyed"), this.removeAllListeners();
  }
  get _tempDisplayObjectParent() {
    return this.tempDisplayObjectParent === null && (this.tempDisplayObjectParent = new TemporaryDisplayObject), this.tempDisplayObjectParent;
  }
  enableTempParent() {
    const myParent = this.parent;
    return this.parent = this._tempDisplayObjectParent, myParent;
  }
  disableTempParent(cacheParent) {
    this.parent = cacheParent;
  }
  get x() {
    return this.position.x;
  }
  set x(value) {
    this.transform.position.x = value;
  }
  get y() {
    return this.position.y;
  }
  set y(value) {
    this.transform.position.y = value;
  }
  get worldTransform() {
    return this.transform.worldTransform;
  }
  get localTransform() {
    return this.transform.localTransform;
  }
  get position() {
    return this.transform.position;
  }
  set position(value) {
    this.transform.position.copyFrom(value);
  }
  get scale() {
    return this.transform.scale;
  }
  set scale(value) {
    this.transform.scale.copyFrom(value);
  }
  get pivot() {
    return this.transform.pivot;
  }
  set pivot(value) {
    this.transform.pivot.copyFrom(value);
  }
  get skew() {
    return this.transform.skew;
  }
  set skew(value) {
    this.transform.skew.copyFrom(value);
  }
  get rotation() {
    return this.transform.rotation;
  }
  set rotation(value) {
    this.transform.rotation = value;
  }
  get angle() {
    return this.transform.rotation * RAD_TO_DEG;
  }
  set angle(value) {
    this.transform.rotation = value * DEG_TO_RAD;
  }
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(value) {
    this._zIndex = value, this.parent && (this.parent.sortDirty = true);
  }
  get worldVisible() {
    let item = this;
    do {
      if (!item.visible)
        return false;
      item = item.parent;
    } while (item);
    return true;
  }
  get mask() {
    return this._mask;
  }
  set mask(value) {
    if (this._mask !== value) {
      if (this._mask) {
        const maskObject = this._mask.isMaskData ? this._mask.maskObject : this._mask;
        maskObject && (maskObject._maskRefCount--, maskObject._maskRefCount === 0 && (maskObject.renderable = true, maskObject.isMask = false));
      }
      if (this._mask = value, this._mask) {
        const maskObject = this._mask.isMaskData ? this._mask.maskObject : this._mask;
        maskObject && (maskObject._maskRefCount === 0 && (maskObject.renderable = false, maskObject.isMask = true), maskObject._maskRefCount++);
      }
    }
  }
}

class TemporaryDisplayObject extends DisplayObject {
  constructor() {
    super(...arguments), this.sortDirty = null;
  }
}
DisplayObject.prototype.displayObjectUpdateTransform = DisplayObject.prototype.updateTransform;

// node_modules/@pixi/display/lib/Container.mjs
var sortChildren = function(a2, b2) {
  return a2.zIndex === b2.zIndex ? a2._lastSortedIndex - b2._lastSortedIndex : a2.zIndex - b2.zIndex;
};
var tempMatrix3 = new Matrix;
var _Container = class _Container2 extends DisplayObject {
  constructor() {
    super(), this.children = [], this.sortableChildren = _Container2.defaultSortableChildren, this.sortDirty = false;
  }
  onChildrenChange(_length) {
  }
  addChild(...children) {
    if (children.length > 1)
      for (let i2 = 0;i2 < children.length; i2++)
        this.addChild(children[i2]);
    else {
      const child = children[0];
      child.parent && child.parent.removeChild(child), child.parent = this, this.sortDirty = true, child.transform._parentID = -1, this.children.push(child), this._boundsID++, this.onChildrenChange(this.children.length - 1), this.emit("childAdded", child, this, this.children.length - 1), child.emit("added", this);
    }
    return children[0];
  }
  addChildAt(child, index) {
    if (index < 0 || index > this.children.length)
      throw new Error(`${child}addChildAt: The index ${index} supplied is out of bounds ${this.children.length}`);
    return child.parent && child.parent.removeChild(child), child.parent = this, this.sortDirty = true, child.transform._parentID = -1, this.children.splice(index, 0, child), this._boundsID++, this.onChildrenChange(index), child.emit("added", this), this.emit("childAdded", child, this, index), child;
  }
  swapChildren(child, child2) {
    if (child === child2)
      return;
    const index1 = this.getChildIndex(child), index2 = this.getChildIndex(child2);
    this.children[index1] = child2, this.children[index2] = child, this.onChildrenChange(index1 < index2 ? index1 : index2);
  }
  getChildIndex(child) {
    const index = this.children.indexOf(child);
    if (index === -1)
      throw new Error("The supplied DisplayObject must be a child of the caller");
    return index;
  }
  setChildIndex(child, index) {
    if (index < 0 || index >= this.children.length)
      throw new Error(`The index ${index} supplied is out of bounds ${this.children.length}`);
    const currentIndex = this.getChildIndex(child);
    exports_lib.removeItems(this.children, currentIndex, 1), this.children.splice(index, 0, child), this.onChildrenChange(index);
  }
  getChildAt(index) {
    if (index < 0 || index >= this.children.length)
      throw new Error(`getChildAt: Index (${index}) does not exist.`);
    return this.children[index];
  }
  removeChild(...children) {
    if (children.length > 1)
      for (let i2 = 0;i2 < children.length; i2++)
        this.removeChild(children[i2]);
    else {
      const child = children[0], index = this.children.indexOf(child);
      if (index === -1)
        return null;
      child.parent = null, child.transform._parentID = -1, exports_lib.removeItems(this.children, index, 1), this._boundsID++, this.onChildrenChange(index), child.emit("removed", this), this.emit("childRemoved", child, this, index);
    }
    return children[0];
  }
  removeChildAt(index) {
    const child = this.getChildAt(index);
    return child.parent = null, child.transform._parentID = -1, exports_lib.removeItems(this.children, index, 1), this._boundsID++, this.onChildrenChange(index), child.emit("removed", this), this.emit("childRemoved", child, this, index), child;
  }
  removeChildren(beginIndex = 0, endIndex = this.children.length) {
    const begin = beginIndex, end = endIndex, range = end - begin;
    let removed;
    if (range > 0 && range <= end) {
      removed = this.children.splice(begin, range);
      for (let i2 = 0;i2 < removed.length; ++i2)
        removed[i2].parent = null, removed[i2].transform && (removed[i2].transform._parentID = -1);
      this._boundsID++, this.onChildrenChange(beginIndex);
      for (let i2 = 0;i2 < removed.length; ++i2)
        removed[i2].emit("removed", this), this.emit("childRemoved", removed[i2], this, i2);
      return removed;
    } else if (range === 0 && this.children.length === 0)
      return [];
    throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
  }
  sortChildren() {
    let sortRequired = false;
    for (let i2 = 0, j2 = this.children.length;i2 < j2; ++i2) {
      const child = this.children[i2];
      child._lastSortedIndex = i2, !sortRequired && child.zIndex !== 0 && (sortRequired = true);
    }
    sortRequired && this.children.length > 1 && this.children.sort(sortChildren), this.sortDirty = false;
  }
  updateTransform() {
    this.sortableChildren && this.sortDirty && this.sortChildren(), this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
    for (let i2 = 0, j2 = this.children.length;i2 < j2; ++i2) {
      const child = this.children[i2];
      child.visible && child.updateTransform();
    }
  }
  calculateBounds() {
    this._bounds.clear(), this._calculateBounds();
    for (let i2 = 0;i2 < this.children.length; i2++) {
      const child = this.children[i2];
      if (!(!child.visible || !child.renderable))
        if (child.calculateBounds(), child._mask) {
          const maskObject = child._mask.isMaskData ? child._mask.maskObject : child._mask;
          maskObject ? (maskObject.calculateBounds(), this._bounds.addBoundsMask(child._bounds, maskObject._bounds)) : this._bounds.addBounds(child._bounds);
        } else
          child.filterArea ? this._bounds.addBoundsArea(child._bounds, child.filterArea) : this._bounds.addBounds(child._bounds);
    }
    this._bounds.updateID = this._boundsID;
  }
  getLocalBounds(rect, skipChildrenUpdate = false) {
    const result = super.getLocalBounds(rect);
    if (!skipChildrenUpdate)
      for (let i2 = 0, j2 = this.children.length;i2 < j2; ++i2) {
        const child = this.children[i2];
        child.visible && child.updateTransform();
      }
    return result;
  }
  _calculateBounds() {
  }
  _renderWithCulling(renderer) {
    const sourceFrame = renderer.renderTexture.sourceFrame;
    if (!(sourceFrame.width > 0 && sourceFrame.height > 0))
      return;
    let bounds, transform;
    this.cullArea ? (bounds = this.cullArea, transform = this.worldTransform) : this._render !== _Container2.prototype._render && (bounds = this.getBounds(true));
    const projectionTransform = renderer.projection.transform;
    if (projectionTransform && (transform ? (transform = tempMatrix3.copyFrom(transform), transform.prepend(projectionTransform)) : transform = projectionTransform), bounds && sourceFrame.intersects(bounds, transform))
      this._render(renderer);
    else if (this.cullArea)
      return;
    for (let i2 = 0, j2 = this.children.length;i2 < j2; ++i2) {
      const child = this.children[i2], childCullable = child.cullable;
      child.cullable = childCullable || !this.cullArea, child.render(renderer), child.cullable = childCullable;
    }
  }
  render(renderer) {
    if (!(!this.visible || this.worldAlpha <= 0 || !this.renderable))
      if (this._mask || this.filters?.length)
        this.renderAdvanced(renderer);
      else if (this.cullable)
        this._renderWithCulling(renderer);
      else {
        this._render(renderer);
        for (let i2 = 0, j2 = this.children.length;i2 < j2; ++i2)
          this.children[i2].render(renderer);
      }
  }
  renderAdvanced(renderer) {
    const filters = this.filters, mask = this._mask;
    if (filters) {
      this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
      for (let i2 = 0;i2 < filters.length; i2++)
        filters[i2].enabled && this._enabledFilters.push(filters[i2]);
    }
    const flush = filters && this._enabledFilters?.length || mask && (!mask.isMaskData || mask.enabled && (mask.autoDetect || mask.type !== MASK_TYPES.NONE));
    if (flush && renderer.batch.flush(), filters && this._enabledFilters?.length && renderer.filter.push(this, this._enabledFilters), mask && renderer.mask.push(this, this._mask), this.cullable)
      this._renderWithCulling(renderer);
    else {
      this._render(renderer);
      for (let i2 = 0, j2 = this.children.length;i2 < j2; ++i2)
        this.children[i2].render(renderer);
    }
    flush && renderer.batch.flush(), mask && renderer.mask.pop(this), filters && this._enabledFilters?.length && renderer.filter.pop();
  }
  _render(_renderer) {
  }
  destroy(options) {
    super.destroy(), this.sortDirty = false;
    const destroyChildren = typeof options == "boolean" ? options : options?.children, oldChildren = this.removeChildren(0, this.children.length);
    if (destroyChildren)
      for (let i2 = 0;i2 < oldChildren.length; ++i2)
        oldChildren[i2].destroy(options);
  }
  get width() {
    return this.scale.x * this.getLocalBounds().width;
  }
  set width(value) {
    const width = this.getLocalBounds().width;
    width !== 0 ? this.scale.x = value / width : this.scale.x = 1, this._width = value;
  }
  get height() {
    return this.scale.y * this.getLocalBounds().height;
  }
  set height(value) {
    const height = this.getLocalBounds().height;
    height !== 0 ? this.scale.y = value / height : this.scale.y = 1, this._height = value;
  }
};
_Container.defaultSortableChildren = false;
var Container = _Container;
Container.prototype.containerUpdateTransform = Container.prototype.updateTransform;

// node_modules/@pixi/display/lib/settings.mjs
Object.defineProperties(settings, {
  SORTABLE_CHILDREN: {
    get() {
      return Container.defaultSortableChildren;
    },
    set(value) {
      exports_lib.deprecation("7.1.0", "settings.SORTABLE_CHILDREN is deprecated, use Container.defaultSortableChildren"), Container.defaultSortableChildren = value;
    }
  }
});

// node_modules/@pixi/sprite/lib/Sprite.mjs
var tempPoint = new Point;
var indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

class Sprite extends Container {
  constructor(texture) {
    super(), this._anchor = new ObservablePoint(this._onAnchorUpdate, this, texture ? texture.defaultAnchor.x : 0, texture ? texture.defaultAnchor.y : 0), this._texture = null, this._width = 0, this._height = 0, this._tintColor = new Color(16777215), this._tintRGB = null, this.tint = 16777215, this.blendMode = BLEND_MODES.NORMAL, this._cachedTint = 16777215, this.uvs = null, this.texture = texture || Texture.EMPTY, this.vertexData = new Float32Array(8), this.vertexTrimmedData = null, this._transformID = -1, this._textureID = -1, this._transformTrimmedID = -1, this._textureTrimmedID = -1, this.indices = indices, this.pluginName = "batch", this.isSprite = true, this._roundPixels = settings.ROUND_PIXELS;
  }
  _onTextureUpdate() {
    this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this._width && (this.scale.x = exports_lib.sign(this.scale.x) * this._width / this._texture.orig.width), this._height && (this.scale.y = exports_lib.sign(this.scale.y) * this._height / this._texture.orig.height);
  }
  _onAnchorUpdate() {
    this._transformID = -1, this._transformTrimmedID = -1;
  }
  calculateVertices() {
    const texture = this._texture;
    if (this._transformID === this.transform._worldID && this._textureID === texture._updateID)
      return;
    this._textureID !== texture._updateID && (this.uvs = this._texture._uvs.uvsFloat32), this._transformID = this.transform._worldID, this._textureID = texture._updateID;
    const wt = this.transform.worldTransform, a2 = wt.a, b2 = wt.b, c2 = wt.c, d2 = wt.d, tx = wt.tx, ty = wt.ty, vertexData = this.vertexData, trim = texture.trim, orig = texture.orig, anchor = this._anchor;
    let w0 = 0, w1 = 0, h0 = 0, h1 = 0;
    if (trim ? (w1 = trim.x - anchor._x * orig.width, w0 = w1 + trim.width, h1 = trim.y - anchor._y * orig.height, h0 = h1 + trim.height) : (w1 = -anchor._x * orig.width, w0 = w1 + orig.width, h1 = -anchor._y * orig.height, h0 = h1 + orig.height), vertexData[0] = a2 * w1 + c2 * h1 + tx, vertexData[1] = d2 * h1 + b2 * w1 + ty, vertexData[2] = a2 * w0 + c2 * h1 + tx, vertexData[3] = d2 * h1 + b2 * w0 + ty, vertexData[4] = a2 * w0 + c2 * h0 + tx, vertexData[5] = d2 * h0 + b2 * w0 + ty, vertexData[6] = a2 * w1 + c2 * h0 + tx, vertexData[7] = d2 * h0 + b2 * w1 + ty, this._roundPixels) {
      const resolution = settings.RESOLUTION;
      for (let i2 = 0;i2 < vertexData.length; ++i2)
        vertexData[i2] = Math.round(vertexData[i2] * resolution) / resolution;
    }
  }
  calculateTrimmedVertices() {
    if (!this.vertexTrimmedData)
      this.vertexTrimmedData = new Float32Array(8);
    else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID)
      return;
    this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;
    const texture = this._texture, vertexData = this.vertexTrimmedData, orig = texture.orig, anchor = this._anchor, wt = this.transform.worldTransform, a2 = wt.a, b2 = wt.b, c2 = wt.c, d2 = wt.d, tx = wt.tx, ty = wt.ty, w1 = -anchor._x * orig.width, w0 = w1 + orig.width, h1 = -anchor._y * orig.height, h0 = h1 + orig.height;
    if (vertexData[0] = a2 * w1 + c2 * h1 + tx, vertexData[1] = d2 * h1 + b2 * w1 + ty, vertexData[2] = a2 * w0 + c2 * h1 + tx, vertexData[3] = d2 * h1 + b2 * w0 + ty, vertexData[4] = a2 * w0 + c2 * h0 + tx, vertexData[5] = d2 * h0 + b2 * w0 + ty, vertexData[6] = a2 * w1 + c2 * h0 + tx, vertexData[7] = d2 * h0 + b2 * w1 + ty, this._roundPixels) {
      const resolution = settings.RESOLUTION;
      for (let i2 = 0;i2 < vertexData.length; ++i2)
        vertexData[i2] = Math.round(vertexData[i2] * resolution) / resolution;
    }
  }
  _render(renderer) {
    this.calculateVertices(), renderer.batch.setObjectRenderer(renderer.plugins[this.pluginName]), renderer.plugins[this.pluginName].render(this);
  }
  _calculateBounds() {
    const trim = this._texture.trim, orig = this._texture.orig;
    !trim || trim.width === orig.width && trim.height === orig.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData));
  }
  getLocalBounds(rect) {
    return this.children.length === 0 ? (this._localBounds || (this._localBounds = new Bounds), this._localBounds.minX = this._texture.orig.width * -this._anchor._x, this._localBounds.minY = this._texture.orig.height * -this._anchor._y, this._localBounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._localBounds.maxY = this._texture.orig.height * (1 - this._anchor._y), rect || (this._localBoundsRect || (this._localBoundsRect = new Rectangle), rect = this._localBoundsRect), this._localBounds.getRectangle(rect)) : super.getLocalBounds.call(this, rect);
  }
  containsPoint(point) {
    this.worldTransform.applyInverse(point, tempPoint);
    const width = this._texture.orig.width, height = this._texture.orig.height, x1 = -width * this.anchor.x;
    let y1 = 0;
    return tempPoint.x >= x1 && tempPoint.x < x1 + width && (y1 = -height * this.anchor.y, tempPoint.y >= y1 && tempPoint.y < y1 + height);
  }
  destroy(options) {
    if (super.destroy(options), this._texture.off("update", this._onTextureUpdate, this), this._anchor = null, typeof options == "boolean" ? options : options?.texture) {
      const destroyBaseTexture = typeof options == "boolean" ? options : options?.baseTexture;
      this._texture.destroy(!!destroyBaseTexture);
    }
    this._texture = null;
  }
  static from(source, options) {
    const texture = source instanceof Texture ? source : Texture.from(source, options);
    return new Sprite(texture);
  }
  set roundPixels(value) {
    this._roundPixels !== value && (this._transformID = -1, this._transformTrimmedID = -1), this._roundPixels = value;
  }
  get roundPixels() {
    return this._roundPixels;
  }
  get width() {
    return Math.abs(this.scale.x) * this._texture.orig.width;
  }
  set width(value) {
    const s2 = exports_lib.sign(this.scale.x) || 1;
    this.scale.x = s2 * value / this._texture.orig.width, this._width = value;
  }
  get height() {
    return Math.abs(this.scale.y) * this._texture.orig.height;
  }
  set height(value) {
    const s2 = exports_lib.sign(this.scale.y) || 1;
    this.scale.y = s2 * value / this._texture.orig.height, this._height = value;
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(value) {
    this._anchor.copyFrom(value);
  }
  get tint() {
    return this._tintColor.value;
  }
  set tint(value) {
    this._tintColor.setValue(value), this._tintRGB = this._tintColor.toLittleEndianNumber();
  }
  get tintValue() {
    return this._tintColor.toNumber();
  }
  get texture() {
    return this._texture;
  }
  set texture(value) {
    this._texture !== value && (this._texture && this._texture.off("update", this._onTextureUpdate, this), this._texture = value || Texture.EMPTY, this._cachedTint = 16777215, this._textureID = -1, this._textureTrimmedID = -1, value && (value.baseTexture.valid ? this._onTextureUpdate() : value.once("update", this._onTextureUpdate, this)));
  }
}

// node_modules/@pixi/mixin-cache-as-bitmap/lib/index.mjs
var _tempMatrix = new Matrix;
DisplayObject.prototype._cacheAsBitmap = false;
DisplayObject.prototype._cacheData = null;
DisplayObject.prototype._cacheAsBitmapResolution = null;
DisplayObject.prototype._cacheAsBitmapMultisample = null;

class CacheData {
  constructor() {
    this.textureCacheId = null, this.originalRender = null, this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, this.originalUpdateTransform = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.originalContainsPoint = null, this.sprite = null;
  }
}
Object.defineProperties(DisplayObject.prototype, {
  cacheAsBitmapResolution: {
    get() {
      return this._cacheAsBitmapResolution;
    },
    set(resolution) {
      resolution !== this._cacheAsBitmapResolution && (this._cacheAsBitmapResolution = resolution, this.cacheAsBitmap && (this.cacheAsBitmap = false, this.cacheAsBitmap = true));
    }
  },
  cacheAsBitmapMultisample: {
    get() {
      return this._cacheAsBitmapMultisample;
    },
    set(multisample) {
      multisample !== this._cacheAsBitmapMultisample && (this._cacheAsBitmapMultisample = multisample, this.cacheAsBitmap && (this.cacheAsBitmap = false, this.cacheAsBitmap = true));
    }
  },
  cacheAsBitmap: {
    get() {
      return this._cacheAsBitmap;
    },
    set(value) {
      if (this._cacheAsBitmap === value)
        return;
      this._cacheAsBitmap = value;
      let data;
      value ? (this._cacheData || (this._cacheData = new CacheData), data = this._cacheData, data.originalRender = this.render, data.originalRenderCanvas = this.renderCanvas, data.originalUpdateTransform = this.updateTransform, data.originalCalculateBounds = this.calculateBounds, data.originalGetLocalBounds = this.getLocalBounds, data.originalDestroy = this.destroy, data.originalContainsPoint = this.containsPoint, data.originalMask = this._mask, data.originalFilterArea = this.filterArea, this.render = this._renderCached, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (data = this._cacheData, data.sprite && this._destroyCachedDisplayObject(), this.render = data.originalRender, this.renderCanvas = data.originalRenderCanvas, this.calculateBounds = data.originalCalculateBounds, this.getLocalBounds = data.originalGetLocalBounds, this.destroy = data.originalDestroy, this.updateTransform = data.originalUpdateTransform, this.containsPoint = data.originalContainsPoint, this._mask = data.originalMask, this.filterArea = data.originalFilterArea);
    }
  }
});
DisplayObject.prototype._renderCached = function(renderer) {
  !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(renderer), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._render(renderer));
};
DisplayObject.prototype._initCachedDisplayObject = function(renderer) {
  if (this._cacheData?.sprite)
    return;
  const cacheAlpha = this.alpha;
  this.alpha = 1, renderer.batch.flush();
  const bounds = this.getLocalBounds(new Rectangle, true);
  if (this.filters?.length) {
    const padding = this.filters[0].padding;
    bounds.pad(padding);
  }
  const resolution = this.cacheAsBitmapResolution || renderer.resolution;
  bounds.ceil(resolution), bounds.width = Math.max(bounds.width, 1 / resolution), bounds.height = Math.max(bounds.height, 1 / resolution);
  const cachedRenderTexture = renderer.renderTexture.current, cachedSourceFrame = renderer.renderTexture.sourceFrame.clone(), cachedDestinationFrame = renderer.renderTexture.destinationFrame.clone(), cachedProjectionTransform = renderer.projection.transform, renderTexture = RenderTexture.create({
    width: bounds.width,
    height: bounds.height,
    resolution,
    multisample: this.cacheAsBitmapMultisample ?? renderer.multisample
  }), textureCacheId = `cacheAsBitmap_${exports_lib.uid()}`;
  this._cacheData.textureCacheId = textureCacheId, BaseTexture.addToCache(renderTexture.baseTexture, textureCacheId), Texture.addToCache(renderTexture, textureCacheId);
  const m3 = this.transform.localTransform.copyTo(_tempMatrix).invert().translate(-bounds.x, -bounds.y);
  this.render = this._cacheData.originalRender, renderer.render(this, { renderTexture, clear: true, transform: m3, skipUpdateTransform: false }), renderer.framebuffer.blit(), renderer.projection.transform = cachedProjectionTransform, renderer.renderTexture.bind(cachedRenderTexture, cachedSourceFrame, cachedDestinationFrame), this.render = this._renderCached, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = cacheAlpha;
  const cachedSprite = new Sprite(renderTexture);
  cachedSprite.transform.worldTransform = this.transform.worldTransform, cachedSprite.anchor.x = -(bounds.x / bounds.width), cachedSprite.anchor.y = -(bounds.y / bounds.height), cachedSprite.alpha = cacheAlpha, cachedSprite._bounds = this._bounds, this._cacheData.sprite = cachedSprite, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.enableTempParent(), this.updateTransform(), this.disableTempParent(null)), this.containsPoint = cachedSprite.containsPoint.bind(cachedSprite);
};
DisplayObject.prototype._renderCachedCanvas = function(renderer) {
  !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(renderer), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderCanvas(renderer));
};
DisplayObject.prototype._initCachedDisplayObjectCanvas = function(renderer) {
  if (this._cacheData?.sprite)
    return;
  const bounds = this.getLocalBounds(new Rectangle, true), cacheAlpha = this.alpha;
  this.alpha = 1;
  const cachedRenderTarget = renderer.canvasContext.activeContext, cachedProjectionTransform = renderer._projTransform, resolution = this.cacheAsBitmapResolution || renderer.resolution;
  bounds.ceil(resolution), bounds.width = Math.max(bounds.width, 1 / resolution), bounds.height = Math.max(bounds.height, 1 / resolution);
  const renderTexture = RenderTexture.create({
    width: bounds.width,
    height: bounds.height,
    resolution
  }), textureCacheId = `cacheAsBitmap_${exports_lib.uid()}`;
  this._cacheData.textureCacheId = textureCacheId, BaseTexture.addToCache(renderTexture.baseTexture, textureCacheId), Texture.addToCache(renderTexture, textureCacheId);
  const m3 = _tempMatrix;
  this.transform.localTransform.copyTo(m3), m3.invert(), m3.tx -= bounds.x, m3.ty -= bounds.y, this.renderCanvas = this._cacheData.originalRenderCanvas, renderer.render(this, { renderTexture, clear: true, transform: m3, skipUpdateTransform: false }), renderer.canvasContext.activeContext = cachedRenderTarget, renderer._projTransform = cachedProjectionTransform, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = cacheAlpha;
  const cachedSprite = new Sprite(renderTexture);
  cachedSprite.transform.worldTransform = this.transform.worldTransform, cachedSprite.anchor.x = -(bounds.x / bounds.width), cachedSprite.anchor.y = -(bounds.y / bounds.height), cachedSprite.alpha = cacheAlpha, cachedSprite._bounds = this._bounds, this._cacheData.sprite = cachedSprite, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = renderer._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = cachedSprite.containsPoint.bind(cachedSprite);
};
DisplayObject.prototype._calculateCachedBounds = function() {
  this._bounds.clear(), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite._calculateBounds(), this._bounds.updateID = this._boundsID;
};
DisplayObject.prototype._getCachedLocalBounds = function() {
  return this._cacheData.sprite.getLocalBounds(null);
};
DisplayObject.prototype._destroyCachedDisplayObject = function() {
  this._cacheData.sprite._texture.destroy(true), this._cacheData.sprite = null, BaseTexture.removeFromCache(this._cacheData.textureCacheId), Texture.removeFromCache(this._cacheData.textureCacheId), this._cacheData.textureCacheId = null;
};
DisplayObject.prototype._cacheAsBitmapDestroy = function(options) {
  this.cacheAsBitmap = false, this.destroy(options);
};

// node_modules/@pixi/mixin-get-child-by-name/lib/index.mjs
DisplayObject.prototype.name = null;
Container.prototype.getChildByName = function(name, deep) {
  for (let i2 = 0, j2 = this.children.length;i2 < j2; i2++)
    if (this.children[i2].name === name)
      return this.children[i2];
  if (deep)
    for (let i2 = 0, j2 = this.children.length;i2 < j2; i2++) {
      const child = this.children[i2];
      if (!child.getChildByName)
        continue;
      const target = child.getChildByName(name, true);
      if (target)
        return target;
    }
  return null;
};

// node_modules/@pixi/mixin-get-global-position/lib/index.mjs
DisplayObject.prototype.getGlobalPosition = function(point = new Point, skipUpdate = false) {
  return this.parent ? this.parent.toGlobal(this.position, point, skipUpdate) : (point.x = this.position.x, point.y = this.position.y), point;
};

// node_modules/@pixi/filter-alpha/lib/alpha.frag.mjs
var fragment2 = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float uAlpha;

void main(void)
{
   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;
}
`;

// node_modules/@pixi/filter-alpha/lib/AlphaFilter.mjs
class AlphaFilter extends Filter {
  constructor(alpha = 1) {
    super(defaultVertex4, fragment2, { uAlpha: 1 }), this.alpha = alpha;
  }
  get alpha() {
    return this.uniforms.uAlpha;
  }
  set alpha(value) {
    this.uniforms.uAlpha = value;
  }
}

// node_modules/@pixi/filter-blur/lib/generateBlurFragSource.mjs
var generateBlurFragSource = function(kernelSize) {
  const kernel = GAUSSIAN_VALUES[kernelSize], halfLength = kernel.length;
  let fragSource = fragTemplate2, blurLoop = "";
  const template = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;";
  let value;
  for (let i2 = 0;i2 < kernelSize; i2++) {
    let blur = template.replace("%index%", i2.toString());
    value = i2, i2 >= halfLength && (value = kernelSize - i2 - 1), blur = blur.replace("%value%", kernel[value].toString()), blurLoop += blur, blurLoop += `
`;
  }
  return fragSource = fragSource.replace("%blur%", blurLoop), fragSource = fragSource.replace("%size%", kernelSize.toString()), fragSource;
};
var GAUSSIAN_VALUES = {
  5: [0.153388, 0.221461, 0.250301],
  7: [0.071303, 0.131514, 0.189879, 0.214607],
  9: [0.028532, 0.067234, 0.124009, 0.179044, 0.20236],
  11: [0.0093, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596],
  13: [0.002406, 0.009255, 0.027867, 0.065666, 0.121117, 0.174868, 0.197641],
  15: [0.000489, 0.002403, 0.009246, 0.02784, 0.065602, 0.120999, 0.174697, 0.197448]
};
var fragTemplate2 = [
  "varying vec2 vBlurTexCoords[%size%];",
  "uniform sampler2D uSampler;",
  "void main(void)",
  "{",
  "    gl_FragColor = vec4(0.0);",
  "    %blur%",
  "}"
].join(`
`);

// node_modules/@pixi/filter-blur/lib/generateBlurVertSource.mjs
var generateBlurVertSource = function(kernelSize, x2) {
  const halfLength = Math.ceil(kernelSize / 2);
  let vertSource = vertTemplate, blurLoop = "", template;
  x2 ? template = "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);" : template = "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
  for (let i2 = 0;i2 < kernelSize; i2++) {
    let blur = template.replace("%index%", i2.toString());
    blur = blur.replace("%sampleIndex%", `${i2 - (halfLength - 1)}.0`), blurLoop += blur, blurLoop += `
`;
  }
  return vertSource = vertSource.replace("%blur%", blurLoop), vertSource = vertSource.replace("%size%", kernelSize.toString()), vertSource;
};
var vertTemplate = `
    attribute vec2 aVertexPosition;

    uniform mat3 projectionMatrix;

    uniform float strength;

    varying vec2 vBlurTexCoords[%size%];

    uniform vec4 inputSize;
    uniform vec4 outputFrame;

    vec4 filterVertexPosition( void )
    {
        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
    }

    vec2 filterTextureCoord( void )
    {
        return aVertexPosition * (outputFrame.zw * inputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;

// node_modules/@pixi/filter-blur/lib/BlurFilterPass.mjs
class BlurFilterPass extends Filter {
  constructor(horizontal, strength = 8, quality = 4, resolution = Filter.defaultResolution, kernelSize = 5) {
    const vertSrc = generateBlurVertSource(kernelSize, horizontal), fragSrc = generateBlurFragSource(kernelSize);
    super(vertSrc, fragSrc), this.horizontal = horizontal, this.resolution = resolution, this._quality = 0, this.quality = quality, this.blur = strength;
  }
  apply(filterManager, input, output, clearMode) {
    if (output ? this.horizontal ? this.uniforms.strength = 1 / output.width * (output.width / input.width) : this.uniforms.strength = 1 / output.height * (output.height / input.height) : this.horizontal ? this.uniforms.strength = 1 / filterManager.renderer.width * (filterManager.renderer.width / input.width) : this.uniforms.strength = 1 / filterManager.renderer.height * (filterManager.renderer.height / input.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, this.passes === 1)
      filterManager.applyFilter(this, input, output, clearMode);
    else {
      const renderTarget = filterManager.getFilterTexture(), renderer = filterManager.renderer;
      let flip = input, flop = renderTarget;
      this.state.blend = false, filterManager.applyFilter(this, flip, flop, CLEAR_MODES.CLEAR);
      for (let i2 = 1;i2 < this.passes - 1; i2++) {
        filterManager.bindAndClear(flip, CLEAR_MODES.BLIT), this.uniforms.uSampler = flop;
        const temp = flop;
        flop = flip, flip = temp, renderer.shader.bind(this), renderer.geometry.draw(5);
      }
      this.state.blend = true, filterManager.applyFilter(this, flop, output, clearMode), filterManager.returnFilterTexture(renderTarget);
    }
  }
  get blur() {
    return this.strength;
  }
  set blur(value) {
    this.padding = 1 + Math.abs(value) * 2, this.strength = value;
  }
  get quality() {
    return this._quality;
  }
  set quality(value) {
    this._quality = value, this.passes = value;
  }
}

// node_modules/@pixi/filter-blur/lib/BlurFilter.mjs
class BlurFilter extends Filter {
  constructor(strength = 8, quality = 4, resolution = Filter.defaultResolution, kernelSize = 5) {
    super(), this._repeatEdgePixels = false, this.blurXFilter = new BlurFilterPass(true, strength, quality, resolution, kernelSize), this.blurYFilter = new BlurFilterPass(false, strength, quality, resolution, kernelSize), this.resolution = resolution, this.quality = quality, this.blur = strength, this.repeatEdgePixels = false;
  }
  apply(filterManager, input, output, clearMode) {
    const xStrength = Math.abs(this.blurXFilter.strength), yStrength = Math.abs(this.blurYFilter.strength);
    if (xStrength && yStrength) {
      const renderTarget = filterManager.getFilterTexture();
      this.blurXFilter.apply(filterManager, input, renderTarget, CLEAR_MODES.CLEAR), this.blurYFilter.apply(filterManager, renderTarget, output, clearMode), filterManager.returnFilterTexture(renderTarget);
    } else
      yStrength ? this.blurYFilter.apply(filterManager, input, output, clearMode) : this.blurXFilter.apply(filterManager, input, output, clearMode);
  }
  updatePadding() {
    this._repeatEdgePixels ? this.padding = 0 : this.padding = Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength)) * 2;
  }
  get blur() {
    return this.blurXFilter.blur;
  }
  set blur(value) {
    this.blurXFilter.blur = this.blurYFilter.blur = value, this.updatePadding();
  }
  get quality() {
    return this.blurXFilter.quality;
  }
  set quality(value) {
    this.blurXFilter.quality = this.blurYFilter.quality = value;
  }
  get blurX() {
    return this.blurXFilter.blur;
  }
  set blurX(value) {
    this.blurXFilter.blur = value, this.updatePadding();
  }
  get blurY() {
    return this.blurYFilter.blur;
  }
  set blurY(value) {
    this.blurYFilter.blur = value, this.updatePadding();
  }
  get blendMode() {
    return this.blurYFilter.blendMode;
  }
  set blendMode(value) {
    this.blurYFilter.blendMode = value;
  }
  get repeatEdgePixels() {
    return this._repeatEdgePixels;
  }
  set repeatEdgePixels(value) {
    this._repeatEdgePixels = value, this.updatePadding();
  }
}

// node_modules/@pixi/filter-color-matrix/lib/colorMatrix.frag.mjs
var fragment3 = `varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float m[20];
uniform float uAlpha;

void main(void)
{
    vec4 c = texture2D(uSampler, vTextureCoord);

    if (uAlpha == 0.0) {
        gl_FragColor = c;
        return;
    }

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (c.a > 0.0) {
      c.rgb /= c.a;
    }

    vec4 result;

    result.r = (m[0] * c.r);
        result.r += (m[1] * c.g);
        result.r += (m[2] * c.b);
        result.r += (m[3] * c.a);
        result.r += m[4];

    result.g = (m[5] * c.r);
        result.g += (m[6] * c.g);
        result.g += (m[7] * c.b);
        result.g += (m[8] * c.a);
        result.g += m[9];

    result.b = (m[10] * c.r);
       result.b += (m[11] * c.g);
       result.b += (m[12] * c.b);
       result.b += (m[13] * c.a);
       result.b += m[14];

    result.a = (m[15] * c.r);
       result.a += (m[16] * c.g);
       result.a += (m[17] * c.b);
       result.a += (m[18] * c.a);
       result.a += m[19];

    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);

    // Premultiply alpha again.
    rgb *= result.a;

    gl_FragColor = vec4(rgb, result.a);
}
`;

// node_modules/@pixi/filter-color-matrix/lib/ColorMatrixFilter.mjs
class ColorMatrixFilter extends Filter {
  constructor() {
    const uniforms = {
      m: new Float32Array([
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ]),
      uAlpha: 1
    };
    super(defaultFilterVertex, fragment3, uniforms), this.alpha = 1;
  }
  _loadMatrix(matrix, multiply = false) {
    let newMatrix = matrix;
    multiply && (this._multiply(newMatrix, this.uniforms.m, matrix), newMatrix = this._colorMatrix(newMatrix)), this.uniforms.m = newMatrix;
  }
  _multiply(out, a2, b2) {
    return out[0] = a2[0] * b2[0] + a2[1] * b2[5] + a2[2] * b2[10] + a2[3] * b2[15], out[1] = a2[0] * b2[1] + a2[1] * b2[6] + a2[2] * b2[11] + a2[3] * b2[16], out[2] = a2[0] * b2[2] + a2[1] * b2[7] + a2[2] * b2[12] + a2[3] * b2[17], out[3] = a2[0] * b2[3] + a2[1] * b2[8] + a2[2] * b2[13] + a2[3] * b2[18], out[4] = a2[0] * b2[4] + a2[1] * b2[9] + a2[2] * b2[14] + a2[3] * b2[19] + a2[4], out[5] = a2[5] * b2[0] + a2[6] * b2[5] + a2[7] * b2[10] + a2[8] * b2[15], out[6] = a2[5] * b2[1] + a2[6] * b2[6] + a2[7] * b2[11] + a2[8] * b2[16], out[7] = a2[5] * b2[2] + a2[6] * b2[7] + a2[7] * b2[12] + a2[8] * b2[17], out[8] = a2[5] * b2[3] + a2[6] * b2[8] + a2[7] * b2[13] + a2[8] * b2[18], out[9] = a2[5] * b2[4] + a2[6] * b2[9] + a2[7] * b2[14] + a2[8] * b2[19] + a2[9], out[10] = a2[10] * b2[0] + a2[11] * b2[5] + a2[12] * b2[10] + a2[13] * b2[15], out[11] = a2[10] * b2[1] + a2[11] * b2[6] + a2[12] * b2[11] + a2[13] * b2[16], out[12] = a2[10] * b2[2] + a2[11] * b2[7] + a2[12] * b2[12] + a2[13] * b2[17], out[13] = a2[10] * b2[3] + a2[11] * b2[8] + a2[12] * b2[13] + a2[13] * b2[18], out[14] = a2[10] * b2[4] + a2[11] * b2[9] + a2[12] * b2[14] + a2[13] * b2[19] + a2[14], out[15] = a2[15] * b2[0] + a2[16] * b2[5] + a2[17] * b2[10] + a2[18] * b2[15], out[16] = a2[15] * b2[1] + a2[16] * b2[6] + a2[17] * b2[11] + a2[18] * b2[16], out[17] = a2[15] * b2[2] + a2[16] * b2[7] + a2[17] * b2[12] + a2[18] * b2[17], out[18] = a2[15] * b2[3] + a2[16] * b2[8] + a2[17] * b2[13] + a2[18] * b2[18], out[19] = a2[15] * b2[4] + a2[16] * b2[9] + a2[17] * b2[14] + a2[18] * b2[19] + a2[19], out;
  }
  _colorMatrix(matrix) {
    const m3 = new Float32Array(matrix);
    return m3[4] /= 255, m3[9] /= 255, m3[14] /= 255, m3[19] /= 255, m3;
  }
  brightness(b2, multiply) {
    const matrix = [
      b2,
      0,
      0,
      0,
      0,
      0,
      b2,
      0,
      0,
      0,
      0,
      0,
      b2,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  tint(color8, multiply) {
    const [r2, g2, b2] = Color.shared.setValue(color8).toArray(), matrix = [
      r2,
      0,
      0,
      0,
      0,
      0,
      g2,
      0,
      0,
      0,
      0,
      0,
      b2,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  greyscale(scale, multiply) {
    const matrix = [
      scale,
      scale,
      scale,
      0,
      0,
      scale,
      scale,
      scale,
      0,
      0,
      scale,
      scale,
      scale,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  blackAndWhite(multiply) {
    const matrix = [
      0.3,
      0.6,
      0.1,
      0,
      0,
      0.3,
      0.6,
      0.1,
      0,
      0,
      0.3,
      0.6,
      0.1,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  hue(rotation, multiply) {
    rotation = (rotation || 0) / 180 * Math.PI;
    const cosR = Math.cos(rotation), sinR = Math.sin(rotation), sqrt = Math.sqrt, w2 = 1 / 3, sqrW = sqrt(w2), a00 = cosR + (1 - cosR) * w2, a01 = w2 * (1 - cosR) - sqrW * sinR, a02 = w2 * (1 - cosR) + sqrW * sinR, a10 = w2 * (1 - cosR) + sqrW * sinR, a11 = cosR + w2 * (1 - cosR), a12 = w2 * (1 - cosR) - sqrW * sinR, a20 = w2 * (1 - cosR) - sqrW * sinR, a21 = w2 * (1 - cosR) + sqrW * sinR, a22 = cosR + w2 * (1 - cosR), matrix = [
      a00,
      a01,
      a02,
      0,
      0,
      a10,
      a11,
      a12,
      0,
      0,
      a20,
      a21,
      a22,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  contrast(amount, multiply) {
    const v2 = (amount || 0) + 1, o2 = -0.5 * (v2 - 1), matrix = [
      v2,
      0,
      0,
      0,
      o2,
      0,
      v2,
      0,
      0,
      o2,
      0,
      0,
      v2,
      0,
      o2,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  saturate(amount = 0, multiply) {
    const x2 = amount * 2 / 3 + 1, y2 = (x2 - 1) * -0.5, matrix = [
      x2,
      y2,
      y2,
      0,
      0,
      y2,
      x2,
      y2,
      0,
      0,
      y2,
      y2,
      x2,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  desaturate() {
    this.saturate(-1);
  }
  negative(multiply) {
    const matrix = [
      -1,
      0,
      0,
      1,
      0,
      0,
      -1,
      0,
      1,
      0,
      0,
      0,
      -1,
      1,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  sepia(multiply) {
    const matrix = [
      0.393,
      0.7689999,
      0.18899999,
      0,
      0,
      0.349,
      0.6859999,
      0.16799999,
      0,
      0,
      0.272,
      0.5339999,
      0.13099999,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  technicolor(multiply) {
    const matrix = [
      1.9125277891456083,
      -0.8545344976951645,
      -0.09155508482755585,
      0,
      11.793603434377337,
      -0.3087833385928097,
      1.7658908555458428,
      -0.10601743074722245,
      0,
      -70.35205161461398,
      -0.231103377548616,
      -0.7501899197440212,
      1.847597816108189,
      0,
      30.950940869491138,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  polaroid(multiply) {
    const matrix = [
      1.438,
      -0.062,
      -0.062,
      0,
      0,
      -0.122,
      1.378,
      -0.122,
      0,
      0,
      -0.016,
      -0.016,
      1.483,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  toBGR(multiply) {
    const matrix = [
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  kodachrome(multiply) {
    const matrix = [
      1.1285582396593525,
      -0.3967382283601348,
      -0.03992559172921793,
      0,
      63.72958762196502,
      -0.16404339962244616,
      1.0835251566291304,
      -0.05498805115633132,
      0,
      24.732407896706203,
      -0.16786010706155763,
      -0.5603416277695248,
      1.6014850761964943,
      0,
      35.62982807460946,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  browni(multiply) {
    const matrix = [
      0.5997023498159715,
      0.34553243048391263,
      -0.2708298674538042,
      0,
      47.43192855600873,
      -0.037703249837783157,
      0.8609577587992641,
      0.15059552388459913,
      0,
      -36.96841498319127,
      0.24113635128153335,
      -0.07441037908422492,
      0.44972182064877153,
      0,
      -7.562075277591283,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  vintage(multiply) {
    const matrix = [
      0.6279345635605994,
      0.3202183420819367,
      -0.03965408211312453,
      0,
      9.651285835294123,
      0.02578397704808868,
      0.6441188644374771,
      0.03259127616149294,
      0,
      7.462829176470591,
      0.0466055556782719,
      -0.0851232987247891,
      0.5241648018700465,
      0,
      5.159190588235296,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  colorTone(desaturation, toned, lightColor, darkColor, multiply) {
    desaturation = desaturation || 0.2, toned = toned || 0.15, lightColor = lightColor || 16770432, darkColor = darkColor || 3375104;
    const temp = Color.shared, [lR, lG, lB] = temp.setValue(lightColor).toArray(), [dR, dG, dB] = temp.setValue(darkColor).toArray(), matrix = [
      0.3,
      0.59,
      0.11,
      0,
      0,
      lR,
      lG,
      lB,
      desaturation,
      0,
      dR,
      dG,
      dB,
      toned,
      0,
      lR - dR,
      lG - dG,
      lB - dB,
      0,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  night(intensity, multiply) {
    intensity = intensity || 0.1;
    const matrix = [
      intensity * -2,
      -intensity,
      0,
      0,
      0,
      -intensity,
      0,
      intensity,
      0,
      0,
      0,
      intensity,
      intensity * 2,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  predator(amount, multiply) {
    const matrix = [
      11.224130630493164 * amount,
      -4.794486999511719 * amount,
      -2.8746118545532227 * amount,
      0 * amount,
      0.40342438220977783 * amount,
      -3.6330697536468506 * amount,
      9.193157196044922 * amount,
      -2.951810836791992 * amount,
      0 * amount,
      -1.316135048866272 * amount,
      -3.2184197902679443 * amount,
      -4.2375030517578125 * amount,
      7.476448059082031 * amount,
      0 * amount,
      0.8044459223747253 * amount,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  lsd(multiply) {
    const matrix = [
      2,
      -0.4,
      0.5,
      0,
      0,
      -0.5,
      2,
      -0.4,
      0,
      0,
      -0.4,
      -0.5,
      3,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  reset() {
    const matrix = [
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, false);
  }
  get matrix() {
    return this.uniforms.m;
  }
  set matrix(value) {
    this.uniforms.m = value;
  }
  get alpha() {
    return this.uniforms.uAlpha;
  }
  set alpha(value) {
    this.uniforms.uAlpha = value;
  }
}
ColorMatrixFilter.prototype.grayscale = ColorMatrixFilter.prototype.greyscale;

// node_modules/@pixi/filter-displacement/lib/displacement.frag.mjs
var fragment4 = `varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform vec2 scale;
uniform mat2 rotation;
uniform sampler2D uSampler;
uniform sampler2D mapSampler;

uniform highp vec4 inputSize;
uniform vec4 inputClamp;

void main(void)
{
  vec4 map =  texture2D(mapSampler, vFilterCoord);

  map -= 0.5;
  map.xy = scale * inputSize.zw * (rotation * map.xy);

  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));
}
`;

// node_modules/@pixi/filter-displacement/lib/displacement.vert.mjs
var vertex2 = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform mat3 filterMatrix;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
	gl_Position = filterVertexPosition();
	vTextureCoord = filterTextureCoord();
	vFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;
}
`;

// node_modules/@pixi/filter-displacement/lib/DisplacementFilter.mjs
class DisplacementFilter extends Filter {
  constructor(sprite2, scale) {
    const maskMatrix = new Matrix;
    sprite2.renderable = false, super(vertex2, fragment4, {
      mapSampler: sprite2._texture,
      filterMatrix: maskMatrix,
      scale: { x: 1, y: 1 },
      rotation: new Float32Array([1, 0, 0, 1])
    }), this.maskSprite = sprite2, this.maskMatrix = maskMatrix, scale == null && (scale = 20), this.scale = new Point(scale, scale);
  }
  apply(filterManager, input, output, clearMode) {
    this.uniforms.filterMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x, this.uniforms.scale.y = this.scale.y;
    const wt = this.maskSprite.worldTransform, lenX = Math.sqrt(wt.a * wt.a + wt.b * wt.b), lenY = Math.sqrt(wt.c * wt.c + wt.d * wt.d);
    lenX !== 0 && lenY !== 0 && (this.uniforms.rotation[0] = wt.a / lenX, this.uniforms.rotation[1] = wt.b / lenX, this.uniforms.rotation[2] = wt.c / lenY, this.uniforms.rotation[3] = wt.d / lenY), filterManager.applyFilter(this, input, output, clearMode);
  }
  get map() {
    return this.uniforms.mapSampler;
  }
  set map(value) {
    this.uniforms.mapSampler = value;
  }
}

// node_modules/@pixi/filter-fxaa/lib/fxaa.frag.mjs
var fragment5 = `varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

varying vec2 vFragCoord;
uniform sampler2D uSampler;
uniform highp vec4 inputSize;


/**
 Basic FXAA implementation based on the code on geeks3d.com with the
 modification that the texture2DLod stuff was removed since it's
 unsupported by WebGL.

 --

 From:
 https://github.com/mitsuhiko/webgl-meincraft

 Copyright (c) 2011 by Armin Ronacher.

 Some rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are
 met:

 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above
 copyright notice, this list of conditions and the following
 disclaimer in the documentation and/or other materials provided
 with the distribution.

 * The names of the contributors may not be used to endorse or
 promote products derived from this software without specific
 prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#ifndef FXAA_REDUCE_MIN
#define FXAA_REDUCE_MIN   (1.0/ 128.0)
#endif
#ifndef FXAA_REDUCE_MUL
#define FXAA_REDUCE_MUL   (1.0 / 8.0)
#endif
#ifndef FXAA_SPAN_MAX
#define FXAA_SPAN_MAX     8.0
#endif

//optimized version for mobile, where dependent
//texture reads can be a bottleneck
vec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,
          vec2 v_rgbNW, vec2 v_rgbNE,
          vec2 v_rgbSW, vec2 v_rgbSE,
          vec2 v_rgbM) {
    vec4 color;
    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;
    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;
    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;
    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;
    vec4 texColor = texture2D(tex, v_rgbM);
    vec3 rgbM  = texColor.xyz;
    vec3 luma = vec3(0.299, 0.587, 0.114);
    float lumaNW = dot(rgbNW, luma);
    float lumaNE = dot(rgbNE, luma);
    float lumaSW = dot(rgbSW, luma);
    float lumaSE = dot(rgbSE, luma);
    float lumaM  = dot(rgbM,  luma);
    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

    mediump vec2 dir;
    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *
                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);

    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),
              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
                  dir * rcpDirMin)) * inverseVP;

    vec3 rgbA = 0.5 * (
                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +
                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);
    vec3 rgbB = rgbA * 0.5 + 0.25 * (
                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +
                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);

    float lumaB = dot(rgbB, luma);
    if ((lumaB < lumaMin) || (lumaB > lumaMax))
        color = vec4(rgbA, texColor.a);
    else
        color = vec4(rgbB, texColor.a);
    return color;
}

void main() {

      vec4 color;

      color = fxaa(uSampler, vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);

      gl_FragColor = color;
}
`;

// node_modules/@pixi/filter-fxaa/lib/fxaa.vert.mjs
var vertex3 = `
attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

varying vec2 vFragCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

void texcoords(vec2 fragCoord, vec2 inverseVP,
               out vec2 v_rgbNW, out vec2 v_rgbNE,
               out vec2 v_rgbSW, out vec2 v_rgbSE,
               out vec2 v_rgbM) {
    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;
    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;
    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;
    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;
    v_rgbM = vec2(fragCoord * inverseVP);
}

void main(void) {

   gl_Position = filterVertexPosition();

   vFragCoord = aVertexPosition * outputFrame.zw;

   texcoords(vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);
}
`;

// node_modules/@pixi/filter-fxaa/lib/FXAAFilter.mjs
class FXAAFilter extends Filter {
  constructor() {
    super(vertex3, fragment5);
  }
}

// node_modules/@pixi/filter-noise/lib/noise.frag.mjs
var fragment6 = `precision highp float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform float uNoise;
uniform float uSeed;
uniform sampler2D uSampler;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * uSeed);
    float diff = (randomValue - 0.5) * uNoise;

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    color.r += diff;
    color.g += diff;
    color.b += diff;

    // Premultiply alpha again.
    color.rgb *= color.a;

    gl_FragColor = color;
}
`;

// node_modules/@pixi/filter-noise/lib/NoiseFilter.mjs
class NoiseFilter extends Filter {
  constructor(noise = 0.5, seed = Math.random()) {
    super(defaultFilterVertex, fragment6, {
      uNoise: 0,
      uSeed: 0
    }), this.noise = noise, this.seed = seed;
  }
  get noise() {
    return this.uniforms.uNoise;
  }
  set noise(value) {
    this.uniforms.uNoise = value;
  }
  get seed() {
    return this.uniforms.uSeed;
  }
  set seed(value) {
    this.uniforms.uSeed = value;
  }
}

// node_modules/pixi.js/lib/filters.mjs
var filters = {
  AlphaFilter,
  BlurFilter,
  BlurFilterPass,
  ColorMatrixFilter,
  DisplacementFilter,
  FXAAFilter,
  NoiseFilter
};
Object.entries(filters).forEach(([key, FilterClass]) => {
  Object.defineProperty(filters, key, {
    get() {
      return exports_lib.deprecation("7.1.0", `filters.${key} has moved to ${key}`), FilterClass;
    }
  });
});

// node_modules/@pixi/events/lib/EventTicker.mjs
class EventsTickerClass {
  constructor() {
    this.interactionFrequency = 10, this._deltaTime = 0, this._didMove = false, this.tickerAdded = false, this._pauseUpdate = true;
  }
  init(events) {
    this.removeTickerListener(), this.events = events, this.interactionFrequency = 10, this._deltaTime = 0, this._didMove = false, this.tickerAdded = false, this._pauseUpdate = true;
  }
  get pauseUpdate() {
    return this._pauseUpdate;
  }
  set pauseUpdate(paused) {
    this._pauseUpdate = paused;
  }
  addTickerListener() {
    this.tickerAdded || !this.domElement || (Ticker.system.add(this.tickerUpdate, this, UPDATE_PRIORITY.INTERACTION), this.tickerAdded = true);
  }
  removeTickerListener() {
    this.tickerAdded && (Ticker.system.remove(this.tickerUpdate, this), this.tickerAdded = false);
  }
  pointerMoved() {
    this._didMove = true;
  }
  update() {
    if (!this.domElement || this._pauseUpdate)
      return;
    if (this._didMove) {
      this._didMove = false;
      return;
    }
    const rootPointerEvent = this.events.rootPointerEvent;
    this.events.supportsTouchEvents && rootPointerEvent.pointerType === "touch" || globalThis.document.dispatchEvent(new PointerEvent("pointermove", {
      clientX: rootPointerEvent.clientX,
      clientY: rootPointerEvent.clientY
    }));
  }
  tickerUpdate(deltaTime) {
    this._deltaTime += deltaTime, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this.update());
  }
}
var EventsTicker = new EventsTickerClass;

// node_modules/@pixi/events/lib/FederatedEvent.mjs
class FederatedEvent {
  constructor(manager) {
    this.bubbles = true, this.cancelBubble = true, this.cancelable = false, this.composed = false, this.defaultPrevented = false, this.eventPhase = FederatedEvent.prototype.NONE, this.propagationStopped = false, this.propagationImmediatelyStopped = false, this.layer = new Point, this.page = new Point, this.NONE = 0, this.CAPTURING_PHASE = 1, this.AT_TARGET = 2, this.BUBBLING_PHASE = 3, this.manager = manager;
  }
  get layerX() {
    return this.layer.x;
  }
  get layerY() {
    return this.layer.y;
  }
  get pageX() {
    return this.page.x;
  }
  get pageY() {
    return this.page.y;
  }
  get data() {
    return this;
  }
  composedPath() {
    return this.manager && (!this.path || this.path[this.path.length - 1] !== this.target) && (this.path = this.target ? this.manager.propagationPath(this.target) : []), this.path;
  }
  initEvent(_type, _bubbles, _cancelable) {
    throw new Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.");
  }
  initUIEvent(_typeArg, _bubblesArg, _cancelableArg, _viewArg, _detailArg) {
    throw new Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.");
  }
  preventDefault() {
    this.nativeEvent instanceof Event && this.nativeEvent.cancelable && this.nativeEvent.preventDefault(), this.defaultPrevented = true;
  }
  stopImmediatePropagation() {
    this.propagationImmediatelyStopped = true;
  }
  stopPropagation() {
    this.propagationStopped = true;
  }
}

// node_modules/@pixi/events/lib/FederatedMouseEvent.mjs
class FederatedMouseEvent extends FederatedEvent {
  constructor() {
    super(...arguments), this.client = new Point, this.movement = new Point, this.offset = new Point, this.global = new Point, this.screen = new Point;
  }
  get clientX() {
    return this.client.x;
  }
  get clientY() {
    return this.client.y;
  }
  get x() {
    return this.clientX;
  }
  get y() {
    return this.clientY;
  }
  get movementX() {
    return this.movement.x;
  }
  get movementY() {
    return this.movement.y;
  }
  get offsetX() {
    return this.offset.x;
  }
  get offsetY() {
    return this.offset.y;
  }
  get globalX() {
    return this.global.x;
  }
  get globalY() {
    return this.global.y;
  }
  get screenX() {
    return this.screen.x;
  }
  get screenY() {
    return this.screen.y;
  }
  getLocalPosition(displayObject, point, globalPos) {
    return displayObject.worldTransform.applyInverse(globalPos || this.global, point);
  }
  getModifierState(key) {
    return ("getModifierState" in this.nativeEvent) && this.nativeEvent.getModifierState(key);
  }
  initMouseEvent(_typeArg, _canBubbleArg, _cancelableArg, _viewArg, _detailArg, _screenXArg, _screenYArg, _clientXArg, _clientYArg, _ctrlKeyArg, _altKeyArg, _shiftKeyArg, _metaKeyArg, _buttonArg, _relatedTargetArg) {
    throw new Error("Method not implemented.");
  }
}

// node_modules/@pixi/events/lib/FederatedPointerEvent.mjs
class FederatedPointerEvent extends FederatedMouseEvent {
  constructor() {
    super(...arguments), this.width = 0, this.height = 0, this.isPrimary = false;
  }
  getCoalescedEvents() {
    return this.type === "pointermove" || this.type === "mousemove" || this.type === "touchmove" ? [this] : [];
  }
  getPredictedEvents() {
    throw new Error("getPredictedEvents is not supported!");
  }
}

// node_modules/@pixi/events/lib/FederatedWheelEvent.mjs
class FederatedWheelEvent extends FederatedMouseEvent {
  constructor() {
    super(...arguments), this.DOM_DELTA_PIXEL = 0, this.DOM_DELTA_LINE = 1, this.DOM_DELTA_PAGE = 2;
  }
}
FederatedWheelEvent.DOM_DELTA_PIXEL = 0, FederatedWheelEvent.DOM_DELTA_LINE = 1, FederatedWheelEvent.DOM_DELTA_PAGE = 2;

// node_modules/@pixi/events/lib/EventBoundary.mjs
var PROPAGATION_LIMIT = 2048;
var tempHitLocation = new Point;
var tempLocalMapping = new Point;

class EventBoundary {
  constructor(rootTarget) {
    this.dispatch = new exports_lib.EventEmitter, this.moveOnAll = false, this.enableGlobalMoveEvents = true, this.mappingState = {
      trackingData: {}
    }, this.eventPool = new Map, this._allInteractiveElements = [], this._hitElements = [], this._isPointerMoveEvent = false, this.rootTarget = rootTarget, this.hitPruneFn = this.hitPruneFn.bind(this), this.hitTestFn = this.hitTestFn.bind(this), this.mapPointerDown = this.mapPointerDown.bind(this), this.mapPointerMove = this.mapPointerMove.bind(this), this.mapPointerOut = this.mapPointerOut.bind(this), this.mapPointerOver = this.mapPointerOver.bind(this), this.mapPointerUp = this.mapPointerUp.bind(this), this.mapPointerUpOutside = this.mapPointerUpOutside.bind(this), this.mapWheel = this.mapWheel.bind(this), this.mappingTable = {}, this.addEventMapping("pointerdown", this.mapPointerDown), this.addEventMapping("pointermove", this.mapPointerMove), this.addEventMapping("pointerout", this.mapPointerOut), this.addEventMapping("pointerleave", this.mapPointerOut), this.addEventMapping("pointerover", this.mapPointerOver), this.addEventMapping("pointerup", this.mapPointerUp), this.addEventMapping("pointerupoutside", this.mapPointerUpOutside), this.addEventMapping("wheel", this.mapWheel);
  }
  addEventMapping(type, fn) {
    this.mappingTable[type] || (this.mappingTable[type] = []), this.mappingTable[type].push({
      fn,
      priority: 0
    }), this.mappingTable[type].sort((a2, b2) => a2.priority - b2.priority);
  }
  dispatchEvent(e2, type) {
    e2.propagationStopped = false, e2.propagationImmediatelyStopped = false, this.propagate(e2, type), this.dispatch.emit(type || e2.type, e2);
  }
  mapEvent(e2) {
    if (!this.rootTarget)
      return;
    const mappers = this.mappingTable[e2.type];
    if (mappers)
      for (let i2 = 0, j2 = mappers.length;i2 < j2; i2++)
        mappers[i2].fn(e2);
    else
      console.warn(`[EventBoundary]: Event mapping not defined for ${e2.type}`);
  }
  hitTest(x2, y2) {
    EventsTicker.pauseUpdate = true;
    const fn = this._isPointerMoveEvent && this.enableGlobalMoveEvents ? "hitTestMoveRecursive" : "hitTestRecursive", invertedPath = this[fn](this.rootTarget, this.rootTarget.eventMode, tempHitLocation.set(x2, y2), this.hitTestFn, this.hitPruneFn);
    return invertedPath && invertedPath[0];
  }
  propagate(e2, type) {
    if (!e2.target)
      return;
    const composedPath = e2.composedPath();
    e2.eventPhase = e2.CAPTURING_PHASE;
    for (let i2 = 0, j2 = composedPath.length - 1;i2 < j2; i2++)
      if (e2.currentTarget = composedPath[i2], this.notifyTarget(e2, type), e2.propagationStopped || e2.propagationImmediatelyStopped)
        return;
    if (e2.eventPhase = e2.AT_TARGET, e2.currentTarget = e2.target, this.notifyTarget(e2, type), !(e2.propagationStopped || e2.propagationImmediatelyStopped)) {
      e2.eventPhase = e2.BUBBLING_PHASE;
      for (let i2 = composedPath.length - 2;i2 >= 0; i2--)
        if (e2.currentTarget = composedPath[i2], this.notifyTarget(e2, type), e2.propagationStopped || e2.propagationImmediatelyStopped)
          return;
    }
  }
  all(e2, type, targets = this._allInteractiveElements) {
    if (targets.length === 0)
      return;
    e2.eventPhase = e2.BUBBLING_PHASE;
    const events = Array.isArray(type) ? type : [type];
    for (let i2 = targets.length - 1;i2 >= 0; i2--)
      events.forEach((event) => {
        e2.currentTarget = targets[i2], this.notifyTarget(e2, event);
      });
  }
  propagationPath(target) {
    const propagationPath = [target];
    for (let i2 = 0;i2 < PROPAGATION_LIMIT && target !== this.rootTarget; i2++) {
      if (!target.parent)
        throw new Error("Cannot find propagation path to disconnected target");
      propagationPath.push(target.parent), target = target.parent;
    }
    return propagationPath.reverse(), propagationPath;
  }
  hitTestMoveRecursive(currentTarget, eventMode, location, testFn, pruneFn, ignore = false) {
    let shouldReturn = false;
    if (this._interactivePrune(currentTarget))
      return null;
    if ((currentTarget.eventMode === "dynamic" || eventMode === "dynamic") && (EventsTicker.pauseUpdate = false), currentTarget.interactiveChildren && currentTarget.children) {
      const children = currentTarget.children;
      for (let i2 = children.length - 1;i2 >= 0; i2--) {
        const child = children[i2], nestedHit = this.hitTestMoveRecursive(child, this._isInteractive(eventMode) ? eventMode : child.eventMode, location, testFn, pruneFn, ignore || pruneFn(currentTarget, location));
        if (nestedHit) {
          if (nestedHit.length > 0 && !nestedHit[nestedHit.length - 1].parent)
            continue;
          const isInteractive = currentTarget.isInteractive();
          (nestedHit.length > 0 || isInteractive) && (isInteractive && this._allInteractiveElements.push(currentTarget), nestedHit.push(currentTarget)), this._hitElements.length === 0 && (this._hitElements = nestedHit), shouldReturn = true;
        }
      }
    }
    const isInteractiveMode = this._isInteractive(eventMode), isInteractiveTarget = currentTarget.isInteractive();
    return isInteractiveTarget && isInteractiveTarget && this._allInteractiveElements.push(currentTarget), ignore || this._hitElements.length > 0 ? null : shouldReturn ? this._hitElements : isInteractiveMode && !pruneFn(currentTarget, location) && testFn(currentTarget, location) ? isInteractiveTarget ? [currentTarget] : [] : null;
  }
  hitTestRecursive(currentTarget, eventMode, location, testFn, pruneFn) {
    if (this._interactivePrune(currentTarget) || pruneFn(currentTarget, location))
      return null;
    if ((currentTarget.eventMode === "dynamic" || eventMode === "dynamic") && (EventsTicker.pauseUpdate = false), currentTarget.interactiveChildren && currentTarget.children) {
      const children = currentTarget.children;
      for (let i2 = children.length - 1;i2 >= 0; i2--) {
        const child = children[i2], nestedHit = this.hitTestRecursive(child, this._isInteractive(eventMode) ? eventMode : child.eventMode, location, testFn, pruneFn);
        if (nestedHit) {
          if (nestedHit.length > 0 && !nestedHit[nestedHit.length - 1].parent)
            continue;
          const isInteractive = currentTarget.isInteractive();
          return (nestedHit.length > 0 || isInteractive) && nestedHit.push(currentTarget), nestedHit;
        }
      }
    }
    const isInteractiveMode = this._isInteractive(eventMode), isInteractiveTarget = currentTarget.isInteractive();
    return isInteractiveMode && testFn(currentTarget, location) ? isInteractiveTarget ? [currentTarget] : [] : null;
  }
  _isInteractive(int) {
    return int === "static" || int === "dynamic";
  }
  _interactivePrune(displayObject) {
    return !!(!displayObject || displayObject.isMask || !displayObject.visible || !displayObject.renderable || displayObject.eventMode === "none" || displayObject.eventMode === "passive" && !displayObject.interactiveChildren || displayObject.isMask);
  }
  hitPruneFn(displayObject, location) {
    if (displayObject.hitArea && (displayObject.worldTransform.applyInverse(location, tempLocalMapping), !displayObject.hitArea.contains(tempLocalMapping.x, tempLocalMapping.y)))
      return true;
    if (displayObject._mask) {
      const maskObject = displayObject._mask.isMaskData ? displayObject._mask.maskObject : displayObject._mask;
      if (maskObject && !maskObject.containsPoint?.(location))
        return true;
    }
    return false;
  }
  hitTestFn(displayObject, location) {
    return displayObject.eventMode === "passive" ? false : displayObject.hitArea ? true : displayObject.containsPoint ? displayObject.containsPoint(location) : false;
  }
  notifyTarget(e2, type) {
    type = type ?? e2.type;
    const handlerKey = `on${type}`;
    e2.currentTarget[handlerKey]?.(e2);
    const key = e2.eventPhase === e2.CAPTURING_PHASE || e2.eventPhase === e2.AT_TARGET ? `${type}capture` : type;
    this.notifyListeners(e2, key), e2.eventPhase === e2.AT_TARGET && this.notifyListeners(e2, type);
  }
  mapPointerDown(from) {
    if (!(from instanceof FederatedPointerEvent)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const e2 = this.createPointerEvent(from);
    if (this.dispatchEvent(e2, "pointerdown"), e2.pointerType === "touch")
      this.dispatchEvent(e2, "touchstart");
    else if (e2.pointerType === "mouse" || e2.pointerType === "pen") {
      const isRightButton = e2.button === 2;
      this.dispatchEvent(e2, isRightButton ? "rightdown" : "mousedown");
    }
    const trackingData = this.trackingData(from.pointerId);
    trackingData.pressTargetsByButton[from.button] = e2.composedPath(), this.freeEvent(e2);
  }
  mapPointerMove(from) {
    if (!(from instanceof FederatedPointerEvent)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    this._allInteractiveElements.length = 0, this._hitElements.length = 0, this._isPointerMoveEvent = true;
    const e2 = this.createPointerEvent(from);
    this._isPointerMoveEvent = false;
    const isMouse = e2.pointerType === "mouse" || e2.pointerType === "pen", trackingData = this.trackingData(from.pointerId), outTarget = this.findMountedTarget(trackingData.overTargets);
    if (trackingData.overTargets?.length > 0 && outTarget !== e2.target) {
      const outType = from.type === "mousemove" ? "mouseout" : "pointerout", outEvent = this.createPointerEvent(from, outType, outTarget);
      if (this.dispatchEvent(outEvent, "pointerout"), isMouse && this.dispatchEvent(outEvent, "mouseout"), !e2.composedPath().includes(outTarget)) {
        const leaveEvent = this.createPointerEvent(from, "pointerleave", outTarget);
        for (leaveEvent.eventPhase = leaveEvent.AT_TARGET;leaveEvent.target && !e2.composedPath().includes(leaveEvent.target); )
          leaveEvent.currentTarget = leaveEvent.target, this.notifyTarget(leaveEvent), isMouse && this.notifyTarget(leaveEvent, "mouseleave"), leaveEvent.target = leaveEvent.target.parent;
        this.freeEvent(leaveEvent);
      }
      this.freeEvent(outEvent);
    }
    if (outTarget !== e2.target) {
      const overType = from.type === "mousemove" ? "mouseover" : "pointerover", overEvent = this.clonePointerEvent(e2, overType);
      this.dispatchEvent(overEvent, "pointerover"), isMouse && this.dispatchEvent(overEvent, "mouseover");
      let overTargetAncestor = outTarget?.parent;
      for (;overTargetAncestor && overTargetAncestor !== this.rootTarget.parent && overTargetAncestor !== e2.target; )
        overTargetAncestor = overTargetAncestor.parent;
      if (!overTargetAncestor || overTargetAncestor === this.rootTarget.parent) {
        const enterEvent = this.clonePointerEvent(e2, "pointerenter");
        for (enterEvent.eventPhase = enterEvent.AT_TARGET;enterEvent.target && enterEvent.target !== outTarget && enterEvent.target !== this.rootTarget.parent; )
          enterEvent.currentTarget = enterEvent.target, this.notifyTarget(enterEvent), isMouse && this.notifyTarget(enterEvent, "mouseenter"), enterEvent.target = enterEvent.target.parent;
        this.freeEvent(enterEvent);
      }
      this.freeEvent(overEvent);
    }
    const allMethods = [], allowGlobalPointerEvents = this.enableGlobalMoveEvents ?? true;
    this.moveOnAll ? allMethods.push("pointermove") : this.dispatchEvent(e2, "pointermove"), allowGlobalPointerEvents && allMethods.push("globalpointermove"), e2.pointerType === "touch" && (this.moveOnAll ? allMethods.splice(1, 0, "touchmove") : this.dispatchEvent(e2, "touchmove"), allowGlobalPointerEvents && allMethods.push("globaltouchmove")), isMouse && (this.moveOnAll ? allMethods.splice(1, 0, "mousemove") : this.dispatchEvent(e2, "mousemove"), allowGlobalPointerEvents && allMethods.push("globalmousemove"), this.cursor = e2.target?.cursor), allMethods.length > 0 && this.all(e2, allMethods), this._allInteractiveElements.length = 0, this._hitElements.length = 0, trackingData.overTargets = e2.composedPath(), this.freeEvent(e2);
  }
  mapPointerOver(from) {
    if (!(from instanceof FederatedPointerEvent)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const trackingData = this.trackingData(from.pointerId), e2 = this.createPointerEvent(from), isMouse = e2.pointerType === "mouse" || e2.pointerType === "pen";
    this.dispatchEvent(e2, "pointerover"), isMouse && this.dispatchEvent(e2, "mouseover"), e2.pointerType === "mouse" && (this.cursor = e2.target?.cursor);
    const enterEvent = this.clonePointerEvent(e2, "pointerenter");
    for (enterEvent.eventPhase = enterEvent.AT_TARGET;enterEvent.target && enterEvent.target !== this.rootTarget.parent; )
      enterEvent.currentTarget = enterEvent.target, this.notifyTarget(enterEvent), isMouse && this.notifyTarget(enterEvent, "mouseenter"), enterEvent.target = enterEvent.target.parent;
    trackingData.overTargets = e2.composedPath(), this.freeEvent(e2), this.freeEvent(enterEvent);
  }
  mapPointerOut(from) {
    if (!(from instanceof FederatedPointerEvent)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const trackingData = this.trackingData(from.pointerId);
    if (trackingData.overTargets) {
      const isMouse = from.pointerType === "mouse" || from.pointerType === "pen", outTarget = this.findMountedTarget(trackingData.overTargets), outEvent = this.createPointerEvent(from, "pointerout", outTarget);
      this.dispatchEvent(outEvent), isMouse && this.dispatchEvent(outEvent, "mouseout");
      const leaveEvent = this.createPointerEvent(from, "pointerleave", outTarget);
      for (leaveEvent.eventPhase = leaveEvent.AT_TARGET;leaveEvent.target && leaveEvent.target !== this.rootTarget.parent; )
        leaveEvent.currentTarget = leaveEvent.target, this.notifyTarget(leaveEvent), isMouse && this.notifyTarget(leaveEvent, "mouseleave"), leaveEvent.target = leaveEvent.target.parent;
      trackingData.overTargets = null, this.freeEvent(outEvent), this.freeEvent(leaveEvent);
    }
    this.cursor = null;
  }
  mapPointerUp(from) {
    if (!(from instanceof FederatedPointerEvent)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const now = performance.now(), e2 = this.createPointerEvent(from);
    if (this.dispatchEvent(e2, "pointerup"), e2.pointerType === "touch")
      this.dispatchEvent(e2, "touchend");
    else if (e2.pointerType === "mouse" || e2.pointerType === "pen") {
      const isRightButton = e2.button === 2;
      this.dispatchEvent(e2, isRightButton ? "rightup" : "mouseup");
    }
    const trackingData = this.trackingData(from.pointerId), pressTarget = this.findMountedTarget(trackingData.pressTargetsByButton[from.button]);
    let clickTarget = pressTarget;
    if (pressTarget && !e2.composedPath().includes(pressTarget)) {
      let currentTarget = pressTarget;
      for (;currentTarget && !e2.composedPath().includes(currentTarget); ) {
        if (e2.currentTarget = currentTarget, this.notifyTarget(e2, "pointerupoutside"), e2.pointerType === "touch")
          this.notifyTarget(e2, "touchendoutside");
        else if (e2.pointerType === "mouse" || e2.pointerType === "pen") {
          const isRightButton = e2.button === 2;
          this.notifyTarget(e2, isRightButton ? "rightupoutside" : "mouseupoutside");
        }
        currentTarget = currentTarget.parent;
      }
      delete trackingData.pressTargetsByButton[from.button], clickTarget = currentTarget;
    }
    if (clickTarget) {
      const clickEvent = this.clonePointerEvent(e2, "click");
      clickEvent.target = clickTarget, clickEvent.path = null, trackingData.clicksByButton[from.button] || (trackingData.clicksByButton[from.button] = {
        clickCount: 0,
        target: clickEvent.target,
        timeStamp: now
      });
      const clickHistory = trackingData.clicksByButton[from.button];
      if (clickHistory.target === clickEvent.target && now - clickHistory.timeStamp < 200 ? ++clickHistory.clickCount : clickHistory.clickCount = 1, clickHistory.target = clickEvent.target, clickHistory.timeStamp = now, clickEvent.detail = clickHistory.clickCount, clickEvent.pointerType === "mouse") {
        const isRightButton = clickEvent.button === 2;
        this.dispatchEvent(clickEvent, isRightButton ? "rightclick" : "click");
      } else
        clickEvent.pointerType === "touch" && this.dispatchEvent(clickEvent, "tap");
      this.dispatchEvent(clickEvent, "pointertap"), this.freeEvent(clickEvent);
    }
    this.freeEvent(e2);
  }
  mapPointerUpOutside(from) {
    if (!(from instanceof FederatedPointerEvent)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const trackingData = this.trackingData(from.pointerId), pressTarget = this.findMountedTarget(trackingData.pressTargetsByButton[from.button]), e2 = this.createPointerEvent(from);
    if (pressTarget) {
      let currentTarget = pressTarget;
      for (;currentTarget; )
        e2.currentTarget = currentTarget, this.notifyTarget(e2, "pointerupoutside"), e2.pointerType === "touch" ? this.notifyTarget(e2, "touchendoutside") : (e2.pointerType === "mouse" || e2.pointerType === "pen") && this.notifyTarget(e2, e2.button === 2 ? "rightupoutside" : "mouseupoutside"), currentTarget = currentTarget.parent;
      delete trackingData.pressTargetsByButton[from.button];
    }
    this.freeEvent(e2);
  }
  mapWheel(from) {
    if (!(from instanceof FederatedWheelEvent)) {
      console.warn("EventBoundary cannot map a non-wheel event as a wheel event");
      return;
    }
    const wheelEvent = this.createWheelEvent(from);
    this.dispatchEvent(wheelEvent), this.freeEvent(wheelEvent);
  }
  findMountedTarget(propagationPath) {
    if (!propagationPath)
      return null;
    let currentTarget = propagationPath[0];
    for (let i2 = 1;i2 < propagationPath.length && propagationPath[i2].parent === currentTarget; i2++)
      currentTarget = propagationPath[i2];
    return currentTarget;
  }
  createPointerEvent(from, type, target) {
    const event = this.allocateEvent(FederatedPointerEvent);
    return this.copyPointerData(from, event), this.copyMouseData(from, event), this.copyData(from, event), event.nativeEvent = from.nativeEvent, event.originalEvent = from, event.target = target ?? this.hitTest(event.global.x, event.global.y) ?? this._hitElements[0], typeof type == "string" && (event.type = type), event;
  }
  createWheelEvent(from) {
    const event = this.allocateEvent(FederatedWheelEvent);
    return this.copyWheelData(from, event), this.copyMouseData(from, event), this.copyData(from, event), event.nativeEvent = from.nativeEvent, event.originalEvent = from, event.target = this.hitTest(event.global.x, event.global.y), event;
  }
  clonePointerEvent(from, type) {
    const event = this.allocateEvent(FederatedPointerEvent);
    return event.nativeEvent = from.nativeEvent, event.originalEvent = from.originalEvent, this.copyPointerData(from, event), this.copyMouseData(from, event), this.copyData(from, event), event.target = from.target, event.path = from.composedPath().slice(), event.type = type ?? event.type, event;
  }
  copyWheelData(from, to) {
    to.deltaMode = from.deltaMode, to.deltaX = from.deltaX, to.deltaY = from.deltaY, to.deltaZ = from.deltaZ;
  }
  copyPointerData(from, to) {
    from instanceof FederatedPointerEvent && to instanceof FederatedPointerEvent && (to.pointerId = from.pointerId, to.width = from.width, to.height = from.height, to.isPrimary = from.isPrimary, to.pointerType = from.pointerType, to.pressure = from.pressure, to.tangentialPressure = from.tangentialPressure, to.tiltX = from.tiltX, to.tiltY = from.tiltY, to.twist = from.twist);
  }
  copyMouseData(from, to) {
    from instanceof FederatedMouseEvent && to instanceof FederatedMouseEvent && (to.altKey = from.altKey, to.button = from.button, to.buttons = from.buttons, to.client.copyFrom(from.client), to.ctrlKey = from.ctrlKey, to.metaKey = from.metaKey, to.movement.copyFrom(from.movement), to.screen.copyFrom(from.screen), to.shiftKey = from.shiftKey, to.global.copyFrom(from.global));
  }
  copyData(from, to) {
    to.isTrusted = from.isTrusted, to.srcElement = from.srcElement, to.timeStamp = performance.now(), to.type = from.type, to.detail = from.detail, to.view = from.view, to.which = from.which, to.layer.copyFrom(from.layer), to.page.copyFrom(from.page);
  }
  trackingData(id) {
    return this.mappingState.trackingData[id] || (this.mappingState.trackingData[id] = {
      pressTargetsByButton: {},
      clicksByButton: {},
      overTarget: null
    }), this.mappingState.trackingData[id];
  }
  allocateEvent(constructor) {
    this.eventPool.has(constructor) || this.eventPool.set(constructor, []);
    const event = this.eventPool.get(constructor).pop() || new constructor(this);
    return event.eventPhase = event.NONE, event.currentTarget = null, event.path = null, event.target = null, event;
  }
  freeEvent(event) {
    if (event.manager !== this)
      throw new Error("It is illegal to free an event not managed by this EventBoundary!");
    const constructor = event.constructor;
    this.eventPool.has(constructor) || this.eventPool.set(constructor, []), this.eventPool.get(constructor).push(event);
  }
  notifyListeners(e2, type) {
    const listeners = e2.currentTarget._events[type];
    if (listeners && e2.currentTarget.isInteractive())
      if ("fn" in listeners)
        listeners.once && e2.currentTarget.removeListener(type, listeners.fn, undefined, true), listeners.fn.call(listeners.context, e2);
      else
        for (let i2 = 0, j2 = listeners.length;i2 < j2 && !e2.propagationImmediatelyStopped; i2++)
          listeners[i2].once && e2.currentTarget.removeListener(type, listeners[i2].fn, undefined, true), listeners[i2].fn.call(listeners[i2].context, e2);
  }
}

// node_modules/@pixi/events/lib/EventSystem.mjs
var MOUSE_POINTER_ID = 1;
var TOUCH_TO_POINTER = {
  touchstart: "pointerdown",
  touchend: "pointerup",
  touchendoutside: "pointerupoutside",
  touchmove: "pointermove",
  touchcancel: "pointercancel"
};
var _EventSystem = class _EventSystem2 {
  constructor(renderer) {
    this.supportsTouchEvents = ("ontouchstart" in globalThis), this.supportsPointerEvents = !!globalThis.PointerEvent, this.domElement = null, this.resolution = 1, this.renderer = renderer, this.rootBoundary = new EventBoundary(null), EventsTicker.init(this), this.autoPreventDefault = true, this.eventsAdded = false, this.rootPointerEvent = new FederatedPointerEvent(null), this.rootWheelEvent = new FederatedWheelEvent(null), this.cursorStyles = {
      default: "inherit",
      pointer: "pointer"
    }, this.features = new Proxy({ ..._EventSystem2.defaultEventFeatures }, {
      set: (target, key, value) => (key === "globalMove" && (this.rootBoundary.enableGlobalMoveEvents = value), target[key] = value, true)
    }), this.onPointerDown = this.onPointerDown.bind(this), this.onPointerMove = this.onPointerMove.bind(this), this.onPointerUp = this.onPointerUp.bind(this), this.onPointerOverOut = this.onPointerOverOut.bind(this), this.onWheel = this.onWheel.bind(this);
  }
  static get defaultEventMode() {
    return this._defaultEventMode;
  }
  init(options) {
    const { view, resolution } = this.renderer;
    this.setTargetElement(view), this.resolution = resolution, _EventSystem2._defaultEventMode = options.eventMode ?? "auto", Object.assign(this.features, options.eventFeatures ?? {}), this.rootBoundary.enableGlobalMoveEvents = this.features.globalMove;
  }
  resolutionChange(resolution) {
    this.resolution = resolution;
  }
  destroy() {
    this.setTargetElement(null), this.renderer = null;
  }
  setCursor(mode) {
    mode = mode || "default";
    let applyStyles = true;
    if (globalThis.OffscreenCanvas && this.domElement instanceof OffscreenCanvas && (applyStyles = false), this.currentCursor === mode)
      return;
    this.currentCursor = mode;
    const style = this.cursorStyles[mode];
    if (style)
      switch (typeof style) {
        case "string":
          applyStyles && (this.domElement.style.cursor = style);
          break;
        case "function":
          style(mode);
          break;
        case "object":
          applyStyles && Object.assign(this.domElement.style, style);
          break;
      }
    else
      applyStyles && typeof mode == "string" && !Object.prototype.hasOwnProperty.call(this.cursorStyles, mode) && (this.domElement.style.cursor = mode);
  }
  get pointer() {
    return this.rootPointerEvent;
  }
  onPointerDown(nativeEvent) {
    if (!this.features.click)
      return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    const events = this.normalizeToPointerData(nativeEvent);
    this.autoPreventDefault && events[0].isNormalized && (nativeEvent.cancelable || !("cancelable" in nativeEvent)) && nativeEvent.preventDefault();
    for (let i2 = 0, j2 = events.length;i2 < j2; i2++) {
      const nativeEvent2 = events[i2], federatedEvent = this.bootstrapEvent(this.rootPointerEvent, nativeEvent2);
      this.rootBoundary.mapEvent(federatedEvent);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  onPointerMove(nativeEvent) {
    if (!this.features.move)
      return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered, EventsTicker.pointerMoved();
    const normalizedEvents = this.normalizeToPointerData(nativeEvent);
    for (let i2 = 0, j2 = normalizedEvents.length;i2 < j2; i2++) {
      const event = this.bootstrapEvent(this.rootPointerEvent, normalizedEvents[i2]);
      this.rootBoundary.mapEvent(event);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  onPointerUp(nativeEvent) {
    if (!this.features.click)
      return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    let target = nativeEvent.target;
    nativeEvent.composedPath && nativeEvent.composedPath().length > 0 && (target = nativeEvent.composedPath()[0]);
    const outside = target !== this.domElement ? "outside" : "", normalizedEvents = this.normalizeToPointerData(nativeEvent);
    for (let i2 = 0, j2 = normalizedEvents.length;i2 < j2; i2++) {
      const event = this.bootstrapEvent(this.rootPointerEvent, normalizedEvents[i2]);
      event.type += outside, this.rootBoundary.mapEvent(event);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  onPointerOverOut(nativeEvent) {
    if (!this.features.click)
      return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    const normalizedEvents = this.normalizeToPointerData(nativeEvent);
    for (let i2 = 0, j2 = normalizedEvents.length;i2 < j2; i2++) {
      const event = this.bootstrapEvent(this.rootPointerEvent, normalizedEvents[i2]);
      this.rootBoundary.mapEvent(event);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  onWheel(nativeEvent) {
    if (!this.features.wheel)
      return;
    const wheelEvent = this.normalizeWheelEvent(nativeEvent);
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered, this.rootBoundary.mapEvent(wheelEvent);
  }
  setTargetElement(element) {
    this.removeEvents(), this.domElement = element, EventsTicker.domElement = element, this.addEvents();
  }
  addEvents() {
    if (this.eventsAdded || !this.domElement)
      return;
    EventsTicker.addTickerListener();
    const style = this.domElement.style;
    style && (globalThis.navigator.msPointerEnabled ? (style.msContentZooming = "none", style.msTouchAction = "none") : this.supportsPointerEvents && (style.touchAction = "none")), this.supportsPointerEvents ? (globalThis.document.addEventListener("pointermove", this.onPointerMove, true), this.domElement.addEventListener("pointerdown", this.onPointerDown, true), this.domElement.addEventListener("pointerleave", this.onPointerOverOut, true), this.domElement.addEventListener("pointerover", this.onPointerOverOut, true), globalThis.addEventListener("pointerup", this.onPointerUp, true)) : (globalThis.document.addEventListener("mousemove", this.onPointerMove, true), this.domElement.addEventListener("mousedown", this.onPointerDown, true), this.domElement.addEventListener("mouseout", this.onPointerOverOut, true), this.domElement.addEventListener("mouseover", this.onPointerOverOut, true), globalThis.addEventListener("mouseup", this.onPointerUp, true), this.supportsTouchEvents && (this.domElement.addEventListener("touchstart", this.onPointerDown, true), this.domElement.addEventListener("touchend", this.onPointerUp, true), this.domElement.addEventListener("touchmove", this.onPointerMove, true))), this.domElement.addEventListener("wheel", this.onWheel, {
      passive: true,
      capture: true
    }), this.eventsAdded = true;
  }
  removeEvents() {
    if (!this.eventsAdded || !this.domElement)
      return;
    EventsTicker.removeTickerListener();
    const style = this.domElement.style;
    globalThis.navigator.msPointerEnabled ? (style.msContentZooming = "", style.msTouchAction = "") : this.supportsPointerEvents && (style.touchAction = ""), this.supportsPointerEvents ? (globalThis.document.removeEventListener("pointermove", this.onPointerMove, true), this.domElement.removeEventListener("pointerdown", this.onPointerDown, true), this.domElement.removeEventListener("pointerleave", this.onPointerOverOut, true), this.domElement.removeEventListener("pointerover", this.onPointerOverOut, true), globalThis.removeEventListener("pointerup", this.onPointerUp, true)) : (globalThis.document.removeEventListener("mousemove", this.onPointerMove, true), this.domElement.removeEventListener("mousedown", this.onPointerDown, true), this.domElement.removeEventListener("mouseout", this.onPointerOverOut, true), this.domElement.removeEventListener("mouseover", this.onPointerOverOut, true), globalThis.removeEventListener("mouseup", this.onPointerUp, true), this.supportsTouchEvents && (this.domElement.removeEventListener("touchstart", this.onPointerDown, true), this.domElement.removeEventListener("touchend", this.onPointerUp, true), this.domElement.removeEventListener("touchmove", this.onPointerMove, true))), this.domElement.removeEventListener("wheel", this.onWheel, true), this.domElement = null, this.eventsAdded = false;
  }
  mapPositionToPoint(point, x2, y2) {
    const rect = this.domElement.isConnected ? this.domElement.getBoundingClientRect() : {
      x: 0,
      y: 0,
      width: this.domElement.width,
      height: this.domElement.height,
      left: 0,
      top: 0
    }, resolutionMultiplier = 1 / this.resolution;
    point.x = (x2 - rect.left) * (this.domElement.width / rect.width) * resolutionMultiplier, point.y = (y2 - rect.top) * (this.domElement.height / rect.height) * resolutionMultiplier;
  }
  normalizeToPointerData(event) {
    const normalizedEvents = [];
    if (this.supportsTouchEvents && event instanceof TouchEvent)
      for (let i2 = 0, li = event.changedTouches.length;i2 < li; i2++) {
        const touch = event.changedTouches[i2];
        typeof touch.button > "u" && (touch.button = 0), typeof touch.buttons > "u" && (touch.buttons = 1), typeof touch.isPrimary > "u" && (touch.isPrimary = event.touches.length === 1 && event.type === "touchstart"), typeof touch.width > "u" && (touch.width = touch.radiusX || 1), typeof touch.height > "u" && (touch.height = touch.radiusY || 1), typeof touch.tiltX > "u" && (touch.tiltX = 0), typeof touch.tiltY > "u" && (touch.tiltY = 0), typeof touch.pointerType > "u" && (touch.pointerType = "touch"), typeof touch.pointerId > "u" && (touch.pointerId = touch.identifier || 0), typeof touch.pressure > "u" && (touch.pressure = touch.force || 0.5), typeof touch.twist > "u" && (touch.twist = 0), typeof touch.tangentialPressure > "u" && (touch.tangentialPressure = 0), typeof touch.layerX > "u" && (touch.layerX = touch.offsetX = touch.clientX), typeof touch.layerY > "u" && (touch.layerY = touch.offsetY = touch.clientY), touch.isNormalized = true, touch.type = event.type, normalizedEvents.push(touch);
      }
    else if (!globalThis.MouseEvent || event instanceof MouseEvent && (!this.supportsPointerEvents || !(event instanceof globalThis.PointerEvent))) {
      const tempEvent = event;
      typeof tempEvent.isPrimary > "u" && (tempEvent.isPrimary = true), typeof tempEvent.width > "u" && (tempEvent.width = 1), typeof tempEvent.height > "u" && (tempEvent.height = 1), typeof tempEvent.tiltX > "u" && (tempEvent.tiltX = 0), typeof tempEvent.tiltY > "u" && (tempEvent.tiltY = 0), typeof tempEvent.pointerType > "u" && (tempEvent.pointerType = "mouse"), typeof tempEvent.pointerId > "u" && (tempEvent.pointerId = MOUSE_POINTER_ID), typeof tempEvent.pressure > "u" && (tempEvent.pressure = 0.5), typeof tempEvent.twist > "u" && (tempEvent.twist = 0), typeof tempEvent.tangentialPressure > "u" && (tempEvent.tangentialPressure = 0), tempEvent.isNormalized = true, normalizedEvents.push(tempEvent);
    } else
      normalizedEvents.push(event);
    return normalizedEvents;
  }
  normalizeWheelEvent(nativeEvent) {
    const event = this.rootWheelEvent;
    return this.transferMouseData(event, nativeEvent), event.deltaX = nativeEvent.deltaX, event.deltaY = nativeEvent.deltaY, event.deltaZ = nativeEvent.deltaZ, event.deltaMode = nativeEvent.deltaMode, this.mapPositionToPoint(event.screen, nativeEvent.clientX, nativeEvent.clientY), event.global.copyFrom(event.screen), event.offset.copyFrom(event.screen), event.nativeEvent = nativeEvent, event.type = nativeEvent.type, event;
  }
  bootstrapEvent(event, nativeEvent) {
    return event.originalEvent = null, event.nativeEvent = nativeEvent, event.pointerId = nativeEvent.pointerId, event.width = nativeEvent.width, event.height = nativeEvent.height, event.isPrimary = nativeEvent.isPrimary, event.pointerType = nativeEvent.pointerType, event.pressure = nativeEvent.pressure, event.tangentialPressure = nativeEvent.tangentialPressure, event.tiltX = nativeEvent.tiltX, event.tiltY = nativeEvent.tiltY, event.twist = nativeEvent.twist, this.transferMouseData(event, nativeEvent), this.mapPositionToPoint(event.screen, nativeEvent.clientX, nativeEvent.clientY), event.global.copyFrom(event.screen), event.offset.copyFrom(event.screen), event.isTrusted = nativeEvent.isTrusted, event.type === "pointerleave" && (event.type = "pointerout"), event.type.startsWith("mouse") && (event.type = event.type.replace("mouse", "pointer")), event.type.startsWith("touch") && (event.type = TOUCH_TO_POINTER[event.type] || event.type), event;
  }
  transferMouseData(event, nativeEvent) {
    event.isTrusted = nativeEvent.isTrusted, event.srcElement = nativeEvent.srcElement, event.timeStamp = performance.now(), event.type = nativeEvent.type, event.altKey = nativeEvent.altKey, event.button = nativeEvent.button, event.buttons = nativeEvent.buttons, event.client.x = nativeEvent.clientX, event.client.y = nativeEvent.clientY, event.ctrlKey = nativeEvent.ctrlKey, event.metaKey = nativeEvent.metaKey, event.movement.x = nativeEvent.movementX, event.movement.y = nativeEvent.movementY, event.page.x = nativeEvent.pageX, event.page.y = nativeEvent.pageY, event.relatedTarget = null, event.shiftKey = nativeEvent.shiftKey;
  }
};
_EventSystem.extension = {
  name: "events",
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ]
}, _EventSystem.defaultEventFeatures = {
  move: true,
  globalMove: true,
  click: true,
  wheel: true
};
var EventSystem = _EventSystem;
extensions.add(EventSystem);

// node_modules/@pixi/events/lib/FederatedEventTarget.mjs
var convertEventModeToInteractiveMode = function(mode) {
  return mode === "dynamic" || mode === "static";
};
var FederatedDisplayObject = {
  onclick: null,
  onmousedown: null,
  onmouseenter: null,
  onmouseleave: null,
  onmousemove: null,
  onglobalmousemove: null,
  onmouseout: null,
  onmouseover: null,
  onmouseup: null,
  onmouseupoutside: null,
  onpointercancel: null,
  onpointerdown: null,
  onpointerenter: null,
  onpointerleave: null,
  onpointermove: null,
  onglobalpointermove: null,
  onpointerout: null,
  onpointerover: null,
  onpointertap: null,
  onpointerup: null,
  onpointerupoutside: null,
  onrightclick: null,
  onrightdown: null,
  onrightup: null,
  onrightupoutside: null,
  ontap: null,
  ontouchcancel: null,
  ontouchend: null,
  ontouchendoutside: null,
  ontouchmove: null,
  onglobaltouchmove: null,
  ontouchstart: null,
  onwheel: null,
  _internalInteractive: undefined,
  get interactive() {
    return this._internalInteractive ?? convertEventModeToInteractiveMode(EventSystem.defaultEventMode);
  },
  set interactive(value) {
    exports_lib.deprecation("7.2.0", "Setting interactive is deprecated, use eventMode = 'none'/'passive'/'auto'/'static'/'dynamic' instead."), this._internalInteractive = value, this.eventMode = value ? "static" : "auto";
  },
  _internalEventMode: undefined,
  get eventMode() {
    return this._internalEventMode ?? EventSystem.defaultEventMode;
  },
  set eventMode(value) {
    this._internalInteractive = convertEventModeToInteractiveMode(value), this._internalEventMode = value;
  },
  isInteractive() {
    return this.eventMode === "static" || this.eventMode === "dynamic";
  },
  interactiveChildren: true,
  hitArea: null,
  addEventListener(type, listener, options) {
    const capture = typeof options == "boolean" && options || typeof options == "object" && options.capture, context2 = typeof listener == "function" ? undefined : listener;
    type = capture ? `${type}capture` : type, listener = typeof listener == "function" ? listener : listener.handleEvent, this.on(type, listener, context2);
  },
  removeEventListener(type, listener, options) {
    const capture = typeof options == "boolean" && options || typeof options == "object" && options.capture, context2 = typeof listener == "function" ? undefined : listener;
    type = capture ? `${type}capture` : type, listener = typeof listener == "function" ? listener : listener.handleEvent, this.off(type, listener, context2);
  },
  dispatchEvent(e2) {
    if (!(e2 instanceof FederatedEvent))
      throw new Error("DisplayObject cannot propagate events outside of the Federated Events API");
    return e2.defaultPrevented = false, e2.path = null, e2.target = this, e2.manager.dispatchEvent(e2), !e2.defaultPrevented;
  }
};
DisplayObject.mixin(FederatedDisplayObject);

// node_modules/@pixi/accessibility/lib/accessibleTarget.mjs
var accessibleTarget = {
  accessible: false,
  accessibleTitle: null,
  accessibleHint: null,
  tabIndex: 0,
  _accessibleActive: false,
  _accessibleDiv: null,
  accessibleType: "button",
  accessiblePointerEvents: "auto",
  accessibleChildren: true,
  renderId: -1
};

// node_modules/@pixi/accessibility/lib/AccessibilityManager.mjs
DisplayObject.mixin(accessibleTarget);
var KEY_CODE_TAB = 9;
var DIV_TOUCH_SIZE = 100;
var DIV_TOUCH_POS_X = 0;
var DIV_TOUCH_POS_Y = 0;
var DIV_TOUCH_ZINDEX = 2;
var DIV_HOOK_SIZE = 1;
var DIV_HOOK_POS_X = -1000;
var DIV_HOOK_POS_Y = -1000;
var DIV_HOOK_ZINDEX = 2;

class AccessibilityManager {
  constructor(renderer) {
    this.debug = false, this._isActive = false, this._isMobileAccessibility = false, this.pool = [], this.renderId = 0, this.children = [], this.androidUpdateCount = 0, this.androidUpdateFrequency = 500, this._hookDiv = null, (exports_lib.isMobile.tablet || exports_lib.isMobile.phone) && this.createTouchHook();
    const div = document.createElement("div");
    div.style.width = `${DIV_TOUCH_SIZE}px`, div.style.height = `${DIV_TOUCH_SIZE}px`, div.style.position = "absolute", div.style.top = `${DIV_TOUCH_POS_X}px`, div.style.left = `${DIV_TOUCH_POS_Y}px`, div.style.zIndex = DIV_TOUCH_ZINDEX.toString(), this.div = div, this.renderer = renderer, this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), globalThis.addEventListener("keydown", this._onKeyDown, false);
  }
  get isActive() {
    return this._isActive;
  }
  get isMobileAccessibility() {
    return this._isMobileAccessibility;
  }
  createTouchHook() {
    const hookDiv = document.createElement("button");
    hookDiv.style.width = `${DIV_HOOK_SIZE}px`, hookDiv.style.height = `${DIV_HOOK_SIZE}px`, hookDiv.style.position = "absolute", hookDiv.style.top = `${DIV_HOOK_POS_X}px`, hookDiv.style.left = `${DIV_HOOK_POS_Y}px`, hookDiv.style.zIndex = DIV_HOOK_ZINDEX.toString(), hookDiv.style.backgroundColor = "#FF0000", hookDiv.title = "select to enable accessibility for this content", hookDiv.addEventListener("focus", () => {
      this._isMobileAccessibility = true, this.activate(), this.destroyTouchHook();
    }), document.body.appendChild(hookDiv), this._hookDiv = hookDiv;
  }
  destroyTouchHook() {
    this._hookDiv && (document.body.removeChild(this._hookDiv), this._hookDiv = null);
  }
  activate() {
    this._isActive || (this._isActive = true, globalThis.document.addEventListener("mousemove", this._onMouseMove, true), globalThis.removeEventListener("keydown", this._onKeyDown, false), this.renderer.on("postrender", this.update, this), this.renderer.view.parentNode?.appendChild(this.div));
  }
  deactivate() {
    !this._isActive || this._isMobileAccessibility || (this._isActive = false, globalThis.document.removeEventListener("mousemove", this._onMouseMove, true), globalThis.addEventListener("keydown", this._onKeyDown, false), this.renderer.off("postrender", this.update), this.div.parentNode?.removeChild(this.div));
  }
  updateAccessibleObjects(displayObject) {
    if (!displayObject.visible || !displayObject.accessibleChildren)
      return;
    displayObject.accessible && displayObject.isInteractive() && (displayObject._accessibleActive || this.addChild(displayObject), displayObject.renderId = this.renderId);
    const children = displayObject.children;
    if (children)
      for (let i2 = 0;i2 < children.length; i2++)
        this.updateAccessibleObjects(children[i2]);
  }
  update() {
    const now = performance.now();
    if (exports_lib.isMobile.android.device && now < this.androidUpdateCount || (this.androidUpdateCount = now + this.androidUpdateFrequency, !this.renderer.renderingToScreen))
      return;
    this.renderer.lastObjectRendered && this.updateAccessibleObjects(this.renderer.lastObjectRendered);
    const { x: x2, y: y2, width, height } = this.renderer.view.getBoundingClientRect(), { width: viewWidth, height: viewHeight, resolution } = this.renderer, sx = width / viewWidth * resolution, sy = height / viewHeight * resolution;
    let div = this.div;
    div.style.left = `${x2}px`, div.style.top = `${y2}px`, div.style.width = `${viewWidth}px`, div.style.height = `${viewHeight}px`;
    for (let i2 = 0;i2 < this.children.length; i2++) {
      const child = this.children[i2];
      if (child.renderId !== this.renderId)
        child._accessibleActive = false, exports_lib.removeItems(this.children, i2, 1), this.div.removeChild(child._accessibleDiv), this.pool.push(child._accessibleDiv), child._accessibleDiv = null, i2--;
      else {
        div = child._accessibleDiv;
        let hitArea = child.hitArea;
        const wt = child.worldTransform;
        child.hitArea ? (div.style.left = `${(wt.tx + hitArea.x * wt.a) * sx}px`, div.style.top = `${(wt.ty + hitArea.y * wt.d) * sy}px`, div.style.width = `${hitArea.width * wt.a * sx}px`, div.style.height = `${hitArea.height * wt.d * sy}px`) : (hitArea = child.getBounds(), this.capHitArea(hitArea), div.style.left = `${hitArea.x * sx}px`, div.style.top = `${hitArea.y * sy}px`, div.style.width = `${hitArea.width * sx}px`, div.style.height = `${hitArea.height * sy}px`, div.title !== child.accessibleTitle && child.accessibleTitle !== null && (div.title = child.accessibleTitle), div.getAttribute("aria-label") !== child.accessibleHint && child.accessibleHint !== null && div.setAttribute("aria-label", child.accessibleHint)), (child.accessibleTitle !== div.title || child.tabIndex !== div.tabIndex) && (div.title = child.accessibleTitle, div.tabIndex = child.tabIndex, this.debug && this.updateDebugHTML(div));
      }
    }
    this.renderId++;
  }
  updateDebugHTML(div) {
    div.innerHTML = `type: ${div.type}</br> title : ${div.title}</br> tabIndex: ${div.tabIndex}`;
  }
  capHitArea(hitArea) {
    hitArea.x < 0 && (hitArea.width += hitArea.x, hitArea.x = 0), hitArea.y < 0 && (hitArea.height += hitArea.y, hitArea.y = 0);
    const { width: viewWidth, height: viewHeight } = this.renderer;
    hitArea.x + hitArea.width > viewWidth && (hitArea.width = viewWidth - hitArea.x), hitArea.y + hitArea.height > viewHeight && (hitArea.height = viewHeight - hitArea.y);
  }
  addChild(displayObject) {
    let div = this.pool.pop();
    div || (div = document.createElement("button"), div.style.width = `${DIV_TOUCH_SIZE}px`, div.style.height = `${DIV_TOUCH_SIZE}px`, div.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent", div.style.position = "absolute", div.style.zIndex = DIV_TOUCH_ZINDEX.toString(), div.style.borderStyle = "none", navigator.userAgent.toLowerCase().includes("chrome") ? div.setAttribute("aria-live", "off") : div.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? div.setAttribute("aria-relevant", "additions") : div.setAttribute("aria-relevant", "text"), div.addEventListener("click", this._onClick.bind(this)), div.addEventListener("focus", this._onFocus.bind(this)), div.addEventListener("focusout", this._onFocusOut.bind(this))), div.style.pointerEvents = displayObject.accessiblePointerEvents, div.type = displayObject.accessibleType, displayObject.accessibleTitle && displayObject.accessibleTitle !== null ? div.title = displayObject.accessibleTitle : (!displayObject.accessibleHint || displayObject.accessibleHint === null) && (div.title = `displayObject ${displayObject.tabIndex}`), displayObject.accessibleHint && displayObject.accessibleHint !== null && div.setAttribute("aria-label", displayObject.accessibleHint), this.debug && this.updateDebugHTML(div), displayObject._accessibleActive = true, displayObject._accessibleDiv = div, div.displayObject = displayObject, this.children.push(displayObject), this.div.appendChild(displayObject._accessibleDiv), displayObject._accessibleDiv.tabIndex = displayObject.tabIndex;
  }
  _dispatchEvent(e2, type) {
    const { displayObject: target } = e2.target, boundry = this.renderer.events.rootBoundary, event = Object.assign(new FederatedEvent(boundry), { target });
    boundry.rootTarget = this.renderer.lastObjectRendered, type.forEach((type2) => boundry.dispatchEvent(event, type2));
  }
  _onClick(e2) {
    this._dispatchEvent(e2, ["click", "pointertap", "tap"]);
  }
  _onFocus(e2) {
    e2.target.getAttribute("aria-live") || e2.target.setAttribute("aria-live", "assertive"), this._dispatchEvent(e2, ["mouseover"]);
  }
  _onFocusOut(e2) {
    e2.target.getAttribute("aria-live") || e2.target.setAttribute("aria-live", "polite"), this._dispatchEvent(e2, ["mouseout"]);
  }
  _onKeyDown(e2) {
    e2.keyCode === KEY_CODE_TAB && this.activate();
  }
  _onMouseMove(e2) {
    e2.movementX === 0 && e2.movementY === 0 || this.deactivate();
  }
  destroy() {
    this.destroyTouchHook(), this.div = null, globalThis.document.removeEventListener("mousemove", this._onMouseMove, true), globalThis.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null;
  }
}
AccessibilityManager.extension = {
  name: "accessibility",
  type: [
    ExtensionType.RendererPlugin,
    ExtensionType.CanvasRendererPlugin
  ]
};
extensions.add(AccessibilityManager);
// node_modules/@pixi/app/lib/Application.mjs
var _Application = class _Application2 {
  constructor(options) {
    this.stage = new Container, options = Object.assign({
      forceCanvas: false
    }, options), this.renderer = autoDetectRenderer(options), _Application2._plugins.forEach((plugin) => {
      plugin.init.call(this, options);
    });
  }
  render() {
    this.renderer.render(this.stage);
  }
  get view() {
    return this.renderer?.view;
  }
  get screen() {
    return this.renderer?.screen;
  }
  destroy(removeView, stageOptions) {
    const plugins = _Application2._plugins.slice(0);
    plugins.reverse(), plugins.forEach((plugin) => {
      plugin.destroy.call(this);
    }), this.stage.destroy(stageOptions), this.stage = null, this.renderer.destroy(removeView), this.renderer = null;
  }
};
_Application._plugins = [];
var Application = _Application;
extensions.handleByList(ExtensionType.Application, Application._plugins);

// node_modules/@pixi/app/lib/ResizePlugin.mjs
class ResizePlugin {
  static init(options) {
    Object.defineProperty(this, "resizeTo", {
      set(dom) {
        globalThis.removeEventListener("resize", this.queueResize), this._resizeTo = dom, dom && (globalThis.addEventListener("resize", this.queueResize), this.resize());
      },
      get() {
        return this._resizeTo;
      }
    }), this.queueResize = () => {
      this._resizeTo && (this.cancelResize(), this._resizeId = requestAnimationFrame(() => this.resize()));
    }, this.cancelResize = () => {
      this._resizeId && (cancelAnimationFrame(this._resizeId), this._resizeId = null);
    }, this.resize = () => {
      if (!this._resizeTo)
        return;
      this.cancelResize();
      let width, height;
      if (this._resizeTo === globalThis.window)
        width = globalThis.innerWidth, height = globalThis.innerHeight;
      else {
        const { clientWidth, clientHeight } = this._resizeTo;
        width = clientWidth, height = clientHeight;
      }
      this.renderer.resize(width, height), this.render();
    }, this._resizeId = null, this._resizeTo = null, this.resizeTo = options.resizeTo || null;
  }
  static destroy() {
    globalThis.removeEventListener("resize", this.queueResize), this.cancelResize(), this.cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
  }
}
ResizePlugin.extension = ExtensionType.Application;
extensions.add(ResizePlugin);
// node_modules/@pixi/assets/lib/AssetExtension.mjs
var assetKeyMap = {
  loader: ExtensionType.LoadParser,
  resolver: ExtensionType.ResolveParser,
  cache: ExtensionType.CacheParser,
  detection: ExtensionType.DetectionParser
};
extensions.handle(ExtensionType.Asset, (extension) => {
  const ref = extension.ref;
  Object.entries(assetKeyMap).filter(([key]) => !!ref[key]).forEach(([key, type]) => extensions.add(Object.assign(ref[key], { extension: ref[key].extension ?? type })));
}, (extension) => {
  const ref = extension.ref;
  Object.keys(assetKeyMap).filter((key) => !!ref[key]).forEach((key) => extensions.remove(ref[key]));
});

// node_modules/@pixi/assets/lib/BackgroundLoader.mjs
class BackgroundLoader {
  constructor(loader, verbose = false) {
    this._loader = loader, this._assetList = [], this._isLoading = false, this._maxConcurrent = 1, this.verbose = verbose;
  }
  add(assetUrls) {
    assetUrls.forEach((a2) => {
      this._assetList.push(a2);
    }), this.verbose && console.log("[BackgroundLoader] assets: ", this._assetList), this._isActive && !this._isLoading && this._next();
  }
  async _next() {
    if (this._assetList.length && this._isActive) {
      this._isLoading = true;
      const toLoad = [], toLoadAmount = Math.min(this._assetList.length, this._maxConcurrent);
      for (let i2 = 0;i2 < toLoadAmount; i2++)
        toLoad.push(this._assetList.pop());
      await this._loader.load(toLoad), this._isLoading = false, this._next();
    }
  }
  get active() {
    return this._isActive;
  }
  set active(value) {
    this._isActive !== value && (this._isActive = value, value && !this._isLoading && this._next());
  }
}

// node_modules/@pixi/assets/lib/utils/checkDataUrl.mjs
var checkDataUrl = function(url3, mimes) {
  if (Array.isArray(mimes)) {
    for (const mime of mimes)
      if (url3.startsWith(`data:${mime}`))
        return true;
    return false;
  }
  return url3.startsWith(`data:${mimes}`);
};

// node_modules/@pixi/assets/lib/utils/checkExtension.mjs
var checkExtension = function(url3, extension) {
  const tempURL = url3.split("?")[0], ext = exports_lib.path.extname(tempURL).toLowerCase();
  return Array.isArray(extension) ? extension.includes(ext) : ext === extension;
};

// node_modules/@pixi/assets/lib/utils/convertToList.mjs
var convertToList = (input, transform, forceTransform = false) => (Array.isArray(input) || (input = [input]), transform ? input.map((item) => typeof item == "string" || forceTransform ? transform(item) : item) : input);

// node_modules/@pixi/assets/lib/utils/copySearchParams.mjs
var copySearchParams = (targetUrl, sourceUrl) => {
  const searchParams = sourceUrl.split("?")[1];
  return searchParams && (targetUrl += `?${searchParams}`), targetUrl;
};

// node_modules/@pixi/assets/lib/utils/createStringVariations.mjs
var processX = function(base, ids, depth, result, tags) {
  const id = ids[depth];
  for (let i2 = 0;i2 < id.length; i2++) {
    const value = id[i2];
    depth < ids.length - 1 ? processX(base.replace(result[depth], value), ids, depth + 1, result, tags) : tags.push(base.replace(result[depth], value));
  }
};
var createStringVariations = function(string) {
  const regex = /\{(.*?)\}/g, result = string.match(regex), tags = [];
  if (result) {
    const ids = [];
    result.forEach((vars) => {
      const split = vars.substring(1, vars.length - 1).split(",");
      ids.push(split);
    }), processX(string, ids, 0, result, tags);
  } else
    tags.push(string);
  return tags;
};

// node_modules/@pixi/assets/lib/utils/isSingleItem.mjs
var isSingleItem = (item) => !Array.isArray(item);

// node_modules/@pixi/assets/lib/cache/Cache.mjs
class CacheClass {
  constructor() {
    this._parsers = [], this._cache = new Map, this._cacheMap = new Map;
  }
  reset() {
    this._cacheMap.clear(), this._cache.clear();
  }
  has(key) {
    return this._cache.has(key);
  }
  get(key) {
    const result = this._cache.get(key);
    return result || console.warn(`[Assets] Asset id ${key} was not found in the Cache`), result;
  }
  set(key, value) {
    const keys = convertToList(key);
    let cacheableAssets;
    for (let i2 = 0;i2 < this.parsers.length; i2++) {
      const parser = this.parsers[i2];
      if (parser.test(value)) {
        cacheableAssets = parser.getCacheableAssets(keys, value);
        break;
      }
    }
    cacheableAssets || (cacheableAssets = {}, keys.forEach((key2) => {
      cacheableAssets[key2] = value;
    }));
    const cacheKeys = Object.keys(cacheableAssets), cachedAssets = {
      cacheKeys,
      keys
    };
    if (keys.forEach((key2) => {
      this._cacheMap.set(key2, cachedAssets);
    }), cacheKeys.forEach((key2) => {
      this._cache.has(key2) && this._cache.get(key2) !== value && console.warn("[Cache] already has key:", key2), this._cache.set(key2, cacheableAssets[key2]);
    }), value instanceof Texture) {
      const texture = value;
      keys.forEach((key2) => {
        texture.baseTexture !== Texture.EMPTY.baseTexture && BaseTexture.addToCache(texture.baseTexture, key2), Texture.addToCache(texture, key2);
      });
    }
  }
  remove(key) {
    if (!this._cacheMap.has(key)) {
      console.warn(`[Assets] Asset id ${key} was not found in the Cache`);
      return;
    }
    const cacheMap = this._cacheMap.get(key);
    cacheMap.cacheKeys.forEach((key2) => {
      this._cache.delete(key2);
    }), cacheMap.keys.forEach((key2) => {
      this._cacheMap.delete(key2);
    });
  }
  get parsers() {
    return this._parsers;
  }
}
var Cache = new CacheClass;

// node_modules/@pixi/assets/lib/loader/Loader.mjs
class Loader {
  constructor() {
    this._parsers = [], this._parsersValidated = false, this.parsers = new Proxy(this._parsers, {
      set: (target, key, value) => (this._parsersValidated = false, target[key] = value, true)
    }), this.promiseCache = {};
  }
  reset() {
    this._parsersValidated = false, this.promiseCache = {};
  }
  _getLoadPromiseAndParser(url3, data) {
    const result = {
      promise: null,
      parser: null
    };
    return result.promise = (async () => {
      let asset = null, parser = null;
      if (data.loadParser && (parser = this._parserHash[data.loadParser], parser || console.warn(`[Assets] specified load parser "${data.loadParser}" not found while loading ${url3}`)), !parser) {
        for (let i2 = 0;i2 < this.parsers.length; i2++) {
          const parserX = this.parsers[i2];
          if (parserX.load && parserX.test?.(url3, data, this)) {
            parser = parserX;
            break;
          }
        }
        if (!parser)
          return console.warn(`[Assets] ${url3} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`), null;
      }
      asset = await parser.load(url3, data, this), result.parser = parser;
      for (let i2 = 0;i2 < this.parsers.length; i2++) {
        const parser2 = this.parsers[i2];
        parser2.parse && parser2.parse && await parser2.testParse?.(asset, data, this) && (asset = await parser2.parse(asset, data, this) || asset, result.parser = parser2);
      }
      return asset;
    })(), result;
  }
  async load(assetsToLoadIn, onProgress) {
    this._parsersValidated || this._validateParsers();
    let count = 0;
    const assets = {}, singleAsset = isSingleItem(assetsToLoadIn), assetsToLoad = convertToList(assetsToLoadIn, (item) => ({
      alias: [item],
      src: item
    })), total = assetsToLoad.length, promises = assetsToLoad.map(async (asset) => {
      const url3 = exports_lib.path.toAbsolute(asset.src);
      if (!assets[asset.src])
        try {
          this.promiseCache[url3] || (this.promiseCache[url3] = this._getLoadPromiseAndParser(url3, asset)), assets[asset.src] = await this.promiseCache[url3].promise, onProgress && onProgress(++count / total);
        } catch (e2) {
          throw delete this.promiseCache[url3], delete assets[asset.src], new Error(`[Loader.load] Failed to load ${url3}.
${e2}`);
        }
    });
    return await Promise.all(promises), singleAsset ? assets[assetsToLoad[0].src] : assets;
  }
  async unload(assetsToUnloadIn) {
    const promises = convertToList(assetsToUnloadIn, (item) => ({
      alias: [item],
      src: item
    })).map(async (asset) => {
      const url3 = exports_lib.path.toAbsolute(asset.src), loadPromise = this.promiseCache[url3];
      if (loadPromise) {
        const loadedAsset = await loadPromise.promise;
        delete this.promiseCache[url3], loadPromise.parser?.unload?.(loadedAsset, asset, this);
      }
    });
    await Promise.all(promises);
  }
  _validateParsers() {
    this._parsersValidated = true, this._parserHash = this._parsers.filter((parser) => parser.name).reduce((hash, parser) => (hash[parser.name] && console.warn(`[Assets] loadParser name conflict "${parser.name}"`), { ...hash, [parser.name]: parser }), {});
  }
}

// node_modules/@pixi/assets/lib/loader/parsers/LoaderParser.mjs
var LoaderParserPriority = ((LoaderParserPriority2) => (LoaderParserPriority2[LoaderParserPriority2.Low = 0] = "Low", LoaderParserPriority2[LoaderParserPriority2.Normal = 1] = "Normal", LoaderParserPriority2[LoaderParserPriority2.High = 2] = "High", LoaderParserPriority2))(LoaderParserPriority || {});

// node_modules/@pixi/assets/lib/loader/parsers/loadJson.mjs
var validJSONExtension = ".json";
var validJSONMIME = "application/json";
var loadJson = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Low
  },
  name: "loadJson",
  test(url3) {
    return checkDataUrl(url3, validJSONMIME) || checkExtension(url3, validJSONExtension);
  },
  async load(url3) {
    return await (await settings.ADAPTER.fetch(url3)).json();
  }
};
extensions.add(loadJson);

// node_modules/@pixi/assets/lib/loader/parsers/loadTxt.mjs
var validTXTExtension = ".txt";
var validTXTMIME = "text/plain";
var loadTxt = {
  name: "loadTxt",
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Low
  },
  test(url3) {
    return checkDataUrl(url3, validTXTMIME) || checkExtension(url3, validTXTExtension);
  },
  async load(url3) {
    return await (await settings.ADAPTER.fetch(url3)).text();
  }
};
extensions.add(loadTxt);

// node_modules/@pixi/assets/lib/loader/parsers/loadWebFont.mjs
var getFontFamilyName = function(url3) {
  const ext = exports_lib.path.extname(url3), nameTokens = exports_lib.path.basename(url3, ext).replace(/(-|_)/g, " ").toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  let valid = nameTokens.length > 0;
  for (const token of nameTokens)
    if (!token.match(CSS_IDENT_TOKEN_REGEX)) {
      valid = false;
      break;
    }
  let fontFamilyName = nameTokens.join(" ");
  return valid || (fontFamilyName = `"${fontFamilyName.replace(/[\\"]/g, "\\$&")}"`), fontFamilyName;
};
var validWeights = [
  "normal",
  "bold",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900"
];
var validFontExtensions = [".ttf", ".otf", ".woff", ".woff2"];
var validFontMIMEs = [
  "font/ttf",
  "font/otf",
  "font/woff",
  "font/woff2"
];
var CSS_IDENT_TOKEN_REGEX = /^(--|-?[A-Z_])[0-9A-Z_-]*$/i;
var loadWebFont = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Low
  },
  name: "loadWebFont",
  test(url3) {
    return checkDataUrl(url3, validFontMIMEs) || checkExtension(url3, validFontExtensions);
  },
  async load(url3, options) {
    const fonts = settings.ADAPTER.getFontFaceSet();
    if (fonts) {
      const fontFaces = [], name = options.data?.family ?? getFontFamilyName(url3), weights = options.data?.weights?.filter((weight) => validWeights.includes(weight)) ?? ["normal"], data = options.data ?? {};
      for (let i2 = 0;i2 < weights.length; i2++) {
        const weight = weights[i2], font = new FontFace(name, `url(${encodeURI(url3)})`, {
          ...data,
          weight
        });
        await font.load(), fonts.add(font), fontFaces.push(font);
      }
      return fontFaces.length === 1 ? fontFaces[0] : fontFaces;
    }
    return console.warn("[loadWebFont] FontFace API is not supported. Skipping loading font"), null;
  },
  unload(font) {
    (Array.isArray(font) ? font : [font]).forEach((t2) => settings.ADAPTER.getFontFaceSet().delete(t2));
  }
};
extensions.add(loadWebFont);

// node_modules/@pixi/assets/lib/loader/parsers/WorkerManager.mjs
var UUID = 0;
var MAX_WORKERS;
var WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
var checkImageBitmapCode = {
  id: "checkImageBitmap",
  code: `
    async function checkImageBitmap()
    {
        try
        {
            if (typeof createImageBitmap !== 'function') return false;

            const response = await fetch('${WHITE_PNG}');
            const imageBlob =  await response.blob();
            const imageBitmap = await createImageBitmap(imageBlob);

            return imageBitmap.width === 1 && imageBitmap.height === 1;
        }
        catch (e)
        {
            return false;
        }
    }
    checkImageBitmap().then((result) => { self.postMessage(result); });
    `
};
var workerCode = {
  id: "loadImageBitmap",
  code: `
    async function loadImageBitmap(url)
    {
        const response = await fetch(url);

        if (!response.ok)
        {
            throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \`
                + \`\${response.status} \${response.statusText}\`);
        }

        const imageBlob =  await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);

        return imageBitmap;
    }
    self.onmessage = async (event) =>
    {
        try
        {
            const imageBitmap = await loadImageBitmap(event.data.data[0]);

            self.postMessage({
                data: imageBitmap,
                uuid: event.data.uuid,
                id: event.data.id,
            }, [imageBitmap]);
        }
        catch(e)
        {
            self.postMessage({
                error: e,
                uuid: event.data.uuid,
                id: event.data.id,
            });
        }
    };`
};
var workerURL;

class WorkerManagerClass {
  constructor() {
    this._initialized = false, this._createdWorkers = 0, this.workerPool = [], this.queue = [], this.resolveHash = {};
  }
  isImageBitmapSupported() {
    return this._isImageBitmapSupported !== undefined ? this._isImageBitmapSupported : (this._isImageBitmapSupported = new Promise((resolve) => {
      const workerURL2 = URL.createObjectURL(new Blob([checkImageBitmapCode.code], { type: "application/javascript" })), worker = new Worker(workerURL2);
      worker.addEventListener("message", (event) => {
        worker.terminate(), URL.revokeObjectURL(workerURL2), resolve(event.data);
      });
    }), this._isImageBitmapSupported);
  }
  loadImageBitmap(src) {
    return this._run("loadImageBitmap", [src]);
  }
  async _initWorkers() {
    this._initialized || (this._initialized = true);
  }
  getWorker() {
    MAX_WORKERS === undefined && (MAX_WORKERS = navigator.hardwareConcurrency || 4);
    let worker = this.workerPool.pop();
    return !worker && this._createdWorkers < MAX_WORKERS && (workerURL || (workerURL = URL.createObjectURL(new Blob([workerCode.code], { type: "application/javascript" }))), this._createdWorkers++, worker = new Worker(workerURL), worker.addEventListener("message", (event) => {
      this.complete(event.data), this.returnWorker(event.target), this.next();
    })), worker;
  }
  returnWorker(worker) {
    this.workerPool.push(worker);
  }
  complete(data) {
    data.error !== undefined ? this.resolveHash[data.uuid].reject(data.error) : this.resolveHash[data.uuid].resolve(data.data), this.resolveHash[data.uuid] = null;
  }
  async _run(id, args) {
    await this._initWorkers();
    const promise2 = new Promise((resolve, reject) => {
      this.queue.push({ id, arguments: args, resolve, reject });
    });
    return this.next(), promise2;
  }
  next() {
    if (!this.queue.length)
      return;
    const worker = this.getWorker();
    if (!worker)
      return;
    const toDo = this.queue.pop(), id = toDo.id;
    this.resolveHash[UUID] = { resolve: toDo.resolve, reject: toDo.reject }, worker.postMessage({
      data: toDo.arguments,
      uuid: UUID++,
      id
    });
  }
}
var WorkerManager = new WorkerManagerClass;

// node_modules/@pixi/assets/lib/loader/parsers/textures/utils/createTexture.mjs
var createTexture = function(base, loader, url3) {
  base.resource.internal = true;
  const texture = new Texture(base), unload = () => {
    delete loader.promiseCache[url3], Cache.has(url3) && Cache.remove(url3);
  };
  return texture.baseTexture.once("destroyed", () => {
    (url3 in loader.promiseCache) && (console.warn("[Assets] A BaseTexture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the BaseTexture."), unload());
  }), texture.once("destroyed", () => {
    base.destroyed || (console.warn("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."), unload());
  }), texture;
};

// node_modules/@pixi/assets/lib/loader/parsers/textures/loadTextures.mjs
async function loadImageBitmap(url3) {
  const response = await settings.ADAPTER.fetch(url3);
  if (!response.ok)
    throw new Error(`[loadImageBitmap] Failed to fetch ${url3}: ${response.status} ${response.statusText}`);
  const imageBlob = await response.blob();
  return await createImageBitmap(imageBlob);
}
var validImageExtensions = [".jpeg", ".jpg", ".png", ".webp", ".avif"];
var validImageMIMEs = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif"
];
var loadTextures = {
  name: "loadTextures",
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High
  },
  config: {
    preferWorkers: true,
    preferCreateImageBitmap: true,
    crossOrigin: "anonymous"
  },
  test(url3) {
    return checkDataUrl(url3, validImageMIMEs) || checkExtension(url3, validImageExtensions);
  },
  async load(url3, asset, loader) {
    const useImageBitmap = globalThis.createImageBitmap && this.config.preferCreateImageBitmap;
    let src;
    useImageBitmap ? this.config.preferWorkers && await WorkerManager.isImageBitmapSupported() ? src = await WorkerManager.loadImageBitmap(url3) : src = await loadImageBitmap(url3) : src = await new Promise((resolve, reject) => {
      const src2 = new Image;
      src2.crossOrigin = this.config.crossOrigin, src2.src = url3, src2.complete ? resolve(src2) : (src2.onload = () => resolve(src2), src2.onerror = (e2) => reject(e2));
    });
    const options = { ...asset.data };
    options.resolution ?? (options.resolution = exports_lib.getResolutionOfUrl(url3)), useImageBitmap && options.resourceOptions?.ownsImageBitmap === undefined && (options.resourceOptions = { ...options.resourceOptions }, options.resourceOptions.ownsImageBitmap = true);
    const base = new BaseTexture(src, options);
    return base.resource.src = url3, createTexture(base, loader, url3);
  },
  unload(texture) {
    texture.destroy(true);
  }
};
extensions.add(loadTextures);

// node_modules/@pixi/assets/lib/loader/parsers/textures/loadSVG.mjs
var validSVGExtension = ".svg";
var validSVGMIME = "image/svg+xml";
var loadSVG = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High
  },
  name: "loadSVG",
  test(url3) {
    return checkDataUrl(url3, validSVGMIME) || checkExtension(url3, validSVGExtension);
  },
  async testParse(data) {
    return SVGResource.test(data);
  },
  async parse(asset, data, loader) {
    const src = new SVGResource(asset, data?.data?.resourceOptions);
    await src.load();
    const base = new BaseTexture(src, {
      resolution: exports_lib.getResolutionOfUrl(asset),
      ...data?.data
    });
    return base.resource.src = data.src, createTexture(base, loader, data.src);
  },
  async load(url3, _options) {
    return (await settings.ADAPTER.fetch(url3)).text();
  },
  unload: loadTextures.unload
};
extensions.add(loadSVG);

// node_modules/@pixi/assets/lib/loader/parsers/textures/loadVideo.mjs
var validVideoExtensions = [".mp4", ".m4v", ".webm", ".ogv"];
var validVideoMIMEs = [
  "video/mp4",
  "video/webm",
  "video/ogg"
];
var loadVideo = {
  name: "loadVideo",
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High
  },
  config: {
    defaultAutoPlay: true
  },
  test(url3) {
    return checkDataUrl(url3, validVideoMIMEs) || checkExtension(url3, validVideoExtensions);
  },
  async load(url3, loadAsset, loader) {
    let texture;
    const blob = await (await settings.ADAPTER.fetch(url3)).blob(), blobURL = URL.createObjectURL(blob);
    try {
      const options = {
        autoPlay: this.config.defaultAutoPlay,
        ...loadAsset?.data?.resourceOptions
      }, src = new VideoResource(blobURL, options);
      await src.load();
      const base = new BaseTexture(src, {
        alphaMode: await exports_lib.detectVideoAlphaMode(),
        resolution: exports_lib.getResolutionOfUrl(url3),
        ...loadAsset?.data
      });
      base.resource.src = url3, texture = createTexture(base, loader, url3), texture.baseTexture.once("destroyed", () => {
        URL.revokeObjectURL(blobURL);
      });
    } catch (e2) {
      throw URL.revokeObjectURL(blobURL), e2;
    }
    return texture;
  },
  unload(texture) {
    texture.destroy(true);
  }
};
extensions.add(loadVideo);

// node_modules/@pixi/assets/lib/resolver/Resolver.mjs
class Resolver {
  constructor() {
    this._defaultBundleIdentifierOptions = {
      connector: "-",
      createBundleAssetId: (bundleId, assetId) => `${bundleId}${this._bundleIdConnector}${assetId}`,
      extractAssetIdFromBundle: (bundleId, assetBundleId) => assetBundleId.replace(`${bundleId}${this._bundleIdConnector}`, "")
    }, this._bundleIdConnector = this._defaultBundleIdentifierOptions.connector, this._createBundleAssetId = this._defaultBundleIdentifierOptions.createBundleAssetId, this._extractAssetIdFromBundle = this._defaultBundleIdentifierOptions.extractAssetIdFromBundle, this._assetMap = {}, this._preferredOrder = [], this._parsers = [], this._resolverHash = {}, this._bundles = {};
  }
  setBundleIdentifier(bundleIdentifier) {
    if (this._bundleIdConnector = bundleIdentifier.connector ?? this._bundleIdConnector, this._createBundleAssetId = bundleIdentifier.createBundleAssetId ?? this._createBundleAssetId, this._extractAssetIdFromBundle = bundleIdentifier.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle, this._extractAssetIdFromBundle("foo", this._createBundleAssetId("foo", "bar")) !== "bar")
      throw new Error("[Resolver] GenerateBundleAssetId are not working correctly");
  }
  prefer(...preferOrders) {
    preferOrders.forEach((prefer) => {
      this._preferredOrder.push(prefer), prefer.priority || (prefer.priority = Object.keys(prefer.params));
    }), this._resolverHash = {};
  }
  set basePath(basePath) {
    this._basePath = basePath;
  }
  get basePath() {
    return this._basePath;
  }
  set rootPath(rootPath) {
    this._rootPath = rootPath;
  }
  get rootPath() {
    return this._rootPath;
  }
  get parsers() {
    return this._parsers;
  }
  reset() {
    this.setBundleIdentifier(this._defaultBundleIdentifierOptions), this._assetMap = {}, this._preferredOrder = [], this._resolverHash = {}, this._rootPath = null, this._basePath = null, this._manifest = null, this._bundles = {}, this._defaultSearchParams = null;
  }
  setDefaultSearchParams(searchParams) {
    if (typeof searchParams == "string")
      this._defaultSearchParams = searchParams;
    else {
      const queryValues = searchParams;
      this._defaultSearchParams = Object.keys(queryValues).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryValues[key])}`).join("&");
    }
  }
  getAlias(asset) {
    const { alias, name, src, srcs } = asset;
    return convertToList(alias || name || src || srcs, (value) => typeof value == "string" ? value : Array.isArray(value) ? value.map((v2) => v2?.src ?? v2?.srcs ?? v2) : value?.src || value?.srcs ? value.src ?? value.srcs : value, true);
  }
  addManifest(manifest) {
    this._manifest && console.warn("[Resolver] Manifest already exists, this will be overwritten"), this._manifest = manifest, manifest.bundles.forEach((bundle) => {
      this.addBundle(bundle.name, bundle.assets);
    });
  }
  addBundle(bundleId, assets) {
    const assetNames = [];
    Array.isArray(assets) ? assets.forEach((asset) => {
      const srcs = asset.src ?? asset.srcs, aliases = asset.alias ?? asset.name;
      let ids;
      if (typeof aliases == "string") {
        const bundleAssetId = this._createBundleAssetId(bundleId, aliases);
        assetNames.push(bundleAssetId), ids = [aliases, bundleAssetId];
      } else {
        const bundleIds = aliases.map((name) => this._createBundleAssetId(bundleId, name));
        assetNames.push(...bundleIds), ids = [...aliases, ...bundleIds];
      }
      this.add({
        ...asset,
        alias: ids,
        src: srcs
      });
    }) : Object.keys(assets).forEach((key) => {
      const aliases = [key, this._createBundleAssetId(bundleId, key)];
      if (typeof assets[key] == "string")
        this.add({
          alias: aliases,
          src: assets[key]
        });
      else if (Array.isArray(assets[key]))
        this.add({
          alias: aliases,
          src: assets[key]
        });
      else {
        const asset = assets[key], assetSrc = asset.src ?? asset.srcs;
        this.add({
          ...asset,
          alias: aliases,
          src: Array.isArray(assetSrc) ? assetSrc : [assetSrc]
        });
      }
      assetNames.push(...aliases);
    }), this._bundles[bundleId] = assetNames;
  }
  add(aliases, srcs, data, format, loadParser) {
    const assets = [];
    typeof aliases == "string" || Array.isArray(aliases) && typeof aliases[0] == "string" ? (exports_lib.deprecation("7.2.0", `Assets.add now uses an object instead of individual parameters.
Please use Assets.add({ alias, src, data, format, loadParser }) instead.`), assets.push({ alias: aliases, src: srcs, data, format, loadParser })) : Array.isArray(aliases) ? assets.push(...aliases) : assets.push(aliases);
    let keyCheck;
    keyCheck = (key) => {
      this.hasKey(key) && console.warn(`[Resolver] already has key: ${key} overwriting`);
    }, convertToList(assets).forEach((asset) => {
      const { src, srcs: srcs2 } = asset;
      let { data: data2, format: format2, loadParser: loadParser2 } = asset;
      const srcsToUse = convertToList(src || srcs2).map((src2) => typeof src2 == "string" ? createStringVariations(src2) : Array.isArray(src2) ? src2 : [src2]), aliasesToUse = this.getAlias(asset);
      Array.isArray(aliasesToUse) ? aliasesToUse.forEach(keyCheck) : keyCheck(aliasesToUse);
      const resolvedAssets = [];
      srcsToUse.forEach((srcs3) => {
        srcs3.forEach((src2) => {
          let formattedAsset = {};
          if (typeof src2 != "object") {
            formattedAsset.src = src2;
            for (let i2 = 0;i2 < this._parsers.length; i2++) {
              const parser = this._parsers[i2];
              if (parser.test(src2)) {
                formattedAsset = parser.parse(src2);
                break;
              }
            }
          } else
            data2 = src2.data ?? data2, format2 = src2.format ?? format2, loadParser2 = src2.loadParser ?? loadParser2, formattedAsset = {
              ...formattedAsset,
              ...src2
            };
          if (!aliasesToUse)
            throw new Error(`[Resolver] alias is undefined for this asset: ${formattedAsset.src}`);
          formattedAsset = this.buildResolvedAsset(formattedAsset, {
            aliases: aliasesToUse,
            data: data2,
            format: format2,
            loadParser: loadParser2
          }), resolvedAssets.push(formattedAsset);
        });
      }), aliasesToUse.forEach((alias) => {
        this._assetMap[alias] = resolvedAssets;
      });
    });
  }
  resolveBundle(bundleIds) {
    const singleAsset = isSingleItem(bundleIds);
    bundleIds = convertToList(bundleIds);
    const out = {};
    return bundleIds.forEach((bundleId) => {
      const assetNames = this._bundles[bundleId];
      if (assetNames) {
        const results = this.resolve(assetNames), assets = {};
        for (const key in results) {
          const asset = results[key];
          assets[this._extractAssetIdFromBundle(bundleId, key)] = asset;
        }
        out[bundleId] = assets;
      }
    }), singleAsset ? out[bundleIds[0]] : out;
  }
  resolveUrl(key) {
    const result = this.resolve(key);
    if (typeof key != "string") {
      const out = {};
      for (const i2 in result)
        out[i2] = result[i2].src;
      return out;
    }
    return result.src;
  }
  resolve(keys) {
    const singleAsset = isSingleItem(keys);
    keys = convertToList(keys);
    const result = {};
    return keys.forEach((key) => {
      if (!this._resolverHash[key])
        if (this._assetMap[key]) {
          let assets = this._assetMap[key];
          const bestAsset = assets[0], preferredOrder = this._getPreferredOrder(assets);
          preferredOrder?.priority.forEach((priorityKey) => {
            preferredOrder.params[priorityKey].forEach((value) => {
              const filteredAssets = assets.filter((asset) => asset[priorityKey] ? asset[priorityKey] === value : false);
              filteredAssets.length && (assets = filteredAssets);
            });
          }), this._resolverHash[key] = assets[0] ?? bestAsset;
        } else
          this._resolverHash[key] = this.buildResolvedAsset({
            alias: [key],
            src: key
          }, {});
      result[key] = this._resolverHash[key];
    }), singleAsset ? result[keys[0]] : result;
  }
  hasKey(key) {
    return !!this._assetMap[key];
  }
  hasBundle(key) {
    return !!this._bundles[key];
  }
  _getPreferredOrder(assets) {
    for (let i2 = 0;i2 < assets.length; i2++) {
      const asset = assets[0], preferred = this._preferredOrder.find((preference) => preference.params.format.includes(asset.format));
      if (preferred)
        return preferred;
    }
    return this._preferredOrder[0];
  }
  _appendDefaultSearchParams(url3) {
    if (!this._defaultSearchParams)
      return url3;
    const paramConnector = /\?/.test(url3) ? "&" : "?";
    return `${url3}${paramConnector}${this._defaultSearchParams}`;
  }
  buildResolvedAsset(formattedAsset, data) {
    const { aliases, data: assetData, loadParser, format } = data;
    return (this._basePath || this._rootPath) && (formattedAsset.src = exports_lib.path.toAbsolute(formattedAsset.src, this._basePath, this._rootPath)), formattedAsset.alias = aliases ?? formattedAsset.alias ?? [formattedAsset.src], formattedAsset.src = this._appendDefaultSearchParams(formattedAsset.src), formattedAsset.data = { ...assetData || {}, ...formattedAsset.data }, formattedAsset.loadParser = loadParser ?? formattedAsset.loadParser, formattedAsset.format = format ?? formattedAsset.src.split(".").pop(), formattedAsset.srcs = formattedAsset.src, formattedAsset.name = formattedAsset.alias, formattedAsset;
  }
}

// node_modules/@pixi/assets/lib/Assets.mjs
class AssetsClass {
  constructor() {
    this._detections = [], this._initialized = false, this.resolver = new Resolver, this.loader = new Loader, this.cache = Cache, this._backgroundLoader = new BackgroundLoader(this.loader), this._backgroundLoader.active = true, this.reset();
  }
  async init(options = {}) {
    if (this._initialized) {
      console.warn("[Assets]AssetManager already initialized, did you load before calling this Asset.init()?");
      return;
    }
    if (this._initialized = true, options.defaultSearchParams && this.resolver.setDefaultSearchParams(options.defaultSearchParams), options.basePath && (this.resolver.basePath = options.basePath), options.bundleIdentifier && this.resolver.setBundleIdentifier(options.bundleIdentifier), options.manifest) {
      let manifest = options.manifest;
      typeof manifest == "string" && (manifest = await this.load(manifest)), this.resolver.addManifest(manifest);
    }
    const resolutionPref = options.texturePreference?.resolution ?? 1, resolution = typeof resolutionPref == "number" ? [resolutionPref] : resolutionPref, formats = await this._detectFormats({
      preferredFormats: options.texturePreference?.format,
      skipDetections: options.skipDetections,
      detections: this._detections
    });
    this.resolver.prefer({
      params: {
        format: formats,
        resolution
      }
    }), options.preferences && this.setPreferences(options.preferences);
  }
  add(aliases, srcs, data, format, loadParser) {
    this.resolver.add(aliases, srcs, data, format, loadParser);
  }
  async load(urls, onProgress) {
    this._initialized || await this.init();
    const singleAsset = isSingleItem(urls), urlArray = convertToList(urls).map((url3) => {
      if (typeof url3 != "string") {
        const aliases = this.resolver.getAlias(url3);
        return aliases.some((alias) => !this.resolver.hasKey(alias)) && this.add(url3), Array.isArray(aliases) ? aliases[0] : aliases;
      }
      return this.resolver.hasKey(url3) || this.add({ alias: url3, src: url3 }), url3;
    }), resolveResults = this.resolver.resolve(urlArray), out = await this._mapLoadToResolve(resolveResults, onProgress);
    return singleAsset ? out[urlArray[0]] : out;
  }
  addBundle(bundleId, assets) {
    this.resolver.addBundle(bundleId, assets);
  }
  async loadBundle(bundleIds, onProgress) {
    this._initialized || await this.init();
    let singleAsset = false;
    typeof bundleIds == "string" && (singleAsset = true, bundleIds = [bundleIds]);
    const resolveResults = this.resolver.resolveBundle(bundleIds), out = {}, keys = Object.keys(resolveResults);
    let count = 0, total = 0;
    const _onProgress = () => {
      onProgress?.(++count / total);
    }, promises = keys.map((bundleId) => {
      const resolveResult = resolveResults[bundleId];
      return total += Object.keys(resolveResult).length, this._mapLoadToResolve(resolveResult, _onProgress).then((resolveResult2) => {
        out[bundleId] = resolveResult2;
      });
    });
    return await Promise.all(promises), singleAsset ? out[bundleIds[0]] : out;
  }
  async backgroundLoad(urls) {
    this._initialized || await this.init(), typeof urls == "string" && (urls = [urls]);
    const resolveResults = this.resolver.resolve(urls);
    this._backgroundLoader.add(Object.values(resolveResults));
  }
  async backgroundLoadBundle(bundleIds) {
    this._initialized || await this.init(), typeof bundleIds == "string" && (bundleIds = [bundleIds]);
    const resolveResults = this.resolver.resolveBundle(bundleIds);
    Object.values(resolveResults).forEach((resolveResult) => {
      this._backgroundLoader.add(Object.values(resolveResult));
    });
  }
  reset() {
    this.resolver.reset(), this.loader.reset(), this.cache.reset(), this._initialized = false;
  }
  get(keys) {
    if (typeof keys == "string")
      return Cache.get(keys);
    const assets = {};
    for (let i2 = 0;i2 < keys.length; i2++)
      assets[i2] = Cache.get(keys[i2]);
    return assets;
  }
  async _mapLoadToResolve(resolveResults, onProgress) {
    const resolveArray = Object.values(resolveResults), resolveKeys = Object.keys(resolveResults);
    this._backgroundLoader.active = false;
    const loadedAssets = await this.loader.load(resolveArray, onProgress);
    this._backgroundLoader.active = true;
    const out = {};
    return resolveArray.forEach((resolveResult, i2) => {
      const asset = loadedAssets[resolveResult.src], keys = [resolveResult.src];
      resolveResult.alias && keys.push(...resolveResult.alias), out[resolveKeys[i2]] = asset, Cache.set(keys, asset);
    }), out;
  }
  async unload(urls) {
    this._initialized || await this.init();
    const urlArray = convertToList(urls).map((url3) => typeof url3 != "string" ? url3.src : url3), resolveResults = this.resolver.resolve(urlArray);
    await this._unloadFromResolved(resolveResults);
  }
  async unloadBundle(bundleIds) {
    this._initialized || await this.init(), bundleIds = convertToList(bundleIds);
    const resolveResults = this.resolver.resolveBundle(bundleIds), promises = Object.keys(resolveResults).map((bundleId) => this._unloadFromResolved(resolveResults[bundleId]));
    await Promise.all(promises);
  }
  async _unloadFromResolved(resolveResult) {
    const resolveArray = Object.values(resolveResult);
    resolveArray.forEach((resolveResult2) => {
      Cache.remove(resolveResult2.src);
    }), await this.loader.unload(resolveArray);
  }
  async _detectFormats(options) {
    let formats = [];
    options.preferredFormats && (formats = Array.isArray(options.preferredFormats) ? options.preferredFormats : [options.preferredFormats]);
    for (const detection of options.detections)
      options.skipDetections || await detection.test() ? formats = await detection.add(formats) : options.skipDetections || (formats = await detection.remove(formats));
    return formats = formats.filter((format, index) => formats.indexOf(format) === index), formats;
  }
  get detections() {
    return this._detections;
  }
  get preferWorkers() {
    return loadTextures.config.preferWorkers;
  }
  set preferWorkers(value) {
    exports_lib.deprecation("7.2.0", "Assets.prefersWorkers is deprecated, use Assets.setPreferences({ preferWorkers: true }) instead."), this.setPreferences({ preferWorkers: value });
  }
  setPreferences(preferences) {
    this.loader.parsers.forEach((parser) => {
      parser.config && Object.keys(parser.config).filter((key) => (key in preferences)).forEach((key) => {
        parser.config[key] = preferences[key];
      });
    });
  }
}
var Assets = new AssetsClass;
extensions.handleByList(ExtensionType.LoadParser, Assets.loader.parsers).handleByList(ExtensionType.ResolveParser, Assets.resolver.parsers).handleByList(ExtensionType.CacheParser, Assets.cache.parsers).handleByList(ExtensionType.DetectionParser, Assets.detections);

// node_modules/@pixi/assets/lib/cache/parsers/cacheTextureArray.mjs
var cacheTextureArray = {
  extension: ExtensionType.CacheParser,
  test: (asset) => Array.isArray(asset) && asset.every((t2) => t2 instanceof Texture),
  getCacheableAssets: (keys, asset) => {
    const out = {};
    return keys.forEach((key) => {
      asset.forEach((item, i2) => {
        out[key + (i2 === 0 ? "" : i2 + 1)] = item;
      });
    }), out;
  }
};
extensions.add(cacheTextureArray);

// node_modules/@pixi/assets/lib/detections/parsers/detectAvif.mjs
var detectAvif = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 1
  },
  test: async () => {
    const avifData = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
    return new Promise((resolve) => {
      const avif = new Image;
      avif.onload = () => {
        resolve(true);
      }, avif.onerror = () => {
        resolve(false);
      }, avif.src = avifData;
    });
  },
  add: async (formats) => [...formats, "avif"],
  remove: async (formats) => formats.filter((f2) => f2 !== "avif")
};
extensions.add(detectAvif);

// node_modules/@pixi/assets/lib/detections/parsers/detectWebp.mjs
var detectWebp = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 0
  },
  test: async () => {
    const webpData = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
    return new Promise((resolve) => {
      const webp = new Image;
      webp.onload = () => {
        resolve(true);
      }, webp.onerror = () => {
        resolve(false);
      }, webp.src = webpData;
    });
  },
  add: async (formats) => [...formats, "webp"],
  remove: async (formats) => formats.filter((f2) => f2 !== "webp")
};
extensions.add(detectWebp);

// node_modules/@pixi/assets/lib/detections/parsers/detectDefaults.mjs
var imageFormats = ["png", "jpg", "jpeg"];
var detectDefaults = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: -1
  },
  test: () => Promise.resolve(true),
  add: async (formats) => [...formats, ...imageFormats],
  remove: async (formats) => formats.filter((f2) => !imageFormats.includes(f2))
};
extensions.add(detectDefaults);

// node_modules/@pixi/assets/lib/detections/utils/testVideoFormat.mjs
var testVideoFormat = function(mimeType) {
  return inWorker ? false : document.createElement("video").canPlayType(mimeType) !== "";
};
var inWorker = ("WorkerGlobalScope" in globalThis) && globalThis instanceof globalThis.WorkerGlobalScope;

// node_modules/@pixi/assets/lib/detections/parsers/detectWebm.mjs
var detectWebm = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 0
  },
  test: async () => testVideoFormat("video/webm"),
  add: async (formats) => [...formats, "webm"],
  remove: async (formats) => formats.filter((f2) => f2 !== "webm")
};
extensions.add(detectWebm);

// node_modules/@pixi/assets/lib/detections/parsers/detectMp4.mjs
var detectMp4 = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 0
  },
  test: async () => testVideoFormat("video/mp4"),
  add: async (formats) => [...formats, "mp4", "m4v"],
  remove: async (formats) => formats.filter((f2) => f2 !== "mp4" && f2 !== "m4v")
};
extensions.add(detectMp4);

// node_modules/@pixi/assets/lib/detections/parsers/detectOgv.mjs
var detectOgv = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 0
  },
  test: async () => testVideoFormat("video/ogg"),
  add: async (formats) => [...formats, "ogv"],
  remove: async (formats) => formats.filter((f2) => f2 !== "ogv")
};
extensions.add(detectOgv);

// node_modules/@pixi/assets/lib/resolver/parsers/resolveTextureUrl.mjs
var resolveTextureUrl = {
  extension: ExtensionType.ResolveParser,
  test: loadTextures.test,
  parse: (value) => ({
    resolution: parseFloat(settings.RETINA_PREFIX.exec(value)?.[1] ?? "1"),
    format: value.split(".").pop(),
    src: value
  })
};
extensions.add(resolveTextureUrl);
// node_modules/@pixi/compressed-textures/lib/const.mjs
var INTERNAL_FORMATS = ((INTERNAL_FORMATS2) => (INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGB_S3TC_DXT1_EXT = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_R11_EAC = 37488] = "COMPRESSED_R11_EAC", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_SIGNED_R11_EAC = 37489] = "COMPRESSED_SIGNED_R11_EAC", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RG11_EAC = 37490] = "COMPRESSED_RG11_EAC", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_SIGNED_RG11_EAC = 37491] = "COMPRESSED_SIGNED_RG11_EAC", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGB8_ETC2 = 37492] = "COMPRESSED_RGB8_ETC2", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGBA8_ETC2_EAC = 37496] = "COMPRESSED_RGBA8_ETC2_EAC", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_SRGB8_ETC2 = 37493] = "COMPRESSED_SRGB8_ETC2", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGB_ETC1_WEBGL = 36196] = "COMPRESSED_RGB_ETC1_WEBGL", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGB_ATC_WEBGL = 35986] = "COMPRESSED_RGB_ATC_WEBGL", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 35986] = "COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 34798] = "COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL", INTERNAL_FORMATS2[INTERNAL_FORMATS2.COMPRESSED_RGBA_ASTC_4x4_KHR = 37808] = "COMPRESSED_RGBA_ASTC_4x4_KHR", INTERNAL_FORMATS2))(INTERNAL_FORMATS || {});
var INTERNAL_FORMAT_TO_BYTES_PER_PIXEL = {
  33776: 0.5,
  33777: 0.5,
  33778: 1,
  33779: 1,
  35916: 0.5,
  35917: 0.5,
  35918: 1,
  35919: 1,
  37488: 0.5,
  37489: 0.5,
  37490: 1,
  37491: 1,
  37492: 0.5,
  37496: 1,
  37493: 0.5,
  37497: 1,
  37494: 0.5,
  37495: 0.5,
  35840: 0.5,
  35842: 0.5,
  35841: 0.25,
  35843: 0.25,
  36196: 0.5,
  35986: 0.5,
  35986: 1,
  34798: 1,
  37808: 1
};

// node_modules/@pixi/compressed-textures/lib/loaders/detectCompressedTextures.mjs
var getCompressedTextureExtensions = function() {
  extensions30 = {
    s3tc: storedGl.getExtension("WEBGL_compressed_texture_s3tc"),
    s3tc_sRGB: storedGl.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
    etc: storedGl.getExtension("WEBGL_compressed_texture_etc"),
    etc1: storedGl.getExtension("WEBGL_compressed_texture_etc1"),
    pvrtc: storedGl.getExtension("WEBGL_compressed_texture_pvrtc") || storedGl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
    atc: storedGl.getExtension("WEBGL_compressed_texture_atc"),
    astc: storedGl.getExtension("WEBGL_compressed_texture_astc")
  };
};
var storedGl;
var extensions30;
var detectCompressedTextures = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 2
  },
  test: async () => {
    const gl = settings.ADAPTER.createCanvas().getContext("webgl");
    return gl ? (storedGl = gl, true) : (console.warn("WebGL not available for compressed textures."), false);
  },
  add: async (formats) => {
    extensions30 || getCompressedTextureExtensions();
    const textureFormats = [];
    for (const extensionName in extensions30)
      extensions30[extensionName] && textureFormats.push(extensionName);
    return [...textureFormats, ...formats];
  },
  remove: async (formats) => (extensions30 || getCompressedTextureExtensions(), formats.filter((f2) => !(f2 in extensions30)))
};
extensions.add(detectCompressedTextures);

// node_modules/@pixi/compressed-textures/lib/resources/BlobResource.mjs
class BlobResource extends BufferResource {
  constructor(source, options = { width: 1, height: 1, autoLoad: true }) {
    let origin, data;
    typeof source == "string" ? (origin = source, data = new Uint8Array) : (origin = null, data = source), super(data, options), this.origin = origin, this.buffer = data ? new ViewableBuffer(data) : null, this._load = null, this.loaded = false, this.origin !== null && options.autoLoad !== false && this.load(), this.origin === null && this.buffer && (this._load = Promise.resolve(this), this.loaded = true, this.onBlobLoaded(this.buffer.rawBinaryData));
  }
  onBlobLoaded(_data) {
  }
  load() {
    return this._load ? this._load : (this._load = fetch(this.origin).then((response) => response.blob()).then((blob) => blob.arrayBuffer()).then((arrayBuffer) => (this.data = new Uint32Array(arrayBuffer), this.buffer = new ViewableBuffer(arrayBuffer), this.loaded = true, this.onBlobLoaded(arrayBuffer), this.update(), this)), this._load);
  }
}

// node_modules/@pixi/compressed-textures/lib/resources/CompressedTextureResource.mjs
class CompressedTextureResource extends BlobResource {
  constructor(source, options) {
    super(source, options), this.format = options.format, this.levels = options.levels || 1, this._width = options.width, this._height = options.height, this._extension = CompressedTextureResource._formatToExtension(this.format), (options.levelBuffers || this.buffer) && (this._levelBuffers = options.levelBuffers || CompressedTextureResource._createLevelBuffers(source instanceof Uint8Array ? source : this.buffer.uint8View, this.format, this.levels, 4, 4, this.width, this.height));
  }
  upload(renderer, _texture, _glTexture) {
    const gl = renderer.gl;
    if (!renderer.context.extensions[this._extension])
      throw new Error(`${this._extension} textures are not supported on the current machine`);
    if (!this._levelBuffers)
      return false;
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    for (let i2 = 0, j2 = this.levels;i2 < j2; i2++) {
      const { levelID, levelWidth, levelHeight, levelBuffer } = this._levelBuffers[i2];
      gl.compressedTexImage2D(gl.TEXTURE_2D, levelID, this.format, levelWidth, levelHeight, 0, levelBuffer);
    }
    return true;
  }
  onBlobLoaded() {
    this._levelBuffers = CompressedTextureResource._createLevelBuffers(this.buffer.uint8View, this.format, this.levels, 4, 4, this.width, this.height);
  }
  static _formatToExtension(format) {
    if (format >= 33776 && format <= 33779)
      return "s3tc";
    if (format >= 37488 && format <= 37497)
      return "etc";
    if (format >= 35840 && format <= 35843)
      return "pvrtc";
    if (format >= 36196)
      return "etc1";
    if (format >= 35986 && format <= 34798)
      return "atc";
    throw new Error("Invalid (compressed) texture format given!");
  }
  static _createLevelBuffers(buffer, format, levels, blockWidth, blockHeight, imageWidth, imageHeight) {
    const buffers = new Array(levels);
    let offset = buffer.byteOffset, levelWidth = imageWidth, levelHeight = imageHeight, alignedLevelWidth = levelWidth + blockWidth - 1 & ~(blockWidth - 1), alignedLevelHeight = levelHeight + blockHeight - 1 & ~(blockHeight - 1), levelSize = alignedLevelWidth * alignedLevelHeight * INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[format];
    for (let i2 = 0;i2 < levels; i2++)
      buffers[i2] = {
        levelID: i2,
        levelWidth: levels > 1 ? levelWidth : alignedLevelWidth,
        levelHeight: levels > 1 ? levelHeight : alignedLevelHeight,
        levelBuffer: new Uint8Array(buffer.buffer, offset, levelSize)
      }, offset += levelSize, levelWidth = levelWidth >> 1 || 1, levelHeight = levelHeight >> 1 || 1, alignedLevelWidth = levelWidth + blockWidth - 1 & ~(blockWidth - 1), alignedLevelHeight = levelHeight + blockHeight - 1 & ~(blockHeight - 1), levelSize = alignedLevelWidth * alignedLevelHeight * INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[format];
    return buffers;
  }
}

// node_modules/@pixi/compressed-textures/lib/parsers/parseDDS.mjs
var parseDDS = function(arrayBuffer) {
  const data = new Uint32Array(arrayBuffer);
  if (data[0] !== DDS_MAGIC)
    throw new Error("Invalid DDS file magic word");
  const header = new Uint32Array(arrayBuffer, 0, DDS_HEADER_SIZE / Uint32Array.BYTES_PER_ELEMENT), height = header[DDS_FIELDS.HEIGHT], width = header[DDS_FIELDS.WIDTH], mipmapCount = header[DDS_FIELDS.MIPMAP_COUNT], pixelFormat = new Uint32Array(arrayBuffer, DDS_FIELDS.PIXEL_FORMAT * Uint32Array.BYTES_PER_ELEMENT, DDS_HEADER_PF_SIZE / Uint32Array.BYTES_PER_ELEMENT), formatFlags = pixelFormat[PF_FLAGS];
  if (formatFlags & DDPF_FOURCC) {
    const fourCC = pixelFormat[DDS_PF_FIELDS.FOURCC];
    if (fourCC !== FOURCC_DX10) {
      const internalFormat2 = FOURCC_TO_FORMAT[fourCC], dataOffset2 = DDS_MAGIC_SIZE + DDS_HEADER_SIZE, texData = new Uint8Array(arrayBuffer, dataOffset2);
      return [new CompressedTextureResource(texData, {
        format: internalFormat2,
        width,
        height,
        levels: mipmapCount
      })];
    }
    const dx10Offset = DDS_MAGIC_SIZE + DDS_HEADER_SIZE, dx10Header = new Uint32Array(data.buffer, dx10Offset, DDS_HEADER_DX10_SIZE / Uint32Array.BYTES_PER_ELEMENT), dxgiFormat = dx10Header[DDS_DX10_FIELDS.DXGI_FORMAT], resourceDimension = dx10Header[DDS_DX10_FIELDS.RESOURCE_DIMENSION], miscFlag = dx10Header[DDS_DX10_FIELDS.MISC_FLAG], arraySize = dx10Header[DDS_DX10_FIELDS.ARRAY_SIZE], internalFormat = DXGI_TO_FORMAT[dxgiFormat];
    if (internalFormat === undefined)
      throw new Error(`DDSParser cannot parse texture data with DXGI format ${dxgiFormat}`);
    if (miscFlag === DDS_RESOURCE_MISC_TEXTURECUBE)
      throw new Error("DDSParser does not support cubemap textures");
    if (resourceDimension === 6)
      throw new Error("DDSParser does not supported 3D texture data");
    const imageBuffers = new Array, dataOffset = DDS_MAGIC_SIZE + DDS_HEADER_SIZE + DDS_HEADER_DX10_SIZE;
    if (arraySize === 1)
      imageBuffers.push(new Uint8Array(arrayBuffer, dataOffset));
    else {
      const pixelSize = INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[internalFormat];
      let imageSize = 0, levelWidth = width, levelHeight = height;
      for (let i2 = 0;i2 < mipmapCount; i2++) {
        const alignedLevelWidth = Math.max(1, levelWidth + 3 & -4), alignedLevelHeight = Math.max(1, levelHeight + 3 & -4), levelSize = alignedLevelWidth * alignedLevelHeight * pixelSize;
        imageSize += levelSize, levelWidth = levelWidth >>> 1, levelHeight = levelHeight >>> 1;
      }
      let imageOffset = dataOffset;
      for (let i2 = 0;i2 < arraySize; i2++)
        imageBuffers.push(new Uint8Array(arrayBuffer, imageOffset, imageSize)), imageOffset += imageSize;
    }
    return imageBuffers.map((buffer) => new CompressedTextureResource(buffer, {
      format: internalFormat,
      width,
      height,
      levels: mipmapCount
    }));
  }
  throw formatFlags & DDPF_RGB ? new Error("DDSParser does not support uncompressed texture data.") : formatFlags & DDPF_YUV ? new Error("DDSParser does not supported YUV uncompressed texture data.") : formatFlags & DDPF_LUMINANCE ? new Error("DDSParser does not support single-channel (lumninance) texture data!") : formatFlags & DDPF_ALPHA ? new Error("DDSParser does not support single-channel (alpha) texture data!") : new Error("DDSParser failed to load a texture file due to an unknown reason!");
};
var DDS_MAGIC_SIZE = 4;
var DDS_HEADER_SIZE = 124;
var DDS_HEADER_PF_SIZE = 32;
var DDS_HEADER_DX10_SIZE = 20;
var DDS_MAGIC = 542327876;
var DDS_FIELDS = {
  SIZE: 1,
  FLAGS: 2,
  HEIGHT: 3,
  WIDTH: 4,
  MIPMAP_COUNT: 7,
  PIXEL_FORMAT: 19
};
var DDS_PF_FIELDS = {
  SIZE: 0,
  FLAGS: 1,
  FOURCC: 2,
  RGB_BITCOUNT: 3,
  R_BIT_MASK: 4,
  G_BIT_MASK: 5,
  B_BIT_MASK: 6,
  A_BIT_MASK: 7
};
var DDS_DX10_FIELDS = {
  DXGI_FORMAT: 0,
  RESOURCE_DIMENSION: 1,
  MISC_FLAG: 2,
  ARRAY_SIZE: 3,
  MISC_FLAGS2: 4
};
var PF_FLAGS = 1;
var DDPF_ALPHA = 2;
var DDPF_FOURCC = 4;
var DDPF_RGB = 64;
var DDPF_YUV = 512;
var DDPF_LUMINANCE = 131072;
var FOURCC_DXT1 = 827611204;
var FOURCC_DXT3 = 861165636;
var FOURCC_DXT5 = 894720068;
var FOURCC_DX10 = 808540228;
var DDS_RESOURCE_MISC_TEXTURECUBE = 4;
var FOURCC_TO_FORMAT = {
  [FOURCC_DXT1]: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT,
  [FOURCC_DXT3]: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT,
  [FOURCC_DXT5]: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT
};
var DXGI_TO_FORMAT = {
  70: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT,
  71: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT,
  73: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT,
  74: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT,
  76: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT,
  77: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT,
  72: INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT,
  75: INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT,
  78: INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
};

// node_modules/@pixi/compressed-textures/lib/parsers/parseKTX.mjs
var parseKTX = function(url3, arrayBuffer, loadKeyValueData = false) {
  const dataView = new DataView(arrayBuffer);
  if (!validate(url3, dataView))
    return null;
  const littleEndian = dataView.getUint32(KTX_FIELDS.ENDIANNESS, true) === ENDIANNESS, glType = dataView.getUint32(KTX_FIELDS.GL_TYPE, littleEndian), glFormat = dataView.getUint32(KTX_FIELDS.GL_FORMAT, littleEndian), glInternalFormat = dataView.getUint32(KTX_FIELDS.GL_INTERNAL_FORMAT, littleEndian), pixelWidth = dataView.getUint32(KTX_FIELDS.PIXEL_WIDTH, littleEndian), pixelHeight = dataView.getUint32(KTX_FIELDS.PIXEL_HEIGHT, littleEndian) || 1, pixelDepth = dataView.getUint32(KTX_FIELDS.PIXEL_DEPTH, littleEndian) || 1, numberOfArrayElements = dataView.getUint32(KTX_FIELDS.NUMBER_OF_ARRAY_ELEMENTS, littleEndian) || 1, numberOfFaces = dataView.getUint32(KTX_FIELDS.NUMBER_OF_FACES, littleEndian), numberOfMipmapLevels = dataView.getUint32(KTX_FIELDS.NUMBER_OF_MIPMAP_LEVELS, littleEndian), bytesOfKeyValueData = dataView.getUint32(KTX_FIELDS.BYTES_OF_KEY_VALUE_DATA, littleEndian);
  if (pixelHeight === 0 || pixelDepth !== 1)
    throw new Error("Only 2D textures are supported");
  if (numberOfFaces !== 1)
    throw new Error("CubeTextures are not supported by KTXLoader yet!");
  if (numberOfArrayElements !== 1)
    throw new Error("WebGL does not support array textures");
  const blockWidth = 4, blockHeight = 4, alignedWidth = pixelWidth + 3 & -4, alignedHeight = pixelHeight + 3 & -4, imageBuffers = new Array(numberOfArrayElements);
  let imagePixels = pixelWidth * pixelHeight;
  glType === 0 && (imagePixels = alignedWidth * alignedHeight);
  let imagePixelByteSize;
  if (glType !== 0 ? TYPES_TO_BYTES_PER_COMPONENT[glType] ? imagePixelByteSize = TYPES_TO_BYTES_PER_COMPONENT[glType] * FORMATS_TO_COMPONENTS[glFormat] : imagePixelByteSize = TYPES_TO_BYTES_PER_PIXEL[glType] : imagePixelByteSize = INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[glInternalFormat], imagePixelByteSize === undefined)
    throw new Error("Unable to resolve the pixel format stored in the *.ktx file!");
  const kvData = loadKeyValueData ? parseKvData(dataView, bytesOfKeyValueData, littleEndian) : null;
  let mipByteSize = imagePixels * imagePixelByteSize, mipWidth = pixelWidth, mipHeight = pixelHeight, alignedMipWidth = alignedWidth, alignedMipHeight = alignedHeight, imageOffset = FILE_HEADER_SIZE + bytesOfKeyValueData;
  for (let mipmapLevel = 0;mipmapLevel < numberOfMipmapLevels; mipmapLevel++) {
    const imageSize = dataView.getUint32(imageOffset, littleEndian);
    let elementOffset = imageOffset + 4;
    for (let arrayElement = 0;arrayElement < numberOfArrayElements; arrayElement++) {
      let mips = imageBuffers[arrayElement];
      mips || (mips = imageBuffers[arrayElement] = new Array(numberOfMipmapLevels)), mips[mipmapLevel] = {
        levelID: mipmapLevel,
        levelWidth: numberOfMipmapLevels > 1 || glType !== 0 ? mipWidth : alignedMipWidth,
        levelHeight: numberOfMipmapLevels > 1 || glType !== 0 ? mipHeight : alignedMipHeight,
        levelBuffer: new Uint8Array(arrayBuffer, elementOffset, mipByteSize)
      }, elementOffset += mipByteSize;
    }
    imageOffset += imageSize + 4, imageOffset = imageOffset % 4 !== 0 ? imageOffset + 4 - imageOffset % 4 : imageOffset, mipWidth = mipWidth >> 1 || 1, mipHeight = mipHeight >> 1 || 1, alignedMipWidth = mipWidth + blockWidth - 1 & ~(blockWidth - 1), alignedMipHeight = mipHeight + blockHeight - 1 & ~(blockHeight - 1), mipByteSize = alignedMipWidth * alignedMipHeight * imagePixelByteSize;
  }
  return glType !== 0 ? {
    uncompressed: imageBuffers.map((levelBuffers) => {
      let buffer = levelBuffers[0].levelBuffer, convertToInt = false;
      return glType === TYPES.FLOAT ? buffer = new Float32Array(levelBuffers[0].levelBuffer.buffer, levelBuffers[0].levelBuffer.byteOffset, levelBuffers[0].levelBuffer.byteLength / 4) : glType === TYPES.UNSIGNED_INT ? (convertToInt = true, buffer = new Uint32Array(levelBuffers[0].levelBuffer.buffer, levelBuffers[0].levelBuffer.byteOffset, levelBuffers[0].levelBuffer.byteLength / 4)) : glType === TYPES.INT && (convertToInt = true, buffer = new Int32Array(levelBuffers[0].levelBuffer.buffer, levelBuffers[0].levelBuffer.byteOffset, levelBuffers[0].levelBuffer.byteLength / 4)), {
        resource: new BufferResource(buffer, {
          width: levelBuffers[0].levelWidth,
          height: levelBuffers[0].levelHeight
        }),
        type: glType,
        format: convertToInt ? convertFormatToInteger(glFormat) : glFormat
      };
    }),
    kvData
  } : {
    compressed: imageBuffers.map((levelBuffers) => new CompressedTextureResource(null, {
      format: glInternalFormat,
      width: pixelWidth,
      height: pixelHeight,
      levels: numberOfMipmapLevels,
      levelBuffers
    })),
    kvData
  };
};
var validate = function(url3, dataView) {
  for (let i2 = 0;i2 < FILE_IDENTIFIER.length; i2++)
    if (dataView.getUint8(i2) !== FILE_IDENTIFIER[i2])
      return console.error(`${url3} is not a valid *.ktx file!`), false;
  return true;
};
var convertFormatToInteger = function(format) {
  switch (format) {
    case FORMATS.RGBA:
      return FORMATS.RGBA_INTEGER;
    case FORMATS.RGB:
      return FORMATS.RGB_INTEGER;
    case FORMATS.RG:
      return FORMATS.RG_INTEGER;
    case FORMATS.RED:
      return FORMATS.RED_INTEGER;
    default:
      return format;
  }
};
var parseKvData = function(dataView, bytesOfKeyValueData, littleEndian) {
  const kvData = new Map;
  let bytesIntoKeyValueData = 0;
  for (;bytesIntoKeyValueData < bytesOfKeyValueData; ) {
    const keyAndValueByteSize = dataView.getUint32(FILE_HEADER_SIZE + bytesIntoKeyValueData, littleEndian), keyAndValueByteOffset = FILE_HEADER_SIZE + bytesIntoKeyValueData + 4, valuePadding = 3 - (keyAndValueByteSize + 3) % 4;
    if (keyAndValueByteSize === 0 || keyAndValueByteSize > bytesOfKeyValueData - bytesIntoKeyValueData) {
      console.error("KTXLoader: keyAndValueByteSize out of bounds");
      break;
    }
    let keyNulByte = 0;
    for (;keyNulByte < keyAndValueByteSize && dataView.getUint8(keyAndValueByteOffset + keyNulByte) !== 0; keyNulByte++)
      ;
    if (keyNulByte === -1) {
      console.error("KTXLoader: Failed to find null byte terminating kvData key");
      break;
    }
    const key = new TextDecoder().decode(new Uint8Array(dataView.buffer, keyAndValueByteOffset, keyNulByte)), value = new DataView(dataView.buffer, keyAndValueByteOffset + keyNulByte + 1, keyAndValueByteSize - keyNulByte - 1);
    kvData.set(key, value), bytesIntoKeyValueData += 4 + keyAndValueByteSize + valuePadding;
  }
  return kvData;
};
var FILE_IDENTIFIER = [171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10];
var ENDIANNESS = 67305985;
var KTX_FIELDS = {
  FILE_IDENTIFIER: 0,
  ENDIANNESS: 12,
  GL_TYPE: 16,
  GL_TYPE_SIZE: 20,
  GL_FORMAT: 24,
  GL_INTERNAL_FORMAT: 28,
  GL_BASE_INTERNAL_FORMAT: 32,
  PIXEL_WIDTH: 36,
  PIXEL_HEIGHT: 40,
  PIXEL_DEPTH: 44,
  NUMBER_OF_ARRAY_ELEMENTS: 48,
  NUMBER_OF_FACES: 52,
  NUMBER_OF_MIPMAP_LEVELS: 56,
  BYTES_OF_KEY_VALUE_DATA: 60
};
var FILE_HEADER_SIZE = 64;
var TYPES_TO_BYTES_PER_COMPONENT = {
  [TYPES.UNSIGNED_BYTE]: 1,
  [TYPES.UNSIGNED_SHORT]: 2,
  [TYPES.INT]: 4,
  [TYPES.UNSIGNED_INT]: 4,
  [TYPES.FLOAT]: 4,
  [TYPES.HALF_FLOAT]: 8
};
var FORMATS_TO_COMPONENTS = {
  [FORMATS.RGBA]: 4,
  [FORMATS.RGB]: 3,
  [FORMATS.RG]: 2,
  [FORMATS.RED]: 1,
  [FORMATS.LUMINANCE]: 1,
  [FORMATS.LUMINANCE_ALPHA]: 2,
  [FORMATS.ALPHA]: 1
};
var TYPES_TO_BYTES_PER_PIXEL = {
  [TYPES.UNSIGNED_SHORT_4_4_4_4]: 2,
  [TYPES.UNSIGNED_SHORT_5_5_5_1]: 2,
  [TYPES.UNSIGNED_SHORT_5_6_5]: 2
};

// node_modules/@pixi/compressed-textures/lib/loaders/loadDDS.mjs
var loadDDS = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High
  },
  name: "loadDDS",
  test(url3) {
    return checkExtension(url3, ".dds");
  },
  async load(url3, asset, loader3) {
    const arrayBuffer = await (await settings.ADAPTER.fetch(url3)).arrayBuffer(), textures2 = parseDDS(arrayBuffer).map((resource) => {
      const base = new BaseTexture(resource, {
        mipmap: MIPMAP_MODES.OFF,
        alphaMode: ALPHA_MODES.NO_PREMULTIPLIED_ALPHA,
        resolution: exports_lib.getResolutionOfUrl(url3),
        ...asset.data
      });
      return createTexture(base, loader3, url3);
    });
    return textures2.length === 1 ? textures2[0] : textures2;
  },
  unload(texture) {
    Array.isArray(texture) ? texture.forEach((t2) => t2.destroy(true)) : texture.destroy(true);
  }
};
extensions.add(loadDDS);

// node_modules/@pixi/compressed-textures/lib/loaders/loadKTX.mjs
var loadKTX = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High
  },
  name: "loadKTX",
  test(url3) {
    return checkExtension(url3, ".ktx");
  },
  async load(url3, asset, loader3) {
    const arrayBuffer = await (await settings.ADAPTER.fetch(url3)).arrayBuffer(), { compressed, uncompressed, kvData } = parseKTX(url3, arrayBuffer), resources4 = compressed ?? uncompressed, options = {
      mipmap: MIPMAP_MODES.OFF,
      alphaMode: ALPHA_MODES.NO_PREMULTIPLIED_ALPHA,
      resolution: exports_lib.getResolutionOfUrl(url3),
      ...asset.data
    }, textures2 = resources4.map((resource) => {
      resources4 === uncompressed && Object.assign(options, {
        type: resource.type,
        format: resource.format
      });
      const res = resource.resource ?? resource, base = new BaseTexture(res, options);
      return base.ktxKeyValueData = kvData, createTexture(base, loader3, url3);
    });
    return textures2.length === 1 ? textures2[0] : textures2;
  },
  unload(texture) {
    Array.isArray(texture) ? texture.forEach((t2) => t2.destroy(true)) : texture.destroy(true);
  }
};
extensions.add(loadKTX);

// node_modules/@pixi/compressed-textures/lib/loaders/resolveCompressedTextureUrl.mjs
var resolveCompressedTextureUrl = {
  extension: ExtensionType.ResolveParser,
  test: (value) => {
    const extension = value.split("?")[0].split(".").pop();
    return ["basis", "ktx", "dds"].includes(extension);
  },
  parse: (value) => {
    if (value.split("?")[0].split(".").pop() === "ktx") {
      const extensions210 = [
        ".s3tc.ktx",
        ".s3tc_sRGB.ktx",
        ".etc.ktx",
        ".etc1.ktx",
        ".pvrt.ktx",
        ".atc.ktx",
        ".astc.ktx"
      ];
      if (extensions210.some((ext) => value.endsWith(ext)))
        return {
          resolution: parseFloat(settings.RETINA_PREFIX.exec(value)?.[1] ?? "1"),
          format: extensions210.find((ext) => value.endsWith(ext)),
          src: value
        };
    }
    return {
      resolution: parseFloat(settings.RETINA_PREFIX.exec(value)?.[1] ?? "1"),
      format: value.split(".").pop(),
      src: value
    };
  }
};
extensions.add(resolveCompressedTextureUrl);
// node_modules/@pixi/extract/lib/Extract.mjs
var TEMP_RECT = new Rectangle;
var BYTES_PER_PIXEL = 4;
var _Extract = class _Extract2 {
  constructor(renderer) {
    this.renderer = renderer, this._rendererPremultipliedAlpha = false;
  }
  contextChange() {
    const attributes = this.renderer?.gl.getContextAttributes();
    this._rendererPremultipliedAlpha = !!(attributes && attributes.alpha && attributes.premultipliedAlpha);
  }
  async image(target, format, quality, frame) {
    const image = new Image;
    return image.src = await this.base64(target, format, quality, frame), image;
  }
  async base64(target, format, quality, frame) {
    const canvas = this.canvas(target, frame);
    if (canvas.toBlob !== undefined)
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("ICanvas.toBlob failed!"));
            return;
          }
          const reader = new FileReader;
          reader.onload = () => resolve(reader.result), reader.onerror = reject, reader.readAsDataURL(blob);
        }, format, quality);
      });
    if (canvas.toDataURL !== undefined)
      return canvas.toDataURL(format, quality);
    if (canvas.convertToBlob !== undefined) {
      const blob = await canvas.convertToBlob({ type: format, quality });
      return new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onload = () => resolve(reader.result), reader.onerror = reject, reader.readAsDataURL(blob);
      });
    }
    throw new Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented");
  }
  canvas(target, frame) {
    const { pixels, width, height, flipY, premultipliedAlpha } = this._rawPixels(target, frame);
    flipY && _Extract2._flipY(pixels, width, height), premultipliedAlpha && _Extract2._unpremultiplyAlpha(pixels);
    const canvasBuffer = new exports_lib.CanvasRenderTarget(width, height, 1), imageData = new ImageData(new Uint8ClampedArray(pixels.buffer), width, height);
    return canvasBuffer.context.putImageData(imageData, 0, 0), canvasBuffer.canvas;
  }
  pixels(target, frame) {
    const { pixels, width, height, flipY, premultipliedAlpha } = this._rawPixels(target, frame);
    return flipY && _Extract2._flipY(pixels, width, height), premultipliedAlpha && _Extract2._unpremultiplyAlpha(pixels), pixels;
  }
  _rawPixels(target, frame) {
    const renderer = this.renderer;
    if (!renderer)
      throw new Error("The Extract has already been destroyed");
    let resolution, flipY = false, premultipliedAlpha = false, renderTexture, generated = false;
    target && (target instanceof RenderTexture ? renderTexture = target : (renderTexture = renderer.generateTexture(target, {
      region: frame,
      resolution: renderer.resolution,
      multisample: renderer.multisample
    }), generated = true, frame && (TEMP_RECT.width = frame.width, TEMP_RECT.height = frame.height, frame = TEMP_RECT)));
    const gl = renderer.gl;
    if (renderTexture) {
      if (resolution = renderTexture.baseTexture.resolution, frame = frame ?? renderTexture.frame, flipY = false, premultipliedAlpha = renderTexture.baseTexture.alphaMode > 0 && renderTexture.baseTexture.format === FORMATS.RGBA, !generated) {
        renderer.renderTexture.bind(renderTexture);
        const fbo = renderTexture.framebuffer.glFramebuffers[renderer.CONTEXT_UID];
        fbo.blitFramebuffer && renderer.framebuffer.bind(fbo.blitFramebuffer);
      }
    } else
      resolution = renderer.resolution, frame || (frame = TEMP_RECT, frame.width = renderer.width / resolution, frame.height = renderer.height / resolution), flipY = true, premultipliedAlpha = this._rendererPremultipliedAlpha, renderer.renderTexture.bind();
    const width = Math.max(Math.round(frame.width * resolution), 1), height = Math.max(Math.round(frame.height * resolution), 1), pixels = new Uint8Array(BYTES_PER_PIXEL * width * height);
    return gl.readPixels(Math.round(frame.x * resolution), Math.round(frame.y * resolution), width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels), generated && renderTexture?.destroy(true), { pixels, width, height, flipY, premultipliedAlpha };
  }
  destroy() {
    this.renderer = null;
  }
  static _flipY(pixels, width, height) {
    const w2 = width << 2, h2 = height >> 1, temp = new Uint8Array(w2);
    for (let y2 = 0;y2 < h2; y2++) {
      const t2 = y2 * w2, b2 = (height - y2 - 1) * w2;
      temp.set(pixels.subarray(t2, t2 + w2)), pixels.copyWithin(t2, b2, b2 + w2), pixels.set(temp, b2);
    }
  }
  static _unpremultiplyAlpha(pixels) {
    pixels instanceof Uint8ClampedArray && (pixels = new Uint8Array(pixels.buffer));
    const n2 = pixels.length;
    for (let i2 = 0;i2 < n2; i2 += 4) {
      const alpha = pixels[i2 + 3];
      if (alpha !== 0) {
        const a2 = 255.001 / alpha;
        pixels[i2] = pixels[i2] * a2 + 0.5, pixels[i2 + 1] = pixels[i2 + 1] * a2 + 0.5, pixels[i2 + 2] = pixels[i2 + 2] * a2 + 0.5;
      }
    }
  }
};
_Extract.extension = {
  name: "extract",
  type: ExtensionType.RendererSystem
};
var Extract = _Extract;
extensions.add(Extract);
// node_modules/@pixi/graphics/lib/utils/buildCircle.mjs
var buildCircle = {
  build(graphicsData) {
    const points = graphicsData.points;
    let x2, y2, dx, dy, rx, ry;
    if (graphicsData.type === SHAPES.CIRC) {
      const circle = graphicsData.shape;
      x2 = circle.x, y2 = circle.y, rx = ry = circle.radius, dx = dy = 0;
    } else if (graphicsData.type === SHAPES.ELIP) {
      const ellipse = graphicsData.shape;
      x2 = ellipse.x, y2 = ellipse.y, rx = ellipse.width, ry = ellipse.height, dx = dy = 0;
    } else {
      const roundedRect = graphicsData.shape, halfWidth = roundedRect.width / 2, halfHeight = roundedRect.height / 2;
      x2 = roundedRect.x + halfWidth, y2 = roundedRect.y + halfHeight, rx = ry = Math.max(0, Math.min(roundedRect.radius, Math.min(halfWidth, halfHeight))), dx = halfWidth - rx, dy = halfHeight - ry;
    }
    if (!(rx >= 0 && ry >= 0 && dx >= 0 && dy >= 0)) {
      points.length = 0;
      return;
    }
    const n2 = Math.ceil(2.3 * Math.sqrt(rx + ry)), m3 = n2 * 8 + (dx ? 4 : 0) + (dy ? 4 : 0);
    if (points.length = m3, m3 === 0)
      return;
    if (n2 === 0) {
      points.length = 8, points[0] = points[6] = x2 + dx, points[1] = points[3] = y2 + dy, points[2] = points[4] = x2 - dx, points[5] = points[7] = y2 - dy;
      return;
    }
    let j1 = 0, j2 = n2 * 4 + (dx ? 2 : 0) + 2, j3 = j2, j4 = m3;
    {
      const x0 = dx + rx, y0 = dy, x1 = x2 + x0, x22 = x2 - x0, y1 = y2 + y0;
      if (points[j1++] = x1, points[j1++] = y1, points[--j2] = y1, points[--j2] = x22, dy) {
        const y22 = y2 - y0;
        points[j3++] = x22, points[j3++] = y22, points[--j4] = y22, points[--j4] = x1;
      }
    }
    for (let i2 = 1;i2 < n2; i2++) {
      const a2 = Math.PI / 2 * (i2 / n2), x0 = dx + Math.cos(a2) * rx, y0 = dy + Math.sin(a2) * ry, x1 = x2 + x0, x22 = x2 - x0, y1 = y2 + y0, y22 = y2 - y0;
      points[j1++] = x1, points[j1++] = y1, points[--j2] = y1, points[--j2] = x22, points[j3++] = x22, points[j3++] = y22, points[--j4] = y22, points[--j4] = x1;
    }
    {
      const x0 = dx, y0 = dy + ry, x1 = x2 + x0, x22 = x2 - x0, y1 = y2 + y0, y22 = y2 - y0;
      points[j1++] = x1, points[j1++] = y1, points[--j4] = y22, points[--j4] = x1, dx && (points[j1++] = x22, points[j1++] = y1, points[--j4] = y22, points[--j4] = x22);
    }
  },
  triangulate(graphicsData, graphicsGeometry) {
    const points = graphicsData.points, verts = graphicsGeometry.points, indices2 = graphicsGeometry.indices;
    if (points.length === 0)
      return;
    let vertPos = verts.length / 2;
    const center = vertPos;
    let x2, y2;
    if (graphicsData.type !== SHAPES.RREC) {
      const circle = graphicsData.shape;
      x2 = circle.x, y2 = circle.y;
    } else {
      const roundedRect = graphicsData.shape;
      x2 = roundedRect.x + roundedRect.width / 2, y2 = roundedRect.y + roundedRect.height / 2;
    }
    const matrix = graphicsData.matrix;
    verts.push(graphicsData.matrix ? matrix.a * x2 + matrix.c * y2 + matrix.tx : x2, graphicsData.matrix ? matrix.b * x2 + matrix.d * y2 + matrix.ty : y2), vertPos++, verts.push(points[0], points[1]);
    for (let i2 = 2;i2 < points.length; i2 += 2)
      verts.push(points[i2], points[i2 + 1]), indices2.push(vertPos++, center, vertPos);
    indices2.push(center + 1, center, vertPos);
  }
};

// node_modules/@pixi/graphics/lib/utils/buildPoly.mjs
var fixOrientation = function(points, hole = false) {
  const m3 = points.length;
  if (m3 < 6)
    return;
  let area = 0;
  for (let i2 = 0, x1 = points[m3 - 2], y1 = points[m3 - 1];i2 < m3; i2 += 2) {
    const x2 = points[i2], y2 = points[i2 + 1];
    area += (x2 - x1) * (y2 + y1), x1 = x2, y1 = y2;
  }
  if (!hole && area > 0 || hole && area <= 0) {
    const n2 = m3 / 2;
    for (let i2 = n2 + n2 % 2;i2 < m3; i2 += 2) {
      const i1 = m3 - i2 - 2, i22 = m3 - i2 - 1, i3 = i2, i4 = i2 + 1;
      [points[i1], points[i3]] = [points[i3], points[i1]], [points[i22], points[i4]] = [points[i4], points[i22]];
    }
  }
};
var buildPoly = {
  build(graphicsData) {
    graphicsData.points = graphicsData.shape.points.slice();
  },
  triangulate(graphicsData, graphicsGeometry) {
    let points = graphicsData.points;
    const holes = graphicsData.holes, verts = graphicsGeometry.points, indices2 = graphicsGeometry.indices;
    if (points.length >= 6) {
      fixOrientation(points, false);
      const holeArray = [];
      for (let i2 = 0;i2 < holes.length; i2++) {
        const hole = holes[i2];
        fixOrientation(hole.points, true), holeArray.push(points.length / 2), points = points.concat(hole.points);
      }
      const triangles = exports_lib.earcut(points, holeArray, 2);
      if (!triangles)
        return;
      const vertPos = verts.length / 2;
      for (let i2 = 0;i2 < triangles.length; i2 += 3)
        indices2.push(triangles[i2] + vertPos), indices2.push(triangles[i2 + 1] + vertPos), indices2.push(triangles[i2 + 2] + vertPos);
      for (let i2 = 0;i2 < points.length; i2++)
        verts.push(points[i2]);
    }
  }
};

// node_modules/@pixi/graphics/lib/utils/buildRectangle.mjs
var buildRectangle = {
  build(graphicsData) {
    const rectData = graphicsData.shape, x2 = rectData.x, y2 = rectData.y, width = rectData.width, height = rectData.height, points = graphicsData.points;
    points.length = 0, width >= 0 && height >= 0 && points.push(x2, y2, x2 + width, y2, x2 + width, y2 + height, x2, y2 + height);
  },
  triangulate(graphicsData, graphicsGeometry) {
    const points = graphicsData.points, verts = graphicsGeometry.points;
    if (points.length === 0)
      return;
    const vertPos = verts.length / 2;
    verts.push(points[0], points[1], points[2], points[3], points[6], points[7], points[4], points[5]), graphicsGeometry.indices.push(vertPos, vertPos + 1, vertPos + 2, vertPos + 1, vertPos + 2, vertPos + 3);
  }
};

// node_modules/@pixi/graphics/lib/utils/buildRoundedRectangle.mjs
var buildRoundedRectangle = {
  build(graphicsData) {
    buildCircle.build(graphicsData);
  },
  triangulate(graphicsData, graphicsGeometry) {
    buildCircle.triangulate(graphicsData, graphicsGeometry);
  }
};

// node_modules/@pixi/graphics/lib/const.mjs
var LINE_JOIN = ((LINE_JOIN2) => (LINE_JOIN2.MITER = "miter", LINE_JOIN2.BEVEL = "bevel", LINE_JOIN2.ROUND = "round", LINE_JOIN2))(LINE_JOIN || {});
var LINE_CAP = ((LINE_CAP2) => (LINE_CAP2.BUTT = "butt", LINE_CAP2.ROUND = "round", LINE_CAP2.SQUARE = "square", LINE_CAP2))(LINE_CAP || {});
var curves = {
  adaptive: true,
  maxLength: 10,
  minSegments: 8,
  maxSegments: 2048,
  epsilon: 0.0001,
  _segmentsCount(length, defaultSegments = 20) {
    if (!this.adaptive || !length || isNaN(length))
      return defaultSegments;
    let result = Math.ceil(length / this.maxLength);
    return result < this.minSegments ? result = this.minSegments : result > this.maxSegments && (result = this.maxSegments), result;
  }
};

// node_modules/@pixi/graphics/lib/utils/ArcUtils.mjs
class ArcUtils {
  static curveTo(x1, y1, x2, y2, radius, points) {
    const fromX = points[points.length - 2], a1 = points[points.length - 1] - y1, b1 = fromX - x1, a2 = y2 - y1, b2 = x2 - x1, mm = Math.abs(a1 * b2 - b1 * a2);
    if (mm < 0.00000001 || radius === 0)
      return (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) && points.push(x1, y1), null;
    const dd = a1 * a1 + b1 * b1, cc = a2 * a2 + b2 * b2, tt2 = a1 * a2 + b1 * b2, k1 = radius * Math.sqrt(dd) / mm, k22 = radius * Math.sqrt(cc) / mm, j1 = k1 * tt2 / dd, j2 = k22 * tt2 / cc, cx = k1 * b2 + k22 * b1, cy = k1 * a2 + k22 * a1, px = b1 * (k22 + j1), py = a1 * (k22 + j1), qx = b2 * (k1 + j2), qy = a2 * (k1 + j2), startAngle = Math.atan2(py - cy, px - cx), endAngle = Math.atan2(qy - cy, qx - cx);
    return {
      cx: cx + x1,
      cy: cy + y1,
      radius,
      startAngle,
      endAngle,
      anticlockwise: b1 * a2 > b2 * a1
    };
  }
  static arc(_startX, _startY, cx, cy, radius, startAngle, endAngle, _anticlockwise, points) {
    const sweep = endAngle - startAngle, n2 = curves._segmentsCount(Math.abs(sweep) * radius, Math.ceil(Math.abs(sweep) / PI_2) * 40), theta = sweep / (n2 * 2), theta2 = theta * 2, cTheta = Math.cos(theta), sTheta = Math.sin(theta), segMinus = n2 - 1, remainder = segMinus % 1 / segMinus;
    for (let i2 = 0;i2 <= segMinus; ++i2) {
      const real = i2 + remainder * i2, angle = theta + startAngle + theta2 * real, c2 = Math.cos(angle), s2 = -Math.sin(angle);
      points.push((cTheta * c2 + sTheta * s2) * radius + cx, (cTheta * -s2 + sTheta * c2) * radius + cy);
    }
  }
}

// node_modules/@pixi/graphics/lib/utils/BatchPart.mjs
class BatchPart {
  constructor() {
    this.reset();
  }
  begin(style, startIndex, attribStart) {
    this.reset(), this.style = style, this.start = startIndex, this.attribStart = attribStart;
  }
  end(endIndex, endAttrib) {
    this.attribSize = endAttrib - this.attribStart, this.size = endIndex - this.start;
  }
  reset() {
    this.style = null, this.size = 0, this.start = 0, this.attribStart = 0, this.attribSize = 0;
  }
}

// node_modules/@pixi/graphics/lib/utils/BezierUtils.mjs
class BezierUtils {
  static curveLength(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY) {
    let result = 0, t2 = 0, t22 = 0, t3 = 0, nt2 = 0, nt22 = 0, nt3 = 0, x2 = 0, y2 = 0, dx = 0, dy = 0, prevX = fromX, prevY = fromY;
    for (let i2 = 1;i2 <= 10; ++i2)
      t2 = i2 / 10, t22 = t2 * t2, t3 = t22 * t2, nt2 = 1 - t2, nt22 = nt2 * nt2, nt3 = nt22 * nt2, x2 = nt3 * fromX + 3 * nt22 * t2 * cpX + 3 * nt2 * t22 * cpX2 + t3 * toX, y2 = nt3 * fromY + 3 * nt22 * t2 * cpY + 3 * nt2 * t22 * cpY2 + t3 * toY, dx = prevX - x2, dy = prevY - y2, prevX = x2, prevY = y2, result += Math.sqrt(dx * dx + dy * dy);
    return result;
  }
  static curveTo(cpX, cpY, cpX2, cpY2, toX, toY, points) {
    const fromX = points[points.length - 2], fromY = points[points.length - 1];
    points.length -= 2;
    const n2 = curves._segmentsCount(BezierUtils.curveLength(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY));
    let dt = 0, dt2 = 0, dt3 = 0, t2 = 0, t3 = 0;
    points.push(fromX, fromY);
    for (let i2 = 1, j2 = 0;i2 <= n2; ++i2)
      j2 = i2 / n2, dt = 1 - j2, dt2 = dt * dt, dt3 = dt2 * dt, t2 = j2 * j2, t3 = t2 * j2, points.push(dt3 * fromX + 3 * dt2 * j2 * cpX + 3 * dt * t2 * cpX2 + t3 * toX, dt3 * fromY + 3 * dt2 * j2 * cpY + 3 * dt * t2 * cpY2 + t3 * toY);
  }
}

// node_modules/@pixi/graphics/lib/utils/buildLine.mjs
var square = function(x2, y2, nx, ny, innerWeight, outerWeight, clockwise, verts) {
  const ix = x2 - nx * innerWeight, iy = y2 - ny * innerWeight, ox = x2 + nx * outerWeight, oy = y2 + ny * outerWeight;
  let exx, eyy;
  clockwise ? (exx = ny, eyy = -nx) : (exx = -ny, eyy = nx);
  const eix = ix + exx, eiy = iy + eyy, eox = ox + exx, eoy = oy + eyy;
  return verts.push(eix, eiy, eox, eoy), 2;
};
var round = function(cx, cy, sx, sy, ex, ey, verts, clockwise) {
  const cx2p0x = sx - cx, cy2p0y = sy - cy;
  let angle0 = Math.atan2(cx2p0x, cy2p0y), angle1 = Math.atan2(ex - cx, ey - cy);
  clockwise && angle0 < angle1 ? angle0 += Math.PI * 2 : !clockwise && angle0 > angle1 && (angle1 += Math.PI * 2);
  let startAngle = angle0;
  const angleDiff = angle1 - angle0, absAngleDiff = Math.abs(angleDiff), radius = Math.sqrt(cx2p0x * cx2p0x + cy2p0y * cy2p0y), segCount = (15 * absAngleDiff * Math.sqrt(radius) / Math.PI >> 0) + 1, angleInc = angleDiff / segCount;
  if (startAngle += angleInc, clockwise) {
    verts.push(cx, cy, sx, sy);
    for (let i2 = 1, angle = startAngle;i2 < segCount; i2++, angle += angleInc)
      verts.push(cx, cy, cx + Math.sin(angle) * radius, cy + Math.cos(angle) * radius);
    verts.push(cx, cy, ex, ey);
  } else {
    verts.push(sx, sy, cx, cy);
    for (let i2 = 1, angle = startAngle;i2 < segCount; i2++, angle += angleInc)
      verts.push(cx + Math.sin(angle) * radius, cy + Math.cos(angle) * radius, cx, cy);
    verts.push(ex, ey, cx, cy);
  }
  return segCount * 2;
};
var buildNonNativeLine = function(graphicsData, graphicsGeometry) {
  const shape = graphicsData.shape;
  let points = graphicsData.points || shape.points.slice();
  const eps = graphicsGeometry.closePointEps;
  if (points.length === 0)
    return;
  const style = graphicsData.lineStyle, firstPoint = new Point(points[0], points[1]), lastPoint = new Point(points[points.length - 2], points[points.length - 1]), closedShape = shape.type !== SHAPES.POLY || shape.closeStroke, closedPath = Math.abs(firstPoint.x - lastPoint.x) < eps && Math.abs(firstPoint.y - lastPoint.y) < eps;
  if (closedShape) {
    points = points.slice(), closedPath && (points.pop(), points.pop(), lastPoint.set(points[points.length - 2], points[points.length - 1]));
    const midPointX = (firstPoint.x + lastPoint.x) * 0.5, midPointY = (lastPoint.y + firstPoint.y) * 0.5;
    points.unshift(midPointX, midPointY), points.push(midPointX, midPointY);
  }
  const verts = graphicsGeometry.points, length = points.length / 2;
  let indexCount = points.length;
  const indexStart = verts.length / 2, width = style.width / 2, widthSquared = width * width, miterLimitSquared = style.miterLimit * style.miterLimit;
  let x0 = points[0], y0 = points[1], x1 = points[2], y1 = points[3], x2 = 0, y2 = 0, perpx = -(y0 - y1), perpy = x0 - x1, perp1x = 0, perp1y = 0, dist = Math.sqrt(perpx * perpx + perpy * perpy);
  perpx /= dist, perpy /= dist, perpx *= width, perpy *= width;
  const ratio = style.alignment, innerWeight = (1 - ratio) * 2, outerWeight = ratio * 2;
  closedShape || (style.cap === LINE_CAP.ROUND ? indexCount += round(x0 - perpx * (innerWeight - outerWeight) * 0.5, y0 - perpy * (innerWeight - outerWeight) * 0.5, x0 - perpx * innerWeight, y0 - perpy * innerWeight, x0 + perpx * outerWeight, y0 + perpy * outerWeight, verts, true) + 2 : style.cap === LINE_CAP.SQUARE && (indexCount += square(x0, y0, perpx, perpy, innerWeight, outerWeight, true, verts))), verts.push(x0 - perpx * innerWeight, y0 - perpy * innerWeight, x0 + perpx * outerWeight, y0 + perpy * outerWeight);
  for (let i2 = 1;i2 < length - 1; ++i2) {
    x0 = points[(i2 - 1) * 2], y0 = points[(i2 - 1) * 2 + 1], x1 = points[i2 * 2], y1 = points[i2 * 2 + 1], x2 = points[(i2 + 1) * 2], y2 = points[(i2 + 1) * 2 + 1], perpx = -(y0 - y1), perpy = x0 - x1, dist = Math.sqrt(perpx * perpx + perpy * perpy), perpx /= dist, perpy /= dist, perpx *= width, perpy *= width, perp1x = -(y1 - y2), perp1y = x1 - x2, dist = Math.sqrt(perp1x * perp1x + perp1y * perp1y), perp1x /= dist, perp1y /= dist, perp1x *= width, perp1y *= width;
    const dx0 = x1 - x0, dy0 = y0 - y1, dx1 = x1 - x2, dy1 = y2 - y1, dot = dx0 * dx1 + dy0 * dy1, cross = dy0 * dx1 - dy1 * dx0, clockwise = cross < 0;
    if (Math.abs(cross) < 0.001 * Math.abs(dot)) {
      verts.push(x1 - perpx * innerWeight, y1 - perpy * innerWeight, x1 + perpx * outerWeight, y1 + perpy * outerWeight), dot >= 0 && (style.join === LINE_JOIN.ROUND ? indexCount += round(x1, y1, x1 - perpx * innerWeight, y1 - perpy * innerWeight, x1 - perp1x * innerWeight, y1 - perp1y * innerWeight, verts, false) + 4 : indexCount += 2, verts.push(x1 - perp1x * outerWeight, y1 - perp1y * outerWeight, x1 + perp1x * innerWeight, y1 + perp1y * innerWeight));
      continue;
    }
    const c1 = (-perpx + x0) * (-perpy + y1) - (-perpx + x1) * (-perpy + y0), c2 = (-perp1x + x2) * (-perp1y + y1) - (-perp1x + x1) * (-perp1y + y2), px = (dx0 * c2 - dx1 * c1) / cross, py = (dy1 * c1 - dy0 * c2) / cross, pdist = (px - x1) * (px - x1) + (py - y1) * (py - y1), imx = x1 + (px - x1) * innerWeight, imy = y1 + (py - y1) * innerWeight, omx = x1 - (px - x1) * outerWeight, omy = y1 - (py - y1) * outerWeight, smallerInsideSegmentSq = Math.min(dx0 * dx0 + dy0 * dy0, dx1 * dx1 + dy1 * dy1), insideWeight = clockwise ? innerWeight : outerWeight, smallerInsideDiagonalSq = smallerInsideSegmentSq + insideWeight * insideWeight * widthSquared, insideMiterOk = pdist <= smallerInsideDiagonalSq;
    let join = style.join;
    if (join === LINE_JOIN.MITER && pdist / widthSquared > miterLimitSquared && (join = LINE_JOIN.BEVEL), insideMiterOk)
      switch (join) {
        case LINE_JOIN.MITER: {
          verts.push(imx, imy, omx, omy);
          break;
        }
        case LINE_JOIN.BEVEL: {
          clockwise ? verts.push(imx, imy, x1 + perpx * outerWeight, y1 + perpy * outerWeight, imx, imy, x1 + perp1x * outerWeight, y1 + perp1y * outerWeight) : verts.push(x1 - perpx * innerWeight, y1 - perpy * innerWeight, omx, omy, x1 - perp1x * innerWeight, y1 - perp1y * innerWeight, omx, omy), indexCount += 2;
          break;
        }
        case LINE_JOIN.ROUND: {
          clockwise ? (verts.push(imx, imy, x1 + perpx * outerWeight, y1 + perpy * outerWeight), indexCount += round(x1, y1, x1 + perpx * outerWeight, y1 + perpy * outerWeight, x1 + perp1x * outerWeight, y1 + perp1y * outerWeight, verts, true) + 4, verts.push(imx, imy, x1 + perp1x * outerWeight, y1 + perp1y * outerWeight)) : (verts.push(x1 - perpx * innerWeight, y1 - perpy * innerWeight, omx, omy), indexCount += round(x1, y1, x1 - perpx * innerWeight, y1 - perpy * innerWeight, x1 - perp1x * innerWeight, y1 - perp1y * innerWeight, verts, false) + 4, verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight, omx, omy));
          break;
        }
      }
    else {
      switch (verts.push(x1 - perpx * innerWeight, y1 - perpy * innerWeight, x1 + perpx * outerWeight, y1 + perpy * outerWeight), join) {
        case LINE_JOIN.MITER: {
          clockwise ? verts.push(omx, omy, omx, omy) : verts.push(imx, imy, imx, imy), indexCount += 2;
          break;
        }
        case LINE_JOIN.ROUND: {
          clockwise ? indexCount += round(x1, y1, x1 + perpx * outerWeight, y1 + perpy * outerWeight, x1 + perp1x * outerWeight, y1 + perp1y * outerWeight, verts, true) + 2 : indexCount += round(x1, y1, x1 - perpx * innerWeight, y1 - perpy * innerWeight, x1 - perp1x * innerWeight, y1 - perp1y * innerWeight, verts, false) + 2;
          break;
        }
      }
      verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight, x1 + perp1x * outerWeight, y1 + perp1y * outerWeight), indexCount += 2;
    }
  }
  x0 = points[(length - 2) * 2], y0 = points[(length - 2) * 2 + 1], x1 = points[(length - 1) * 2], y1 = points[(length - 1) * 2 + 1], perpx = -(y0 - y1), perpy = x0 - x1, dist = Math.sqrt(perpx * perpx + perpy * perpy), perpx /= dist, perpy /= dist, perpx *= width, perpy *= width, verts.push(x1 - perpx * innerWeight, y1 - perpy * innerWeight, x1 + perpx * outerWeight, y1 + perpy * outerWeight), closedShape || (style.cap === LINE_CAP.ROUND ? indexCount += round(x1 - perpx * (innerWeight - outerWeight) * 0.5, y1 - perpy * (innerWeight - outerWeight) * 0.5, x1 - perpx * innerWeight, y1 - perpy * innerWeight, x1 + perpx * outerWeight, y1 + perpy * outerWeight, verts, false) + 2 : style.cap === LINE_CAP.SQUARE && (indexCount += square(x1, y1, perpx, perpy, innerWeight, outerWeight, false, verts)));
  const indices2 = graphicsGeometry.indices, eps2 = curves.epsilon * curves.epsilon;
  for (let i2 = indexStart;i2 < indexCount + indexStart - 2; ++i2)
    x0 = verts[i2 * 2], y0 = verts[i2 * 2 + 1], x1 = verts[(i2 + 1) * 2], y1 = verts[(i2 + 1) * 2 + 1], x2 = verts[(i2 + 2) * 2], y2 = verts[(i2 + 2) * 2 + 1], !(Math.abs(x0 * (y1 - y2) + x1 * (y2 - y0) + x2 * (y0 - y1)) < eps2) && indices2.push(i2, i2 + 1, i2 + 2);
};
var buildNativeLine = function(graphicsData, graphicsGeometry) {
  let i2 = 0;
  const shape = graphicsData.shape, points = graphicsData.points || shape.points, closedShape = shape.type !== SHAPES.POLY || shape.closeStroke;
  if (points.length === 0)
    return;
  const { points: verts, indices: indices2 } = graphicsGeometry, length = points.length / 2, startIndex = verts.length / 2;
  let currentIndex = startIndex;
  for (verts.push(points[0], points[1]), i2 = 1;i2 < length; i2++)
    verts.push(points[i2 * 2], points[i2 * 2 + 1]), indices2.push(currentIndex, currentIndex + 1), currentIndex++;
  closedShape && indices2.push(currentIndex, startIndex);
};
var buildLine = function(graphicsData, graphicsGeometry) {
  graphicsData.lineStyle.native ? buildNativeLine(graphicsData, graphicsGeometry) : buildNonNativeLine(graphicsData, graphicsGeometry);
};

// node_modules/@pixi/graphics/lib/utils/QuadraticUtils.mjs
class QuadraticUtils {
  static curveLength(fromX, fromY, cpX, cpY, toX, toY) {
    const ax = fromX - 2 * cpX + toX, ay = fromY - 2 * cpY + toY, bx = 2 * cpX - 2 * fromX, by = 2 * cpY - 2 * fromY, a2 = 4 * (ax * ax + ay * ay), b2 = 4 * (ax * bx + ay * by), c2 = bx * bx + by * by, s2 = 2 * Math.sqrt(a2 + b2 + c2), a22 = Math.sqrt(a2), a32 = 2 * a2 * a22, c22 = 2 * Math.sqrt(c2), ba = b2 / a22;
    return (a32 * s2 + a22 * b2 * (s2 - c22) + (4 * c2 * a2 - b2 * b2) * Math.log((2 * a22 + ba + s2) / (ba + c22))) / (4 * a32);
  }
  static curveTo(cpX, cpY, toX, toY, points) {
    const fromX = points[points.length - 2], fromY = points[points.length - 1], n2 = curves._segmentsCount(QuadraticUtils.curveLength(fromX, fromY, cpX, cpY, toX, toY));
    let xa = 0, ya = 0;
    for (let i2 = 1;i2 <= n2; ++i2) {
      const j2 = i2 / n2;
      xa = fromX + (cpX - fromX) * j2, ya = fromY + (cpY - fromY) * j2, points.push(xa + (cpX + (toX - cpX) * j2 - xa) * j2, ya + (cpY + (toY - cpY) * j2 - ya) * j2);
    }
  }
}

// node_modules/@pixi/graphics/lib/utils/index.mjs
var FILL_COMMANDS = {
  [SHAPES.POLY]: buildPoly,
  [SHAPES.CIRC]: buildCircle,
  [SHAPES.ELIP]: buildCircle,
  [SHAPES.RECT]: buildRectangle,
  [SHAPES.RREC]: buildRoundedRectangle
};
var BATCH_POOL = [];
var DRAW_CALL_POOL = [];

// node_modules/@pixi/graphics/lib/GraphicsData.mjs
class GraphicsData {
  constructor(shape, fillStyle = null, lineStyle = null, matrix = null) {
    this.points = [], this.holes = [], this.shape = shape, this.lineStyle = lineStyle, this.fillStyle = fillStyle, this.matrix = matrix, this.type = shape.type;
  }
  clone() {
    return new GraphicsData(this.shape, this.fillStyle, this.lineStyle, this.matrix);
  }
  destroy() {
    this.shape = null, this.holes.length = 0, this.holes = null, this.points.length = 0, this.points = null, this.lineStyle = null, this.fillStyle = null;
  }
}

// node_modules/@pixi/graphics/lib/GraphicsGeometry.mjs
var tmpPoint = new Point;
var _GraphicsGeometry = class _GraphicsGeometry2 extends BatchGeometry {
  constructor() {
    super(), this.closePointEps = 0.0001, this.boundsPadding = 0, this.uvsFloat32 = null, this.indicesUint16 = null, this.batchable = false, this.points = [], this.colors = [], this.uvs = [], this.indices = [], this.textureIds = [], this.graphicsData = [], this.drawCalls = [], this.batchDirty = -1, this.batches = [], this.dirty = 0, this.cacheDirty = -1, this.clearDirty = 0, this.shapeIndex = 0, this._bounds = new Bounds, this.boundsDirty = -1;
  }
  get bounds() {
    return this.updateBatches(), this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.calculateBounds()), this._bounds;
  }
  invalidate() {
    this.boundsDirty = -1, this.dirty++, this.batchDirty++, this.shapeIndex = 0, this.points.length = 0, this.colors.length = 0, this.uvs.length = 0, this.indices.length = 0, this.textureIds.length = 0;
    for (let i2 = 0;i2 < this.drawCalls.length; i2++)
      this.drawCalls[i2].texArray.clear(), DRAW_CALL_POOL.push(this.drawCalls[i2]);
    this.drawCalls.length = 0;
    for (let i2 = 0;i2 < this.batches.length; i2++) {
      const batchPart = this.batches[i2];
      batchPart.reset(), BATCH_POOL.push(batchPart);
    }
    this.batches.length = 0;
  }
  clear() {
    return this.graphicsData.length > 0 && (this.invalidate(), this.clearDirty++, this.graphicsData.length = 0), this;
  }
  drawShape(shape, fillStyle = null, lineStyle = null, matrix = null) {
    const data = new GraphicsData(shape, fillStyle, lineStyle, matrix);
    return this.graphicsData.push(data), this.dirty++, this;
  }
  drawHole(shape, matrix = null) {
    if (!this.graphicsData.length)
      return null;
    const data = new GraphicsData(shape, null, null, matrix), lastShape = this.graphicsData[this.graphicsData.length - 1];
    return data.lineStyle = lastShape.lineStyle, lastShape.holes.push(data), this.dirty++, this;
  }
  destroy() {
    super.destroy();
    for (let i2 = 0;i2 < this.graphicsData.length; ++i2)
      this.graphicsData[i2].destroy();
    this.points.length = 0, this.points = null, this.colors.length = 0, this.colors = null, this.uvs.length = 0, this.uvs = null, this.indices.length = 0, this.indices = null, this.indexBuffer.destroy(), this.indexBuffer = null, this.graphicsData.length = 0, this.graphicsData = null, this.drawCalls.length = 0, this.drawCalls = null, this.batches.length = 0, this.batches = null, this._bounds = null;
  }
  containsPoint(point) {
    const graphicsData = this.graphicsData;
    for (let i2 = 0;i2 < graphicsData.length; ++i2) {
      const data = graphicsData[i2];
      if (data.fillStyle.visible && data.shape && (data.matrix ? data.matrix.applyInverse(point, tmpPoint) : tmpPoint.copyFrom(point), data.shape.contains(tmpPoint.x, tmpPoint.y))) {
        let hitHole = false;
        if (data.holes) {
          for (let i22 = 0;i22 < data.holes.length; i22++)
            if (data.holes[i22].shape.contains(tmpPoint.x, tmpPoint.y)) {
              hitHole = true;
              break;
            }
        }
        if (!hitHole)
          return true;
      }
    }
    return false;
  }
  updateBatches() {
    if (!this.graphicsData.length) {
      this.batchable = true;
      return;
    }
    if (!this.validateBatching())
      return;
    this.cacheDirty = this.dirty;
    const uvs = this.uvs, graphicsData = this.graphicsData;
    let batchPart = null, currentStyle = null;
    this.batches.length > 0 && (batchPart = this.batches[this.batches.length - 1], currentStyle = batchPart.style);
    for (let i2 = this.shapeIndex;i2 < graphicsData.length; i2++) {
      this.shapeIndex++;
      const data = graphicsData[i2], fillStyle = data.fillStyle, lineStyle = data.lineStyle;
      FILL_COMMANDS[data.type].build(data), data.matrix && this.transformPoints(data.points, data.matrix), (fillStyle.visible || lineStyle.visible) && this.processHoles(data.holes);
      for (let j2 = 0;j2 < 2; j2++) {
        const style = j2 === 0 ? fillStyle : lineStyle;
        if (!style.visible)
          continue;
        const nextTexture = style.texture.baseTexture, index2 = this.indices.length, attribIndex = this.points.length / 2;
        nextTexture.wrapMode = WRAP_MODES.REPEAT, j2 === 0 ? this.processFill(data) : this.processLine(data);
        const size = this.points.length / 2 - attribIndex;
        size !== 0 && (batchPart && !this._compareStyles(currentStyle, style) && (batchPart.end(index2, attribIndex), batchPart = null), batchPart || (batchPart = BATCH_POOL.pop() || new BatchPart, batchPart.begin(style, index2, attribIndex), this.batches.push(batchPart), currentStyle = style), this.addUvs(this.points, uvs, style.texture, attribIndex, size, style.matrix));
      }
    }
    const index = this.indices.length, attrib = this.points.length / 2;
    if (batchPart && batchPart.end(index, attrib), this.batches.length === 0) {
      this.batchable = true;
      return;
    }
    const need32 = attrib > 65535;
    this.indicesUint16 && this.indices.length === this.indicesUint16.length && need32 === this.indicesUint16.BYTES_PER_ELEMENT > 2 ? this.indicesUint16.set(this.indices) : this.indicesUint16 = need32 ? new Uint32Array(this.indices) : new Uint16Array(this.indices), this.batchable = this.isBatchable(), this.batchable ? this.packBatches() : this.buildDrawCalls();
  }
  _compareStyles(styleA, styleB) {
    return !(!styleA || !styleB || styleA.texture.baseTexture !== styleB.texture.baseTexture || styleA.color + styleA.alpha !== styleB.color + styleB.alpha || !!styleA.native != !!styleB.native);
  }
  validateBatching() {
    if (this.dirty === this.cacheDirty || !this.graphicsData.length)
      return false;
    for (let i2 = 0, l2 = this.graphicsData.length;i2 < l2; i2++) {
      const data = this.graphicsData[i2], fill = data.fillStyle, line = data.lineStyle;
      if (fill && !fill.texture.baseTexture.valid || line && !line.texture.baseTexture.valid)
        return false;
    }
    return true;
  }
  packBatches() {
    this.batchDirty++, this.uvsFloat32 = new Float32Array(this.uvs);
    const batches = this.batches;
    for (let i2 = 0, l2 = batches.length;i2 < l2; i2++) {
      const batch = batches[i2];
      for (let j2 = 0;j2 < batch.size; j2++) {
        const index = batch.start + j2;
        this.indicesUint16[index] = this.indicesUint16[index] - batch.attribStart;
      }
    }
  }
  isBatchable() {
    if (this.points.length > 65535 * 2)
      return false;
    const batches = this.batches;
    for (let i2 = 0;i2 < batches.length; i2++)
      if (batches[i2].style.native)
        return false;
    return this.points.length < _GraphicsGeometry2.BATCHABLE_SIZE * 2;
  }
  buildDrawCalls() {
    let TICK = ++BaseTexture._globalBatch;
    for (let i2 = 0;i2 < this.drawCalls.length; i2++)
      this.drawCalls[i2].texArray.clear(), DRAW_CALL_POOL.push(this.drawCalls[i2]);
    this.drawCalls.length = 0;
    const colors = this.colors, textureIds = this.textureIds;
    let currentGroup = DRAW_CALL_POOL.pop();
    currentGroup || (currentGroup = new BatchDrawCall, currentGroup.texArray = new BatchTextureArray), currentGroup.texArray.count = 0, currentGroup.start = 0, currentGroup.size = 0, currentGroup.type = DRAW_MODES.TRIANGLES;
    let textureCount = 0, currentTexture = null, textureId = 0, native = false, drawMode = DRAW_MODES.TRIANGLES, index = 0;
    this.drawCalls.push(currentGroup);
    for (let i2 = 0;i2 < this.batches.length; i2++) {
      const data = this.batches[i2], maxTextures = 8, style = data.style, nextTexture = style.texture.baseTexture;
      native !== !!style.native && (native = !!style.native, drawMode = native ? DRAW_MODES.LINES : DRAW_MODES.TRIANGLES, currentTexture = null, textureCount = maxTextures, TICK++), currentTexture !== nextTexture && (currentTexture = nextTexture, nextTexture._batchEnabled !== TICK && (textureCount === maxTextures && (TICK++, textureCount = 0, currentGroup.size > 0 && (currentGroup = DRAW_CALL_POOL.pop(), currentGroup || (currentGroup = new BatchDrawCall, currentGroup.texArray = new BatchTextureArray), this.drawCalls.push(currentGroup)), currentGroup.start = index, currentGroup.size = 0, currentGroup.texArray.count = 0, currentGroup.type = drawMode), nextTexture.touched = 1, nextTexture._batchEnabled = TICK, nextTexture._batchLocation = textureCount, nextTexture.wrapMode = WRAP_MODES.REPEAT, currentGroup.texArray.elements[currentGroup.texArray.count++] = nextTexture, textureCount++)), currentGroup.size += data.size, index += data.size, textureId = nextTexture._batchLocation, this.addColors(colors, style.color, style.alpha, data.attribSize, data.attribStart), this.addTextureIds(textureIds, textureId, data.attribSize, data.attribStart);
    }
    BaseTexture._globalBatch = TICK, this.packAttributes();
  }
  packAttributes() {
    const verts = this.points, uvs = this.uvs, colors = this.colors, textureIds = this.textureIds, glPoints = new ArrayBuffer(verts.length * 3 * 4), f32 = new Float32Array(glPoints), u32 = new Uint32Array(glPoints);
    let p2 = 0;
    for (let i2 = 0;i2 < verts.length / 2; i2++)
      f32[p2++] = verts[i2 * 2], f32[p2++] = verts[i2 * 2 + 1], f32[p2++] = uvs[i2 * 2], f32[p2++] = uvs[i2 * 2 + 1], u32[p2++] = colors[i2], f32[p2++] = textureIds[i2];
    this._buffer.update(glPoints), this._indexBuffer.update(this.indicesUint16);
  }
  processFill(data) {
    data.holes.length ? buildPoly.triangulate(data, this) : FILL_COMMANDS[data.type].triangulate(data, this);
  }
  processLine(data) {
    buildLine(data, this);
    for (let i2 = 0;i2 < data.holes.length; i2++)
      buildLine(data.holes[i2], this);
  }
  processHoles(holes) {
    for (let i2 = 0;i2 < holes.length; i2++) {
      const hole = holes[i2];
      FILL_COMMANDS[hole.type].build(hole), hole.matrix && this.transformPoints(hole.points, hole.matrix);
    }
  }
  calculateBounds() {
    const bounds = this._bounds;
    bounds.clear(), bounds.addVertexData(this.points, 0, this.points.length), bounds.pad(this.boundsPadding, this.boundsPadding);
  }
  transformPoints(points, matrix) {
    for (let i2 = 0;i2 < points.length / 2; i2++) {
      const x2 = points[i2 * 2], y2 = points[i2 * 2 + 1];
      points[i2 * 2] = matrix.a * x2 + matrix.c * y2 + matrix.tx, points[i2 * 2 + 1] = matrix.b * x2 + matrix.d * y2 + matrix.ty;
    }
  }
  addColors(colors, color8, alpha, size, offset = 0) {
    const bgr = Color.shared.setValue(color8).toLittleEndianNumber(), result = Color.shared.setValue(bgr).toPremultiplied(alpha);
    colors.length = Math.max(colors.length, offset + size);
    for (let i2 = 0;i2 < size; i2++)
      colors[offset + i2] = result;
  }
  addTextureIds(textureIds, id, size, offset = 0) {
    textureIds.length = Math.max(textureIds.length, offset + size);
    for (let i2 = 0;i2 < size; i2++)
      textureIds[offset + i2] = id;
  }
  addUvs(verts, uvs, texture, start, size, matrix = null) {
    let index = 0;
    const uvsStart = uvs.length, frame = texture.frame;
    for (;index < size; ) {
      let x2 = verts[(start + index) * 2], y2 = verts[(start + index) * 2 + 1];
      if (matrix) {
        const nx = matrix.a * x2 + matrix.c * y2 + matrix.tx;
        y2 = matrix.b * x2 + matrix.d * y2 + matrix.ty, x2 = nx;
      }
      index++, uvs.push(x2 / frame.width, y2 / frame.height);
    }
    const baseTexture = texture.baseTexture;
    (frame.width < baseTexture.width || frame.height < baseTexture.height) && this.adjustUvs(uvs, texture, uvsStart, size);
  }
  adjustUvs(uvs, texture, start, size) {
    const baseTexture = texture.baseTexture, eps = 0.000001, finish = start + size * 2, frame = texture.frame, scaleX = frame.width / baseTexture.width, scaleY = frame.height / baseTexture.height;
    let offsetX = frame.x / frame.width, offsetY = frame.y / frame.height, minX = Math.floor(uvs[start] + eps), minY = Math.floor(uvs[start + 1] + eps);
    for (let i2 = start + 2;i2 < finish; i2 += 2)
      minX = Math.min(minX, Math.floor(uvs[i2] + eps)), minY = Math.min(minY, Math.floor(uvs[i2 + 1] + eps));
    offsetX -= minX, offsetY -= minY;
    for (let i2 = start;i2 < finish; i2 += 2)
      uvs[i2] = (uvs[i2] + offsetX) * scaleX, uvs[i2 + 1] = (uvs[i2 + 1] + offsetY) * scaleY;
  }
};
_GraphicsGeometry.BATCHABLE_SIZE = 100;
var GraphicsGeometry = _GraphicsGeometry;

// node_modules/@pixi/graphics/lib/styles/FillStyle.mjs
class FillStyle {
  constructor() {
    this.color = 16777215, this.alpha = 1, this.texture = Texture.WHITE, this.matrix = null, this.visible = false, this.reset();
  }
  clone() {
    const obj = new FillStyle;
    return obj.color = this.color, obj.alpha = this.alpha, obj.texture = this.texture, obj.matrix = this.matrix, obj.visible = this.visible, obj;
  }
  reset() {
    this.color = 16777215, this.alpha = 1, this.texture = Texture.WHITE, this.matrix = null, this.visible = false;
  }
  destroy() {
    this.texture = null, this.matrix = null;
  }
}

// node_modules/@pixi/graphics/lib/styles/LineStyle.mjs
class LineStyle extends FillStyle {
  constructor() {
    super(...arguments), this.width = 0, this.alignment = 0.5, this.native = false, this.cap = LINE_CAP.BUTT, this.join = LINE_JOIN.MITER, this.miterLimit = 10;
  }
  clone() {
    const obj = new LineStyle;
    return obj.color = this.color, obj.alpha = this.alpha, obj.texture = this.texture, obj.matrix = this.matrix, obj.visible = this.visible, obj.width = this.width, obj.alignment = this.alignment, obj.native = this.native, obj.cap = this.cap, obj.join = this.join, obj.miterLimit = this.miterLimit, obj;
  }
  reset() {
    super.reset(), this.color = 0, this.alignment = 0.5, this.width = 0, this.native = false, this.cap = LINE_CAP.BUTT, this.join = LINE_JOIN.MITER, this.miterLimit = 10;
  }
}

// node_modules/@pixi/graphics/lib/Graphics.mjs
var DEFAULT_SHADERS = {};
var _Graphics = class _Graphics2 extends Container {
  constructor(geometry = null) {
    super(), this.shader = null, this.pluginName = "batch", this.currentPath = null, this.batches = [], this.batchTint = -1, this.batchDirty = -1, this.vertexData = null, this._fillStyle = new FillStyle, this._lineStyle = new LineStyle, this._matrix = null, this._holeMode = false, this.state = State.for2d(), this._geometry = geometry || new GraphicsGeometry, this._geometry.refCount++, this._transformID = -1, this._tintColor = new Color(16777215), this.blendMode = BLEND_MODES.NORMAL;
  }
  get geometry() {
    return this._geometry;
  }
  clone() {
    return this.finishPoly(), new _Graphics2(this._geometry);
  }
  set blendMode(value) {
    this.state.blendMode = value;
  }
  get blendMode() {
    return this.state.blendMode;
  }
  get tint() {
    return this._tintColor.value;
  }
  set tint(value) {
    this._tintColor.setValue(value);
  }
  get fill() {
    return this._fillStyle;
  }
  get line() {
    return this._lineStyle;
  }
  lineStyle(options = null, color8 = 0, alpha, alignment = 0.5, native = false) {
    return typeof options == "number" && (options = { width: options, color: color8, alpha, alignment, native }), this.lineTextureStyle(options);
  }
  lineTextureStyle(options) {
    const defaultLineStyleOptions = {
      width: 0,
      texture: Texture.WHITE,
      color: options?.texture ? 16777215 : 0,
      matrix: null,
      alignment: 0.5,
      native: false,
      cap: LINE_CAP.BUTT,
      join: LINE_JOIN.MITER,
      miterLimit: 10
    };
    options = Object.assign(defaultLineStyleOptions, options), this.normalizeColor(options), this.currentPath && this.startPoly();
    const visible = options.width > 0 && options.alpha > 0;
    return visible ? (options.matrix && (options.matrix = options.matrix.clone(), options.matrix.invert()), Object.assign(this._lineStyle, { visible }, options)) : this._lineStyle.reset(), this;
  }
  startPoly() {
    if (this.currentPath) {
      const points = this.currentPath.points, len = this.currentPath.points.length;
      len > 2 && (this.drawShape(this.currentPath), this.currentPath = new Polygon, this.currentPath.closeStroke = false, this.currentPath.points.push(points[len - 2], points[len - 1]));
    } else
      this.currentPath = new Polygon, this.currentPath.closeStroke = false;
  }
  finishPoly() {
    this.currentPath && (this.currentPath.points.length > 2 ? (this.drawShape(this.currentPath), this.currentPath = null) : this.currentPath.points.length = 0);
  }
  moveTo(x2, y2) {
    return this.startPoly(), this.currentPath.points[0] = x2, this.currentPath.points[1] = y2, this;
  }
  lineTo(x2, y2) {
    this.currentPath || this.moveTo(0, 0);
    const points = this.currentPath.points, fromX = points[points.length - 2], fromY = points[points.length - 1];
    return (fromX !== x2 || fromY !== y2) && points.push(x2, y2), this;
  }
  _initCurve(x2 = 0, y2 = 0) {
    this.currentPath ? this.currentPath.points.length === 0 && (this.currentPath.points = [x2, y2]) : this.moveTo(x2, y2);
  }
  quadraticCurveTo(cpX, cpY, toX, toY) {
    this._initCurve();
    const points = this.currentPath.points;
    return points.length === 0 && this.moveTo(0, 0), QuadraticUtils.curveTo(cpX, cpY, toX, toY, points), this;
  }
  bezierCurveTo(cpX, cpY, cpX2, cpY2, toX, toY) {
    return this._initCurve(), BezierUtils.curveTo(cpX, cpY, cpX2, cpY2, toX, toY, this.currentPath.points), this;
  }
  arcTo(x1, y1, x2, y2, radius) {
    this._initCurve(x1, y1);
    const points = this.currentPath.points, result = ArcUtils.curveTo(x1, y1, x2, y2, radius, points);
    if (result) {
      const { cx, cy, radius: radius2, startAngle, endAngle, anticlockwise } = result;
      this.arc(cx, cy, radius2, startAngle, endAngle, anticlockwise);
    }
    return this;
  }
  arc(cx, cy, radius, startAngle, endAngle, anticlockwise = false) {
    if (startAngle === endAngle)
      return this;
    if (!anticlockwise && endAngle <= startAngle ? endAngle += PI_2 : anticlockwise && startAngle <= endAngle && (startAngle += PI_2), endAngle - startAngle === 0)
      return this;
    const startX = cx + Math.cos(startAngle) * radius, startY = cy + Math.sin(startAngle) * radius, eps = this._geometry.closePointEps;
    let points = this.currentPath ? this.currentPath.points : null;
    if (points) {
      const xDiff = Math.abs(points[points.length - 2] - startX), yDiff = Math.abs(points[points.length - 1] - startY);
      xDiff < eps && yDiff < eps || points.push(startX, startY);
    } else
      this.moveTo(startX, startY), points = this.currentPath.points;
    return ArcUtils.arc(startX, startY, cx, cy, radius, startAngle, endAngle, anticlockwise, points), this;
  }
  beginFill(color8 = 0, alpha) {
    return this.beginTextureFill({ texture: Texture.WHITE, color: color8, alpha });
  }
  normalizeColor(options) {
    const temp = Color.shared.setValue(options.color ?? 0);
    options.color = temp.toNumber(), options.alpha ?? (options.alpha = temp.alpha);
  }
  beginTextureFill(options) {
    const defaultOptions = {
      texture: Texture.WHITE,
      color: 16777215,
      matrix: null
    };
    options = Object.assign(defaultOptions, options), this.normalizeColor(options), this.currentPath && this.startPoly();
    const visible = options.alpha > 0;
    return visible ? (options.matrix && (options.matrix = options.matrix.clone(), options.matrix.invert()), Object.assign(this._fillStyle, { visible }, options)) : this._fillStyle.reset(), this;
  }
  endFill() {
    return this.finishPoly(), this._fillStyle.reset(), this;
  }
  drawRect(x2, y2, width, height) {
    return this.drawShape(new Rectangle(x2, y2, width, height));
  }
  drawRoundedRect(x2, y2, width, height, radius) {
    return this.drawShape(new RoundedRectangle(x2, y2, width, height, radius));
  }
  drawCircle(x2, y2, radius) {
    return this.drawShape(new Circle(x2, y2, radius));
  }
  drawEllipse(x2, y2, width, height) {
    return this.drawShape(new Ellipse(x2, y2, width, height));
  }
  drawPolygon(...path3) {
    let points, closeStroke = true;
    const poly = path3[0];
    poly.points ? (closeStroke = poly.closeStroke, points = poly.points) : Array.isArray(path3[0]) ? points = path3[0] : points = path3;
    const shape = new Polygon(points);
    return shape.closeStroke = closeStroke, this.drawShape(shape), this;
  }
  drawShape(shape) {
    return this._holeMode ? this._geometry.drawHole(shape, this._matrix) : this._geometry.drawShape(shape, this._fillStyle.clone(), this._lineStyle.clone(), this._matrix), this;
  }
  clear() {
    return this._geometry.clear(), this._lineStyle.reset(), this._fillStyle.reset(), this._boundsID++, this._matrix = null, this._holeMode = false, this.currentPath = null, this;
  }
  isFastRect() {
    const data = this._geometry.graphicsData;
    return data.length === 1 && data[0].shape.type === SHAPES.RECT && !data[0].matrix && !data[0].holes.length && !(data[0].lineStyle.visible && data[0].lineStyle.width);
  }
  _render(renderer) {
    this.finishPoly();
    const geometry = this._geometry;
    geometry.updateBatches(), geometry.batchable ? (this.batchDirty !== geometry.batchDirty && this._populateBatches(), this._renderBatched(renderer)) : (renderer.batch.flush(), this._renderDirect(renderer));
  }
  _populateBatches() {
    const geometry = this._geometry, blendMode = this.blendMode, len = geometry.batches.length;
    this.batchTint = -1, this._transformID = -1, this.batchDirty = geometry.batchDirty, this.batches.length = len, this.vertexData = new Float32Array(geometry.points);
    for (let i2 = 0;i2 < len; i2++) {
      const gI = geometry.batches[i2], color8 = gI.style.color, vertexData = new Float32Array(this.vertexData.buffer, gI.attribStart * 4 * 2, gI.attribSize * 2), uvs = new Float32Array(geometry.uvsFloat32.buffer, gI.attribStart * 4 * 2, gI.attribSize * 2), indices2 = new Uint16Array(geometry.indicesUint16.buffer, gI.start * 2, gI.size), batch = {
        vertexData,
        blendMode,
        indices: indices2,
        uvs,
        _batchRGB: Color.shared.setValue(color8).toRgbArray(),
        _tintRGB: color8,
        _texture: gI.style.texture,
        alpha: gI.style.alpha,
        worldAlpha: 1
      };
      this.batches[i2] = batch;
    }
  }
  _renderBatched(renderer) {
    if (this.batches.length) {
      renderer.batch.setObjectRenderer(renderer.plugins[this.pluginName]), this.calculateVertices(), this.calculateTints();
      for (let i2 = 0, l2 = this.batches.length;i2 < l2; i2++) {
        const batch = this.batches[i2];
        batch.worldAlpha = this.worldAlpha * batch.alpha, renderer.plugins[this.pluginName].render(batch);
      }
    }
  }
  _renderDirect(renderer) {
    const shader = this._resolveDirectShader(renderer), geometry = this._geometry, worldAlpha = this.worldAlpha, uniforms = shader.uniforms, drawCalls = geometry.drawCalls;
    uniforms.translationMatrix = this.transform.worldTransform, Color.shared.setValue(this._tintColor).premultiply(worldAlpha).toArray(uniforms.tint), renderer.shader.bind(shader), renderer.geometry.bind(geometry, shader), renderer.state.set(this.state);
    for (let i2 = 0, l2 = drawCalls.length;i2 < l2; i2++)
      this._renderDrawCallDirect(renderer, geometry.drawCalls[i2]);
  }
  _renderDrawCallDirect(renderer, drawCall) {
    const { texArray, type, size, start } = drawCall, groupTextureCount = texArray.count;
    for (let j2 = 0;j2 < groupTextureCount; j2++)
      renderer.texture.bind(texArray.elements[j2], j2);
    renderer.geometry.draw(type, size, start);
  }
  _resolveDirectShader(renderer) {
    let shader = this.shader;
    const pluginName = this.pluginName;
    if (!shader) {
      if (!DEFAULT_SHADERS[pluginName]) {
        const { maxTextures } = renderer.plugins[pluginName], sampleValues = new Int32Array(maxTextures);
        for (let i2 = 0;i2 < maxTextures; i2++)
          sampleValues[i2] = i2;
        const uniforms = {
          tint: new Float32Array([1, 1, 1, 1]),
          translationMatrix: new Matrix,
          default: UniformGroup.from({ uSamplers: sampleValues }, true)
        }, program = renderer.plugins[pluginName]._shader.program;
        DEFAULT_SHADERS[pluginName] = new Shader(program, uniforms);
      }
      shader = DEFAULT_SHADERS[pluginName];
    }
    return shader;
  }
  _calculateBounds() {
    this.finishPoly();
    const geometry = this._geometry;
    if (!geometry.graphicsData.length)
      return;
    const { minX, minY, maxX, maxY } = geometry.bounds;
    this._bounds.addFrame(this.transform, minX, minY, maxX, maxY);
  }
  containsPoint(point) {
    return this.worldTransform.applyInverse(point, _Graphics2._TEMP_POINT), this._geometry.containsPoint(_Graphics2._TEMP_POINT);
  }
  calculateTints() {
    if (this.batchTint !== this.tint) {
      this.batchTint = this._tintColor.toNumber();
      for (let i2 = 0;i2 < this.batches.length; i2++) {
        const batch = this.batches[i2];
        batch._tintRGB = Color.shared.setValue(this._tintColor).multiply(batch._batchRGB).toLittleEndianNumber();
      }
    }
  }
  calculateVertices() {
    const wtID = this.transform._worldID;
    if (this._transformID === wtID)
      return;
    this._transformID = wtID;
    const wt = this.transform.worldTransform, a2 = wt.a, b2 = wt.b, c2 = wt.c, d2 = wt.d, tx = wt.tx, ty = wt.ty, data = this._geometry.points, vertexData = this.vertexData;
    let count = 0;
    for (let i2 = 0;i2 < data.length; i2 += 2) {
      const x2 = data[i2], y2 = data[i2 + 1];
      vertexData[count++] = a2 * x2 + c2 * y2 + tx, vertexData[count++] = d2 * y2 + b2 * x2 + ty;
    }
  }
  closePath() {
    const currentPath = this.currentPath;
    return currentPath && (currentPath.closeStroke = true, this.finishPoly()), this;
  }
  setMatrix(matrix) {
    return this._matrix = matrix, this;
  }
  beginHole() {
    return this.finishPoly(), this._holeMode = true, this;
  }
  endHole() {
    return this.finishPoly(), this._holeMode = false, this;
  }
  destroy(options) {
    this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose(), this._matrix = null, this.currentPath = null, this._lineStyle.destroy(), this._lineStyle = null, this._fillStyle.destroy(), this._fillStyle = null, this._geometry = null, this.shader = null, this.vertexData = null, this.batches.length = 0, this.batches = null, super.destroy(options);
  }
};
_Graphics.curves = curves, _Graphics._TEMP_POINT = new Point;
var Graphics = _Graphics;
// node_modules/@pixi/mesh/lib/MeshBatchUvs.mjs
class MeshBatchUvs {
  constructor(uvBuffer, uvMatrix) {
    this.uvBuffer = uvBuffer, this.uvMatrix = uvMatrix, this.data = null, this._bufferUpdateId = -1, this._textureUpdateId = -1, this._updateID = 0;
  }
  update(forceUpdate) {
    if (!forceUpdate && this._bufferUpdateId === this.uvBuffer._updateID && this._textureUpdateId === this.uvMatrix._updateID)
      return;
    this._bufferUpdateId = this.uvBuffer._updateID, this._textureUpdateId = this.uvMatrix._updateID;
    const data = this.uvBuffer.data;
    (!this.data || this.data.length !== data.length) && (this.data = new Float32Array(data.length)), this.uvMatrix.multiplyUvs(data, this.data), this._updateID++;
  }
}

// node_modules/@pixi/mesh/lib/Mesh.mjs
var tempPoint2 = new Point;
var tempPolygon = new Polygon;
var _Mesh = class _Mesh2 extends Container {
  constructor(geometry, shader, state, drawMode = DRAW_MODES.TRIANGLES) {
    super(), this.geometry = geometry, this.shader = shader, this.state = state || State.for2d(), this.drawMode = drawMode, this.start = 0, this.size = 0, this.uvs = null, this.indices = null, this.vertexData = new Float32Array(1), this.vertexDirty = -1, this._transformID = -1, this._roundPixels = settings.ROUND_PIXELS, this.batchUvs = null;
  }
  get geometry() {
    return this._geometry;
  }
  set geometry(value) {
    this._geometry !== value && (this._geometry && (this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose()), this._geometry = value, this._geometry && this._geometry.refCount++, this.vertexDirty = -1);
  }
  get uvBuffer() {
    return this.geometry.buffers[1];
  }
  get verticesBuffer() {
    return this.geometry.buffers[0];
  }
  set material(value) {
    this.shader = value;
  }
  get material() {
    return this.shader;
  }
  set blendMode(value) {
    this.state.blendMode = value;
  }
  get blendMode() {
    return this.state.blendMode;
  }
  set roundPixels(value) {
    this._roundPixels !== value && (this._transformID = -1), this._roundPixels = value;
  }
  get roundPixels() {
    return this._roundPixels;
  }
  get tint() {
    return "tint" in this.shader ? this.shader.tint : null;
  }
  set tint(value) {
    this.shader.tint = value;
  }
  get tintValue() {
    return this.shader.tintValue;
  }
  get texture() {
    return "texture" in this.shader ? this.shader.texture : null;
  }
  set texture(value) {
    this.shader.texture = value;
  }
  _render(renderer) {
    const vertices = this.geometry.buffers[0].data;
    this.shader.batchable && this.drawMode === DRAW_MODES.TRIANGLES && vertices.length < _Mesh2.BATCHABLE_SIZE * 2 ? this._renderToBatch(renderer) : this._renderDefault(renderer);
  }
  _renderDefault(renderer) {
    const shader = this.shader;
    shader.alpha = this.worldAlpha, shader.update && shader.update(), renderer.batch.flush(), shader.uniforms.translationMatrix = this.transform.worldTransform.toArray(true), renderer.shader.bind(shader), renderer.state.set(this.state), renderer.geometry.bind(this.geometry, shader), renderer.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount);
  }
  _renderToBatch(renderer) {
    const geometry = this.geometry, shader = this.shader;
    shader.uvMatrix && (shader.uvMatrix.update(), this.calculateUvs()), this.calculateVertices(), this.indices = geometry.indexBuffer.data, this._tintRGB = shader._tintRGB, this._texture = shader.texture;
    const pluginName = this.material.pluginName;
    renderer.batch.setObjectRenderer(renderer.plugins[pluginName]), renderer.plugins[pluginName].render(this);
  }
  calculateVertices() {
    const verticesBuffer = this.geometry.buffers[0], vertices = verticesBuffer.data, vertexDirtyId = verticesBuffer._updateID;
    if (vertexDirtyId === this.vertexDirty && this._transformID === this.transform._worldID)
      return;
    this._transformID = this.transform._worldID, this.vertexData.length !== vertices.length && (this.vertexData = new Float32Array(vertices.length));
    const wt = this.transform.worldTransform, a2 = wt.a, b2 = wt.b, c2 = wt.c, d2 = wt.d, tx = wt.tx, ty = wt.ty, vertexData = this.vertexData;
    for (let i2 = 0;i2 < vertexData.length / 2; i2++) {
      const x2 = vertices[i2 * 2], y2 = vertices[i2 * 2 + 1];
      vertexData[i2 * 2] = a2 * x2 + c2 * y2 + tx, vertexData[i2 * 2 + 1] = b2 * x2 + d2 * y2 + ty;
    }
    if (this._roundPixels) {
      const resolution = settings.RESOLUTION;
      for (let i2 = 0;i2 < vertexData.length; ++i2)
        vertexData[i2] = Math.round(vertexData[i2] * resolution) / resolution;
    }
    this.vertexDirty = vertexDirtyId;
  }
  calculateUvs() {
    const geomUvs = this.geometry.buffers[1], shader = this.shader;
    shader.uvMatrix.isSimple ? this.uvs = geomUvs.data : (this.batchUvs || (this.batchUvs = new MeshBatchUvs(geomUvs, shader.uvMatrix)), this.batchUvs.update(), this.uvs = this.batchUvs.data);
  }
  _calculateBounds() {
    this.calculateVertices(), this._bounds.addVertexData(this.vertexData, 0, this.vertexData.length);
  }
  containsPoint(point) {
    if (!this.getBounds().contains(point.x, point.y))
      return false;
    this.worldTransform.applyInverse(point, tempPoint2);
    const vertices = this.geometry.getBuffer("aVertexPosition").data, points = tempPolygon.points, indices2 = this.geometry.getIndex().data, len = indices2.length, step = this.drawMode === 4 ? 3 : 1;
    for (let i2 = 0;i2 + 2 < len; i2 += step) {
      const ind0 = indices2[i2] * 2, ind1 = indices2[i2 + 1] * 2, ind2 = indices2[i2 + 2] * 2;
      if (points[0] = vertices[ind0], points[1] = vertices[ind0 + 1], points[2] = vertices[ind1], points[3] = vertices[ind1 + 1], points[4] = vertices[ind2], points[5] = vertices[ind2 + 1], tempPolygon.contains(tempPoint2.x, tempPoint2.y))
        return true;
    }
    return false;
  }
  destroy(options) {
    super.destroy(options), this._cachedTexture && (this._cachedTexture.destroy(), this._cachedTexture = null), this.geometry = null, this.shader = null, this.state = null, this.uvs = null, this.indices = null, this.vertexData = null;
  }
};
_Mesh.BATCHABLE_SIZE = 100;
var Mesh = _Mesh;

// node_modules/@pixi/mesh/lib/MeshGeometry.mjs
class MeshGeometry extends Geometry {
  constructor(vertices, uvs, index) {
    super();
    const verticesBuffer = new Buffer(vertices), uvsBuffer = new Buffer(uvs, true), indexBuffer = new Buffer(index, true, true);
    this.addAttribute("aVertexPosition", verticesBuffer, 2, false, TYPES.FLOAT).addAttribute("aTextureCoord", uvsBuffer, 2, false, TYPES.FLOAT).addIndex(indexBuffer), this._updateId = -1;
  }
  get vertexDirtyId() {
    return this.buffers[0]._updateID;
  }
}

// node_modules/@pixi/mesh/lib/shader/mesh.frag.mjs
var fragment7 = `varying vec2 vTextureCoord;
uniform vec4 uColor;

uniform sampler2D uSampler;

void main(void)
{
    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;
}
`;

// node_modules/@pixi/mesh/lib/shader/mesh.vert.mjs
var vertex4 = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTextureMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;
}
`;

// node_modules/@pixi/mesh/lib/MeshMaterial.mjs
class MeshMaterial extends Shader {
  constructor(uSampler, options) {
    const uniforms = {
      uSampler,
      alpha: 1,
      uTextureMatrix: Matrix.IDENTITY,
      uColor: new Float32Array([1, 1, 1, 1])
    };
    options = Object.assign({
      tint: 16777215,
      alpha: 1,
      pluginName: "batch"
    }, options), options.uniforms && Object.assign(uniforms, options.uniforms), super(options.program || Program.from(vertex4, fragment7), uniforms), this._colorDirty = false, this.uvMatrix = new TextureMatrix(uSampler), this.batchable = options.program === undefined, this.pluginName = options.pluginName, this._tintColor = new Color(options.tint), this._tintRGB = this._tintColor.toLittleEndianNumber(), this._colorDirty = true, this.alpha = options.alpha;
  }
  get texture() {
    return this.uniforms.uSampler;
  }
  set texture(value) {
    this.uniforms.uSampler !== value && (!this.uniforms.uSampler.baseTexture.alphaMode != !value.baseTexture.alphaMode && (this._colorDirty = true), this.uniforms.uSampler = value, this.uvMatrix.texture = value);
  }
  set alpha(value) {
    value !== this._alpha && (this._alpha = value, this._colorDirty = true);
  }
  get alpha() {
    return this._alpha;
  }
  set tint(value) {
    value !== this.tint && (this._tintColor.setValue(value), this._tintRGB = this._tintColor.toLittleEndianNumber(), this._colorDirty = true);
  }
  get tint() {
    return this._tintColor.value;
  }
  get tintValue() {
    return this._tintColor.toNumber();
  }
  update() {
    if (this._colorDirty) {
      this._colorDirty = false;
      const applyToChannels = this.texture.baseTexture.alphaMode;
      Color.shared.setValue(this._tintColor).premultiply(this._alpha, applyToChannels).toArray(this.uniforms.uColor);
    }
    this.uvMatrix.update() && (this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord);
  }
}
// node_modules/@pixi/particle-container/lib/ParticleBuffer.mjs
class ParticleBuffer {
  constructor(properties, dynamicPropertyFlags, size) {
    this.geometry = new Geometry, this.indexBuffer = null, this.size = size, this.dynamicProperties = [], this.staticProperties = [];
    for (let i2 = 0;i2 < properties.length; ++i2) {
      let property = properties[i2];
      property = {
        attributeName: property.attributeName,
        size: property.size,
        uploadFunction: property.uploadFunction,
        type: property.type || TYPES.FLOAT,
        offset: property.offset
      }, dynamicPropertyFlags[i2] ? this.dynamicProperties.push(property) : this.staticProperties.push(property);
    }
    this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this._updateID = 0, this.initBuffers();
  }
  initBuffers() {
    const geometry = this.geometry;
    let dynamicOffset = 0;
    this.indexBuffer = new Buffer(exports_lib.createIndicesForQuads(this.size), true, true), geometry.addIndex(this.indexBuffer), this.dynamicStride = 0;
    for (let i2 = 0;i2 < this.dynamicProperties.length; ++i2) {
      const property = this.dynamicProperties[i2];
      property.offset = dynamicOffset, dynamicOffset += property.size, this.dynamicStride += property.size;
    }
    const dynBuffer = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
    this.dynamicData = new Float32Array(dynBuffer), this.dynamicDataUint32 = new Uint32Array(dynBuffer), this.dynamicBuffer = new Buffer(this.dynamicData, false, false);
    let staticOffset = 0;
    this.staticStride = 0;
    for (let i2 = 0;i2 < this.staticProperties.length; ++i2) {
      const property = this.staticProperties[i2];
      property.offset = staticOffset, staticOffset += property.size, this.staticStride += property.size;
    }
    const statBuffer = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
    this.staticData = new Float32Array(statBuffer), this.staticDataUint32 = new Uint32Array(statBuffer), this.staticBuffer = new Buffer(this.staticData, true, false);
    for (let i2 = 0;i2 < this.dynamicProperties.length; ++i2) {
      const property = this.dynamicProperties[i2];
      geometry.addAttribute(property.attributeName, this.dynamicBuffer, 0, property.type === TYPES.UNSIGNED_BYTE, property.type, this.dynamicStride * 4, property.offset * 4);
    }
    for (let i2 = 0;i2 < this.staticProperties.length; ++i2) {
      const property = this.staticProperties[i2];
      geometry.addAttribute(property.attributeName, this.staticBuffer, 0, property.type === TYPES.UNSIGNED_BYTE, property.type, this.staticStride * 4, property.offset * 4);
    }
  }
  uploadDynamic(children, startIndex, amount) {
    for (let i2 = 0;i2 < this.dynamicProperties.length; i2++) {
      const property = this.dynamicProperties[i2];
      property.uploadFunction(children, startIndex, amount, property.type === TYPES.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, property.offset);
    }
    this.dynamicBuffer._updateID++;
  }
  uploadStatic(children, startIndex, amount) {
    for (let i2 = 0;i2 < this.staticProperties.length; i2++) {
      const property = this.staticProperties[i2];
      property.uploadFunction(children, startIndex, amount, property.type === TYPES.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData, this.staticStride, property.offset);
    }
    this.staticBuffer._updateID++;
  }
  destroy() {
    this.indexBuffer = null, this.dynamicProperties = null, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this.staticProperties = null, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.geometry.destroy();
  }
}

// node_modules/@pixi/particle-container/lib/particles.frag.mjs
var fragment8 = `varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;

void main(void){
    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;
    gl_FragColor = color;
}`;

// node_modules/@pixi/particle-container/lib/particles.vert.mjs
var vertex5 = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;

attribute vec2 aPositionCoord;
attribute float aRotation;

uniform mat3 translationMatrix;
uniform vec4 uColor;

varying vec2 vTextureCoord;
varying vec4 vColor;

void main(void){
    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);
    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);

    vec2 v = vec2(x, y);
    v = v + aPositionCoord;

    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vColor = aColor * uColor;
}
`;

// node_modules/@pixi/particle-container/lib/ParticleRenderer.mjs
class ParticleRenderer extends ObjectRenderer {
  constructor(renderer) {
    super(renderer), this.shader = null, this.properties = null, this.tempMatrix = new Matrix, this.properties = [
      {
        attributeName: "aVertexPosition",
        size: 2,
        uploadFunction: this.uploadVertices,
        offset: 0
      },
      {
        attributeName: "aPositionCoord",
        size: 2,
        uploadFunction: this.uploadPosition,
        offset: 0
      },
      {
        attributeName: "aRotation",
        size: 1,
        uploadFunction: this.uploadRotation,
        offset: 0
      },
      {
        attributeName: "aTextureCoord",
        size: 2,
        uploadFunction: this.uploadUvs,
        offset: 0
      },
      {
        attributeName: "aColor",
        size: 1,
        type: TYPES.UNSIGNED_BYTE,
        uploadFunction: this.uploadTint,
        offset: 0
      }
    ], this.shader = Shader.from(vertex5, fragment8, {}), this.state = State.for2d();
  }
  render(container) {
    const { children, _maxSize: maxSize, _batchSize: batchSize } = container, renderer = this.renderer;
    let totalChildren = children.length;
    if (totalChildren === 0)
      return;
    totalChildren > maxSize && !container.autoResize && (totalChildren = maxSize);
    let buffers = container._buffers;
    buffers || (buffers = container._buffers = this.generateBuffers(container));
    const baseTexture = children[0]._texture.baseTexture, premultiplied = baseTexture.alphaMode > 0;
    this.state.blendMode = exports_lib.correctBlendMode(container.blendMode, premultiplied), renderer.state.set(this.state);
    const gl = renderer.gl, m3 = container.worldTransform.copyTo(this.tempMatrix);
    m3.prepend(renderer.globalUniforms.uniforms.projectionMatrix), this.shader.uniforms.translationMatrix = m3.toArray(true), this.shader.uniforms.uColor = Color.shared.setValue(container.tintRgb).premultiply(container.worldAlpha, premultiplied).toArray(this.shader.uniforms.uColor), this.shader.uniforms.uSampler = baseTexture, this.renderer.shader.bind(this.shader);
    let updateStatic = false;
    for (let i2 = 0, j2 = 0;i2 < totalChildren; i2 += batchSize, j2 += 1) {
      let amount = totalChildren - i2;
      amount > batchSize && (amount = batchSize), j2 >= buffers.length && buffers.push(this._generateOneMoreBuffer(container));
      const buffer = buffers[j2];
      buffer.uploadDynamic(children, i2, amount);
      const bid = container._bufferUpdateIDs[j2] || 0;
      updateStatic = updateStatic || buffer._updateID < bid, updateStatic && (buffer._updateID = container._updateID, buffer.uploadStatic(children, i2, amount)), renderer.geometry.bind(buffer.geometry), gl.drawElements(gl.TRIANGLES, amount * 6, gl.UNSIGNED_SHORT, 0);
    }
  }
  generateBuffers(container) {
    const buffers = [], size = container._maxSize, batchSize = container._batchSize, dynamicPropertyFlags = container._properties;
    for (let i2 = 0;i2 < size; i2 += batchSize)
      buffers.push(new ParticleBuffer(this.properties, dynamicPropertyFlags, batchSize));
    return buffers;
  }
  _generateOneMoreBuffer(container) {
    const { _batchSize: batchSize, _properties: dynamicPropertyFlags } = container;
    return new ParticleBuffer(this.properties, dynamicPropertyFlags, batchSize);
  }
  uploadVertices(children, startIndex, amount, array, stride, offset) {
    let w0 = 0, w1 = 0, h0 = 0, h1 = 0;
    for (let i2 = 0;i2 < amount; ++i2) {
      const sprite2 = children[startIndex + i2], texture = sprite2._texture, sx = sprite2.scale.x, sy = sprite2.scale.y, trim = texture.trim, orig = texture.orig;
      trim ? (w1 = trim.x - sprite2.anchor.x * orig.width, w0 = w1 + trim.width, h1 = trim.y - sprite2.anchor.y * orig.height, h0 = h1 + trim.height) : (w0 = orig.width * (1 - sprite2.anchor.x), w1 = orig.width * -sprite2.anchor.x, h0 = orig.height * (1 - sprite2.anchor.y), h1 = orig.height * -sprite2.anchor.y), array[offset] = w1 * sx, array[offset + 1] = h1 * sy, array[offset + stride] = w0 * sx, array[offset + stride + 1] = h1 * sy, array[offset + stride * 2] = w0 * sx, array[offset + stride * 2 + 1] = h0 * sy, array[offset + stride * 3] = w1 * sx, array[offset + stride * 3 + 1] = h0 * sy, offset += stride * 4;
    }
  }
  uploadPosition(children, startIndex, amount, array, stride, offset) {
    for (let i2 = 0;i2 < amount; i2++) {
      const spritePosition = children[startIndex + i2].position;
      array[offset] = spritePosition.x, array[offset + 1] = spritePosition.y, array[offset + stride] = spritePosition.x, array[offset + stride + 1] = spritePosition.y, array[offset + stride * 2] = spritePosition.x, array[offset + stride * 2 + 1] = spritePosition.y, array[offset + stride * 3] = spritePosition.x, array[offset + stride * 3 + 1] = spritePosition.y, offset += stride * 4;
    }
  }
  uploadRotation(children, startIndex, amount, array, stride, offset) {
    for (let i2 = 0;i2 < amount; i2++) {
      const spriteRotation = children[startIndex + i2].rotation;
      array[offset] = spriteRotation, array[offset + stride] = spriteRotation, array[offset + stride * 2] = spriteRotation, array[offset + stride * 3] = spriteRotation, offset += stride * 4;
    }
  }
  uploadUvs(children, startIndex, amount, array, stride, offset) {
    for (let i2 = 0;i2 < amount; ++i2) {
      const textureUvs = children[startIndex + i2]._texture._uvs;
      textureUvs ? (array[offset] = textureUvs.x0, array[offset + 1] = textureUvs.y0, array[offset + stride] = textureUvs.x1, array[offset + stride + 1] = textureUvs.y1, array[offset + stride * 2] = textureUvs.x2, array[offset + stride * 2 + 1] = textureUvs.y2, array[offset + stride * 3] = textureUvs.x3, array[offset + stride * 3 + 1] = textureUvs.y3, offset += stride * 4) : (array[offset] = 0, array[offset + 1] = 0, array[offset + stride] = 0, array[offset + stride + 1] = 0, array[offset + stride * 2] = 0, array[offset + stride * 2 + 1] = 0, array[offset + stride * 3] = 0, array[offset + stride * 3 + 1] = 0, offset += stride * 4);
    }
  }
  uploadTint(children, startIndex, amount, array, stride, offset) {
    for (let i2 = 0;i2 < amount; ++i2) {
      const sprite2 = children[startIndex + i2], result = Color.shared.setValue(sprite2._tintRGB).toPremultiplied(sprite2.alpha, sprite2.texture.baseTexture.alphaMode > 0);
      array[offset] = result, array[offset + stride] = result, array[offset + stride * 2] = result, array[offset + stride * 3] = result, offset += stride * 4;
    }
  }
  destroy() {
    super.destroy(), this.shader && (this.shader.destroy(), this.shader = null), this.tempMatrix = null;
  }
}
ParticleRenderer.extension = {
  name: "particle",
  type: ExtensionType.RendererPlugin
};
extensions.add(ParticleRenderer);
// node_modules/@pixi/text/lib/const.mjs
var TEXT_GRADIENT = ((TEXT_GRADIENT2) => (TEXT_GRADIENT2[TEXT_GRADIENT2.LINEAR_VERTICAL = 0] = "LINEAR_VERTICAL", TEXT_GRADIENT2[TEXT_GRADIENT2.LINEAR_HORIZONTAL = 1] = "LINEAR_HORIZONTAL", TEXT_GRADIENT2))(TEXT_GRADIENT || {});

// node_modules/@pixi/text/lib/TextMetrics.mjs
var contextSettings = {
  willReadFrequently: true
};
var _TextMetrics = class _TextMetrics2 {
  static get experimentalLetterSpacingSupported() {
    let result = _TextMetrics2._experimentalLetterSpacingSupported;
    if (result !== undefined) {
      const proto = settings.ADAPTER.getCanvasRenderingContext2D().prototype;
      result = _TextMetrics2._experimentalLetterSpacingSupported = ("letterSpacing" in proto) || ("textLetterSpacing" in proto);
    }
    return result;
  }
  constructor(text, style, width, height, lines, lineWidths, lineHeight, maxLineWidth, fontProperties) {
    this.text = text, this.style = style, this.width = width, this.height = height, this.lines = lines, this.lineWidths = lineWidths, this.lineHeight = lineHeight, this.maxLineWidth = maxLineWidth, this.fontProperties = fontProperties;
  }
  static measureText(text, style, wordWrap, canvas = _TextMetrics2._canvas) {
    wordWrap = wordWrap ?? style.wordWrap;
    const font = style.toFontString(), fontProperties = _TextMetrics2.measureFont(font);
    fontProperties.fontSize === 0 && (fontProperties.fontSize = style.fontSize, fontProperties.ascent = style.fontSize);
    const context2 = canvas.getContext("2d", contextSettings);
    context2.font = font;
    const lines = (wordWrap ? _TextMetrics2.wordWrap(text, style, canvas) : text).split(/(?:\r\n|\r|\n)/), lineWidths = new Array(lines.length);
    let maxLineWidth = 0;
    for (let i2 = 0;i2 < lines.length; i2++) {
      const lineWidth = _TextMetrics2._measureText(lines[i2], style.letterSpacing, context2);
      lineWidths[i2] = lineWidth, maxLineWidth = Math.max(maxLineWidth, lineWidth);
    }
    let width = maxLineWidth + style.strokeThickness;
    style.dropShadow && (width += style.dropShadowDistance);
    const lineHeight = style.lineHeight || fontProperties.fontSize + style.strokeThickness;
    let height = Math.max(lineHeight, fontProperties.fontSize + style.strokeThickness * 2) + style.leading + (lines.length - 1) * (lineHeight + style.leading);
    return style.dropShadow && (height += style.dropShadowDistance), new _TextMetrics2(text, style, width, height, lines, lineWidths, lineHeight + style.leading, maxLineWidth, fontProperties);
  }
  static _measureText(text, letterSpacing, context2) {
    let useExperimentalLetterSpacing = false;
    _TextMetrics2.experimentalLetterSpacingSupported && (_TextMetrics2.experimentalLetterSpacing ? (context2.letterSpacing = `${letterSpacing}px`, context2.textLetterSpacing = `${letterSpacing}px`, useExperimentalLetterSpacing = true) : (context2.letterSpacing = "0px", context2.textLetterSpacing = "0px"));
    let width = context2.measureText(text).width;
    return width > 0 && (useExperimentalLetterSpacing ? width -= letterSpacing : width += (_TextMetrics2.graphemeSegmenter(text).length - 1) * letterSpacing), width;
  }
  static wordWrap(text, style, canvas = _TextMetrics2._canvas) {
    const context2 = canvas.getContext("2d", contextSettings);
    let width = 0, line = "", lines = "";
    const cache2 = Object.create(null), { letterSpacing, whiteSpace } = style, collapseSpaces = _TextMetrics2.collapseSpaces(whiteSpace), collapseNewlines = _TextMetrics2.collapseNewlines(whiteSpace);
    let canPrependSpaces = !collapseSpaces;
    const wordWrapWidth = style.wordWrapWidth + letterSpacing, tokens = _TextMetrics2.tokenize(text);
    for (let i2 = 0;i2 < tokens.length; i2++) {
      let token = tokens[i2];
      if (_TextMetrics2.isNewline(token)) {
        if (!collapseNewlines) {
          lines += _TextMetrics2.addLine(line), canPrependSpaces = !collapseSpaces, line = "", width = 0;
          continue;
        }
        token = " ";
      }
      if (collapseSpaces) {
        const currIsBreakingSpace = _TextMetrics2.isBreakingSpace(token), lastIsBreakingSpace = _TextMetrics2.isBreakingSpace(line[line.length - 1]);
        if (currIsBreakingSpace && lastIsBreakingSpace)
          continue;
      }
      const tokenWidth = _TextMetrics2.getFromCache(token, letterSpacing, cache2, context2);
      if (tokenWidth > wordWrapWidth)
        if (line !== "" && (lines += _TextMetrics2.addLine(line), line = "", width = 0), _TextMetrics2.canBreakWords(token, style.breakWords)) {
          const characters = _TextMetrics2.wordWrapSplit(token);
          for (let j2 = 0;j2 < characters.length; j2++) {
            let char = characters[j2], lastChar = char, k3 = 1;
            for (;characters[j2 + k3]; ) {
              const nextChar = characters[j2 + k3];
              if (!_TextMetrics2.canBreakChars(lastChar, nextChar, token, j2, style.breakWords))
                char += nextChar;
              else
                break;
              lastChar = nextChar, k3++;
            }
            j2 += k3 - 1;
            const characterWidth = _TextMetrics2.getFromCache(char, letterSpacing, cache2, context2);
            characterWidth + width > wordWrapWidth && (lines += _TextMetrics2.addLine(line), canPrependSpaces = false, line = "", width = 0), line += char, width += characterWidth;
          }
        } else {
          line.length > 0 && (lines += _TextMetrics2.addLine(line), line = "", width = 0);
          const isLastToken = i2 === tokens.length - 1;
          lines += _TextMetrics2.addLine(token, !isLastToken), canPrependSpaces = false, line = "", width = 0;
        }
      else
        tokenWidth + width > wordWrapWidth && (canPrependSpaces = false, lines += _TextMetrics2.addLine(line), line = "", width = 0), (line.length > 0 || !_TextMetrics2.isBreakingSpace(token) || canPrependSpaces) && (line += token, width += tokenWidth);
    }
    return lines += _TextMetrics2.addLine(line, false), lines;
  }
  static addLine(line, newLine = true) {
    return line = _TextMetrics2.trimRight(line), line = newLine ? `${line}
` : line, line;
  }
  static getFromCache(key, letterSpacing, cache2, context2) {
    let width = cache2[key];
    return typeof width != "number" && (width = _TextMetrics2._measureText(key, letterSpacing, context2) + letterSpacing, cache2[key] = width), width;
  }
  static collapseSpaces(whiteSpace) {
    return whiteSpace === "normal" || whiteSpace === "pre-line";
  }
  static collapseNewlines(whiteSpace) {
    return whiteSpace === "normal";
  }
  static trimRight(text) {
    if (typeof text != "string")
      return "";
    for (let i2 = text.length - 1;i2 >= 0; i2--) {
      const char = text[i2];
      if (!_TextMetrics2.isBreakingSpace(char))
        break;
      text = text.slice(0, -1);
    }
    return text;
  }
  static isNewline(char) {
    return typeof char != "string" ? false : _TextMetrics2._newlines.includes(char.charCodeAt(0));
  }
  static isBreakingSpace(char, _nextChar) {
    return typeof char != "string" ? false : _TextMetrics2._breakingSpaces.includes(char.charCodeAt(0));
  }
  static tokenize(text) {
    const tokens = [];
    let token = "";
    if (typeof text != "string")
      return tokens;
    for (let i2 = 0;i2 < text.length; i2++) {
      const char = text[i2], nextChar = text[i2 + 1];
      if (_TextMetrics2.isBreakingSpace(char, nextChar) || _TextMetrics2.isNewline(char)) {
        token !== "" && (tokens.push(token), token = ""), tokens.push(char);
        continue;
      }
      token += char;
    }
    return token !== "" && tokens.push(token), tokens;
  }
  static canBreakWords(_token, breakWords) {
    return breakWords;
  }
  static canBreakChars(_char, _nextChar, _token, _index, _breakWords) {
    return true;
  }
  static wordWrapSplit(token) {
    return _TextMetrics2.graphemeSegmenter(token);
  }
  static measureFont(font) {
    if (_TextMetrics2._fonts[font])
      return _TextMetrics2._fonts[font];
    const properties = {
      ascent: 0,
      descent: 0,
      fontSize: 0
    }, canvas = _TextMetrics2._canvas, context2 = _TextMetrics2._context;
    context2.font = font;
    const metricsString = _TextMetrics2.METRICS_STRING + _TextMetrics2.BASELINE_SYMBOL, width = Math.ceil(context2.measureText(metricsString).width);
    let baseline = Math.ceil(context2.measureText(_TextMetrics2.BASELINE_SYMBOL).width);
    const height = Math.ceil(_TextMetrics2.HEIGHT_MULTIPLIER * baseline);
    if (baseline = baseline * _TextMetrics2.BASELINE_MULTIPLIER | 0, width === 0 || height === 0)
      return _TextMetrics2._fonts[font] = properties, properties;
    canvas.width = width, canvas.height = height, context2.fillStyle = "#f00", context2.fillRect(0, 0, width, height), context2.font = font, context2.textBaseline = "alphabetic", context2.fillStyle = "#000", context2.fillText(metricsString, 0, baseline);
    const imagedata = context2.getImageData(0, 0, width, height).data, pixels = imagedata.length, line = width * 4;
    let i2 = 0, idx = 0, stop = false;
    for (i2 = 0;i2 < baseline; ++i2) {
      for (let j2 = 0;j2 < line; j2 += 4)
        if (imagedata[idx + j2] !== 255) {
          stop = true;
          break;
        }
      if (!stop)
        idx += line;
      else
        break;
    }
    for (properties.ascent = baseline - i2, idx = pixels - line, stop = false, i2 = height;i2 > baseline; --i2) {
      for (let j2 = 0;j2 < line; j2 += 4)
        if (imagedata[idx + j2] !== 255) {
          stop = true;
          break;
        }
      if (!stop)
        idx -= line;
      else
        break;
    }
    return properties.descent = i2 - baseline, properties.fontSize = properties.ascent + properties.descent, _TextMetrics2._fonts[font] = properties, properties;
  }
  static clearMetrics(font = "") {
    font ? delete _TextMetrics2._fonts[font] : _TextMetrics2._fonts = {};
  }
  static get _canvas() {
    if (!_TextMetrics2.__canvas) {
      let canvas;
      try {
        const c2 = new OffscreenCanvas(0, 0);
        if (c2.getContext("2d", contextSettings)?.measureText)
          return _TextMetrics2.__canvas = c2, c2;
        canvas = settings.ADAPTER.createCanvas();
      } catch {
        canvas = settings.ADAPTER.createCanvas();
      }
      canvas.width = canvas.height = 10, _TextMetrics2.__canvas = canvas;
    }
    return _TextMetrics2.__canvas;
  }
  static get _context() {
    return _TextMetrics2.__context || (_TextMetrics2.__context = _TextMetrics2._canvas.getContext("2d", contextSettings)), _TextMetrics2.__context;
  }
};
_TextMetrics.METRICS_STRING = "|\xC9q\xC5", _TextMetrics.BASELINE_SYMBOL = "M", _TextMetrics.BASELINE_MULTIPLIER = 1.4, _TextMetrics.HEIGHT_MULTIPLIER = 2, _TextMetrics.graphemeSegmenter = (() => {
  if (typeof Intl?.Segmenter == "function") {
    const segmenter = new Intl.Segmenter;
    return (s2) => [...segmenter.segment(s2)].map((x2) => x2.segment);
  }
  return (s2) => [...s2];
})(), _TextMetrics.experimentalLetterSpacing = false, _TextMetrics._fonts = {}, _TextMetrics._newlines = [
  10,
  13
], _TextMetrics._breakingSpaces = [
  9,
  32,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8200,
  8201,
  8202,
  8287,
  12288
];
var TextMetrics = _TextMetrics;

// node_modules/@pixi/text/lib/TextStyle.mjs
var getColor = function(color8) {
  const temp = Color.shared, format = (color22) => {
    const res = temp.setValue(color22);
    return res.alpha === 1 ? res.toHex() : res.toRgbaString();
  };
  return Array.isArray(color8) ? color8.map(format) : format(color8);
};
var areArraysEqual = function(array1, array2) {
  if (!Array.isArray(array1) || !Array.isArray(array2) || array1.length !== array2.length)
    return false;
  for (let i2 = 0;i2 < array1.length; ++i2)
    if (array1[i2] !== array2[i2])
      return false;
  return true;
};
var deepCopyProperties = function(target, source, propertyObj) {
  for (const prop in propertyObj)
    Array.isArray(source[prop]) ? target[prop] = source[prop].slice() : target[prop] = source[prop];
};
var genericFontFamilies = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
];
var _TextStyle = class _TextStyle2 {
  constructor(style) {
    this.styleID = 0, this.reset(), deepCopyProperties(this, style, style);
  }
  clone() {
    const clonedProperties = {};
    return deepCopyProperties(clonedProperties, this, _TextStyle2.defaultStyle), new _TextStyle2(clonedProperties);
  }
  reset() {
    deepCopyProperties(this, _TextStyle2.defaultStyle, _TextStyle2.defaultStyle);
  }
  get align() {
    return this._align;
  }
  set align(align) {
    this._align !== align && (this._align = align, this.styleID++);
  }
  get breakWords() {
    return this._breakWords;
  }
  set breakWords(breakWords) {
    this._breakWords !== breakWords && (this._breakWords = breakWords, this.styleID++);
  }
  get dropShadow() {
    return this._dropShadow;
  }
  set dropShadow(dropShadow) {
    this._dropShadow !== dropShadow && (this._dropShadow = dropShadow, this.styleID++);
  }
  get dropShadowAlpha() {
    return this._dropShadowAlpha;
  }
  set dropShadowAlpha(dropShadowAlpha) {
    this._dropShadowAlpha !== dropShadowAlpha && (this._dropShadowAlpha = dropShadowAlpha, this.styleID++);
  }
  get dropShadowAngle() {
    return this._dropShadowAngle;
  }
  set dropShadowAngle(dropShadowAngle) {
    this._dropShadowAngle !== dropShadowAngle && (this._dropShadowAngle = dropShadowAngle, this.styleID++);
  }
  get dropShadowBlur() {
    return this._dropShadowBlur;
  }
  set dropShadowBlur(dropShadowBlur) {
    this._dropShadowBlur !== dropShadowBlur && (this._dropShadowBlur = dropShadowBlur, this.styleID++);
  }
  get dropShadowColor() {
    return this._dropShadowColor;
  }
  set dropShadowColor(dropShadowColor) {
    const outputColor = getColor(dropShadowColor);
    this._dropShadowColor !== outputColor && (this._dropShadowColor = outputColor, this.styleID++);
  }
  get dropShadowDistance() {
    return this._dropShadowDistance;
  }
  set dropShadowDistance(dropShadowDistance) {
    this._dropShadowDistance !== dropShadowDistance && (this._dropShadowDistance = dropShadowDistance, this.styleID++);
  }
  get fill() {
    return this._fill;
  }
  set fill(fill) {
    const outputColor = getColor(fill);
    this._fill !== outputColor && (this._fill = outputColor, this.styleID++);
  }
  get fillGradientType() {
    return this._fillGradientType;
  }
  set fillGradientType(fillGradientType) {
    this._fillGradientType !== fillGradientType && (this._fillGradientType = fillGradientType, this.styleID++);
  }
  get fillGradientStops() {
    return this._fillGradientStops;
  }
  set fillGradientStops(fillGradientStops) {
    areArraysEqual(this._fillGradientStops, fillGradientStops) || (this._fillGradientStops = fillGradientStops, this.styleID++);
  }
  get fontFamily() {
    return this._fontFamily;
  }
  set fontFamily(fontFamily) {
    this.fontFamily !== fontFamily && (this._fontFamily = fontFamily, this.styleID++);
  }
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(fontSize) {
    this._fontSize !== fontSize && (this._fontSize = fontSize, this.styleID++);
  }
  get fontStyle() {
    return this._fontStyle;
  }
  set fontStyle(fontStyle) {
    this._fontStyle !== fontStyle && (this._fontStyle = fontStyle, this.styleID++);
  }
  get fontVariant() {
    return this._fontVariant;
  }
  set fontVariant(fontVariant) {
    this._fontVariant !== fontVariant && (this._fontVariant = fontVariant, this.styleID++);
  }
  get fontWeight() {
    return this._fontWeight;
  }
  set fontWeight(fontWeight) {
    this._fontWeight !== fontWeight && (this._fontWeight = fontWeight, this.styleID++);
  }
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(letterSpacing) {
    this._letterSpacing !== letterSpacing && (this._letterSpacing = letterSpacing, this.styleID++);
  }
  get lineHeight() {
    return this._lineHeight;
  }
  set lineHeight(lineHeight) {
    this._lineHeight !== lineHeight && (this._lineHeight = lineHeight, this.styleID++);
  }
  get leading() {
    return this._leading;
  }
  set leading(leading) {
    this._leading !== leading && (this._leading = leading, this.styleID++);
  }
  get lineJoin() {
    return this._lineJoin;
  }
  set lineJoin(lineJoin) {
    this._lineJoin !== lineJoin && (this._lineJoin = lineJoin, this.styleID++);
  }
  get miterLimit() {
    return this._miterLimit;
  }
  set miterLimit(miterLimit) {
    this._miterLimit !== miterLimit && (this._miterLimit = miterLimit, this.styleID++);
  }
  get padding() {
    return this._padding;
  }
  set padding(padding) {
    this._padding !== padding && (this._padding = padding, this.styleID++);
  }
  get stroke() {
    return this._stroke;
  }
  set stroke(stroke) {
    const outputColor = getColor(stroke);
    this._stroke !== outputColor && (this._stroke = outputColor, this.styleID++);
  }
  get strokeThickness() {
    return this._strokeThickness;
  }
  set strokeThickness(strokeThickness) {
    this._strokeThickness !== strokeThickness && (this._strokeThickness = strokeThickness, this.styleID++);
  }
  get textBaseline() {
    return this._textBaseline;
  }
  set textBaseline(textBaseline) {
    this._textBaseline !== textBaseline && (this._textBaseline = textBaseline, this.styleID++);
  }
  get trim() {
    return this._trim;
  }
  set trim(trim) {
    this._trim !== trim && (this._trim = trim, this.styleID++);
  }
  get whiteSpace() {
    return this._whiteSpace;
  }
  set whiteSpace(whiteSpace) {
    this._whiteSpace !== whiteSpace && (this._whiteSpace = whiteSpace, this.styleID++);
  }
  get wordWrap() {
    return this._wordWrap;
  }
  set wordWrap(wordWrap) {
    this._wordWrap !== wordWrap && (this._wordWrap = wordWrap, this.styleID++);
  }
  get wordWrapWidth() {
    return this._wordWrapWidth;
  }
  set wordWrapWidth(wordWrapWidth) {
    this._wordWrapWidth !== wordWrapWidth && (this._wordWrapWidth = wordWrapWidth, this.styleID++);
  }
  toFontString() {
    const fontSizeString = typeof this.fontSize == "number" ? `${this.fontSize}px` : this.fontSize;
    let fontFamilies = this.fontFamily;
    Array.isArray(this.fontFamily) || (fontFamilies = this.fontFamily.split(","));
    for (let i2 = fontFamilies.length - 1;i2 >= 0; i2--) {
      let fontFamily = fontFamilies[i2].trim();
      !/([\"\'])[^\'\"]+\1/.test(fontFamily) && !genericFontFamilies.includes(fontFamily) && (fontFamily = `"${fontFamily}"`), fontFamilies[i2] = fontFamily;
    }
    return `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${fontSizeString} ${fontFamilies.join(",")}`;
  }
};
_TextStyle.defaultStyle = {
  align: "left",
  breakWords: false,
  dropShadow: false,
  dropShadowAlpha: 1,
  dropShadowAngle: Math.PI / 6,
  dropShadowBlur: 0,
  dropShadowColor: "black",
  dropShadowDistance: 5,
  fill: "black",
  fillGradientType: TEXT_GRADIENT.LINEAR_VERTICAL,
  fillGradientStops: [],
  fontFamily: "Arial",
  fontSize: 26,
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  leading: 0,
  letterSpacing: 0,
  lineHeight: 0,
  lineJoin: "miter",
  miterLimit: 10,
  padding: 0,
  stroke: "black",
  strokeThickness: 0,
  textBaseline: "alphabetic",
  trim: false,
  whiteSpace: "pre",
  wordWrap: false,
  wordWrapWidth: 100
};
var TextStyle = _TextStyle;

// node_modules/@pixi/text/lib/Text.mjs
var defaultDestroyOptions = {
  texture: true,
  children: false,
  baseTexture: true
};
var _Text = class _Text2 extends Sprite {
  constructor(text, style, canvas) {
    let ownCanvas = false;
    canvas || (canvas = settings.ADAPTER.createCanvas(), ownCanvas = true), canvas.width = 3, canvas.height = 3;
    const texture = Texture.from(canvas);
    texture.orig = new Rectangle, texture.trim = new Rectangle, super(texture), this._ownCanvas = ownCanvas, this.canvas = canvas, this.context = canvas.getContext("2d", {
      willReadFrequently: true
    }), this._resolution = _Text2.defaultResolution ?? settings.RESOLUTION, this._autoResolution = _Text2.defaultAutoResolution, this._text = null, this._style = null, this._styleListener = null, this._font = "", this.text = text, this.style = style, this.localStyleID = -1;
  }
  static get experimentalLetterSpacing() {
    return TextMetrics.experimentalLetterSpacing;
  }
  static set experimentalLetterSpacing(value) {
    exports_lib.deprecation("7.1.0", "Text.experimentalLetterSpacing is deprecated, use TextMetrics.experimentalLetterSpacing"), TextMetrics.experimentalLetterSpacing = value;
  }
  updateText(respectDirty) {
    const style = this._style;
    if (this.localStyleID !== style.styleID && (this.dirty = true, this.localStyleID = style.styleID), !this.dirty && respectDirty)
      return;
    this._font = this._style.toFontString();
    const context2 = this.context, measured = TextMetrics.measureText(this._text || " ", this._style, this._style.wordWrap, this.canvas), width = measured.width, height = measured.height, lines = measured.lines, lineHeight = measured.lineHeight, lineWidths = measured.lineWidths, maxLineWidth = measured.maxLineWidth, fontProperties = measured.fontProperties;
    this.canvas.width = Math.ceil(Math.ceil(Math.max(1, width) + style.padding * 2) * this._resolution), this.canvas.height = Math.ceil(Math.ceil(Math.max(1, height) + style.padding * 2) * this._resolution), context2.scale(this._resolution, this._resolution), context2.clearRect(0, 0, this.canvas.width, this.canvas.height), context2.font = this._font, context2.lineWidth = style.strokeThickness, context2.textBaseline = style.textBaseline, context2.lineJoin = style.lineJoin, context2.miterLimit = style.miterLimit;
    let linePositionX, linePositionY;
    const passesCount = style.dropShadow ? 2 : 1;
    for (let i2 = 0;i2 < passesCount; ++i2) {
      const isShadowPass = style.dropShadow && i2 === 0, dsOffsetText = isShadowPass ? Math.ceil(Math.max(1, height) + style.padding * 2) : 0, dsOffsetShadow = dsOffsetText * this._resolution;
      if (isShadowPass) {
        context2.fillStyle = "black", context2.strokeStyle = "black";
        const dropShadowColor = style.dropShadowColor, dropShadowBlur = style.dropShadowBlur * this._resolution, dropShadowDistance = style.dropShadowDistance * this._resolution;
        context2.shadowColor = Color.shared.setValue(dropShadowColor).setAlpha(style.dropShadowAlpha).toRgbaString(), context2.shadowBlur = dropShadowBlur, context2.shadowOffsetX = Math.cos(style.dropShadowAngle) * dropShadowDistance, context2.shadowOffsetY = Math.sin(style.dropShadowAngle) * dropShadowDistance + dsOffsetShadow;
      } else
        context2.fillStyle = this._generateFillStyle(style, lines, measured), context2.strokeStyle = style.stroke, context2.shadowColor = "black", context2.shadowBlur = 0, context2.shadowOffsetX = 0, context2.shadowOffsetY = 0;
      let linePositionYShift = (lineHeight - fontProperties.fontSize) / 2;
      lineHeight - fontProperties.fontSize < 0 && (linePositionYShift = 0);
      for (let i22 = 0;i22 < lines.length; i22++)
        linePositionX = style.strokeThickness / 2, linePositionY = style.strokeThickness / 2 + i22 * lineHeight + fontProperties.ascent + linePositionYShift, style.align === "right" ? linePositionX += maxLineWidth - lineWidths[i22] : style.align === "center" && (linePositionX += (maxLineWidth - lineWidths[i22]) / 2), style.stroke && style.strokeThickness && this.drawLetterSpacing(lines[i22], linePositionX + style.padding, linePositionY + style.padding - dsOffsetText, true), style.fill && this.drawLetterSpacing(lines[i22], linePositionX + style.padding, linePositionY + style.padding - dsOffsetText);
    }
    this.updateTexture();
  }
  drawLetterSpacing(text, x2, y2, isStroke = false) {
    const letterSpacing = this._style.letterSpacing;
    let useExperimentalLetterSpacing = false;
    if (TextMetrics.experimentalLetterSpacingSupported && (TextMetrics.experimentalLetterSpacing ? (this.context.letterSpacing = `${letterSpacing}px`, this.context.textLetterSpacing = `${letterSpacing}px`, useExperimentalLetterSpacing = true) : (this.context.letterSpacing = "0px", this.context.textLetterSpacing = "0px")), letterSpacing === 0 || useExperimentalLetterSpacing) {
      isStroke ? this.context.strokeText(text, x2, y2) : this.context.fillText(text, x2, y2);
      return;
    }
    let currentPosition = x2;
    const stringArray = TextMetrics.graphemeSegmenter(text);
    let previousWidth = this.context.measureText(text).width, currentWidth = 0;
    for (let i2 = 0;i2 < stringArray.length; ++i2) {
      const currentChar = stringArray[i2];
      isStroke ? this.context.strokeText(currentChar, currentPosition, y2) : this.context.fillText(currentChar, currentPosition, y2);
      let textStr = "";
      for (let j2 = i2 + 1;j2 < stringArray.length; ++j2)
        textStr += stringArray[j2];
      currentWidth = this.context.measureText(textStr).width, currentPosition += previousWidth - currentWidth + letterSpacing, previousWidth = currentWidth;
    }
  }
  updateTexture() {
    const canvas = this.canvas;
    if (this._style.trim) {
      const trimmed = exports_lib.trimCanvas(canvas);
      trimmed.data && (canvas.width = trimmed.width, canvas.height = trimmed.height, this.context.putImageData(trimmed.data, 0, 0));
    }
    const texture = this._texture, style = this._style, padding = style.trim ? 0 : style.padding, baseTexture = texture.baseTexture;
    texture.trim.width = texture._frame.width = canvas.width / this._resolution, texture.trim.height = texture._frame.height = canvas.height / this._resolution, texture.trim.x = -padding, texture.trim.y = -padding, texture.orig.width = texture._frame.width - padding * 2, texture.orig.height = texture._frame.height - padding * 2, this._onTextureUpdate(), baseTexture.setRealSize(canvas.width, canvas.height, this._resolution), texture.updateUvs(), this.dirty = false;
  }
  _render(renderer) {
    this._autoResolution && this._resolution !== renderer.resolution && (this._resolution = renderer.resolution, this.dirty = true), this.updateText(true), super._render(renderer);
  }
  updateTransform() {
    this.updateText(true), super.updateTransform();
  }
  getBounds(skipUpdate, rect) {
    return this.updateText(true), this._textureID === -1 && (skipUpdate = false), super.getBounds(skipUpdate, rect);
  }
  getLocalBounds(rect) {
    return this.updateText(true), super.getLocalBounds.call(this, rect);
  }
  _calculateBounds() {
    this.calculateVertices(), this._bounds.addQuad(this.vertexData);
  }
  _generateFillStyle(style, lines, metrics) {
    const fillStyle = style.fill;
    if (Array.isArray(fillStyle)) {
      if (fillStyle.length === 1)
        return fillStyle[0];
    } else
      return fillStyle;
    let gradient;
    const dropShadowCorrection = style.dropShadow ? style.dropShadowDistance : 0, padding = style.padding || 0, width = this.canvas.width / this._resolution - dropShadowCorrection - padding * 2, height = this.canvas.height / this._resolution - dropShadowCorrection - padding * 2, fill = fillStyle.slice(), fillGradientStops = style.fillGradientStops.slice();
    if (!fillGradientStops.length) {
      const lengthPlus1 = fill.length + 1;
      for (let i2 = 1;i2 < lengthPlus1; ++i2)
        fillGradientStops.push(i2 / lengthPlus1);
    }
    if (fill.unshift(fillStyle[0]), fillGradientStops.unshift(0), fill.push(fillStyle[fillStyle.length - 1]), fillGradientStops.push(1), style.fillGradientType === TEXT_GRADIENT.LINEAR_VERTICAL) {
      gradient = this.context.createLinearGradient(width / 2, padding, width / 2, height + padding);
      const textHeight = metrics.fontProperties.fontSize + style.strokeThickness;
      for (let i2 = 0;i2 < lines.length; i2++) {
        const lastLineBottom = metrics.lineHeight * (i2 - 1) + textHeight, thisLineTop = metrics.lineHeight * i2;
        let thisLineGradientStart = thisLineTop;
        i2 > 0 && lastLineBottom > thisLineTop && (thisLineGradientStart = (thisLineTop + lastLineBottom) / 2);
        const thisLineBottom = thisLineTop + textHeight, nextLineTop = metrics.lineHeight * (i2 + 1);
        let thisLineGradientEnd = thisLineBottom;
        i2 + 1 < lines.length && nextLineTop < thisLineBottom && (thisLineGradientEnd = (thisLineBottom + nextLineTop) / 2);
        const gradStopLineHeight = (thisLineGradientEnd - thisLineGradientStart) / height;
        for (let j2 = 0;j2 < fill.length; j2++) {
          let lineStop = 0;
          typeof fillGradientStops[j2] == "number" ? lineStop = fillGradientStops[j2] : lineStop = j2 / fill.length;
          let globalStop = Math.min(1, Math.max(0, thisLineGradientStart / height + lineStop * gradStopLineHeight));
          globalStop = Number(globalStop.toFixed(5)), gradient.addColorStop(globalStop, fill[j2]);
        }
      }
    } else {
      gradient = this.context.createLinearGradient(padding, height / 2, width + padding, height / 2);
      const totalIterations = fill.length + 1;
      let currentIteration = 1;
      for (let i2 = 0;i2 < fill.length; i2++) {
        let stop;
        typeof fillGradientStops[i2] == "number" ? stop = fillGradientStops[i2] : stop = currentIteration / totalIterations, gradient.addColorStop(stop, fill[i2]), currentIteration++;
      }
    }
    return gradient;
  }
  destroy(options) {
    typeof options == "boolean" && (options = { children: options }), options = Object.assign({}, defaultDestroyOptions, options), super.destroy(options), this._ownCanvas && (this.canvas.height = this.canvas.width = 0), this.context = null, this.canvas = null, this._style = null;
  }
  get width() {
    return this.updateText(true), Math.abs(this.scale.x) * this._texture.orig.width;
  }
  set width(value) {
    this.updateText(true);
    const s2 = exports_lib.sign(this.scale.x) || 1;
    this.scale.x = s2 * value / this._texture.orig.width, this._width = value;
  }
  get height() {
    return this.updateText(true), Math.abs(this.scale.y) * this._texture.orig.height;
  }
  set height(value) {
    this.updateText(true);
    const s2 = exports_lib.sign(this.scale.y) || 1;
    this.scale.y = s2 * value / this._texture.orig.height, this._height = value;
  }
  get style() {
    return this._style;
  }
  set style(style) {
    style = style || {}, style instanceof TextStyle ? this._style = style : this._style = new TextStyle(style), this.localStyleID = -1, this.dirty = true;
  }
  get text() {
    return this._text;
  }
  set text(text) {
    text = String(text ?? ""), this._text !== text && (this._text = text, this.dirty = true);
  }
  get resolution() {
    return this._resolution;
  }
  set resolution(value) {
    this._autoResolution = false, this._resolution !== value && (this._resolution = value, this.dirty = true);
  }
};
_Text.defaultAutoResolution = true;
var Text = _Text;

// node_modules/@pixi/prepare/lib/CountLimiter.mjs
class CountLimiter {
  constructor(maxItemsPerFrame) {
    this.maxItemsPerFrame = maxItemsPerFrame, this.itemsLeft = 0;
  }
  beginFrame() {
    this.itemsLeft = this.maxItemsPerFrame;
  }
  allowedToUpload() {
    return this.itemsLeft-- > 0;
  }
}

// node_modules/@pixi/prepare/lib/BasePrepare.mjs
var findMultipleBaseTextures = function(item, queue) {
  let result = false;
  if (item?._textures?.length) {
    for (let i2 = 0;i2 < item._textures.length; i2++)
      if (item._textures[i2] instanceof Texture) {
        const baseTexture = item._textures[i2].baseTexture;
        queue.includes(baseTexture) || (queue.push(baseTexture), result = true);
      }
  }
  return result;
};
var findBaseTexture = function(item, queue) {
  if (item.baseTexture instanceof BaseTexture) {
    const texture = item.baseTexture;
    return queue.includes(texture) || queue.push(texture), true;
  }
  return false;
};
var findTexture = function(item, queue) {
  if (item._texture && item._texture instanceof Texture) {
    const texture = item._texture.baseTexture;
    return queue.includes(texture) || queue.push(texture), true;
  }
  return false;
};
var drawText = function(_helper, item) {
  return item instanceof Text ? (item.updateText(true), true) : false;
};
var calculateTextStyle = function(_helper, item) {
  if (item instanceof TextStyle) {
    const font = item.toFontString();
    return TextMetrics.measureFont(font), true;
  }
  return false;
};
var findText = function(item, queue) {
  if (item instanceof Text) {
    queue.includes(item.style) || queue.push(item.style), queue.includes(item) || queue.push(item);
    const texture = item._texture.baseTexture;
    return queue.includes(texture) || queue.push(texture), true;
  }
  return false;
};
var findTextStyle = function(item, queue) {
  return item instanceof TextStyle ? (queue.includes(item) || queue.push(item), true) : false;
};
var _BasePrepare = class _BasePrepare2 {
  constructor(renderer) {
    this.limiter = new CountLimiter(_BasePrepare2.uploadsPerFrame), this.renderer = renderer, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = false, this.delayedTick = () => {
      this.queue && this.prepareItems();
    }, this.registerFindHook(findText), this.registerFindHook(findTextStyle), this.registerFindHook(findMultipleBaseTextures), this.registerFindHook(findBaseTexture), this.registerFindHook(findTexture), this.registerUploadHook(drawText), this.registerUploadHook(calculateTextStyle);
  }
  upload(item) {
    return new Promise((resolve) => {
      item && this.add(item), this.queue.length ? (this.completes.push(resolve), this.ticking || (this.ticking = true, Ticker.system.addOnce(this.tick, this, UPDATE_PRIORITY.UTILITY))) : resolve();
    });
  }
  tick() {
    setTimeout(this.delayedTick, 0);
  }
  prepareItems() {
    for (this.limiter.beginFrame();this.queue.length && this.limiter.allowedToUpload(); ) {
      const item = this.queue[0];
      let uploaded = false;
      if (item && !item._destroyed) {
        for (let i2 = 0, len = this.uploadHooks.length;i2 < len; i2++)
          if (this.uploadHooks[i2](this.uploadHookHelper, item)) {
            this.queue.shift(), uploaded = true;
            break;
          }
      }
      uploaded || this.queue.shift();
    }
    if (this.queue.length)
      Ticker.system.addOnce(this.tick, this, UPDATE_PRIORITY.UTILITY);
    else {
      this.ticking = false;
      const completes = this.completes.slice(0);
      this.completes.length = 0;
      for (let i2 = 0, len = completes.length;i2 < len; i2++)
        completes[i2]();
    }
  }
  registerFindHook(addHook) {
    return addHook && this.addHooks.push(addHook), this;
  }
  registerUploadHook(uploadHook) {
    return uploadHook && this.uploadHooks.push(uploadHook), this;
  }
  add(item) {
    for (let i2 = 0, len = this.addHooks.length;i2 < len && !this.addHooks[i2](item, this.queue); i2++)
      ;
    if (item instanceof Container)
      for (let i2 = item.children.length - 1;i2 >= 0; i2--)
        this.add(item.children[i2]);
    return this;
  }
  destroy() {
    this.ticking && Ticker.system.remove(this.tick, this), this.ticking = false, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.limiter = null, this.uploadHookHelper = null;
  }
};
_BasePrepare.uploadsPerFrame = 4;
var BasePrepare = _BasePrepare;

// node_modules/@pixi/prepare/lib/settings.mjs
Object.defineProperties(settings, {
  UPLOADS_PER_FRAME: {
    get() {
      return BasePrepare.uploadsPerFrame;
    },
    set(value) {
      exports_lib.deprecation("7.1.0", "settings.UPLOADS_PER_FRAME is deprecated, use prepare.BasePrepare.uploadsPerFrame"), BasePrepare.uploadsPerFrame = value;
    }
  }
});

// node_modules/@pixi/prepare/lib/Prepare.mjs
var uploadBaseTextures = function(renderer, item) {
  return item instanceof BaseTexture ? (item._glTextures[renderer.CONTEXT_UID] || renderer.texture.bind(item), true) : false;
};
var uploadGraphics = function(renderer, item) {
  if (!(item instanceof Graphics))
    return false;
  const { geometry } = item;
  item.finishPoly(), geometry.updateBatches();
  const { batches } = geometry;
  for (let i2 = 0;i2 < batches.length; i2++) {
    const { texture } = batches[i2].style;
    texture && uploadBaseTextures(renderer, texture.baseTexture);
  }
  return geometry.batchable || renderer.geometry.bind(geometry, item._resolveDirectShader(renderer)), true;
};
var findGraphics = function(item, queue) {
  return item instanceof Graphics ? (queue.push(item), true) : false;
};

class Prepare extends BasePrepare {
  constructor(renderer) {
    super(renderer), this.uploadHookHelper = this.renderer, this.registerFindHook(findGraphics), this.registerUploadHook(uploadBaseTextures), this.registerUploadHook(uploadGraphics);
  }
}
Prepare.extension = {
  name: "prepare",
  type: ExtensionType.RendererSystem
};
extensions.add(Prepare);
// node_modules/@pixi/sprite-tiling/lib/TilingSprite.mjs
var tempPoint3 = new Point;

// node_modules/@pixi/sprite-tiling/lib/sprite-tiling.frag.mjs
var gl2FragmentSrc = `#version 300 es
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

in vec2 vTextureCoord;

out vec4 fragmentColor;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    vec2 unclamped = coord;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    vec4 texSample = texture(uSampler, coord, unclamped == coord ? 0.0f : -32.0f);// lod-bias very negative to force lod 0

    fragmentColor = texSample * uColor;
}
`;

// node_modules/@pixi/sprite-tiling/lib/sprite-tiling.vert.mjs
var gl2VertexSrc = `#version 300 es
#define SHADER_NAME Tiling-Sprite-300

precision lowp float;

in vec2 aVertexPosition;
in vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

out vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;
}
`;

// node_modules/@pixi/sprite-tiling/lib/sprite-tiling-fallback.frag.mjs
var gl1FragmentSrc = `#version 100
#ifdef GL_EXT_shader_texture_lod
    #extension GL_EXT_shader_texture_lod : enable
#endif
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    vec2 unclamped = coord;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    #ifdef GL_EXT_shader_texture_lod
        vec4 texSample = unclamped == coord
            ? texture2D(uSampler, coord) 
            : texture2DLodEXT(uSampler, coord, 0);
    #else
        vec4 texSample = texture2D(uSampler, coord);
    #endif

    gl_FragColor = texSample * uColor;
}
`;

// node_modules/@pixi/sprite-tiling/lib/sprite-tiling-fallback.vert.mjs
var gl1VertexSrc = `#version 100
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;
}
`;

// node_modules/@pixi/sprite-tiling/lib/sprite-tiling-simple.frag.mjs
var fragmentSimpleSrc = `#version 100
#define SHADER_NAME Tiling-Sprite-Simple-100

precision lowp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;

void main(void)
{
    vec4 texSample = texture2D(uSampler, vTextureCoord);
    gl_FragColor = texSample * uColor;
}
`;

// node_modules/@pixi/sprite-tiling/lib/TilingSpriteRenderer.mjs
var tempMat2 = new Matrix;

class TilingSpriteRenderer extends ObjectRenderer {
  constructor(renderer) {
    super(renderer), renderer.runners.contextChange.add(this), this.quad = new QuadUv, this.state = State.for2d();
  }
  contextChange() {
    const renderer = this.renderer, uniforms = { globals: renderer.globalUniforms };
    this.simpleShader = Shader.from(gl1VertexSrc, fragmentSimpleSrc, uniforms), this.shader = renderer.context.webGLVersion > 1 ? Shader.from(gl2VertexSrc, gl2FragmentSrc, uniforms) : Shader.from(gl1VertexSrc, gl1FragmentSrc, uniforms);
  }
  render(ts) {
    const renderer = this.renderer, quad = this.quad;
    let vertices = quad.vertices;
    vertices[0] = vertices[6] = ts._width * -ts.anchor.x, vertices[1] = vertices[3] = ts._height * -ts.anchor.y, vertices[2] = vertices[4] = ts._width * (1 - ts.anchor.x), vertices[5] = vertices[7] = ts._height * (1 - ts.anchor.y);
    const anchorX = ts.uvRespectAnchor ? ts.anchor.x : 0, anchorY = ts.uvRespectAnchor ? ts.anchor.y : 0;
    vertices = quad.uvs, vertices[0] = vertices[6] = -anchorX, vertices[1] = vertices[3] = -anchorY, vertices[2] = vertices[4] = 1 - anchorX, vertices[5] = vertices[7] = 1 - anchorY, quad.invalidate();
    const tex = ts._texture, baseTex = tex.baseTexture, premultiplied = baseTex.alphaMode > 0, lt = ts.tileTransform.localTransform, uv = ts.uvMatrix;
    let isSimple = baseTex.isPowerOfTwo && tex.frame.width === baseTex.width && tex.frame.height === baseTex.height;
    isSimple && (baseTex._glTextures[renderer.CONTEXT_UID] ? isSimple = baseTex.wrapMode !== WRAP_MODES.CLAMP : baseTex.wrapMode === WRAP_MODES.CLAMP && (baseTex.wrapMode = WRAP_MODES.REPEAT));
    const shader = isSimple ? this.simpleShader : this.shader, w2 = tex.width, h2 = tex.height, W2 = ts._width, H3 = ts._height;
    tempMat2.set(lt.a * w2 / W2, lt.b * w2 / H3, lt.c * h2 / W2, lt.d * h2 / H3, lt.tx / W2, lt.ty / H3), tempMat2.invert(), isSimple ? tempMat2.prepend(uv.mapCoord) : (shader.uniforms.uMapCoord = uv.mapCoord.toArray(true), shader.uniforms.uClampFrame = uv.uClampFrame, shader.uniforms.uClampOffset = uv.uClampOffset), shader.uniforms.uTransform = tempMat2.toArray(true), shader.uniforms.uColor = Color.shared.setValue(ts.tint).premultiply(ts.worldAlpha, premultiplied).toArray(shader.uniforms.uColor), shader.uniforms.translationMatrix = ts.transform.worldTransform.toArray(true), shader.uniforms.uSampler = tex, renderer.shader.bind(shader), renderer.geometry.bind(quad), this.state.blendMode = exports_lib.correctBlendMode(ts.blendMode, premultiplied), renderer.state.set(this.state), renderer.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
  }
}
TilingSpriteRenderer.extension = {
  name: "tilingSprite",
  type: ExtensionType.RendererPlugin
};
extensions.add(TilingSpriteRenderer);
// node_modules/@pixi/spritesheet/lib/Spritesheet.mjs
var _Spritesheet = class _Spritesheet2 {
  constructor(texture, data, resolutionFilename = null) {
    this.linkedSheets = [], this._texture = texture instanceof Texture ? texture : null, this.baseTexture = texture instanceof BaseTexture ? texture : this._texture.baseTexture, this.textures = {}, this.animations = {}, this.data = data;
    const resource = this.baseTexture.resource;
    this.resolution = this._updateResolution(resolutionFilename || (resource ? resource.url : null)), this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
  }
  _updateResolution(resolutionFilename = null) {
    const { scale } = this.data.meta;
    let resolution = exports_lib.getResolutionOfUrl(resolutionFilename, null);
    return resolution === null && (resolution = parseFloat(scale ?? "1")), resolution !== 1 && this.baseTexture.setResolution(resolution), resolution;
  }
  parse() {
    return new Promise((resolve) => {
      this._callback = resolve, this._batchIndex = 0, this._frameKeys.length <= _Spritesheet2.BATCH_SIZE ? (this._processFrames(0), this._processAnimations(), this._parseComplete()) : this._nextBatch();
    });
  }
  _processFrames(initialFrameIndex) {
    let frameIndex = initialFrameIndex;
    const maxFrames = _Spritesheet2.BATCH_SIZE;
    for (;frameIndex - initialFrameIndex < maxFrames && frameIndex < this._frameKeys.length; ) {
      const i2 = this._frameKeys[frameIndex], data = this._frames[i2], rect = data.frame;
      if (rect) {
        let frame = null, trim = null;
        const sourceSize = data.trimmed !== false && data.sourceSize ? data.sourceSize : data.frame, orig = new Rectangle(0, 0, Math.floor(sourceSize.w) / this.resolution, Math.floor(sourceSize.h) / this.resolution);
        data.rotated ? frame = new Rectangle(Math.floor(rect.x) / this.resolution, Math.floor(rect.y) / this.resolution, Math.floor(rect.h) / this.resolution, Math.floor(rect.w) / this.resolution) : frame = new Rectangle(Math.floor(rect.x) / this.resolution, Math.floor(rect.y) / this.resolution, Math.floor(rect.w) / this.resolution, Math.floor(rect.h) / this.resolution), data.trimmed !== false && data.spriteSourceSize && (trim = new Rectangle(Math.floor(data.spriteSourceSize.x) / this.resolution, Math.floor(data.spriteSourceSize.y) / this.resolution, Math.floor(rect.w) / this.resolution, Math.floor(rect.h) / this.resolution)), this.textures[i2] = new Texture(this.baseTexture, frame, orig, trim, data.rotated ? 2 : 0, data.anchor, data.borders), Texture.addToCache(this.textures[i2], i2.toString());
      }
      frameIndex++;
    }
  }
  _processAnimations() {
    const animations = this.data.animations || {};
    for (const animName in animations) {
      this.animations[animName] = [];
      for (let i2 = 0;i2 < animations[animName].length; i2++) {
        const frameName = animations[animName][i2];
        this.animations[animName].push(this.textures[frameName]);
      }
    }
  }
  _parseComplete() {
    const callback = this._callback;
    this._callback = null, this._batchIndex = 0, callback.call(this, this.textures);
  }
  _nextBatch() {
    this._processFrames(this._batchIndex * _Spritesheet2.BATCH_SIZE), this._batchIndex++, setTimeout(() => {
      this._batchIndex * _Spritesheet2.BATCH_SIZE < this._frameKeys.length ? this._nextBatch() : (this._processAnimations(), this._parseComplete());
    }, 0);
  }
  destroy(destroyBase = false) {
    for (const i2 in this.textures)
      this.textures[i2].destroy();
    this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, destroyBase && (this._texture?.destroy(), this.baseTexture.destroy()), this._texture = null, this.baseTexture = null, this.linkedSheets = [];
  }
};
_Spritesheet.BATCH_SIZE = 1000;
var Spritesheet = _Spritesheet;

// node_modules/@pixi/spritesheet/lib/spritesheetAsset.mjs
var getCacheableAssets = function(keys, asset, ignoreMultiPack) {
  const out = {};
  if (keys.forEach((key) => {
    out[key] = asset;
  }), Object.keys(asset.textures).forEach((key) => {
    out[key] = asset.textures[key];
  }), !ignoreMultiPack) {
    const basePath = exports_lib.path.dirname(keys[0]);
    asset.linkedSheets.forEach((item, i2) => {
      const out2 = getCacheableAssets([`${basePath}/${asset.data.meta.related_multi_packs[i2]}`], item, true);
      Object.assign(out, out2);
    });
  }
  return out;
};
var validImages = ["jpg", "png", "jpeg", "avif", "webp"];
var spritesheetAsset = {
  extension: ExtensionType.Asset,
  cache: {
    test: (asset) => asset instanceof Spritesheet,
    getCacheableAssets: (keys, asset) => getCacheableAssets(keys, asset, false)
  },
  resolver: {
    test: (value) => {
      const split = value.split("?")[0].split("."), extension = split.pop(), format = split.pop();
      return extension === "json" && validImages.includes(format);
    },
    parse: (value) => {
      const split = value.split(".");
      return {
        resolution: parseFloat(settings.RETINA_PREFIX.exec(value)?.[1] ?? "1"),
        format: split[split.length - 2],
        src: value
      };
    }
  },
  loader: {
    name: "spritesheetLoader",
    extension: {
      type: ExtensionType.LoadParser,
      priority: LoaderParserPriority.Normal
    },
    async testParse(asset, options) {
      return exports_lib.path.extname(options.src).toLowerCase() === ".json" && !!asset.frames;
    },
    async parse(asset, options, loader3) {
      let basePath = exports_lib.path.dirname(options.src);
      basePath && basePath.lastIndexOf("/") !== basePath.length - 1 && (basePath += "/");
      let imagePath = basePath + asset.meta.image;
      imagePath = copySearchParams(imagePath, options.src);
      const texture = (await loader3.load([imagePath]))[imagePath], spritesheet = new Spritesheet(texture.baseTexture, asset, options.src);
      await spritesheet.parse();
      const multiPacks = asset?.meta?.related_multi_packs;
      if (Array.isArray(multiPacks)) {
        const promises = [];
        for (const item of multiPacks) {
          if (typeof item != "string")
            continue;
          let itemUrl = basePath + item;
          options.data?.ignoreMultiPack || (itemUrl = copySearchParams(itemUrl, options.src), promises.push(loader3.load({
            src: itemUrl,
            data: {
              ignoreMultiPack: true
            }
          })));
        }
        const res = await Promise.all(promises);
        spritesheet.linkedSheets = res, res.forEach((item) => {
          item.linkedSheets = [spritesheet].concat(spritesheet.linkedSheets.filter((sp) => sp !== item));
        });
      }
      return spritesheet;
    },
    unload(spritesheet) {
      spritesheet.destroy(true);
    }
  }
};
extensions.add(spritesheetAsset);
// node_modules/@pixi/text-bitmap/lib/BitmapFontData.mjs
class BitmapFontData {
  constructor() {
    this.info = [], this.common = [], this.page = [], this.char = [], this.kerning = [], this.distanceField = [];
  }
}

// node_modules/@pixi/text-bitmap/lib/formats/TextFormat.mjs
class TextFormat {
  static test(data) {
    return typeof data == "string" && data.startsWith("info face=");
  }
  static parse(txt) {
    const items = txt.match(/^[a-z]+\s+.+$/gm), rawData = {
      info: [],
      common: [],
      page: [],
      char: [],
      chars: [],
      kerning: [],
      kernings: [],
      distanceField: []
    };
    for (const i2 in items) {
      const name = items[i2].match(/^[a-z]+/gm)[0], attributeList = items[i2].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), itemData = {};
      for (const i22 in attributeList) {
        const split = attributeList[i22].split("="), key = split[0], strValue = split[1].replace(/"/gm, ""), floatValue = parseFloat(strValue), value = isNaN(floatValue) ? strValue : floatValue;
        itemData[key] = value;
      }
      rawData[name].push(itemData);
    }
    const font = new BitmapFontData;
    return rawData.info.forEach((info) => font.info.push({
      face: info.face,
      size: parseInt(info.size, 10)
    })), rawData.common.forEach((common) => font.common.push({
      lineHeight: parseInt(common.lineHeight, 10)
    })), rawData.page.forEach((page) => font.page.push({
      id: parseInt(page.id, 10),
      file: page.file
    })), rawData.char.forEach((char) => font.char.push({
      id: parseInt(char.id, 10),
      page: parseInt(char.page, 10),
      x: parseInt(char.x, 10),
      y: parseInt(char.y, 10),
      width: parseInt(char.width, 10),
      height: parseInt(char.height, 10),
      xoffset: parseInt(char.xoffset, 10),
      yoffset: parseInt(char.yoffset, 10),
      xadvance: parseInt(char.xadvance, 10)
    })), rawData.kerning.forEach((kerning) => font.kerning.push({
      first: parseInt(kerning.first, 10),
      second: parseInt(kerning.second, 10),
      amount: parseInt(kerning.amount, 10)
    })), rawData.distanceField.forEach((df) => font.distanceField.push({
      distanceRange: parseInt(df.distanceRange, 10),
      fieldType: df.fieldType
    })), font;
  }
}

// node_modules/@pixi/text-bitmap/lib/formats/XMLFormat.mjs
class XMLFormat {
  static test(data) {
    const xml = data;
    return typeof data != "string" && ("getElementsByTagName" in data) && xml.getElementsByTagName("page").length && xml.getElementsByTagName("info")[0].getAttribute("face") !== null;
  }
  static parse(xml) {
    const data = new BitmapFontData, info = xml.getElementsByTagName("info"), common = xml.getElementsByTagName("common"), page = xml.getElementsByTagName("page"), char = xml.getElementsByTagName("char"), kerning = xml.getElementsByTagName("kerning"), distanceField = xml.getElementsByTagName("distanceField");
    for (let i2 = 0;i2 < info.length; i2++)
      data.info.push({
        face: info[i2].getAttribute("face"),
        size: parseInt(info[i2].getAttribute("size"), 10)
      });
    for (let i2 = 0;i2 < common.length; i2++)
      data.common.push({
        lineHeight: parseInt(common[i2].getAttribute("lineHeight"), 10)
      });
    for (let i2 = 0;i2 < page.length; i2++)
      data.page.push({
        id: parseInt(page[i2].getAttribute("id"), 10) || 0,
        file: page[i2].getAttribute("file")
      });
    for (let i2 = 0;i2 < char.length; i2++) {
      const letter = char[i2];
      data.char.push({
        id: parseInt(letter.getAttribute("id"), 10),
        page: parseInt(letter.getAttribute("page"), 10) || 0,
        x: parseInt(letter.getAttribute("x"), 10),
        y: parseInt(letter.getAttribute("y"), 10),
        width: parseInt(letter.getAttribute("width"), 10),
        height: parseInt(letter.getAttribute("height"), 10),
        xoffset: parseInt(letter.getAttribute("xoffset"), 10),
        yoffset: parseInt(letter.getAttribute("yoffset"), 10),
        xadvance: parseInt(letter.getAttribute("xadvance"), 10)
      });
    }
    for (let i2 = 0;i2 < kerning.length; i2++)
      data.kerning.push({
        first: parseInt(kerning[i2].getAttribute("first"), 10),
        second: parseInt(kerning[i2].getAttribute("second"), 10),
        amount: parseInt(kerning[i2].getAttribute("amount"), 10)
      });
    for (let i2 = 0;i2 < distanceField.length; i2++)
      data.distanceField.push({
        fieldType: distanceField[i2].getAttribute("fieldType"),
        distanceRange: parseInt(distanceField[i2].getAttribute("distanceRange"), 10)
      });
    return data;
  }
}

// node_modules/@pixi/text-bitmap/lib/formats/XMLStringFormat.mjs
class XMLStringFormat {
  static test(data) {
    return typeof data == "string" && data.includes("<font>") ? XMLFormat.test(settings.ADAPTER.parseXML(data)) : false;
  }
  static parse(xmlTxt) {
    return XMLFormat.parse(settings.ADAPTER.parseXML(xmlTxt));
  }
}

// node_modules/@pixi/text-bitmap/lib/formats/index.mjs
var autoDetectFormat = function(data) {
  for (let i2 = 0;i2 < formats.length; i2++)
    if (formats[i2].test(data))
      return formats[i2];
  return null;
};
var formats = [
  TextFormat,
  XMLFormat,
  XMLStringFormat
];

// node_modules/@pixi/text-bitmap/lib/utils/generateFillStyle.mjs
var generateFillStyle = function(canvas, context2, style, resolution, lines, metrics) {
  const fillStyle = style.fill;
  if (Array.isArray(fillStyle)) {
    if (fillStyle.length === 1)
      return fillStyle[0];
  } else
    return fillStyle;
  let gradient;
  const dropShadowCorrection = style.dropShadow ? style.dropShadowDistance : 0, padding = style.padding || 0, width = canvas.width / resolution - dropShadowCorrection - padding * 2, height = canvas.height / resolution - dropShadowCorrection - padding * 2, fill = fillStyle.slice(), fillGradientStops = style.fillGradientStops.slice();
  if (!fillGradientStops.length) {
    const lengthPlus1 = fill.length + 1;
    for (let i2 = 1;i2 < lengthPlus1; ++i2)
      fillGradientStops.push(i2 / lengthPlus1);
  }
  if (fill.unshift(fillStyle[0]), fillGradientStops.unshift(0), fill.push(fillStyle[fillStyle.length - 1]), fillGradientStops.push(1), style.fillGradientType === TEXT_GRADIENT.LINEAR_VERTICAL) {
    gradient = context2.createLinearGradient(width / 2, padding, width / 2, height + padding);
    let lastIterationStop = 0;
    const gradStopLineHeight = (metrics.fontProperties.fontSize + style.strokeThickness) / height;
    for (let i2 = 0;i2 < lines.length; i2++) {
      const thisLineTop = metrics.lineHeight * i2;
      for (let j2 = 0;j2 < fill.length; j2++) {
        let lineStop = 0;
        typeof fillGradientStops[j2] == "number" ? lineStop = fillGradientStops[j2] : lineStop = j2 / fill.length;
        const globalStop = thisLineTop / height + lineStop * gradStopLineHeight;
        let clampedStop = Math.max(lastIterationStop, globalStop);
        clampedStop = Math.min(clampedStop, 1), gradient.addColorStop(clampedStop, fill[j2]), lastIterationStop = clampedStop;
      }
    }
  } else {
    gradient = context2.createLinearGradient(padding, height / 2, width + padding, height / 2);
    const totalIterations = fill.length + 1;
    let currentIteration = 1;
    for (let i2 = 0;i2 < fill.length; i2++) {
      let stop;
      typeof fillGradientStops[i2] == "number" ? stop = fillGradientStops[i2] : stop = currentIteration / totalIterations, gradient.addColorStop(stop, fill[i2]), currentIteration++;
    }
  }
  return gradient;
};

// node_modules/@pixi/text-bitmap/lib/utils/drawGlyph.mjs
var drawGlyph = function(canvas, context2, metrics, x2, y2, resolution, style) {
  const { text: char, fontProperties } = metrics;
  context2.translate(x2, y2), context2.scale(resolution, resolution);
  const tx = style.strokeThickness / 2, ty = -(style.strokeThickness / 2);
  if (context2.font = style.toFontString(), context2.lineWidth = style.strokeThickness, context2.textBaseline = style.textBaseline, context2.lineJoin = style.lineJoin, context2.miterLimit = style.miterLimit, context2.fillStyle = generateFillStyle(canvas, context2, style, resolution, [char], metrics), context2.strokeStyle = style.stroke, style.dropShadow) {
    const dropShadowColor = style.dropShadowColor, dropShadowBlur = style.dropShadowBlur * resolution, dropShadowDistance = style.dropShadowDistance * resolution;
    context2.shadowColor = Color.shared.setValue(dropShadowColor).setAlpha(style.dropShadowAlpha).toRgbaString(), context2.shadowBlur = dropShadowBlur, context2.shadowOffsetX = Math.cos(style.dropShadowAngle) * dropShadowDistance, context2.shadowOffsetY = Math.sin(style.dropShadowAngle) * dropShadowDistance;
  } else
    context2.shadowColor = "black", context2.shadowBlur = 0, context2.shadowOffsetX = 0, context2.shadowOffsetY = 0;
  style.stroke && style.strokeThickness && context2.strokeText(char, tx, ty + metrics.lineHeight - fontProperties.descent), style.fill && context2.fillText(char, tx, ty + metrics.lineHeight - fontProperties.descent), context2.setTransform(1, 0, 0, 1, 0, 0), context2.fillStyle = "rgba(0, 0, 0, 0)";
};

// node_modules/@pixi/text-bitmap/lib/utils/extractCharCode.mjs
var extractCharCode = function(str) {
  return str.codePointAt ? str.codePointAt(0) : str.charCodeAt(0);
};

// node_modules/@pixi/text-bitmap/lib/utils/splitTextToCharacters.mjs
var splitTextToCharacters = function(text3) {
  return Array.from ? Array.from(text3) : text3.split("");
};

// node_modules/@pixi/text-bitmap/lib/utils/resolveCharacters.mjs
var resolveCharacters = function(chars) {
  typeof chars == "string" && (chars = [chars]);
  const result = [];
  for (let i2 = 0, j2 = chars.length;i2 < j2; i2++) {
    const item = chars[i2];
    if (Array.isArray(item)) {
      if (item.length !== 2)
        throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${item.length}.`);
      const startCode = item[0].charCodeAt(0), endCode = item[1].charCodeAt(0);
      if (endCode < startCode)
        throw new Error("[BitmapFont]: Invalid character range.");
      for (let i22 = startCode, j22 = endCode;i22 <= j22; i22++)
        result.push(String.fromCharCode(i22));
    } else
      result.push(...splitTextToCharacters(item));
  }
  if (result.length === 0)
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  return result;
};

// node_modules/@pixi/text-bitmap/lib/BitmapFont.mjs
var _BitmapFont = class _BitmapFont2 {
  constructor(data, textures2, ownsTextures) {
    const [info] = data.info, [common] = data.common, [page] = data.page, [distanceField] = data.distanceField, res = exports_lib.getResolutionOfUrl(page.file), pageTextures = {};
    this._ownsTextures = ownsTextures, this.font = info.face, this.size = info.size, this.lineHeight = common.lineHeight / res, this.chars = {}, this.pageTextures = pageTextures;
    for (let i2 = 0;i2 < data.page.length; i2++) {
      const { id, file } = data.page[i2];
      pageTextures[id] = textures2 instanceof Array ? textures2[i2] : textures2[file], distanceField?.fieldType && distanceField.fieldType !== "none" && (pageTextures[id].baseTexture.alphaMode = ALPHA_MODES.NO_PREMULTIPLIED_ALPHA, pageTextures[id].baseTexture.mipmap = MIPMAP_MODES.OFF);
    }
    for (let i2 = 0;i2 < data.char.length; i2++) {
      const { id, page: page2 } = data.char[i2];
      let { x: x2, y: y2, width, height, xoffset, yoffset, xadvance } = data.char[i2];
      x2 /= res, y2 /= res, width /= res, height /= res, xoffset /= res, yoffset /= res, xadvance /= res;
      const rect = new Rectangle(x2 + pageTextures[page2].frame.x / res, y2 + pageTextures[page2].frame.y / res, width, height);
      this.chars[id] = {
        xOffset: xoffset,
        yOffset: yoffset,
        xAdvance: xadvance,
        kerning: {},
        texture: new Texture(pageTextures[page2].baseTexture, rect),
        page: page2
      };
    }
    for (let i2 = 0;i2 < data.kerning.length; i2++) {
      let { first, second, amount } = data.kerning[i2];
      first /= res, second /= res, amount /= res, this.chars[second] && (this.chars[second].kerning[first] = amount);
    }
    this.distanceFieldRange = distanceField?.distanceRange, this.distanceFieldType = distanceField?.fieldType?.toLowerCase() ?? "none";
  }
  destroy() {
    for (const id in this.chars)
      this.chars[id].texture.destroy(), this.chars[id].texture = null;
    for (const id in this.pageTextures)
      this._ownsTextures && this.pageTextures[id].destroy(true), this.pageTextures[id] = null;
    this.chars = null, this.pageTextures = null;
  }
  static install(data, textures2, ownsTextures) {
    let fontData;
    if (data instanceof BitmapFontData)
      fontData = data;
    else {
      const format = autoDetectFormat(data);
      if (!format)
        throw new Error("Unrecognized data format for font.");
      fontData = format.parse(data);
    }
    textures2 instanceof Texture && (textures2 = [textures2]);
    const font = new _BitmapFont2(fontData, textures2, ownsTextures);
    return _BitmapFont2.available[font.font] = font, font;
  }
  static uninstall(name) {
    const font = _BitmapFont2.available[name];
    if (!font)
      throw new Error(`No font found named '${name}'`);
    font.destroy(), delete _BitmapFont2.available[name];
  }
  static from(name, textStyle, options) {
    if (!name)
      throw new Error("[BitmapFont] Property `name` is required.");
    const {
      chars,
      padding,
      resolution,
      textureWidth,
      textureHeight,
      ...baseOptions
    } = Object.assign({}, _BitmapFont2.defaultOptions, options), charsList = resolveCharacters(chars), style = textStyle instanceof TextStyle ? textStyle : new TextStyle(textStyle), lineWidth = textureWidth, fontData = new BitmapFontData;
    fontData.info[0] = {
      face: style.fontFamily,
      size: style.fontSize
    }, fontData.common[0] = {
      lineHeight: style.fontSize
    };
    let positionX = 0, positionY = 0, canvas, context2, baseTexture, maxCharHeight = 0;
    const baseTextures = [], textures2 = [];
    for (let i2 = 0;i2 < charsList.length; i2++) {
      canvas || (canvas = settings.ADAPTER.createCanvas(), canvas.width = textureWidth, canvas.height = textureHeight, context2 = canvas.getContext("2d"), baseTexture = new BaseTexture(canvas, { resolution, ...baseOptions }), baseTextures.push(baseTexture), textures2.push(new Texture(baseTexture)), fontData.page.push({
        id: textures2.length - 1,
        file: ""
      }));
      const character = charsList[i2], metrics = TextMetrics.measureText(character, style, false, canvas), width = metrics.width, height = Math.ceil(metrics.height), textureGlyphWidth = Math.ceil((style.fontStyle === "italic" ? 2 : 1) * width);
      if (positionY >= textureHeight - height * resolution) {
        if (positionY === 0)
          throw new Error(`[BitmapFont] textureHeight ${textureHeight}px is too small (fontFamily: '${style.fontFamily}', fontSize: ${style.fontSize}px, char: '${character}')`);
        --i2, canvas = null, context2 = null, baseTexture = null, positionY = 0, positionX = 0, maxCharHeight = 0;
        continue;
      }
      if (maxCharHeight = Math.max(height + metrics.fontProperties.descent, maxCharHeight), textureGlyphWidth * resolution + positionX >= lineWidth) {
        if (positionX === 0)
          throw new Error(`[BitmapFont] textureWidth ${textureWidth}px is too small (fontFamily: '${style.fontFamily}', fontSize: ${style.fontSize}px, char: '${character}')`);
        --i2, positionY += maxCharHeight * resolution, positionY = Math.ceil(positionY), positionX = 0, maxCharHeight = 0;
        continue;
      }
      drawGlyph(canvas, context2, metrics, positionX, positionY, resolution, style);
      const id = extractCharCode(metrics.text);
      fontData.char.push({
        id,
        page: textures2.length - 1,
        x: positionX / resolution,
        y: positionY / resolution,
        width: textureGlyphWidth,
        height,
        xoffset: 0,
        yoffset: 0,
        xadvance: width - (style.dropShadow ? style.dropShadowDistance : 0) - (style.stroke ? style.strokeThickness : 0)
      }), positionX += (textureGlyphWidth + 2 * padding) * resolution, positionX = Math.ceil(positionX);
    }
    if (!options?.skipKerning)
      for (let i2 = 0, len = charsList.length;i2 < len; i2++) {
        const first = charsList[i2];
        for (let j2 = 0;j2 < len; j2++) {
          const second = charsList[j2], c1 = context2.measureText(first).width, c2 = context2.measureText(second).width, amount = context2.measureText(first + second).width - (c1 + c2);
          amount && fontData.kerning.push({
            first: extractCharCode(first),
            second: extractCharCode(second),
            amount
          });
        }
      }
    const font = new _BitmapFont2(fontData, textures2, true);
    return _BitmapFont2.available[name] !== undefined && _BitmapFont2.uninstall(name), _BitmapFont2.available[name] = font, font;
  }
};
_BitmapFont.ALPHA = [["a", "z"], ["A", "Z"], " "], _BitmapFont.NUMERIC = [["0", "9"]], _BitmapFont.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "], _BitmapFont.ASCII = [[" ", "~"]], _BitmapFont.defaultOptions = {
  resolution: 1,
  textureWidth: 512,
  textureHeight: 512,
  padding: 4,
  chars: _BitmapFont.ALPHANUMERIC
}, _BitmapFont.available = {};
var BitmapFont = _BitmapFont;

// node_modules/@pixi/text-bitmap/lib/shader/msdf.frag.mjs
var msdfFrag = `// Pixi texture info\r
varying vec2 vTextureCoord;\r
uniform sampler2D uSampler;\r
\r
// Tint\r
uniform vec4 uColor;\r
\r
// on 2D applications fwidth is screenScale / glyphAtlasScale * distanceFieldRange\r
uniform float uFWidth;\r
\r
void main(void) {\r
\r
  // To stack MSDF and SDF we need a non-pre-multiplied-alpha texture.\r
  vec4 texColor = texture2D(uSampler, vTextureCoord);\r
\r
  // MSDF\r
  float median = texColor.r + texColor.g + texColor.b -\r
                  min(texColor.r, min(texColor.g, texColor.b)) -\r
                  max(texColor.r, max(texColor.g, texColor.b));\r
  // SDF\r
  median = min(median, texColor.a);\r
\r
  float screenPxDistance = uFWidth * (median - 0.5);\r
  float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\r
  if (median < 0.01) {\r
    alpha = 0.0;\r
  } else if (median > 0.99) {\r
    alpha = 1.0;\r
  }\r
\r
  // Gamma correction for coverage-like alpha\r
  float luma = dot(uColor.rgb, vec3(0.299, 0.587, 0.114));\r
  float gamma = mix(1.0, 1.0 / 2.2, luma);\r
  float coverage = pow(uColor.a * alpha, gamma);  \r
\r
  // NPM Textures, NPM outputs\r
  gl_FragColor = vec4(uColor.rgb, coverage);\r
}\r
`;

// node_modules/@pixi/text-bitmap/lib/shader/msdf.vert.mjs
var msdfVert = `// Mesh material default fragment\r
attribute vec2 aVertexPosition;\r
attribute vec2 aTextureCoord;\r
\r
uniform mat3 projectionMatrix;\r
uniform mat3 translationMatrix;\r
uniform mat3 uTextureMatrix;\r
\r
varying vec2 vTextureCoord;\r
\r
void main(void)\r
{\r
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r
\r
    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\r
}\r
`;

// node_modules/@pixi/text-bitmap/lib/BitmapText.mjs
var pageMeshDataDefaultPageMeshData = [];
var pageMeshDataMSDFPageMeshData = [];
var charRenderDataPool = [];
var _BitmapText = class _BitmapText2 extends Container {
  constructor(text4, style = {}) {
    super();
    const { align, tint, maxWidth, letterSpacing, fontName, fontSize } = Object.assign({}, _BitmapText2.styleDefaults, style);
    if (!BitmapFont.available[fontName])
      throw new Error(`Missing BitmapFont "${fontName}"`);
    this._activePagesMeshData = [], this._textWidth = 0, this._textHeight = 0, this._align = align, this._tintColor = new Color(tint), this._font = undefined, this._fontName = fontName, this._fontSize = fontSize, this.text = text4, this._maxWidth = maxWidth, this._maxLineHeight = 0, this._letterSpacing = letterSpacing, this._anchor = new ObservablePoint(() => {
      this.dirty = true;
    }, this, 0, 0), this._roundPixels = settings.ROUND_PIXELS, this.dirty = true, this._resolution = settings.RESOLUTION, this._autoResolution = true, this._textureCache = {};
  }
  updateText() {
    const data = BitmapFont.available[this._fontName], fontSize = this.fontSize, scale = fontSize / data.size, pos = new Point, chars = [], lineWidths = [], lineSpaces = [], text4 = this._text.replace(/(?:\r\n|\r)/g, `
`) || " ", charsInput = splitTextToCharacters(text4), maxWidth = this._maxWidth * data.size / fontSize, pageMeshDataPool = data.distanceFieldType === "none" ? pageMeshDataDefaultPageMeshData : pageMeshDataMSDFPageMeshData;
    let prevCharCode = null, lastLineWidth = 0, maxLineWidth = 0, line = 0, lastBreakPos = -1, lastBreakWidth = 0, spacesRemoved = 0, maxLineHeight = 0, spaceCount = 0;
    for (let i2 = 0;i2 < charsInput.length; i2++) {
      const char = charsInput[i2], charCode = extractCharCode(char);
      if (/(?:\s)/.test(char) && (lastBreakPos = i2, lastBreakWidth = lastLineWidth, spaceCount++), char === "\r" || char === `
`) {
        lineWidths.push(lastLineWidth), lineSpaces.push(-1), maxLineWidth = Math.max(maxLineWidth, lastLineWidth), ++line, ++spacesRemoved, pos.x = 0, pos.y += data.lineHeight, prevCharCode = null, spaceCount = 0;
        continue;
      }
      const charData = data.chars[charCode];
      if (!charData)
        continue;
      prevCharCode && charData.kerning[prevCharCode] && (pos.x += charData.kerning[prevCharCode]);
      const charRenderData = charRenderDataPool.pop() || {
        texture: Texture.EMPTY,
        line: 0,
        charCode: 0,
        prevSpaces: 0,
        position: new Point
      };
      charRenderData.texture = charData.texture, charRenderData.line = line, charRenderData.charCode = charCode, charRenderData.position.x = Math.round(pos.x + charData.xOffset + this._letterSpacing / 2), charRenderData.position.y = Math.round(pos.y + charData.yOffset), charRenderData.prevSpaces = spaceCount, chars.push(charRenderData), lastLineWidth = charRenderData.position.x + Math.max(charData.xAdvance - charData.xOffset, charData.texture.orig.width), pos.x += charData.xAdvance + this._letterSpacing, maxLineHeight = Math.max(maxLineHeight, charData.yOffset + charData.texture.height), prevCharCode = charCode, lastBreakPos !== -1 && maxWidth > 0 && pos.x > maxWidth && (++spacesRemoved, exports_lib.removeItems(chars, 1 + lastBreakPos - spacesRemoved, 1 + i2 - lastBreakPos), i2 = lastBreakPos, lastBreakPos = -1, lineWidths.push(lastBreakWidth), lineSpaces.push(chars.length > 0 ? chars[chars.length - 1].prevSpaces : 0), maxLineWidth = Math.max(maxLineWidth, lastBreakWidth), line++, pos.x = 0, pos.y += data.lineHeight, prevCharCode = null, spaceCount = 0);
    }
    const lastChar = charsInput[charsInput.length - 1];
    lastChar !== "\r" && lastChar !== `
` && (/(?:\s)/.test(lastChar) && (lastLineWidth = lastBreakWidth), lineWidths.push(lastLineWidth), maxLineWidth = Math.max(maxLineWidth, lastLineWidth), lineSpaces.push(-1));
    const lineAlignOffsets = [];
    for (let i2 = 0;i2 <= line; i2++) {
      let alignOffset = 0;
      this._align === "right" ? alignOffset = maxLineWidth - lineWidths[i2] : this._align === "center" ? alignOffset = (maxLineWidth - lineWidths[i2]) / 2 : this._align === "justify" && (alignOffset = lineSpaces[i2] < 0 ? 0 : (maxLineWidth - lineWidths[i2]) / lineSpaces[i2]), lineAlignOffsets.push(alignOffset);
    }
    const lenChars = chars.length, pagesMeshData = {}, newPagesMeshData = [], activePagesMeshData = this._activePagesMeshData;
    pageMeshDataPool.push(...activePagesMeshData);
    for (let i2 = 0;i2 < lenChars; i2++) {
      const texture = chars[i2].texture, baseTextureUid = texture.baseTexture.uid;
      if (!pagesMeshData[baseTextureUid]) {
        let pageMeshData = pageMeshDataPool.pop();
        if (!pageMeshData) {
          const geometry = new MeshGeometry;
          let material, meshBlendMode;
          data.distanceFieldType === "none" ? (material = new MeshMaterial(Texture.EMPTY), meshBlendMode = BLEND_MODES.NORMAL) : (material = new MeshMaterial(Texture.EMPTY, { program: Program.from(msdfVert, msdfFrag), uniforms: { uFWidth: 0 } }), meshBlendMode = BLEND_MODES.NORMAL_NPM);
          const mesh7 = new Mesh(geometry, material);
          mesh7.blendMode = meshBlendMode, pageMeshData = {
            index: 0,
            indexCount: 0,
            vertexCount: 0,
            uvsCount: 0,
            total: 0,
            mesh: mesh7,
            vertices: null,
            uvs: null,
            indices: null
          };
        }
        pageMeshData.index = 0, pageMeshData.indexCount = 0, pageMeshData.vertexCount = 0, pageMeshData.uvsCount = 0, pageMeshData.total = 0;
        const { _textureCache } = this;
        _textureCache[baseTextureUid] = _textureCache[baseTextureUid] || new Texture(texture.baseTexture), pageMeshData.mesh.texture = _textureCache[baseTextureUid], pageMeshData.mesh.tint = this._tintColor.value, newPagesMeshData.push(pageMeshData), pagesMeshData[baseTextureUid] = pageMeshData;
      }
      pagesMeshData[baseTextureUid].total++;
    }
    for (let i2 = 0;i2 < activePagesMeshData.length; i2++)
      newPagesMeshData.includes(activePagesMeshData[i2]) || this.removeChild(activePagesMeshData[i2].mesh);
    for (let i2 = 0;i2 < newPagesMeshData.length; i2++)
      newPagesMeshData[i2].mesh.parent !== this && this.addChild(newPagesMeshData[i2].mesh);
    this._activePagesMeshData = newPagesMeshData;
    for (const i2 in pagesMeshData) {
      const pageMeshData = pagesMeshData[i2], total = pageMeshData.total;
      if (!(pageMeshData.indices?.length > 6 * total) || pageMeshData.vertices.length < Mesh.BATCHABLE_SIZE * 2)
        pageMeshData.vertices = new Float32Array(4 * 2 * total), pageMeshData.uvs = new Float32Array(4 * 2 * total), pageMeshData.indices = new Uint16Array(6 * total);
      else {
        const { total: total2, vertices } = pageMeshData;
        for (let i22 = total2 * 4 * 2;i22 < vertices.length; i22++)
          vertices[i22] = 0;
      }
      pageMeshData.mesh.size = 6 * total;
    }
    for (let i2 = 0;i2 < lenChars; i2++) {
      const char = chars[i2];
      let offset = char.position.x + lineAlignOffsets[char.line] * (this._align === "justify" ? char.prevSpaces : 1);
      this._roundPixels && (offset = Math.round(offset));
      const xPos = offset * scale, yPos = char.position.y * scale, texture = char.texture, pageMesh = pagesMeshData[texture.baseTexture.uid], textureFrame = texture.frame, textureUvs = texture._uvs, index = pageMesh.index++;
      pageMesh.indices[index * 6 + 0] = 0 + index * 4, pageMesh.indices[index * 6 + 1] = 1 + index * 4, pageMesh.indices[index * 6 + 2] = 2 + index * 4, pageMesh.indices[index * 6 + 3] = 0 + index * 4, pageMesh.indices[index * 6 + 4] = 2 + index * 4, pageMesh.indices[index * 6 + 5] = 3 + index * 4, pageMesh.vertices[index * 8 + 0] = xPos, pageMesh.vertices[index * 8 + 1] = yPos, pageMesh.vertices[index * 8 + 2] = xPos + textureFrame.width * scale, pageMesh.vertices[index * 8 + 3] = yPos, pageMesh.vertices[index * 8 + 4] = xPos + textureFrame.width * scale, pageMesh.vertices[index * 8 + 5] = yPos + textureFrame.height * scale, pageMesh.vertices[index * 8 + 6] = xPos, pageMesh.vertices[index * 8 + 7] = yPos + textureFrame.height * scale, pageMesh.uvs[index * 8 + 0] = textureUvs.x0, pageMesh.uvs[index * 8 + 1] = textureUvs.y0, pageMesh.uvs[index * 8 + 2] = textureUvs.x1, pageMesh.uvs[index * 8 + 3] = textureUvs.y1, pageMesh.uvs[index * 8 + 4] = textureUvs.x2, pageMesh.uvs[index * 8 + 5] = textureUvs.y2, pageMesh.uvs[index * 8 + 6] = textureUvs.x3, pageMesh.uvs[index * 8 + 7] = textureUvs.y3;
    }
    this._textWidth = maxLineWidth * scale, this._textHeight = (pos.y + data.lineHeight) * scale;
    for (const i2 in pagesMeshData) {
      const pageMeshData = pagesMeshData[i2];
      if (this.anchor.x !== 0 || this.anchor.y !== 0) {
        let vertexCount = 0;
        const anchorOffsetX = this._textWidth * this.anchor.x, anchorOffsetY = this._textHeight * this.anchor.y;
        for (let i22 = 0;i22 < pageMeshData.total; i22++)
          pageMeshData.vertices[vertexCount++] -= anchorOffsetX, pageMeshData.vertices[vertexCount++] -= anchorOffsetY, pageMeshData.vertices[vertexCount++] -= anchorOffsetX, pageMeshData.vertices[vertexCount++] -= anchorOffsetY, pageMeshData.vertices[vertexCount++] -= anchorOffsetX, pageMeshData.vertices[vertexCount++] -= anchorOffsetY, pageMeshData.vertices[vertexCount++] -= anchorOffsetX, pageMeshData.vertices[vertexCount++] -= anchorOffsetY;
      }
      this._maxLineHeight = maxLineHeight * scale;
      const vertexBuffer = pageMeshData.mesh.geometry.getBuffer("aVertexPosition"), textureBuffer = pageMeshData.mesh.geometry.getBuffer("aTextureCoord"), indexBuffer = pageMeshData.mesh.geometry.getIndex();
      vertexBuffer.data = pageMeshData.vertices, textureBuffer.data = pageMeshData.uvs, indexBuffer.data = pageMeshData.indices, vertexBuffer.update(), textureBuffer.update(), indexBuffer.update();
    }
    for (let i2 = 0;i2 < chars.length; i2++)
      charRenderDataPool.push(chars[i2]);
    this._font = data, this.dirty = false;
  }
  updateTransform() {
    this.validate(), this.containerUpdateTransform();
  }
  _render(renderer) {
    this._autoResolution && this._resolution !== renderer.resolution && (this._resolution = renderer.resolution, this.dirty = true);
    const { distanceFieldRange, distanceFieldType, size } = BitmapFont.available[this._fontName];
    if (distanceFieldType !== "none") {
      const { a: a2, b: b2, c: c2, d: d2 } = this.worldTransform, dx = Math.sqrt(a2 * a2 + b2 * b2), dy = Math.sqrt(c2 * c2 + d2 * d2), worldScale = (Math.abs(dx) + Math.abs(dy)) / 2, fontScale = this.fontSize / size, resolution = renderer._view.resolution;
      for (const mesh7 of this._activePagesMeshData)
        mesh7.mesh.shader.uniforms.uFWidth = worldScale * distanceFieldRange * fontScale * resolution;
    }
    super._render(renderer);
  }
  getLocalBounds() {
    return this.validate(), super.getLocalBounds();
  }
  validate() {
    const font = BitmapFont.available[this._fontName];
    if (!font)
      throw new Error(`Missing BitmapFont "${this._fontName}"`);
    this._font !== font && (this.dirty = true), this.dirty && this.updateText();
  }
  get tint() {
    return this._tintColor.value;
  }
  set tint(value) {
    if (this.tint !== value) {
      this._tintColor.setValue(value);
      for (let i2 = 0;i2 < this._activePagesMeshData.length; i2++)
        this._activePagesMeshData[i2].mesh.tint = value;
    }
  }
  get align() {
    return this._align;
  }
  set align(value) {
    this._align !== value && (this._align = value, this.dirty = true);
  }
  get fontName() {
    return this._fontName;
  }
  set fontName(value) {
    if (!BitmapFont.available[value])
      throw new Error(`Missing BitmapFont "${value}"`);
    this._fontName !== value && (this._fontName = value, this.dirty = true);
  }
  get fontSize() {
    return this._fontSize ?? BitmapFont.available[this._fontName].size;
  }
  set fontSize(value) {
    this._fontSize !== value && (this._fontSize = value, this.dirty = true);
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(value) {
    typeof value == "number" ? this._anchor.set(value) : this._anchor.copyFrom(value);
  }
  get text() {
    return this._text;
  }
  set text(text4) {
    text4 = String(text4 ?? ""), this._text !== text4 && (this._text = text4, this.dirty = true);
  }
  get maxWidth() {
    return this._maxWidth;
  }
  set maxWidth(value) {
    this._maxWidth !== value && (this._maxWidth = value, this.dirty = true);
  }
  get maxLineHeight() {
    return this.validate(), this._maxLineHeight;
  }
  get textWidth() {
    return this.validate(), this._textWidth;
  }
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(value) {
    this._letterSpacing !== value && (this._letterSpacing = value, this.dirty = true);
  }
  get roundPixels() {
    return this._roundPixels;
  }
  set roundPixels(value) {
    value !== this._roundPixels && (this._roundPixels = value, this.dirty = true);
  }
  get textHeight() {
    return this.validate(), this._textHeight;
  }
  get resolution() {
    return this._resolution;
  }
  set resolution(value) {
    this._autoResolution = false, this._resolution !== value && (this._resolution = value, this.dirty = true);
  }
  destroy(options) {
    const { _textureCache } = this, pageMeshDataPool = BitmapFont.available[this._fontName].distanceFieldType === "none" ? pageMeshDataDefaultPageMeshData : pageMeshDataMSDFPageMeshData;
    pageMeshDataPool.push(...this._activePagesMeshData);
    for (const pageMeshData of this._activePagesMeshData)
      this.removeChild(pageMeshData.mesh);
    this._activePagesMeshData = [], pageMeshDataPool.filter((page) => _textureCache[page.mesh.texture.baseTexture.uid]).forEach((page) => {
      page.mesh.texture = Texture.EMPTY;
    });
    for (const id in _textureCache)
      _textureCache[id].destroy(), delete _textureCache[id];
    this._font = null, this._tintColor = null, this._textureCache = null, super.destroy(options);
  }
};
_BitmapText.styleDefaults = {
  align: "left",
  tint: 16777215,
  maxWidth: 0,
  letterSpacing: 0
};

// node_modules/@pixi/text-bitmap/lib/loadBitmapFont.mjs
var validExtensions = [".xml", ".fnt"];
var loadBitmapFont = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Normal
  },
  name: "loadBitmapFont",
  test(url3) {
    return validExtensions.includes(exports_lib.path.extname(url3).toLowerCase());
  },
  async testParse(data) {
    return TextFormat.test(data) || XMLStringFormat.test(data);
  },
  async parse(asset, data, loader3) {
    const fontData = TextFormat.test(asset) ? TextFormat.parse(asset) : XMLStringFormat.parse(asset), { src } = data, { page: pages } = fontData, textureUrls = [];
    for (let i2 = 0;i2 < pages.length; ++i2) {
      const pageFile = pages[i2].file;
      let imagePath = exports_lib.path.join(exports_lib.path.dirname(src), pageFile);
      imagePath = copySearchParams(imagePath, src), textureUrls.push(imagePath);
    }
    const loadedTextures = await loader3.load(textureUrls), textures2 = textureUrls.map((url3) => loadedTextures[url3]);
    return BitmapFont.install(fontData, textures2, true);
  },
  async load(url3, _options) {
    return (await settings.ADAPTER.fetch(url3)).text();
  },
  unload(bitmapFont) {
    bitmapFont.destroy();
  }
};
extensions.add(loadBitmapFont);
// node_modules/@pixi/text-html/lib/HTMLTextStyle.mjs
var _HTMLTextStyle = class _HTMLTextStyle2 extends TextStyle {
  constructor() {
    super(...arguments), this._fonts = [], this._overrides = [], this._stylesheet = "", this.fontsDirty = false;
  }
  static from(originalStyle) {
    return new _HTMLTextStyle2(Object.keys(_HTMLTextStyle2.defaultOptions).reduce((obj, prop) => ({ ...obj, [prop]: originalStyle[prop] }), {}));
  }
  cleanFonts() {
    this._fonts.length > 0 && (this._fonts.forEach((font) => {
      URL.revokeObjectURL(font.src), font.refs--, font.refs === 0 && (font.fontFace && document.fonts.delete(font.fontFace), delete _HTMLTextStyle2.availableFonts[font.originalUrl]);
    }), this.fontFamily = "Arial", this._fonts.length = 0, this.styleID++, this.fontsDirty = true);
  }
  loadFont(url3, options = {}) {
    const { availableFonts } = _HTMLTextStyle2;
    if (availableFonts[url3]) {
      const font = availableFonts[url3];
      return this._fonts.push(font), font.refs++, this.styleID++, this.fontsDirty = true, Promise.resolve();
    }
    return settings.ADAPTER.fetch(url3).then((response) => response.blob()).then(async (blob) => new Promise((resolve, reject) => {
      const src = URL.createObjectURL(blob), reader = new FileReader;
      reader.onload = () => resolve([src, reader.result]), reader.onerror = reject, reader.readAsDataURL(blob);
    })).then(async ([src, dataSrc]) => {
      const font = Object.assign({
        family: exports_lib.path.basename(url3, exports_lib.path.extname(url3)),
        weight: "normal",
        style: "normal",
        display: "auto",
        src,
        dataSrc,
        refs: 1,
        originalUrl: url3,
        fontFace: null
      }, options);
      availableFonts[url3] = font, this._fonts.push(font), this.styleID++;
      const fontFace = new FontFace(font.family, `url(${font.src})`, {
        weight: font.weight,
        style: font.style,
        display: font.display
      });
      font.fontFace = fontFace, await fontFace.load(), document.fonts.add(fontFace), await document.fonts.ready, this.styleID++, this.fontsDirty = true;
    });
  }
  addOverride(...value) {
    const toAdd = value.filter((v2) => !this._overrides.includes(v2));
    toAdd.length > 0 && (this._overrides.push(...toAdd), this.styleID++);
  }
  removeOverride(...value) {
    const toRemove = value.filter((v2) => this._overrides.includes(v2));
    toRemove.length > 0 && (this._overrides = this._overrides.filter((v2) => !toRemove.includes(v2)), this.styleID++);
  }
  toCSS(scale) {
    return [
      `transform: scale(${scale})`,
      "transform-origin: top left",
      "display: inline-block",
      `color: ${this.normalizeColor(this.fill)}`,
      `font-size: ${this.fontSize}px`,
      `font-family: ${this.fontFamily}`,
      `font-weight: ${this.fontWeight}`,
      `font-style: ${this.fontStyle}`,
      `font-variant: ${this.fontVariant}`,
      `letter-spacing: ${this.letterSpacing}px`,
      `text-align: ${this.align}`,
      `padding: ${this.padding}px`,
      `white-space: ${this.whiteSpace}`,
      ...this.lineHeight ? [`line-height: ${this.lineHeight}px`] : [],
      ...this.wordWrap ? [
        `word-wrap: ${this.breakWords ? "break-all" : "break-word"}`,
        `max-width: ${this.wordWrapWidth}px`
      ] : [],
      ...this.strokeThickness ? [
        `-webkit-text-stroke-width: ${this.strokeThickness}px`,
        `-webkit-text-stroke-color: ${this.normalizeColor(this.stroke)}`,
        `text-stroke-width: ${this.strokeThickness}px`,
        `text-stroke-color: ${this.normalizeColor(this.stroke)}`,
        "paint-order: stroke"
      ] : [],
      ...this.dropShadow ? [this.dropShadowToCSS()] : [],
      ...this._overrides
    ].join(";");
  }
  toGlobalCSS() {
    return this._fonts.reduce((result, font) => `${result}
            @font-face {
                font-family: "${font.family}";
                src: url('${font.dataSrc}');
                font-weight: ${font.weight};
                font-style: ${font.style};
                font-display: ${font.display};
            }`, this._stylesheet);
  }
  get stylesheet() {
    return this._stylesheet;
  }
  set stylesheet(value) {
    this._stylesheet !== value && (this._stylesheet = value, this.styleID++);
  }
  normalizeColor(color8) {
    return Array.isArray(color8) && (color8 = exports_lib.rgb2hex(color8)), typeof color8 == "number" ? exports_lib.hex2string(color8) : color8;
  }
  dropShadowToCSS() {
    let color8 = this.normalizeColor(this.dropShadowColor);
    const alpha = this.dropShadowAlpha, x2 = Math.round(Math.cos(this.dropShadowAngle) * this.dropShadowDistance), y2 = Math.round(Math.sin(this.dropShadowAngle) * this.dropShadowDistance);
    color8.startsWith("#") && alpha < 1 && (color8 += (alpha * 255 | 0).toString(16).padStart(2, "0"));
    const position = `${x2}px ${y2}px`;
    return this.dropShadowBlur > 0 ? `text-shadow: ${position} ${this.dropShadowBlur}px ${color8}` : `text-shadow: ${position} ${color8}`;
  }
  reset() {
    Object.assign(this, _HTMLTextStyle2.defaultOptions);
  }
  onBeforeDraw() {
    const { fontsDirty: prevFontsDirty } = this;
    return this.fontsDirty = false, this.isSafari && this._fonts.length > 0 && prevFontsDirty ? new Promise((resolve) => setTimeout(resolve, 100)) : Promise.resolve();
  }
  get isSafari() {
    const { userAgent } = settings.ADAPTER.getNavigator();
    return /^((?!chrome|android).)*safari/i.test(userAgent);
  }
  set fillGradientStops(_value) {
    console.warn("[HTMLTextStyle] fillGradientStops is not supported by HTMLText");
  }
  get fillGradientStops() {
    return super.fillGradientStops;
  }
  set fillGradientType(_value) {
    console.warn("[HTMLTextStyle] fillGradientType is not supported by HTMLText");
  }
  get fillGradientType() {
    return super.fillGradientType;
  }
  set miterLimit(_value) {
    console.warn("[HTMLTextStyle] miterLimit is not supported by HTMLText");
  }
  get miterLimit() {
    return super.miterLimit;
  }
  set trim(_value) {
    console.warn("[HTMLTextStyle] trim is not supported by HTMLText");
  }
  get trim() {
    return super.trim;
  }
  set textBaseline(_value) {
    console.warn("[HTMLTextStyle] textBaseline is not supported by HTMLText");
  }
  get textBaseline() {
    return super.textBaseline;
  }
  set leading(_value) {
    console.warn("[HTMLTextStyle] leading is not supported by HTMLText");
  }
  get leading() {
    return super.leading;
  }
  set lineJoin(_value) {
    console.warn("[HTMLTextStyle] lineJoin is not supported by HTMLText");
  }
  get lineJoin() {
    return super.lineJoin;
  }
};
_HTMLTextStyle.availableFonts = {}, _HTMLTextStyle.defaultOptions = {
  align: "left",
  breakWords: false,
  dropShadow: false,
  dropShadowAlpha: 1,
  dropShadowAngle: Math.PI / 6,
  dropShadowBlur: 0,
  dropShadowColor: "black",
  dropShadowDistance: 5,
  fill: "black",
  fontFamily: "Arial",
  fontSize: 26,
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  letterSpacing: 0,
  lineHeight: 0,
  padding: 0,
  stroke: "black",
  strokeThickness: 0,
  whiteSpace: "normal",
  wordWrap: false,
  wordWrapWidth: 100
};
var HTMLTextStyle = _HTMLTextStyle;

// node_modules/@pixi/text-html/lib/HTMLText.mjs
var _HTMLText = class _HTMLText2 extends Sprite {
  constructor(text6 = "", style = {}) {
    super(Texture.EMPTY), this._text = null, this._style = null, this._autoResolution = true, this.localStyleID = -1, this.dirty = false, this._updateID = 0, this.ownsStyle = false;
    const image = new Image, texture = Texture.from(image, {
      scaleMode: settings.SCALE_MODE,
      resourceOptions: {
        autoLoad: false
      }
    });
    texture.orig = new Rectangle, texture.trim = new Rectangle, this.texture = texture;
    const nssvg = "http://www.w3.org/2000/svg", nsxhtml = "http://www.w3.org/1999/xhtml", svgRoot = document.createElementNS(nssvg, "svg"), foreignObject = document.createElementNS(nssvg, "foreignObject"), domElement = document.createElementNS(nsxhtml, "div"), styleElement = document.createElementNS(nsxhtml, "style");
    foreignObject.setAttribute("width", "10000"), foreignObject.setAttribute("height", "10000"), foreignObject.style.overflow = "hidden", svgRoot.appendChild(foreignObject), this.maxWidth = _HTMLText2.defaultMaxWidth, this.maxHeight = _HTMLText2.defaultMaxHeight, this._domElement = domElement, this._styleElement = styleElement, this._svgRoot = svgRoot, this._foreignObject = foreignObject, this._foreignObject.appendChild(styleElement), this._foreignObject.appendChild(domElement), this._image = image, this._loadImage = new Image, this._autoResolution = _HTMLText2.defaultAutoResolution, this._resolution = _HTMLText2.defaultResolution ?? settings.RESOLUTION, this.text = text6, this.style = style;
  }
  measureText(overrides) {
    const { text: text6, style, resolution } = Object.assign({
      text: this._text,
      style: this._style,
      resolution: this._resolution
    }, overrides);
    Object.assign(this._domElement, {
      innerHTML: text6,
      style: style.toCSS(resolution)
    }), this._styleElement.textContent = style.toGlobalCSS(), document.body.appendChild(this._svgRoot);
    const contentBounds = this._domElement.getBoundingClientRect();
    this._svgRoot.remove();
    const { width, height } = contentBounds;
    (width > this.maxWidth || height > this.maxHeight) && console.warn("[HTMLText] Large expanse of text, increase HTMLText.maxWidth or HTMLText.maxHeight property.");
    const contentWidth = Math.min(this.maxWidth, Math.ceil(width)), contentHeight = Math.min(this.maxHeight, Math.ceil(height));
    return this._svgRoot.setAttribute("width", contentWidth.toString()), this._svgRoot.setAttribute("height", contentHeight.toString()), text6 !== this._text && (this._domElement.innerHTML = this._text), style !== this._style && (Object.assign(this._domElement, { style: this._style?.toCSS(resolution) }), this._styleElement.textContent = this._style?.toGlobalCSS()), {
      width: contentWidth + style.padding * 2,
      height: contentHeight + style.padding * 2
    };
  }
  async updateText(respectDirty = true) {
    const { style, _image: image, _loadImage: loadImage } = this;
    if (this.localStyleID !== style.styleID && (this.dirty = true, this.localStyleID = style.styleID), !this.dirty && respectDirty)
      return;
    const { width, height } = this.measureText();
    image.width = loadImage.width = Math.ceil(Math.max(1, width)), image.height = loadImage.height = Math.ceil(Math.max(1, height)), this._updateID++;
    const updateID = this._updateID;
    await new Promise((resolve) => {
      loadImage.onload = async () => {
        if (updateID < this._updateID) {
          resolve();
          return;
        }
        await style.onBeforeDraw(), image.src = loadImage.src, loadImage.onload = null, loadImage.src = "", this.updateTexture(), resolve();
      };
      const svgURL = new XMLSerializer().serializeToString(this._svgRoot);
      loadImage.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(svgURL)}`;
    });
  }
  get source() {
    return this._image;
  }
  updateTexture() {
    const { style, texture, _image: image, resolution } = this, { padding } = style, { baseTexture } = texture;
    texture.trim.width = texture._frame.width = image.width / resolution, texture.trim.height = texture._frame.height = image.height / resolution, texture.trim.x = -padding, texture.trim.y = -padding, texture.orig.width = texture._frame.width - padding * 2, texture.orig.height = texture._frame.height - padding * 2, this._onTextureUpdate(), baseTexture.setRealSize(image.width, image.height, resolution), this.dirty = false;
  }
  _render(renderer) {
    this._autoResolution && this._resolution !== renderer.resolution && (this._resolution = renderer.resolution, this.dirty = true), this.updateText(true), super._render(renderer);
  }
  _renderCanvas(renderer) {
    this._autoResolution && this._resolution !== renderer.resolution && (this._resolution = renderer.resolution, this.dirty = true), this.updateText(true), super._renderCanvas(renderer);
  }
  getLocalBounds(rect) {
    return this.updateText(true), super.getLocalBounds(rect);
  }
  _calculateBounds() {
    this.updateText(true), this.calculateVertices(), this._bounds.addQuad(this.vertexData);
  }
  _onStyleChange() {
    this.dirty = true;
  }
  destroy(options) {
    typeof options == "boolean" && (options = { children: options }), options = Object.assign({}, _HTMLText2.defaultDestroyOptions, options), super.destroy(options);
    const forceClear = null;
    this.ownsStyle && this._style?.cleanFonts(), this._style = forceClear, this._svgRoot?.remove(), this._svgRoot = forceClear, this._domElement?.remove(), this._domElement = forceClear, this._foreignObject?.remove(), this._foreignObject = forceClear, this._styleElement?.remove(), this._styleElement = forceClear, this._loadImage.src = "", this._loadImage.onload = null, this._loadImage = forceClear, this._image.src = "", this._image = forceClear;
  }
  get width() {
    return this.updateText(true), Math.abs(this.scale.x) * this._image.width / this.resolution;
  }
  set width(value) {
    this.updateText(true);
    const s2 = exports_lib.sign(this.scale.x) || 1;
    this.scale.x = s2 * value / this._image.width / this.resolution, this._width = value;
  }
  get height() {
    return this.updateText(true), Math.abs(this.scale.y) * this._image.height / this.resolution;
  }
  set height(value) {
    this.updateText(true);
    const s2 = exports_lib.sign(this.scale.y) || 1;
    this.scale.y = s2 * value / this._image.height / this.resolution, this._height = value;
  }
  get style() {
    return this._style;
  }
  set style(style) {
    this._style !== style && (style = style || {}, style instanceof HTMLTextStyle ? (this.ownsStyle = false, this._style = style) : style instanceof TextStyle ? (console.warn("[HTMLText] Cloning TextStyle, if this is not what you want, use HTMLTextStyle"), this.ownsStyle = true, this._style = HTMLTextStyle.from(style)) : (this.ownsStyle = true, this._style = new HTMLTextStyle(style)), this.localStyleID = -1, this.dirty = true);
  }
  get text() {
    return this._text;
  }
  set text(text6) {
    text6 = String(text6 === "" || text6 === null || text6 === undefined ? " " : text6), text6 = this.sanitiseText(text6), this._text !== text6 && (this._text = text6, this.dirty = true);
  }
  get resolution() {
    return this._resolution;
  }
  set resolution(value) {
    this._autoResolution = false, this._resolution !== value && (this._resolution = value, this.dirty = true);
  }
  sanitiseText(text6) {
    return text6.replace(/<br>/gi, "<br/>").replace(/<hr>/gi, "<hr/>").replace(/&nbsp;/gi, "&#160;");
  }
};
_HTMLText.defaultDestroyOptions = {
  texture: true,
  children: false,
  baseTexture: true
}, _HTMLText.defaultMaxWidth = 2024, _HTMLText.defaultMaxHeight = 2024, _HTMLText.defaultAutoResolution = true;
// src/Manager.ts
class Manager {
  constructor() {
  }
  static app;
  static currentScene;
  static get width() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }
  static get height() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }
  static initialize(background) {
    Manager.app = new Application({
      view: document.getElementById("pixi-canvas"),
      resizeTo: window,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: background
    });
    Manager.app.ticker.add(Manager.update);
    window.addEventListener("resize", Manager.resize);
    Manager.resize();
  }
  static resize() {
    if (Manager.currentScene) {
      Manager.currentScene.resize(Manager.width, Manager.height);
    }
    const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);
    const enlargedWidth = Math.floor(scale * Manager.width);
    const enlargedHeight = Math.floor(scale * Manager.height);
    const horizontalMargin = (screenWidth - enlargedWidth) / 2;
    const verticalMargin = (screenHeight - enlargedHeight) / 2;
    Manager.app.view.style.width = `${enlargedWidth}px`;
    Manager.app.view.style.height = `${enlargedHeight}px`;
    Manager.app.view.style.marginLeft = Manager.app.view.style.marginRight = `${horizontalMargin}px`;
    Manager.app.view.style.marginTop = Manager.app.view.style.marginBottom = `${verticalMargin}px`;
  }
  static changeScene(newScene) {
    if (Manager.currentScene) {
      Manager.app.stage.removeChild(Manager.currentScene);
      Manager.currentScene.destroy();
    }
    Manager.currentScene = newScene;
    Manager.app.stage.addChild(Manager.currentScene);
  }
  static update(framesPassed) {
    if (Manager.currentScene) {
      Manager.currentScene.update(framesPassed);
    }
  }
}

// src/assets.ts
var manifest = {
  bundles: [
    {
      name: "bundleName",
      assets: {
        bunny: "/images/bunny.png"
      }
    }
  ]
};

// src/scenes/GameScene.ts
class GameScene extends Container {
  clampy;
  constructor() {
    super();
    this.clampy = Sprite.from("bunny");
    this.clampy.anchor.set(0.5);
    this.clampy.x = Manager.width / 2;
    this.clampy.y = Manager.height / 2;
    this.addChild(this.clampy);
  }
  update(framesPassed) {
    this.clampy.rotation += 0.01;
  }
  resize(screenWidth, screenHeight) {
    this.clampy.x = screenWidth / 2;
    this.clampy.y = screenHeight / 2;
  }
}

// src/scenes/LoaderScene.ts
class LoaderScene extends Container {
  loaderBar;
  loaderBarBoder;
  loaderBarFill;
  constructor() {
    super();
    const loaderBarWidth = Manager.width * 0.8;
    this.loaderBarFill = new Graphics;
    this.loaderBarFill.beginFill(34816, 1);
    this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
    this.loaderBarFill.endFill();
    this.loaderBarFill.scale.x = 0;
    this.loaderBarBoder = new Graphics;
    this.loaderBarBoder.lineStyle(10, 0, 1);
    this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, 50);
    this.loaderBar = new Container;
    this.loaderBar.addChild(this.loaderBarFill);
    this.loaderBar.addChild(this.loaderBarBoder);
    this.loaderBar.position.x = (Manager.width - this.loaderBar.width) / 2;
    this.loaderBar.position.y = (Manager.height - this.loaderBar.height) / 2;
    this.addChild(this.loaderBar);
    this.initializeLoader().then(() => {
      this.gameLoaded();
    });
  }
  async initializeLoader() {
    await Assets.init({ manifest });
    const bundleIds = manifest.bundles.map((bundle) => bundle.name);
    await Assets.loadBundle(bundleIds, this.downloadProgress.bind(this));
  }
  downloadProgress(progressRatio) {
    this.loaderBarFill.scale.x = progressRatio;
  }
  gameLoaded() {
    Manager.changeScene(new GameScene);
  }
  update(framesPassed) {
  }
  resize(screenWidth, screenHeight) {
  }
}

// src/client.ts
Manager.initialize(6591981);
var loady = new LoaderScene;
Manager.changeScene(loady);

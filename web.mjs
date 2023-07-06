"use strict";
function require( path ){ return $node[ path ] };

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../" ) ] }; 
;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;
//mam.ts
;

$node[ "../mam.ts" ] = $node[ "../mam.ts" ] = module.exports }.call( {} , {} )
;
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));
//mol/ambient/ambient.ts
;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));
//mol/delegate/delegate.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object')
                return false;
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));
//mol/owning/owning.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));
//mol/fail/fail.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error;
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));
//mol/fail/hidden/hidden.ts
;
"use strict";
//mol/type/writable/writable.ts
;
"use strict";
var $;
(function ($) {
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            if (Symbol.toStringTag in this)
                return this[Symbol.toStringTag];
            return this.name;
        }
        destructor() { }
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '()';
        }
        toJSON() {
            return this.toString();
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));
//mol/object2/object2.ts
;
"use strict";
var $;
(function ($) {
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));
//mol/wire/cursor/cursor.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub extends Object {
        data = [];
        static get [Symbol.species]() {
            return Array;
        }
        sub_from = 0;
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.pop();
            this.data.pop();
            if (this.data.length === this.sub_from)
                this.reap();
        }
        reap() { }
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        fresh() { }
        complete() { }
        get incompleted() {
            return false;
        }
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant);
            }
        }
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));
//mol/wire/pub/pub.ts
;
"use strict";
//mol/wire/sub/sub.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_wire_auto_sub = null;
    function $mol_wire_auto(next = $.$mol_wire_auto_sub) {
        return $.$mol_wire_auto_sub = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    $.$mol_wire_affected = [];
})($ || ($ = {}));
//mol/wire/wire.ts
;
"use strict";
var $;
(function ($) {
    $['devtoolsFormatters'] ||= [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                return val[$.$mol_dev_format_head]();
            }
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: val => val[$.$mol_dev_format_body],
        body: val => val[$.$mol_dev_format_body](),
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        if (typeof obj !== 'object' && typeof obj !== 'function')
            return obj;
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        if (typeof obj === 'object' && $.$mol_dev_format_head in obj) {
            return obj[$.$mol_dev_format_head]();
        }
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    function $mol_dev_format_span(style, ...content) {
        return $mol_dev_format_element('span', {
            'vertical-align': '8%',
            ...style,
        }, ...content);
    }
    $.$mol_dev_format_span = $mol_dev_format_span;
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-left': '13px'
    });
})($ || ($ = {}));
//mol/dev/format/format.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0;
        cursor = $mol_wire_cursor.stale;
        get temp() {
            return false;
        }
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                if (this.data[i])
                    res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
                this.data.pop();
                this.data.pop();
            }
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.final;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let tail = 0;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.data.length - 2, cursor);
                    this.data.pop();
                    this.data.pop();
                }
                else {
                    ++tail;
                }
            }
            for (; tail; --tail) {
                this.data.pop();
                this.data.pop();
            }
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                if (pub?.incompleted)
                    return;
            }
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));
//mol/wire/pub/sub/sub.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_object2 {
        task;
        static _promise = null;
        static get promise() {
            if (this._promise)
                return this._promise;
            return this._promise = new Promise(done => {
                const complete = () => {
                    this._promise = null;
                    done();
                };
                if (typeof requestAnimationFrame === 'function') {
                    requestAnimationFrame(complete);
                }
                else {
                    setTimeout(complete, 16);
                }
            });
        }
        cancelled = false;
        promise;
        constructor(task) {
            super();
            this.task = task;
            this.promise = $mol_after_frame.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));
//mol/after/frame/frame.web.ts
;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        return val && typeof val.then === 'function';
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));
//mol/promise/like/like.ts
;
"use strict";
var $;
(function ($) {
    const handled = new WeakSet();
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_frame(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        [Symbol.toStringTag];
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if ($mol_promise_like(this.cache))
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        get incompleted() {
            return $mol_promise_like(this.cache);
        }
        field() {
            return this.task.name + '()';
        }
        constructor(id, task, host, args) {
            super();
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
            this[Symbol.toStringTag] = id;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_dev_format_native(this), $mol_dev_format_shade(cursor + ' '), $mol_dev_format_auto(this.cache));
        }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if ($mol_promise_like(result)) {
                    const put = (res) => {
                        if (this.cache === result)
                            this.put(res);
                        return res;
                    };
                    result = Object.assign(result.then(put, put), {
                        destructor: result['destructor'] ?? (() => { })
                    });
                    handled.add(result);
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result) && !handled.has(result)) {
                    result = Object.assign(result.finally(() => {
                        if (this.cache === result)
                            this.absorb();
                    }), {
                        destructor: result['destructor'] ?? (() => { })
                    });
                    handled.add(result);
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if ($mol_promise_like(this.cache)) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        async async() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                await this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    await new Promise(() => { });
                }
            }
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));
//mol/wire/fiber/fiber.ts
;
"use strict";
var $;
(function ($) {
    const named = new WeakSet();
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        if (named.has(func))
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        named.add(func);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));
//mol/func/name/name.ts
;
"use strict";
var $;
(function ($) {
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));
//mol/guid/guid.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_key_store = new WeakMap();
    function $mol_key(value) {
        if (!value)
            return JSON.stringify(value);
        if (typeof value !== 'object' && typeof value !== 'function')
            return JSON.stringify(value);
        return JSON.stringify(value, (field, value) => {
            if (!value)
                return value;
            if (typeof value !== 'object' && typeof value !== 'function')
                return value;
            if (Array.isArray(value))
                return value;
            const proto = Reflect.getPrototypeOf(value);
            if (!proto)
                return value;
            if (Reflect.getPrototypeOf(proto) === null)
                return value;
            if ('toJSON' in value)
                return value;
            if (value instanceof RegExp)
                return value.toString();
            let key = $.$mol_key_store.get(value);
            if (key)
                return key;
            key = $mol_guid();
            $.$mol_key_store.set(value, key);
            return key;
        });
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));
//mol/key/key.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right.source && left.flags === right.flags;
        if (left instanceof Error)
            return left.message === right.message && left.stack === right.stack;
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap([[right, true]]);
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        let result;
        try {
            if (!left_proto)
                result = compare_pojo(left, right);
            else if (!Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.iterator in left)
                result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (!compare_array(left_keys, right_keys))
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        const left_syms = Object.getOwnPropertySymbols(left);
        const right_syms = Object.getOwnPropertySymbols(right);
        if (!compare_array(left_syms, right_syms))
            return false;
        for (let key of left_syms) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));
//mol/compare/deep/deep.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.host !== host)
                        break reuse;
                    if (existen.task !== task)
                        break reuse;
                    if (!$mol_compare_deep(existen.args, args))
                        break reuse;
                    return existen;
                }
                return new $mol_wire_task(`${host?.[Symbol.toStringTag] ?? host}.${task.name}(#)`, task, host, args);
            };
        }
        get temp() {
            return true;
        }
        complete() {
            if ($mol_promise_like(this.cache))
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if ($mol_promise_like(next)) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));
//mol/wire/task/task.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));
//mol/wire/method/method.ts
;
"use strict";
//mol/type/tail/tail.ts
;
"use strict";
//mol/type/foot/foot.ts
;
"use strict";
var $;
(function ($) {
    const catched = new WeakMap();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.get(error))
            return false;
        catched.set(error, true);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));
//mol/fail/catch/catch.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        console.error(error);
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));
//mol/fail/log/log.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '()';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = `${prefix}.${field}`;
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '()';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const id = `${prefix}.${task.name}(${$mol_key(key)})`;
            if (dict) {
                const existen = dict.get(id);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(id, fiber);
            return fiber;
        }
        static watching = new Set();
        static watcher = null;
        static watch() {
            $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            if (!$mol_wire_atom.watcher) {
                $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            }
            $mol_wire_atom.watching.add(this);
        }
        resync(args) {
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        channel() {
            return Object.assign((next) => {
                if (next !== undefined)
                    return this.resync([...this.args, next]);
                if (!$mol_wire_fiber.warm)
                    return this.result();
                if ($mol_wire_auto()?.temp) {
                    return this.once();
                }
                else {
                    return this.sync();
                }
            }, { atom: this });
        }
        destructor() {
            super.destructor();
            const prev = this.cache;
            if ($mol_owning_check(this, prev)) {
                prev.destructor();
            }
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                ;
                (this.host ?? this.task)[this.field()].delete(this[Symbol.toStringTag]);
            }
        }
        put(next) {
            const prev = this.cache;
            update: if (next !== prev) {
                try {
                    if ($mol_compare_deep(prev, next))
                        break update;
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch {
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (!this.sub_empty)
                    this.emit();
            }
            this.cache = next;
            this.cursor = $mol_wire_cursor.fresh;
            if ($mol_promise_like(next))
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
})($ || ($ = {}));
//mol/wire/atom/atom.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));
//mol/wire/solo/solo.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));
//mol/wire/plex/plex.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_mem = $mol_wire_solo;
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));
//mol/mem/mem.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));
//mol/action/action.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                const fiber = temp(self, args);
                return fiber.sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));
//mol/wire/sync/sync.ts
;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));
//mol/dom/context/context.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = self;
})($ || ($ = {}));
//mol/dom/context/context.web.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_parse(text, type = 'application/xhtml+xml') {
        const parser = new $mol_dom_context.DOMParser();
        const doc = parser.parseFromString(text, type);
        const error = doc.getElementsByTagName('parsererror');
        if (error.length)
            throw new Error(error[0].textContent);
        return doc;
    }
    $.$mol_dom_parse = $mol_dom_parse;
})($ || ($ = {}));
//mol/dom/parse/parse.ts
;
"use strict";
//node/node.ts
;
"use strict";
var $node = $node || {};
//node/node.web.ts
;
"use strict";
var $;
(function ($) {
    class $mol_fetch_response extends $mol_object2 {
        native;
        constructor(native) {
            super();
            this.native = native;
        }
        status() {
            const types = ['unknown', 'inform', 'success', 'redirect', 'wrong', 'failed'];
            return types[Math.floor(this.native.status / 100)];
        }
        code() {
            return this.native.status;
        }
        message() {
            return this.native.statusText || `HTTP Error ${this.code()}`;
        }
        headers() {
            return this.native.headers;
        }
        mime() {
            return this.headers().get('content-type');
        }
        stream() {
            return this.native.body;
        }
        text() {
            const buffer = this.buffer();
            const native = this.native;
            const mime = native.headers.get('content-type') || '';
            const [, charset] = /charset=(.*)/.exec(mime) || [, 'utf-8'];
            const decoder = new TextDecoder(charset);
            return decoder.decode(buffer);
        }
        json() {
            return $mol_wire_sync(this.native).json();
        }
        buffer() {
            return $mol_wire_sync(this.native).arrayBuffer();
        }
        xml() {
            return $mol_dom_parse(this.text(), 'application/xml');
        }
        xhtml() {
            return $mol_dom_parse(this.text(), 'application/xhtml+xml');
        }
        html() {
            return $mol_dom_parse(this.text(), 'text/html');
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "stream", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "text", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xhtml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "html", null);
    $.$mol_fetch_response = $mol_fetch_response;
    class $mol_fetch extends $mol_object2 {
        static request(input, init = {}) {
            const native = globalThis.fetch ?? $node['undici'].fetch;
            const controller = new AbortController();
            let done = false;
            const promise = native(input, {
                ...init,
                signal: controller.signal,
            }).finally(() => {
                done = true;
            });
            return Object.assign(promise, {
                destructor: () => {
                    if (!done && !controller.signal.aborted)
                        controller.abort();
                },
            });
        }
        static response(input, init) {
            return new $mol_fetch_response($mol_wire_sync(this).request(input, init));
        }
        static success(input, init) {
            const response = this.response(input, init);
            if (response.status() === 'success')
                return response;
            throw new Error(response.message());
        }
        static stream(input, init) {
            return this.success(input, init).stream();
        }
        static text(input, init) {
            return this.success(input, init).text();
        }
        static json(input, init) {
            return this.success(input, init).json();
        }
        static buffer(input, init) {
            return this.success(input, init).buffer();
        }
        static xml(input, init) {
            return this.success(input, init).xml();
        }
        static xhtml(input, init) {
            return this.success(input, init).xhtml();
        }
        static html(input, init) {
            return this.success(input, init).html();
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch, "response", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "success", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "stream", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "text", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "json", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "xml", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "xhtml", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "html", null);
    $.$mol_fetch = $mol_fetch;
})($ || ($ = {}));
//mol/fetch/fetch.ts
;
"use strict";
var $;
(function ($) {
    class ErrorResponse extends Error {
        constructor(message, options) {
            super(message, options);
        }
        response = null;
    }
    $.ErrorResponse = ErrorResponse;
    class $milkywaystd_fetch extends $mol_fetch {
        static success(input, init) {
            const response = this.response(input, init);
            if (response.status() === 'success')
                return response;
            const error = new ErrorResponse(response.message());
            error.response = response;
            throw error;
        }
        static response(input, init) {
            return new $milkywaystd_fetch_response($mol_wire_sync(this).request(input, init));
        }
    }
    __decorate([
        $mol_action
    ], $milkywaystd_fetch, "success", null);
    __decorate([
        $mol_action
    ], $milkywaystd_fetch, "response", null);
    $.$milkywaystd_fetch = $milkywaystd_fetch;
    class $milkywaystd_fetch_response extends $mol_fetch_response {
        json() {
            return $mol_wire_sync($mol_wire_sync(this.native).clone()).json();
        }
    }
    $.$milkywaystd_fetch_response = $milkywaystd_fetch_response;
})($ || ($ = {}));
//milkywaystd/fetch/fetch.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));
//mol/wire/async/async.ts
;
"use strict";
var $;
(function ($) {
    function $mol_promise() {
        let done;
        let fail;
        const promise = new Promise((d, f) => {
            done = d;
            fail = f;
        });
        return Object.assign(promise, {
            done,
            fail,
        });
    }
    $.$mol_promise = $mol_promise;
})($ || ($ = {}));
//mol/promise/promise/promise.ts
;
"use strict";
var $;
(function ($) {
    let $milkywaystd_crud_events;
    (function ($milkywaystd_crud_events) {
        $milkywaystd_crud_events[$milkywaystd_crud_events["FETCH_LIST_START"] = 0] = "FETCH_LIST_START";
        $milkywaystd_crud_events[$milkywaystd_crud_events["FETCH_LIST_END"] = 1] = "FETCH_LIST_END";
        $milkywaystd_crud_events[$milkywaystd_crud_events["FETCH_LIST_ERROR"] = 2] = "FETCH_LIST_ERROR";
        $milkywaystd_crud_events[$milkywaystd_crud_events["ONE_FETCH_START"] = 3] = "ONE_FETCH_START";
        $milkywaystd_crud_events[$milkywaystd_crud_events["ONE_FETCH_END"] = 4] = "ONE_FETCH_END";
        $milkywaystd_crud_events[$milkywaystd_crud_events["ONE_FETCH_ERROR"] = 5] = "ONE_FETCH_ERROR";
        $milkywaystd_crud_events[$milkywaystd_crud_events["ONE_REPLACE_START"] = 6] = "ONE_REPLACE_START";
        $milkywaystd_crud_events[$milkywaystd_crud_events["ONE_REPLACE_END"] = 7] = "ONE_REPLACE_END";
        $milkywaystd_crud_events[$milkywaystd_crud_events["ONE_REPLACE_ERROR"] = 8] = "ONE_REPLACE_ERROR";
        $milkywaystd_crud_events[$milkywaystd_crud_events["ONE_UPDATE_START"] = 9] = "ONE_UPDATE_START";
        $milkywaystd_crud_events[$milkywaystd_crud_events["ONE_UPDATE_END"] = 10] = "ONE_UPDATE_END";
        $milkywaystd_crud_events[$milkywaystd_crud_events["ONE_UPDATE_ERROR"] = 11] = "ONE_UPDATE_ERROR";
        $milkywaystd_crud_events[$milkywaystd_crud_events["ONE_DELETE_START"] = 12] = "ONE_DELETE_START";
        $milkywaystd_crud_events[$milkywaystd_crud_events["ONE_DELETE_END"] = 13] = "ONE_DELETE_END";
        $milkywaystd_crud_events[$milkywaystd_crud_events["ONE_DELETE_ERROR"] = 14] = "ONE_DELETE_ERROR";
        $milkywaystd_crud_events[$milkywaystd_crud_events["CREATE_START"] = 15] = "CREATE_START";
        $milkywaystd_crud_events[$milkywaystd_crud_events["CREATE_END"] = 16] = "CREATE_END";
        $milkywaystd_crud_events[$milkywaystd_crud_events["CREATE_ERROR"] = 17] = "CREATE_ERROR";
    })($milkywaystd_crud_events = $.$milkywaystd_crud_events || ($.$milkywaystd_crud_events = {}));
    class $milkywaystd_crud extends $.$mol_object2 {
        _headers = {
            "Content-Type": "application/json",
        };
        headers(value) {
            if (value !== undefined) {
                this._headers = { ...value, ...this._headers };
            }
            return this._headers;
        }
        _apiUrl = "";
        get apiUrl() {
            return this._apiUrl;
        }
        set apiUrl(value) {
            this._apiUrl = value;
        }
        _apiResource = "";
        get apiResource() {
            return this._apiResource;
        }
        set apiResource(value) {
            this._apiResource = value;
        }
        _idKey = "id";
        get idKey() {
            return this._idKey;
        }
        set idKey(value) {
            this._idKey = value;
        }
        params(obj) {
            return obj ?? {};
        }
        customUrlFunc = null;
        listDataFunc = (data) => data;
        listMetaFunc = (data) => data;
        oneItemFunc = (data) => data;
        processErrorFunc = (error) => error;
        packPostData = (data) => data;
        packUpdateData = (data) => data;
        packReplaceData = (data) => data;
        url() {
            if (this.customUrlFunc) {
                return this.customUrlFunc();
            }
            if (!this.apiUrl) {
                $mol_fail("Api url is not defined");
            }
            if (!this.apiResource) {
                $mol_fail("Api resource is not defined");
            }
            let url = `${this.apiUrl.replace(/[\/]+$/gm, "")}/${this.apiResource.replace(/[\/]+$|^[\/]+/gm, "")}`;
            return url;
        }
        urlList() {
            let url = this.url();
            const params = new URLSearchParams();
            const params_obj = this.params();
            for (const param_key in params_obj) {
                params.append(param_key, params_obj[param_key]);
            }
            url += `?${params.toString()}`;
            return url;
        }
        urlOne(id) {
            if (!id) {
                throw new Error("id id empty");
            }
            let url = this.url();
            url += `/${id}`;
            return url;
        }
        metaInfo(value) {
            return value ?? {};
        }
        _creatingId = "";
        creatingId(val) {
            if (undefined !== val) {
                this._creatingId = val;
            }
            return this._creatingId;
        }
        _keyCache = new Map();
        dataKeys() {
            const obj = {};
            for (const iterator of this.list()) {
                obj[`${iterator[this.idKey]}`] = iterator;
            }
            return obj;
        }
        _cachedObject = new Map();
        getCachedObject(id) {
            return this._cachedObject.get(id);
        }
        setCachedObject(id, val) {
            return this._cachedObject.set(id, val);
        }
        prependToList(data) {
            const list = [data, ...this.list()];
            this.list(list);
        }
        appendToList(data) {
            const list = [...this.list(), data];
            this.list(list);
        }
        removeFromList(id) {
            const list = [...this.list()];
            const idx = list.findIndex((el) => `${el[this.idKey]}` === `${id}`);
            if (idx === -1) {
                return false;
            }
            list.splice(idx, 1);
            this.list(list);
            return true;
        }
        replaceListItem(replaceId, data) {
            const list = [...this.list()];
            const idx = list.findIndex((el) => `${el[this.idKey]}` === `${replaceId}`);
            if (idx === -1) {
                return false;
            }
            if (data[this.idKey] === undefined) {
                data[this.idKey] = replaceId;
            }
            list[idx] = data;
            this.list(list);
            return true;
        }
        list(data) {
            if (undefined !== data) {
                return data;
            }
            this.reset();
            this.urlList();
            return this.fetchList();
        }
        byId(id, val) {
            if (val !== undefined)
                return val;
            let p = this.dataKeys()[`${id}`];
            return p && p._error ? p._error : p;
        }
        byServerId(id) {
            return this.fetchOne(id);
        }
        byIdR(id, val) {
            this.dataKeys();
            if (val) {
                return val;
            }
            let p = this.dataKeys()[`${id}`];
            if (!p) {
            }
            if (!p) {
                p = this.fetchOne(id);
            }
            return p && p._error ? p._error : p;
        }
        creatingChannel(id, val) {
            return val ?? null;
        }
        fetchList() {
            try {
                this.isPending(true);
                this.trackEvent("list", $milkywaystd_crud_events.FETCH_LIST_START);
                var response = this.$.$milkywaystd_fetch.json(this.urlList(), {
                    method: "GET",
                    headers: { ...this.headers() },
                });
                this.trackEvent("list", $milkywaystd_crud_events.FETCH_LIST_END);
                this.isPending(false);
            }
            catch (error) {
                $mol_fail_catch(error);
                this.trackEvent("list", $milkywaystd_crud_events.FETCH_LIST_ERROR, error);
                this.isPending(false);
                $mol_fail_hidden(this.processErrorFunc(error));
            }
            this.metaInfo(this.listMetaFunc(response));
            const list = this.listDataFunc(response);
            return list;
        }
        fetchOne(id) {
            try {
                this.isPending(true);
                this.trackEvent(id, $milkywaystd_crud_events.ONE_FETCH_START);
                var response = this.$.$milkywaystd_fetch.json(this.urlOne(id), {
                    method: "GET",
                    headers: { ...this.headers() },
                });
                this.isPending(false);
                this.trackEvent(id, $milkywaystd_crud_events.ONE_FETCH_END);
            }
            catch (error) {
                $mol_fail_catch(error);
                this.isPending(false);
                this.trackEvent(id, $milkywaystd_crud_events.ONE_FETCH_ERROR, error);
                $mol_fail_hidden(this.processErrorFunc(error));
            }
            const r = this.oneItemFunc(response);
            return r;
        }
        create(item, id) {
            try {
                this.isPending(true);
                if (id) {
                    this.trackEvent(id, $milkywaystd_crud_events.CREATE_START);
                }
                var response = this.$.$milkywaystd_fetch.json(this.url(), {
                    method: "POST",
                    body: JSON.stringify(this.packPostData(item)),
                    headers: this.headers(),
                });
                this.isPending(false);
                if (id) {
                    this.trackEvent(id, $milkywaystd_crud_events.CREATE_END);
                }
            }
            catch (error) {
                $mol_fail_catch(error);
                this.isPending(false);
                if (id) {
                    this.trackEvent(id, $milkywaystd_crud_events.CREATE_ERROR, error);
                }
                $mol_fail_hidden(this.processErrorFunc(error));
            }
            const r = this.oneItemFunc(response);
            if (`${r[this.idKey]}` !== `${id}`) {
                this.creatingChannel(`${id}`, r);
                this.replaceListItem(`${id}`, r);
            }
            return r;
        }
        updateOne(id, item) {
            return this.editFn(id, item, "PATCH");
        }
        replaceOne(id, item) {
            return this.editFn(id, item, "PUT");
        }
        deleteOne(id) {
            try {
                this.isPending(true);
                this.trackEvent(id, $milkywaystd_crud_events.ONE_DELETE_START);
                this.$.$milkywaystd_fetch.json(this.urlOne(id), {
                    method: "DELETE",
                    headers: this.headers(),
                });
                this.isPending(false);
                this.trackEvent(id, $milkywaystd_crud_events.ONE_DELETE_END);
            }
            catch (error) {
                $mol_fail_catch(error);
                this.isPending(false);
                this.trackEvent(id, $milkywaystd_crud_events.ONE_DELETE_ERROR, error);
                $mol_fail_hidden(this.processErrorFunc(error));
            }
            this.removeListItem(id);
            return true;
        }
        editFn(id, item, method) {
            try {
                this.isPending(true);
                this.trackEvent(id, method === "PATCH"
                    ? $milkywaystd_crud_events.ONE_UPDATE_START
                    : $milkywaystd_crud_events.ONE_REPLACE_START);
                var response = this.$.$milkywaystd_fetch.json(this.urlOne(id), {
                    method: method,
                    body: JSON.stringify(method === "PATCH"
                        ? this.packUpdateData(item)
                        : this.packReplaceData(item)),
                    headers: this.headers(),
                });
                this.isPending(false);
                this.trackEvent(id, method === "PATCH"
                    ? $milkywaystd_crud_events.ONE_UPDATE_END
                    : $milkywaystd_crud_events.ONE_REPLACE_END);
            }
            catch (error) {
                $mol_fail_catch(error);
                this.isPending(false);
                this.trackEvent(id, method === "PATCH"
                    ? $milkywaystd_crud_events.ONE_UPDATE_ERROR
                    : $milkywaystd_crud_events.ONE_REPLACE_ERROR, error);
                $mol_fail_hidden(this.processErrorFunc(error));
            }
            const r = this.oneItemFunc(response);
            this.updateListItem(r);
            return r;
        }
        updateListItem(item) {
            const list = [...this.list()];
            const exist = list.findIndex((el) => `${el[this.idKey]}` === `${item[this.idKey]}`);
            if (exist !== -1) {
                list[exist] = item;
                this.list(list);
            }
        }
        removeListItem(id) {
            let list = [...this.list()];
            const exist = list.findIndex((el) => `${el[this.idKey]}` === `${id}`);
            if (exist !== -1) {
                list.splice(exist, 1);
                this.list(list);
            }
        }
        isPending(status) {
            if (status !== undefined) {
                if (status) {
                    setTimeout(() => {
                        $mol_wire_async(this).pendingChanel($mol_promise());
                    }, 0);
                }
                else {
                    setTimeout(() => {
                        $mol_wire_async(this).pendingChanel(false);
                    }, 0);
                }
            }
            return status !== undefined ? status : false;
        }
        pendingChanel(val) {
            return val ?? false;
        }
        isListPending(status) {
            if (status !== undefined) {
                if (status) {
                    setTimeout(() => {
                        $mol_wire_async(this).listPendingChanel($mol_promise());
                    }, 0);
                }
                else {
                    setTimeout(() => {
                        $mol_wire_async(this).listPendingChanel(false);
                    }, 0);
                }
            }
            return status !== undefined ? status : false;
        }
        listPendingChanel(val) {
            if (val !== undefined)
                return val ?? false;
        }
        isOnePending(status) {
            if (status !== undefined) {
                if (status) {
                    setTimeout(() => {
                        $mol_wire_async(this).onePendingChanel($mol_promise());
                    }, 0);
                }
                else {
                    setTimeout(() => {
                        $mol_wire_async(this).onePendingChanel(false);
                    }, 0);
                }
            }
            return status !== undefined ? status : false;
        }
        onePendingChanel(val) {
            return val !== undefined ? val : false;
        }
        trackEvent(id, status, error) {
            setTimeout(() => {
                $mol_wire_async(this).trackEventChannel(`${id}`, status);
            }, 0);
            switch (status) {
                case $milkywaystd_crud_events.CREATE_START:
                    $mol_wire_async(this).creatingChannel(`${id}`, $mol_promise());
                    $mol_wire_async(this).replaceListItem(`${id}`, $mol_promise());
                    break;
                case $milkywaystd_crud_events.ONE_REPLACE_START:
                case $milkywaystd_crud_events.ONE_UPDATE_START:
                case $milkywaystd_crud_events.ONE_DELETE_START:
                case $milkywaystd_crud_events.ONE_FETCH_START:
                    this.isOnePending(true);
                    if ($milkywaystd_crud_events.ONE_FETCH_START !== status) {
                        $mol_wire_async(this).byIdR(`${id}`, $mol_promise());
                    }
                    break;
                case $milkywaystd_crud_events.FETCH_LIST_START:
                    this.isListPending(true);
                    break;
                case $milkywaystd_crud_events.FETCH_LIST_END:
                    this.isListPending(false);
                    break;
                case $milkywaystd_crud_events.FETCH_LIST_ERROR:
                    this.listPendingChanel(false);
                    break;
                case $milkywaystd_crud_events.CREATE_END:
                case $milkywaystd_crud_events.ONE_REPLACE_END:
                case $milkywaystd_crud_events.ONE_UPDATE_END:
                case $milkywaystd_crud_events.ONE_DELETE_END:
                case $milkywaystd_crud_events.ONE_FETCH_END:
                    if ($milkywaystd_crud_events.ONE_FETCH_END !== status)
                        this.isOnePending(false);
                    break;
                case $milkywaystd_crud_events.CREATE_ERROR:
                case $milkywaystd_crud_events.ONE_REPLACE_ERROR:
                case $milkywaystd_crud_events.ONE_UPDATE_ERROR:
                case $milkywaystd_crud_events.ONE_DELETE_ERROR:
                case $milkywaystd_crud_events.ONE_FETCH_ERROR:
                    this.isOnePending(false);
                    if ($milkywaystd_crud_events.ONE_FETCH_ERROR !== status) {
                        if ($milkywaystd_crud_events.CREATE_ERROR === status) {
                            try {
                                this.creatingChannel(`${id}`, error);
                            }
                            catch (error) { }
                        }
                        const temp = { _error: error };
                        temp[this.idKey] = id;
                        this.replaceListItem(`${id}`, temp);
                    }
                    break;
                default:
                    break;
            }
        }
        trackEventChannel(id, status) {
            return status ?? "";
        }
        trackEventErrorChanel(id, param) {
            if (param instanceof ErrorResponse) {
                param = { error: param };
            }
            return param ?? null;
        }
        listReload() {
            return this.reset(Date.now());
        }
        reset(val) {
            return val ?? Date.now();
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_crud.prototype, "params", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_crud.prototype, "url", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_crud.prototype, "urlList", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_crud.prototype, "urlOne", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_crud.prototype, "metaInfo", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_crud.prototype, "dataKeys", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "prependToList", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "appendToList", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "removeFromList", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "replaceListItem", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_crud.prototype, "list", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_crud.prototype, "byId", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_crud.prototype, "byServerId", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_crud.prototype, "byIdR", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_crud.prototype, "creatingChannel", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "fetchList", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "fetchOne", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "create", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "updateOne", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "replaceOne", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "deleteOne", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "editFn", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "updateListItem", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "removeListItem", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "isPending", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_crud.prototype, "pendingChanel", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_crud.prototype, "isListPending", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_crud.prototype, "listPendingChanel", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "isOnePending", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_crud.prototype, "onePendingChanel", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "trackEvent", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_crud.prototype, "trackEventChannel", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_crud.prototype, "trackEventErrorChanel", null);
    __decorate([
        $mol_action
    ], $milkywaystd_crud.prototype, "listReload", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_crud.prototype, "reset", null);
    $.$milkywaystd_crud = $milkywaystd_crud;
})($ || ($ = {}));
//milkywaystd/crud/crud.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        promise;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
            this.promise = Promise.resolve().then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));
//mol/after/tick/tick.ts
;
"use strict";
var $;
(function ($) {
    let all = [];
    let el = null;
    let timer = null;
    function $mol_style_attach(id, text) {
        all.push(`/* ${id} */\n\n${text}`);
        if (timer)
            return el;
        const doc = $mol_dom_context.document;
        if (!doc)
            return null;
        el = doc.createElement('style');
        el.id = `$mol_style_attach`;
        doc.head.appendChild(el);
        timer = new $mol_after_tick(() => {
            el.innerHTML = '\n' + all.join('\n\n');
            all = [];
            el = null;
            timer = null;
        });
        return el;
    }
    $.$mol_style_attach = $mol_style_attach;
})($ || ($ = {}));
//mol/style/attach/attach.ts
;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));
//mol/object/object.ts
;
"use strict";
var $;
(function ($) {
    class $mol_window extends $mol_object {
        static size() {
            this.resizes();
            return {
                width: self.innerWidth,
                height: self.innerHeight,
            };
        }
        static resizes(next) { return next; }
    }
    __decorate([
        $mol_mem
    ], $mol_window, "size", null);
    __decorate([
        $mol_mem
    ], $mol_window, "resizes", null);
    $.$mol_window = $mol_window;
    self.addEventListener('resize', event => $mol_window.resizes(event));
})($ || ($ = {}));
//mol/window/window.web.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_selection extends $mol_object {
        static focused(next, notify) {
            const parents = [];
            let element = next?.[0] ?? $mol_dom_context.document.activeElement;
            while (element) {
                parents.push(element);
                element = element.parentNode;
            }
            if (!next || notify)
                return parents;
            new $mol_after_tick(() => {
                const element = this.focused()[0];
                if (element)
                    element.focus();
                else
                    $mol_dom_context.blur();
            });
            return parents;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_selection, "focused", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//mol/view/selection/selection.ts
;
"use strict";
var $;
(function ($) {
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
})($ || ($ = {}));
//mol/maybe/maybe.ts
;
"use strict";
var $;
(function ($) {
    if ($mol_dom_context.document) {
        $mol_dom_context.document.documentElement.addEventListener('focus', (event) => {
            $mol_view_selection.focused($mol_maybe($mol_dom_context.document.activeElement), 'notify');
        }, true);
    }
})($ || ($ = {}));
//mol/view/selection/selection.web.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $mol_object2 {
        static wrap;
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            return this.wrap(func);
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
        static get field() {
            return (obj, name, descr) => {
                descr.get = descr.set = this.func(descr.get);
                return descr;
            };
        }
    }
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));
//mol/wrapper/wrapper.ts
;
"use strict";
var $;
(function ($) {
    class $mol_memo extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            return function (next) {
                if (next === undefined && store.has(this))
                    return store.get(this);
                const val = task.call(this, next) ?? next;
                store.set(this, val);
                return val;
            };
        }
    }
    $.$mol_memo = $mol_memo;
})($ || ($ = {}));
//mol/memo/memo.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_qname(name) {
        return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_');
    }
    $.$mol_dom_qname = $mol_dom_qname;
})($ || ($ = {}));
//mol/dom/qname/qname.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_probe(task, def) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            const res = task();
            if (res === undefined)
                return def;
            return res;
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));
//mol/wire/probe/probe.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_watch() {
        const atom = $mol_wire_auto();
        if (atom instanceof $mol_wire_atom) {
            atom.watch();
        }
        else {
            $mol_fail(new Error('Atom is required for watching'));
        }
    }
    $.$mol_wire_watch = $mol_wire_watch;
})($ || ($ = {}));
//mol/wire/watch/watch.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_solid() {
        const current = $mol_wire_auto();
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));
//mol/wire/solid/solid.ts
;
"use strict";
var $;
(function ($) {
    function $mol_const(value) {
        const getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));
//mol/const/const.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === null || val === false) {
                if (!el.hasAttribute(name))
                    continue;
                el.removeAttribute(name);
            }
            else {
                const str = String(val);
                if (el.getAttribute(name) === str)
                    continue;
                el.setAttribute(name, str);
            }
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));
//mol/dom/render/attributes/attributes.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events, passive = false) {
        for (let name in events) {
            el.addEventListener(name, events[name], { passive });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
})($ || ($ = {}));
//mol/dom/render/events/events.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
            if (typeof val === 'number') {
                style.setProperty(kebab(name), `${val}px`);
            }
            else {
                style.setProperty(kebab(name), val);
            }
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));
//mol/dom/render/styles/styles.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_set = new Set(childNodes);
        let nextNode = el.firstChild;
        for (let view of childNodes) {
            if (view == null)
                continue;
            if (view instanceof $mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));
//mol/dom/render/children/children.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
})($ || ($ = {}));
//mol/dom/render/fields/fields.ts
;
"use strict";
//mol/type/keys/extract/extract.ts
;
"use strict";
//mol/type/pick/pick.ts
;
"use strict";
var $;
(function ($) {
    class $mol_decor {
        value;
        constructor(value) {
            this.value = value;
        }
        prefix() { return ''; }
        valueOf() { return this.value; }
        postfix() { return ''; }
        toString() {
            return `${this.prefix()}${this.valueOf()}${this.postfix()}`;
        }
    }
    $.$mol_decor = $mol_decor;
})($ || ($ = {}));
//mol/decor/decor.ts
;
"use strict";
var $;
(function ($) {
    class $mol_style_unit extends $mol_decor {
        literal;
        constructor(value, literal) {
            super(value);
            this.literal = literal;
        }
        postfix() {
            return this.literal;
        }
        static per(value) { return `${value}%`; }
        static px(value) { return `${value}px`; }
        static mm(value) { return `${value}mm`; }
        static cm(value) { return `${value}cm`; }
        static Q(value) { return `${value}Q`; }
        static in(value) { return `${value}in`; }
        static pc(value) { return `${value}pc`; }
        static pt(value) { return `${value}pt`; }
        static cap(value) { return `${value}cap`; }
        static ch(value) { return `${value}ch`; }
        static em(value) { return `${value}em`; }
        static rem(value) { return `${value}rem`; }
        static ex(value) { return `${value}ex`; }
        static ic(value) { return `${value}ic`; }
        static lh(value) { return `${value}lh`; }
        static rlh(value) { return `${value}rlh`; }
        static vh(value) { return `${value}vh`; }
        static vw(value) { return `${value}vw`; }
        static vi(value) { return `${value}vi`; }
        static vb(value) { return `${value}vb`; }
        static vmin(value) { return `${value}vmin`; }
        static vmax(value) { return `${value}vmax`; }
        static deg(value) { return `${value}deg`; }
        static rad(value) { return `${value}rad`; }
        static grad(value) { return `${value}grad`; }
        static turn(value) { return `${value}turn`; }
        static s(value) { return `${value}s`; }
        static ms(value) { return `${value}ms`; }
    }
    $.$mol_style_unit = $mol_style_unit;
})($ || ($ = {}));
//mol/style/unit/unit.ts
;
"use strict";
var $;
(function ($) {
    const { per } = $mol_style_unit;
    class $mol_style_func extends $mol_decor {
        name;
        constructor(name, value) {
            super(value);
            this.name = name;
        }
        prefix() { return this.name + '('; }
        postfix() { return ')'; }
        static calc(value) {
            return new $mol_style_func('calc', value);
        }
        static vary(name, defaultValue) {
            return new $mol_style_func('var', defaultValue ? [name, defaultValue] : name);
        }
        static url(href) {
            return new $mol_style_func('url', JSON.stringify(href));
        }
        static hsla(hue, saturation, lightness, alpha) {
            return new $mol_style_func('hsla', [hue, per(saturation), per(lightness), alpha]);
        }
        static clamp(min, mid, max) {
            return new $mol_style_func('clamp', [min, mid, max]);
        }
        static rgba(red, green, blue, alpha) {
            return new $mol_style_func('rgba', [red, green, blue, alpha]);
        }
        static scale(zoom) {
            return new $mol_style_func('scale', [zoom]);
        }
        static linear(...breakpoints) {
            return new $mol_style_func("linear", breakpoints.map((e) => Array.isArray(e)
                ? String(e[0]) +
                    " " +
                    (typeof e[1] === "number" ? e[1] + "%" : e[1].toString())
                : String(e)));
        }
        static cubic_bezier(x1, y1, x2, y2) {
            return new $mol_style_func('cubic-bezier', [x1, y1, x2, y2]);
        }
        static steps(value, step_position) {
            return new $mol_style_func('steps', [value, step_position]);
        }
        static blur(value) {
            return new $mol_style_func('blur', value ?? "");
        }
        static brightness(value) {
            return new $mol_style_func('brightness', value ?? "");
        }
        static contrast(value) {
            return new $mol_style_func('contrast', value ?? "");
        }
        static drop_shadow(color, x_offset, y_offset, blur_radius) {
            return new $mol_style_func("drop-shadow", blur_radius
                ? [color, x_offset, y_offset, blur_radius]
                : [color, x_offset, y_offset]);
        }
        static grayscale(value) {
            return new $mol_style_func('grayscale', value ?? "");
        }
        static hue_rotate(value) {
            return new $mol_style_func('hue-rotate', value ?? "");
        }
        static invert(value) {
            return new $mol_style_func('invert', value ?? "");
        }
        static opacity(value) {
            return new $mol_style_func('opacity', value ?? "");
        }
        static sepia(value) {
            return new $mol_style_func('sepia', value ?? "");
        }
        static saturate(value) {
            return new $mol_style_func('saturate', value ?? "");
        }
    }
    $.$mol_style_func = $mol_style_func;
})($ || ($ = {}));
//mol/style/func/func.ts
;
"use strict";
//mol/type/override/override.ts
;
"use strict";
//mol/style/properties/properties.ts
;
"use strict";
var $;
(function ($) {
    const { vary } = $mol_style_func;
    $.$mol_theme = {
        back: vary('--mol_theme_back'),
        hover: vary('--mol_theme_hover'),
        card: vary('--mol_theme_card'),
        current: vary('--mol_theme_current'),
        special: vary('--mol_theme_special'),
        text: vary('--mol_theme_text'),
        control: vary('--mol_theme_control'),
        shade: vary('--mol_theme_shade'),
        line: vary('--mol_theme_line'),
        focus: vary('--mol_theme_focus'),
        field: vary('--mol_theme_field'),
        image: vary('--mol_theme_image'),
    };
})($ || ($ = {}));
//mol/theme/theme.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/theme/theme.css", ":root {\n\t--mol_theme_hue: 210deg;\n\t--mol_theme_luma: -1;\n\t--mol_theme_satur: 1;\n\t--mol_theme_image: none;\n}\n\n[mol_theme] {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n}\n:where([mol_theme]) {\n\tbackground-color: var(--mol_theme_back);\n}\n\t\n:root, [mol_theme] {\n\t--mol_theme_back: hsl( var(--mol_theme_hue), calc( var(--mol_theme_satur) * 20% ), calc( 55% + 45% * var(--mol_theme_luma) ) );\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, calc( 40% - 40% * var(--mol_theme_luma) ) );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), calc( var(--mol_theme_satur) * 50% ), calc( 54% + 46% * var(--mol_theme_luma) ), .25 );\n\t\n\t--mol_theme_card: hsl( var(--mol_theme_hue), calc( var(--mol_theme_satur) * 50% ), calc( 55% + 35% * var(--mol_theme_luma) ), .25 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .2 );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 50%, 1 );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 50%, calc( 50% - 10% * var(--mol_theme_luma) ) );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - 90deg ), 50%, calc( 50% - 10% * var(--mol_theme_luma) ) );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + 90deg ), 50%, calc( 50% - 10% * var(--mol_theme_luma) ) );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, calc( 55% - 10% * var(--mol_theme_luma) ) );\n\t\n}\n\n[mol_theme=\"$mol_theme_light\"] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n}\n\n[mol_theme=\"$mol_theme_dark\"] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n}\n\n[mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_luma: -2;\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 50%, 40% );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 60%, 30% );\n\t--mol_theme_current: hsl( var(--mol_theme_hue), 100%, 20% );\n}\n\n[mol_theme=\"$mol_theme_current\"] {\n\tbackground-color: var(--mol_theme_back);\n\t--mol_theme_back: hsl( calc( var(--mol_theme_hue) - 90deg ), 50%, calc( 50% + 30% * var(--mol_theme_luma) ) );\n}\n\n[mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_card: hsl( calc( var(--mol_theme_hue) + 90deg ), 50%, calc( 55% + 35% * var(--mol_theme_luma) ), .25 );\n}\n\n[mol_theme=\"$mol_theme_accent\"] {\n\tbackground-color: var(--mol_theme_back);\n\t--mol_theme_luma: -2;\n\t--mol_theme_back: hsl( calc( var(--mol_theme_hue) + 180deg ), 90%, 50% );\n\t--mol_theme_hover: hsl( calc( var(--mol_theme_hue) + 180deg ), 80%, 35% );\n}\n\n[mol_theme=\"$mol_theme_accent\"] [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: black;\n}\n");
})($ || ($ = {}));
//mol/theme/-css/theme.css.ts
;
"use strict";
var $;
(function ($) {
    const { vary } = $mol_style_func;
    $.$mol_gap = {
        block: vary('--mol_gap_block'),
        text: vary('--mol_gap_text'),
        round: vary('--mol_gap_round'),
        space: vary('--mol_gap_space'),
        blur: vary('--mol_gap_blur'),
    };
})($ || ($ = {}));
//mol/gap/gap.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gap/gap.css", ":root {\n\t--mol_gap_block: .75rem;\n\t--mol_gap_text: .5rem .75rem;\n\t--mol_gap_round: .25rem;\n\t--mol_gap_space: .25rem;\n\t--mol_gap_blur: .5rem;\n}\n");
})($ || ($ = {}));
//mol/gap/-css/gap.css.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_visible_width() {
        return $mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    const error_showed = new WeakMap();
    class $mol_view extends $mol_object {
        static Root(id) {
            return new this;
        }
        autorun() {
            try {
                this.dom_tree();
                document.title = this.title();
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        static autobind() {
            const nodes = $mol_dom_context.document.querySelectorAll('[mol_view_root]:not([mol_view_root=""])');
            for (let i = nodes.length - 1; i >= 0; --i) {
                const name = nodes.item(i).getAttribute('mol_view_root');
                const View = $[name];
                if (!View) {
                    console.error(`Can not attach view. Class not found: ${name}`);
                    continue;
                }
                const view = View.Root(i);
                view.dom_node(nodes.item(i));
                view.autorun();
            }
        }
        title() {
            return this.toString().match(/.*\.(\w+)/)?.[1] ?? this.toString();
        }
        focused(next) {
            let node = this.dom_node();
            const value = $mol_view_selection.focused(next === undefined ? undefined : (next ? [node] : []));
            return value.indexOf(node) !== -1;
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        dom_name() {
            return $mol_dom_qname(this.constructor.toString()) || 'div';
        }
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        sub() {
            return [];
        }
        sub_visible() {
            return this.sub();
        }
        minimal_width() {
            let min = 0;
            try {
                const sub = this.sub();
                if (!sub)
                    return 0;
                sub.forEach(view => {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_width());
                    }
                });
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        maximal_width() {
            return this.minimal_width();
        }
        minimal_height() {
            let min = 0;
            try {
                for (const view of this.sub() ?? []) {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_height());
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        static watchers = new Set();
        view_rect() {
            if ($mol_wire_probe(() => this.view_rect()) === undefined) {
                $mol_wire_watch();
                return null;
            }
            else {
                const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
                return { width, height, left, right, top, bottom };
            }
        }
        dom_id() {
            return this.toString();
        }
        dom_node(next) {
            $mol_wire_solid();
            const node = next || $mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            const id = this.dom_id();
            node.setAttribute('id', id);
            node.toString = $mol_const('<#' + id + '>');
            $mol_dom_render_attributes(node, this.attr_static());
            const events = $mol_wire_async(this.event());
            $mol_dom_render_events(node, events);
            return node;
        }
        dom_final() {
            this.render();
            const sub = this.sub_visible();
            if (!sub)
                return;
            for (const el of sub) {
                if (el && typeof el === 'object' && 'dom_final' in el) {
                    el['dom_final']();
                }
            }
            return this.dom_node();
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                }
                finally {
                    for (let plugin of this.plugins()) {
                        if (plugin instanceof $mol_plugin) {
                            plugin.dom_tree();
                        }
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                $mol_dom_render_attributes(node, { mol_view_error: error.name || error.constructor.name });
                if ($mol_promise_like(error))
                    break render;
                if ((error_showed.get(error) ?? this) !== this)
                    break render;
                try {
                    const message = error.message || error;
                    node.innerText = message.replace(/^|$/mg, '\xA0\xA0');
                }
                catch { }
                error_showed.set(error, this);
            }
            try {
                this.auto();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return node;
        }
        dom_node_actual() {
            const node = this.dom_node();
            $mol_dom_render_styles(node, this.style_size());
            const attr = this.attr();
            const style = this.style();
            const fields = this.field();
            $mol_dom_render_attributes(node, attr);
            $mol_dom_render_styles(node, style);
            return node;
        }
        auto() {
            return null;
        }
        render() {
            const node = this.dom_node_actual();
            const sub = this.sub_visible();
            if (!sub)
                return;
            const nodes = sub.map(child => {
                if (child == null)
                    return null;
                return (child instanceof $mol_view)
                    ? child.dom_node()
                    : child instanceof $mol_dom_context.Node
                        ? child
                        : String(child);
            });
            $mol_dom_render_children(node, nodes);
            for (const el of sub)
                if (el && typeof el === 'object' && 'dom_tree' in el)
                    el['dom_tree']();
            $mol_dom_render_fields(node, this.field());
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                if (current.constructor.name !== classes.at(-1)?.name) {
                    classes.push(current.constructor);
                }
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        static _view_names;
        static view_names(suffix) {
            let cache = Reflect.getOwnPropertyDescriptor(this, '_view_names')?.value;
            if (!cache)
                cache = this._view_names = new Map;
            const cached = cache.get(suffix);
            if (cached)
                return cached;
            const names = [];
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            for (const Class of this.view_classes()) {
                if (suffix in Class.prototype)
                    names.push(this.$.$mol_func_name(Class) + suffix2);
                else
                    break;
            }
            cache.set(suffix, names);
            return names;
        }
        view_names_owned() {
            const names = [];
            let owner = $mol_owning_get(this);
            if (!(owner?.host instanceof $mol_view))
                return names;
            const suffix = owner.task.name.trim();
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            names.push(...owner.host.constructor.view_names(suffix));
            for (let prefix of owner.host.view_names_owned()) {
                names.push(prefix + suffix2);
            }
            return names;
        }
        view_names() {
            const names = new Set();
            for (let name of this.view_names_owned())
                names.add(name);
            for (let Class of this.constructor.view_classes()) {
                const name = this.$.$mol_func_name(Class);
                if (name)
                    names.add(name);
            }
            return names;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {};
        }
        style_size() {
            return {
                minHeight: this.minimal_height(),
                minWidth: this.minimal_width(),
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        plugins() {
            return [];
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this));
        }
        *view_find(check, path = []) {
            if (check(this))
                return yield [...path, this];
            try {
                for (const item of this.sub()) {
                    if (item instanceof $mol_view) {
                        yield* item.view_find(check, [...path, this]);
                    }
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        force_render(path) {
            const kids = this.sub();
            const index = kids.findIndex(item => {
                if (item instanceof $mol_view) {
                    return path.has(item);
                }
                else {
                    return false;
                }
            });
            if (index >= 0) {
                kids[index].force_render(path);
            }
        }
        ensure_visible(view, align = "start") {
            const path = this.view_find(v => v === view).next().value;
            this.force_render(new Set(path));
            try {
                this.dom_final();
            }
            catch (err) {
                $mol_fail_log(err);
            }
            view.dom_node().scrollIntoView({ block: align });
        }
        bring() {
            const win = this.$.$mol_dom_context;
            if (win.parent !== win.self && !win.document.hasFocus())
                return;
            new this.$.$mol_after_frame(() => {
                this.dom_node().scrollIntoView({ block: 'start', inline: 'end' });
                this.focused(true);
            });
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "autorun", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_name", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "view_rect", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_final", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node_actual", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "render", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names_owned", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $mol_mem
    ], $mol_view, "autobind", null);
    __decorate([
        $mol_memo.method
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//mol/view/view/view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/view/view/view.css", "[mol_view] {\n\ttransition-property: height, width, min-height, min-width, max-width, max-height, transform;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\tcontain: style;\n\tscrollbar-color: var(--mol_theme_line) transparent;\n\tscrollbar-width: thin;\n}\t\n\n[mol_view]::selection {\n\tbackground: var(--mol_theme_line);\n}\t\n\n[mol_view]::-webkit-scrollbar {\n\twidth: .25rem;\n\theight: .25rem;\n}\n\n[mol_view]::-webkit-scrollbar-corner {\n\tbackground-color: var(--mol_theme_line);\n}\n\n[mol_view]::-webkit-scrollbar-track {\n\tbackground-color: transparent;\n}\n\n[mol_view]::-webkit-scrollbar-thumb {\n\tbackground-color: var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5rem;\n\tbackground: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n\tcontain: unset; /** Fixes bg ignoring when applied to body on Chrome */\n\ttab-size: 4;\n}\n\n@media print {\n\t[mol_view_root] {\n\t\theight: auto;\n\t}\n}\n\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t-45deg,\n\t\t#f92323,\n\t\t#f92323 .5rem,\n\t\t#ff3d3d .5rem,\n\t\t#ff3d3d 1.5rem\n\t);\n\tcolor: black;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n@keyframes mol_view_wait {\n\tfrom {\n\t\topacity: .25;\n\t}\n\t20% {\n\t\topacity: .75;\n\t}\n\tto {\n\t\topacity: .25;\n\t}\n}\n\n:where([mol_view][mol_view_error=\"Promise\"]) {\n\tbackground: var(--mol_theme_hover);\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait 1s steps( 20, end ) infinite;\n}\n");
})($ || ($ = {}));
//mol/view/view/-css/view.css.ts
;
"use strict";
var $;
(function ($) {
    $mol_dom_context.document?.addEventListener('DOMContentLoaded', () => $mol_view.autobind(), { once: true });
})($ || ($ = {}));
//mol/view/view/view.web.ts
;
"use strict";
var $;
(function ($) {
    class $mol_plugin extends $mol_view {
        dom_node(next) {
            const node = next || $mol_owning_get(this).host.dom_node();
            $mol_dom_render_attributes(node, this.attr_static());
            const events = $mol_wire_async(this.event());
            for (let event_name in events) {
                node.addEventListener(event_name, events[event_name], { passive: false });
            }
            return node;
        }
        attr_static() {
            return {};
        }
        event() {
            return {};
        }
        render() {
            this.dom_node_actual();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_plugin.prototype, "dom_node", null);
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));
//mol/plugin/plugin.ts
;
"use strict";
var $;
(function ($) {
    class $mol_example extends $mol_view {
        tags() {
            return [];
        }
        aspects() {
            return [];
        }
    }
    $.$mol_example = $mol_example;
})($ || ($ = {}));
//mol/example/-view.tree/example.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/example/example.view.css", "[mol_example] {\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));
//mol/example/-css/example.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_example_large extends $mol_example {
    }
    $.$mol_example_large = $mol_example_large;
})($ || ($ = {}));
//mol/example/large/-view.tree/large.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/example/large/large.view.css", "[mol_example_large] {\n\tflex: 1 1 auto;\n\tflex-direction: column;\n\tbackground: var(--mol_theme_back);\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n\tmax-width: 100%;\n\tmax-height: 100%;\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));
//mol/example/large/-css/large.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_scroll extends $mol_view {
        scroll_top(next) {
            if (next !== undefined)
                return next;
            return 0;
        }
        scroll_left(next) {
            if (next !== undefined)
                return next;
            return 0;
        }
        field() {
            return {
                ...super.field(),
                tabIndex: this.tabindex()
            };
        }
        event() {
            return {
                ...super.event(),
                scroll: (event) => this.event_scroll(event)
            };
        }
        tabindex() {
            return -1;
        }
        event_scroll(event) {
            if (event !== undefined)
                return event;
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_scroll.prototype, "scroll_top", null);
    __decorate([
        $mol_mem
    ], $mol_scroll.prototype, "scroll_left", null);
    __decorate([
        $mol_mem
    ], $mol_scroll.prototype, "event_scroll", null);
    $.$mol_scroll = $mol_scroll;
})($ || ($ = {}));
//mol/scroll/-view.tree/scroll.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_dom_listener extends $mol_object {
        _node;
        _event;
        _handler;
        _config;
        constructor(_node, _event, _handler, _config = { passive: true }) {
            super();
            this._node = _node;
            this._event = _event;
            this._handler = _handler;
            this._config = _config;
            this._node.addEventListener(this._event, this._handler, this._config);
        }
        destructor() {
            this._node.removeEventListener(this._event, this._handler, this._config);
            super.destructor();
        }
    }
    $.$mol_dom_listener = $mol_dom_listener;
})($ || ($ = {}));
//mol/dom/listener/listener.ts
;
"use strict";
var $;
(function ($) {
    class $mol_print extends $mol_object {
        static before() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'beforeprint', () => {
                this.active(true);
            });
        }
        static after() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'afterprint', () => {
                this.active(false);
            });
        }
        static active(next) {
            this.before();
            this.after();
            return next || false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_print, "before", null);
    __decorate([
        $mol_mem
    ], $mol_print, "after", null);
    __decorate([
        $mol_mem
    ], $mol_print, "active", null);
    $.$mol_print = $mol_print;
})($ || ($ = {}));
//mol/print/print.ts
;
"use strict";
//mol/style/pseudo/class.ts
;
"use strict";
//mol/style/pseudo/element.ts
;
"use strict";
//mol/type/error/error.ts
;
"use strict";
//mol/style/guard/guard.ts
;
"use strict";
var $;
(function ($) {
    function $mol_style_sheet(Component, config0) {
        let rules = [];
        const block = $mol_dom_qname($mol_ambient({}).$mol_func_name(Component));
        const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
        const make_class = (prefix, path, config) => {
            const props = [];
            const selector = (prefix, path) => {
                if (path.length === 0)
                    return prefix || `[${block}]`;
                let res = `[${block}_${path.join('_')}]`;
                if (prefix)
                    res = prefix + ' :where(' + res + ')';
                return res;
            };
            for (const key of Object.keys(config).reverse()) {
                if (/^(--)?[a-z]/.test(key)) {
                    const addProp = (keys, val) => {
                        if (Array.isArray(val)) {
                            if (val[0] && [Array, Object].includes(val[0].constructor)) {
                                val = val.map(v => {
                                    return Object.entries(v).map(([n, a]) => {
                                        if (a === true)
                                            return kebab(n);
                                        if (a === false)
                                            return null;
                                        return String(a);
                                    }).filter(Boolean).join(' ');
                                }).join(',');
                            }
                            else {
                                val = val.join(' ');
                            }
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                        else if (val.constructor === Object) {
                            for (let suffix in val) {
                                addProp([...keys, kebab(suffix)], val[suffix]);
                            }
                        }
                        else {
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                    };
                    addProp([kebab(key)], config[key]);
                }
                else if (/^[A-Z]/.test(key)) {
                    make_class(prefix, [...path, key.toLowerCase()], config[key]);
                }
                else if (key[0] === '$') {
                    make_class(selector(prefix, path) + ' :where([' + $mol_dom_qname(key) + '])', [], config[key]);
                }
                else if (key === '>') {
                    const types = config[key];
                    for (let type in types) {
                        make_class(selector(prefix, path) + ' > :where([' + $mol_dom_qname(type) + '])', [], types[type]);
                    }
                }
                else if (key === '@') {
                    const attrs = config[key];
                    for (let name in attrs) {
                        for (let val in attrs[name]) {
                            make_class(selector(prefix, path) + ':where([' + name + '=' + JSON.stringify(val) + '])', [], attrs[name][val]);
                        }
                    }
                }
                else if (key === '@media') {
                    const media = config[key];
                    for (let query in media) {
                        rules.push('}\n');
                        make_class(prefix, path, media[query]);
                        rules.push(`${key} ${query} {\n`);
                    }
                }
                else {
                    make_class(selector(prefix, path) + key, [], config[key]);
                }
            }
            if (props.length) {
                rules.push(`${selector(prefix, path)} {\n${props.reverse().join('')}}\n`);
            }
        };
        make_class('', [], config0);
        return rules.reverse().join('');
    }
    $.$mol_style_sheet = $mol_style_sheet;
})($ || ($ = {}));
//mol/style/sheet/sheet.ts
;
"use strict";
var $;
(function ($) {
    function $mol_style_define(Component, config) {
        return $mol_style_attach(Component.name, $mol_style_sheet(Component, config));
    }
    $.$mol_style_define = $mol_style_define;
})($ || ($ = {}));
//mol/style/define/define.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_scroll extends $.$mol_scroll {
            scroll_top(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollTop = next;
                return el.scrollTop;
            }
            scroll_left(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollLeft = next;
                return el.scrollLeft;
            }
            event_scroll(next) {
                const el = this.dom_node();
                this.scroll_left(el.scrollLeft, 'cache');
                this.scroll_top(el.scrollTop, 'cache');
            }
            minimal_height() {
                return this.$.$mol_print.active() ? null : 0;
            }
            minimal_width() {
                return this.$.$mol_print.active() ? null : 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_top", null);
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_left", null);
        $$.$mol_scroll = $mol_scroll;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/scroll/scroll.view.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem, px } = $mol_style_unit;
        $mol_style_define($mol_scroll, {
            display: 'flex',
            overflow: 'auto',
            flex: {
                direction: 'column',
                grow: 1,
                shrink: 1,
            },
            outline: 'none',
            alignSelf: 'stretch',
            boxSizing: 'border-box',
            willChange: 'scroll-position',
            scroll: {
                padding: [rem(.75), 0],
            },
            maxHeight: per(100),
            maxWidth: per(100),
            webkitOverflowScrolling: 'touch',
            contain: 'content',
            '>': {
                $mol_view: {
                    transform: 'translateZ(0)',
                },
            },
            '::before': {
                display: 'none',
            },
            '::after': {
                display: 'none',
            },
            '::-webkit-scrollbar': {
                width: rem(.25),
                height: rem(.25),
            },
            '@media': {
                'print': {
                    overflow: 'visible',
                    contain: 'none',
                    maxHeight: 'unset',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/scroll/scroll.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_book2 extends $mol_scroll {
        menu_title() {
            return "";
        }
        sub() {
            return this.pages();
        }
        minimal_width() {
            return 0;
        }
        Placeholder() {
            const obj = new this.$.$mol_view();
            return obj;
        }
        Gap(id) {
            const obj = new this.$.$mol_view();
            obj.title = () => "";
            return obj;
        }
        pages() {
            return [];
        }
    }
    __decorate([
        $mol_mem
    ], $mol_book2.prototype, "Placeholder", null);
    __decorate([
        $mol_mem_key
    ], $mol_book2.prototype, "Gap", null);
    $.$mol_book2 = $mol_book2;
})($ || ($ = {}));
//mol/book2/-view.tree/book2.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));
//mol/mem/cached/cached.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_book2 extends $.$mol_book2 {
            title() {
                return this.pages().map(page => {
                    try {
                        return page?.title();
                    }
                    catch (error) {
                        $mol_fail_log(error);
                    }
                }).reverse().filter(Boolean).join(' | ');
            }
            menu_title() {
                return this.pages()[0]?.title() || this.title();
            }
            sub() {
                const next = [...this.pages(), this.Placeholder()];
                const prev = $mol_mem_cached(() => this.sub()) ?? [];
                for (let i = 1; i++;) {
                    const p = prev[prev.length - i];
                    const n = next[next.length - i];
                    if (!n)
                        break;
                    if (p === n)
                        continue;
                    n.bring();
                    break;
                }
                return next;
            }
            bring() {
                const pages = this.pages();
                if (pages.length)
                    pages[pages.length - 1].bring();
                else
                    super.bring();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_book2.prototype, "sub", null);
        $$.$mol_book2 = $mol_book2;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/book2/book2.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/book2/book2.view.css", "[mol_book2] {\n\tdisplay: flex;\n\tflex-flow: row nowrap;\n\talign-items: stretch;\n\tflex: 1 1 auto;\n\talign-self: stretch;\n\tmargin: 0;\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_line); */\n\t/* transform: translateZ(0); */\n\ttransition: none;\n\toverflow: overlay;\n\tscroll-snap-type: x mandatory;\n\tpadding: 0 1px;\n\tscroll-padding: 0 1px;\n\tgap: 1px;\n}\n\n[mol_book2] > * {\n/* \tflex: none; */\n\tscroll-snap-stop: always;\n\tscroll-snap-align: end;\n\tposition: relative;\n\tmin-height: 100%;\n\tmax-height: 100%;\n\tmax-width: 100%;\n\tflex-shrink: 0;\n}\n\n[mol_book2] > *:not(:first-of-type):before,\n[mol_book2] > *:not(:last-of-type)::after {\n\tcontent: '';\n\tposition: absolute;\n\ttop: 1.5rem;\n\twidth: 1px;\n\theight: 1rem;\n\tbackground: var(--mol_theme_special);\n\tborder-radius: var(--mol_gap_round);\n\topacity: .5;\n}\n[mol_book2] > *:not(:first-of-type):before {\n\tleft: -1px;\n}\n[mol_book2] > *:not(:last-of-type)::after {\n\tright: -1px;\n}\n\n:where([mol_book2]) > * {\n\tbackground-color: var(--mol_theme_card);\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_back); */\n}\n\n[mol_book2] > [mol_book2] {\n\tdisplay: contents;\n}\n\n[mol_book2] > *:first-child {\n\tscroll-snap-align: start;\n}\n\n[mol_book2] > [mol_view] {\n\ttransform: none; /* prevent content clipping */\n}\n\n[mol_book2_placeholder] {\n\tflex: 1 1 0;\n\tbackground: none;\n}\n\n[mol_book2_gap] {\n\tbackground: none;\n\tflex-grow: 1;\n\tscroll-snap-align: none;\n\tmargin-right: -1px;\n\tbox-shadow: none;\n}\n\n[mol_book2_gap]::before,\n[mol_book2_gap]::after {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));
//mol/book2/-css/book2.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $examples_products extends $mol_book2 {
        tablepage() {
            const obj = new this.$.$examples_products_tablepage();
            obj.editCallback = (val) => this.editCallback(val);
            return obj;
        }
        editpage() {
            return this.form_factory();
        }
        pages() {
            return this.pages_visible();
        }
        param() {
            return "";
        }
        menu_title() {
            return "";
        }
        editCallback(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        form_factory() {
            return null;
        }
        pages_visible() {
            return [];
        }
    }
    __decorate([
        $mol_mem
    ], $examples_products.prototype, "tablepage", null);
    __decorate([
        $mol_mem
    ], $examples_products.prototype, "editCallback", null);
    $.$examples_products = $examples_products;
})($ || ($ = {}));
//examples/products/-view.tree/products.view.tree.ts
;
"use strict";
//mol/state/arg/arg.ts
;
"use strict";
var $;
(function ($) {
    class $mol_state_arg extends $mol_object {
        prefix;
        static href(next) {
            if (next === undefined) {
                next = $mol_dom_context.location.href;
            }
            else if (!/^about:srcdoc/.test(next)) {
                new $mol_after_frame(() => {
                    const next = this.href();
                    const prev = $mol_dom_context.location.href;
                    if (next === prev)
                        return;
                    const history = $mol_dom_context.history;
                    history.replaceState(history.state, $mol_dom_context.document.title, next);
                });
            }
            if ($mol_dom_context.parent !== $mol_dom_context.self) {
                $mol_dom_context.parent.postMessage(['hashchange', next], '*');
            }
            return next;
        }
        static href_normal() {
            return this.link({});
        }
        static href_absolute() {
            return new URL(this.href(), $mol_dom_context.location.href).toString();
        }
        static dict(next) {
            var href = this.href(next && this.make_link(next)).split(/#!?/)[1] || '';
            var chunks = href.split(this.separator);
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static dict_cut(except) {
            const dict = this.dict();
            const cut = {};
            for (const key in dict) {
                if (except.indexOf(key) >= 0)
                    break;
                cut[key] = dict[key];
            }
            return cut;
        }
        static value(key, next) {
            const nextDict = (next === void 0) ? void 0 : { ...this.dict(), [key]: next };
            const next2 = this.dict(nextDict)[key];
            return (next2 == null) ? null : next2;
        }
        static link(next) {
            return this.make_link({
                ...this.dict_cut(Object.keys(next)),
                ...next,
            });
        }
        static prolog = '!';
        static separator = '/';
        static make_link(next) {
            const chunks = [];
            for (let key in next) {
                if (null == next[key])
                    continue;
                const val = next[key];
                chunks.push([key].concat(val ? [val] : []).map(this.encode).join('='));
            }
            return new URL('#' + this.prolog + chunks.join(this.separator), this.href_absolute()).toString();
        }
        static go(next) {
            $mol_dom_context.location.href = this.make_link(next);
        }
        static encode(str) {
            return encodeURIComponent(str).replace(/\(/g, '%28').replace(/\)/g, '%29');
        }
        constructor(prefix = '') {
            super();
            this.prefix = prefix;
        }
        value(key, next) {
            return this.constructor.value(this.prefix + key, next);
        }
        sub(postfix) {
            return new this.constructor(this.prefix + postfix + '.');
        }
        link(next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return this.constructor.link(dict);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_normal", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_absolute", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "dict_cut", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "value", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "make_link", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "go", null);
    $.$mol_state_arg = $mol_state_arg;
    function $mol_state_arg_change() {
        $mol_state_arg.href($mol_dom_context.location.href);
    }
    self.addEventListener('hashchange', $mol_state_arg_change);
})($ || ($ = {}));
//mol/state/arg/arg.web.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));
//mol/after/timeout/timeout.ts
;
"use strict";
var $;
(function ($) {
    class $mol_page extends $mol_view {
        dom_name() {
            return "article";
        }
        field() {
            return {
                ...super.field(),
                tabIndex: this.tabindex()
            };
        }
        sub() {
            return [
                this.Head(),
                this.Body(),
                this.Foot()
            ];
        }
        tabindex() {
            return -1;
        }
        Logo() {
            return null;
        }
        title_content() {
            return [
                this.Logo(),
                this.title()
            ];
        }
        Title() {
            const obj = new this.$.$mol_view();
            obj.dom_name = () => "h1";
            obj.sub = () => this.title_content();
            return obj;
        }
        tools() {
            return [];
        }
        Tools() {
            const obj = new this.$.$mol_view();
            obj.sub = () => this.tools();
            return obj;
        }
        head() {
            return [
                this.Title(),
                this.Tools()
            ];
        }
        Head() {
            const obj = new this.$.$mol_view();
            obj.minimal_height = () => 64;
            obj.dom_name = () => "header";
            obj.sub = () => this.head();
            return obj;
        }
        body() {
            return [];
        }
        body_scroll_top(next) {
            return this.Body().scroll_top(next);
        }
        Body() {
            const obj = new this.$.$mol_scroll();
            obj.sub = () => this.body();
            return obj;
        }
        foot() {
            return [];
        }
        Foot() {
            const obj = new this.$.$mol_view();
            obj.dom_name = () => "footer";
            obj.sub = () => this.foot();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_page.prototype, "Title", null);
    __decorate([
        $mol_mem
    ], $mol_page.prototype, "Tools", null);
    __decorate([
        $mol_mem
    ], $mol_page.prototype, "Head", null);
    __decorate([
        $mol_mem
    ], $mol_page.prototype, "Body", null);
    __decorate([
        $mol_mem
    ], $mol_page.prototype, "Foot", null);
    $.$mol_page = $mol_page;
})($ || ($ = {}));
//mol/page/-view.tree/page.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem } = $mol_style_unit;
        const { calc } = $mol_style_func;
        $mol_style_define($mol_page, {
            display: 'flex',
            flex: {
                basis: 'auto',
                direction: 'column',
            },
            position: 'relative',
            alignSelf: 'stretch',
            maxWidth: per(100),
            maxHeight: per(100),
            boxSizing: 'border-box',
            color: $mol_theme.text,
            ':focus': {
                outline: 'none',
            },
            Head: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                flex: 'none',
                position: 'relative',
                margin: 0,
                minHeight: rem(4),
                padding: $mol_gap.block,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                boxShadow: `0 0.5rem 0.5rem -0.5rem hsla(0,0%,0%,.25)`,
                zIndex: 2,
            },
            Title: {
                minHeight: rem(2),
                margin: 0,
                padding: $mol_gap.text,
                gap: $mol_gap.text,
                wordBreak: 'normal',
                textShadow: '0 0',
                font: {
                    size: 'inherit',
                    weight: 'normal',
                },
                flex: {
                    grow: 1,
                    shrink: 1,
                    basis: 'auto',
                },
            },
            Tools: {
                flex: {
                    basis: 'auto',
                    grow: 1000,
                    shrink: 1,
                },
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
            },
            Body: {
                flex: {
                    grow: 1000,
                    shrink: 1,
                    basis: per(100),
                },
                padding: $mol_gap.block,
            },
            Foot: {
                display: 'flex',
                justifyContent: 'space-between',
                flex: 'none',
                margin: 0,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                boxShadow: `0 -0.5rem 0.5rem -0.5rem hsla(0,0%,0%,.25)`,
                zIndex: 1,
                padding: $mol_gap.block,
                ':empty': {
                    display: 'none',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/page/page.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_speck extends $mol_view {
        attr() {
            return {
                ...super.attr(),
                mol_theme: this.theme()
            };
        }
        style() {
            return {
                ...super.style(),
                minHeight: "1em"
            };
        }
        sub() {
            return [
                this.value()
            ];
        }
        theme() {
            return "$mol_theme_accent";
        }
        value() {
            return null;
        }
    }
    $.$mol_speck = $mol_speck;
})($ || ($ = {}));
//mol/speck/-view.tree/speck.view.tree.ts
;
"use strict";
var $;
(function ($) {
    const { vary } = $mol_style_func;
    $.$mol_layer = {
        hover: vary('--mol_layer_hover'),
        focus: vary('--mol_layer_focus'),
        speck: vary('--mol_layer_speck'),
        float: vary('--mol_layer_float'),
        popup: vary('--mol_layer_popup'),
    };
})($ || ($ = {}));
//mol/layer/layer.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/layer/layer.css", ":root {\n\t--mol_layer_hover: 1;\n\t--mol_layer_focus: 2;\n\t--mol_layer_speck: 3;\n\t--mol_layer_float: 4;\n\t--mol_layer_popup: 5;\n}\n");
})($ || ($ = {}));
//mol/layer/-css/layer.css.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/speck/speck.view.css", "[mol_speck] {\n\tfont-size: .625rem;\n\tborder-radius: 1rem;\n\tmargin: -0.5rem -0.25rem;\n\talign-self: flex-start;\n\tmin-height: 1em;\n\tmin-width: .5em;\n\tvertical-align: sub;\n\tpadding: .25em .5em;\n\tposition: absolute;\n\tz-index: var(--mol_layer_speck);\n\ttext-align: center;\n\tline-height: 1;\n\tdisplay: inline-block;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n\tuser-select: none;\n}\n");
})($ || ($ = {}));
//mol/speck/-css/speck.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_button extends $mol_view {
        enabled() {
            return true;
        }
        click(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event_click(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event() {
            return {
                ...super.event(),
                click: (event) => this.event_activate(event),
                dblclick: (event) => this.clicks(event),
                keydown: (event) => this.event_key_press(event)
            };
        }
        attr() {
            return {
                ...super.attr(),
                disabled: this.disabled(),
                role: "button",
                tabindex: this.tab_index(),
                title: this.hint_safe()
            };
        }
        sub() {
            return [
                this.title()
            ];
        }
        Speck() {
            const obj = new this.$.$mol_speck();
            obj.value = () => this.error();
            return obj;
        }
        event_activate(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        clicks(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event_key_press(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        disabled() {
            return false;
        }
        tab_index() {
            return 0;
        }
        hint() {
            return "";
        }
        hint_safe() {
            return this.hint();
        }
        error() {
            return "";
        }
    }
    __decorate([
        $mol_mem
    ], $mol_button.prototype, "click", null);
    __decorate([
        $mol_mem
    ], $mol_button.prototype, "event_click", null);
    __decorate([
        $mol_mem
    ], $mol_button.prototype, "Speck", null);
    __decorate([
        $mol_mem
    ], $mol_button.prototype, "event_activate", null);
    __decorate([
        $mol_mem
    ], $mol_button.prototype, "clicks", null);
    __decorate([
        $mol_mem
    ], $mol_button.prototype, "event_key_press", null);
    $.$mol_button = $mol_button;
})($ || ($ = {}));
//mol/button/-view.tree/button.view.tree.ts
;
"use strict";
var $;
(function ($) {
    let $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["slashBackLeft"] = 226] = "slashBackLeft";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));
//mol/keyboard/code/code.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button extends $.$mol_button {
            status(next = [null]) { return next; }
            disabled() {
                return !this.enabled();
            }
            event_activate(next) {
                if (!next)
                    return;
                if (!this.enabled())
                    return;
                try {
                    this.event_click(next);
                    this.click(next);
                    this.status([null]);
                }
                catch (error) {
                    this.status([error]);
                    $mol_fail_hidden(error);
                }
            }
            event_key_press(event) {
                if (event.keyCode === $mol_keyboard_code.enter) {
                    return this.event_activate(event);
                }
            }
            tab_index() {
                return this.enabled() ? super.tab_index() : -1;
            }
            error() {
                const [error] = this.status();
                if (!error)
                    return '';
                if (error instanceof Promise) {
                    return $mol_fail_hidden(error);
                }
                return String(error.message ?? error);
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
            sub_visible() {
                return [
                    ...this.error() ? [this.Speck()] : [],
                    ...this.sub(),
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_button.prototype, "status", null);
        $$.$mol_button = $mol_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/button/button.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/button.view.css", "[mol_button] {\n\tborder: none;\n\tfont: inherit;\n\tdisplay: inline-flex;\n\tflex-shrink: 0;\n\ttext-decoration: inherit;\n\tcursor: inherit;\n\tposition: relative;\n\tbox-sizing: border-box;\n\tword-break: normal;\n\tcursor: default;\n\tuser-select: none;\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_button]:where(:not(:disabled)):hover {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_button]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));
//mol/button/-css/button.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_button_typed extends $mol_button {
        minimal_height() {
            return 40;
        }
        minimal_width() {
            return 40;
        }
    }
    $.$mol_button_typed = $mol_button_typed;
})($ || ($ = {}));
//mol/button/typed/-view.tree/typed.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/typed/typed.view.css", "[mol_button_typed] {\n\talign-content: center;\n\talign-items: center;\n\tpadding: var(--mol_gap_text);\n\tborder-radius: var(--mol_gap_round);\n\tgap: var(--mol_gap_space);\n\tuser-select: none;\n\tcursor: pointer;\n}\n\n[mol_button_typed][disabled] {\n\tpointer-events: none;\n}\n\n[mol_button_typed]:hover ,\n[mol_button_typed]:focus {\n\tbackground-color: var(--mol_theme_hover);\n}\n\n[mol_button_typed]:active {\n\tcolor: var(--mol_theme_focus);\n}\n\n");
})($ || ($ = {}));
//mol/button/typed/-css/typed.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_button_minor extends $mol_button_typed {
    }
    $.$mol_button_minor = $mol_button_minor;
})($ || ($ = {}));
//mol/button/minor/-view.tree/minor.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/minor/minor.view.css", "[mol_button_minor] {\n\tcolor: var(--mol_theme_control);\n}\n\n[mol_button_minor][disabled] {\n\tcolor: var(--mol_theme_shade);\n}\n");
})($ || ($ = {}));
//mol/button/minor/-css/minor.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_hotkey extends $mol_plugin {
        event() {
            return {
                ...super.event(),
                keydown: (event) => this.keydown(event)
            };
        }
        key() {
            return {};
        }
        mod_ctrl() {
            return false;
        }
        mod_alt() {
            return false;
        }
        mod_shift() {
            return false;
        }
        keydown(event) {
            if (event !== undefined)
                return event;
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_hotkey.prototype, "keydown", null);
    $.$mol_hotkey = $mol_hotkey;
})($ || ($ = {}));
//mol/hotkey/-view.tree/hotkey.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_hotkey extends $.$mol_hotkey {
            key() {
                return super.key();
            }
            keydown(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                let name = $mol_keyboard_code[event.keyCode];
                if (this.mod_ctrl() !== (event.ctrlKey || event.metaKey))
                    return;
                if (this.mod_alt() !== event.altKey)
                    return;
                if (this.mod_shift() !== event.shiftKey)
                    return;
                const handle = this.key()[name];
                if (handle)
                    handle(event);
            }
        }
        $$.$mol_hotkey = $mol_hotkey;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/hotkey/hotkey.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_string extends $mol_view {
        dom_name() {
            return "input";
        }
        enabled() {
            return true;
        }
        minimal_height() {
            return 40;
        }
        autocomplete() {
            return false;
        }
        selection(next) {
            if (next !== undefined)
                return next;
            return [
                0,
                0
            ];
        }
        auto() {
            return [
                this.selection_watcher()
            ];
        }
        field() {
            return {
                ...super.field(),
                disabled: this.disabled(),
                value: this.value_changed(),
                placeholder: this.hint_visible(),
                spellcheck: this.spellcheck(),
                autocomplete: this.autocomplete_native(),
                selectionEnd: this.selection_end(),
                selectionStart: this.selection_start(),
                inputMode: this.keyboard(),
                enterkeyhint: this.enter()
            };
        }
        attr() {
            return {
                ...super.attr(),
                maxlength: this.length_max(),
                type: this.type()
            };
        }
        event() {
            return {
                ...super.event(),
                input: (event) => this.event_change(event)
            };
        }
        plugins() {
            return [
                this.Submit()
            ];
        }
        selection_watcher() {
            return null;
        }
        disabled() {
            return false;
        }
        value(next) {
            if (next !== undefined)
                return next;
            return "";
        }
        value_changed(next) {
            return this.value(next);
        }
        hint() {
            return "";
        }
        hint_visible() {
            return this.hint();
        }
        spellcheck() {
            return true;
        }
        autocomplete_native() {
            return "";
        }
        selection_end() {
            return 0;
        }
        selection_start() {
            return 0;
        }
        keyboard() {
            return "text";
        }
        enter() {
            return "go";
        }
        length_max() {
            return +Infinity;
        }
        type(next) {
            if (next !== undefined)
                return next;
            return "text";
        }
        event_change(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        submit_with_ctrl() {
            return false;
        }
        submit(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        Submit() {
            const obj = new this.$.$mol_hotkey();
            obj.mod_ctrl = () => this.submit_with_ctrl();
            obj.key = () => ({
                enter: (event) => this.submit(event)
            });
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_string.prototype, "selection", null);
    __decorate([
        $mol_mem
    ], $mol_string.prototype, "value", null);
    __decorate([
        $mol_mem
    ], $mol_string.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_string.prototype, "event_change", null);
    __decorate([
        $mol_mem
    ], $mol_string.prototype, "submit", null);
    __decorate([
        $mol_mem
    ], $mol_string.prototype, "Submit", null);
    $.$mol_string = $mol_string;
})($ || ($ = {}));
//mol/string/-view.tree/string.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_string extends $.$mol_string {
            event_change(next) {
                if (!next)
                    return;
                const el = next.target;
                const from = el.selectionStart;
                const to = el.selectionEnd;
                el.value = this.value_changed(el.value);
                if (to === null)
                    return;
                el.selectionEnd = to;
                el.selectionStart = from;
                this.selection_change(next);
            }
            hint_visible() {
                return (this.enabled() ? this.hint() : '') || ' ';
            }
            disabled() {
                return !this.enabled();
            }
            autocomplete_native() {
                return this.autocomplete() ? 'on' : 'off';
            }
            selection_watcher() {
                return new $mol_dom_listener(this.$.$mol_dom_context.document, 'selectionchange', $mol_wire_async(event => this.selection_change(event)));
            }
            selection_change(event) {
                const el = this.dom_node();
                if (el !== this.$.$mol_dom_context.document.activeElement)
                    return;
                const [from, to] = this.selection([
                    el.selectionStart,
                    el.selectionEnd,
                ]);
                el.selectionEnd = to;
                el.selectionStart = from;
            }
            selection_start() {
                const el = this.dom_node();
                if (el.selectionStart === null)
                    return undefined;
                return this.selection()[0];
            }
            selection_end() {
                const el = this.dom_node();
                if (el.selectionEnd === null)
                    return undefined;
                return this.selection()[1];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "selection_watcher", null);
        $$.$mol_string = $mol_string;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/string/string.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/string/string.view.css", "[mol_string] {\n\tbox-sizing: border-box;\n\toutline-offset: 0;\n\tborder: none;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\tpadding: var(--mol_gap_text);\n\ttext-align: left;\n\tposition: relative;\n\tfont: inherit;\n\tflex: 1 1 auto;\n\tbackground: transparent;\n\tmin-width: 0;\n\tcolor: inherit;\n\tbackground: var(--mol_theme_field);\n}\n\n[mol_string]:disabled:not(:placeholder-shown) {\n\tbackground-color: transparent;\n\tcolor: var(--mol_theme_text);\n}\n\n[mol_string]:where(:not(:disabled)) {\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_string]:where(:not(:disabled)):hover {\n\tbox-shadow: inset 0 0 0 2px var(--mol_theme_line);\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_string]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_focus);\n}\n\n[mol_string]::placeholder {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_string]::-ms-clear {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));
//mol/string/-css/string.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_list extends $mol_view {
        render_visible_only() {
            return true;
        }
        render_over() {
            return 0;
        }
        sub() {
            return this.rows();
        }
        Empty() {
            const obj = new this.$.$mol_view();
            return obj;
        }
        Gap_before() {
            const obj = new this.$.$mol_view();
            obj.style = () => ({
                paddingTop: this.gap_before()
            });
            return obj;
        }
        Gap_after() {
            const obj = new this.$.$mol_view();
            obj.style = () => ({
                paddingTop: this.gap_after()
            });
            return obj;
        }
        view_window() {
            return [
                0,
                0
            ];
        }
        rows() {
            return [];
        }
        gap_before() {
            return 0;
        }
        gap_after() {
            return 0;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_list.prototype, "Empty", null);
    __decorate([
        $mol_mem
    ], $mol_list.prototype, "Gap_before", null);
    __decorate([
        $mol_mem
    ], $mol_list.prototype, "Gap_after", null);
    $.$mol_list = $mol_list;
})($ || ($ = {}));
//mol/list/-view.tree/list.view.tree.ts
;
"use strict";
var $;
(function ($) {
    let cache = null;
    function $mol_support_css_overflow_anchor() {
        return cache ?? (cache = (!/Gecko\//.test(navigator.userAgent)
            && this.$mol_dom_context.CSS?.supports('overflow-anchor:auto')) ?? false);
    }
    $.$mol_support_css_overflow_anchor = $mol_support_css_overflow_anchor;
})($ || ($ = {}));
//mol/support/css/css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_list extends $.$mol_list {
            sub() {
                const rows = this.rows();
                return (rows.length === 0) ? [this.Empty()] : rows;
            }
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            view_window(next) {
                const kids = this.sub();
                if (kids.length < 3)
                    return [0, kids.length];
                if (this.$.$mol_print.active())
                    return [0, kids.length];
                const rect = this.view_rect();
                if (next)
                    return next;
                let [min, max] = $mol_mem_cached(() => this.view_window()) ?? [0, 0];
                let max2 = max = Math.min(max, kids.length);
                let min2 = min = Math.max(0, Math.min(min, max - 1));
                const anchoring = this.render_visible_only();
                const window_height = this.$.$mol_window.size().height + 40;
                const over = Math.ceil(window_height * this.render_over());
                const limit_top = -over;
                const limit_bottom = window_height + over;
                const gap_before = $mol_mem_cached(() => this.gap_before()) ?? 0;
                const gap_after = $mol_mem_cached(() => this.gap_after()) ?? 0;
                let top = Math.ceil(rect?.top ?? 0) + gap_before;
                let bottom = Math.ceil(rect?.bottom ?? 0) - gap_after;
                if (top <= limit_top && bottom >= limit_bottom) {
                    return [min2, max2];
                }
                if (anchoring && ((bottom < limit_top) || (top > limit_bottom))) {
                    min = 0;
                    top = Math.ceil(rect?.top ?? 0);
                    while (min < (kids.length - 1)) {
                        const height = kids[min].minimal_height();
                        if (top + height >= limit_top)
                            break;
                        top += height;
                        ++min;
                    }
                    min2 = min;
                    max2 = max = min;
                    bottom = top;
                }
                let top2 = top;
                let bottom2 = bottom;
                if (anchoring && (top <= limit_top) && (bottom2 < limit_bottom)) {
                    min2 = Math.max(0, max - 1);
                    top2 = bottom;
                }
                if ((bottom >= limit_bottom) && (top2 >= limit_top)) {
                    max2 = Math.min(min + 1, kids.length);
                    bottom2 = top;
                }
                while (bottom2 < limit_bottom && max2 < kids.length) {
                    bottom2 += kids[max2].minimal_height();
                    ++max2;
                }
                while (anchoring && ((top2 >= limit_top) && (min2 > 0))) {
                    --min2;
                    top2 -= kids[min2].minimal_height();
                }
                return [min2, max2];
            }
            gap_before() {
                const skipped = this.sub().slice(0, this.view_window()[0]);
                return Math.max(0, skipped.reduce((sum, view) => sum + view.minimal_height(), 0));
            }
            gap_after() {
                const skipped = this.sub().slice(this.view_window()[1]);
                return Math.max(0, skipped.reduce((sum, view) => sum + view.minimal_height(), 0));
            }
            sub_visible() {
                return [
                    ...this.gap_before() ? [this.Gap_before()] : [],
                    ...this.sub().slice(...this.view_window()),
                    ...this.gap_after() ? [this.Gap_after()] : [],
                ];
            }
            minimal_height() {
                return this.sub().reduce((sum, view) => {
                    try {
                        return sum + view.minimal_height();
                    }
                    catch (error) {
                        $mol_fail_log(error);
                        return sum;
                    }
                }, 0);
            }
            force_render(path) {
                const kids = this.rows();
                const index = kids.findIndex(item => path.has(item));
                if (index >= 0) {
                    const win = this.view_window();
                    if (index < win[0] || index >= win[1]) {
                        this.view_window([this.render_visible_only() ? index : 0, index + 1]);
                    }
                    kids[index].force_render(path);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "view_window", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_before", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_after", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_height", null);
        $$.$mol_list = $mol_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/list/list.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/list/list.view.css", "[mol_list] {\n\twill-change: contents;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\tmax-width: 100%;\n\t/* display: flex;\n\talign-items: stretch;\n\talign-content: stretch; */\n\ttransition: none;\n\tmin-height: .5rem;\n}\n\n[mol_list_gap_before] ,\n[mol_list_gap_after] {\n\tdisplay: block !important;\n\tflex: none;\n\ttransition: none;\n\toverflow-anchor: none;\n}\n");
})($ || ($ = {}));
//mol/list/-css/list.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_labeler extends $mol_list {
        rows() {
            return [
                this.Label(),
                this.Content()
            ];
        }
        label() {
            return [
                this.title()
            ];
        }
        Label() {
            const obj = new this.$.$mol_view();
            obj.minimal_height = () => 32;
            obj.sub = () => this.label();
            return obj;
        }
        content() {
            return [];
        }
        Content() {
            const obj = new this.$.$mol_view();
            obj.minimal_height = () => 24;
            obj.sub = () => this.content();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_labeler.prototype, "Label", null);
    __decorate([
        $mol_mem
    ], $mol_labeler.prototype, "Content", null);
    $.$mol_labeler = $mol_labeler;
})($ || ($ = {}));
//mol/labeler/-view.tree/labeler.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/labeler/labeler.view.css", "[mol_labeler] {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: stretch;\n\tcursor: inherit;\n}\n\n[mol_labeler_label] {\n\tmin-height: 2rem;\n\tcolor: var(--mol_theme_shade);\n\tpadding: .5rem .75rem 0;\n\tgap: 0 var(--mol_gap_block);\n\tflex-wrap: wrap;\n}\n\n[mol_labeler_content] {\n\tdisplay: flex;\n\tpadding: var(--mol_gap_text);\n}\n");
})($ || ($ = {}));
//mol/labeler/-css/labeler.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_form_field extends $mol_labeler {
        bids() {
            return [];
        }
        label() {
            return [
                this.name(),
                this.Bid()
            ];
        }
        content() {
            return [
                this.control()
            ];
        }
        name() {
            return "";
        }
        bid() {
            return "";
        }
        Bid() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.bid()
            ];
            return obj;
        }
        control() {
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_form_field.prototype, "Bid", null);
    $.$mol_form_field = $mol_form_field;
})($ || ($ = {}));
//mol/form/field/-view.tree/field.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_form_field extends $.$mol_form_field {
            bid() {
                return this.bids().filter(Boolean)[0] ?? '';
            }
        }
        __decorate([
            $mol_mem
        ], $mol_form_field.prototype, "bid", null);
        $$.$mol_form_field = $mol_form_field;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/form/field/field.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/form/field/field.view.css", "[mol_form_field] {\n\talign-items: stretch;\n}\n\n[mol_form_field_bid] {\n\tcolor: var(--mol_theme_focus);\n\tdisplay: inline-block;\n\ttext-shadow: 0 0;\n}\n\n[mol_form_field_content] {\n\tborder-radius: var(--mol_gap_round);\n}\n");
})($ || ($ = {}));
//mol/form/field/-css/field.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_svg extends $mol_view {
        dom_name() {
            return "svg";
        }
        dom_name_space() {
            return "http://www.w3.org/2000/svg";
        }
        font_size() {
            return 16;
        }
        font_family() {
            return "";
        }
        style_size() {
            return {};
        }
    }
    $.$mol_svg = $mol_svg;
})($ || ($ = {}));
//mol/svg/-view.tree/svg.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_state_time extends $mol_object {
        static task(precision, reset) {
            if (precision) {
                return new $mol_after_timeout(precision, () => this.task(precision, null));
            }
            else {
                return new $mol_after_frame(() => this.task(precision, null));
            }
        }
        static now(precision) {
            this.task(precision);
            return Date.now();
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "task", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));
//mol/state/time/time.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg extends $.$mol_svg {
            computed_style() {
                const win = this.$.$mol_dom_context;
                const style = win.getComputedStyle(this.dom_node());
                if (!style['font-size'])
                    $mol_state_time.now(0);
                return style;
            }
            font_size() {
                return parseInt(this.computed_style()['font-size']) || 16;
            }
            font_family() {
                return this.computed_style()['font-family'];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "computed_style", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_size", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_family", null);
        $$.$mol_svg = $mol_svg;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/svg/svg.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_svg_root extends $mol_svg {
        dom_name() {
            return "svg";
        }
        attr() {
            return {
                ...super.attr(),
                viewBox: this.view_box(),
                preserveAspectRatio: this.aspect()
            };
        }
        view_box() {
            return "0 0 100 100";
        }
        aspect() {
            return "xMidYMid";
        }
    }
    $.$mol_svg_root = $mol_svg_root;
})($ || ($ = {}));
//mol/svg/root/-view.tree/root.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/svg/root/root.view.css", "[mol_svg_root] {\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));
//mol/svg/root/-css/root.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_svg_path extends $mol_svg {
        dom_name() {
            return "path";
        }
        attr() {
            return {
                ...super.attr(),
                d: this.geometry()
            };
        }
        geometry() {
            return "";
        }
    }
    $.$mol_svg_path = $mol_svg_path;
})($ || ($ = {}));
//mol/svg/path/-view.tree/path.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon extends $mol_svg_root {
        view_box() {
            return "0 0 24 24";
        }
        minimal_width() {
            return 16;
        }
        minimal_height() {
            return 16;
        }
        sub() {
            return [
                this.Path()
            ];
        }
        path() {
            return "";
        }
        Path() {
            const obj = new this.$.$mol_svg_path();
            obj.geometry = () => this.path();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_icon.prototype, "Path", null);
    $.$mol_icon = $mol_icon;
})($ || ($ = {}));
//mol/icon/-view.tree/icon.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/icon/icon.view.css", "[mol_icon] {\n\tfill: currentColor;\n\tstroke: none;\n\twidth: 1em;\n\theight: 1.5em;\n\tflex: 0 0 auto;\n\tvertical-align: top;\n\tdisplay: inline-block;\n\tfilter: drop-shadow(0px 1px 1px var(--mol_theme_back));\n\ttransform-origin: center;\n}\n\n[mol_icon_path] {\n\ttransform-origin: center;\n}\n");
})($ || ($ = {}));
//mol/icon/-css/icon.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_minus extends $mol_icon {
        path() {
            return "M19,13H5V11H19V13Z";
        }
    }
    $.$mol_icon_minus = $mol_icon_minus;
})($ || ($ = {}));
//mol/icon/minus/-view.tree/minus.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_plus extends $mol_icon {
        path() {
            return "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
        }
    }
    $.$mol_icon_plus = $mol_icon_plus;
})($ || ($ = {}));
//mol/icon/plus/-view.tree/plus.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_number extends $mol_view {
        precision_view() {
            return this.precision();
        }
        precision_change() {
            return this.precision();
        }
        value_min() {
            return -Infinity;
        }
        value_max() {
            return +Infinity;
        }
        value(next) {
            if (next !== undefined)
                return next;
            return +NaN;
        }
        enabled() {
            return true;
        }
        sub() {
            return [
                this.String(),
                this.Dec(),
                this.Inc()
            ];
        }
        precision() {
            return 1;
        }
        type() {
            return "tel";
        }
        value_string(next) {
            if (next !== undefined)
                return next;
            return "";
        }
        hint() {
            return " ";
        }
        string_enabled() {
            return this.enabled();
        }
        submit(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        String() {
            const obj = new this.$.$mol_string();
            obj.type = () => this.type();
            obj.value = (next) => this.value_string(next);
            obj.hint = () => this.hint();
            obj.enabled = () => this.string_enabled();
            obj.submit = (next) => this.submit(next);
            return obj;
        }
        event_dec(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        dec_enabled() {
            return this.enabled();
        }
        dec_icon() {
            const obj = new this.$.$mol_icon_minus();
            return obj;
        }
        Dec() {
            const obj = new this.$.$mol_button_minor();
            obj.event_click = (next) => this.event_dec(next);
            obj.enabled = () => this.dec_enabled();
            obj.sub = () => [
                this.dec_icon()
            ];
            return obj;
        }
        event_inc(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        inc_enabled() {
            return this.enabled();
        }
        inc_icon() {
            const obj = new this.$.$mol_icon_plus();
            return obj;
        }
        Inc() {
            const obj = new this.$.$mol_button_minor();
            obj.event_click = (next) => this.event_inc(next);
            obj.enabled = () => this.inc_enabled();
            obj.sub = () => [
                this.inc_icon()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_number.prototype, "value", null);
    __decorate([
        $mol_mem
    ], $mol_number.prototype, "value_string", null);
    __decorate([
        $mol_mem
    ], $mol_number.prototype, "submit", null);
    __decorate([
        $mol_mem
    ], $mol_number.prototype, "String", null);
    __decorate([
        $mol_mem
    ], $mol_number.prototype, "event_dec", null);
    __decorate([
        $mol_mem
    ], $mol_number.prototype, "dec_icon", null);
    __decorate([
        $mol_mem
    ], $mol_number.prototype, "Dec", null);
    __decorate([
        $mol_mem
    ], $mol_number.prototype, "event_inc", null);
    __decorate([
        $mol_mem
    ], $mol_number.prototype, "inc_icon", null);
    __decorate([
        $mol_mem
    ], $mol_number.prototype, "Inc", null);
    $.$mol_number = $mol_number;
})($ || ($ = {}));
//mol/number/-view.tree/number.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/number/number.css", "[mol_number] {\n\tdisplay: flex;\n\tflex: 0 1 auto;\n\tposition: relative;\n\talign-items: stretch;\n\tmax-width: 100%;\n}\n\n[mol_number_string] {\n\tappearance: textfield;\n\tflex: 1 1 7rem;\n\twidth: 7rem;\n}\n\n[mol_number_string]::-webkit-inner-spin-button {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));
//mol/number/-css/number.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_number extends $.$mol_number {
            value_limited(next) {
                if (next === undefined)
                    return this.value();
                if (next === '')
                    return this.value(Number.NaN);
                const min = this.value_min();
                const max = this.value_max();
                const val = Number(next);
                if (val < min)
                    return this.value(min);
                if (val > max)
                    return this.value(max);
                return this.value(val);
            }
            event_dec(next) {
                this.value_limited((this.value_limited() || 0) - this.precision_change());
            }
            event_inc(next) {
                this.value_limited((this.value_limited() || 0) + this.precision_change());
            }
            value_string(next) {
                const next_num = this.value_limited(next);
                const precisionView = this.precision_view();
                if (next_num === 0)
                    return '0';
                if (!next_num)
                    return '';
                if (precisionView >= 1) {
                    return (next_num / precisionView).toFixed();
                }
                else {
                    const fixedNumber = Math.log10(1 / precisionView);
                    return next_num.toFixed(Math.ceil(fixedNumber));
                }
            }
            dec_enabled() {
                return this.enabled() && (!((this.value() || 0) <= this.value_min()));
            }
            inc_enabled() {
                return this.enabled() && (!((this.value() || 0) >= this.value_max()));
            }
        }
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "dec_enabled", null);
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "inc_enabled", null);
        $$.$mol_number = $mol_number;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/number/number.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_button_major extends $mol_button_typed {
        attr() {
            return {
                ...super.attr(),
                mol_theme: "$mol_theme_accent"
            };
        }
    }
    $.$mol_button_major = $mol_button_major;
})($ || ($ = {}));
//mol/button/major/-view.tree/major.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/major/major.view.css", "[mol_button_major][disabled] {\n\topacity: .5;\n\tfilter: grayscale();\n}\n");
})($ || ($ = {}));
//mol/button/major/-css/major.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_row extends $mol_view {
    }
    $.$mol_row = $mol_row;
})($ || ($ = {}));
//mol/row/-view.tree/row.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/row/row.view.css", "[mol_row] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: flex-start;\n\talign-content: flex-start;\n\tjustify-content: flex-start;\n\tpadding: var(--mol_gap_block);\n\tgap: var(--mol_gap_block);\n\tflex: 0 0 auto;\n\tbox-sizing: border-box;\n\tmax-width: 100%;\n}\n\n[mol_row] > * {\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));
//mol/row/-css/row.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_form extends $mol_list {
        submit_allowed() {
            return true;
        }
        submit_blocked() {
            return false;
        }
        event() {
            return {
                ...super.event(),
                keydown: (event) => this.keydown(event)
            };
        }
        submit(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        rows() {
            return [
                this.Body(),
                this.Foot()
            ];
        }
        keydown(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        form_fields() {
            return [];
        }
        body() {
            return this.form_fields();
        }
        Body() {
            const obj = new this.$.$mol_list();
            obj.sub = () => this.body();
            return obj;
        }
        buttons() {
            return [];
        }
        foot() {
            return this.buttons();
        }
        Foot() {
            const obj = new this.$.$mol_row();
            obj.sub = () => this.foot();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_form.prototype, "submit", null);
    __decorate([
        $mol_mem
    ], $mol_form.prototype, "keydown", null);
    __decorate([
        $mol_mem
    ], $mol_form.prototype, "Body", null);
    __decorate([
        $mol_mem
    ], $mol_form.prototype, "Foot", null);
    $.$mol_form = $mol_form;
})($ || ($ = {}));
//mol/form/-view.tree/form.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_form extends $.$mol_form {
            form_fields() {
                return [...this.view_find(view => view instanceof $mol_form_field)]
                    .map(path => path[path.length - 1]);
            }
            submit_allowed() {
                return this.form_fields().every(field => !field.bid());
            }
            submit_blocked() {
                return !this.submit_allowed();
            }
            keydown(next) {
                if (next.ctrlKey && next.keyCode === $mol_keyboard_code.enter && !this.submit_blocked())
                    this.submit(event);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_form.prototype, "form_fields", null);
        __decorate([
            $mol_mem
        ], $mol_form.prototype, "submit_allowed", null);
        $$.$mol_form = $mol_form;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/form/form.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/form/form.view.css", "[mol_form] {\r\n\tgap: var(--mol_gap_block);\r\n}\r\n\r\n[mol_form_body] {\r\n\tgap: var(--mol_gap_block);\r\n}");
})($ || ($ = {}));
//mol/form/-css/form.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_status extends $mol_view {
        status() {
            return this.title();
        }
        minimal_height() {
            return 24;
        }
        minimal_width() {
            return 0;
        }
        sub() {
            return [
                this.message()
            ];
        }
        message() {
            return "";
        }
    }
    $.$mol_status = $mol_status;
})($ || ($ = {}));
//mol/status/-view.tree/status.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_status extends $.$mol_status {
            message() {
                try {
                    return this.status() ?? null;
                }
                catch (error) {
                    if (error instanceof Promise)
                        $mol_fail_hidden(error);
                    return error.message;
                }
            }
        }
        $$.$mol_status = $mol_status;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/status/status.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/status/status.view.css", "[mol_status] {\n\tpadding: var(--mol_gap_text);\n\tborder-radius: var(--mol_gap_round);\n\tdisplay: block;\n}\n\n[mol_status]:not([mol_view_error=\"Promise\"]) {\n\tcolor: var(--mol_theme_focus);\n}\n\n[mol_status]:not([mol_view_error=\"Promise\"]):empty {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));
//mol/status/-css/status.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $examples_products_editform extends $mol_page {
        title() {
            return this.formtitle();
        }
        tools() {
            return [
                this.Button_tools()
            ];
        }
        body() {
            return [
                this.uiblocker(),
                this.EditForm(),
                this.Result()
            ];
        }
        foot() {
            return [];
        }
        message() {
            return {
                required: "Обязательно для заполнения",
                positive: "Цена должна быть больше 0"
            };
        }
        formtitle() {
            return "";
        }
        closepage(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        Button_tools() {
            const obj = new this.$.$mol_button_minor();
            obj.title = () => "Закрыть";
            obj.event_activate = (val) => this.closepage(val);
            return obj;
        }
        uiblocker() {
            return null;
        }
        name_label() {
            return "Название";
        }
        name_bid() {
            return "";
        }
        draft(id, val) {
            if (val !== undefined)
                return val;
            return "";
        }
        Name_control() {
            const obj = new this.$.$mol_string();
            obj.value = (val) => this.draft("title", val);
            return obj;
        }
        Name_field() {
            const obj = new this.$.$mol_form_field();
            obj.name = () => this.name_label();
            obj.bid = () => this.name_bid();
            obj.control = () => this.Name_control();
            return obj;
        }
        price_label() {
            return "Цена";
        }
        price_bid() {
            return "";
        }
        draftNum(id, val) {
            if (val !== undefined)
                return val;
            return 0;
        }
        Price_control() {
            const obj = new this.$.$mol_number();
            obj.value = (val) => this.draftNum("price", val);
            obj.precision_view = () => 0.01;
            return obj;
        }
        Price_field() {
            const obj = new this.$.$mol_form_field();
            obj.name = () => this.price_label();
            obj.bid = () => this.price_bid();
            obj.control = () => this.Price_control();
            return obj;
        }
        login_submit_label() {
            return "Сохранить";
        }
        event_submit(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        Save_submit() {
            const obj = new this.$.$mol_button_major();
            obj.title = () => this.login_submit_label();
            obj.click = (next) => this.event_submit(next);
            obj.enabled = () => this.submit_allowed();
            return obj;
        }
        submit_allowed() {
            return this.EditForm().submit_allowed();
        }
        EditForm() {
            const obj = new this.$.$mol_form();
            obj.submit = (next) => this.event_submit(next);
            obj.form_fields = () => [
                this.Name_field(),
                this.Price_field()
            ];
            obj.buttons = () => [
                this.Save_submit()
            ];
            return obj;
        }
        status(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        Result() {
            const obj = new this.$.$mol_status();
            obj.message = () => this.status();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $examples_products_editform.prototype, "closepage", null);
    __decorate([
        $mol_mem
    ], $examples_products_editform.prototype, "Button_tools", null);
    __decorate([
        $mol_mem_key
    ], $examples_products_editform.prototype, "draft", null);
    __decorate([
        $mol_mem
    ], $examples_products_editform.prototype, "Name_control", null);
    __decorate([
        $mol_mem
    ], $examples_products_editform.prototype, "Name_field", null);
    __decorate([
        $mol_mem_key
    ], $examples_products_editform.prototype, "draftNum", null);
    __decorate([
        $mol_mem
    ], $examples_products_editform.prototype, "Price_control", null);
    __decorate([
        $mol_mem
    ], $examples_products_editform.prototype, "Price_field", null);
    __decorate([
        $mol_mem
    ], $examples_products_editform.prototype, "event_submit", null);
    __decorate([
        $mol_mem
    ], $examples_products_editform.prototype, "Save_submit", null);
    __decorate([
        $mol_mem
    ], $examples_products_editform.prototype, "EditForm", null);
    __decorate([
        $mol_mem
    ], $examples_products_editform.prototype, "status", null);
    __decorate([
        $mol_mem
    ], $examples_products_editform.prototype, "Result", null);
    $.$examples_products_editform = $examples_products_editform;
})($ || ($ = {}));
//examples/products/editform/-view.tree/editform.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $examples_products_editform extends $.$examples_products_editform {
            srv() {
                const srv = $examples_products_service.getInstance();
                return srv;
            }
            uiblocker() {
                return this.srv().listPendingChanel() ? this.srv().listPendingChanel() : "";
            }
            changed(random) {
                return random ?? Date.now();
            }
            model() {
                try {
                    if (!!this.isEdit()) {
                        let p = this.srv().byIdR(this.editKey());
                        this.draftObj(this.editKey(), p);
                        this.srv().creatingId("");
                        return p;
                    }
                    if (this.srv().creatingId() === this.editKey()) {
                        return this.srv().creatingChannel(this.editKey());
                    }
                    const newid = "_" + $mol_guid();
                    const newp = new Product();
                    newp.id = newid;
                    this.draftObj(newid, newp);
                    this.srv().creatingId(newid);
                    this.editKey(newid);
                    this.srv().creatingChannel(this.editKey(), newp);
                    return this.srv().creatingChannel(this.editKey());
                }
                catch (error) {
                    $mol_fail_catch(error);
                    if (error instanceof ErrorResponse) {
                        const response = error.response ? error.response.json() : null;
                        this.server_error(this.editKey(), response);
                    }
                    this.status(error.message);
                    return this.draftObj(this.editKey());
                }
            }
            editKey(val) {
                return val ?? `${$mol_state_arg.value("examples_products_edititem", val)}`;
            }
            modelid() {
                return $mol_state_arg.value("examples_products_edititem");
            }
            isEdit() {
                return !!$mol_state_arg.value("examples_products_edititem");
            }
            draftObj(id, val) {
                if (undefined !== val) {
                    this.srv().setCachedObject(id, val);
                }
                return this.srv().getCachedObject(id) ?? new Product();
            }
            server_error(id, val) {
                return val ?? null;
            }
            validation_error(field) {
                const err = this.server_error(this.editKey())?.error?.details?.errors;
                if (!err) {
                    return "";
                }
                for (const error of err) {
                    if (error?.path && error?.path[0] === field) {
                        return error.message;
                    }
                }
                return "";
            }
            closepage(val) {
                const prev = { ...$mol_state_arg.dict() };
                delete prev["examples_products_edititem"];
                delete prev["examples_products_viewpage"];
                $mol_state_arg.go(prev);
            }
            price_bid() {
                return !parseFloat(this.draft("price")) || parseFloat(this.draft("price")) < 0 ? this.message().positive : "";
            }
            name_bid() {
                return (!this.draft("title") ? this.message().required : "") && this.validation_error("title");
            }
            draft(key, val) {
                if (val !== undefined) {
                    const d = { ...this.draftObj(this.editKey()) };
                    d[key] = val;
                    this.draftObj(this.editKey(), d);
                }
                return val ?? this.model()[key];
            }
            draftNum(key, val) {
                return this.draft(key, val);
            }
            formData() {
                return {
                    title: this.draft("title"),
                    price: this.draft("price"),
                };
            }
            event_submit(val) {
                try {
                    if (this.srv().creatingId() === this.editKey()) {
                        const kid = this.editKey();
                        const created = this.srv().create(this.formData(), `${kid}`);
                        if (created) {
                            this.srv().byIdR(`${kid}`, created);
                            this.srv().creatingId("");
                            this.server_error(this.editKey(), null);
                            this.srv().listReload();
                            $mol_state_arg.value("examples_products_edititem", `${created.id}`);
                            this.srv().trackEvent(`${created.id}`, $milkywaystd_crud_events.CREATE_END);
                        }
                    }
                    else {
                        const saved = this.srv().replaceOne(this.draftObj(this.editKey()).id, this.formData());
                        this.srv().byIdR(this.editKey(), saved);
                        this.srv().creatingId("");
                    }
                }
                catch (error) {
                    $mol_fail_catch(error);
                }
            }
            clearStatusTimeout(id, val) {
                return val;
            }
            status(val) {
                this.draftObj(this.editKey());
                let status = "";
                switch (this.srv().trackEventChannel(this.editKey())) {
                    case $milkywaystd_crud_events.ONE_REPLACE_ERROR:
                    case $milkywaystd_crud_events.ONE_UPDATE_ERROR:
                    case $milkywaystd_crud_events.CREATE_ERROR:
                        break;
                    case $milkywaystd_crud_events.ONE_FETCH_ERROR:
                        break;
                    case $milkywaystd_crud_events.ONE_UPDATE_END:
                    case $milkywaystd_crud_events.ONE_REPLACE_END:
                    case $milkywaystd_crud_events.CREATE_END:
                        status = "Сохранено";
                        break;
                    default:
                        break;
                }
                if (status)
                    this.clearStatusTimeout(this.editKey(), new $mol_after_timeout(2000, () => {
                        this.srv().trackEvent(this.editKey(), "");
                    }));
                return val ?? status;
            }
            formtitle() {
                return this.isEdit() ? "Редактирование товара" : "Создание товара";
            }
        }
        __decorate([
            $mol_mem
        ], $examples_products_editform.prototype, "srv", null);
        __decorate([
            $mol_mem
        ], $examples_products_editform.prototype, "uiblocker", null);
        __decorate([
            $mol_mem
        ], $examples_products_editform.prototype, "changed", null);
        __decorate([
            $mol_mem
        ], $examples_products_editform.prototype, "model", null);
        __decorate([
            $mol_mem
        ], $examples_products_editform.prototype, "editKey", null);
        __decorate([
            $mol_mem
        ], $examples_products_editform.prototype, "modelid", null);
        __decorate([
            $mol_mem
        ], $examples_products_editform.prototype, "isEdit", null);
        __decorate([
            $mol_mem_key
        ], $examples_products_editform.prototype, "server_error", null);
        __decorate([
            $mol_mem_key
        ], $examples_products_editform.prototype, "validation_error", null);
        __decorate([
            $mol_action
        ], $examples_products_editform.prototype, "closepage", null);
        __decorate([
            $mol_mem
        ], $examples_products_editform.prototype, "price_bid", null);
        __decorate([
            $mol_mem
        ], $examples_products_editform.prototype, "name_bid", null);
        __decorate([
            $mol_mem_key
        ], $examples_products_editform.prototype, "draft", null);
        __decorate([
            $mol_mem_key
        ], $examples_products_editform.prototype, "draftNum", null);
        __decorate([
            $mol_mem
        ], $examples_products_editform.prototype, "formData", null);
        __decorate([
            $mol_action
        ], $examples_products_editform.prototype, "event_submit", null);
        __decorate([
            $mol_mem_key
        ], $examples_products_editform.prototype, "clearStatusTimeout", null);
        __decorate([
            $mol_mem
        ], $examples_products_editform.prototype, "status", null);
        __decorate([
            $mol_mem
        ], $examples_products_editform.prototype, "formtitle", null);
        $$.$examples_products_editform = $examples_products_editform;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//examples/products/editform/editfor.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_link extends $mol_view {
        uri() {
            return "";
        }
        dom_name() {
            return "a";
        }
        attr() {
            return {
                ...super.attr(),
                href: this.uri_toggle(),
                title: this.hint_safe(),
                target: this.target(),
                download: this.file_name(),
                mol_link_current: this.current()
            };
        }
        sub() {
            return [
                this.title()
            ];
        }
        arg() {
            return {};
        }
        event() {
            return {
                ...super.event(),
                click: (event) => this.click(event)
            };
        }
        uri_toggle() {
            return "";
        }
        hint() {
            return "";
        }
        hint_safe() {
            return this.hint();
        }
        target() {
            return "_self";
        }
        file_name() {
            return "";
        }
        current() {
            return false;
        }
        event_click(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        click(event) {
            return this.event_click(event);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_link.prototype, "event_click", null);
    $.$mol_link = $mol_link;
})($ || ($ = {}));
//mol/link/-view.tree/link.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_link extends $.$mol_link {
            uri_toggle() {
                return this.current() ? this.uri_off() : this.uri();
            }
            uri() {
                return new this.$.$mol_state_arg(this.state_key()).link(this.arg());
            }
            uri_off() {
                const arg2 = {};
                for (let i in this.arg())
                    arg2[i] = null;
                return new this.$.$mol_state_arg(this.state_key()).link(arg2);
            }
            uri_native() {
                const base = this.$.$mol_state_arg.href();
                return new URL(this.uri(), base);
            }
            current() {
                const base = this.$.$mol_state_arg.href_normal();
                const target = this.uri_native().toString();
                if (base === target)
                    return true;
                const args = this.arg();
                const keys = Object.keys(args).filter(key => args[key] != null);
                if (keys.length === 0)
                    return false;
                for (const key of keys) {
                    if (this.$.$mol_state_arg.value(key) != args[key])
                        return false;
                }
                return true;
            }
            file_name() {
                return null;
            }
            minimal_height() {
                return Math.max(super.minimal_height(), 24);
            }
            external() {
                return this.uri_native().origin !== $mol_dom_context.location.origin;
            }
            target() {
                return this.external() ? '_blank' : '_self';
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_toggle", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_off", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_native", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "current", null);
        $$.$mol_link = $mol_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/link/link.view.ts
;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    $mol_style_define($mol_link, {
        textDecoration: 'none',
        color: $mol_theme.control,
        stroke: 'currentcolor',
        cursor: 'pointer',
        padding: $mol_gap.text,
        boxSizing: 'border-box',
        position: 'relative',
        minWidth: rem(2.5),
        gap: $mol_gap.space,
        border: {
            radius: $mol_gap.round,
        },
        ':hover': {
            background: {
                color: $mol_theme.hover,
            },
        },
        ':focus': {
            outline: 'none',
            background: {
                color: $mol_theme.hover,
            },
        },
        ':focus-within': {
            outline: 'none',
            background: {
                color: $mol_theme.hover,
            }
        },
        ':active': {
            color: $mol_theme.focus,
        },
        '@': {
            mol_link_current: {
                'true': {
                    color: $mol_theme.current,
                    textShadow: '0 0',
                }
            }
        },
    });
})($ || ($ = {}));
//mol/link/link.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_pop extends $mol_view {
        showed(next) {
            if (next !== undefined)
                return next;
            return false;
        }
        align_vert() {
            return "";
        }
        align_hor() {
            return "";
        }
        prefer() {
            return "vert";
        }
        sub() {
            return [
                this.Anchor()
            ];
        }
        sub_visible() {
            return [
                this.Anchor(),
                this.Bubble()
            ];
        }
        Anchor() {
            return null;
        }
        align() {
            return "bottom_center";
        }
        bubble_content() {
            return [];
        }
        height_max() {
            return 9999;
        }
        Bubble() {
            const obj = new this.$.$mol_pop_bubble();
            obj.align = () => this.align();
            obj.content = () => this.bubble_content();
            obj.height_max = () => this.height_max();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_pop.prototype, "showed", null);
    __decorate([
        $mol_mem
    ], $mol_pop.prototype, "Bubble", null);
    $.$mol_pop = $mol_pop;
    class $mol_pop_bubble extends $mol_view {
        sub() {
            return this.content();
        }
        style() {
            return {
                ...super.style(),
                maxHeight: this.height_max()
            };
        }
        attr() {
            return {
                ...super.attr(),
                mol_pop_align: this.align(),
                tabindex: 0
            };
        }
        content() {
            return [];
        }
        height_max() {
            return 9999;
        }
        align() {
            return "";
        }
    }
    $.$mol_pop_bubble = $mol_pop_bubble;
})($ || ($ = {}));
//mol/pop/-view.tree/pop.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_pop extends $.$mol_pop {
            showed(next = false) {
                this.focused();
                return next;
            }
            sub_visible() {
                return [
                    this.Anchor(),
                    ...this.showed() ? [this.Bubble()] : [],
                ];
            }
            height_max() {
                const viewport = this.$.$mol_window.size();
                const rect_bubble = this.view_rect();
                const align = this.align_vert();
                if (align === 'bottom')
                    return (viewport.height - rect_bubble.bottom) * .66;
                if (align === 'top')
                    return rect_bubble.top * .66;
                return 0;
            }
            align() {
                switch (this.prefer()) {
                    case 'hor': return `${this.align_hor()}_${this.align_vert()}`;
                    case 'vert': return `${this.align_vert()}_${this.align_hor()}`;
                    default: return this.prefer();
                }
            }
            align_vert() {
                const viewport = this.view_port();
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                return rect_pop.top > (viewport.top + viewport.height / 2) ? 'top' : 'bottom';
            }
            align_hor() {
                const viewport = this.view_port();
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                return rect_pop.left > (viewport.left + viewport.width / 2) ? 'left' : 'right';
            }
            View_port() {
                const view = new $mol_view;
                view.dom_node = () => {
                    let node = this.dom_node();
                    while (node = node.offsetParent) {
                        if (this.$.$mol_dom_context.getComputedStyle(node).overflow !== 'visible')
                            return node;
                    }
                    return this.$.$mol_dom_context.document.documentElement;
                };
                return view;
            }
            view_port() {
                return this.View_port().view_rect() ?? { ...this.$.$mol_window.size(), left: 0, top: 0 };
            }
        }
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "showed", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "height_max", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_vert", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_hor", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "View_port", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "view_port", null);
        $$.$mol_pop = $mol_pop;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/pop/pop.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pop/pop.view.css", "[mol_pop] {\n\tposition: relative;\n\tdisplay: inline-flex;\n}\n\n[mol_pop_bubble] {\n\tbox-shadow: 0 0 1rem hsla(0,0%,0%,.5);\n\tborder-radius: var(--mol_gap_round);\n\tposition: absolute;\n\tz-index: var(--mol_layer_popup);\n\tbackground: var(--mol_theme_back);\n\tmax-width: none;\n\tmax-height: none;\n\t/* overflow: hidden;\n\toverflow-y: scroll;\n\toverflow-y: overlay; */\n\tword-break: normal;\n\twidth: max-content;\n\theight: max-content;\n\tflex-direction: column;\n\tmax-width: 80vw;\n\tmax-height: 80vw;\n}\n\n:where( [mol_pop_bubble] > * ) {\n\tbackground: var(--mol_theme_card);\n}\n\n[mol_pop_bubble][mol_scroll] {\n\tbackground: var(--mol_theme_back);\n}\n\n[mol_pop_bubble]:focus {\n\toutline: none;\n}\n\n[mol_pop_align=\"suspense_suspense\"] {\n\topacity: 0;\n}\n\n[mol_pop_align=\"left_top\"] {\n\ttransform: translate(-100%);\n\tleft: 0;\n\tbottom: 0;\n}\n\n[mol_pop_align=\"left_center\"] {\n\ttransform: translate(-100%, -50%);\n\tleft: 0;\n\ttop: 50%;\n}\n\n[mol_pop_align=\"left_bottom\"] {\n\ttransform: translate(-100%);\n\tleft: 0;\n\ttop: 0;\n}\n\n[mol_pop_align=\"right_top\"] {\n\ttransform: translate(100%);\n\tright: 0;\n\tbottom: 0;\n}\n\n[mol_pop_align=\"right_center\"] {\n\ttransform: translate(100%, -50%);\n\tright: 0;\n\ttop: 50%;\n}\n\n[mol_pop_align=\"right_bottom\"] {\n\ttransform: translate(100%);\n\tright: 0;\n\ttop: 0;\n}\n\n[mol_pop_align=\"center\"] {\n\tleft: 50%;\n\ttop: 50%;\n\ttransform: translate(-50%, -50%);\n}\n\n[mol_pop_align=\"top_left\"] {\n\tright: 0;\n\tbottom: 100%;\n}\n\n[mol_pop_align=\"top_center\"] {\n\ttransform: translate(-50%);\n\tleft: 50%;\n\tbottom: 100%;\n}\n\n[mol_pop_align=\"top_right\"] {\n\tleft: 0;\n\tbottom: 100%;\n}\n\n[mol_pop_align=\"bottom_left\"] {\n\tright: 0;\n\ttop: 100%;\n}\n\n[mol_pop_align=\"bottom_center\"] {\n\ttransform: translate(-50%);\n\tleft: 50%;\n\ttop: 100%;\n}\n\n[mol_pop_align=\"bottom_right\"] {\n\tleft: 0;\n\ttop: 100%;\n}\n");
})($ || ($ = {}));
//mol/pop/-css/pop.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_nav extends $mol_plugin {
        cycle(next) {
            if (next !== undefined)
                return next;
            return false;
        }
        mod_ctrl() {
            return false;
        }
        mod_shift() {
            return false;
        }
        mod_alt() {
            return false;
        }
        keys_x(next) {
            if (next !== undefined)
                return next;
            return [];
        }
        keys_y(next) {
            if (next !== undefined)
                return next;
            return [];
        }
        current_x(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        current_y(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        event_up(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event_down(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event_left(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event_right(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event() {
            return {
                ...super.event(),
                keydown: (event) => this.event_key(event)
            };
        }
        event_key(event) {
            if (event !== undefined)
                return event;
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "cycle", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "keys_x", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "keys_y", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "current_x", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "current_y", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "event_up", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "event_down", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "event_left", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "event_right", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "event_key", null);
    $.$mol_nav = $mol_nav;
})($ || ($ = {}));
//mol/nav/-view.tree/nav.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_nav extends $.$mol_nav {
            event_key(event) {
                if (!event)
                    return event;
                if (event.defaultPrevented)
                    return;
                if (this.mod_ctrl() && !event.ctrlKey)
                    return;
                if (this.mod_shift() && !event.shiftKey)
                    return;
                if (this.mod_alt() && !event.altKey)
                    return;
                switch (event.keyCode) {
                    case $mol_keyboard_code.up: return this.event_up(event);
                    case $mol_keyboard_code.down: return this.event_down(event);
                    case $mol_keyboard_code.left: return this.event_left(event);
                    case $mol_keyboard_code.right: return this.event_right(event);
                }
            }
            event_up(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? 0 : index_y;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_down(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? keys.length - 1 : index_y;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_left(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? 0 : index_x;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            event_right(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? keys.length - 1 : index_x;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            index_y() {
                let index = this.keys_y().indexOf(this.current_y());
                if (index < 0)
                    return null;
                return index;
            }
            index_x() {
                let index = this.keys_x().indexOf(this.current_x());
                if (index < 0)
                    return null;
                return index;
            }
        }
        $$.$mol_nav = $mol_nav;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/nav/nav.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//mol/state/local/local.ts
;
"use strict";
var $;
(function ($) {
    self.addEventListener('storage', event => $.$mol_state_local.changes(event));
})($ || ($ = {}));
//mol/state/local/local.web.ts
;
"use strict";
//mol/charset/encoding/encoding.ts
;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));
//mol/charset/decode/decode.ts
;
"use strict";
var $;
(function ($) {
    const TextEncoder = globalThis.TextEncoder ?? $node.util.TextEncoder;
    const encoder = new TextEncoder();
    function $mol_charset_encode(value) {
        return encoder.encode(value);
    }
    $.$mol_charset_encode = $mol_charset_encode;
})($ || ($ = {}));
//mol/charset/encode/encode.ts
;
"use strict";
var $;
(function ($) {
    class $mol_file_not_found extends Error {
    }
    $.$mol_file_not_found = $mol_file_not_found;
    class $mol_file extends $mol_object {
        static absolute(path) {
            throw new Error('Not implemented yet');
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        reset() {
            try {
                this.stat(null);
            }
            catch (error) {
                if (error instanceof $mol_file_not_found)
                    return;
                return $mol_fail_hidden(error);
            }
        }
        version() {
            return this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
        }
        watcher() {
            console.warn('$mol_file_web.watcher() not implemented');
            return {
                destructor() { }
            };
        }
        exists(next) {
            let exists = Boolean(this.stat());
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next)
                this.parent().exists(true);
            this.ensure();
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            if (virt) {
                const now = new Date;
                this.stat({
                    type: 'file',
                    size: 0,
                    atime: now,
                    mtime: now,
                    ctime: now,
                }, 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer(undefined));
            }
            else {
                const buffer = next === undefined ? undefined : $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file.prototype, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_file, "absolute", null);
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//mol/file/file.ts
;
"use strict";
var $;
(function ($) {
    class $mol_file_web extends $mol_file {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            return this.absolute(new URL(path, this.base).toString());
        }
        static base = $mol_dom_context.document
            ? new URL('.', $mol_dom_context.document.currentScript['src']).toString()
            : '';
        buffer(next) {
            if (next !== undefined)
                throw new Error(`Saving content not supported: ${this.path}`);
            const response = $mol_fetch.response(this.path());
            if (response.native.status === 404)
                throw new $mol_file_not_found(`File not found: ${this.path()}`);
            return new Uint8Array(response.buffer());
        }
        stat(next, virt) {
            let stat = next;
            if (next === undefined) {
                const content = this.text();
                const ctime = new Date();
                stat = {
                    type: 'file',
                    size: content.length,
                    ctime,
                    atime: ctime,
                    mtime: ctime
                };
            }
            this.parent().watcher();
            return stat;
        }
        resolve(path) {
            let res = this.path() + '/' + path;
            while (true) {
                let prev = res;
                res = res.replace(/\/[^\/.]+\/\.\.\//, '/');
                if (prev === res)
                    break;
            }
            return this.constructor.absolute(res);
        }
        ensure() {
            throw new Error('$mol_file_web.ensure() not implemented');
        }
        sub() {
            throw new Error('$mol_file_web.sub() not implemented');
        }
        relate(base = this.constructor.relative('.')) {
            throw new Error('$mol_file_web.relate() not implemented');
        }
        append(next) {
            throw new Error('$mol_file_web.append() not implemented');
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_web.prototype, "buffer", null);
    __decorate([
        $mol_mem
    ], $mol_file_web.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_web.prototype, "sub", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_web, "absolute", null);
    $.$mol_file_web = $mol_file_web;
    $.$mol_file = $mol_file_web;
})($ || ($ = {}));
//mol/file/file.web.ts
;
"use strict";
//hyoo/hyoo.ts
;
"use strict";
var $;
(function ($) {
    function $mol_huggingface_run(space, method, ...data) {
        while (true) {
            try {
                if (typeof method === 'number') {
                    return $mol_wire_sync(this).$mol_huggingface_ws(space, method, ...data);
                }
                else {
                    return this.$mol_huggingface_rest(space, method, ...data);
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                if (error instanceof Error && error.message === `Queue full`) {
                    $mol_fail_log(error);
                    continue;
                }
                $mol_fail_hidden(error);
            }
        }
    }
    $.$mol_huggingface_run = $mol_huggingface_run;
    function $mol_huggingface_rest(space, method, ...data) {
        const uri = `https://${space}.hf.space/run/${method}`;
        const response = $mol_fetch.json(uri, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
        });
        if ('error' in response) {
            $mol_fail(new Error(response.error ?? 'Unknown API error'));
        }
        return response.data;
    }
    $.$mol_huggingface_rest = $mol_huggingface_rest;
    function $mol_huggingface_ws(space, fn_index, ...data) {
        const session_hash = $mol_guid();
        const socket = new WebSocket(`wss://${space}.hf.space/queue/join`);
        const promise = new Promise((done, fail) => {
            socket.onclose = event => {
                if (event.reason)
                    fail(new Error(event.reason));
            };
            socket.onerror = event => {
                fail(new Error(`Socket error`));
            };
            socket.onmessage = event => {
                const message = JSON.parse(event.data);
                switch (message.msg) {
                    case 'send_hash':
                        return socket.send(JSON.stringify({ session_hash, fn_index }));
                    case 'estimation': return;
                    case 'queue_full':
                        fail(new Error(`Queue full`));
                    case 'send_data':
                        return socket.send(JSON.stringify({ session_hash, fn_index, data }));
                    case 'process_starts': return;
                    case 'process_completed':
                        if (message.success) {
                            return done(message.output.data);
                        }
                        else {
                            return fail(new Error(message.output.error ?? `Unknown API error`));
                        }
                    default:
                        return fail(new Error(`Unknown message type: ${message.msg}`));
                }
            };
        });
        return Object.assign(promise, {
            destructor: () => socket.close()
        });
    }
    $.$mol_huggingface_ws = $mol_huggingface_ws;
})($ || ($ = {}));
//mol/huggingface/huggingface.ts
;
"use strict";
var $;
(function ($) {
    function $hyoo_lingua_translate(lang, text) {
        if (!text.trim())
            return '';
        const cache_key = `$hyoo_lingua_translate(${JSON.stringify(lang)},${JSON.stringify(text)})`;
        const cached = this.$mol_state_local.value(cache_key);
        if (cached)
            return String(cached);
        const translated = this.$mol_huggingface_run('hyoo-translate', 0, lang, text)[0];
        return this.$mol_state_local.value(cache_key, translated);
    }
    $.$hyoo_lingua_translate = $hyoo_lingua_translate;
})($ || ($ = {}));
//hyoo/lingua/translate/translate.ts
;
"use strict";
var $;
(function ($) {
    class $mol_locale extends $mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return this.$.$mol_state_local.value('locale', next) || $mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static source(lang) {
            return JSON.parse(this.$.$mol_file.relative(`web.locale=${lang}.json`).text().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    const def = this.lang_default();
                    if (lang === def)
                        throw error;
                }
            }
            return {};
        }
        static text(key) {
            const lang = this.lang();
            const target = this.texts(lang)[key];
            if (target)
                return target;
            this.warn(key);
            const en = this.texts('en')[key];
            if (!en)
                return key;
            try {
                return $mol_wire_sync($hyoo_lingua_translate).call(this.$, lang, en);
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return en;
        }
        static warn(key) {
            console.warn(`Not translated to "${this.lang()}": ${key}`);
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "warn", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//mol/locale/locale.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_cross extends $mol_icon {
        path() {
            return "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z";
        }
    }
    $.$mol_icon_cross = $mol_icon_cross;
})($ || ($ = {}));
//mol/icon/cross/-view.tree/cross.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_paragraph extends $mol_view {
        line_height() {
            return 24;
        }
        letter_width() {
            return 7;
        }
        width_limit() {
            return +Infinity;
        }
        row_width() {
            return 0;
        }
        sub() {
            return [
                this.title()
            ];
        }
    }
    $.$mol_paragraph = $mol_paragraph;
})($ || ($ = {}));
//mol/paragraph/-view.tree/paragraph.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_paragraph extends $.$mol_paragraph {
            maximal_width() {
                let width = 0;
                const letter = this.letter_width();
                for (const kid of this.sub()) {
                    if (!kid)
                        continue;
                    if (kid instanceof $mol_view) {
                        width += kid.maximal_width();
                    }
                    else if (typeof kid !== 'object') {
                        width += String(kid).length * letter;
                    }
                }
                return width;
            }
            width_limit() {
                return this.$.$mol_window.size().width;
            }
            minimal_width() {
                return this.letter_width();
            }
            row_width() {
                return Math.max(Math.min(this.width_limit(), this.maximal_width()), this.letter_width());
            }
            minimal_height() {
                return Math.max(1, Math.ceil(this.maximal_width() / this.row_width())) * this.line_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "maximal_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "row_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "minimal_height", null);
        $$.$mol_paragraph = $mol_paragraph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/paragraph/paragraph.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/paragraph/paragraph.view.css", ":where([mol_paragraph]) {\n\tmargin: 0;\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));
//mol/paragraph/-css/paragraph.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_dimmer extends $mol_paragraph {
        haystack() {
            return "";
        }
        needle() {
            return "";
        }
        sub() {
            return this.parts();
        }
        Low(id) {
            const obj = new this.$.$mol_paragraph();
            obj.sub = () => [
                this.string(id)
            ];
            return obj;
        }
        High(id) {
            const obj = new this.$.$mol_paragraph();
            obj.sub = () => [
                this.string(id)
            ];
            return obj;
        }
        parts() {
            return [];
        }
        string(id) {
            return "";
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_dimmer.prototype, "Low", null);
    __decorate([
        $mol_mem_key
    ], $mol_dimmer.prototype, "High", null);
    $.$mol_dimmer = $mol_dimmer;
})($ || ($ = {}));
//mol/dimmer/-view.tree/dimmer.view.tree.ts
;
"use strict";
//mol/type/equals/equals.ts
;
"use strict";
//mol/type/merge/merge.ts
;
"use strict";
//mol/type/intersect/intersect.ts
;
"use strict";
//mol/unicode/unicode.ts
;
"use strict";
var $;
(function ($) {
    class $mol_regexp extends RegExp {
        groups;
        constructor(source, flags = 'gsu', groups = []) {
            super(source, flags);
            this.groups = groups;
        }
        *[Symbol.matchAll](str) {
            const index = this.lastIndex;
            this.lastIndex = 0;
            try {
                while (this.lastIndex < str.length) {
                    const found = this.exec(str);
                    if (!found)
                        break;
                    yield found;
                }
            }
            finally {
                this.lastIndex = index;
            }
        }
        [Symbol.match](str) {
            const res = [...this[Symbol.matchAll](str)].filter(r => r.groups).map(r => r[0]);
            if (!res.length)
                return null;
            return res;
        }
        [Symbol.split](str) {
            const res = [];
            let token_last = null;
            for (let token of this[Symbol.matchAll](str)) {
                if (token.groups && (token_last ? token_last.groups : true))
                    res.push('');
                res.push(token[0]);
                token_last = token;
            }
            if (!res.length)
                res.push('');
            return res;
        }
        test(str) {
            return Boolean(str.match(this));
        }
        exec(str) {
            const from = this.lastIndex;
            if (from >= str.length)
                return null;
            const res = super.exec(str);
            if (res === null) {
                this.lastIndex = str.length;
                if (!str)
                    return null;
                return Object.assign([str.slice(from)], {
                    index: from,
                    input: str,
                });
            }
            if (from === this.lastIndex) {
                $mol_fail(new Error('Captured empty substring'));
            }
            const groups = {};
            const skipped = str.slice(from, this.lastIndex - res[0].length);
            if (skipped) {
                this.lastIndex = this.lastIndex - res[0].length;
                return Object.assign([skipped], {
                    index: from,
                    input: res.input,
                });
            }
            for (let i = 0; i < this.groups.length; ++i) {
                const group = this.groups[i];
                groups[group] = groups[group] || res[i + 1] || '';
            }
            return Object.assign(res, { groups });
        }
        generate(params) {
            return null;
        }
        get native() {
            return new RegExp(this.source, this.flags);
        }
        static repeat(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}?`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        static repeat_greedy(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        static vary(sources) {
            const groups = [];
            const chunks = sources.map(source => {
                const regexp = $mol_regexp.from(source);
                groups.push(...regexp.groups);
                return regexp.source;
            });
            return new $mol_regexp(`(?:${chunks.join('|')})`, '', groups);
        }
        static optional(source) {
            return $mol_regexp.repeat_greedy(source, 0, 1);
        }
        static force_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?=${regexp.source})`, regexp.flags, regexp.groups);
        }
        static forbid_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?!${regexp.source})`, regexp.flags, regexp.groups);
        }
        static from(source, { ignoreCase, multiline } = {
            ignoreCase: false,
            multiline: false,
        }) {
            let flags = 'gsu';
            if (multiline)
                flags += 'm';
            if (ignoreCase)
                flags += 'i';
            if (typeof source === 'number') {
                const src = `\\u{${source.toString(16)}}`;
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => src;
                return regexp;
            }
            if (typeof source === 'string') {
                const src = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => source;
                return regexp;
            }
            else if (source instanceof $mol_regexp) {
                const regexp = new $mol_regexp(source.source, flags, source.groups);
                regexp.generate = params => source.generate(params);
                return regexp;
            }
            if (source instanceof RegExp) {
                const test = new RegExp('|' + source.source);
                const groups = Array.from({ length: test.exec('').length - 1 }, (_, i) => String(i + 1));
                const regexp = new $mol_regexp(source.source, source.flags, groups);
                regexp.generate = () => '';
                return regexp;
            }
            if (Array.isArray(source)) {
                const patterns = source.map(src => Array.isArray(src)
                    ? $mol_regexp.optional(src)
                    : $mol_regexp.from(src));
                const chunks = patterns.map(pattern => pattern.source);
                const groups = [];
                let index = 0;
                for (const pattern of patterns) {
                    for (let group of pattern.groups) {
                        if (Number(group) >= 0) {
                            groups.push(String(index++));
                        }
                        else {
                            groups.push(group);
                        }
                    }
                }
                const regexp = new $mol_regexp(chunks.join(''), flags, groups);
                regexp.generate = params => {
                    let res = '';
                    for (const pattern of patterns) {
                        let sub = pattern.generate(params);
                        if (sub === null)
                            return '';
                        res += sub;
                    }
                    return res;
                };
                return regexp;
            }
            else {
                const groups = [];
                const chunks = Object.keys(source).map(name => {
                    groups.push(name);
                    const regexp = $mol_regexp.from(source[name]);
                    groups.push(...regexp.groups);
                    return `(${regexp.source})`;
                });
                const regexp = new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
                const validator = new RegExp('^' + regexp.source + '$', flags);
                regexp.generate = (params) => {
                    for (let option in source) {
                        if (option in params) {
                            if (typeof params[option] === 'boolean') {
                                if (!params[option])
                                    continue;
                            }
                            else {
                                const str = String(params[option]);
                                if (str.match(validator))
                                    return str;
                                $mol_fail(new Error(`Wrong param: ${option}=${str}`));
                            }
                        }
                        else {
                            if (typeof source[option] !== 'object')
                                continue;
                        }
                        const res = $mol_regexp.from(source[option]).generate(params);
                        if (res)
                            return res;
                    }
                    return null;
                };
                return regexp;
            }
        }
        static unicode_only(...category) {
            return new $mol_regexp(`\\p{${category.join('=')}}`);
        }
        static unicode_except(...category) {
            return new $mol_regexp(`\\P{${category.join('=')}}`);
        }
        static char_range(from, to) {
            return new $mol_regexp(`${$mol_regexp.from(from).source}-${$mol_regexp.from(to).source}`);
        }
        static char_only(...allowed) {
            const regexp = allowed.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[${regexp}]`);
        }
        static char_except(...forbidden) {
            const regexp = forbidden.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[^${regexp}]`);
        }
        static decimal_only = $mol_regexp.from(/\d/gsu);
        static decimal_except = $mol_regexp.from(/\D/gsu);
        static latin_only = $mol_regexp.from(/\w/gsu);
        static latin_except = $mol_regexp.from(/\W/gsu);
        static space_only = $mol_regexp.from(/\s/gsu);
        static space_except = $mol_regexp.from(/\S/gsu);
        static word_break_only = $mol_regexp.from(/\b/gsu);
        static word_break_except = $mol_regexp.from(/\B/gsu);
        static tab = $mol_regexp.from(/\t/gsu);
        static slash_back = $mol_regexp.from(/\\/gsu);
        static nul = $mol_regexp.from(/\0/gsu);
        static char_any = $mol_regexp.from(/./gsu);
        static begin = $mol_regexp.from(/^/gsu);
        static end = $mol_regexp.from(/$/gsu);
        static or = $mol_regexp.from(/|/gsu);
        static line_end = $mol_regexp.from({
            win_end: [['\r'], '\n'],
            mac_end: '\r',
        });
    }
    $.$mol_regexp = $mol_regexp;
})($ || ($ = {}));
//mol/regexp/regexp.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_dimmer extends $.$mol_dimmer {
            parts() {
                const needle = this.needle();
                if (needle.length < 2)
                    return [this.haystack()];
                let chunks = [];
                let strings = this.strings();
                for (let index = 0; index < strings.length; index++) {
                    if (strings[index] === '')
                        continue;
                    chunks.push((index % 2) ? this.High(index) : this.Low(index));
                }
                return chunks;
            }
            strings() {
                const options = this.needle().split(/\s+/g).filter(Boolean);
                if (!options.length)
                    return [this.haystack()];
                const variants = { ...options };
                const regexp = $mol_regexp.from({ needle: variants }, { ignoreCase: true });
                return this.haystack().split(regexp);
            }
            string(index) {
                return this.strings()[index];
            }
            *view_find(check, path = []) {
                if (check(this, this.haystack())) {
                    yield [...path, this];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_dimmer.prototype, "strings", null);
        $$.$mol_dimmer = $mol_dimmer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/dimmer/dimmer.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/dimmer/dimmer.view.css", "[mol_dimmer] {\n\tdisplay: block;\n\tmax-width: 100%;\n}\n\n[mol_dimmer_low] {\n\tdisplay: inline;\n\topacity: 0.8;\n}\n\n[mol_dimmer_high] {\n\tdisplay: inline;\n\tcolor: var(--mol_theme_focus);\n\ttext-shadow: 0 0;\n}\n");
})($ || ($ = {}));
//mol/dimmer/-css/dimmer.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_search extends $mol_pop {
        query(next) {
            if (next !== undefined)
                return next;
            return "";
        }
        suggests() {
            return [];
        }
        plugins() {
            return [
                ...super.plugins(),
                this.Hotkey(),
                this.Nav()
            ];
        }
        showed(next) {
            return this.suggests_showed(next);
        }
        align_hor() {
            return "right";
        }
        Anchor() {
            const obj = new this.$.$mol_view();
            obj.sub = () => this.anchor_content();
            return obj;
        }
        bubble_content() {
            return [
                this.Menu()
            ];
        }
        Suggest(id) {
            const obj = new this.$.$mol_button_minor();
            obj.click = (event) => this.suggest_select(id, event);
            obj.sub = () => this.suggest_content(id);
            return obj;
        }
        clear(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        Hotkey() {
            const obj = new this.$.$mol_hotkey();
            obj.key = () => ({
                escape: (next) => this.clear(next)
            });
            return obj;
        }
        nav_components() {
            return [];
        }
        nav_focused(component) {
            if (component !== undefined)
                return component;
            return null;
        }
        Nav() {
            const obj = new this.$.$mol_nav();
            obj.keys_y = () => this.nav_components();
            obj.current_y = (component) => this.nav_focused(component);
            return obj;
        }
        suggests_showed(next) {
            if (next !== undefined)
                return next;
            return false;
        }
        hint() {
            return this.$.$mol_locale.text('$mol_search_hint');
        }
        submit(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        enabled() {
            return true;
        }
        keyboard() {
            return "search";
        }
        enter() {
            return "search";
        }
        bring() {
            return this.Query().bring();
        }
        Query() {
            const obj = new this.$.$mol_string();
            obj.value = (next) => this.query(next);
            obj.hint = () => this.hint();
            obj.submit = (event) => this.submit(event);
            obj.enabled = () => this.enabled();
            obj.keyboard = () => this.keyboard();
            obj.enter = () => this.enter();
            return obj;
        }
        Clear_icon() {
            const obj = new this.$.$mol_icon_cross();
            return obj;
        }
        Clear() {
            const obj = new this.$.$mol_button_minor();
            obj.hint = () => this.$.$mol_locale.text('$mol_search_Clear_hint');
            obj.click = (event) => this.clear(event);
            obj.sub = () => [
                this.Clear_icon()
            ];
            return obj;
        }
        anchor_content() {
            return [
                this.Query(),
                this.Clear()
            ];
        }
        menu_items() {
            return [];
        }
        Menu() {
            const obj = new this.$.$mol_list();
            obj.rows = () => this.menu_items();
            return obj;
        }
        suggest_select(id, event) {
            if (event !== undefined)
                return event;
            return null;
        }
        suggest_label(id) {
            return "";
        }
        Suggest_label(id) {
            const obj = new this.$.$mol_dimmer();
            obj.haystack = () => this.suggest_label(id);
            obj.needle = () => this.query();
            return obj;
        }
        suggest_content(id) {
            return [
                this.Suggest_label(id)
            ];
        }
    }
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "query", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Anchor", null);
    __decorate([
        $mol_mem_key
    ], $mol_search.prototype, "Suggest", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "clear", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Hotkey", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "nav_focused", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Nav", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "suggests_showed", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "submit", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Query", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Clear_icon", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Clear", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Menu", null);
    __decorate([
        $mol_mem_key
    ], $mol_search.prototype, "suggest_select", null);
    __decorate([
        $mol_mem_key
    ], $mol_search.prototype, "Suggest_label", null);
    $.$mol_search = $mol_search;
})($ || ($ = {}));
//mol/search/-view.tree/search.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_search extends $.$mol_search {
            anchor_content() {
                return [
                    this.Query(),
                    ...this.query() ? [this.Clear()] : [],
                ];
            }
            suggests_showed(next = true) {
                this.query();
                if (!this.focused())
                    return false;
                return next;
            }
            suggest_selected(next) {
                if (next === undefined)
                    return;
                this.query(next);
                this.Query().focused(true);
            }
            nav_components() {
                return [
                    this.Query(),
                    ...this.menu_items(),
                ];
            }
            nav_focused(component) {
                if (!this.focused())
                    return null;
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.suggests_showed()) {
                    this.ensure_visible(component, "center");
                    component.focused(true);
                }
                return component;
            }
            suggest_label(key) {
                return key;
            }
            menu_items() {
                return this.suggests().map((suggest) => this.Suggest(suggest));
            }
            suggest_select(id, event) {
                this.query(id);
                this.Query().selection([id.length, id.length]);
                this.Query().focused(true);
            }
            clear(event) {
                this.query('');
            }
        }
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "anchor_content", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "suggests_showed", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "nav_focused", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "menu_items", null);
        $$.$mol_search = $mol_search;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/search/search.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/search/search.view.css", "[mol_search] {\n\talign-self: flex-start;\n\tflex: auto;\n}\n\n[mol_search_anchor] {\n\tflex: 1 1 auto;\n}\n\n[mol_search_query] {\n\tflex-grow: 1;\n}\n\n[mol_search_menu] {\n\tmin-height: .75rem;\n\tdisplay: flex;\n}\n\n[mol_search_suggest] {\n\ttext-align: left;\n}\n\n[mol_search_suggest_label_high] {\n\tcolor: var(--mol_theme_shade);\n\ttext-shadow: none;\n}\n");
})($ || ($ = {}));
//mol/search/-css/search.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_book2_catalog extends $mol_book2 {
        param() {
            return "";
        }
        spread(next) {
            if (next !== undefined)
                return next;
            return "";
        }
        spreads() {
            return {};
        }
        Spread() {
            const obj = new this.$.$mol_view();
            return obj;
        }
        pages() {
            return [
                this.Menu()
            ];
        }
        Spread_close() {
            const obj = new this.$.$mol_link();
            obj.arg = () => this.spread_close_arg();
            obj.sub = () => [
                this.Spread_close_icon()
            ];
            return obj;
        }
        Menu_logo() {
            return null;
        }
        menu_title() {
            return "";
        }
        menu_tools() {
            return [];
        }
        menu_head() {
            return [
                this.Menu_title(),
                this.Menu_tools()
            ];
        }
        menu_filter(next) {
            if (next !== undefined)
                return next;
            return "";
        }
        Menu_filter() {
            const obj = new this.$.$mol_search();
            obj.query = (next) => this.menu_filter(next);
            return obj;
        }
        arg(id) {
            return {};
        }
        spread_title(id) {
            return "";
        }
        Menu_link_title(id) {
            const obj = new this.$.$mol_dimmer();
            obj.needle = () => this.menu_filter();
            obj.haystack = () => this.spread_title(id);
            return obj;
        }
        menu_link_content(id) {
            return [
                this.Menu_link_title(id)
            ];
        }
        Menu_link(id) {
            const obj = new this.$.$mol_link();
            obj.arg = () => this.arg(id);
            obj.sub = () => this.menu_link_content(id);
            return obj;
        }
        menu_links() {
            return [
                this.Menu_link("0")
            ];
        }
        Menu_links() {
            const obj = new this.$.$mol_list();
            obj.rows = () => this.menu_links();
            return obj;
        }
        menu_body() {
            return [
                this.Menu_filter(),
                this.Menu_links()
            ];
        }
        menu_foot() {
            return [];
        }
        Menu_title() {
            return this.Menu().Title();
        }
        Menu_tools() {
            return this.Menu().Tools();
        }
        Menu() {
            const obj = new this.$.$mol_page();
            obj.Logo = () => this.Menu_logo();
            obj.title = () => this.menu_title();
            obj.tools = () => this.menu_tools();
            obj.head = () => this.menu_head();
            obj.body = () => this.menu_body();
            obj.foot = () => this.menu_foot();
            return obj;
        }
        spread_close_arg() {
            return {};
        }
        Spread_close_icon() {
            const obj = new this.$.$mol_icon_cross();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_book2_catalog.prototype, "spread", null);
    __decorate([
        $mol_mem
    ], $mol_book2_catalog.prototype, "Spread", null);
    __decorate([
        $mol_mem
    ], $mol_book2_catalog.prototype, "Spread_close", null);
    __decorate([
        $mol_mem
    ], $mol_book2_catalog.prototype, "menu_filter", null);
    __decorate([
        $mol_mem
    ], $mol_book2_catalog.prototype, "Menu_filter", null);
    __decorate([
        $mol_mem_key
    ], $mol_book2_catalog.prototype, "Menu_link_title", null);
    __decorate([
        $mol_mem_key
    ], $mol_book2_catalog.prototype, "Menu_link", null);
    __decorate([
        $mol_mem
    ], $mol_book2_catalog.prototype, "Menu_links", null);
    __decorate([
        $mol_mem
    ], $mol_book2_catalog.prototype, "Menu", null);
    __decorate([
        $mol_mem
    ], $mol_book2_catalog.prototype, "Spread_close_icon", null);
    $.$mol_book2_catalog = $mol_book2_catalog;
})($ || ($ = {}));
//mol/book2/catalog/-view.tree/catalog.view.tree.ts
;
"use strict";
var $;
(function ($) {
    function $mol_match_text(query, values) {
        const tags = query.toLowerCase().trim().split(/\s+/).filter(tag => tag);
        if (tags.length === 0)
            return () => true;
        return (variant) => {
            const vals = values(variant);
            return tags.every(tag => vals.some(val => val.toLowerCase().indexOf(tag) >= 0));
        };
    }
    $.$mol_match_text = $mol_match_text;
})($ || ($ = {}));
//mol/match/text.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_book2_catalog extends $.$mol_book2_catalog {
            pages() {
                const spread = this.Spread();
                return [
                    this.Menu(),
                    ...spread
                        ? spread instanceof $mol_book2
                            ? spread.pages()
                            : [spread]
                        : [],
                ];
            }
            menu_body() {
                return [
                    ...Object.keys(this.spreads()).length >= 10 ? [this.Menu_filter()] : [],
                    this.Menu_links(),
                ];
            }
            menu_links() {
                return Object.keys(this.spreads())
                    .filter($mol_match_text(this.menu_filter(), spread => [this.spread_title(spread)]))
                    .map(spread => this.Menu_link(spread));
            }
            Spread() {
                return this.spreads()[this.spread()];
            }
            spread(next) {
                return this.$.$mol_state_arg.value(this.param(), next) ?? '';
            }
            arg(spread) {
                return { [this.param()]: spread || null };
            }
            spread_close_arg() {
                return { [this.param()]: null };
            }
            spread_title(spread) {
                const page = this.spreads()[spread];
                return page instanceof $mol_book2
                    && page.menu_title()
                    || page.title();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "pages", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "menu_body", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "menu_links", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "spread", null);
        $$.$mol_book2_catalog = $mol_book2_catalog;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/book2/catalog/catalog.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/book2/catalog/catalog.view.css", "[mol_book2_catalog_menu_filter] {\n\tflex-shrink: 0;\n\tflex-grow: 0;\n\talign-self: stretch;\n}\n\n");
})($ || ($ = {}));
//mol/book2/catalog/-css/catalog.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $examples_crudapi extends $mol_book2_catalog {
        menu_title() {
            return "CRUDAPI examples";
        }
        spreads() {
            return {
                p: this.products(),
                p2: this.products2()
            };
        }
        tags() {
            return [
                "crud"
            ];
        }
        products() {
            const obj = new this.$.$examples_products();
            obj.param = () => "mol_book2_crud_demo_1";
            obj.menu_title = () => "Classic";
            return obj;
        }
        products2() {
            const obj = new this.$.$examples_products2();
            obj.param = () => "mol_book2_crud_demo_2";
            obj.menu_title = () => "Optimistic";
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $examples_crudapi.prototype, "products", null);
    __decorate([
        $mol_mem
    ], $examples_crudapi.prototype, "products2", null);
    $.$examples_crudapi = $examples_crudapi;
})($ || ($ = {}));
//examples/crudapi/-view.tree/crudapi.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_stack extends $mol_view {
    }
    $.$mol_stack = $mol_stack;
})($ || ($ = {}));
//mol/stack/-view.tree/stack.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/stack/stack.view.css", "[mol_stack] {\n\tdisplay: grid;\n\t/* width: max-content; */\n\t/* height: max-content; */\n\talign-items: flex-start;\n\tjustify-items: flex-start;\n}\n\n[mol_stack] > * {\n\tgrid-area: 1/1;\n}\n");
})($ || ($ = {}));
//mol/stack/-css/stack.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_text_code_token extends $mol_dimmer {
        attr() {
            return {
                ...super.attr(),
                mol_text_code_token_type: this.type()
            };
        }
        type() {
            return "";
        }
    }
    $.$mol_text_code_token = $mol_text_code_token;
    class $mol_text_code_token_link extends $mol_text_code_token {
        dom_name() {
            return "a";
        }
        type() {
            return "code-link";
        }
        attr() {
            return {
                ...super.attr(),
                href: this.uri(),
                target: "_blank"
            };
        }
        uri() {
            return "";
        }
    }
    $.$mol_text_code_token_link = $mol_text_code_token_link;
})($ || ($ = {}));
//mol/text/code/token/-view.tree/token.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { hsla } = $mol_style_func;
        $mol_style_define($mol_text_code_token, {
            display: 'inline',
            textDecoration: 'none',
            '@': {
                mol_text_code_token_type: {
                    'code-keyword': {
                        color: hsla(0, 70, 60, 1),
                    },
                    'code-field': {
                        color: hsla(300, 70, 50, 1),
                    },
                    'code-tag': {
                        color: hsla(330, 70, 50, 1),
                    },
                    'code-global': {
                        color: hsla(30, 80, 50, 1),
                    },
                    'code-decorator': {
                        color: hsla(180, 40, 50, 1),
                    },
                    'code-punctuation': {
                        color: hsla(0, 0, 50, 1),
                    },
                    'code-string': {
                        color: hsla(90, 40, 50, 1),
                    },
                    'code-number': {
                        color: hsla(55, 65, 45, 1),
                    },
                    'code-call': {
                        color: hsla(270, 60, 50, 1),
                    },
                    'code-link': {
                        color: hsla(210, 60, 50, 1),
                    },
                    'code-comment-inline': {
                        opacity: .5,
                    },
                    'code-comment-block': {
                        opacity: .5,
                    },
                    'code-docs': {
                        opacity: .75,
                    },
                },
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/text/code/token/token.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_text_code_row extends $mol_paragraph {
        text() {
            return "";
        }
        minimal_height() {
            return 24;
        }
        numb_showed() {
            return true;
        }
        syntax() {
            return null;
        }
        uri_resolve(id) {
            return "";
        }
        Numb() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.numb()
            ];
            return obj;
        }
        Token(id) {
            const obj = new this.$.$mol_text_code_token();
            obj.type = () => this.token_type(id);
            obj.haystack = () => this.token_text(id);
            obj.needle = () => this.highlight();
            return obj;
        }
        Token_link(id) {
            const obj = new this.$.$mol_text_code_token_link();
            obj.haystack = () => this.token_text(id);
            obj.needle = () => this.highlight();
            obj.uri = () => this.token_uri(id);
            return obj;
        }
        find_pos(id) {
            return null;
        }
        numb() {
            return 0;
        }
        token_type(id) {
            return "";
        }
        token_text(id) {
            return "";
        }
        highlight() {
            return "";
        }
        token_uri(id) {
            return "";
        }
    }
    __decorate([
        $mol_mem
    ], $mol_text_code_row.prototype, "Numb", null);
    __decorate([
        $mol_mem_key
    ], $mol_text_code_row.prototype, "Token", null);
    __decorate([
        $mol_mem_key
    ], $mol_text_code_row.prototype, "Token_link", null);
    $.$mol_text_code_row = $mol_text_code_row;
})($ || ($ = {}));
//mol/text/code/row/-view.tree/row.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_syntax2 {
        lexems;
        constructor(lexems) {
            this.lexems = lexems;
            for (let name in lexems) {
                this.rules.push({
                    name: name,
                    regExp: lexems[name],
                    size: RegExp('^$|' + lexems[name].source).exec('').length - 1,
                });
            }
            const parts = '(' + this.rules.map(rule => rule.regExp.source).join(')|(') + ')';
            this.regexp = RegExp(`([\\s\\S]*?)(?:(${parts})|$(?![^]))`, 'gmu');
        }
        rules = [];
        regexp;
        tokenize(text, handle) {
            let end = 0;
            lexing: while (end < text.length) {
                const start = end;
                this.regexp.lastIndex = start;
                var found = this.regexp.exec(text);
                end = this.regexp.lastIndex;
                if (start === end)
                    throw new Error('Empty token');
                var prefix = found[1];
                if (prefix)
                    handle('', prefix, [], start);
                var suffix = found[2];
                if (!suffix)
                    continue;
                let offset = 4;
                for (let rule of this.rules) {
                    if (found[offset - 1]) {
                        handle(rule.name, suffix, found.slice(offset, offset + rule.size), start + prefix.length);
                        continue lexing;
                    }
                    offset += rule.size + 1;
                }
                $mol_fail(new Error('$mol_syntax2 is broken'));
            }
        }
        parse(text, handlers) {
            this.tokenize(text, (name, ...args) => handlers[name](...args));
        }
    }
    $.$mol_syntax2 = $mol_syntax2;
})($ || ($ = {}));
//mol/syntax2/syntax2.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_syntax2_md_flow = new $mol_syntax2({
        'quote': /^((?:(?:[>"] )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/,
        'header': /^([#=]+)(\s+)(.*?)$([\n\r]*)/,
        'list': /^((?:(?: ?([*+-])|(?:\d+[\.\)])+) +(?:[^]*?)$(?:\r?\n?)(?:  (?:[^]*?)$(?:\r?\n?))*)+)((?:\r?\n)*)/,
        'code': /^(```\s*)([\w.-]*)[\r\n]+([^]*?)^(```)$([\n\r]*)/,
        'code-indent': /^((?:(?:  |\t)(?:[^]*?)$\r?\n?)+)([\n\r]*)/,
        'table': /((?:^\|.+?$\r?\n?)+)([\n\r]*)/,
        'grid': /((?:^ *! .*?$\r?\n?)+)([\n\r]*)/,
        'cut': /^--+$((?:\r?\n)*)/,
        'block': /^(.*?)$((?:\r?\n)*)/,
    });
    $.$mol_syntax2_md_line = new $mol_syntax2({
        'strong': /\*\*(.+?)\*\*/,
        'emphasis': /\*(?!\s)(.+?)\*|\/\/(?!\s)(.+?)\/\//,
        'code': /```(.+?)```|;;(.+?);;|`(.+?)`/,
        'insert': /\+\+(.+?)\+\+/,
        'delete': /~~(.+?)~~|--(.+?)--/,
        'embed': /""(?:(.*?)\\)?(.*?)""/,
        'link': /\\\\(?:(.*?)\\)?(.*?)\\\\/,
        'image-link': /!\[([^\[\]]*?)\]\((.*?)\)/,
        'text-link': /\[(.*?(?:\[.*?\].*?)*)\]\((.*?)\)/,
        'text-link-http': /\b(https?:\/\/[^\s,.;:!?")]+(?:[,.;:!?")][^\s,.;:!?")]+)+)/,
    });
    $.$mol_syntax2_md_code = new $mol_syntax2({
        'code-indent': /\t+/,
        'code-docs': /\/\/\/.*?$/,
        'code-comment-block': /(?:\/\*[^]*?\*\/|\/\+[^]*?\+\/|<![^]*?>)/,
        'code-link': /(?:\w+:\/\/|#)\S+?(?=\s|\\\\|""|$)/,
        'code-comment-inline': /\/\/.*?(?:$|\/\/)/,
        'code-string': /(?:".*?"|'.*?'|`.*?`|\/.+?\/[dygimsu]*(?!\p{Letter})|(?:^|[ \t])\\[^\n]*\n)/,
        'code-number': /[+-]?(?:\d*\.)?\d+\w*/,
        'code-call': /\.?\w+ *(?=\()/,
        'code-sexpr': /\((\w+ )/,
        'code-field': /(?:(?:\.|::|->)\w+|[\w-]+\??\s*:(?!\/\/|:))/,
        'code-keyword': /\b(throw|readonly|unknown|keyof|typeof|never|from|class|struct|interface|type|function|extends|implements|module|namespace|import|export|include|require|var|val|let|const|for|do|while|until|in|out|of|new|if|then|else|switch|case|this|return|async|await|try|catch|break|continue|get|set|public|private|protected|string|boolean|number|null|undefined|true|false|void|int|float|ref)\b/,
        'code-global': /[$]+\w*|\b[A-Z][a-z0-9]+[A-Z]\w*/,
        'code-word': /\w+/,
        'code-decorator': /@\s*\S+/,
        'code-tag': /<\/?[\w-]+\/?>?|&\w+;/,
        'code-punctuation': /[\-\[\]\{\}\(\)<=>~!\?@#%&\*_\+\\\/\|;:\.,\^]+?/,
    });
})($ || ($ = {}));
//mol/syntax2/md/md.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text_code_row extends $.$mol_text_code_row {
            maximal_width() {
                return this.text().length * this.letter_width();
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            tokens(path) {
                const tokens = [];
                const text = (path.length > 0)
                    ? this.tokens(path.slice(0, path.length - 1))[path[path.length - 1]].found.slice(1, -1)
                    : this.text();
                this.syntax().tokenize(text, (name, found, chunks) => {
                    if (name === 'code-sexpr') {
                        tokens.push({ name: 'code-punctuation', found: '(', chunks: [] });
                        tokens.push({ name: 'code-call', found: chunks[0], chunks: [] });
                    }
                    else {
                        tokens.push({ name, found, chunks });
                    }
                });
                return tokens;
            }
            sub() {
                return [
                    ...this.numb_showed() ? [this.Numb()] : [],
                    ...this.row_content([])
                ];
            }
            row_content(path) {
                return this.tokens(path).map((t, i) => this.Token([...path, i]));
            }
            Token(path) {
                return this.token_type(path) === 'code-link' ? this.Token_link(path) : super.Token(path);
            }
            token_type(path) {
                return this.tokens([...path.slice(0, path.length - 1)])[path[path.length - 1]].name;
            }
            token_content(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                switch (token.name) {
                    case 'code-string': return [
                        token.found[0],
                        ...this.row_content(path),
                        token.found[token.found.length - 1],
                    ];
                    default: return [token.found];
                }
            }
            token_text(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                return token.found;
            }
            token_uri(path) {
                const uri = this.token_text(path);
                return this.uri_resolve(uri);
            }
            *view_find(check, path = []) {
                if (check(this, this.text())) {
                    yield [...path, this];
                }
            }
            find_pos(offset) {
                return this.find_token_pos([offset]);
            }
            find_token_pos([offset, ...path]) {
                for (const [index, token] of this.tokens(path).entries()) {
                    if (token.found.length >= offset) {
                        const token = this.Token([...path, index]);
                        return { token, offset };
                    }
                    else {
                        offset -= token.found.length;
                    }
                }
                return null;
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "row_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "token_type", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "token_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "token_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "token_uri", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "find_pos", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "find_token_pos", null);
        $$.$mol_text_code_row = $mol_text_code_row;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/text/code/row/row.view.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem } = $mol_style_unit;
        $mol_style_define($mol_text_code_row, {
            display: 'block',
            position: 'relative',
            font: {
                family: 'monospace',
            },
            Numb: {
                textAlign: 'right',
                color: $mol_theme.shade,
                width: rem(3),
                margin: {
                    left: rem(-4),
                },
                display: 'inline-block',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                position: 'absolute',
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/text/code/row/row.view.css.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_blob = ($node.buffer?.Blob ?? $mol_dom_context.Blob);
})($ || ($ = {}));
//mol/blob/blob.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_clipboard extends $mol_icon {
        path() {
            return "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M12,3C12.55,3 13,3.45 13,4C13,4.55 12.55,5 12,5C11.45,5 11,4.55 11,4C11,3.45 11.45,3 12,3";
        }
    }
    $.$mol_icon_clipboard = $mol_icon_clipboard;
})($ || ($ = {}));
//mol/icon/clipboard/-view.tree/clipboard.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_clipboard_outline extends $mol_icon {
        path() {
            return "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M12,3C12.55,3 13,3.45 13,4C13,4.55 12.55,5 12,5C11.45,5 11,4.55 11,4C11,3.45 11.45,3 12,3M7,7H17V5H19V19H5V5H7V7Z";
        }
    }
    $.$mol_icon_clipboard_outline = $mol_icon_clipboard_outline;
})($ || ($ = {}));
//mol/icon/clipboard/outline/-view.tree/outline.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_button_copy extends $mol_button_minor {
        blobs() {
            return [
                this.text_blob(),
                this.html_blob()
            ];
        }
        data() {
            return {};
        }
        sub() {
            return [
                this.Icon(),
                this.title()
            ];
        }
        text() {
            return this.title();
        }
        text_blob(next) {
            if (next !== undefined)
                return next;
            const obj = new this.$.$mol_blob([
                this.text()
            ], {
                type: "text/plain"
            });
            return obj;
        }
        html() {
            return "";
        }
        html_blob(next) {
            if (next !== undefined)
                return next;
            const obj = new this.$.$mol_blob([
                this.html()
            ], {
                type: "text/html"
            });
            return obj;
        }
        Icon() {
            const obj = new this.$.$mol_icon_clipboard_outline();
            return obj;
        }
        title() {
            return "";
        }
    }
    __decorate([
        $mol_mem
    ], $mol_button_copy.prototype, "text_blob", null);
    __decorate([
        $mol_mem
    ], $mol_button_copy.prototype, "html_blob", null);
    __decorate([
        $mol_mem
    ], $mol_button_copy.prototype, "Icon", null);
    $.$mol_button_copy = $mol_button_copy;
})($ || ($ = {}));
//mol/button/copy/-view.tree/copy.view.tree.ts
;
"use strict";
var $;
(function ($) {
    const mapping = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '&': '&amp;',
    };
    function $mol_html_encode(text) {
        return text.replace(/[&<">]/gi, str => mapping[str]);
    }
    $.$mol_html_encode = $mol_html_encode;
})($ || ($ = {}));
//mol/html/encode/encode.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button_copy extends $.$mol_button_copy {
            data() {
                return Object.fromEntries(this.blobs().map(blob => [blob.type, blob]));
            }
            html() {
                return $mol_html_encode(this.text());
            }
            attachments() {
                return [new ClipboardItem(this.data())];
            }
            click(event) {
                const cb = $mol_wire_sync(this.$.$mol_dom_context.navigator.clipboard);
                cb.write(this.attachments());
            }
        }
        __decorate([
            $mol_mem
        ], $mol_button_copy.prototype, "html", null);
        __decorate([
            $mol_mem
        ], $mol_button_copy.prototype, "attachments", null);
        $$.$mol_button_copy = $mol_button_copy;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/button/copy/copy.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_text_code extends $mol_stack {
        attr() {
            return {
                ...super.attr(),
                mol_text_code_sidebar_showed: this.sidebar_showed()
            };
        }
        text() {
            return "";
        }
        text_lines() {
            return [];
        }
        find_pos(id) {
            return null;
        }
        uri_base() {
            return "";
        }
        sub() {
            return [
                this.Rows(),
                this.Copy()
            ];
        }
        sidebar_showed() {
            return false;
        }
        render_visible_only() {
            return false;
        }
        row_numb(id) {
            return 0;
        }
        row_text(id) {
            return "";
        }
        syntax() {
            return null;
        }
        uri_resolve(id) {
            return "";
        }
        highlight() {
            return "";
        }
        Row(id) {
            const obj = new this.$.$mol_text_code_row();
            obj.numb_showed = () => this.sidebar_showed();
            obj.numb = () => this.row_numb(id);
            obj.text = () => this.row_text(id);
            obj.syntax = () => this.syntax();
            obj.uri_resolve = (id) => this.uri_resolve(id);
            obj.highlight = () => this.highlight();
            return obj;
        }
        rows() {
            return [
                this.Row("0")
            ];
        }
        Rows() {
            const obj = new this.$.$mol_list();
            obj.render_visible_only = () => this.render_visible_only();
            obj.rows = () => this.rows();
            return obj;
        }
        text_export() {
            return "";
        }
        Copy() {
            const obj = new this.$.$mol_button_copy();
            obj.hint = () => this.$.$mol_locale.text('$mol_text_code_Copy_hint');
            obj.text = () => this.text_export();
            return obj;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_text_code.prototype, "Row", null);
    __decorate([
        $mol_mem
    ], $mol_text_code.prototype, "Rows", null);
    __decorate([
        $mol_mem
    ], $mol_text_code.prototype, "Copy", null);
    $.$mol_text_code = $mol_text_code;
})($ || ($ = {}));
//mol/text/code/-view.tree/code.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text_code extends $.$mol_text_code {
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            text_lines() {
                return this.text().split('\n');
            }
            rows() {
                return this.text_lines().map((_, index) => this.Row(index + 1));
            }
            row_text(index) {
                return this.text_lines()[index - 1];
            }
            row_numb(index) {
                return index;
            }
            find_pos(offset) {
                for (const [index, line] of this.text_lines().entries()) {
                    if (line.length >= offset) {
                        return this.Row(index + 1).find_pos(offset);
                    }
                    else {
                        offset -= line.length + 1;
                    }
                }
                return null;
            }
            sub() {
                return [
                    this.Rows(),
                    ...this.sidebar_showed() ? [this.Copy()] : []
                ];
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            uri_base() {
                return $mol_dom_context.document.location.href;
            }
            uri_resolve(uri) {
                if (/^(\w+script+:)+/.test(uri))
                    return null;
                try {
                    const url = new URL(uri, this.uri_base());
                    return url.toString();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return null;
                }
            }
            text_export() {
                return this.text() + '\n';
            }
        }
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "text_lines", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "row_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "find_pos", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "sub", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "uri_resolve", null);
        $$.$mol_text_code = $mol_text_code;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/text/code/code.view.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem, px } = $mol_style_unit;
        $mol_style_define($mol_text_code, {
            whiteSpace: 'pre-wrap',
            Rows: {
                padding: $mol_gap.text,
            },
            Copy: {
                alignSelf: 'flex-start',
                justifySelf: 'flex-start',
            },
            '@': {
                'mol_text_code_sidebar_showed': {
                    true: {
                        $mol_text_code_row: {
                            margin: {
                                left: rem(1.75),
                            },
                        },
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/text/code/code.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_float extends $mol_view {
        style() {
            return {
                ...super.style(),
                minHeight: "auto"
            };
        }
    }
    $.$mol_float = $mol_float;
})($ || ($ = {}));
//mol/float/-view.tree/float.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/float/float.view.css", "[mol_float] {\n\tposition: sticky;\n\ttop: 0;\n\tleft: 0;\n\tz-index: var(--mol_layer_float);\n\topacity: 1;\n\ttransition: opacity .25s ease-in;\n\tdisplay: block;\n\tbackground: linear-gradient( var(--mol_theme_card), var(--mol_theme_card) ), var(--mol_theme_back);\n\tbox-shadow: 0 0 .5rem hsla(0,0%,0%,.25);\n}\n\n");
})($ || ($ = {}));
//mol/float/-css/float.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_check extends $mol_button_minor {
        attr() {
            return {
                ...super.attr(),
                mol_check_checked: this.checked(),
                "aria-checked": this.aria_checked(),
                role: this.aria_role()
            };
        }
        sub() {
            return [
                this.Icon(),
                this.label()
            ];
        }
        checked(next) {
            if (next !== undefined)
                return next;
            return false;
        }
        aria_checked() {
            return "false";
        }
        aria_role() {
            return "checkbox";
        }
        Icon() {
            return null;
        }
        title() {
            return "";
        }
        Title() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.title()
            ];
            return obj;
        }
        label() {
            return [
                this.Title()
            ];
        }
    }
    __decorate([
        $mol_mem
    ], $mol_check.prototype, "checked", null);
    __decorate([
        $mol_mem
    ], $mol_check.prototype, "Title", null);
    $.$mol_check = $mol_check;
})($ || ($ = {}));
//mol/check/-view.tree/check.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/check.css", "[mol_check] {\n\tflex: 0 0 auto;\n\tjustify-content: flex-start;\n\talign-content: center;\n\talign-items: flex-start;\n\tborder: none;\n\tfont-weight: inherit;\n\tbox-shadow: none;\n\ttext-align: left;\n\tdisplay: inline-flex;\n\tflex-wrap: nowrap;\n}\n\n[mol_check_title] {\n\tflex-shrink: 1;\n}\n");
})($ || ($ = {}));
//mol/check/-css/check.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_check extends $.$mol_check {
            click(next) {
                if (next?.defaultPrevented)
                    return;
                this.checked(!this.checked());
                if (next)
                    next.preventDefault();
            }
            sub() {
                return [
                    ...$mol_maybe(this.Icon()),
                    ...this.label(),
                ];
            }
            label() {
                return this.title() ? super.label() : [];
            }
            aria_checked() {
                return String(this.checked());
            }
        }
        $$.$mol_check = $mol_check;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/check/check.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_chevron extends $mol_icon {
        path() {
            return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
        }
    }
    $.$mol_icon_chevron = $mol_icon_chevron;
})($ || ($ = {}));
//mol/icon/chevron/-view.tree/chevron.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_check_expand extends $mol_check {
        Icon() {
            const obj = new this.$.$mol_icon_chevron();
            return obj;
        }
        level() {
            return 0;
        }
        style() {
            return {
                ...super.style(),
                paddingLeft: this.level_style()
            };
        }
        checked(next) {
            return this.expanded(next);
        }
        enabled() {
            return this.expandable();
        }
        level_style() {
            return "0px";
        }
        expanded(next) {
            if (next !== undefined)
                return next;
            return false;
        }
        expandable() {
            return false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_check_expand.prototype, "Icon", null);
    __decorate([
        $mol_mem
    ], $mol_check_expand.prototype, "expanded", null);
    $.$mol_check_expand = $mol_check_expand;
})($ || ($ = {}));
//mol/check/expand/-view.tree/expand.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_check_expand extends $.$mol_check_expand {
            level_style() {
                return `${this.level() * 1 - 1}rem`;
            }
            expandable() {
                return this.expanded() !== null;
            }
        }
        $$.$mol_check_expand = $mol_check_expand;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/check/expand/expand.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/expand/expand.view.css", "[mol_check_expand] {\n\tmin-width: 20px;\n}\n\n:where([mol_check_expand][disabled]) [mol_check_expand_icon] {\n\tvisibility: hidden;\n}\n\n[mol_check_expand_icon] {\n\tbox-shadow: none;\n}\n[mol_check_expand_icon] {\n\ttransform: rotateZ(0deg);\n}\n\n:where([mol_check_checked]) [mol_check_expand_icon] {\n\ttransform: rotateZ(90deg);\n}\n\n[mol_check_expand_icon] {\n\tvertical-align: text-top;\n}\n\n[mol_check_expand_label] {\n\tmargin-left: 0;\n}\n");
})($ || ($ = {}));
//mol/check/expand/-css/expand.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_grid extends $mol_view {
        row_height() {
            return 32;
        }
        row_ids() {
            return [];
        }
        row_id(id) {
            return null;
        }
        col_ids() {
            return [];
        }
        records() {
            return {};
        }
        record(id) {
            return null;
        }
        hierarchy() {
            return null;
        }
        hierarchy_col() {
            return "";
        }
        minimal_width() {
            return 0;
        }
        sub() {
            return [
                this.Head(),
                this.Table()
            ];
        }
        Head() {
            const obj = new this.$.$mol_grid_row();
            obj.cells = () => this.head_cells();
            return obj;
        }
        Row(id) {
            const obj = new this.$.$mol_grid_row();
            obj.minimal_height = () => this.row_height();
            obj.minimal_width = () => this.minimal_width();
            obj.cells = () => this.cells(id);
            return obj;
        }
        Cell(id) {
            const obj = new this.$.$mol_view();
            return obj;
        }
        cell(id) {
            return null;
        }
        Cell_text(id) {
            const obj = new this.$.$mol_grid_cell();
            obj.sub = () => this.cell_content_text(id);
            return obj;
        }
        Cell_number(id) {
            const obj = new this.$.$mol_grid_number();
            obj.sub = () => this.cell_content_number(id);
            return obj;
        }
        Col_head(id) {
            const obj = new this.$.$mol_float();
            obj.dom_name = () => "th";
            obj.sub = () => this.col_head_content(id);
            return obj;
        }
        Cell_branch(id) {
            const obj = new this.$.$mol_check_expand();
            obj.level = () => this.cell_level(id);
            obj.label = () => this.cell_content(id);
            obj.expanded = (next) => this.cell_expanded(id, next);
            return obj;
        }
        Cell_content(id) {
            return [
                this.Cell_dimmer(id)
            ];
        }
        rows() {
            return [];
        }
        Table() {
            const obj = new this.$.$mol_grid_table();
            obj.sub = () => this.rows();
            return obj;
        }
        head_cells() {
            return [];
        }
        cells(id) {
            return [];
        }
        cell_content(id) {
            return [];
        }
        cell_content_text(id) {
            return this.cell_content(id);
        }
        cell_content_number(id) {
            return this.cell_content(id);
        }
        col_head_content(id) {
            return [];
        }
        cell_level(id) {
            return 0;
        }
        cell_expanded(id, next) {
            if (next !== undefined)
                return next;
            return false;
        }
        needle() {
            return "";
        }
        cell_value(id) {
            return "";
        }
        Cell_dimmer(id) {
            const obj = new this.$.$mol_dimmer();
            obj.needle = () => this.needle();
            obj.haystack = () => this.cell_value(id);
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_grid.prototype, "Head", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Row", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Cell", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Cell_text", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Cell_number", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Col_head", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Cell_branch", null);
    __decorate([
        $mol_mem
    ], $mol_grid.prototype, "Table", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "cell_expanded", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Cell_dimmer", null);
    $.$mol_grid = $mol_grid;
    class $mol_grid_table extends $mol_list {
    }
    $.$mol_grid_table = $mol_grid_table;
    class $mol_grid_row extends $mol_view {
        sub() {
            return this.cells();
        }
        cells() {
            return [];
        }
    }
    $.$mol_grid_row = $mol_grid_row;
    class $mol_grid_cell extends $mol_view {
        minimal_height() {
            return 40;
        }
    }
    $.$mol_grid_cell = $mol_grid_cell;
    class $mol_grid_number extends $mol_grid_cell {
    }
    $.$mol_grid_number = $mol_grid_number;
})($ || ($ = {}));
//mol/grid/-view.tree/grid.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_state_session extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.sessionStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static value(key, next) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));
//mol/state/session/session.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_grid extends $.$mol_grid {
            head_cells() {
                return this.col_ids().map(colId => this.Col_head(colId));
            }
            col_head_content(colId) {
                return [colId];
            }
            rows() {
                return this.row_ids().map(id => this.Row(id));
            }
            cells(row_id) {
                return this.col_ids().map(col_id => this.Cell({ row: row_id, col: col_id }));
            }
            col_type(col_id) {
                if (col_id === this.hierarchy_col())
                    return 'branch';
                const rowFirst = this.row_id(0);
                const val = this.record(rowFirst[rowFirst.length - 1])[col_id];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            }
            Cell(id) {
                switch (this.col_type(id.col).valueOf()) {
                    case 'branch': return this.Cell_branch(id);
                    case 'number': return this.Cell_number(id);
                }
                return this.Cell_text(id);
            }
            cell_content(id) {
                return [this.record(id.row[id.row.length - 1])[id.col]];
            }
            cell_content_text(id) {
                return this.cell_content(id).map(val => typeof val === 'object' ? JSON.stringify(val) : val);
            }
            records() {
                return [];
            }
            record(id) {
                return this.records()[id];
            }
            record_ids() {
                return Object.keys(this.records());
            }
            row_id(index) {
                return this.row_ids().slice(index, index + 1).valueOf()[0];
            }
            col_ids() {
                const rowFirst = this.row_id(0);
                if (rowFirst === void 0)
                    return [];
                const record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            }
            hierarchy() {
                const hierarchy = {};
                const root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                this.record_ids().map(id => {
                    root.sub.push(hierarchy[id] = {
                        id,
                        parent: root,
                        sub: [],
                    });
                });
                return hierarchy;
            }
            row_sub_ids(row) {
                return this.hierarchy()[row[row.length - 1]].sub.map(child => row.concat(child.id));
            }
            row_root_id() {
                return [''];
            }
            cell_level(id) {
                return id.row.length - 1;
            }
            row_ids() {
                const next = [];
                const add = (row) => {
                    next.push(row);
                    if (this.row_expanded(row)) {
                        this.row_sub_ids(row).forEach(child => add(child));
                    }
                };
                this.row_sub_ids(this.row_root_id()).forEach(child => add(child));
                return next;
            }
            row_expanded(row_id, next) {
                if (!this.row_sub_ids(row_id).length)
                    return null;
                const key = `row_expanded(${JSON.stringify(row_id)})`;
                const next2 = $mol_state_session.value(key, next);
                return (next2 == null) ? this.row_expanded_default(row_id) : next2;
            }
            row_expanded_default(row_id) {
                return true;
            }
            cell_expanded(id, next) {
                return this.row_expanded(id.row, next);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "head_cells", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_grid.prototype, "col_type", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "record_ids", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "hierarchy", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "row_ids", null);
        $$.$mol_grid = $mol_grid;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/grid/grid.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/grid/grid.view.css", "[mol_grid] {\n\tdisplay: block;\n\tflex: 0 1 auto;\n\tposition: relative;\n\toverflow-x: auto;\n}\n\n[mol_grid_gap] {\n\tposition: absolute;\n\tpadding: .1px;\n\ttop: 0;\n\ttransform: translateZ(0);\n}\n\n[mol_grid_table] {\n\tborder-spacing: 0;\n\tdisplay: table-row-group;\n\tposition: relative;\n}\n\n[mol_grid_table] > * {\n\tdisplay: table-row;\n\ttransition: none;\n}\n\n[mol_grid_head] > *,\n[mol_grid_table] > * > * {\n\tdisplay: table-cell;\n\tpadding: var(--mol_gap_text);\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\tbox-shadow: inset 1px 1px 0 0 var(--mol_theme_line);\n}\n\n[mol_grid_row]:where(:first-child) > * {\n\tbox-shadow: inset 1px 0 0 0 var(--mol_theme_line);\n}\n\n[mol_grid_table] > * > *:where(:first-child) {\n\tbox-shadow: inset 0px 1px 0 0 var(--mol_theme_line);\n}\n\n[mol_grid_head] > * {\n\tbox-shadow: inset 1px -1px 0 0 var(--mol_theme_line);\n}\n\n[mol_grid_head] > *:where(:first-child) {\n\tbox-shadow: inset 0px -1px 0 0 var(--mol_theme_line);\n}\n\n[mol_grid_table] > [mol_grid_row]:where(:first-child) > *:where(:first-child) {\n\tbox-shadow: none;\n}\t\n\n[mol_grid_head] {\n\tdisplay: table-row;\n\ttransform: none !important;\n}\n\n/* [mol_grid_cell_number] {\n\ttext-align: right;\n} */\n\n[mol_grid_col_head] {\n\tfont-weight: inherit;\n\ttext-align: inherit;\n\tdisplay: table-cell;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_grid_cell_dimmer] {\n\tdisplay: inline-block;\n\tvertical-align: inherit;\n}\n");
})($ || ($ = {}));
//mol/grid/-css/grid.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_image extends $mol_view {
        dom_name() {
            return "img";
        }
        field() {
            return {
                ...super.field(),
                src: this.uri(),
                alt: this.title(),
                loading: this.loading(),
                decoding: this.decoding(),
                crossOrigin: this.cors()
            };
        }
        attr() {
            return {
                ...super.attr(),
                width: this.natural_width(),
                height: this.natural_height()
            };
        }
        event() {
            return {
                load: (next) => this.load(next)
            };
        }
        minimal_width() {
            return 16;
        }
        minimal_height() {
            return 16;
        }
        uri() {
            return "";
        }
        loading() {
            return "eager";
        }
        decoding() {
            return "async";
        }
        cors() {
            return null;
        }
        natural_width(next) {
            if (next !== undefined)
                return next;
            return 0;
        }
        natural_height(next) {
            if (next !== undefined)
                return next;
            return 0;
        }
        load(next) {
            if (next !== undefined)
                return next;
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_image.prototype, "natural_width", null);
    __decorate([
        $mol_mem
    ], $mol_image.prototype, "natural_height", null);
    __decorate([
        $mol_mem
    ], $mol_image.prototype, "load", null);
    $.$mol_image = $mol_image;
})($ || ($ = {}));
//mol/image/-view.tree/image.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_image extends $.$mol_image {
            natural_width(next) {
                const dom = this.dom_node();
                if (dom.naturalWidth)
                    return dom.naturalWidth;
                const found = this.uri().match(/\bwidth=(\d+)/);
                return found ? Number(found[1]) : null;
            }
            natural_height(next) {
                const dom = this.dom_node();
                if (dom.naturalHeight)
                    return dom.naturalHeight;
                const found = this.uri().match(/\bheight=(\d+)/);
                return found ? Number(found[1]) : null;
            }
            load() {
                this.natural_width(null);
                this.natural_height(null);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_image.prototype, "natural_width", null);
        __decorate([
            $mol_mem
        ], $mol_image.prototype, "natural_height", null);
        $$.$mol_image = $mol_image;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/image/image.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/image/image.view.css", "[mol_image] {\n\tborder-radius: var(--mol_gap_round);\n\toverflow: hidden;\n\tflex: 0 1 auto;\n\tmax-width: 100%;\n\tobject-fit: cover;\n\theight: fit-content;\n}\n");
})($ || ($ = {}));
//mol/image/-css/image.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_link_iconed extends $mol_link {
        sub() {
            return [
                this.Icon()
            ];
        }
        content() {
            return [
                this.title()
            ];
        }
        host() {
            return "";
        }
        icon() {
            return "";
        }
        Icon() {
            const obj = new this.$.$mol_image();
            obj.uri = () => this.icon();
            obj.title = () => "";
            return obj;
        }
        title() {
            return this.uri();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_link_iconed.prototype, "Icon", null);
    $.$mol_link_iconed = $mol_link_iconed;
})($ || ($ = {}));
//mol/link/iconed/-view.tree/iconed.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_link_iconed extends $.$mol_link_iconed {
            icon() {
                return `https://favicon.yandex.net/favicon/${this.host()}?color=0,0,0,0&size=32&stub=1`;
            }
            host() {
                const base = this.$.$mol_state_arg.href();
                const url = new URL(this.uri(), base);
                return url.hostname;
            }
            title() {
                const uri = this.uri();
                const host = this.host();
                const suffix = (host ? uri.split(this.host(), 2)[1] : uri).replace(/^[\/\?#!]+/, '');
                return decodeURIComponent(suffix || host).replace(/^\//, ' ');
            }
            sub() {
                return [
                    ...this.host() ? [this.Icon()] : [],
                    ...this.content() ? [' ', ...this.content()] : [],
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "icon", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "host", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "title", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "sub", null);
        $$.$mol_link_iconed = $mol_link_iconed;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/link/iconed/iconed.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/link/iconed/iconed.view.css", "[mol_link_iconed] {\n\talign-items: baseline;\n\tdisplay: inline-flex;\n\tpadding: var(--mol_gap_text);\n}\n\n[mol_link_iconed_icon] {\n\tbox-shadow: none;\n\theight: 1.5em;\n\twidth: 1em;\n\tflex: 0 0 auto;\n\tdisplay: inline-block;\n\talign-self: normal;\n\tvertical-align: top;\n\tborder-radius: 0;\n\tobject-fit: scale-down;\n\topacity: .75;\n}\n\n[mol_theme=\"$mol_theme_dark\"] [mol_link_iconed_icon] {\n\tfilter: var(--mol_theme_image);\n}\n");
})($ || ($ = {}));
//mol/link/iconed/-css/iconed.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_embed_native extends $mol_scroll {
        uri(next) {
            if (next !== undefined)
                return next;
            return "";
        }
        dom_name() {
            return "object";
        }
        window() {
            return null;
        }
        attr() {
            return {
                ...super.attr(),
                data: this.uri(),
                type: this.mime()
            };
        }
        sub() {
            return [
                this.Fallback()
            ];
        }
        message() {
            return {
                hashchange: (next) => this.uri_change(next)
            };
        }
        mime() {
            return "";
        }
        title() {
            return "";
        }
        Fallback() {
            const obj = new this.$.$mol_link();
            obj.uri = () => this.uri();
            obj.sub = () => [
                this.title()
            ];
            return obj;
        }
        uri_change(next) {
            if (next !== undefined)
                return next;
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_embed_native.prototype, "uri", null);
    __decorate([
        $mol_mem
    ], $mol_embed_native.prototype, "Fallback", null);
    __decorate([
        $mol_mem
    ], $mol_embed_native.prototype, "uri_change", null);
    $.$mol_embed_native = $mol_embed_native;
})($ || ($ = {}));
//mol/embed/native/-view.tree/native.view.tree.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wait_timeout_async(timeout) {
        const promise = $mol_promise();
        const task = new this.$mol_after_timeout(timeout, () => promise.done());
        return Object.assign(promise, {
            destructor: () => task.destructor()
        });
    }
    $.$mol_wait_timeout_async = $mol_wait_timeout_async;
    function $mol_wait_timeout(timeout) {
        return this.$mol_wire_sync(this).$mol_wait_timeout_async(timeout);
    }
    $.$mol_wait_timeout = $mol_wait_timeout;
})($ || ($ = {}));
//mol/wait/timeout/timeout.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_native extends $.$mol_embed_native {
            window() {
                $mol_wire_solid();
                return $mol_wire_sync(this).load(this.dom_node_actual());
            }
            load(frame) {
                return new Promise((done, fail) => {
                    frame.onload = () => {
                        try {
                            if (frame.contentWindow.location.href === 'about:blank') {
                                return;
                            }
                        }
                        catch { }
                        done(frame.contentWindow);
                    };
                    frame.onerror = (event) => {
                        fail(typeof event === 'string' ? new Error(event) : event.error || event);
                    };
                });
            }
            uri_resource() {
                return this.uri().replace(/#.*/, '');
            }
            message_listener() {
                return new $mol_dom_listener($mol_dom_context, 'message', $mol_wire_async(this).message_receive);
            }
            message_receive(event) {
                if (!event)
                    return;
                if (event.source !== this.window())
                    return;
                if (!Array.isArray(event.data))
                    return;
                this.message()[event.data[0]]?.(event);
            }
            uri_change(event) {
                this.$.$mol_wait_timeout(1000);
                this.uri(event.data[1]);
            }
            auto() {
                return [
                    this.message_listener(),
                    this.window(),
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "window", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "uri_resource", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "message_listener", null);
        $$.$mol_embed_native = $mol_embed_native;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/embed/native/native.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/embed/native/native.view.css", "[mol_embed_native] {\n\tmax-width: 100%;\n\tmax-height: 100vh;\n\tobject-fit: cover;\n\tdisplay: flex;\n\tflex: 1 1 auto;\n\tobject-position: top left;\n\tborder-radius: var(--mol_gap_round);\n\taspect-ratio: 4/3;\n}\n");
})($ || ($ = {}));
//mol/embed/native/-css/native.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_youtube extends $mol_icon {
        path() {
            return "M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z";
        }
    }
    $.$mol_icon_youtube = $mol_icon_youtube;
})($ || ($ = {}));
//mol/icon/youtube/-view.tree/youtube.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_frame extends $mol_embed_native {
        dom_name() {
            return "iframe";
        }
        attr() {
            return {
                ...super.attr(),
                data: null,
                type: null,
                src: this.uri(),
                srcdoc: this.html(),
                allow: this.allow()
            };
        }
        fullscreen() {
            return true;
        }
        accelerometer() {
            return true;
        }
        autoplay() {
            return true;
        }
        encription() {
            return true;
        }
        gyroscope() {
            return true;
        }
        pip() {
            return true;
        }
        clipboard_read() {
            return true;
        }
        clipboard_write() {
            return true;
        }
        uri(next) {
            if (next !== undefined)
                return next;
            return "about:config";
        }
        html() {
            return null;
        }
        allow() {
            return "";
        }
    }
    __decorate([
        $mol_mem
    ], $mol_frame.prototype, "uri", null);
    $.$mol_frame = $mol_frame;
})($ || ($ = {}));
//mol/frame/-view.tree/frame.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_frame extends $.$mol_frame {
            window() {
                return super.window();
            }
            allow() {
                return [
                    ...this.fullscreen() ? ['fullscreen'] : [],
                    ...this.accelerometer() ? ['accelerometer'] : [],
                    ...this.autoplay() ? ['autoplay'] : [],
                    ...this.encription() ? ['encrypted-media'] : [],
                    ...this.gyroscope() ? ['gyroscope'] : [],
                    ...this.pip() ? ['picture-in-picture'] : [],
                    ...this.clipboard_read() ? [`clipboard-read ${this.uri()}`] : [],
                    ...this.clipboard_write() ? [`clipboard-write ${this.uri()}`] : [],
                ].join('; ');
            }
        }
        $$.$mol_frame = $mol_frame;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/frame/frame.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_define($mol_frame, {
        border: {
            style: 'none',
        },
        maxHeight: $mol_style_unit.vh(100),
    });
})($ || ($ = {}));
//mol/frame/frame.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_embed_youtube extends $mol_check {
        uri() {
            return "";
        }
        video_preview() {
            return "";
        }
        video_id() {
            return "";
        }
        checked(next) {
            return this.active(next);
        }
        sub() {
            return [
                this.Image(),
                this.Hint(),
                this.Frame()
            ];
        }
        active(next) {
            if (next !== undefined)
                return next;
            return false;
        }
        title() {
            return "";
        }
        Image() {
            const obj = new this.$.$mol_image();
            obj.title = () => this.title();
            obj.uri = () => this.video_preview();
            return obj;
        }
        Hint() {
            const obj = new this.$.$mol_icon_youtube();
            return obj;
        }
        video_embed() {
            return "";
        }
        Frame() {
            const obj = new this.$.$mol_frame();
            obj.title = () => this.title();
            obj.uri = () => this.video_embed();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_embed_youtube.prototype, "active", null);
    __decorate([
        $mol_mem
    ], $mol_embed_youtube.prototype, "Image", null);
    __decorate([
        $mol_mem
    ], $mol_embed_youtube.prototype, "Hint", null);
    __decorate([
        $mol_mem
    ], $mol_embed_youtube.prototype, "Frame", null);
    $.$mol_embed_youtube = $mol_embed_youtube;
})($ || ($ = {}));
//mol/embed/youtube/-view.tree/youtube.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_youtube extends $.$mol_embed_youtube {
            video_embed() {
                return `https://www.youtube.com/embed/${encodeURIComponent(this.video_id())}?autoplay=1&loop=1`;
            }
            video_id() {
                return this.uri().match(/^https\:\/\/www\.youtube\.com\/(?:embed\/|watch\?v=)([^\/&?#]+)/)?.[1]
                    ?? this.uri().match(/^https\:\/\/youtu\.be\/([^\/&?#]+)/)?.[1]
                    ?? 'about:blank';
            }
            video_preview() {
                return `https://i.ytimg.com/vi/${this.video_id()}/sddefault.jpg`;
            }
            sub() {
                return this.active()
                    ? [this.Frame()]
                    : [this.Image(), this.Hint()];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_preview", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "sub", null);
        $$.$mol_embed_youtube = $mol_embed_youtube;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/embed/youtube/youtube.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/embed/youtube/youtube.view.css", "[mol_embed_youtube] {\n\tpadding: 0;\n\tmax-width: 100%;\n}\n\n[mol_embed_youtube_image] {\n\tflex: auto 1 1;\n}\n\n[mol_embed_youtube_hint] {\n\tposition: absolute;\n    left: 50%;\n    top: 50%;\n    width: 50%;\n    height: 50%;\n    opacity: 0.3;\n    transform: translate(-50%, -50%);\n}\n\n[mol_embed_youtube]:hover [mol_embed_youtube_hint] {\n\topacity: .6;\n}\n");
})($ || ($ = {}));
//mol/embed/youtube/-css/youtube.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_embed_any extends $mol_view {
        Image() {
            const obj = new this.$.$mol_image();
            obj.title = () => this.title();
            obj.uri = () => this.uri();
            return obj;
        }
        Object() {
            const obj = new this.$.$mol_embed_native();
            obj.title = () => this.title();
            obj.uri = () => this.uri();
            return obj;
        }
        Youtube() {
            const obj = new this.$.$mol_embed_youtube();
            obj.title = () => this.title();
            obj.uri = () => this.uri();
            return obj;
        }
        title() {
            return "";
        }
        uri() {
            return "";
        }
    }
    __decorate([
        $mol_mem
    ], $mol_embed_any.prototype, "Image", null);
    __decorate([
        $mol_mem
    ], $mol_embed_any.prototype, "Object", null);
    __decorate([
        $mol_mem
    ], $mol_embed_any.prototype, "Youtube", null);
    $.$mol_embed_any = $mol_embed_any;
})($ || ($ = {}));
//mol/embed/any/-view.tree/any.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_any extends $.$mol_embed_any {
            type() {
                try {
                    const uri = this.uri();
                    if (/\b(png|gif|jpg|jpeg|jfif|webp|svg)\b/.test(uri))
                        return 'image';
                    if (/^https:\/\/www\.youtube\.com\//.test(uri))
                        return 'youtube';
                    if (/^https:\/\/youtu\.be\//.test(uri))
                        return 'youtube';
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 'image';
                }
                return 'object';
            }
            sub() {
                switch (this.type()) {
                    case 'image': return [this.Image()];
                    case 'youtube': return [this.Youtube()];
                    default: return [this.Object()];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_any.prototype, "type", null);
        __decorate([
            $mol_mem
        ], $mol_embed_any.prototype, "sub", null);
        $$.$mol_embed_any = $mol_embed_any;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/embed/any/any.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_text extends $mol_list {
        uri_base() {
            return "";
        }
        text() {
            return "";
        }
        param() {
            return "";
        }
        flow_tokens() {
            return [];
        }
        auto() {
            return [
                this.auto_scroll()
            ];
        }
        Paragraph(id) {
            const obj = new this.$.$mol_paragraph();
            obj.sub = () => this.block_content(id);
            return obj;
        }
        Quote(id) {
            const obj = new this.$.$mol_text();
            obj.uri_resolve = (id) => this.uri_resolve(id);
            obj.text = () => this.quote_text(id);
            obj.highlight = () => this.highlight();
            obj.auto_scroll = () => null;
            return obj;
        }
        List(id) {
            const obj = new this.$.$mol_text_list();
            obj.uri_resolve = (id) => this.uri_resolve(id);
            obj.type = () => this.list_type(id);
            obj.text = () => this.list_text(id);
            obj.highlight = () => this.highlight();
            return obj;
        }
        item_index(id) {
            return 0;
        }
        Header(id) {
            const obj = new this.$.$mol_text_header();
            obj.minimal_height = () => 40;
            obj.level = () => this.header_level(id);
            obj.content = () => this.block_content(id);
            obj.arg = () => this.header_arg(id);
            return obj;
        }
        Pre(id) {
            const obj = new this.$.$mol_text_code();
            obj.text = () => this.pre_text(id);
            obj.highlight = () => this.highlight();
            obj.uri_resolve = (id) => this.uri_resolve(id);
            obj.sidebar_showed = () => this.pre_sidebar_showed();
            return obj;
        }
        Cut(id) {
            const obj = new this.$.$mol_view();
            obj.dom_name = () => "hr";
            return obj;
        }
        Table(id) {
            const obj = new this.$.$mol_grid();
            obj.head_cells = () => this.table_head_cells(id);
            obj.rows = () => this.table_rows(id);
            return obj;
        }
        Table_row(id) {
            const obj = new this.$.$mol_grid_row();
            obj.cells = () => this.table_cells(id);
            return obj;
        }
        Table_cell(id) {
            const obj = new this.$.$mol_text();
            obj.auto_scroll = () => null;
            obj.highlight = () => this.highlight();
            obj.uri_resolve = (id) => this.uri_resolve(id);
            obj.text = () => this.table_cell_text(id);
            return obj;
        }
        Grid(id) {
            const obj = new this.$.$mol_grid();
            obj.rows = () => this.grid_rows(id);
            return obj;
        }
        Grid_row(id) {
            const obj = new this.$.$mol_grid_row();
            obj.cells = () => this.grid_cells(id);
            return obj;
        }
        Grid_cell(id) {
            const obj = new this.$.$mol_text();
            obj.auto_scroll = () => null;
            obj.highlight = () => this.highlight();
            obj.uri_resolve = (id) => this.uri_resolve(id);
            obj.text = () => this.grid_cell_text(id);
            return obj;
        }
        String(id) {
            const obj = new this.$.$mol_dimmer();
            obj.dom_name = () => "span";
            obj.needle = () => this.highlight();
            obj.haystack = () => this.line_text(id);
            return obj;
        }
        Span(id) {
            const obj = new this.$.$mol_text_span();
            obj.dom_name = () => "span";
            obj.type = () => this.line_type(id);
            obj.sub = () => this.line_content(id);
            return obj;
        }
        Code_line(id) {
            const obj = new this.$.$mol_text_code_row();
            obj.numb_showed = () => false;
            obj.highlight = () => this.highlight();
            obj.text = () => this.line_text(id);
            obj.uri_resolve = (id) => this.uri_resolve(id);
            obj.syntax = () => this.code_syntax();
            return obj;
        }
        Link(id) {
            const obj = new this.$.$mol_link_iconed();
            obj.uri = () => this.link_uri(id);
            obj.content = () => this.line_content(id);
            return obj;
        }
        Link_http(id) {
            const obj = new this.$.$mol_link_iconed();
            obj.uri = () => this.link_uri(id);
            obj.content = () => [
                this.link_host(id)
            ];
            return obj;
        }
        Embed(id) {
            const obj = new this.$.$mol_embed_any();
            obj.uri = () => this.link_uri(id);
            obj.title = () => this.line_text(id);
            return obj;
        }
        auto_scroll() {
            return null;
        }
        block_content(id) {
            return [];
        }
        uri_resolve(id) {
            return "";
        }
        quote_text(id) {
            return "";
        }
        highlight() {
            return "";
        }
        list_type(id) {
            return "-";
        }
        list_text(id) {
            return "";
        }
        header_level(id) {
            return 1;
        }
        header_arg(id) {
            return {};
        }
        pre_text(id) {
            return "";
        }
        code_sidebar_showed() {
            return true;
        }
        pre_sidebar_showed() {
            return this.code_sidebar_showed();
        }
        table_head_cells(id) {
            return [];
        }
        table_rows(id) {
            return [];
        }
        table_cells(id) {
            return [];
        }
        table_cell_text(id) {
            return "";
        }
        grid_rows(id) {
            return [];
        }
        grid_cells(id) {
            return [];
        }
        grid_cell_text(id) {
            return "";
        }
        line_text(id) {
            return "";
        }
        line_type(id) {
            return "";
        }
        line_content(id) {
            return [];
        }
        code_syntax() {
            return null;
        }
        link_uri(id) {
            return "";
        }
        link_host(id) {
            return "";
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Paragraph", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Quote", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "List", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Header", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Pre", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Cut", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Table", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Table_row", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Table_cell", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Grid", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Grid_row", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Grid_cell", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "String", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Span", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Code_line", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Link", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Link_http", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Embed", null);
    $.$mol_text = $mol_text;
    class $mol_text_header extends $mol_paragraph {
        level() {
            return 1;
        }
        sub() {
            return [
                this.Link()
            ];
        }
        arg() {
            return {};
        }
        content() {
            return [];
        }
        Link() {
            const obj = new this.$.$mol_link();
            obj.arg = () => this.arg();
            obj.hint = () => this.$.$mol_locale.text('$mol_text_header_Link_hint');
            obj.sub = () => this.content();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_text_header.prototype, "Link", null);
    $.$mol_text_header = $mol_text_header;
    class $mol_text_span extends $mol_paragraph {
        dom_name() {
            return "span";
        }
        attr() {
            return {
                ...super.attr(),
                mol_text_type: this.type()
            };
        }
        type() {
            return "";
        }
    }
    $.$mol_text_span = $mol_text_span;
})($ || ($ = {}));
//mol/text/text/-view.tree/text.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text extends $.$mol_text {
            flow_tokens() {
                const tokens = [];
                this.$.$mol_syntax2_md_flow.tokenize(this.text(), (name, found, chunks) => tokens.push({ name, found, chunks }));
                return tokens;
            }
            block_type(index) {
                return this.flow_tokens()[index].name;
            }
            rows() {
                return this.flow_tokens().map(({ name }, index) => {
                    switch (name) {
                        case 'quote': return this.Quote(index);
                        case 'header': return this.Header(index);
                        case 'list': return this.List(index);
                        case 'code': return this.Pre(index);
                        case 'code-indent': return this.Pre(index);
                        case 'table': return this.Table(index);
                        case 'grid': return this.Grid(index);
                        case 'cut': return this.Cut(index);
                        default: return this.Paragraph(index);
                    }
                });
            }
            param() {
                return this.toString().replace(/^.*?\)\./, '').replace(/[()]/g, '');
            }
            header_level(index) {
                return this.flow_tokens()[index].chunks[0].length;
            }
            header_arg(index) {
                return {
                    [this.param()]: this.block_text(index)
                };
            }
            list_type(index) {
                return this.flow_tokens()[index].chunks[1] ?? '';
            }
            item_index(index) {
                return this.flow_tokens().slice(0, index).filter(token => token.name === 'block').length + 1;
            }
            pre_text(index) {
                const token = this.flow_tokens()[index];
                return (token.chunks[2] ?? token.chunks[0].replace(/^(\t|  (?:\+\+|--|\*\*|  ))/gm, '')).replace(/[\n\r]*$/, '');
            }
            quote_text(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^[>"] /mg, '');
            }
            list_text(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^([-*+]|(?:\d+[\.\)])+) ?/mg, '').replace(/^  ?/mg, '');
            }
            cell_content(indexBlock) {
                return this.flow_tokens()[indexBlock].chunks[0]
                    .split(/\r?\n/g)
                    .filter(row => row && !/\|--/.test(row))
                    .map((row, rowId) => {
                    return row.split(/\|/g)
                        .filter(cell => cell)
                        .map((cell, cellId) => cell.trim());
                });
            }
            table_rows(blockId) {
                return this.cell_content(blockId)
                    .slice(1)
                    .map((row, rowId) => this.Table_row({ block: blockId, row: rowId + 1 }));
            }
            table_head_cells(blockId) {
                return this.cell_content(blockId)[0]
                    .map((cell, cellId) => this.Table_cell({ block: blockId, row: 0, cell: cellId }));
            }
            table_cells(id) {
                return this.cell_content(id.block)[id.row]
                    .map((cell, cellId) => this.Table_cell({ block: id.block, row: id.row, cell: cellId }));
            }
            table_cell_text(id) {
                return this.cell_content(id.block)[id.row][id.cell];
            }
            grid_content(indexBlock) {
                return [...this.flow_tokens()[indexBlock].chunks[0].match(/(?:^! .*?$\r?\n?)+(?:^ +! .*?$\r?\n?)*/gm)]
                    .map((row, rowId) => {
                    const cells = [];
                    for (const line of row.trim().split(/\r?\n/)) {
                        const [_, indent, content] = /^( *)! (.*)/.exec(line);
                        const col = Math.ceil(indent.length / 2);
                        cells[col] = (cells[col] ? cells[col] + '\n' : '') + content;
                    }
                    return cells;
                });
            }
            grid_rows(blockId) {
                return this.grid_content(blockId)
                    .map((row, rowId) => this.Grid_row({ block: blockId, row: rowId }));
            }
            grid_cells(id) {
                return this.grid_content(id.block)[id.row]
                    .map((cell, cellId) => this.Grid_cell({ block: id.block, row: id.row, cell: cellId }));
            }
            grid_cell_text(id) {
                return this.grid_content(id.block)[id.row][id.cell];
            }
            uri_base() {
                return $mol_dom_context.document.location.href;
            }
            uri_resolve(uri) {
                if (/^(\w+script+:)+/.test(uri))
                    return null;
                if (/^#\!/.test(uri)) {
                    const params = {};
                    for (const chunk of uri.slice(2).split(this.$.$mol_state_arg.separator)) {
                        if (!chunk)
                            continue;
                        const vals = chunk.split('=').map(decodeURIComponent);
                        params[vals.shift()] = vals.join('=');
                    }
                    return this.$.$mol_state_arg.link(params);
                }
                try {
                    const url = new URL(uri, this.uri_base());
                    return url.toString();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return null;
                }
            }
            code_syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            block_text(index) {
                const token = this.flow_tokens()[index];
                switch (token.name) {
                    case 'header': return token.chunks[2];
                    default: return token.chunks[0];
                }
            }
            block_content(index) {
                return this.line_content([index]);
            }
            line_tokens(path) {
                const tokens = [];
                this.$.$mol_syntax2_md_line.tokenize(this.line_text(path), (name, found, chunks) => tokens.push({ name, found, chunks }));
                return tokens;
            }
            line_token(path) {
                const tokens = this.line_tokens(path.slice(0, path.length - 1));
                return tokens[path[path.length - 1]];
            }
            line_type(path) {
                return this.line_token(path).name;
            }
            line_text(path) {
                if (path.length === 1)
                    return this.block_text(path[0]);
                const { name, found, chunks } = this.line_token(path);
                switch (name) {
                    case 'link': return chunks[0] || chunks[1].replace(/^.*?\/\/|\/.*$/g, '');
                    case 'text-link': return chunks[0] || chunks[1].replace(/^.*?\/\/|\/.*$/g, '');
                    default: return (chunks[0] || chunks[1] || chunks[2]) ?? found;
                }
            }
            line_content(path) {
                return this.line_tokens(path).map(({ name, chunks }, index) => {
                    const path2 = [...path, index];
                    switch (name) {
                        case 'embed': return this.Embed(path2);
                        case 'link': return this.Link(path2);
                        case 'text-link-http': return this.Link_http(path2);
                        case 'text-link': return this.Link(path2);
                        case 'image-link': return this.Embed(path2);
                        case 'code': return this.Code_line(path2);
                        case '': return this.String(path2);
                        default: return this.Span(path2);
                    }
                });
            }
            link_uri(path) {
                const token = this.line_token(path);
                const uri = this.uri_resolve(token.chunks[1] ?? token.found);
                if (!uri)
                    throw new Error('Bad link');
                return uri;
            }
            link_host(path) {
                return this.link_uri(path).replace(/^.*?\/\/|\/.*$/g, '');
            }
            auto_scroll() {
                for (const [index, token] of this.flow_tokens().entries()) {
                    if (token.name !== 'header')
                        continue;
                    const header = this.Header(index);
                    if (!header.Link().current())
                        continue;
                    new $mol_after_tick(() => this.ensure_visible(header));
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "flow_tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "block_type", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "rows", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "param", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "header_level", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "header_arg", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "pre_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "quote_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "list_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "cell_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_head_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_cell_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_cell_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "uri_resolve", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "block_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_token", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_type", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "link_uri", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "link_host", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "auto_scroll", null);
        $$.$mol_text = $mol_text;
        class $mol_text_header extends $.$mol_text_header {
            dom_name() {
                return 'h' + this.level();
            }
        }
        $$.$mol_text_header = $mol_text_header;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/text/text/text.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/text/text/text.view.css", "[mol_text] {\n\tline-height: 1.5em;\n\tbox-sizing: border-box;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 0 0 auto;\n\ttab-size: 4;\n}\n\n[mol_text_paragraph] {\n\tpadding: var(--mol_gap_text);\n\toverflow: auto;\n\toverflow-x: overlay;\n\tmax-width: 100%;\n\tdisplay: block;\n\tmax-width: 60rem;\n}\n\n[mol_text_span] {\n\tdisplay: inline;\n}\n\n[mol_text_string] {\n\tdisplay: inline;\n\tflex: 0 1 auto;\n\twhite-space: normal;\n}\n\n[mol_text_quote] {\n\tmargin: var(--mol_gap_block);\n\tpadding: var(--mol_gap_block);\n\tbackground: var(--mol_theme_card);\n\tbox-shadow: 0 0 0 1px var(--mol_theme_back);\n}\n\n[mol_text_header] {\n\tdisplay: block;\n\ttext-shadow: 0 0;\n\tfont-weight: normal;\n}\n\n* + [mol_text_header] {\n\tmargin-top: 0.75rem;\n}\n\nh1[mol_text_header] {\n\tfont-size: 1.5rem;\n}\n\nh2[mol_text_header] {\n\tfont-size: 1.5rem;\n\tfont-style: italic;\n}\n\nh3[mol_text_header] {\n\tfont-size: 1.25rem;\n}\n\nh4[mol_text_header] {\n\tfont-size: 1.25em;\n\tfont-style: italic;\n}\n\nh5[mol_text_header] {\n\tfont-size: 1rem;\n}\n\nh6[mol_text_header] {\n\tfont-size: 1rem;\n\tfont-style: italic;\n}\n\n[mol_text_header_link] {\n\tcolor: inherit;\n}\n\n[mol_text_table_cell] {\n\twidth: auto;\n\tdisplay: table-cell;\n\tvertical-align: baseline;\n\tpadding: 0;\n\tborder-radius: 0;\n}\n\n[mol_text_grid_cell] {\n\twidth: auto;\n\tdisplay: table-cell;\n\tvertical-align: top;\n\tpadding: 0;\n\tborder-radius: 0;\n}\n\n[mol_text_cut] {\n\tborder: none;\n\twidth: 100%;\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_text_link_http],\n[mol_text_link] {\n\tpadding: 0;\n\tdisplay: inline;\n\twhite-space: nowrap;\n}\n\n[mol_text_link_icon] + [mol_text_embed] {\n\tmargin-left: -1.5rem;\n}\n\n[mol_text_embed_youtube] {\n\tdisplay: inline;\n}\n\n[mol_text_embed_youtube_image],\n[mol_text_embed_youtube_frame],\n[mol_text_embed_object] {\n\tobject-fit: contain;\n\tobject-position: center;\n\tdisplay: inline;\n\twidth: 100vw;\n\tmax-height: calc( 100vh - 6rem );\n\tvertical-align: top;\n}\n[mol_text_embed_object_fallback] {\n\tpadding: 0;\n}\n[mol_text_embed_image] {\n\tobject-fit: contain;\n\tobject-position: center;\n\tdisplay: inline;\n\t/* max-height: calc( 100vh - 6rem ); */\n\tvertical-align: top;\n}\n\n[mol_text_pre] {\n\twhite-space: pre;\n\toverflow-x: auto;\n\toverflow-x: overlay;\n\ttab-size: 2;\n}\n\n[mol_text_code_line] {\n\tdisplay: inline-block;\n\twhite-space: nowrap;\n}\n\n[mol_text_type=\"strong\"] {\n\ttext-shadow: 0 0;\n\tfilter: contrast(1.5);\n}\n\n[mol_text_type=\"emphasis\"] {\n\tfont-style: italic;\n}\n\n[mol_text_type=\"insert\"] {\n\tcolor: var(--mol_theme_special);\n}\n\n[mol_text_type=\"delete\"] {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_text_type=\"remark\"] {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_text_type=\"quote\"] {\n\tfont-style: italic;\n}\n");
})($ || ($ = {}));
//mol/text/text/-css/text.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_edit extends $mol_icon {
        path() {
            return "M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z";
        }
    }
    $.$mol_icon_edit = $mol_icon_edit;
})($ || ($ = {}));
//mol/icon/edit/-view.tree/edit.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_trash_can extends $mol_icon {
        path() {
            return "M9,3V4H4V6H5V19C5,20.1 5.9,21 7,21H17C18.1,21 19,20.1 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z";
        }
    }
    $.$mol_icon_trash_can = $mol_icon_trash_can;
})($ || ($ = {}));
//mol/icon/trash/can/-view.tree/can.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_text_list extends $mol_text {
        auto_scroll() {
            return null;
        }
        attr() {
            return {
                ...super.attr(),
                mol_text_list_type: this.type()
            };
        }
        Paragraph(id) {
            const obj = new this.$.$mol_text_list_item();
            obj.index = () => this.item_index(id);
            obj.sub = () => this.block_content(id);
            return obj;
        }
        type() {
            return "";
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_text_list.prototype, "Paragraph", null);
    $.$mol_text_list = $mol_text_list;
    class $mol_text_list_item extends $mol_paragraph {
        attr() {
            return {
                ...super.attr(),
                mol_text_list_item_index: this.index()
            };
        }
        index() {
            return 0;
        }
    }
    $.$mol_text_list_item = $mol_text_list_item;
})($ || ($ = {}));
//mol/text/list/-view.tree/list.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/text/list/list.view.css", "[mol_text_list] {\r\n\tpadding-left: 1.75rem;\r\n}\r\n\r\n[mol_text_list_item] {\r\n\tcontain: none;\r\n\tdisplay: list-item;\r\n}\r\n\r\n[mol_text_list_item]::before {\r\n\tcontent: attr( mol_text_list_item_index ) \".\";\r\n\twidth: 1.25rem;\r\n\tdisplay: inline-block;\r\n\tposition: absolute;\r\n\tmargin-left: -1.75rem;\r\n\ttext-align: end;\r\n}\r\n\r\n[mol_text_list_type=\"-\"] > [mol_text_list_item]::before,\r\n[mol_text_list_type=\"*\"] > [mol_text_list_item]::before {\r\n\tcontent: \"•\";\r\n}\r\n");
})($ || ($ = {}));
//mol/text/list/-css/list.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $examples_products_productrow extends $mol_row {
        minimal_height() {
            return 100;
        }
        minimal_width() {
            return 200;
        }
        data() {
            return null;
        }
        editCallback(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        deleteCallback(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        ondelete(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        sub() {
            return [
                this.Id_labeler(),
                this.Title_labeler(),
                this.Price_labeler(),
                this.EditlButton(),
                this.DelButton()
            ];
        }
        row_id() {
            return "";
        }
        View() {
            const obj = new this.$.$mol_text();
            obj.text = () => this.row_id();
            return obj;
        }
        Id_labeler() {
            const obj = new this.$.$mol_labeler();
            obj.title = () => "ID";
            obj.Content = () => this.View();
            return obj;
        }
        row_name() {
            return "";
        }
        View2() {
            const obj = new this.$.$mol_text();
            obj.text = () => this.row_name();
            return obj;
        }
        Title_labeler() {
            const obj = new this.$.$mol_labeler();
            obj.title = () => "Product Name";
            obj.Content = () => this.View2();
            return obj;
        }
        row_price() {
            return "";
        }
        View3() {
            const obj = new this.$.$mol_text();
            obj.text = () => this.row_price();
            return obj;
        }
        Price_labeler() {
            const obj = new this.$.$mol_labeler();
            obj.title = () => "Product Price";
            obj.Content = () => this.View3();
            return obj;
        }
        editArg() {
            return null;
        }
        edIcon() {
            const obj = new this.$.$mol_icon_edit();
            return obj;
        }
        edLabel() {
            return "Редактировать";
        }
        EditlButton() {
            const obj = new this.$.$mol_link();
            obj.hint = () => "Редактировать";
            obj.arg = () => this.editArg();
            obj.sub = () => [
                this.edIcon(),
                this.edLabel()
            ];
            return obj;
        }
        delIcon() {
            const obj = new this.$.$mol_icon_trash_can();
            return obj;
        }
        delLabel() {
            return "Удалить";
        }
        uiblocker() {
            return null;
        }
        DelButton() {
            const obj = new this.$.$mol_button_minor();
            obj.hint = () => "Удалить";
            obj.hint = () => "Удалить";
            obj.event = () => ({
                click: (next) => this.ondelete(next)
            });
            obj.sub = () => [
                this.delIcon(),
                this.delLabel(),
                this.uiblocker()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $examples_products_productrow.prototype, "editCallback", null);
    __decorate([
        $mol_mem
    ], $examples_products_productrow.prototype, "deleteCallback", null);
    __decorate([
        $mol_mem
    ], $examples_products_productrow.prototype, "ondelete", null);
    __decorate([
        $mol_mem
    ], $examples_products_productrow.prototype, "View", null);
    __decorate([
        $mol_mem
    ], $examples_products_productrow.prototype, "Id_labeler", null);
    __decorate([
        $mol_mem
    ], $examples_products_productrow.prototype, "View2", null);
    __decorate([
        $mol_mem
    ], $examples_products_productrow.prototype, "Title_labeler", null);
    __decorate([
        $mol_mem
    ], $examples_products_productrow.prototype, "View3", null);
    __decorate([
        $mol_mem
    ], $examples_products_productrow.prototype, "Price_labeler", null);
    __decorate([
        $mol_mem
    ], $examples_products_productrow.prototype, "edIcon", null);
    __decorate([
        $mol_mem
    ], $examples_products_productrow.prototype, "EditlButton", null);
    __decorate([
        $mol_mem
    ], $examples_products_productrow.prototype, "delIcon", null);
    __decorate([
        $mol_mem
    ], $examples_products_productrow.prototype, "DelButton", null);
    $.$examples_products_productrow = $examples_products_productrow;
})($ || ($ = {}));
//examples/products/productrow/-view.tree/productsrow.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $examples_products_productrow extends $.$examples_products_productrow {
            row_price() {
                return `${this.data()?.price}`;
            }
            row_name() {
                return `${this.data()?.title}`;
            }
            row_id() {
                this.editId = this.data()?.id;
                return `${this.data()?.id}`;
            }
            uiblocker() {
                try {
                    this.data();
                }
                catch (error) {
                    $mol_fail_catch(error);
                }
                return '';
            }
            editArg() {
                try {
                    this.data();
                }
                catch (error) {
                    $mol_fail_catch(error);
                }
                if (this.editCallback) {
                    this.editCallback(this.editId);
                }
                return {
                    examples_products_edititem: this.editId,
                    examples_products_viewpage: 'edit'
                };
            }
            ondelete(val) {
                if ($mol_wire_sync(window).confirm('Подтвердите удаление')) {
                    if (this.deleteCallback)
                        this.deleteCallback(this.editId);
                }
            }
            editId;
        }
        __decorate([
            $mol_mem
        ], $examples_products_productrow.prototype, "row_price", null);
        __decorate([
            $mol_mem
        ], $examples_products_productrow.prototype, "row_name", null);
        __decorate([
            $mol_mem
        ], $examples_products_productrow.prototype, "row_id", null);
        __decorate([
            $mol_mem
        ], $examples_products_productrow.prototype, "uiblocker", null);
        __decorate([
            $mol_mem
        ], $examples_products_productrow.prototype, "editArg", null);
        __decorate([
            $mol_action
        ], $examples_products_productrow.prototype, "ondelete", null);
        $$.$examples_products_productrow = $examples_products_productrow;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//examples/products/productrow/productsrow.view.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $examples_products extends $.$examples_products {
            constructor() {
                super();
            }
            pages_visible() {
                const pages = [this.tablepage()];
                const dict = $mol_state_arg.dict();
                if (dict.examples_products_viewpage === 'edit') {
                    pages.push(this.editpage());
                }
                return pages;
            }
            editCallback(id) {
                this.bring();
            }
            form_factory() {
                return new $examples_products_editform();
            }
        }
        __decorate([
            $mol_mem
        ], $examples_products.prototype, "pages_visible", null);
        $$.$examples_products = $examples_products;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//examples/products/products.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("examples/products/products.view.css", "[examples_crudapi_products_tablepage]{\n\twidth: 100%;\n\t\n}\n\n[examples_products_tablepage].editmode{\n\twidth: unset;\n\ttransition: width 1s;\n}\n[examples_products_productrow] {\n\talign-items: center;\n}\n");
})($ || ($ = {}));
//examples/products/-css/products.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class Product {
            id = null;
            title = '';
            price = null;
        }
        $$.Product = Product;
        class $examples_products_service extends $milkywaystd_crud {
            static _intances = new Map();
            static getInstance(id = 'default') {
                if (!$examples_products_service._intances.get(id)) {
                    const srv = new this();
                    srv.apiResource = "products";
                    srv.apiUrl = "https://test-rest.milkyway-studio.ru/strapi/api";
                    srv.listDataFunc = (data) => data.data.map(el => ({ ...el.attributes, id: el.id, }));
                    srv.listMetaFunc = (data) => ({ meta: data.meta, error: data.error });
                    srv.oneItemFunc = (data) => ({ id: data.data.id, ...data.data.attributes });
                    srv.processErrorFunc = (error) => error;
                    srv.packPostData = (data) => ({ data });
                    srv.packReplaceData = (data) => ({ data });
                    srv.packUpdateData = (data) => ({ data });
                    srv.headers({
                        'Authorization': 'bearer d07b303a546c3143fa5381c4c0619a832e029c1165d2afcd97f94544e2fb190d2eaf05791513545f8f38960d28f50187b950953ecfec99309a642cd3e0a27e65ad9e73a2d3ff7d7a967f114fca93b7607b7fcec0a5960cb1691ce2b26b28a564c63305931174198d97e8413ef1bb97d9b518337892f61bdbf6360cb0758fe55a'
                    });
                    $examples_products_service._intances.set(id, srv);
                }
                return $examples_products_service._intances.get(id);
            }
        }
        __decorate([
            $mol_mem_key
        ], $examples_products_service, "getInstance", null);
        $$.$examples_products_service = $examples_products_service;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//examples/products/ProductsService.ts
;
"use strict";
var $;
(function ($) {
    class $examples_products2 extends $examples_products {
    }
    $.$examples_products2 = $examples_products2;
})($ || ($ = {}));
//examples/products2/-view.tree/products2.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $examples_products2_editform extends $mol_page {
        tools() {
            return [
                this.Button_tools()
            ];
        }
        body() {
            return [
                this.uiblocker(),
                this.EditForm(),
                this.Result()
            ];
        }
        foot() {
            return [];
        }
        message() {
            return {
                required: "Обязательно для заполнения",
                positive: "Цена должна быть больше 0"
            };
        }
        closepage(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        Button_tools() {
            const obj = new this.$.$mol_button_minor();
            obj.title = () => "Закрыть";
            obj.event_activate = (val) => this.closepage(val);
            return obj;
        }
        uiblocker() {
            return null;
        }
        name_label() {
            return "Название";
        }
        name_bid() {
            return "";
        }
        draft(id, val) {
            if (val !== undefined)
                return val;
            return "";
        }
        Name_control() {
            const obj = new this.$.$mol_string();
            obj.value = (val) => this.draft("title", val);
            return obj;
        }
        Name_field() {
            const obj = new this.$.$mol_form_field();
            obj.name = () => this.name_label();
            obj.bid = () => this.name_bid();
            obj.control = () => this.Name_control();
            return obj;
        }
        price_label() {
            return "Цена";
        }
        price_bid() {
            return "";
        }
        draftNum(id, val) {
            if (val !== undefined)
                return val;
            return 0;
        }
        Price_control() {
            const obj = new this.$.$mol_number();
            obj.value = (val) => this.draftNum("price", val);
            obj.precision_view = () => 0.01;
            return obj;
        }
        Price_field() {
            const obj = new this.$.$mol_form_field();
            obj.name = () => this.price_label();
            obj.bid = () => this.price_bid();
            obj.control = () => this.Price_control();
            return obj;
        }
        login_submit_label() {
            return "Сохранить";
        }
        event_submit(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        Save_submit() {
            const obj = new this.$.$mol_button_major();
            obj.title = () => this.login_submit_label();
            obj.click = (next) => this.event_submit(next);
            obj.enabled = () => this.submit_allowed();
            return obj;
        }
        submit_allowed() {
            return this.EditForm().submit_allowed();
        }
        EditForm() {
            const obj = new this.$.$mol_form();
            obj.submit = (next) => this.event_submit(next);
            obj.form_fields = () => [
                this.Name_field(),
                this.Price_field()
            ];
            obj.buttons = () => [
                this.Save_submit()
            ];
            return obj;
        }
        status(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        Result() {
            const obj = new this.$.$mol_status();
            obj.message = () => this.status();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $examples_products2_editform.prototype, "closepage", null);
    __decorate([
        $mol_mem
    ], $examples_products2_editform.prototype, "Button_tools", null);
    __decorate([
        $mol_mem_key
    ], $examples_products2_editform.prototype, "draft", null);
    __decorate([
        $mol_mem
    ], $examples_products2_editform.prototype, "Name_control", null);
    __decorate([
        $mol_mem
    ], $examples_products2_editform.prototype, "Name_field", null);
    __decorate([
        $mol_mem_key
    ], $examples_products2_editform.prototype, "draftNum", null);
    __decorate([
        $mol_mem
    ], $examples_products2_editform.prototype, "Price_control", null);
    __decorate([
        $mol_mem
    ], $examples_products2_editform.prototype, "Price_field", null);
    __decorate([
        $mol_mem
    ], $examples_products2_editform.prototype, "event_submit", null);
    __decorate([
        $mol_mem
    ], $examples_products2_editform.prototype, "Save_submit", null);
    __decorate([
        $mol_mem
    ], $examples_products2_editform.prototype, "EditForm", null);
    __decorate([
        $mol_mem
    ], $examples_products2_editform.prototype, "status", null);
    __decorate([
        $mol_mem
    ], $examples_products2_editform.prototype, "Result", null);
    $.$examples_products2_editform = $examples_products2_editform;
})($ || ($ = {}));
//examples/products2/editform/-view.tree/editform.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $examples_products2_editform extends $.$examples_products2_editform {
            srv() {
                const srv = $examples_products_service.getInstance();
                return srv;
            }
            uiblocker() {
                return "";
            }
            model() {
                try {
                    if (this.isEdit()) {
                        this.editKey(`${$mol_state_arg.value("examples_products_edititem")}`);
                        let p = this.srv().byIdR(this.editKey());
                        this.draftObj(this.editKey(), p);
                        return p;
                    }
                    this.editKey("_" + $mol_guid());
                    const newp = new Product();
                    newp.id = this.editKey();
                    this.draftObj(this.editKey(), newp);
                    this.srv().creatingId(this.editKey());
                    return newp;
                }
                catch (error) {
                    $mol_fail_catch(error);
                    if (error instanceof ErrorResponse) {
                        const response = error.response ? error.response.json() : null;
                        this.server_error(this.editKey(), response);
                    }
                    this.status(error.message);
                    return this.draftObj(this.editKey());
                }
            }
            editKey(val) {
                $mol_state_arg.value("examples_products_edititem");
                return val ?? `${$mol_state_arg.value("examples_products_edititem")}`;
            }
            draftObj(id, val) {
                if (undefined !== val) {
                    this.srv().setCachedObject(id, val);
                }
                return this.srv().getCachedObject(id) ?? new Product();
            }
            server_error(id, val) {
                return val ?? null;
            }
            validation_error(field) {
                const err = this.server_error(this.editKey())?.error?.details?.errors;
                if (!err) {
                    return "";
                }
                for (const error of err) {
                    if (error?.path && error?.path[0] === field) {
                        return error.message;
                    }
                }
                return "";
            }
            closepage(val) {
                const prev = { ...$mol_state_arg.dict() };
                delete prev["examples_products_edititem"];
                delete prev["examples_products_viewpage"];
                $mol_state_arg.go(prev);
            }
            price_bid() {
                return !parseFloat(this.draft("price")) || parseFloat(this.draft("price")) < 0 ? this.message().positive : "";
            }
            name_bid() {
                return (!this.draft("title") ? this.message().required : "") && this.validation_error("title");
            }
            draft(key, val) {
                if (val !== undefined) {
                    const d = { ...this.draftObj(this.editKey()) };
                    d[key] = val;
                    this.draftObj(this.editKey(), d);
                }
                return val ?? this.model()[key];
            }
            draftNum(key, val) {
                return this.draft(key, val);
            }
            formData() {
                return {
                    title: this.draft("title"),
                    price: this.draft("price"),
                };
            }
            event_submit(val) {
                try {
                    const kid = this.editKey();
                    const isUnsavedItem = kid.indexOf("_") === 0;
                    if (this.srv().creatingId() === kid || isUnsavedItem) {
                        const toCreate = { ...this.draftObj(kid) };
                        const toPrepend = { id: kid, ...this.draftObj(kid) };
                        delete toCreate["id"];
                        if (!this.isEdit()) {
                            this.srv().prependToList(toPrepend);
                            this.editKey($mol_guid());
                        }
                        if (!this.isEdit()) {
                            $mol_wire_fiber.sync();
                            setTimeout(() => {
                                const s = this.srv().create(toCreate, kid);
                            }, 0);
                        }
                        else {
                            const s = this.srv().create(toCreate, kid);
                            $mol_state_arg.value("examples_products_edititem", `${s.id}`);
                        }
                    }
                    else {
                        const saved = this.srv().replaceOne(this.draftObj(this.editKey()).id, this.formData());
                    }
                }
                catch (error) {
                    $mol_fail_catch(error);
                }
            }
            clearStatusTimeout(id, val) {
                return val;
            }
            status(val) {
                this.draftObj(this.editKey());
                let status = "";
                switch (this.srv().trackEventChannel(this.editKey())) {
                    case $milkywaystd_crud_events.ONE_REPLACE_ERROR:
                    case $milkywaystd_crud_events.ONE_UPDATE_ERROR:
                    case $milkywaystd_crud_events.CREATE_ERROR:
                        break;
                    case $milkywaystd_crud_events.ONE_FETCH_ERROR:
                        break;
                    case $milkywaystd_crud_events.ONE_UPDATE_END:
                    case $milkywaystd_crud_events.ONE_REPLACE_END:
                    case $milkywaystd_crud_events.CREATE_END:
                        status = "Сохранено";
                        break;
                    default:
                        break;
                }
                if (status)
                    this.clearStatusTimeout(this.editKey(), new $mol_after_timeout(2000, () => {
                        this.srv().trackEvent(this.editKey(), "");
                    }));
                return val ?? status;
            }
            isEdit() {
                return !!$mol_state_arg.value("examples_products_edititem");
            }
            formtitle() {
                return this.isEdit() ? "Редактирование товара" : "Создание товара";
            }
        }
        __decorate([
            $mol_mem
        ], $examples_products2_editform.prototype, "srv", null);
        __decorate([
            $mol_mem
        ], $examples_products2_editform.prototype, "uiblocker", null);
        __decorate([
            $mol_mem
        ], $examples_products2_editform.prototype, "model", null);
        __decorate([
            $mol_mem
        ], $examples_products2_editform.prototype, "editKey", null);
        __decorate([
            $mol_mem_key
        ], $examples_products2_editform.prototype, "server_error", null);
        __decorate([
            $mol_mem_key
        ], $examples_products2_editform.prototype, "validation_error", null);
        __decorate([
            $mol_action
        ], $examples_products2_editform.prototype, "closepage", null);
        __decorate([
            $mol_mem
        ], $examples_products2_editform.prototype, "price_bid", null);
        __decorate([
            $mol_mem
        ], $examples_products2_editform.prototype, "name_bid", null);
        __decorate([
            $mol_mem_key
        ], $examples_products2_editform.prototype, "draft", null);
        __decorate([
            $mol_mem_key
        ], $examples_products2_editform.prototype, "draftNum", null);
        __decorate([
            $mol_mem
        ], $examples_products2_editform.prototype, "formData", null);
        __decorate([
            $mol_action
        ], $examples_products2_editform.prototype, "event_submit", null);
        __decorate([
            $mol_mem_key
        ], $examples_products2_editform.prototype, "clearStatusTimeout", null);
        __decorate([
            $mol_mem
        ], $examples_products2_editform.prototype, "status", null);
        __decorate([
            $mol_mem
        ], $examples_products2_editform.prototype, "isEdit", null);
        __decorate([
            $mol_mem
        ], $examples_products2_editform.prototype, "formtitle", null);
        $$.$examples_products2_editform = $examples_products2_editform;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//examples/products2/editform/editform.view.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $examples_products2 extends $.$examples_products2 {
            form_factory() {
                return new $examples_products2_editform();
            }
        }
        $$.$examples_products2 = $examples_products2;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//examples/products2/products2.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_crud_demo extends $mol_example_large {
        title() {
            return "milkywaystd_crud lib, backend Strapi";
        }
        sub() {
            return [
                this.View()
            ];
        }
        tags() {
            return [
                "crud"
            ];
        }
        products() {
            const obj = new this.$.$examples_products();
            obj.param = () => "mol_book2_crud_demo_1";
            obj.menu_title = () => "Classic";
            return obj;
        }
        products2() {
            const obj = new this.$.$examples_products2();
            obj.param = () => "mol_book2_crud_demo_2";
            obj.menu_title = () => "Optimistic";
            return obj;
        }
        View() {
            const obj = new this.$.$mol_book2_catalog();
            obj.menu_title = () => "";
            obj.spreads = () => ({
                p: this.products(),
                p2: this.products2()
            });
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_crud_demo.prototype, "products", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_crud_demo.prototype, "products2", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_crud_demo.prototype, "View", null);
    $.$milkywaystd_crud_demo = $milkywaystd_crud_demo;
})($ || ($ = {}));
//milkywaystd/crud/demo/-view.tree/demo.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_bar extends $mol_view {
    }
    $.$mol_bar = $mol_bar;
})($ || ($ = {}));
//mol/bar/-view.tree/bar.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/bar/bar.view.css", "[mol_bar] {\n\tdisplay: flex;\n\t/* box-shadow: inset 0 0 0 1px var(--mol_theme_line); */\n\tborder-radius: var(--mol_gap_round);\n}\n");
})($ || ($ = {}));
//mol/bar/-css/bar.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_chevron_left extends $mol_icon {
        path() {
            return "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z";
        }
    }
    $.$mol_icon_chevron_left = $mol_icon_chevron_left;
})($ || ($ = {}));
//mol/icon/chevron/left/-view.tree/left.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_chevron_right extends $mol_icon {
        path() {
            return "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
        }
    }
    $.$mol_icon_chevron_right = $mol_icon_chevron_right;
})($ || ($ = {}));
//mol/icon/chevron/right/-view.tree/right.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_paginator extends $mol_bar {
        sub() {
            return [
                this.Backward(),
                this.Value(),
                this.Forward()
            ];
        }
        backward_hint() {
            return this.$.$mol_locale.text('$mol_paginator_backward_hint');
        }
        backward(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        Backward_icon() {
            const obj = new this.$.$mol_icon_chevron_left();
            return obj;
        }
        Backward() {
            const obj = new this.$.$mol_button_minor();
            obj.hint = () => this.backward_hint();
            obj.click = (event) => this.backward(event);
            obj.sub = () => [
                this.Backward_icon()
            ];
            return obj;
        }
        value(next) {
            if (next !== undefined)
                return next;
            return 0;
        }
        Value() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.value()
            ];
            return obj;
        }
        forward_hint() {
            return this.$.$mol_locale.text('$mol_paginator_forward_hint');
        }
        forward(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        Forward_icon() {
            const obj = new this.$.$mol_icon_chevron_right();
            return obj;
        }
        Forward() {
            const obj = new this.$.$mol_button_minor();
            obj.hint = () => this.forward_hint();
            obj.click = (event) => this.forward(event);
            obj.sub = () => [
                this.Forward_icon()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "backward", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "Backward_icon", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "Backward", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "value", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "Value", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "forward", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "Forward_icon", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "Forward", null);
    $.$mol_paginator = $mol_paginator;
})($ || ($ = {}));
//mol/paginator/-view.tree/paginator.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_paginator extends $.$mol_paginator {
            backward(event) {
                if (event.defaultPrevented)
                    return;
                event.preventDefault();
                this.value(this.value() - 1);
            }
            forward(event) {
                if (event.defaultPrevented)
                    return;
                event.preventDefault();
                this.value(this.value() + 1);
            }
        }
        $$.$mol_paginator = $mol_paginator;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/paginator/paginator.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/paginator/paginator.view.css", "[mol_paginator] {\n\talign-items: flex-start;\n}\n\n[mol_paginator_value] {\n\tpadding: .5rem 0;\n}\n");
})($ || ($ = {}));
//mol/paginator/-css/paginator.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_pick extends $mol_pop {
        event() {
            return {
                ...super.event(),
                keydown: (event) => this.keydown(event)
            };
        }
        Anchor() {
            return this.Trigger();
        }
        keydown(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        trigger_enabled() {
            return true;
        }
        trigger_content() {
            return [
                this.title()
            ];
        }
        hint() {
            return "";
        }
        Trigger() {
            const obj = new this.$.$mol_check();
            obj.minimal_width = () => 40;
            obj.minimal_height = () => 40;
            obj.enabled = () => this.trigger_enabled();
            obj.checked = (next) => this.showed(next);
            obj.sub = () => this.trigger_content();
            obj.hint = () => this.hint();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_pick.prototype, "keydown", null);
    __decorate([
        $mol_mem
    ], $mol_pick.prototype, "Trigger", null);
    $.$mol_pick = $mol_pick;
})($ || ($ = {}));
//mol/pick/-view.tree/pick.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_pick extends $.$mol_pick {
            keydown(event) {
                if (!this.trigger_enabled())
                    return;
                if (event.defaultPrevented)
                    return;
                if (event.keyCode === $mol_keyboard_code.escape) {
                    if (!this.showed())
                        return;
                    event.preventDefault();
                    this.showed(false);
                }
            }
        }
        $$.$mol_pick = $mol_pick;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/pick/pick.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pick/pick.view.css", "[mol_pick_trigger] {\n\talign-items: center;\n\tflex-grow: 1;\n}\n");
})($ || ($ = {}));
//mol/pick/-css/pick.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_dots_vertical extends $mol_icon {
        path() {
            return "M12,16C13.1,16 14,16.9 14,18C14,19.1 13.1,20 12,20C10.9,20 10,19.1 10,18C10,16.9 10.9,16 12,16M12,10C13.1,10 14,10.9 14,12C14,13.1 13.1,14 12,14C10.9,14 10,13.1 10,12C10,10.9 10.9,10 12,10M12,4C13.1,4 14,4.9 14,6C14,7.1 13.1,8 12,8C10.9,8 10,7.1 10,6C10,4.9 10.9,4 12,4Z";
        }
    }
    $.$mol_icon_dots_vertical = $mol_icon_dots_vertical;
})($ || ($ = {}));
//mol/icon/dots/vertical/-view.tree/vertical.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_select extends $mol_pick {
        dictionary(next) {
            if (next !== undefined)
                return next;
            return {};
        }
        options() {
            return [];
        }
        value(next) {
            if (next !== undefined)
                return next;
            return "";
        }
        option_label_default() {
            return "";
        }
        Option_row(id) {
            const obj = new this.$.$mol_button_minor();
            obj.event_click = (event) => this.event_select(id, event);
            obj.sub = () => this.option_content(id);
            return obj;
        }
        No_options() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.no_options_message()
            ];
            return obj;
        }
        plugins() {
            return [
                ...super.plugins(),
                this.Nav()
            ];
        }
        hint() {
            return this.$.$mol_locale.text('$mol_select_hint');
        }
        bubble_content() {
            return [
                this.Filter(),
                this.Bubble_pane()
            ];
        }
        Filter() {
            const obj = new this.$.$mol_string();
            obj.value = (next) => this.filter_pattern(next);
            obj.hint = () => this.$.$mol_locale.text('$mol_select_Filter_hint');
            obj.submit = (event) => this.submit(event);
            obj.enabled = () => this.enabled();
            return obj;
        }
        Trigger_icon() {
            const obj = new this.$.$mol_icon_dots_vertical();
            return obj;
        }
        event_select(id, event) {
            if (event !== undefined)
                return event;
            return null;
        }
        option_label(id) {
            return "";
        }
        filter_pattern(next) {
            if (next !== undefined)
                return next;
            return "";
        }
        Option_label(id) {
            const obj = new this.$.$mol_dimmer();
            obj.haystack = () => this.option_label(id);
            obj.needle = () => this.filter_pattern();
            return obj;
        }
        option_content(id) {
            return [
                this.Option_label(id)
            ];
        }
        no_options_message() {
            return this.$.$mol_locale.text('$mol_select_no_options_message');
        }
        nav_components() {
            return [];
        }
        option_focused(component) {
            if (component !== undefined)
                return component;
            return null;
        }
        nav_cycle(next) {
            if (next !== undefined)
                return next;
            return true;
        }
        Nav() {
            const obj = new this.$.$mol_nav();
            obj.keys_y = () => this.nav_components();
            obj.current_y = (component) => this.option_focused(component);
            obj.cycle = (next) => this.nav_cycle(next);
            return obj;
        }
        menu_content() {
            return [];
        }
        Menu() {
            const obj = new this.$.$mol_list();
            obj.rows = () => this.menu_content();
            return obj;
        }
        Bubble_pane() {
            const obj = new this.$.$mol_scroll();
            obj.sub = () => [
                this.Menu()
            ];
            return obj;
        }
        submit(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        enabled() {
            return true;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_select.prototype, "dictionary", null);
    __decorate([
        $mol_mem
    ], $mol_select.prototype, "value", null);
    __decorate([
        $mol_mem_key
    ], $mol_select.prototype, "Option_row", null);
    __decorate([
        $mol_mem
    ], $mol_select.prototype, "No_options", null);
    __decorate([
        $mol_mem
    ], $mol_select.prototype, "Filter", null);
    __decorate([
        $mol_mem
    ], $mol_select.prototype, "Trigger_icon", null);
    __decorate([
        $mol_mem_key
    ], $mol_select.prototype, "event_select", null);
    __decorate([
        $mol_mem
    ], $mol_select.prototype, "filter_pattern", null);
    __decorate([
        $mol_mem_key
    ], $mol_select.prototype, "Option_label", null);
    __decorate([
        $mol_mem
    ], $mol_select.prototype, "option_focused", null);
    __decorate([
        $mol_mem
    ], $mol_select.prototype, "nav_cycle", null);
    __decorate([
        $mol_mem
    ], $mol_select.prototype, "Nav", null);
    __decorate([
        $mol_mem
    ], $mol_select.prototype, "Menu", null);
    __decorate([
        $mol_mem
    ], $mol_select.prototype, "Bubble_pane", null);
    __decorate([
        $mol_mem
    ], $mol_select.prototype, "submit", null);
    $.$mol_select = $mol_select;
})($ || ($ = {}));
//mol/select/-view.tree/select.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_select extends $.$mol_select {
            filter_pattern(next) {
                this.focused();
                return next || '';
            }
            open() {
                this.showed(true);
            }
            options() {
                return Object.keys(this.dictionary());
            }
            options_filtered() {
                let options = this.options();
                options = options.filter($mol_match_text(this.filter_pattern(), (id) => [this.option_label(id)]));
                const index = options.indexOf(this.value());
                if (index >= 0)
                    options = [...options.slice(0, index), ...options.slice(index + 1)];
                return options;
            }
            option_label(id) {
                const value = this.dictionary()[id];
                return (value == null ? id : value) || this.option_label_default();
            }
            option_rows() {
                return this.options_filtered().map((option) => this.Option_row(option));
            }
            option_focused(component) {
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.showed()) {
                    component.focused(true);
                }
                return component;
            }
            event_select(id, event) {
                this.value(id);
                this.showed(false);
                event?.preventDefault();
            }
            nav_components() {
                if (this.options().length > 1 && this.Filter()) {
                    return [this.Filter(), ...this.option_rows()];
                }
                else {
                    return this.option_rows();
                }
            }
            trigger_content() {
                return [
                    ...this.option_content(this.value()),
                    this.Trigger_icon(),
                ];
            }
            menu_content() {
                return [
                    ...this.option_rows(),
                    ...(this.options_filtered().length === 0) ? [this.No_options()] : []
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "filter_pattern", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "options", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "options_filtered", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "option_focused", null);
        $$.$mol_select = $mol_select;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/select/select.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/select/select.view.css", "[mol_select] {\n\tdisplay: flex;\n\tword-break: normal;\n\talign-self: flex-start;\n}\n\n[mol_select_option_row] {\n\tmin-width: 100%;\n\tpadding: 0;\n\tjustify-content: flex-start;\n}\n\n[mol_select_bubble] {\n\tmin-width: 100%;\n}\n\n[mol_select_filter] {\n\tflex: 1 0 auto;\n\talign-self: stretch;\n}\n\n[mol_select_option_label] {\n\tpadding: var(--mol_gap_text);\n\ttext-align: left;\n\tmin-height: 1.5em;\n\tdisplay: block;\n\twhite-space: nowrap;\n}\n\n[mol_select_clear_option_content] {\n\tpadding: .5em 1rem .5rem 0;\n\ttext-align: left;\n\tbox-shadow: var(--mol_theme_line);\n\tflex: 1 0 auto;\n}\n\n[mol_select_no_options] {\n\tpadding: var(--mol_gap_text);\n\ttext-align: left;\n\tdisplay: block;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_select_trigger] {\n\tpadding: 0;\n\tflex: 1 1 auto;\n\tdisplay: flex;\n}\n\n[mol_select_trigger] > * {\n\tmargin-right: -1rem;\n}\n\n[mol_select_trigger] > *:last-child {\n\tmargin-right: 0;\n}\n\n[mol_select_menu] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n");
})($ || ($ = {}));
//mol/select/-css/select.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $examples_products_tablepage extends $mol_page {
        title() {
            return "CRUD example";
        }
        body() {
            return [
                this.Rows()
            ];
        }
        foot() {
            return [
                this.frow()
            ];
        }
        item(id) {
            return null;
        }
        editCallback(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        deleteCallback(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        Row(id) {
            const obj = new this.$.$examples_products_productrow();
            obj.data = () => this.item(id);
            obj.editCallback = (val) => this.editCallback(val);
            obj.deleteCallback = (val) => this.deleteCallback(val);
            return obj;
        }
        rows() {
            return [
                this.Row("0")
            ];
        }
        Rows() {
            const obj = new this.$.$mol_list();
            obj.rows = () => this.rows();
            return obj;
        }
        page(val) {
            if (val !== undefined)
                return val;
            return 5;
        }
        paginator() {
            const obj = new this.$.$mol_paginator();
            obj.value = (val) => this.page(val);
            return obj;
        }
        page_labeler() {
            const obj = new this.$.$mol_labeler();
            obj.title = () => "Страница";
            obj.Content = () => this.paginator();
            return obj;
        }
        per_page(val) {
            if (val !== undefined)
                return val;
            return "5";
        }
        perPageSelector() {
            const obj = new this.$.$mol_select();
            obj.value = (val) => this.per_page(val);
            obj.hint = () => "Количество записей на страницу";
            obj.dictionary = () => ({
                5: "5",
                10: "10",
                15: "15"
            });
            return obj;
        }
        PRP_labeler() {
            const obj = new this.$.$mol_labeler();
            obj.title = () => "Записей на страницу";
            obj.Content = () => this.perPageSelector();
            return obj;
        }
        totalItems() {
            return "";
        }
        View2() {
            const obj = new this.$.$mol_text();
            obj.text = () => this.totalItems();
            return obj;
        }
        Total_labeler() {
            const obj = new this.$.$mol_labeler();
            obj.title = () => "Всего записей";
            obj.Content = () => this.View2();
            return obj;
        }
        refresh(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        View3() {
            const obj = new this.$.$mol_button_minor();
            obj.title = () => "Обновить";
            obj.click = (next) => this.refresh(next);
            return obj;
        }
        refresh_labeler() {
            const obj = new this.$.$mol_labeler();
            obj.title = () => "";
            obj.Content = () => this.View3();
            return obj;
        }
        goToCreateNew(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        View4() {
            const obj = new this.$.$mol_button_major();
            obj.title = () => "Создать";
            obj.click = (next) => this.goToCreateNew(next);
            return obj;
        }
        create_labeler() {
            const obj = new this.$.$mol_labeler();
            obj.title = () => "";
            obj.Content = () => this.View4();
            return obj;
        }
        uiblocker() {
            return "";
        }
        frow() {
            const obj = new this.$.$mol_row();
            obj.sub = () => [
                this.page_labeler(),
                this.PRP_labeler(),
                this.Total_labeler(),
                this.refresh_labeler(),
                this.create_labeler(),
                this.uiblocker()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "editCallback", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "deleteCallback", null);
    __decorate([
        $mol_mem_key
    ], $examples_products_tablepage.prototype, "Row", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "Rows", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "page", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "paginator", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "page_labeler", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "per_page", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "perPageSelector", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "PRP_labeler", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "View2", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "Total_labeler", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "refresh", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "View3", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "refresh_labeler", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "goToCreateNew", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "View4", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "create_labeler", null);
    __decorate([
        $mol_mem
    ], $examples_products_tablepage.prototype, "frow", null);
    $.$examples_products_tablepage = $examples_products_tablepage;
})($ || ($ = {}));
//examples/products/tablepage/-view.tree/tablepage.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $examples_products_tablepage extends $.$examples_products_tablepage {
            service() {
                const srv = $examples_products_service.getInstance();
                const params = $mol_mem_cached(() => srv.params());
                srv.params({ ...params, 'sort[0]': 'id:desc' });
                return srv;
            }
            rows() {
                const r = [];
                for (const iterator of this.service().list()) {
                    r.push(this.Row(iterator.id));
                }
                return r;
            }
            item(id) {
                return this.service().byIdR(`${id}`);
            }
            per_page(value) {
                let p = parseInt($mol_state_arg.value("examples_products_per_page"));
                if (value !== undefined) {
                    $mol_state_arg.go({ ...$mol_state_arg.dict(), examples_products_per_page: value.toString() });
                    this.service().params({ ...this.service().params(), 'pagination[limit]': value.toString() });
                    return value;
                }
                p = p ? p : 5;
                const params = this.service().params();
                this.service().params({ ...params, 'pagination[limit]': p.toString() });
                return p;
            }
            page(value) {
                let p = parseInt($mol_state_arg.value("examples_products_page"));
                if (value !== undefined) {
                    if (value < 1) {
                        value = 1;
                    }
                    $mol_state_arg.go({ ...$mol_state_arg.dict(), examples_products_page: value.toString() });
                    this.service().params({ ...this.service().params(), 'pagination[start]': ((value - 1) * this.per_page()).toString() });
                    return value;
                }
                if (!p || p < 1)
                    p = 1;
                const params = this.service().params();
                this.service().params({ ...params, 'pagination[start]': ((p - 1) * this.per_page()).toString() });
                return p;
            }
            attr() {
                const classes = [];
                if ($mol_state_arg.value('examples_products_viewpage') === 'edit' || $mol_state_arg.value('examples_products_viewpage') === 'edit2') {
                    classes.push('editmode');
                }
                return { class: classes.join(' ') };
            }
            totalItems() {
                return this.service()?.metaInfo()?.meta?.pagination?.total ? `${this.service()?.metaInfo()?.meta?.pagination?.total}` : '';
            }
            refresh() {
                this.service().listReload();
            }
            goToCreateNew() {
                $mol_state_arg.value('examples_products_viewpage', 'edit');
                $mol_state_arg.value('examples_products_edititem', null);
            }
            deleteCallback(id) {
                if (`${id}`.indexOf('_') === 0) {
                    this.service().removeFromList(id);
                    return;
                }
                this.service().deleteOne(id);
                if ($mol_state_arg.value('examples_products_edititem') === `${id}`) {
                    $mol_state_arg.value('examples_products_edititem', null);
                    $mol_state_arg.value('examples_products_viewpage', null);
                }
                this.refresh();
            }
            uiblocker() {
                this.service().onePendingChanel();
                this.service().listPendingChanel();
                return '';
            }
        }
        __decorate([
            $mol_mem
        ], $examples_products_tablepage.prototype, "service", null);
        __decorate([
            $mol_mem
        ], $examples_products_tablepage.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $examples_products_tablepage.prototype, "item", null);
        __decorate([
            $mol_mem
        ], $examples_products_tablepage.prototype, "per_page", null);
        __decorate([
            $mol_mem
        ], $examples_products_tablepage.prototype, "page", null);
        __decorate([
            $mol_mem
        ], $examples_products_tablepage.prototype, "attr", null);
        __decorate([
            $mol_mem
        ], $examples_products_tablepage.prototype, "totalItems", null);
        __decorate([
            $mol_action
        ], $examples_products_tablepage.prototype, "refresh", null);
        __decorate([
            $mol_action
        ], $examples_products_tablepage.prototype, "goToCreateNew", null);
        __decorate([
            $mol_action
        ], $examples_products_tablepage.prototype, "deleteCallback", null);
        __decorate([
            $mol_mem
        ], $examples_products_tablepage.prototype, "uiblocker", null);
        $$.$examples_products_tablepage = $examples_products_tablepage;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//examples/products/tablepage/tablepage.view.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_classes_StreamClass {
            listeners = [];
            dependents = [];
            started = false;
            value = undefined;
            changed = false;
            constructor() { }
            static create(init) {
                const stream$ = function (val) {
                    if (typeof val === "undefined") {
                        return stream$.value;
                    }
                    else {
                        stream$.started = true;
                        stream$.update(val);
                        stream$.flush();
                    }
                };
                stream$.started = !(typeof init === "undefined");
                stream$.value = init;
                stream$.changed = false;
                stream$.listeners = [];
                stream$.dependents = [];
                Object.setPrototypeOf(stream$, $milkywaystd_classes_StreamClass.prototype);
                return stream$;
            }
            static combine(combiner, streams) {
                let cached = streams.map((stream$) => stream$());
                const allHasValue = (arr) => arr.every((elem) => typeof elem !== "undefined");
                const combined$ = Stream(allHasValue(cached) ? combiner(...cached) : undefined);
                streams.forEach((stream, i) => {
                    stream.dependents.push({
                        updateDependent(val) {
                            cached[i] = val;
                            if (allHasValue(cached)) {
                                combined$.update(combiner(...cached));
                            }
                        },
                        flushDependent() {
                            combined$.flush();
                        },
                    });
                });
                return combined$;
            }
            static merge(streams) {
                const merged$ = Stream();
                streams.forEach((stream$) => {
                    stream$.subscribe((val) => merged$(val));
                });
                return merged$;
            }
            static interval(interval) {
                const interval$ = Stream();
                setInterval(() => interval$(null), interval);
                return interval$;
            }
            static fromEvent(elem, type) {
                const event$ = Stream();
                elem.addEventListener(type, event$);
                return event$;
            }
            update(val) {
                this.value = val;
                this.started = true;
                this.changed = true;
                this.dependents.forEach((dep) => dep.updateDependent(val));
            }
            flush() {
                if (this.changed) {
                    this.changed = false;
                    if (this.started) {
                        this.listeners.forEach((l) => l(this.value));
                    }
                    this.dependents.forEach((dep) => dep.flushDependent());
                }
            }
            asStream() {
                return this;
            }
            subscribe(listener, emitOnSubscribe) {
                if (emitOnSubscribe && this.started) {
                    listener(this.value);
                }
                this.listeners.push(listener);
                return this;
            }
            log(name) {
                this.subscribe((val) => console.log(`[stream] ${name}: ${JSON.stringify(val)}`));
                return this;
            }
            map(mapper) {
                return Stream.combine(mapper, [this.asStream()]);
            }
            unique() {
                let lastValue = this.value;
                const unique$ = Stream(lastValue);
                this.subscribe((val) => {
                    if (val !== lastValue) {
                        unique$(val);
                        lastValue = val;
                    }
                });
                return unique$;
            }
            filter(predict) {
                const filtered$ = Stream();
                this.subscribe((val) => {
                    if (predict(val)) {
                        filtered$(val);
                    }
                });
                return filtered$;
            }
            delay(delayInMs) {
                const delayed$ = Stream();
                this.subscribe((value) => {
                    setTimeout(() => {
                        delayed$(value);
                    }, delayInMs);
                });
                return delayed$;
            }
            trottle(delay) {
                const throttled$ = Stream();
                let timer;
                let saved = null;
                let isThrottled = false;
                this.unique().subscribe((val) => {
                    if (isThrottled) {
                        saved = val;
                        return;
                    }
                    throttled$(val);
                    timer = setTimeout(function () {
                        if (saved) {
                            throttled$(saved);
                            saved = null;
                        }
                    }, delay);
                });
                return throttled$;
            }
            auditTime(delay) {
                const throttled$ = Stream();
                let timer;
                let saved = null;
                this.unique().subscribe((val) => {
                    saved = val;
                    if (!timer) {
                        timer = setTimeout(function () {
                            if (saved) {
                                throttled$(saved);
                                saved = null;
                            }
                            timer = null;
                        }, delay);
                    }
                });
                return throttled$;
            }
            debounce(delay) {
                const debounced$ = Stream();
                let timer;
                this.unique().subscribe((val) => {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        debounced$(val);
                    }, delay);
                });
                return debounced$;
            }
            until(condition$) {
                let pending = !condition$();
                const until$ = Stream(pending ? undefined : this.value);
                condition$.subscribe((isOk) => {
                    if (isOk && pending) {
                        pending = false;
                        until$(this.value);
                    }
                });
                this.subscribe((val) => {
                    if (!condition$()) {
                        pending = true;
                    }
                    else {
                        until$(val);
                    }
                });
                return until$;
            }
        }
        $$.$milkywaystd_classes_StreamClass = $milkywaystd_classes_StreamClass;
        const Stream = Object.assign($milkywaystd_classes_StreamClass.create, $milkywaystd_classes_StreamClass);
        $$.$milkywaystd_classes_stream = Object.assign($milkywaystd_classes_StreamClass.create, $milkywaystd_classes_StreamClass);
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/classes/stream.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_classes_DefaultIterableDifferFactory {
            constructor() { }
            supports(obj) {
                return isListLikeIterable(obj);
            }
            create(trackByFn) {
                return new DefaultIterableDiffer(trackByFn);
            }
        }
        $$.$milkywaystd_classes_DefaultIterableDifferFactory = $milkywaystd_classes_DefaultIterableDifferFactory;
        const trackByIdentity = (index, item) => item;
        class DefaultIterableDiffer {
            length = 0;
            collection;
            _linkedRecords = null;
            _unlinkedRecords = null;
            _previousItHead = null;
            _itHead = null;
            _itTail = null;
            _additionsHead = null;
            _additionsTail = null;
            _movesHead = null;
            _movesTail = null;
            _removalsHead = null;
            _removalsTail = null;
            _identityChangesHead = null;
            _identityChangesTail = null;
            _trackByFn;
            constructor(trackByFn) {
                this._trackByFn = trackByFn || trackByIdentity;
            }
            forEachItem(fn) {
                let record;
                for (record = this._itHead; record !== null; record = record._next) {
                    fn(record);
                }
            }
            forEachOperation(fn) {
                let nextIt = this._itHead;
                let nextRemove = this._removalsHead;
                let addRemoveOffset = 0;
                let moveOffsets = null;
                while (nextIt || nextRemove) {
                    const record = !nextRemove ||
                        nextIt &&
                            nextIt.currentIndex <
                                getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ?
                        nextIt :
                        nextRemove;
                    const adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets);
                    const currentIndex = record.currentIndex;
                    if (record === nextRemove) {
                        addRemoveOffset--;
                        nextRemove = nextRemove._nextRemoved;
                    }
                    else {
                        nextIt = nextIt._next;
                        if (record.previousIndex == null) {
                            addRemoveOffset++;
                        }
                        else {
                            if (!moveOffsets)
                                moveOffsets = [];
                            const localMovePreviousIndex = adjPreviousIndex - addRemoveOffset;
                            const localCurrentIndex = currentIndex - addRemoveOffset;
                            if (localMovePreviousIndex != localCurrentIndex) {
                                for (let i = 0; i < localMovePreviousIndex; i++) {
                                    const offset = i < moveOffsets.length ? moveOffsets[i] : (moveOffsets[i] = 0);
                                    const index = offset + i;
                                    if (localCurrentIndex <= index && index < localMovePreviousIndex) {
                                        moveOffsets[i] = offset + 1;
                                    }
                                }
                                const previousIndex = record.previousIndex;
                                moveOffsets[previousIndex] = localCurrentIndex - localMovePreviousIndex;
                            }
                        }
                    }
                    if (adjPreviousIndex !== currentIndex) {
                        fn(record, adjPreviousIndex, currentIndex);
                    }
                }
            }
            forEachPreviousItem(fn) {
                let record;
                for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
                    fn(record);
                }
            }
            forEachAddedItem(fn) {
                let record;
                for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                    fn(record);
                }
            }
            forEachMovedItem(fn) {
                let record;
                for (record = this._movesHead; record !== null; record = record._nextMoved) {
                    fn(record);
                }
            }
            forEachRemovedItem(fn) {
                let record;
                for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
                    fn(record);
                }
            }
            forEachIdentityChange(fn) {
                let record;
                for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
                    fn(record);
                }
            }
            diff(collection) {
                if (collection == null)
                    collection = [];
                if (!isListLikeIterable(collection)) {
                    throw new Error(`Error trying to diff '${stringify(collection)}'. Only arrays and iterables are allowed`);
                }
                if (this.check(collection)) {
                    return this;
                }
                else {
                    return null;
                }
            }
            onDestroy() { }
            check(collection) {
                this._reset();
                let record = this._itHead;
                let mayBeDirty = false;
                let index;
                let item;
                let itemTrackBy;
                if (Array.isArray(collection)) {
                    this.length = collection.length;
                    for (let index = 0; index < this.length; index++) {
                        item = collection[index];
                        itemTrackBy = this._trackByFn(index, item);
                        if (record === null || !Object.is(record.trackById, itemTrackBy)) {
                            record = this._mismatch(record, item, itemTrackBy, index);
                            mayBeDirty = true;
                        }
                        else {
                            if (mayBeDirty) {
                                record = this._verifyReinsertion(record, item, itemTrackBy, index);
                            }
                            if (!Object.is(record.item, item))
                                this._addIdentityChange(record, item);
                        }
                        record = record._next;
                    }
                }
                else {
                    index = 0;
                    iterateListLike(collection, (item) => {
                        itemTrackBy = this._trackByFn(index, item);
                        if (record === null || !Object.is(record.trackById, itemTrackBy)) {
                            record = this._mismatch(record, item, itemTrackBy, index);
                            mayBeDirty = true;
                        }
                        else {
                            if (mayBeDirty) {
                                record = this._verifyReinsertion(record, item, itemTrackBy, index);
                            }
                            if (!Object.is(record.item, item))
                                this._addIdentityChange(record, item);
                        }
                        record = record._next;
                        index++;
                    });
                    this.length = index;
                }
                this._truncate(record);
                this.collection = collection;
                return this.isDirty;
            }
            get isDirty() {
                return this._additionsHead !== null || this._movesHead !== null ||
                    this._removalsHead !== null || this._identityChangesHead !== null;
            }
            _reset() {
                if (this.isDirty) {
                    let record;
                    for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
                        record._nextPrevious = record._next;
                    }
                    for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                        record.previousIndex = record.currentIndex;
                    }
                    this._additionsHead = this._additionsTail = null;
                    for (record = this._movesHead; record !== null; record = record._nextMoved) {
                        record.previousIndex = record.currentIndex;
                    }
                    this._movesHead = this._movesTail = null;
                    this._removalsHead = this._removalsTail = null;
                    this._identityChangesHead = this._identityChangesTail = null;
                }
            }
            _mismatch(record, item, itemTrackBy, index) {
                let previousRecord;
                if (record === null) {
                    previousRecord = this._itTail;
                }
                else {
                    previousRecord = record._prev;
                    this._remove(record);
                }
                record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
                if (record !== null) {
                    if (!Object.is(record.item, item))
                        this._addIdentityChange(record, item);
                    this._reinsertAfter(record, previousRecord, index);
                }
                else {
                    record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
                    if (record !== null) {
                        if (!Object.is(record.item, item))
                            this._addIdentityChange(record, item);
                        this._moveAfter(record, previousRecord, index);
                    }
                    else {
                        record =
                            this._addAfter(new IterableChangeRecord_(item, itemTrackBy), previousRecord, index);
                    }
                }
                return record;
            }
            _verifyReinsertion(record, item, itemTrackBy, index) {
                let reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
                if (reinsertRecord !== null) {
                    record = this._reinsertAfter(reinsertRecord, record._prev, index);
                }
                else if (record.currentIndex != index) {
                    record.currentIndex = index;
                    this._addToMoves(record, index);
                }
                return record;
            }
            _truncate(record) {
                while (record !== null) {
                    const nextRecord = record._next;
                    this._addToRemovals(this._unlink(record));
                    record = nextRecord;
                }
                if (this._unlinkedRecords !== null) {
                    this._unlinkedRecords.clear();
                }
                if (this._additionsTail !== null) {
                    this._additionsTail._nextAdded = null;
                }
                if (this._movesTail !== null) {
                    this._movesTail._nextMoved = null;
                }
                if (this._itTail !== null) {
                    this._itTail._next = null;
                }
                if (this._removalsTail !== null) {
                    this._removalsTail._nextRemoved = null;
                }
                if (this._identityChangesTail !== null) {
                    this._identityChangesTail._nextIdentityChange = null;
                }
            }
            _reinsertAfter(record, prevRecord, index) {
                if (this._unlinkedRecords !== null) {
                    this._unlinkedRecords.remove(record);
                }
                const prev = record._prevRemoved;
                const next = record._nextRemoved;
                if (prev === null) {
                    this._removalsHead = next;
                }
                else {
                    prev._nextRemoved = next;
                }
                if (next === null) {
                    this._removalsTail = prev;
                }
                else {
                    next._prevRemoved = prev;
                }
                this._insertAfter(record, prevRecord, index);
                this._addToMoves(record, index);
                return record;
            }
            _moveAfter(record, prevRecord, index) {
                this._unlink(record);
                this._insertAfter(record, prevRecord, index);
                this._addToMoves(record, index);
                return record;
            }
            _addAfter(record, prevRecord, index) {
                this._insertAfter(record, prevRecord, index);
                if (this._additionsTail === null) {
                    this._additionsTail = this._additionsHead = record;
                }
                else {
                    this._additionsTail = this._additionsTail._nextAdded = record;
                }
                return record;
            }
            _insertAfter(record, prevRecord, index) {
                const next = prevRecord === null ? this._itHead : prevRecord._next;
                record._next = next;
                record._prev = prevRecord;
                if (next === null) {
                    this._itTail = record;
                }
                else {
                    next._prev = record;
                }
                if (prevRecord === null) {
                    this._itHead = record;
                }
                else {
                    prevRecord._next = record;
                }
                if (this._linkedRecords === null) {
                    this._linkedRecords = new _DuplicateMap();
                }
                this._linkedRecords.put(record);
                record.currentIndex = index;
                return record;
            }
            _remove(record) {
                return this._addToRemovals(this._unlink(record));
            }
            _unlink(record) {
                if (this._linkedRecords !== null) {
                    this._linkedRecords.remove(record);
                }
                const prev = record._prev;
                const next = record._next;
                if (prev === null) {
                    this._itHead = next;
                }
                else {
                    prev._next = next;
                }
                if (next === null) {
                    this._itTail = prev;
                }
                else {
                    next._prev = prev;
                }
                return record;
            }
            _addToMoves(record, toIndex) {
                if (record.previousIndex === toIndex) {
                    return record;
                }
                if (this._movesTail === null) {
                    this._movesTail = this._movesHead = record;
                }
                else {
                    this._movesTail = this._movesTail._nextMoved = record;
                }
                return record;
            }
            _addToRemovals(record) {
                if (this._unlinkedRecords === null) {
                    this._unlinkedRecords = new _DuplicateMap();
                }
                this._unlinkedRecords.put(record);
                record.currentIndex = null;
                record._nextRemoved = null;
                if (this._removalsTail === null) {
                    this._removalsTail = this._removalsHead = record;
                    record._prevRemoved = null;
                }
                else {
                    record._prevRemoved = this._removalsTail;
                    this._removalsTail = this._removalsTail._nextRemoved = record;
                }
                return record;
            }
            _addIdentityChange(record, item) {
                record.item = item;
                if (this._identityChangesTail === null) {
                    this._identityChangesTail = this._identityChangesHead = record;
                }
                else {
                    this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
                }
                return record;
            }
        }
        $$.DefaultIterableDiffer = DefaultIterableDiffer;
        class IterableChangeRecord_ {
            item;
            trackById;
            currentIndex = null;
            previousIndex = null;
            _nextPrevious = null;
            _prev = null;
            _next = null;
            _prevDup = null;
            _nextDup = null;
            _prevRemoved = null;
            _nextRemoved = null;
            _nextAdded = null;
            _nextMoved = null;
            _nextIdentityChange = null;
            constructor(item, trackById) {
                this.item = item;
                this.trackById = trackById;
            }
        }
        $$.IterableChangeRecord_ = IterableChangeRecord_;
        class _DuplicateItemRecordList {
            _head = null;
            _tail = null;
            add(record) {
                if (this._head === null) {
                    this._head = this._tail = record;
                    record._nextDup = null;
                    record._prevDup = null;
                }
                else {
                    this._tail._nextDup = record;
                    record._prevDup = this._tail;
                    record._nextDup = null;
                    this._tail = record;
                }
            }
            get(trackById, atOrAfterIndex) {
                let record;
                for (record = this._head; record !== null; record = record._nextDup) {
                    if ((atOrAfterIndex === null || atOrAfterIndex <= record.currentIndex) &&
                        Object.is(record.trackById, trackById)) {
                        return record;
                    }
                }
                return null;
            }
            remove(record) {
                const prev = record._prevDup;
                const next = record._nextDup;
                if (prev === null) {
                    this._head = next;
                }
                else {
                    prev._nextDup = next;
                }
                if (next === null) {
                    this._tail = prev;
                }
                else {
                    next._prevDup = prev;
                }
                return this._head === null;
            }
        }
        class _DuplicateMap {
            map = new Map();
            put(record) {
                const key = record.trackById;
                let duplicates = this.map.get(key);
                if (!duplicates) {
                    duplicates = new _DuplicateItemRecordList();
                    this.map.set(key, duplicates);
                }
                duplicates.add(record);
            }
            get(trackById, atOrAfterIndex) {
                const key = trackById;
                const recordList = this.map.get(key);
                return recordList ? recordList.get(trackById, atOrAfterIndex) : null;
            }
            remove(record) {
                const key = record.trackById;
                const recordList = this.map.get(key);
                if (recordList.remove(record)) {
                    this.map.delete(key);
                }
                return record;
            }
            get isEmpty() {
                return this.map.size === 0;
            }
            clear() {
                this.map.clear();
            }
        }
        function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
            const previousIndex = item.previousIndex;
            if (previousIndex === null)
                return previousIndex;
            let moveOffset = 0;
            if (moveOffsets && previousIndex < moveOffsets.length) {
                moveOffset = moveOffsets[previousIndex];
            }
            return previousIndex + addRemoveOffset + moveOffset;
        }
        function defaultIterableDiffersFactory() {
            return new IterableDiffers([new $milkywaystd_classes_DefaultIterableDifferFactory()]);
        }
        $$.defaultIterableDiffersFactory = defaultIterableDiffersFactory;
        class IterableDiffers {
            factories;
            constructor(factories) {
                this.factories = factories;
            }
            static create(factories, parent) {
                if (parent != null) {
                    const copied = parent.factories.slice();
                    factories = factories.concat(copied);
                }
                return new IterableDiffers(factories);
            }
            find(iterable) {
                const factory = this.factories.find(f => f.supports(iterable));
                if (factory != null) {
                    return factory;
                }
                else {
                    throw new Error(`Cannot find a differ supporting object '${iterable}' of type '${getTypeNameForDebugging(iterable)}'`);
                }
            }
        }
        $$.IterableDiffers = IterableDiffers;
        function getTypeNameForDebugging(type) {
            return type['name'] || typeof type;
        }
        $$.getTypeNameForDebugging = getTypeNameForDebugging;
        function isIterable(obj) {
            return obj !== null && typeof obj === 'object' && obj[getSymbolIterator()] !== undefined;
        }
        $$.isIterable = isIterable;
        function isListLikeIterable(obj) {
            if (!isJsObject(obj))
                return false;
            return Array.isArray(obj) ||
                (!(obj instanceof Map) &&
                    getSymbolIterator() in obj);
        }
        $$.isListLikeIterable = isListLikeIterable;
        function areIterablesEqual(a, b, comparator) {
            const iterator1 = a[getSymbolIterator()]();
            const iterator2 = b[getSymbolIterator()]();
            while (true) {
                const item1 = iterator1.next();
                const item2 = iterator2.next();
                if (item1.done && item2.done)
                    return true;
                if (item1.done || item2.done)
                    return false;
                if (!comparator(item1.value, item2.value))
                    return false;
            }
        }
        $$.areIterablesEqual = areIterablesEqual;
        function iterateListLike(obj, fn) {
            if (Array.isArray(obj)) {
                for (let i = 0; i < obj.length; i++) {
                    fn(obj[i]);
                }
            }
            else {
                const iterator = obj[getSymbolIterator()]();
                let item;
                while (!((item = iterator.next()).done)) {
                    fn(item.value);
                }
            }
        }
        $$.iterateListLike = iterateListLike;
        function isJsObject(o) {
            return o !== null && (typeof o === 'function' || typeof o === 'object');
        }
        $$.isJsObject = isJsObject;
        let _symbolIterator = null;
        function getSymbolIterator() {
            if (!_symbolIterator) {
                const Symbol = _global['Symbol'];
                if (Symbol && Symbol.iterator) {
                    _symbolIterator = Symbol.iterator;
                }
                else {
                    const keys = Object.getOwnPropertyNames(Map.prototype);
                    for (let i = 0; i < keys.length; ++i) {
                        const key = keys[i];
                        if (key !== 'entries' && key !== 'size' &&
                            Map.prototype[key] === Map.prototype['entries']) {
                            _symbolIterator = key;
                        }
                    }
                }
            }
            return _symbolIterator;
        }
        $$.getSymbolIterator = getSymbolIterator;
        const _global = ((() => (typeof globalThis !== 'undefined' && globalThis) ||
            (typeof global !== 'undefined' && global) || (typeof window !== 'undefined' && window) ||
            (typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
                self instanceof WorkerGlobalScope && self))());
        function stringify(token) {
            if (typeof token === 'string') {
                return token;
            }
            if (Array.isArray(token)) {
                return '[' + token.map(stringify).join(', ') + ']';
            }
            if (token == null) {
                return '' + token;
            }
            if (token.overriddenName) {
                return `${token.overriddenName}`;
            }
            if (token.name) {
                return `${token.name}`;
            }
            const res = token.toString();
            if (res == null) {
                return '' + res;
            }
            const newLineIndex = res.indexOf('\n');
            return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
        }
        $$.stringify = stringify;
        function concatStringsWithSpace(before, after) {
            return (before == null || before === '') ?
                (after === null ? '' : after) :
                ((after == null || after === '') ? before : before + ' ' + after);
        }
        $$.concatStringsWithSpace = concatStringsWithSpace;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/classes/DefaultIterableDiffer.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_scroll_VirtualForOf extends $mol_view {
    }
    $.$milkywaystd_scroll_VirtualForOf = $milkywaystd_scroll_VirtualForOf;
})($ || ($ = {}));
//milkywaystd/scroll/-view.tree/VirtualForOF.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_scroll_VirtualScrollSpacer extends $mol_view {
    }
    $.$milkywaystd_scroll_VirtualScrollSpacer = $milkywaystd_scroll_VirtualScrollSpacer;
})($ || ($ = {}));
//milkywaystd/scroll/-view.tree/VirtualScrollSpacer.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_scroll_VirtualScrollViewport extends $mol_view {
        pre_sub() {
            return [];
        }
        post_sub() {
            return [];
        }
        sub() {
            return [
                this.getForOf(),
                this.spacer()
            ];
        }
        getForOf() {
            return null;
        }
        totalContentWidth() {
            return 0;
        }
        totalContentHeight() {
            return 0;
        }
        spacer() {
            const obj = new this.$.$milkywaystd_scroll_VirtualScrollSpacer();
            obj.style = () => ({
                width: this.totalContentWidth(),
                height: this.totalContentHeight()
            });
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_scroll_VirtualScrollViewport.prototype, "spacer", null);
    $.$milkywaystd_scroll_VirtualScrollViewport = $milkywaystd_scroll_VirtualScrollViewport;
})($ || ($ = {}));
//milkywaystd/scroll/-view.tree/VirtualScrollViewport.view.tree.ts
;
"use strict";
//milkywaystd/scroll/interface/IVirtualScrollStrategy.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_Differ {
            _diff = [];
            _map = new Map();
            create(init) {
            }
            diff(items) {
                this._diff = [];
                const s = new Set();
                for (let index = 0; index < items.length; index++) {
                    const element = items[index];
                    const idx = this._map.get(element);
                    if (idx === undefined) {
                        this._map.set(element, index);
                        this._diff.push({
                            currentIndex: index,
                            previousIndex: null,
                            item: element,
                        });
                    }
                    else if (index !== idx) {
                        this._map.set(element, index);
                    }
                    s.add(element);
                }
                this._map.forEach((value, key, map) => {
                    if (!s.has(key)) {
                        this._diff.push({
                            currentIndex: null,
                            previousIndex: value,
                            item: key,
                        });
                        map.delete(key);
                        this._diff;
                    }
                });
                return this._diff;
            }
        }
        $$.$milkywaystd_scroll_Differ = $milkywaystd_scroll_Differ;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/Differ.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_Scrollable {
            _destroyed = $milkywaystd_classes_stream(true);
            _elementScrolled = null;
            _elementRef;
            destructor() {
            }
            scrollDispatcher;
            constructor(elementRef, scrollDispatcher, dirr) {
                this._elementRef = elementRef;
                this.scrollDispatcher = scrollDispatcher;
            }
            getElementRef() {
                return this._elementRef;
            }
            deinit() {
                this.scrollDispatcher.deregister(this);
                this._destroyed(false);
            }
            Init() {
                this._elementScrolled = $milkywaystd_classes_StreamClass.fromEvent(this._elementRef, "scroll");
                this.scrollDispatcher.register(this);
            }
            elementScrolled() {
                return this._elementScrolled;
            }
            get_elementRef() {
                return this._elementRef;
            }
            dir = null;
            scrollTo(options) {
                const el = this._elementRef;
                const isRtl = this.dir && this.dir.value == "rtl";
                if (options.left == null) {
                    options.left = isRtl ? options.end : options.start;
                }
                if (options.right == null) {
                    options.right = isRtl ? options.start : options.end;
                }
                if (options.bottom != null) {
                    options.top =
                        el.scrollHeight - el.clientHeight - options.bottom;
                }
                if (isRtl && getRtlScrollAxisType() != RtlScrollAxisType.NORMAL) {
                    if (options.left != null) {
                        options.right =
                            el.scrollWidth - el.clientWidth - options.left;
                    }
                    if (getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
                        options.left = options.right;
                    }
                    else if (getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
                        options.left = options.right
                            ? -options.right
                            : options.right;
                    }
                }
                else {
                    if (options.right != null) {
                        options.left =
                            el.scrollWidth - el.clientWidth - options.right;
                    }
                }
                this._applyScrollToOptions(options);
            }
            _applyScrollToOptions(options) {
                const el = this._elementRef;
                if (supportsScrollBehavior()) {
                    el.scrollTo(options);
                }
                else {
                    if (options.top != null) {
                        el.scrollTop = options.top;
                    }
                    if (options.left != null) {
                        el.scrollLeft = options.left;
                    }
                }
            }
            measureScrollOffset(from) {
                const LEFT = "left";
                const RIGHT = "right";
                const el = this._elementRef;
                if (from == "top") {
                    return el.scrollTop;
                }
                if (from == "bottom") {
                    return el.scrollHeight - el.clientHeight - el.scrollTop;
                }
                const isRtl = this.dir && this.dir.value == "rtl";
                if (from == "start") {
                    from = isRtl ? RIGHT : LEFT;
                }
                else if (from == "end") {
                    from = isRtl ? LEFT : RIGHT;
                }
                if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
                    if (from == LEFT) {
                        return el.scrollWidth - el.clientWidth - el.scrollLeft;
                    }
                    else {
                        return el.scrollLeft;
                    }
                }
                else if (isRtl &&
                    getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
                    if (from == LEFT) {
                        return el.scrollLeft + el.scrollWidth - el.clientWidth;
                    }
                    else {
                        return -el.scrollLeft;
                    }
                }
                else {
                    if (from == LEFT) {
                        return el.scrollLeft;
                    }
                    else {
                        return el.scrollWidth - el.clientWidth - el.scrollLeft;
                    }
                }
            }
        }
        $$.$milkywaystd_scroll_Scrollable = $milkywaystd_scroll_Scrollable;
        let RtlScrollAxisType;
        (function (RtlScrollAxisType) {
            RtlScrollAxisType[RtlScrollAxisType["NORMAL"] = 0] = "NORMAL";
            RtlScrollAxisType[RtlScrollAxisType["NEGATED"] = 1] = "NEGATED";
            RtlScrollAxisType[RtlScrollAxisType["INVERTED"] = 2] = "INVERTED";
        })(RtlScrollAxisType = $$.RtlScrollAxisType || ($$.RtlScrollAxisType = {}));
        let rtlScrollAxisType;
        let scrollBehaviorSupported;
        function supportsScrollBehavior() {
            if (scrollBehaviorSupported == null) {
                if (typeof document !== "object" ||
                    !document ||
                    typeof Element !== "function" ||
                    !Element) {
                    scrollBehaviorSupported = false;
                    return scrollBehaviorSupported;
                }
                if ("scrollBehavior" in document.documentElement.style) {
                    scrollBehaviorSupported = true;
                }
                else {
                    const scrollToFunction = Element.prototype.scrollTo;
                    if (scrollToFunction) {
                        scrollBehaviorSupported = !/\{\s*\[native code\]\s*\}/.test(scrollToFunction.toString());
                    }
                    else {
                        scrollBehaviorSupported = false;
                    }
                }
            }
            return scrollBehaviorSupported;
        }
        $$.supportsScrollBehavior = supportsScrollBehavior;
        function getRtlScrollAxisType() {
            if (typeof document !== "object" || !document) {
                return RtlScrollAxisType.NORMAL;
            }
            if (rtlScrollAxisType == null) {
                const scrollContainer = document.createElement("div");
                const containerStyle = scrollContainer.style;
                scrollContainer.dir = "rtl";
                containerStyle.width = "1px";
                containerStyle.overflow = "auto";
                containerStyle.visibility = "hidden";
                containerStyle.pointerEvents = "none";
                containerStyle.position = "absolute";
                const content = document.createElement("div");
                const contentStyle = content.style;
                contentStyle.width = "2px";
                contentStyle.height = "1px";
                scrollContainer.appendChild(content);
                document.body.appendChild(scrollContainer);
                rtlScrollAxisType = RtlScrollAxisType.NORMAL;
                if (scrollContainer.scrollLeft === 0) {
                    scrollContainer.scrollLeft = 1;
                    rtlScrollAxisType =
                        scrollContainer.scrollLeft === 0
                            ? RtlScrollAxisType.NEGATED
                            : RtlScrollAxisType.INVERTED;
                }
                scrollContainer.remove();
            }
            return rtlScrollAxisType;
        }
        $$.getRtlScrollAxisType = getRtlScrollAxisType;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/Scrollable.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        let _ViewRepeaterOperation;
        (function (_ViewRepeaterOperation) {
            _ViewRepeaterOperation[_ViewRepeaterOperation["REPLACED"] = 0] = "REPLACED";
            _ViewRepeaterOperation[_ViewRepeaterOperation["INSERTED"] = 1] = "INSERTED";
            _ViewRepeaterOperation[_ViewRepeaterOperation["MOVED"] = 2] = "MOVED";
            _ViewRepeaterOperation[_ViewRepeaterOperation["REMOVED"] = 3] = "REMOVED";
        })(_ViewRepeaterOperation = $$._ViewRepeaterOperation || ($$._ViewRepeaterOperation = {}));
        class $milkywaystd_scroll_RecycleViewRepeaterStrategy {
            viewCacheSize = 20;
            _viewCache = [];
            applyChanges2(changes, viewContainerRef, itemContextFactory, itemValueResolver, itemViewChanged) {
                if (!changes.length)
                    return;
                viewContainerRef.startMutation();
                changes.sort((a, b) => { return a.currentIndex === null && b.currentIndex !== null ? -1 : 1; });
                for (const record of changes) {
                    let adjustedPreviousIndex = record.previousIndex;
                    let currentIndex = record.currentIndex;
                    let view;
                    let operation;
                    if (record.previousIndex == null) {
                        const viewArgsFactory = () => itemContextFactory(record, adjustedPreviousIndex, currentIndex);
                        view = this._insertView(viewArgsFactory, currentIndex, viewContainerRef, itemValueResolver(record));
                        operation = view
                            ? _ViewRepeaterOperation.INSERTED
                            : _ViewRepeaterOperation.REPLACED;
                    }
                    else if (currentIndex == null) {
                        this._detachAndCacheView(adjustedPreviousIndex, viewContainerRef);
                        operation = _ViewRepeaterOperation.REMOVED;
                    }
                    else {
                        view = this._moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, itemValueResolver(record));
                        operation = _ViewRepeaterOperation.MOVED;
                    }
                    if (itemViewChanged) {
                        itemViewChanged({
                            context: view?.context,
                            operation,
                            record,
                        });
                    }
                }
                viewContainerRef.applyMutation();
            }
            applyChanges(changes, viewContainerRef, itemContextFactory, itemValueResolver, itemViewChanged) {
                changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
                    let view;
                    let operation;
                    if (record.previousIndex == null) {
                        const viewArgsFactory = () => itemContextFactory(record, adjustedPreviousIndex, currentIndex);
                        view = this._insertView(viewArgsFactory, currentIndex, viewContainerRef, itemValueResolver(record));
                        operation = view ? _ViewRepeaterOperation.INSERTED : _ViewRepeaterOperation.REPLACED;
                    }
                    else if (currentIndex == null) {
                        this._detachAndCacheView(adjustedPreviousIndex, viewContainerRef);
                        operation = _ViewRepeaterOperation.REMOVED;
                    }
                    else {
                        view = this._moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, itemValueResolver(record));
                        operation = _ViewRepeaterOperation.MOVED;
                    }
                    if (itemViewChanged) {
                        itemViewChanged({
                            context: view?.context,
                            operation,
                            record,
                        });
                    }
                });
            }
            detach() {
                for (const view of this._viewCache) {
                    if (view.destroy)
                        view.destroy();
                }
                this._viewCache = [];
            }
            _insertView(viewArgsFactory, currentIndex, viewContainerRef, value) {
                const cachedView = this._insertViewFromCache(currentIndex, viewContainerRef);
                if (cachedView) {
                    cachedView.implicit(value);
                    return undefined;
                }
                const viewArgs = viewArgsFactory();
                return viewContainerRef.createEmbeddedView(viewArgs.templateRef, viewArgs.context, viewArgs.index);
            }
            _detachAndCacheView(index, viewContainerRef) {
                const detachedView = viewContainerRef.detach(index);
                if (detachedView)
                    this._maybeCacheView(detachedView, viewContainerRef);
            }
            _moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, value) {
                const view = viewContainerRef.get(adjustedPreviousIndex);
                viewContainerRef.move(view, currentIndex);
                view.implicit(value);
                return view;
            }
            _maybeCacheView(view, viewContainerRef) {
                if (this._viewCache.length < this.viewCacheSize) {
                    this._viewCache.push(view);
                }
                else {
                    const index = viewContainerRef.indexOf(view);
                    if (index === -1) {
                        console.warn("SET DESTROY FUNCTION!");
                    }
                    else {
                        viewContainerRef.remove(index);
                    }
                }
            }
            _insertViewFromCache(index, viewContainerRef) {
                const cachedView = this._viewCache.pop();
                if (cachedView) {
                    viewContainerRef.insert(cachedView, index);
                }
                return cachedView || null;
            }
        }
        $$.$milkywaystd_scroll_RecycleViewRepeaterStrategy = $milkywaystd_scroll_RecycleViewRepeaterStrategy;
        class $milkywaystd_scroll_DisposeViewRepeaterStrategy {
            applyChanges(changes, viewContainerRef, itemContextFactory, itemValueResolver, itemViewChanged) {
                let mutStarted = false;
                changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
                    if (!mutStarted) {
                        mutStarted = true;
                    }
                    let view;
                    let operation;
                    if (record.previousIndex == null) {
                        const insertContext = itemContextFactory(record, adjustedPreviousIndex, currentIndex);
                        view = viewContainerRef.createEmbeddedView(insertContext.templateRef, insertContext.context, insertContext.index);
                        operation = _ViewRepeaterOperation.INSERTED;
                    }
                    else if (currentIndex == null) {
                        viewContainerRef.remove(adjustedPreviousIndex);
                        operation = _ViewRepeaterOperation.REMOVED;
                    }
                    else {
                        view = viewContainerRef.get(adjustedPreviousIndex);
                        viewContainerRef.move(view, currentIndex);
                        operation = _ViewRepeaterOperation.MOVED;
                    }
                    if (itemViewChanged) {
                        itemViewChanged({
                            context: view?.context,
                            operation,
                            record,
                        });
                    }
                });
                return mutStarted;
            }
            detach() { }
        }
        $$.$milkywaystd_scroll_DisposeViewRepeaterStrategy = $milkywaystd_scroll_DisposeViewRepeaterStrategy;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/ViewRepeater.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        function getOffset(orientation, direction, node) {
            const el = node;
            if (!el.getBoundingClientRect) {
                return 0;
            }
            const rect = el.getBoundingClientRect();
            if (orientation === "horizontal") {
                return direction === "start" ? rect.left : rect.right;
            }
            return direction === "start" ? rect.top : rect.bottom;
        }
        class $milkywaystd_scroll_VirtualForOf extends $.$mol_view {
            viewChange = $milkywaystd_classes_stream();
            _dataSourceChanges = $milkywaystd_classes_stream();
            get cdkVirtualForOf() {
                return this._cdkVirtualForOf;
            }
            set cdkVirtualForOf(value) {
                this._cdkVirtualForOf = value;
                this._dataSourceChanges(value);
            }
            _cdkVirtualForOf;
            sub() {
                return this.calculatedSubs();
            }
            calculatedSubs(val) {
                if (undefined !== val) {
                    return val;
                }
                return [];
            }
            idx = 0;
            get cdkVirtualForTrackBy() {
                return this._cdkVirtualForTrackBy;
            }
            set cdkVirtualForTrackBy(fn) {
                this._needsUpdate = true;
                this._cdkVirtualForTrackBy = fn
                    ? (index, item) => fn(index +
                        (this._renderedRange
                            ? this._renderedRange.start
                            : 0), item)
                    : undefined;
            }
            _cdkVirtualForTrackBy;
            set cdkVirtualForTemplate(value) {
                if (value) {
                    this._needsUpdate = true;
                    this._template = value;
                }
            }
            get cdkVirtualForTemplateCacheSize() {
                return this._viewRepeater.viewCacheSize;
            }
            set cdkVirtualForTemplateCacheSize(size) {
                this._viewRepeater.viewCacheSize = size;
            }
            dataStream = this._dataSourceChanges;
            _differ = new $milkywaystd_classes_DefaultIterableDifferFactory().create();
            _data;
            _renderedItems;
            _renderedRange = { start: 0, end: 0 };
            _needsUpdate = false;
            _destroyed = $milkywaystd_classes_stream();
            _viewContainerRef() {
                return this;
            }
            _template = null;
            _viewRepeater = new $milkywaystd_scroll_RecycleViewRepeaterStrategy();
            _viewport = null;
            init() {
                this.dataStream.subscribe((data) => {
                    this._data = data;
                    this._onRenderedDataChange();
                });
                this._viewport?.renderedRangeStream.subscribe((range) => {
                    this._renderedRange = range;
                    this.viewChange(this._renderedRange);
                    this._onRenderedDataChange();
                });
                this._viewport?.attach(this);
            }
            measureRangeSize(range, orientation) {
                if (range.start >= range.end) {
                    return 0;
                }
                if (range.start < this._renderedRange.start ||
                    range.end > this._renderedRange.end) {
                    throw Error(`Error: attempted to measure an item that isn't rendered.`);
                }
                const renderedStartIndex = range.start - this._renderedRange.start;
                const rangeLen = range.end - range.start;
                let firstNode;
                let lastNode;
                for (let i = 0; i < rangeLen; i++) {
                    const view = this._viewContainerRef()
                        .get(i + renderedStartIndex)
                        .dom_node();
                    if (view && view.rootNodes.length) {
                        firstNode = lastNode = view.rootNodes[0];
                        break;
                    }
                }
                for (let i = rangeLen - 1; i > -1; i--) {
                    const view = this._viewContainerRef()
                        .get(i + renderedStartIndex)
                        .dom_node();
                    if (view && view.rootNodes.length) {
                        lastNode = view.rootNodes[view.rootNodes.length - 1];
                        break;
                    }
                }
                return firstNode && lastNode
                    ? getOffset(orientation, "end", lastNode) -
                        getOffset(orientation, "start", firstNode)
                    : 0;
            }
            ngDoCheck() {
                if (this._differ && this._needsUpdate) {
                    const changes = this._differ.diff(this._renderedItems);
                    if (!changes) {
                        this._updateContext();
                    }
                    else {
                        this._applyChanges(changes);
                    }
                    this._needsUpdate = false;
                }
            }
            destructor() {
                console.log("VOF DESTRUCTOR");
                this._viewRepeater.detach();
            }
            _onRenderedDataChange() {
                if (!this._renderedRange) {
                    return;
                }
                this._renderedItems = this._data.slice(this._renderedRange.start, this._renderedRange.end);
                this._needsUpdate = true;
                this.ngDoCheck();
            }
            _updateContext() {
                const count = this._data.length;
                let i = this.tempSubs.length;
                while (i--) {
                    const view = this._viewContainerRef().get(i);
                    view.context.index = this._renderedRange.start + i;
                    view.context.count = count;
                    this._updateComputedContextProperties(view.context);
                    view.detectChanges();
                }
            }
            _applyChanges(changes) {
                this._viewRepeater.applyChanges(changes, this._viewContainerRef(), (record, _adjustedPreviousIndex, currentIndex) => this._getEmbeddedViewArgs(record, currentIndex), (record) => record.item);
                changes.forEachIdentityChange((record) => {
                    const view = this._viewContainerRef().get(record.currentIndex);
                    view.implicit(record.item);
                });
                const count = this._data.length;
                let i = this.tempSubs.length;
                while (i--) {
                    const view = this._viewContainerRef().get(i);
                    const context = view.context();
                    context.index = this._renderedRange.start + i;
                    context.count = count;
                    this._updateComputedContextProperties(context);
                }
                this.applyMutation();
            }
            _updateComputedContextProperties(context) {
                context.first = context.index === 0;
                context.last = context.index === context.count - 1;
                context.even = context.index % 2 === 0;
                context.odd = !context.even;
            }
            _getEmbeddedViewArgs(record, index) {
                return {
                    templateRef: this._template,
                    context: {
                        implicit: record.item,
                        cdkVirtualForOf: this._cdkVirtualForOf,
                        index: -1,
                        count: -1,
                        first: false,
                        last: false,
                        odd: false,
                        even: false,
                    },
                    index,
                };
            }
            mutationstarted = false;
            tempSubs = [];
            startMutation() {
                if (this.mutationstarted)
                    throw new Error("already mutation");
                this.mutationstarted = true;
                this.tempSubs = [...this.calculatedSubs()];
            }
            applyMutation() {
                this.calculatedSubs([...this.tempSubs]);
                this.mutationstarted = false;
            }
            indexOf(view) {
                return this.tempSubs.indexOf(view);
            }
            insert(view, index) {
                this.tempSubs.splice(index, 0, view);
            }
            move(view, index) {
            }
            remove(index) {
                let removed = this.tempSubs.splice(index, 1);
                if (removed && removed.length) {
                    removed = removed[0];
                    removed._index = null;
                }
                else {
                    return null;
                }
                return removed;
            }
            detach(index) {
                const detached = this.remove(index);
                return detached;
            }
            get(index) {
                return this.tempSubs[index];
            }
            createEmbeddedView(templateRef, context, index) {
                if (!templateRef)
                    throw new Error("templateRef is not a function");
                const b = templateRef();
                b.onData(context);
                this.insert(b, index);
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualForOf.prototype, "calculatedSubs", null);
        $$.$milkywaystd_scroll_VirtualForOf = $milkywaystd_scroll_VirtualForOf;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/VirtualForOf.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("milkywaystd/scroll/scroll.view.css", "\n[milkywaystd_scroll_virtualscrollviewport] {\n\tdisplay: block;\n\tposition: relative;\n\ttransform: translateZ(0);\n  }\n  \n  \n  .cdkvirtualscrollable {\n\toverflow: auto;\n\twill-change: scroll-position;\n\tcontain: strict;\n\t-webkit-overflow-scrolling: touch;\n  }\n  \n  \n  [milkywaystd_scroll_virtualforof] {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tcontain: content;\n  \twidth: 100%;\n\ttransition: none;\n\tdisplay: block;\n  }\n  \n  /*.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper {\n\tmin-height: 100%;\n\t\n  }\n  \n  .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper {\n\tmin-width: 100%;\n  \n  }*/\n  \n  \n  [milkywaystd_scroll_virtualscrollspacer] {\n\theight: 1px;\n\ttransform-origin: 0 0;\n\tflex: 0 0 auto; \n  display: block;\n   \n  }\n");
})($ || ($ = {}));
//milkywaystd/scroll/-css/scroll.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_VirtualScrollViewport extends $.$milkywaystd_scroll_VirtualScrollViewport {
            forOf = null;
            forOfCtl = null;
            getForOf() {
                if (!this.forOf) {
                    this.forOfCtl = new $milkywaystd_scroll_VirtualScrollViewportController(this.dom_node(), new $milkywaystd_scroll_strategy_FixedSizeVirtualScrollStrategy(this.itemHeight(), this.minBufferPx(), this.maxBufferPx()), null, new $milkywaystd_scroll_ScrollDispatcher(window.document), new $milkywaystd_scroll_ViewportRuler(window.document));
                    this.forOfCtl.Init();
                    this.forOf = new $milkywaystd_scroll_VirtualForOf();
                    this.forOf.cdkVirtualForTemplate = this.itemRendererFactory;
                    this.forOfCtl._contentWrapper = this.forOf.dom_node();
                    this.forOf._viewport = this.forOfCtl;
                    this.forOf.init();
                }
                return this.forOf;
            }
            auto() {
                console.log("AAA");
            }
            itemHeight() {
                return 0;
            }
            itemRendererFactory() {
                return null;
            }
            setData(data) {
                this.forOf?.dataStream(data);
            }
            totalContentWidth() {
                return this.forOfCtl?._totalContentWidth();
            }
            totalContentHeight() {
                return this.forOfCtl?._totalContentHeight();
            }
            minBufferPx() {
                return 100;
            }
            maxBufferPx() {
                return 200;
            }
            sub() {
                return [...this.pre_sub(), ...super.sub(), ...this.post_sub()];
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualScrollViewport.prototype, "totalContentWidth", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualScrollViewport.prototype, "totalContentHeight", null);
        $$.$milkywaystd_scroll_VirtualScrollViewport = $milkywaystd_scroll_VirtualScrollViewport;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/VirtualScrollViewport.view.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $$.DEFAULT_RESIZE_TIME = 20;
        class $milkywaystd_scroll_ViewportRuler {
            _viewportSize = null;
            _change = $milkywaystd_classes_stream();
            _changeListener = (event) => {
                this._change(event);
            };
            _document;
            constructor(document) {
                this._document = document;
                const window = this._getWindow();
                window.addEventListener('resize', this._changeListener);
                window.addEventListener('orientationchange', this._changeListener);
                this.change().subscribe(() => (this._viewportSize = null));
            }
            ngOnDestroy() {
            }
            getViewportSize() {
                if (!this._viewportSize) {
                    this._updateViewportSize();
                }
                const output = { width: this._viewportSize.width, height: this._viewportSize.height };
                return output;
            }
            getViewportRect() {
                const scrollPosition = this.getViewportScrollPosition();
                const { width, height } = this.getViewportSize();
                return {
                    top: scrollPosition.top,
                    left: scrollPosition.left,
                    bottom: scrollPosition.top + height,
                    right: scrollPosition.left + width,
                    height,
                    width,
                };
            }
            getViewportScrollPosition() {
                const document = this._document;
                const window = this._getWindow();
                const documentElement = document.documentElement;
                const documentRect = documentElement.getBoundingClientRect();
                const top = -documentRect.top ||
                    document.body.scrollTop ||
                    window.scrollY ||
                    documentElement.scrollTop ||
                    0;
                const left = -documentRect.left ||
                    document.body.scrollLeft ||
                    window.scrollX ||
                    documentElement.scrollLeft ||
                    0;
                return { top, left };
            }
            change(throttleTime = $$.DEFAULT_RESIZE_TIME) {
                return throttleTime > 0 ? this._change.auditTime(throttleTime) : this._change;
            }
            _getWindow() {
                return this._document.defaultView || window;
            }
            _updateViewportSize() {
                const window = this._getWindow();
                this._viewportSize = { width: window.innerWidth, height: window.innerHeight };
            }
        }
        $$.$milkywaystd_scroll_ViewportRuler = $milkywaystd_scroll_ViewportRuler;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/ViewportRuler.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_ScrollDispatcher {
            _document;
            constructor(document) {
                this._document = document;
            }
            _scrolled = $milkywaystd_classes_stream();
            _globalSubscription = null;
            _scrolledCount = 0;
            scrollContainers = new Map();
            register(scrollable) {
                if (!this.scrollContainers.has(scrollable)) {
                    this.scrollContainers.set(scrollable, scrollable.elementScrolled().subscribe(() => this._scrolled(scrollable)));
                }
            }
            deregister(scrollable) {
                const scrollableReference = this.scrollContainers.get(scrollable);
                if (scrollableReference) {
                    this.scrollContainers.delete(scrollable);
                }
            }
            scrolled(auditTimeInMs = 20) {
                if (!this._globalSubscription) {
                    this._addGlobalListener();
                }
                const subscription = auditTimeInMs > 0
                    ? this._scrolled.auditTime(auditTimeInMs)
                    : this._scrolled;
                this._scrolledCount++;
                return subscription;
            }
            ngOnDestroy() {
                this._removeGlobalListener();
                this.scrollContainers.forEach((_, container) => this.deregister(container));
            }
            ancestorScrolled(elementOrElementRef, auditTimeInMs) {
                const ancestors = this.getAncestorScrollContainers(elementOrElementRef);
                return this.scrolled(auditTimeInMs).filter(target => {
                    return !target || ancestors.indexOf(target) > -1;
                });
            }
            getAncestorScrollContainers(elementOrElementRef) {
                const scrollingContainers = [];
                this.scrollContainers.forEach((_subscription, scrollable) => {
                    if (this._scrollableContainsElement(scrollable, elementOrElementRef)) {
                        scrollingContainers.push(scrollable);
                    }
                });
                return scrollingContainers;
            }
            _getWindow() {
                return this._document.defaultView || window;
            }
            _scrollableContainsElement(scrollable, elementOrElementRef) {
                let element = elementOrElementRef;
                let scrollableElement = scrollable.getElementRef();
                do {
                    if (element == scrollableElement) {
                        return true;
                    }
                } while ((element = element.parentElement));
                return false;
            }
            _addGlobalListener() {
                this._globalSubscription = $milkywaystd_classes_stream.fromEvent(window.document, 'scroll').subscribe(() => this._scrolled());
            }
            _removeGlobalListener() {
                if (this._globalSubscription) {
                    this._globalSubscription = null;
                }
            }
        }
        $$.$milkywaystd_scroll_ScrollDispatcher = $milkywaystd_scroll_ScrollDispatcher;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/ScrollDispatcher.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_VirtualScrollable extends $milkywaystd_scroll_Scrollable {
            constructor(elementRef, scrollDispatcher, dir) {
                super(elementRef, scrollDispatcher, dir);
            }
            measureViewportSize(orientation) {
                const viewportEl = this._elementRef;
                return orientation === 'horizontal' ? viewportEl.clientWidth : viewportEl.clientHeight;
            }
        }
        $$.$milkywaystd_scroll_VirtualScrollable = $milkywaystd_scroll_VirtualScrollable;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/VirtualScrollable.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        function rangesEqual(r1, r2) {
            return r1.start == r2.start && r1.end == r2.end;
        }
        class $milkywaystd_scroll_VirtualScrollViewportController extends $milkywaystd_scroll_VirtualScrollable {
            _detachedSubject = $milkywaystd_classes_stream();
            _renderedRangeSubject = $milkywaystd_classes_stream();
            orientation(orientation) {
                if (orientation !== undefined) {
                    return orientation;
                }
                return 'vertical';
            }
            get appendOnly() {
                return this._appendOnly;
            }
            set appendOnly(value) {
                this._appendOnly = value;
            }
            _appendOnly = false;
            scrolledIndexChange = $milkywaystd_classes_stream();
            _contentWrapper = null;
            renderedRangeStream = this._renderedRangeSubject;
            _totalContentSize(size) {
                if (undefined !== size)
                    return size;
                return 0;
            }
            ;
            _totalContentWidth() {
                this.orientation() === 'horizontal' ? `${this._totalContentSize()}px` : '';
            }
            ;
            _totalContentHeight() {
                return this.orientation() === 'horizontal' ? '' : `${this._totalContentSize()}px`;
            }
            ;
            _renderedContentTransform = '';
            _renderedRange = { start: 0, end: 0 };
            _dataLength = 0;
            _viewportSize = 0;
            _forOf = null;
            _renderedContentOffset = 0;
            _renderedContentOffsetNeedsRewrite = false;
            _isChangeDetectionPending = false;
            _runAfterChangeDetection = [];
            _viewportChanges = null;
            _scrollStrategy;
            scrollable;
            subscripion;
            constructor(elementRef, scrollStrategy, dir, scrollDispatcher, viewportRuler, scrollable) {
                super(elementRef, scrollDispatcher, dir);
                if (!scrollStrategy) {
                    throw Error('Error: cdk-virtual-scroll-viewport requires the "itemSize" property to be set.');
                }
                this.scrollable = scrollable;
                this._scrollStrategy = scrollStrategy;
                this._viewportChanges = viewportRuler.change().subscribe(() => {
                    this.checkViewportSize();
                });
                if (!this.scrollable) {
                    this._elementRef.classList.add('cdkvirtualscrollable');
                    this.scrollable = this;
                }
                this._scrollStrategy.scrolledIndexChange?.subscribe(() => Promise.resolve().then(this.scrolledIndexChange));
            }
            Init() {
                if (this.scrollable === this) {
                    super.Init();
                }
                Promise.resolve().then(() => {
                    this._measureViewportSize();
                    this._scrollStrategy.attach(this);
                    this.subscripion = this.scrollable?.elementScrolled()
                        .auditTime(0)
                        .subscribe(() => this._scrollStrategy.onContentScrolled());
                    this.subscripion(null);
                    this._markChangeDetectionNeeded();
                });
            }
            deinit() {
                this.detach();
                this._scrollStrategy.detach();
                super.deinit();
            }
            attach(forOf) {
                if (this._forOf) {
                    throw Error('$milkywaystd_scroll_VirtualForOf is already attached.');
                }
                this._forOf = forOf;
                this._forOf.dataStream.subscribe(data => {
                    const newLength = data.length;
                    if (newLength !== this._dataLength) {
                        this._dataLength = newLength;
                        this._scrollStrategy.onDataLengthChanged();
                    }
                    this._doChangeDetection();
                });
            }
            detach() {
                this._forOf = null;
                this._detachedSubject();
            }
            getDataLength() {
                return this._dataLength;
            }
            getViewportSize() {
                return this._viewportSize;
            }
            getRenderedRange() {
                return this._renderedRange;
            }
            measureBoundingClientRectWithScrollOffset(from) {
                return this.getElementRef().getBoundingClientRect()[from];
            }
            setTotalContentSize(size) {
                if (this._totalContentSize() !== size) {
                    this._totalContentSize(size);
                    this._markChangeDetectionNeeded();
                }
            }
            setRenderedRange(range) {
                if (!rangesEqual(this._renderedRange, range)) {
                    if (this.appendOnly) {
                        range = { start: 0, end: Math.max(this._renderedRange.end, range.end) };
                    }
                    this._renderedRangeSubject((this._renderedRange = range));
                    this._markChangeDetectionNeeded(() => this._scrollStrategy.onContentRendered());
                }
            }
            getOffsetToRenderedContentStart() {
                return this._renderedContentOffsetNeedsRewrite ? null : this._renderedContentOffset;
            }
            setRenderedContentOffset(offset, to = 'to-start') {
                offset = this.appendOnly && to === 'to-start' ? 0 : offset;
                const isRtl = this.dir && this.dir.value == 'rtl';
                const isHorizontal = this.orientation() == 'horizontal';
                const axis = isHorizontal ? 'X' : 'Y';
                const axisDirection = isHorizontal && isRtl ? -1 : 1;
                let transform = `translate${axis}(${Number(axisDirection * offset)}px)`;
                this._renderedContentOffset = offset;
                if (to === 'to-end') {
                    transform += ` translate${axis}(-100%)`;
                    this._renderedContentOffsetNeedsRewrite = true;
                }
                if (this._renderedContentTransform != transform) {
                    this._renderedContentTransform = transform;
                    this._markChangeDetectionNeeded(() => {
                        if (this._renderedContentOffsetNeedsRewrite) {
                            this._renderedContentOffset -= this.measureRenderedContentSize();
                            this._renderedContentOffsetNeedsRewrite = false;
                            this.setRenderedContentOffset(this._renderedContentOffset);
                        }
                        else {
                            this._scrollStrategy.onRenderedOffsetChanged();
                        }
                    });
                }
            }
            scrollToOffset(offset, behavior = 'auto') {
                const options = { behavior };
                if (this.orientation() === 'horizontal') {
                    options.start = offset;
                }
                else {
                    options.top = offset;
                }
                this.scrollable.scrollTo(options);
            }
            scrollToIndex(index, behavior = 'auto') {
                this._scrollStrategy.scrollToIndex(index, behavior);
            }
            measureScrollOffset(from) {
                let measureScrollOffset;
                if (this.scrollable == this) {
                    measureScrollOffset = (_from) => super.measureScrollOffset(_from);
                }
                else {
                    measureScrollOffset = (_from) => this.scrollable.measureScrollOffset(_from);
                }
                return Math.max(0, measureScrollOffset(from ?? (this.orientation() === 'horizontal' ? 'start' : 'top')) -
                    this.measureViewportOffset());
            }
            measureViewportOffset(from) {
                let fromRect;
                const LEFT = 'left';
                const RIGHT = 'right';
                const isRtl = this.dir?.value == 'rtl';
                if (from == 'start') {
                    fromRect = isRtl ? RIGHT : LEFT;
                }
                else if (from == 'end') {
                    fromRect = isRtl ? LEFT : RIGHT;
                }
                else if (from) {
                    fromRect = from;
                }
                else {
                    fromRect = this.orientation() === 'horizontal' ? 'left' : 'top';
                }
                const scrollerClientRect = this.scrollable.measureBoundingClientRectWithScrollOffset(fromRect);
                const viewportClientRect = this._elementRef.getBoundingClientRect()[fromRect];
                return viewportClientRect - scrollerClientRect;
            }
            measureRenderedContentSize() {
                const contentEl = this._contentWrapper;
                return this.orientation() === 'horizontal' ? contentEl.offsetWidth : contentEl.offsetHeight;
            }
            measureRangeSize(range) {
                if (!this._forOf) {
                    return 0;
                }
                return this._forOf.measureRangeSize(range, this.orientation());
            }
            checkViewportSize() {
                this._measureViewportSize();
                this._scrollStrategy.onDataLengthChanged();
            }
            _measureViewportSize() {
                this._viewportSize = this.scrollable.measureViewportSize(this.orientation());
            }
            _markChangeDetectionNeeded(runAfter) {
                if (runAfter) {
                    this._runAfterChangeDetection.push(runAfter);
                }
                if (!this._isChangeDetectionPending) {
                    this._isChangeDetectionPending = true;
                    Promise.resolve().then(() => {
                        this._doChangeDetection();
                    });
                }
            }
            _doChangeDetection() {
                this._isChangeDetectionPending = false;
                this._contentWrapper.style.transform = this._renderedContentTransform;
                const runAfterChangeDetection = this._runAfterChangeDetection;
                this._runAfterChangeDetection = [];
                for (const fn of runAfterChangeDetection) {
                    fn();
                }
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualScrollViewportController.prototype, "orientation", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualScrollViewportController.prototype, "_totalContentSize", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualScrollViewportController.prototype, "_totalContentWidth", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualScrollViewportController.prototype, "_totalContentHeight", null);
        $$.$milkywaystd_scroll_VirtualScrollViewportController = $milkywaystd_scroll_VirtualScrollViewportController;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/VirtualScrollViewportController.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_scroll_demo extends $mol_example_large {
        title() {
            return "milkywaystd_scroll - virtual scroll";
        }
        sub() {
            return [
                this.viewPort()
            ];
        }
        tags() {
            return [
                "scroll"
            ];
        }
        itemRendererFactory() {
            return null;
        }
        viewPort() {
            const obj = new this.$.$milkywaystd_scroll_VirtualScrollViewport();
            obj.itemRendererFactory = () => this.itemRendererFactory();
            obj.itemHeight = () => 50;
            obj.minBufferPx = () => 400;
            obj.maxBufferPx = () => 800;
            obj.style = () => ({
                height: "100%"
            });
            obj.pre_sub = () => [];
            obj.post_sub = () => [];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_scroll_demo.prototype, "viewPort", null);
    $.$milkywaystd_scroll_demo = $milkywaystd_scroll_demo;
})($ || ($ = {}));
//milkywaystd/scroll/demo/-view.tree/demo.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_scroll_demo_testitemrenderer extends $mol_row {
        sub() {
            return [
                this.title()
            ];
        }
        minimal_height() {
            return 50;
        }
    }
    $.$milkywaystd_scroll_demo_testitemrenderer = $milkywaystd_scroll_demo_testitemrenderer;
})($ || ($ = {}));
//milkywaystd/scroll/demo/-view.tree/testitemrenderer.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_strategy_FixedSizeVirtualScrollStrategy {
            _scrolledIndexChange = $milkywaystd_classes_stream();
            scrolledIndexChange = this._scrolledIndexChange.unique();
            _viewport = null;
            _itemSize;
            _minBufferPx;
            _maxBufferPx;
            constructor(itemSize, minBufferPx, maxBufferPx) {
                this._itemSize = itemSize;
                this._minBufferPx = minBufferPx;
                this._maxBufferPx = maxBufferPx;
            }
            attach(viewport) {
                this._viewport = viewport;
                this._updateTotalContentSize();
                this._updateRenderedRange();
            }
            detach() {
                this._viewport = null;
            }
            updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx) {
                if (maxBufferPx < minBufferPx) {
                    throw Error('CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx');
                }
                this._itemSize = itemSize;
                this._minBufferPx = minBufferPx;
                this._maxBufferPx = maxBufferPx;
                this._updateTotalContentSize();
                this._updateRenderedRange();
            }
            onContentScrolled() {
                this._updateRenderedRange();
            }
            onDataLengthChanged() {
                this._updateTotalContentSize();
                this._updateRenderedRange();
            }
            onContentRendered() {
            }
            onRenderedOffsetChanged() {
            }
            scrollToIndex(index, behavior) {
                if (this._viewport) {
                    this._viewport.scrollToOffset(index * this._itemSize, behavior);
                }
            }
            _updateTotalContentSize() {
                if (!this._viewport) {
                    return;
                }
                this._viewport.setTotalContentSize(this._viewport.getDataLength() * this._itemSize);
            }
            _updateRenderedRange() {
                if (!this._viewport) {
                    return;
                }
                const renderedRange = this._viewport.getRenderedRange();
                const newRange = { start: renderedRange.start, end: renderedRange.end };
                const viewportSize = this._viewport.getViewportSize();
                const dataLength = this._viewport.getDataLength();
                let scrollOffset = this._viewport.measureScrollOffset();
                let firstVisibleIndex = this._itemSize > 0 ? scrollOffset / this._itemSize : 0;
                if (newRange.end > dataLength) {
                    const maxVisibleItems = Math.ceil(viewportSize / this._itemSize);
                    const newVisibleIndex = Math.max(0, Math.min(firstVisibleIndex, dataLength - maxVisibleItems));
                    if (firstVisibleIndex != newVisibleIndex) {
                        firstVisibleIndex = newVisibleIndex;
                        scrollOffset = newVisibleIndex * this._itemSize;
                        newRange.start = Math.floor(firstVisibleIndex);
                    }
                    newRange.end = Math.max(0, Math.min(dataLength, newRange.start + maxVisibleItems));
                }
                const startBuffer = scrollOffset - newRange.start * this._itemSize;
                if (startBuffer < this._minBufferPx && newRange.start != 0) {
                    const expandStart = Math.ceil((this._maxBufferPx - startBuffer) / this._itemSize);
                    newRange.start = Math.max(0, newRange.start - expandStart);
                    newRange.end = Math.min(dataLength, Math.ceil(firstVisibleIndex + (viewportSize + this._minBufferPx) / this._itemSize));
                }
                else {
                    const endBuffer = newRange.end * this._itemSize - (scrollOffset + viewportSize);
                    if (endBuffer < this._minBufferPx && newRange.end != dataLength) {
                        const expandEnd = Math.ceil((this._maxBufferPx - endBuffer) / this._itemSize);
                        if (expandEnd > 0) {
                            newRange.end = Math.min(dataLength, newRange.end + expandEnd);
                            newRange.start = Math.max(0, Math.floor(firstVisibleIndex - this._minBufferPx / this._itemSize));
                        }
                    }
                }
                this._viewport.setRenderedRange(newRange);
                this._viewport.setRenderedContentOffset(this._itemSize * newRange.start);
                this._scrolledIndexChange(Math.floor(firstVisibleIndex));
            }
        }
        $$.$milkywaystd_scroll_strategy_FixedSizeVirtualScrollStrategy = $milkywaystd_scroll_strategy_FixedSizeVirtualScrollStrategy;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/strategy/FixedSizeVirtualScrollStrategy.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_demo_testitemrenderer extends $.$milkywaystd_scroll_demo_testitemrenderer {
            onData(obj) {
                this.context(obj);
            }
            title() {
                return this.implicit()?.title;
            }
            context(next) {
                if (next !== undefined) {
                    this.implicit(next.implicit);
                    return next;
                }
                return {};
            }
            implicit(next) {
                if (next !== undefined) {
                    return next;
                }
                ;
                return null;
            }
            dom_id() {
                return 'milkywaystd_scroll_testitemrenderer_' + this.title();
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_demo_testitemrenderer.prototype, "title", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_demo_testitemrenderer.prototype, "context", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_demo_testitemrenderer.prototype, "implicit", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_demo_testitemrenderer.prototype, "dom_id", null);
        $$.$milkywaystd_scroll_demo_testitemrenderer = $milkywaystd_scroll_demo_testitemrenderer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/demo/testitemrenderer.view.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_demo extends $.$milkywaystd_scroll_demo {
            ar = [];
            itemRendererFactory() {
                return new $milkywaystd_scroll_demo_testitemrenderer();
            }
            auto() {
                this.ar = [];
                for (let index = 0; index < 500000; index++) {
                    this.ar.push({ title: index });
                }
                this.viewPort().setData(this.ar);
            }
        }
        $$.$milkywaystd_scroll_demo = $milkywaystd_scroll_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/demo/demo.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("milkywaystd/scroll/demo/demo.view.css", "[milkywaystd_scroll_demo_testitemrenderer] {\n\tdisplay: block;\n\twidth: 100%;\n\theight: 50px;\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));
//milkywaystd/scroll/demo/-css/demo.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ui_treemenu extends $mol_list {
        Trigger(id) {
            const obj = new this.$.$mol_check_expand();
            obj.checked = (val) => this.expanded(id, val);
            obj.enabled = () => this.itemexpandable(id);
            obj.label = () => this.label(id);
            return obj;
        }
        Tools(id) {
            return null;
        }
        items() {
            return [];
        }
        Label(id) {
            const obj = new this.$.$mol_view();
            obj.sub = () => this.TriggerOrLink(id);
            return obj;
        }
        Content(id) {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.container(id)
            ];
            return obj;
        }
        subitem(id) {
            const obj = new this.$.$mol_list();
            obj.rows = () => this.rows_list(id);
            return obj;
        }
        subitem_link(id) {
            const obj = new this.$.$mol_link();
            obj.arg = () => this.linkarg(id);
            obj.sub = () => [
                this.Option_title(id)
            ];
            return obj;
        }
        expanded(id, val) {
            if (val !== undefined)
                return val;
            return false;
        }
        itemexpandable(id) {
            return false;
        }
        itemtitle(id) {
            return "";
        }
        filter_title(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        Trigger_title(id) {
            const obj = new this.$.$mol_dimmer();
            obj.haystack = () => this.itemtitle(id);
            obj.needle = () => this.filter_title();
            return obj;
        }
        label(id) {
            return [
                this.Trigger_title(id)
            ];
        }
        TriggerOrLink(id) {
            return [];
        }
        subcontent(id) {
            return [];
        }
        container(id) {
            const obj = new this.$.$mol_view();
            obj.sub = () => this.subcontent(id);
            return obj;
        }
        rows_list(id) {
            return [];
        }
        linkarg(id) {
            return {};
        }
        linktitle(id) {
            return "";
        }
        filter(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        Option_title(id) {
            const obj = new this.$.$mol_dimmer();
            obj.haystack = () => this.linktitle(id);
            obj.needle = () => this.filter();
            return obj;
        }
    }
    __decorate([
        $mol_mem_key
    ], $milkywaystd_ui_treemenu.prototype, "Trigger", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_ui_treemenu.prototype, "Label", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_ui_treemenu.prototype, "Content", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_ui_treemenu.prototype, "subitem", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_ui_treemenu.prototype, "subitem_link", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_ui_treemenu.prototype, "expanded", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ui_treemenu.prototype, "filter_title", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_ui_treemenu.prototype, "Trigger_title", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_ui_treemenu.prototype, "container", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ui_treemenu.prototype, "filter", null);
    __decorate([
        $mol_mem_key
    ], $milkywaystd_ui_treemenu.prototype, "Option_title", null);
    $.$milkywaystd_ui_treemenu = $milkywaystd_ui_treemenu;
})($ || ($ = {}));
//milkywaystd/ui/treemenu/-view.tree/treemenu.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("milkywaystd/ui/treemenu/tree.view.css", "[milkywaystd_ui_treemenu_content] {\n\tpadding-left: 1.5rem;\n}\n[milkywaystd_ui_treemenu_container]{\n\t\n\t\twill-change: contents;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tflex-shrink: 0;\n\t\tmax-width: 100%;\n\t\ttransition: none;\n\t\tmin-height: .5rem;\n\t\n}\n\n");
})($ || ($ = {}));
//milkywaystd/ui/treemenu/-css/tree.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_ui_treemenu extends $.$milkywaystd_ui_treemenu {
            items(val) {
                return val ?? [];
            }
            sub() {
                const subs = [];
                return this.fill(subs, this.items());
            }
            rows_list(id) {
                return [
                    this.Label(id),
                    ...this.expanded(id) ? [this.Content(id)] : []
                ];
            }
            itemtitle(id) {
                return this.cache(id).link ? '' : this.cache(id).label;
            }
            linktitle(id) {
                return this.cache(id).label;
            }
            itemexpandable(id) {
                return this.container(id).sub().length > 0;
            }
            linkarg(id) {
                return this.cache(id).link;
            }
            Tools(id) {
                return this.cache(id).link ? this.subitem_link(id) : null;
            }
            TriggerOrLink(id) {
                return ((this.cache(id).items && this.cache(id).items?.length) || !this.cache(id).link) ? [this.Trigger(id), this.Tools(id)] : [this.subitem_link(id)];
            }
            reset() {
                this.items([]);
                this._idsCache.forEach((id) => {
                    this.cache(id, null);
                    this.expanded(id, false);
                });
                this._idsCache.clear();
            }
            _idsCache = new Set();
            cache(id, value) {
                if (value !== undefined) {
                    if (value !== null) {
                        this._idsCache.add(id);
                    }
                    return value;
                }
                return value ?? {};
            }
            fill(subs, input) {
                let stack = [...input];
                let index = 0;
                while (stack.length) {
                    const element = stack.shift();
                    if (element.id === undefined) {
                        let keyobj = { ...element };
                        delete keyobj.parent;
                        element.id = $mol_key(keyobj);
                    }
                    let level = element.id;
                    this.cache(level, { ...element });
                    const item = this.subitem(level);
                    if (element.parent) {
                        this.subcontent(element.parent.id, [...this.subcontent(element.parent.id), item]);
                    }
                    else {
                        subs.push(item);
                    }
                    if (element.items && element.items.length) {
                        for (let child of element.items) {
                            child.parent = element;
                        }
                        stack.push(...element.items);
                    }
                    ++index;
                }
                return subs;
            }
            subcontent(id, val) {
                return val ?? [];
            }
            expanded(id, val) {
                $mol_wire_solid();
                if (val !== undefined) {
                    if (this.cache(id))
                        this.cache(id).expanded = val;
                    return val;
                }
                return !!(this.cache(id)?.link && this.subitem_link(id)?.current()) || !!$mol_mem_cached(() => this.expanded(id)) || !!this.cache(id)?.expanded;
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_ui_treemenu.prototype, "items", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ui_treemenu.prototype, "sub", null);
        __decorate([
            $mol_mem_key
        ], $milkywaystd_ui_treemenu.prototype, "rows_list", null);
        __decorate([
            $mol_mem_key
        ], $milkywaystd_ui_treemenu.prototype, "itemtitle", null);
        __decorate([
            $mol_mem_key
        ], $milkywaystd_ui_treemenu.prototype, "linktitle", null);
        __decorate([
            $mol_mem_key
        ], $milkywaystd_ui_treemenu.prototype, "itemexpandable", null);
        __decorate([
            $mol_mem_key
        ], $milkywaystd_ui_treemenu.prototype, "linkarg", null);
        __decorate([
            $mol_mem_key
        ], $milkywaystd_ui_treemenu.prototype, "Tools", null);
        __decorate([
            $mol_mem_key
        ], $milkywaystd_ui_treemenu.prototype, "TriggerOrLink", null);
        __decorate([
            $mol_action
        ], $milkywaystd_ui_treemenu.prototype, "reset", null);
        __decorate([
            $mol_mem_key
        ], $milkywaystd_ui_treemenu.prototype, "cache", null);
        __decorate([
            $mol_mem_key
        ], $milkywaystd_ui_treemenu.prototype, "subcontent", null);
        __decorate([
            $mol_mem_key
        ], $milkywaystd_ui_treemenu.prototype, "expanded", null);
        $$.$milkywaystd_ui_treemenu = $milkywaystd_ui_treemenu;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/ui/treemenu/treemenu.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ui_treemenu_demo extends $mol_example_large {
        title() {
            return "Tree menu";
        }
        tree_menu_items() {
            return [
                this.p1(),
                this.p2()
            ];
        }
        sub() {
            return [
                this.menu()
            ];
        }
        tags() {
            return [
                "menu"
            ];
        }
        p1() {
            return {
                label: "label 1",
                link: {
                    a: "0"
                }
            };
        }
        p22() {
            return {
                label: "sub link 2",
                link: {
                    a: "1"
                }
            };
        }
        p2() {
            return {
                label: "label 2",
                items: [
                    this.p22()
                ]
            };
        }
        menu() {
            const obj = new this.$.$milkywaystd_ui_treemenu();
            obj.items = () => this.tree_menu_items();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_ui_treemenu_demo.prototype, "menu", null);
    $.$milkywaystd_ui_treemenu_demo = $milkywaystd_ui_treemenu_demo;
})($ || ($ = {}));
//milkywaystd/ui/treemenu/demo/-view.tree/demo.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_example_small extends $mol_example {
    }
    $.$mol_example_small = $mol_example_small;
})($ || ($ = {}));
//mol/example/small/-view.tree/small.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/example/small/small.view.css", "[mol_example_small] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: flex-start;\n\talign-content: flex-start;\n\tjustify-content: flex-start;\n\tflex: 0 0 auto;\n\tbox-sizing: border-box;\n\tmax-width: 100%;\n\tgap: var(--mol_gap_block);\n}\n\n[mol_example_small] > * {\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));
//mol/example/small/-css/small.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_tag_sieve extends $mol_object2 {
        ids_tags() {
            return {};
        }
        separator() {
            return '/';
        }
        tags() {
            return this.ids_tags_initial().tags;
        }
        ids() {
            return this.ids_tags_initial().ids;
        }
        ids_tags_initial() {
            return this.ids_tags_filtered('');
        }
        ids_tags_filtered(prefix) {
            const ids = new Set();
            const separator = this.separator();
            let ids_tags_initial = prefix ? this.ids_tags_initial().ids_tags : this.ids_tags();
            let tags_raw = [];
            let tags_ids = {};
            let ids_tags = {};
            do {
                tags_ids = {};
                ids_tags = {};
                for (const id of Object.keys(ids_tags_initial)) {
                    const tags = ids_tags_initial[id];
                    const unmatched_tags = [];
                    const prefixed_tags = [];
                    let prefix_matched = prefix === '';
                    for (const tag of tags) {
                        if (tag === prefix) {
                            prefix_matched = true;
                            continue;
                        }
                        let next = tag;
                        if (prefix && tag.startsWith(prefix + separator)) {
                            prefix_matched = true;
                            next = tag.substring(prefix.length + separator.length);
                            prefixed_tags.push(next);
                        }
                        unmatched_tags.push(next);
                    }
                    if (!prefix_matched)
                        continue;
                    ids_tags[id] = unmatched_tags;
                    if (!unmatched_tags?.length) {
                        ids.add(id);
                        continue;
                    }
                    for (const tag of prefixed_tags.length ? prefixed_tags : unmatched_tags) {
                        const sep_pos = tag.indexOf(separator);
                        const first_segment = sep_pos === -1 ? tag : tag.substring(0, sep_pos);
                        if (!first_segment) {
                            ids.add(id);
                            continue;
                        }
                        if (!tags_ids[first_segment])
                            tags_ids[first_segment] = [];
                        tags_ids[first_segment].push(id);
                    }
                }
                tags_raw = Object.keys(tags_ids);
                ids_tags_initial = ids_tags;
                prefix = tags_raw[0];
            } while (tags_raw.length === 1 && !ids.size);
            const tags = [];
            for (const tag of tags_raw) {
                if (tags_ids[tag].length > 1)
                    tags.push(tag);
                else
                    for (const id of tags_ids[tag])
                        ids.add(id);
            }
            return {
                ids_tags,
                tags,
                ids: Array.from(ids),
            };
        }
        prefix() {
            return [];
        }
        prefix_sub(id) {
            return [...this.prefix(), id];
        }
        select(id) {
            const bag = new $mol_tag_sieve;
            bag.ids_tags_initial = () => this.ids_tags_filtered(id);
            bag.prefix = () => this.prefix_sub(id);
            return bag;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_tag_sieve.prototype, "ids_tags_filtered", null);
    __decorate([
        $mol_mem_key
    ], $mol_tag_sieve.prototype, "prefix_sub", null);
    __decorate([
        $mol_mem_key
    ], $mol_tag_sieve.prototype, "select", null);
    $.$mol_tag_sieve = $mol_tag_sieve;
})($ || ($ = {}));
//mol/tag/sieve/sieve.ts
;
"use strict";
var $;
(function ($) {
    class $mol_expander extends $mol_list {
        rows() {
            return [
                this.Label(),
                this.Content()
            ];
        }
        expanded(next) {
            if (next !== undefined)
                return next;
            return false;
        }
        expandable() {
            return true;
        }
        label() {
            return [
                this.title()
            ];
        }
        Trigger() {
            const obj = new this.$.$mol_check_expand();
            obj.checked = (next) => this.expanded(next);
            obj.expandable = () => this.expandable();
            obj.label = () => this.label();
            return obj;
        }
        Tools() {
            return null;
        }
        Label() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.Trigger(),
                this.Tools()
            ];
            return obj;
        }
        content() {
            return [];
        }
        Content() {
            const obj = new this.$.$mol_list();
            obj.rows = () => this.content();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_expander.prototype, "expanded", null);
    __decorate([
        $mol_mem
    ], $mol_expander.prototype, "Trigger", null);
    __decorate([
        $mol_mem
    ], $mol_expander.prototype, "Label", null);
    __decorate([
        $mol_mem
    ], $mol_expander.prototype, "Content", null);
    $.$mol_expander = $mol_expander;
})($ || ($ = {}));
//mol/expander/-view.tree/expander.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_expander extends $.$mol_expander {
            rows() {
                return [
                    this.Label(),
                    ...this.expanded() ? [this.Content()] : []
                ];
            }
            expandable() {
                return this.content().length > 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_expander.prototype, "rows", null);
        $$.$mol_expander = $mol_expander;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/expander/expander.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/expander/expander.view.css", "[mol_expander] {\n\tflex-direction: column;\n}\n\n[mol_expander_label] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_expander_trigger] {\n\tflex: auto;\n\tposition: relative;\n}\n");
})($ || ($ = {}));
//mol/expander/-css/expander.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_tag_tree extends $mol_list {
        sieve() {
            const obj = new this.$.$mol_tag_sieve();
            obj.ids_tags = () => this.ids_tags();
            obj.separator = () => this.separator();
            return obj;
        }
        levels_expanded() {
            return 0;
        }
        sort_items() {
            return null;
        }
        sort_tags() {
            return null;
        }
        sub() {
            return [
                ...this.tag_list(),
                ...this.item_list()
            ];
        }
        tag_name(id) {
            return "";
        }
        tag_names() {
            return {};
        }
        tag_list() {
            return [];
        }
        item_list() {
            return [];
        }
        Item(id) {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.item_title(id)
            ];
            return obj;
        }
        Tag(id) {
            const obj = new this.$.$mol_expander();
            obj.expandable = () => true;
            obj.expanded = (next) => this.tag_expanded(id, next);
            obj.title = () => this.tag_name(id);
            obj.content = () => [
                this.Tag_tree(id)
            ];
            return obj;
        }
        ids_tags() {
            return {};
        }
        separator() {
            return "/";
        }
        item_title(id) {
            return "";
        }
        tag_expanded(id, next) {
            if (next !== undefined)
                return next;
            return false;
        }
        sieve_sub(id) {
            const obj = new this.$.$mol_tag_sieve();
            return obj;
        }
        Tag_tree(id) {
            const obj = new this.$.$mol_tag_tree();
            obj.sieve = () => this.sieve_sub(id);
            obj.Item = (id) => this.Item(id);
            obj.item_title = (id) => this.item_title(id);
            obj.tag_expanded = (id, next) => this.tag_expanded(id, next);
            obj.tag_name = (id) => this.tag_name(id);
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_tag_tree.prototype, "sieve", null);
    __decorate([
        $mol_mem_key
    ], $mol_tag_tree.prototype, "Item", null);
    __decorate([
        $mol_mem_key
    ], $mol_tag_tree.prototype, "Tag", null);
    __decorate([
        $mol_mem_key
    ], $mol_tag_tree.prototype, "tag_expanded", null);
    __decorate([
        $mol_mem_key
    ], $mol_tag_tree.prototype, "sieve_sub", null);
    __decorate([
        $mol_mem_key
    ], $mol_tag_tree.prototype, "Tag_tree", null);
    $.$mol_tag_tree = $mol_tag_tree;
})($ || ($ = {}));
//mol/tag/tree/-view.tree/tree.view.tree.ts
;
"use strict";
var $;
(function ($) {
    function $mol_compare_text(item = (item) => String(item)) {
        return (a, b) => {
            const text_a = item(a).trim().toLowerCase();
            const text_b = item(b).trim().toLowerCase();
            const parts_a = text_a.split(/(\d+)/);
            const parts_b = text_b.split(/(\d+)/);
            const count = Math.max(parts_a.length, parts_b.length);
            for (let i = 0; i < count; ++i) {
                const part_a = parts_a[i] || '';
                const part_b = parts_b[i] || '';
                const diff = Number(part_a) - Number(part_b);
                if (diff)
                    return diff;
                if (part_a > part_b)
                    return 1;
                if (part_a < part_b)
                    return -1;
            }
            return parts_a.length - parts_b.length;
        };
    }
    $.$mol_compare_text = $mol_compare_text;
})($ || ($ = {}));
//mol/compare/text/text.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_tag_tree extends $.$mol_tag_tree {
            sieve_sub(path) {
                return this.sieve().select(path.at(-1));
            }
            item_list() {
                const prefix = this.sieve().prefix();
                return this.sieve().ids().sort(this.sort_items()).map(id => this.Item([...prefix, id]));
            }
            tag_list() {
                const prefix = this.sieve().prefix();
                return this.sieve().tags().sort(this.sort_tags()).map(tag => this.Tag([...prefix, tag]));
            }
            tag_expanded(id, next) {
                return next ?? this.tag_expanded_default(id);
            }
            tag_expanded_default(id) {
                return this.levels_expanded() >= id.length;
            }
            sort_tags() {
                return $mol_compare_text();
            }
            sort_items() {
                return this.sort_tags();
            }
            tag_names() {
                return {};
            }
            tag_name(path) {
                const id = path.at(-1);
                return this.tag_names()[id] ?? id;
            }
            item_title(id) {
                return id.at(-1);
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_tag_tree.prototype, "sieve_sub", null);
        __decorate([
            $mol_mem
        ], $mol_tag_tree.prototype, "item_list", null);
        __decorate([
            $mol_mem
        ], $mol_tag_tree.prototype, "tag_list", null);
        __decorate([
            $mol_mem_key
        ], $mol_tag_tree.prototype, "tag_expanded", null);
        __decorate([
            $mol_mem
        ], $mol_tag_tree.prototype, "sort_tags", null);
        __decorate([
            $mol_mem
        ], $mol_tag_tree.prototype, "sort_items", null);
        $$.$mol_tag_tree = $mol_tag_tree;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/tag/tree/tree.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/tag/tree/tree.view.css", "[mol_tag_tree_tag_content] {\n\tpadding-left: var(--mol_gap_block);\n    margin-left: var(--mol_gap_block);\n    box-shadow: inset 1px 0 0 0 var(--mol_theme_line);\n}\n\n[mol_tag_tree_item] {\n\tpadding: var(--mol_gap_text);\n\tpadding-left: 0;\n}\n\n[mol_tag_tree_tag_trigger_icon] {\n    margin-left: -1rem;\n    margin-right: -0.25rem;\n}\n");
})($ || ($ = {}));
//mol/tag/tree/-css/tree.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_app_demo_menu extends $mol_page {
        names() {
            return [];
        }
        widget_tags(id) {
            return [];
        }
        widget_aspects(id) {
            return [];
        }
        widget_title(id) {
            return "";
        }
        search_start(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        Body() {
            const obj = new this.$.$mol_scroll();
            obj.sub = () => [
                this.List()
            ];
            return obj;
        }
        Option(id) {
            const obj = new this.$.$mol_link();
            obj.arg = () => this.option_arg(id);
            obj.sub = () => [
                this.Option_title(id)
            ];
            return obj;
        }
        filter(next) {
            if (next !== undefined)
                return next;
            return "";
        }
        Filter() {
            const obj = new this.$.$mol_search();
            obj.query = (next) => this.filter(next);
            return obj;
        }
        ids_tags() {
            return {};
        }
        levels_expanded_default() {
            return 0;
        }
        levels_expanded() {
            return this.levels_expanded_default();
        }
        Tree() {
            const obj = new this.$.$mol_tag_tree();
            obj.Item = (id) => this.Option(id);
            obj.ids_tags = () => this.ids_tags();
            obj.levels_expanded = () => this.levels_expanded();
            return obj;
        }
        List() {
            const obj = new this.$.$mol_list();
            obj.rows = () => [
                this.Filter(),
                this.Tree()
            ];
            return obj;
        }
        option_arg(id) {
            return {};
        }
        option_title(id) {
            return "";
        }
        Option_title(id) {
            const obj = new this.$.$mol_dimmer();
            obj.haystack = () => this.option_title(id);
            obj.needle = () => this.filter();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_app_demo_menu.prototype, "search_start", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_menu.prototype, "Body", null);
    __decorate([
        $mol_mem_key
    ], $mol_app_demo_menu.prototype, "Option", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_menu.prototype, "filter", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_menu.prototype, "Filter", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_menu.prototype, "Tree", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_menu.prototype, "List", null);
    __decorate([
        $mol_mem_key
    ], $mol_app_demo_menu.prototype, "Option_title", null);
    $.$mol_app_demo_menu = $mol_app_demo_menu;
})($ || ($ = {}));
//mol/app/demo/menu/-view.tree/menu.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const compare_names = (a, b) => {
            if (a[0] === '$' && b[0] !== '$')
                return 1;
            if (a[0] !== '$' && b[0] === '$')
                return -1;
            if (a > b)
                return 1;
            if (a < b)
                return -1;
            return 0;
        };
        class $mol_app_demo_menu extends $.$mol_app_demo_menu {
            filter(next) {
                return this.$.$mol_state_session.value('filter', next === '' ? null : next) ?? super.filter();
            }
            option_arg(id) {
                return { 'demo': id.at(-1)?.replace(/^\$*/, '') };
            }
            option_title(path_id) {
                const id = path_id.at(-1);
                return id.replace('_demo_', '/').replace('_demo', '');
            }
            search_start(event) {
                this.Filter().Query().bring();
                event?.preventDefault();
            }
            filter_last_word_completed() {
                return /[^\s]+\s+$/.test(this.filter());
            }
            filter_words() {
                const filter = this.filter().trim();
                const words = filter !== '' ? filter.split(/\s+/) : [];
                return [...new Set(words)].map(word => word.toLowerCase());
            }
            ids_tags() {
                const result = {};
                for (const name of this.names_filtered()) {
                    let aspects = this.widget_aspects(name);
                    result[name] = result[name] ?? [];
                    for (const tag of aspects) {
                        result[name].push(tag);
                    }
                }
                return result;
            }
            tags_filtered() {
                return [...new Set(this.names_filtered().flatMap(name => this.widget_tags(name)))]
                    .map(tag => tag.trim().toLowerCase())
                    .filter(tag => tag !== '')
                    .sort(compare_names);
            }
            filter_suggests() {
                const filter_words = this.filter_words();
                if (filter_words.length === 0)
                    return this.tags_filtered();
                const filtered_names = this.names_filtered();
                if (filtered_names.length <= 1)
                    return [];
                const tags = this.tags_filtered();
                const filter_last_word = filter_words.slice(-1)[0];
                const filter_last_word_completed = this.filter_last_word_completed();
                const suggests = [];
                for (const tag of tags) {
                    if (filter_words.includes(tag))
                        continue;
                    if (filter_last_word_completed) {
                        suggests.push(`${filter_words.join(' ')} ${tag}`);
                    }
                    else if (tag.indexOf(filter_last_word) === 0 &&
                        (filter_last_word.length < tag.length)) {
                        suggests.push(`${filter_words.slice(0, -1).join(' ')} ${tag}`);
                    }
                }
                return suggests;
            }
            levels_expanded() {
                if (this.filter_words().length)
                    return 99;
                return super.levels_expanded();
            }
            names_filtered() {
                const words = this.filter_words();
                let names = this.names();
                if (words.length !== 0) {
                    names = names.filter(name => {
                        const title = this.widget_title(name);
                        const component_keywords = [
                            ...(title ? [title.toLowerCase()] : []),
                            ...this.widget_tags(name)
                        ];
                        return words.every(word => component_keywords.some(kw => kw.includes(word)));
                    });
                }
                return names;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "filter", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "filter_last_word_completed", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "filter_words", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "ids_tags", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "tags_filtered", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "filter_suggests", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "names_filtered", null);
        $$.$mol_app_demo_menu = $mol_app_demo_menu;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/app/demo/menu/menu.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/app/demo/menu/menu.view.css", "[mol_app_demo_menu] {\n\tflex: 0 0 18rem;\n}\n\n[mol_app_demo_menu_selector] {\n\tdisplay: flex;\n\tflex-wrap: nowrap;\n\tgap: 0;\n}\n\n[mol_app_demo_menu_tools] {\n\tpadding: 0;\n}\n\n[mol_app_demo_menu_themes] {\n\tflex: none;\n}\n\n[mol_app_demo_menu_filter] {\n\talign-self: stretch;\n\tflex-grow: 1;\n\tflex-shrink: 1;\n}\n");
})($ || ($ = {}));
//mol/app/demo/menu/-css/menu.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_information extends $mol_icon {
        path() {
            return "M13,9H11V7H13M13,17H11V11H13M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z";
        }
    }
    $.$mol_icon_information = $mol_icon_information;
})($ || ($ = {}));
//mol/icon/information/-view.tree/information.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_information_outline extends $mol_icon {
        path() {
            return "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M11,17H13V11H11V17Z";
        }
    }
    $.$mol_icon_information_outline = $mol_icon_information_outline;
})($ || ($ = {}));
//mol/icon/information/outline/-view.tree/outline.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_check_icon extends $mol_check {
    }
    $.$mol_check_icon = $mol_check_icon;
})($ || ($ = {}));
//mol/check/icon/-view.tree/icon.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/icon/icon.view.css", "[mol_check_icon]:where([mol_check_checked]) {\n\tcolor: var(--mol_theme_current);\n}\n");
})($ || ($ = {}));
//mol/check/icon/-css/icon.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_forum extends $mol_icon {
        path() {
            return "M17,12V3C17,2.45 16.55,2 16,2H3C2.45,2 2,2.45 2,3V17L6,13H16C16.55,13 17,12.55 17,12M21,6H19V15H6V17C6,17.55 6.45,18 7,18H18L22,22V7C22,6.45 21.55,6 21,6Z";
        }
    }
    $.$mol_icon_forum = $mol_icon_forum;
})($ || ($ = {}));
//mol/icon/forum/-view.tree/forum.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_forum_outline extends $mol_icon {
        path() {
            return "M15,4V11H5.17L4,12.17V4H15M16,2H3C2.45,2 2,2.45 2,3V17L6,13H16C16.55,13 17,12.55 17,12V3C17,2.45 16.55,2 16,2M21,6H19V15H6V17C6,17.55 6.45,18 7,18H18L22,22V7C22,6.45 21.55,6 21,6Z";
        }
    }
    $.$mol_icon_forum_outline = $mol_icon_forum_outline;
})($ || ($ = {}));
//mol/icon/forum/outline/-view.tree/outline.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_open_in_new extends $mol_icon {
        path() {
            return "M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V12H19V19Z";
        }
    }
    $.$mol_icon_open_in_new = $mol_icon_open_in_new;
})($ || ($ = {}));
//mol/icon/open/in/new/-view.tree/new.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_chat extends $mol_link {
        seed() {
            return "";
        }
        opened() {
            return false;
        }
        arg() {
            return {
                mol_chat: ""
            };
        }
        hint() {
            return this.title();
        }
        sub() {
            return [
                this.Icon()
            ];
        }
        pages() {
            return [
                this.Page()
            ];
        }
        Icon() {
            const obj = new this.$.$mol_icon_forum_outline();
            return obj;
        }
        title() {
            return this.$.$mol_locale.text('$mol_chat_title');
        }
        standalone() {
            return "";
        }
        Standalone_icon() {
            const obj = new this.$.$mol_icon_open_in_new();
            return obj;
        }
        Esternal() {
            const obj = new this.$.$mol_link();
            obj.uri = () => this.standalone();
            obj.sub = () => [
                this.Standalone_icon()
            ];
            return obj;
        }
        Close_icon() {
            const obj = new this.$.$mol_icon_cross();
            return obj;
        }
        Close() {
            const obj = new this.$.$mol_link();
            obj.arg = () => ({
                mol_chat: null
            });
            obj.sub = () => [
                this.Close_icon()
            ];
            return obj;
        }
        embed() {
            return "";
        }
        Embed() {
            const obj = new this.$.$mol_frame();
            obj.uri = () => this.embed();
            return obj;
        }
        Page() {
            const obj = new this.$.$mol_page();
            obj.title = () => this.title();
            obj.tools = () => [
                this.Esternal(),
                this.Close()
            ];
            obj.Body = () => this.Embed();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Icon", null);
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Standalone_icon", null);
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Esternal", null);
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Close_icon", null);
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Close", null);
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Embed", null);
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Page", null);
    $.$mol_chat = $mol_chat;
})($ || ($ = {}));
//mol/chat/-view.tree/chat.view.tree.ts
;
"use strict";
var $;
(function ($) {
    function parse(theme) {
        if (theme === 'true')
            return true;
        if (theme === 'false')
            return false;
        return null;
    }
    function $mol_lights(next) {
        const arg = parse(this.$mol_state_arg.value('mol_lights'));
        const base = false;
        if (next === undefined) {
            return arg ?? this.$mol_state_local.value('$mol_lights') ?? base;
        }
        else {
            if (arg === null) {
                this.$mol_state_local.value('$mol_lights', next === base ? null : next);
            }
            else {
                this.$mol_state_arg.value('mol_lights', String(next));
            }
            return next;
        }
    }
    $.$mol_lights = $mol_lights;
})($ || ($ = {}));
//mol/lights/lights.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_chat extends $.$mol_chat {
            opened() {
                return this.$.$mol_state_arg.value('mol_chat') !== null;
            }
            pages() {
                return this.opened() ? [this.Page()] : [];
            }
            standalone() {
                const seed = this.seed();
                const origin = new URL(this.$.$mol_state_arg.href()).origin;
                return `https://talks.hyoo.ru/#!chat=${seed}`;
            }
            embed() {
                const seed = this.seed();
                const lights = String(this.$.$mol_lights());
                const embed = this.$.$mol_state_arg.href();
                return `https://talks.hyoo.ru/#!chat=${encodeURIComponent(seed)}/mol_lights=${lights}`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_chat.prototype, "standalone", null);
        __decorate([
            $mol_mem
        ], $mol_chat.prototype, "embed", null);
        $$.$mol_chat = $mol_chat;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/chat/chat.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/chat/chat.view.css", "[mol_chat_page] {\n\tflex: 1 0 30rem;\n}\n");
})($ || ($ = {}));
//mol/chat/-css/chat.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_settings extends $mol_icon {
        path() {
            return "M12,15.5C10.07,15.5 8.5,13.93 8.5,12C8.5,10.07 10.07,8.5 12,8.5C13.93,8.5 15.5,10.07 15.5,12C15.5,13.93 13.93,15.5 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
        }
    }
    $.$mol_icon_settings = $mol_icon_settings;
})($ || ($ = {}));
//mol/icon/settings/-view.tree/settings.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_app_demo_detail extends $mol_page {
        description() {
            return "";
        }
        tools() {
            return [
                this.Readme(),
                this.Chat(),
                this.Edit(),
                this.Close()
            ];
        }
        body() {
            return [
                this.Demo()
            ];
        }
        readme(next) {
            if (next !== undefined)
                return next;
            return false;
        }
        readme_icon() {
            const obj = new this.$.$mol_icon_information_outline();
            return obj;
        }
        Readme() {
            const obj = new this.$.$mol_check_icon();
            obj.checked = (next) => this.readme(next);
            obj.hint = () => this.$.$mol_locale.text('$mol_app_demo_detail_Readme_hint');
            obj.Icon = () => this.readme_icon();
            return obj;
        }
        chat_seed() {
            return "0_0";
        }
        chat_pages() {
            return this.Chat().pages();
        }
        Chat() {
            const obj = new this.$.$mol_chat();
            obj.seed = () => this.chat_seed();
            return obj;
        }
        edit_hint() {
            return this.$.$mol_locale.text('$mol_app_demo_detail_edit_hint');
        }
        Edit_speck() {
            const obj = new this.$.$mol_speck();
            obj.value = () => "β";
            return obj;
        }
        Edit_icon() {
            const obj = new this.$.$mol_icon_settings();
            return obj;
        }
        edit_uri() {
            return "";
        }
        Edit() {
            const obj = new this.$.$mol_link();
            obj.hint = () => this.edit_hint();
            obj.sub = () => [
                this.Edit_speck(),
                this.Edit_icon()
            ];
            obj.uri = () => this.edit_uri();
            return obj;
        }
        close_hint() {
            return this.$.$mol_locale.text('$mol_app_demo_detail_close_hint');
        }
        Close_icon() {
            const obj = new this.$.$mol_icon_cross();
            return obj;
        }
        close_arg() {
            return {
                demo: null
            };
        }
        Close() {
            const obj = new this.$.$mol_link();
            obj.hint = () => this.close_hint();
            obj.sub = () => [
                this.Close_icon()
            ];
            obj.arg = () => this.close_arg();
            return obj;
        }
        Demo() {
            const obj = new this.$.$mol_view();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_app_demo_detail.prototype, "readme", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_detail.prototype, "readme_icon", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_detail.prototype, "Readme", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_detail.prototype, "Chat", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_detail.prototype, "Edit_speck", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_detail.prototype, "Edit_icon", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_detail.prototype, "Edit", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_detail.prototype, "Close_icon", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_detail.prototype, "Close", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_detail.prototype, "Demo", null);
    $.$mol_app_demo_detail = $mol_app_demo_detail;
})($ || ($ = {}));
//mol/app/demo/detail/-view.tree/detail.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_github_circle extends $mol_icon {
        path() {
            return "M12,2C6.48,2 2,6.48 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12C22,6.48 17.52,2 12,2Z";
        }
    }
    $.$mol_icon_github_circle = $mol_icon_github_circle;
})($ || ($ = {}));
//mol/icon/github/circle/-view.tree/circle.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_link_source extends $mol_link {
        hint() {
            return this.$.$mol_locale.text('$mol_link_source_hint');
        }
        sub() {
            return [
                this.Icon()
            ];
        }
        Icon() {
            const obj = new this.$.$mol_icon_github_circle();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_link_source.prototype, "Icon", null);
    $.$mol_link_source = $mol_link_source;
})($ || ($ = {}));
//mol/link/source/-view.tree/source.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_app_demo_readme extends $mol_page {
        readme_link_template() {
            return "https://raw.githubusercontent.com/{repo}/HEAD/{module}/readme.md";
        }
        source_link_template() {
            return "https://github.com/{repo}/tree/HEAD/{module}";
        }
        repo() {
            return "";
        }
        module() {
            return [];
        }
        title() {
            return this.$.$mol_locale.text('$mol_app_demo_readme_title');
        }
        opened(next) {
            if (next !== undefined)
                return next;
            return false;
        }
        tools() {
            return [
                this.Source_link(),
                this.Close()
            ];
        }
        Readme() {
            const obj = new this.$.$mol_text();
            obj.text = () => this.readme();
            obj.uri_base = () => this.uri_base();
            return obj;
        }
        Not_found() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.Not_found_caption()
            ];
            return obj;
        }
        source_link() {
            return "";
        }
        source_hint() {
            return this.$.$mol_locale.text('$mol_app_demo_readme_source_hint');
        }
        Source_link() {
            const obj = new this.$.$mol_link_source();
            obj.uri = () => this.source_link();
            obj.hint = () => this.source_hint();
            return obj;
        }
        Close_icon() {
            const obj = new this.$.$mol_icon_cross();
            return obj;
        }
        close(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        Close() {
            const obj = new this.$.$mol_button_minor();
            obj.hint = () => this.$.$mol_locale.text('$mol_app_demo_readme_Close_hint');
            obj.sub = () => [
                this.Close_icon()
            ];
            obj.click = (next) => this.close(next);
            return obj;
        }
        readme() {
            return "";
        }
        uri_base(next) {
            if (next !== undefined)
                return next;
            return "";
        }
        Not_found_caption() {
            return this.$.$mol_locale.text('$mol_app_demo_readme_Not_found_caption');
        }
    }
    __decorate([
        $mol_mem
    ], $mol_app_demo_readme.prototype, "opened", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_readme.prototype, "Readme", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_readme.prototype, "Not_found", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_readme.prototype, "Source_link", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_readme.prototype, "Close_icon", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_readme.prototype, "close", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_readme.prototype, "Close", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_readme.prototype, "uri_base", null);
    $.$mol_app_demo_readme = $mol_app_demo_readme;
})($ || ($ = {}));
//mol/app/demo/readme/-view.tree/readme.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_app_demo_readme_not_found_error extends Error {
            module;
            constructor(module) {
                super('Readme not found');
                this.module = module;
            }
        }
        $$.$mol_app_demo_readme_not_found_error = $mol_app_demo_readme_not_found_error;
        class $mol_app_demo_readme extends $.$mol_app_demo_readme {
            close() {
                this.opened(false);
            }
            link(template, repo, module) {
                return template.replace('{repo}', repo).replace('{module}', module.join('/'));
            }
            uri_base(next = '') {
                $mol_wire_solid();
                return next;
            }
            source_link() {
                return this.link(this.source_link_template(), this.repo(), this.module());
            }
            readme() {
                let module = this.module();
                while (module.length) {
                    try {
                        const link = this.link(this.readme_link_template(), this.repo(), module);
                        const text = this.$.$mol_fetch.text(link);
                        this.uri_base(this.link(this.source_link_template(), this.repo(), module));
                        return text;
                    }
                    catch (error) {
                        if (error instanceof Promise)
                            $mol_fail_hidden(error);
                        module = module.slice(0, -1);
                    }
                }
                throw new $mol_app_demo_readme_not_found_error(module);
            }
            body() {
                try {
                    this.readme();
                    return [this.Readme()];
                }
                catch (err) {
                    if (err instanceof Promise)
                        $mol_fail_hidden(err);
                    return [this.Not_found()];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_app_demo_readme.prototype, "uri_base", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_readme.prototype, "source_link", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_readme.prototype, "readme", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_readme.prototype, "body", null);
        $$.$mol_app_demo_readme = $mol_app_demo_readme;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/app/demo/readme/readme.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_theme_auto extends $mol_plugin {
        attr() {
            return {
                mol_theme: this.theme()
            };
        }
        theme() {
            return "";
        }
    }
    $.$mol_theme_auto = $mol_theme_auto;
})($ || ($ = {}));
//mol/theme/auto/-view.tree/auto.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_theme_auto extends $.$mol_theme_auto {
            theme() {
                return this.$.$mol_lights() ? '$mol_theme_light' : '$mol_theme_dark';
            }
        }
        $$.$mol_theme_auto = $mol_theme_auto;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/theme/auto/auto.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_brightness_6 extends $mol_icon {
        path() {
            return "M12,18V6C15.31,6 18,8.69 18,12C18,15.31 15.31,18 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z";
        }
    }
    $.$mol_icon_brightness_6 = $mol_icon_brightness_6;
})($ || ($ = {}));
//mol/icon/brightness/6/-view.tree/6.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_lights_toggle extends $mol_check_icon {
        Icon() {
            return this.Lights_icon();
        }
        hint() {
            return this.$.$mol_locale.text('$mol_lights_toggle_hint');
        }
        checked(next) {
            return this.lights(next);
        }
        Lights_icon() {
            const obj = new this.$.$mol_icon_brightness_6();
            return obj;
        }
        lights(next) {
            if (next !== undefined)
                return next;
            return false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_lights_toggle.prototype, "Lights_icon", null);
    __decorate([
        $mol_mem
    ], $mol_lights_toggle.prototype, "lights", null);
    $.$mol_lights_toggle = $mol_lights_toggle;
})($ || ($ = {}));
//mol/lights/toggle/-view.tree/toggle.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_lights_toggle extends $.$mol_lights_toggle {
            lights(next) {
                return this.$.$mol_lights(next);
            }
        }
        $$.$mol_lights_toggle = $mol_lights_toggle;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/lights/toggle/toggle.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_app_demo extends $mol_book2 {
        editor_title() {
            return this.detail_title();
        }
        meta_bundle_base() {
            return "";
        }
        repo_dict() {
            return {};
        }
        plugins() {
            return [
                this.Theme(),
                this.Search_start()
            ];
        }
        demo_block_list() {
            return [
                "$mol_example_small",
                "$mol_example_large"
            ];
        }
        search_start(next) {
            return this.Menu().search_start(next);
        }
        Menu() {
            const obj = new this.$.$mol_app_demo_menu();
            obj.title = () => this.menu_title();
            obj.names = () => this.names();
            obj.widget_tags = (id) => this.widget_tags(id);
            obj.widget_aspects = (id) => this.widget_aspects(id);
            obj.widget_title = (id) => this.widget_title(id);
            obj.tools = () => this.tools();
            return obj;
        }
        chat_pages(id) {
            return this.Detail(id).chat_pages();
        }
        Detail(id) {
            const obj = new this.$.$mol_app_demo_detail();
            obj.chat_seed = () => this.chat_seed(id);
            obj.title = () => this.detail_title();
            obj.description = () => this.detail_description();
            obj.edit_uri = () => this.edit_uri();
            obj.readme = (next) => this.readme_page(next);
            obj.Demo = () => this.Demo();
            return obj;
        }
        Readme_page() {
            const obj = new this.$.$mol_app_demo_readme();
            obj.repo = () => this.repo();
            obj.opened = (next) => this.readme_page(next);
            obj.module = () => this.module();
            return obj;
        }
        Detail_empty_message() {
            const obj = new this.$.$mol_status();
            obj.sub = () => [
                this.detail_empty_prefix(),
                this.selected(),
                this.detail_empty_postfix()
            ];
            return obj;
        }
        detail_title() {
            return "$mol";
        }
        Theme() {
            const obj = new this.$.$mol_theme_auto();
            return obj;
        }
        Search_start() {
            const obj = new this.$.$mol_hotkey();
            obj.key = () => ({
                F: (next) => this.search_start(next)
            });
            obj.mod_ctrl = () => true;
            return obj;
        }
        menu_title() {
            return this.$.$mol_locale.text('$mol_app_demo_menu_title');
        }
        names() {
            return [];
        }
        widget_tags(id) {
            return [];
        }
        widget_aspects(id) {
            return [];
        }
        widget_title(id) {
            return "";
        }
        sources_uri() {
            return "https://github.com/hyoo-ru/mam_mol/";
        }
        Sources() {
            const obj = new this.$.$mol_link_source();
            obj.uri = () => this.sources_uri();
            return obj;
        }
        Lights() {
            const obj = new this.$.$mol_lights_toggle();
            return obj;
        }
        tools() {
            return [
                this.Sources(),
                this.Lights()
            ];
        }
        chat_seed(id) {
            return "p9zx0v_nsmx1d";
        }
        detail_description() {
            return "";
        }
        edit_uri() {
            return "";
        }
        readme_page(next) {
            if (next !== undefined)
                return next;
            return false;
        }
        Demo() {
            const obj = new this.$.$mol_view();
            return obj;
        }
        repo() {
            return "";
        }
        module() {
            return [];
        }
        detail_empty_prefix() {
            return this.$.$mol_locale.text('$mol_app_demo_detail_empty_prefix');
        }
        selected() {
            return "";
        }
        detail_empty_postfix() {
            return this.$.$mol_locale.text('$mol_app_demo_detail_empty_postfix');
        }
    }
    __decorate([
        $mol_mem
    ], $mol_app_demo.prototype, "Menu", null);
    __decorate([
        $mol_mem_key
    ], $mol_app_demo.prototype, "Detail", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo.prototype, "Readme_page", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo.prototype, "Detail_empty_message", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo.prototype, "Theme", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo.prototype, "Search_start", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo.prototype, "Sources", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo.prototype, "Lights", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo.prototype, "readme_page", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo.prototype, "Demo", null);
    $.$mol_app_demo = $mol_app_demo;
})($ || ($ = {}));
//mol/app/demo/-view.tree/demo.view.tree.ts
;
"use strict";
var $;
(function ($) {
    function $mol_func_is_class(func) {
        return Object.getOwnPropertyDescriptor(func, 'prototype')?.writable === false;
    }
    $.$mol_func_is_class = $mol_func_is_class;
})($ || ($ = {}));
//mol/func/is/class/class.ts
;
"use strict";
var $;
(function ($) {
    class $mol_span extends $mol_object2 {
        uri;
        source;
        row;
        col;
        length;
        constructor(uri, source, row, col, length) {
            super();
            this.uri = uri;
            this.source = source;
            this.row = row;
            this.col = col;
            this.length = length;
            this[Symbol.toStringTag] = `${this.uri}#${this.row}:${this.col}/${this.length}`;
        }
        static unknown = $mol_span.begin('?');
        static begin(uri, source = '') {
            return new $mol_span(uri, source, 1, 1, 0);
        }
        static end(uri, source) {
            return new $mol_span(uri, source, 1, source.length + 1, length);
        }
        static entire(uri, source) {
            return new $mol_span(uri, source, 1, 1, source.length);
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return {
                uri: this.uri,
                row: this.row,
                col: this.col,
                length: this.length
            };
        }
        error(message, Class = Error) {
            return new Class(`${message}${this}`);
        }
        span(row, col, length) {
            return new $mol_span(this.uri, this.source, row, col, length);
        }
        after(length = 0) {
            return new $mol_span(this.uri, this.source, this.row, this.col + this.length, length);
        }
        slice(begin, end = -1) {
            let len = this.length;
            if (begin < 0)
                begin += len;
            if (end < 0)
                end += len;
            if (begin < 0 || begin > len)
                this.$.$mol_fail(`Begin value '${begin}' out of range ${this}`);
            if (end < 0 || end > len)
                this.$.$mol_fail(`End value '${end}' out of range ${this}`);
            if (end < begin)
                this.$.$mol_fail(`End value '${end}' can't be less than begin value ${this}`);
            return this.span(this.row, this.col + begin, end - begin);
        }
    }
    $.$mol_span = $mol_span;
})($ || ($ = {}));
//mol/span/span.ts
;
"use strict";
var $;
(function ($) {
    class $mol_error_syntax extends SyntaxError {
        reason;
        line;
        span;
        constructor(reason, line, span) {
            super(`${reason}\n${span}\n${line.substring(0, span.col - 1).replace(/\S/g, ' ')}${''.padEnd(span.length, '!')}\n${line}`);
            this.reason = reason;
            this.line = line;
            this.span = span;
        }
    }
    $.$mol_error_syntax = $mol_error_syntax;
})($ || ($ = {}));
//mol/error/syntax/syntax.ts
;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_string(str, uri = '?') {
        const span = $mol_span.entire(uri, str);
        var root = $mol_tree2.list([], span);
        var stack = [root];
        var pos = 0, row = 0, min_indent = 0;
        while (str.length > pos) {
            var indent = 0;
            var line_start = pos;
            row++;
            while (str.length > pos && str[pos] == '\t') {
                indent++;
                pos++;
            }
            if (!root.kids.length) {
                min_indent = indent;
            }
            indent -= min_indent;
            if (indent < 0 || indent >= stack.length) {
                const sp = span.span(row, 1, pos - line_start);
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                if (indent < 0) {
                    if (str.length > pos) {
                        this.$mol_fail(new this.$mol_error_syntax(`Too few tabs`, str.substring(line_start, pos), sp));
                    }
                }
                else {
                    this.$mol_fail(new this.$mol_error_syntax(`Too many tabs`, str.substring(line_start, pos), sp));
                }
            }
            stack.length = indent + 1;
            var parent = stack[indent];
            while (str.length > pos && str[pos] != '\\' && str[pos] != '\n') {
                var error_start = pos;
                while (str.length > pos && (str[pos] == ' ' || str[pos] == '\t')) {
                    pos++;
                }
                if (pos > error_start) {
                    let line_end = str.indexOf('\n', pos);
                    if (line_end === -1)
                        line_end = str.length;
                    const sp = span.span(row, error_start - line_start + 1, pos - error_start);
                    this.$mol_fail(new this.$mol_error_syntax(`Wrong nodes separator`, str.substring(line_start, line_end), sp));
                }
                var type_start = pos;
                while (str.length > pos &&
                    str[pos] != '\\' &&
                    str[pos] != ' ' &&
                    str[pos] != '\t' &&
                    str[pos] != '\n') {
                    pos++;
                }
                if (pos > type_start) {
                    let next = new $mol_tree2(str.slice(type_start, pos), '', [], span.span(row, type_start - line_start + 1, pos - type_start));
                    const parent_kids = parent.kids;
                    parent_kids.push(next);
                    parent = next;
                }
                if (str.length > pos && str[pos] == ' ') {
                    pos++;
                }
            }
            if (str.length > pos && str[pos] == '\\') {
                var data_start = pos;
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                let next = new $mol_tree2('', str.slice(data_start + 1, pos), [], span.span(row, data_start - line_start + 2, pos - data_start - 1));
                const parent_kids = parent.kids;
                parent_kids.push(next);
                parent = next;
            }
            if (str.length === pos && stack.length > 0) {
                const sp = span.span(row, pos - line_start + 1, 1);
                this.$mol_fail(new this.$mol_error_syntax(`Unexpected EOF, LF required`, str.substring(line_start, str.length), sp));
            }
            stack.push(parent);
            pos++;
        }
        return root;
    }
    $.$mol_tree2_from_string = $mol_tree2_from_string;
})($ || ($ = {}));
//mol/tree2/from/string/string.ts
;
"use strict";
var $;
(function ($) {
    class $mol_app_demo_main extends $mol_page {
        minimal_width() {
            return 400;
        }
        title() {
            return "$mol libs for web ui";
        }
        tools() {
            return [
                this.Lights(),
                this.Project()
            ];
        }
        body() {
            return [
                this.Description()
            ];
        }
        Lights() {
            const obj = new this.$.$mol_lights_toggle();
            return obj;
        }
        project_uri() {
            return "https://github.com/eigenmethod/mol/tree/master/";
        }
        Project() {
            const obj = new this.$.$mol_link_source();
            obj.uri = () => this.project_uri();
            return obj;
        }
        description() {
            return "";
        }
        Description() {
            const obj = new this.$.$mol_text();
            obj.text = () => this.description();
            obj.uri_base = () => this.project_uri();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_app_demo_main.prototype, "Lights", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_main.prototype, "Project", null);
    __decorate([
        $mol_mem
    ], $mol_app_demo_main.prototype, "Description", null);
    $.$mol_app_demo_main = $mol_app_demo_main;
})($ || ($ = {}));
//mol/app/demo/main/-view.tree/main.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_app_demo_main extends $.$mol_app_demo_main {
            description() {
                return $mol_file.relative('mol/readme.md').text();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_app_demo_main.prototype, "description", null);
        $$.$mol_app_demo_main = $mol_app_demo_main;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/app/demo/main/main.view.ts
;
"use strict";
var $;
(function ($) {
    function $mol_tree2_to_string(tree) {
        let output = [];
        function dump(tree, prefix = '') {
            if (tree.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output.push(tree.type);
                if (tree.kids.length == 1) {
                    output.push(' ');
                    dump(tree.kids[0], prefix);
                    return;
                }
                output.push("\n");
            }
            else if (tree.value.length || prefix.length) {
                output.push("\\" + tree.value + "\n");
            }
            for (const kid of tree.kids) {
                output.push(prefix);
                dump(kid, prefix + "\t");
            }
        }
        dump(tree);
        return output.join('');
    }
    $.$mol_tree2_to_string = $mol_tree2_to_string;
})($ || ($ = {}));
//mol/tree2/to/string/string.ts
;
"use strict";
var $;
(function ($) {
    class $mol_tree2 extends Object {
        type;
        value;
        kids;
        span;
        constructor(type, value, kids, span) {
            super();
            this.type = type;
            this.value = value;
            this.kids = kids;
            this.span = span;
            this[Symbol.toStringTag] = type || '\\' + value;
        }
        static list(kids, span = $mol_span.unknown) {
            return new $mol_tree2('', '', kids, span);
        }
        list(kids) {
            return $mol_tree2.list(kids, this.span);
        }
        static data(value, kids = [], span = $mol_span.unknown) {
            const chunks = value.split('\n');
            if (chunks.length > 1) {
                let kid_span = span.span(span.row, span.col, 0);
                const data = chunks.map(chunk => {
                    kid_span = kid_span.after(chunk.length);
                    return new $mol_tree2('', chunk, [], kid_span);
                });
                kids = [...data, ...kids];
                value = '';
            }
            return new $mol_tree2('', value, kids, span);
        }
        data(value, kids = []) {
            return $mol_tree2.data(value, kids, this.span);
        }
        static struct(type, kids = [], span = $mol_span.unknown) {
            if (/[ \n\t\\]/.test(type)) {
                $$.$mol_fail(span.error(`Wrong type ${JSON.stringify(type)}`));
            }
            return new $mol_tree2(type, '', kids, span);
        }
        struct(type, kids = []) {
            return $mol_tree2.struct(type, kids, this.span);
        }
        clone(kids, span = this.span) {
            return new $mol_tree2(this.type, this.value, kids, span);
        }
        text() {
            var values = [];
            for (var kid of this.kids) {
                if (kid.type)
                    continue;
                values.push(kid.value);
            }
            return this.value + values.join('\n');
        }
        static fromString(str, uri = 'unknown') {
            return $$.$mol_tree2_from_string(str, uri);
        }
        toString() {
            return $$.$mol_tree2_to_string(this);
        }
        insert(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.kids.map((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.insert(value, ...path.slice(1));
                }).filter(Boolean);
                if (!replaced && value) {
                    sub.push(this.struct(type, []).insert(value, ...path.slice(1)));
                }
                return this.clone(sub);
            }
            else if (typeof type === 'number') {
                const sub = this.kids.slice();
                sub[type] = (sub[type] || this.list([]))
                    .insert(value, ...path.slice(1));
                return this.clone(sub.filter(Boolean));
            }
            else {
                const kids = ((this.kids.length === 0) ? [this.list([])] : this.kids)
                    .map(item => item.insert(value, ...path.slice(1)))
                    .filter(Boolean);
                return this.clone(kids);
            }
        }
        select(...path) {
            let next = [this];
            for (const type of path) {
                if (!next.length)
                    break;
                const prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.kids) {
                                if (child.type == type) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.kids.length)
                                next.push(item.kids[type]);
                            break;
                        default: next.push(...item.kids);
                    }
                }
            }
            return this.list(next);
        }
        filter(path, value) {
            const sub = this.kids.filter(item => {
                var found = item.select(...path);
                if (value === undefined) {
                    return Boolean(found.kids.length);
                }
                else {
                    return found.kids.some(child => child.value == value);
                }
            });
            return this.clone(sub);
        }
        hack(belt, context = {}) {
            return [].concat(...this.kids.map(child => {
                let handle = belt[child.type] || belt[''];
                if (!handle || handle === Object.prototype[child.type]) {
                    handle = (input, belt, context) => [
                        input.clone(input.hack(belt, context), context.span)
                    ];
                }
                try {
                    return handle(child, belt, context);
                }
                catch (error) {
                    error.message += `\n${child.clone([])}${child.span}`;
                    $mol_fail_hidden(error);
                }
            }));
        }
        error(message, Class = Error) {
            return this.span.error(`${message}\n${this.clone([])}`, Class);
        }
    }
    $.$mol_tree2 = $mol_tree2;
    class $mol_tree2_empty extends $mol_tree2 {
        constructor() {
            super('', '', [], $mol_span.unknown);
        }
    }
    $.$mol_tree2_empty = $mol_tree2_empty;
})($ || ($ = {}));
//mol/tree2/tree2.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_app_demo extends $.$mol_app_demo {
            component_name(name) {
                return name.split('_demo')?.[0] ?? name;
            }
            detail_title() {
                const selected = this.selected();
                return selected ? this.component_name(selected) : super.title();
            }
            detail_description() {
                return this.Demo().title();
            }
            names() {
                const next = [];
                for (const name in this.$) {
                    const ctor = this.$[name];
                    if (typeof ctor !== 'function')
                        continue;
                    if (!$mol_func_is_class(ctor))
                        continue;
                    if (!(ctor.prototype instanceof $mol_example))
                        continue;
                    if (this.demo_block_list().includes(name))
                        continue;
                    next.push(name);
                }
                return next.sort();
            }
            widget_tags(name) {
                const component_name = this.component_name(name);
                const tags = this.Widget(name).tags().map(tag => tag.toLowerCase());
                if (tags.length === 0) {
                    console.warn(`Demo widget without tags: ${name}`);
                    return ['untagged', component_name];
                }
                else {
                    return [...tags, component_name];
                }
            }
            widget_title(name) {
                return this.Widget(name).title();
            }
            widget_aspects(name) {
                return this.Widget(name).aspects();
            }
            selected() {
                let value = $mol_state_arg.value('demo') || '';
                if (value && !value.startsWith('$'))
                    value = '$' + value;
                return value;
            }
            readme_page(next) {
                return $mol_state_session.value('readme', next) ?? false;
            }
            selected_class_name() {
                return this.selected();
            }
            Widget(name) {
                return new this.$[name];
            }
            names_demo() {
                const selected = this.selected();
                return [selected];
            }
            pages() {
                let sub = [];
                sub.push(this.Menu());
                const selected = this.selected();
                if (!selected)
                    return sub;
                sub.push(this.Detail(selected));
                const readme_page = this.readme_page();
                if (readme_page)
                    sub.push(this.Readme_page());
                sub.push(...this.chat_pages(selected));
                return sub;
            }
            Demo() {
                return this.Widget(this.selected());
            }
            logo_uri() {
                return $mol_file.relative('/mol/logo/logo.svg').path();
            }
            meta_bundle_base() {
                return this.$.$mol_state_arg.make_link({});
            }
            repo_dict() {
                const meta_uri = new URL('web.meta.tree', this.meta_bundle_base()).toString();
                const str = this.$.$mol_fetch.text(meta_uri);
                const tree = this.$.$mol_tree2_from_string(str);
                const dict = {};
                tree.kids.forEach(meta => {
                    const packs = meta.select('pack');
                    packs.kids.forEach(pack => {
                        const module_name = meta.value === '/' ? pack.kids[0]?.type :
                            [...meta.value.split('/').slice(1), pack.kids[0]?.type].join('_');
                        const repo = pack.kids[0]?.kids[0]?.kids[0]?.value
                            .split('.git')[0].split('/').slice(-2).join('/');
                        if (!repo)
                            throw new Error(`${this}.repo_dict(): Pack node "${pack.toString()}" does not contain a valid git url`);
                        dict[module_name] = repo;
                    });
                });
                return dict;
            }
            name_parse(name) {
                const split = name.replace(/\$/, '').split('_');
                const repos = this.repo_dict();
                const keys = split.map((_, index) => split.slice(0, -1 - index).join('_'));
                const key = keys.find(key => key in repos);
                if (!key)
                    throw new Error(`${this}.name_parse("${name}"): Key "${key}" not found`);
                const repo = repos[key];
                const module = split.slice(key.split('_').length);
                return { repo, module };
            }
            repo() {
                return this.name_parse($mol_state_arg.value('demo')).repo;
            }
            module() {
                return this.name_parse(this.selected()).module;
            }
            chat_link() {
                return $mol_state_arg.make_link({ demo: this.selected() });
            }
            edit_uri() {
                const source = encodeURIComponent(`$${''}my_app ${this.selected()}`);
                const pack = encodeURIComponent(this.$.$mol_state_arg.make_link({}));
                return `https://studio.hyoo.ru/#!pack=${pack}/source=${source}/preview`;
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_app_demo.prototype, "component_name", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo.prototype, "names", null);
        __decorate([
            $mol_mem_key
        ], $mol_app_demo.prototype, "widget_tags", null);
        __decorate([
            $mol_mem_key
        ], $mol_app_demo.prototype, "widget_title", null);
        __decorate([
            $mol_mem_key
        ], $mol_app_demo.prototype, "widget_aspects", null);
        __decorate([
            $mol_mem_key
        ], $mol_app_demo.prototype, "Widget", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo.prototype, "names_demo", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo.prototype, "meta_bundle_base", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo.prototype, "repo_dict", null);
        __decorate([
            $mol_mem_key
        ], $mol_app_demo.prototype, "name_parse", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo.prototype, "edit_uri", null);
        $$.$mol_app_demo = $mol_app_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/app/demo/demo.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/app/demo/demo.view.css", "\n[mol_app_demo_main],\n[mol_app_demo_detail],\n[mol_app_empty_message] {\n\tflex: 1000 0 40rem;\n}\n\n[mol_app_demo_nav_table] {\n\twidth: 100%;\n\tbox-sizing: border-box;\n}\n\n[mol_app_demo_nav_row] {\n\tdisplay: flex;\n}\n\n[mol_app_demo_nav_option] {\n\tpadding: 0 .5rem 0 0;\n\tdisplay: flex;\n\tflex: 1;\n\talign-items: center;\n\tbox-shadow: none;\n}\n\n[mol_app_demo_nav_expand] {\n\talign-self: stretch;\n\talign-items: center;\n\tpadding-right: .25rem;\n}\n\n[mol_app_demo_nav_content] {\n\tflex-grow: 1;\n}\n\n[mol_app_demo_list] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-content: flex-start;\n\talign-items: flex-start;\n}\n\n[mol_app_demo_screen] {\n\tmax-height: 45%;\n}\n\n[mol_app_demo_detail_body] {\n\tdisplay: flex;\n\talign-items: stretch;\n\tjustify-content: flex-start;\n\tflex-direction: column;\n}\n\n[mol_app_demo_detail_list] {\n\tflex: 1 0 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n[mol_app_demo_page_close] {\n\tcolor: inherit;\n\talign-items: center;\n\tpadding: 1rem;\n}\n\n[mol_app_demo_welcome] {\n\tflex: 1 1 auto;\n}\n\n[mol_app_demo_option_link] {\n\tpadding: 0;\n}\n\n[mol_app_demo_sample_large] {\n\tbox-sizing: border-box;\n}\n\n[mol_app_demo_detail_empty_message] {\n\tmargin: auto;\n}\n\n[mol_app_demo_chat] {\n\tflex: none;\n}\n\n[mol_app_demo_readme] {\n\tflex: 1 0 40rem;\n}\n\n[mol_app_demo_readme_not_found] {\n\tdisplay: flex;\n\tflex: 1 0;\n\talign-items: center;\n\tjustify-content: center;\n\tfont-size: 2rem;\n\tcolor: var(--mol_theme_shade);\n}\n");
})($ || ($ = {}));
//mol/app/demo/-css/demo.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_app_demo extends $mol_app_demo {
        Menu() {
            return this.milkywaystd_app_demo_menu_factory();
        }
        menu_items() {
            return [
                this.p1(),
                this.p2()
            ];
        }
        milkywaystd_app_demo_menu_factory() {
            return null;
        }
        p1() {
            return {
                label: "Misc",
                tags: [
                    "crud"
                ]
            };
        }
        p2() {
            return {
                label: "Ui",
                tags: [
                    "scroll",
                    "menu"
                ]
            };
        }
    }
    $.$milkywaystd_app_demo = $milkywaystd_app_demo;
    class $milkywaystd_app_demo_menu_tree extends $mol_app_demo_menu {
        title() {
            return "$milkywaystd examples";
        }
        Body() {
            const obj = new this.$.$mol_scroll();
            obj.sub = () => [
                this.List(),
                this.menu()
            ];
            return obj;
        }
        filter(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        Filter() {
            const obj = new this.$.$mol_search();
            obj.query = (val) => this.filter(val);
            return obj;
        }
        List() {
            const obj = new this.$.$mol_list();
            obj.rows = () => [
                this.Filter()
            ];
            return obj;
        }
        tree_menu_items() {
            return [];
        }
        menu() {
            const obj = new this.$.$milkywaystd_ui_treemenu();
            obj.items = () => this.tree_menu_items();
            obj.filter = () => this.filter();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_app_demo_menu_tree.prototype, "Body", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_app_demo_menu_tree.prototype, "filter", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_app_demo_menu_tree.prototype, "Filter", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_app_demo_menu_tree.prototype, "List", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_app_demo_menu_tree.prototype, "menu", null);
    $.$milkywaystd_app_demo_menu_tree = $milkywaystd_app_demo_menu_tree;
})($ || ($ = {}));
//milkywaystd/app/demo/-view.tree/milkywaystd_app_demo.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_app_demo extends $.$milkywaystd_app_demo {
            milkywaystd_app_demo_menu_factory() {
                const menu = new $milkywaystd_app_demo_menu_tree();
                menu.tree_menu_items = this.tree_menu_items.bind(this);
                return menu;
            }
            tree_menu_items() {
                const names = this.names().filter(el => el.toLowerCase().indexOf(this.Menu().filter().toLowerCase()) !== -1);
                let stack = [];
                const result_items = [];
                if (this.menu_items().length) {
                    stack.push(...this.menu_items());
                }
                while (stack.length) {
                    const menu_item = { label: '', link: '', items: [], parent: null };
                    const item = stack.shift();
                    menu_item.label = item.label;
                    menu_item.id = $mol_key(item.label);
                    if (item.tags && item.tags.length) {
                        for (const name of names) {
                            if (!name)
                                continue;
                            let title = '';
                            if (this.Widget(name).title)
                                title = this.Widget(name).title();
                            const tags = this.Widget(name).tags().map(tag => tag.toLowerCase().trim());
                            const subs = [];
                            for (const tag of item.tags) {
                                if (tags.includes(tag)) {
                                    menu_item.id = $mol_key(item.label + name);
                                    console.log(item.label, tag, name);
                                    const menu_item_child = { id: $mol_key(item.label + tag + name), label: title ? title : name, link: { 'demo': name }, items: [] };
                                    menu_item.items.push(menu_item_child);
                                    break;
                                }
                            }
                        }
                    }
                    if (item.items) {
                        for (const child of item.items) {
                            child.parent = menu_item;
                        }
                        stack.push(...item.items);
                    }
                    if (item.parent) {
                        item.parent.items.push(menu_item);
                    }
                    else {
                        result_items.push(menu_item);
                    }
                }
                return result_items;
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_app_demo.prototype, "milkywaystd_app_demo_menu_factory", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_app_demo.prototype, "tree_menu_items", null);
        $$.$milkywaystd_app_demo = $milkywaystd_app_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/app/demo/milkywaystd_app_demo.view.ts

export default $
//# sourceMappingURL=web.js.map

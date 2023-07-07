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
    class $milkywaystd_ionui_router extends $mol_view {
        dom_name() {
            return "ion-router";
        }
    }
    $.$milkywaystd_ionui_router = $milkywaystd_ionui_router;
})($ || ($ = {}));
//milkywaystd/ionui/router/-view.tree/router.view.tree.ts
;
"use strict";
var $;
(function ($) {
    const error_showed = new WeakMap();
    class $milkywaystd_viewcontainer extends $mol_view {
        loaderElement = null;
        addLoaderElement() {
            if (!this.loaderElement) {
                this.loaderElement = this.getLoaderElement();
            }
            this.dom_node().parentNode?.insertBefore(this.loaderElement, this.dom_node());
            this.loaderElement.appendChild(this.dom_node());
        }
        removeLoaderElement() {
            this.dom_node().parentNode?.parentNode?.insertBefore(this.dom_node(), this.loaderElement);
            this.loaderElement?.remove();
        }
        getLoaderElement() {
            const templateInner = $mol_dom_context.document.querySelector("#loader-container");
            return templateInner ? templateInner.children.item(0)?.cloneNode(true) : null;
        }
        loading(value) {
            if (undefined !== value) {
                if (value) {
                    this.addLoaderElement();
                }
                else {
                    this.removeLoaderElement();
                }
                return value;
            }
            return false;
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                    if (this.loading()) {
                        this.loading(false);
                    }
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
                if (error instanceof Promise) {
                    if (!this.loading()) {
                        this.loading(true);
                    }
                    break render;
                }
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
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_viewcontainer.prototype, "loading", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_viewcontainer.prototype, "dom_tree", null);
    $.$milkywaystd_viewcontainer = $milkywaystd_viewcontainer;
})($ || ($ = {}));
//milkywaystd/viewcontainer/viewcontainer.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_component extends $milkywaystd_viewcontainer {
        classes(next) {
            if (next !== undefined)
                return next;
            return [];
        }
        attr() {
            const attr = super.attr();
            this.dom_node().classList.remove(...this.classes());
            this.dom_node().classList.add(...this.classes());
            attr['class'] = this.dom_node().classList.toString();
            return attr;
        }
        style_size() {
            return {};
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_component.prototype, "classes", null);
    $.$milkywaystd_ionui_component = $milkywaystd_ionui_component;
})($ || ($ = {}));
//milkywaystd/ionui/component/component.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_app extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-app";
        }
    }
    $.$milkywaystd_ionui_app = $milkywaystd_ionui_app;
})($ || ($ = {}));
//milkywaystd/ionui/app/-view.tree/app.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_ionui_app extends $.$milkywaystd_ionui_app {
            constructor() {
                super();
                window.document.querySelector("[id='$mol_style_attach']")?.remove();
            }
        }
        $$.$milkywaystd_ionui_app = $milkywaystd_ionui_app;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/ionui/app/app.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("milkywaystd/ionui/app/app.view.css", "\n");
})($ || ($ = {}));
//milkywaystd/ionui/app/-css/app.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_routeroutlet extends $mol_view {
        dom_name() {
            return "ion-router-outlet";
        }
        sub() {
            return this.getSubs();
        }
        getSubs() {
            return [];
        }
    }
    $.$milkywaystd_ionui_routeroutlet = $milkywaystd_ionui_routeroutlet;
})($ || ($ = {}));
//milkywaystd/ionui/routeroutlet/-view.tree/routeroutlet.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_ionui_routeroutlet extends $.$milkywaystd_ionui_routeroutlet {
            auto() {
                this.dom_node().delegate = this.delegate();
                this.dom_node().addEventListener('ionNavWillLoad', this.ionNavWillLoad);
                this.dom_node().addEventListener('ionNavWillChange', this.ionNavWillChange);
                this.dom_node().addEventListener('ionNavDidChange', this.ionNavDidChange);
            }
            delegate() {
                return this;
            }
            ionNavWillChange(ev) {
            }
            ionNavWillLoad(ev) {
            }
            ionNavDidChange(ev) {
            }
            subelement(next) {
                if (next !== undefined)
                    return next;
                return null;
            }
            getSubs() {
                return this.subelement() ? [this.subelement()] : [];
            }
            attachViewToDom(container, component, propsOrDataObj, cssClasses) {
                let comp = propsOrDataObj().component;
                if (!(comp instanceof $mol_view)) {
                    comp = new comp();
                }
                const el = comp.dom_node();
                el.classList.add(...cssClasses);
                el.style.removeProperty('display');
                this.subelement(comp);
                return el;
            }
            removeViewFromDom(container, component) {
                return Promise.resolve();
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_routeroutlet.prototype, "subelement", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_routeroutlet.prototype, "getSubs", null);
        $$.$milkywaystd_ionui_routeroutlet = $milkywaystd_ionui_routeroutlet;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/ionui/routeroutlet/routeroutlet.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_menu extends $mol_view {
        dom_name() {
            return "ion-menu";
        }
    }
    $.$milkywaystd_ionui_menu = $milkywaystd_ionui_menu;
})($ || ($ = {}));
//milkywaystd/ionui/menu/-view.tree/menu.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_title extends $mol_view {
        dom_name() {
            return "ion-title";
        }
    }
    $.$milkywaystd_ionui_title = $milkywaystd_ionui_title;
})($ || ($ = {}));
//milkywaystd/ionui/title/-view.tree/title.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_toolbar extends $mol_view {
        dom_name() {
            return "ion-toolbar";
        }
    }
    $.$milkywaystd_ionui_toolbar = $milkywaystd_ionui_toolbar;
})($ || ($ = {}));
//milkywaystd/ionui/toolbar/-view.tree/toolbar.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_header extends $mol_view {
        dom_name() {
            return "ion-header";
        }
    }
    $.$milkywaystd_ionui_header = $milkywaystd_ionui_header;
})($ || ($ = {}));
//milkywaystd/ionui/header/-view.tree/header.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_listheader extends $mol_view {
        dom_name() {
            return "ion-list-header";
        }
    }
    $.$milkywaystd_ionui_listheader = $milkywaystd_ionui_listheader;
})($ || ($ = {}));
//milkywaystd/ionui/listheader/-view.tree/listheader.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_icon extends $mol_view {
        dom_name() {
            return "ion-icon";
        }
    }
    $.$milkywaystd_ionui_icon = $milkywaystd_ionui_icon;
})($ || ($ = {}));
//milkywaystd/ionui/icon/-view.tree/icon.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_label extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-label";
        }
    }
    $.$milkywaystd_ionui_label = $milkywaystd_ionui_label;
})($ || ($ = {}));
//milkywaystd/ionui/label/-view.tree/label.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_item extends $mol_view {
        dom_name() {
            return "ion-item";
        }
    }
    $.$milkywaystd_ionui_item = $milkywaystd_ionui_item;
})($ || ($ = {}));
//milkywaystd/ionui/item/-view.tree/item.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_menutoggle extends $mol_view {
        dom_name() {
            return "ion-menu-toggle";
        }
    }
    $.$milkywaystd_ionui_menutoggle = $milkywaystd_ionui_menutoggle;
})($ || ($ = {}));
//milkywaystd/ionui/menutoggle/-view.tree/menutoggle.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_content extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-content";
        }
    }
    $.$milkywaystd_ionui_content = $milkywaystd_ionui_content;
})($ || ($ = {}));
//milkywaystd/ionui/content/-view.tree/content.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_demo_route extends $mol_view {
        sub() {
            return [
                this.IonRouter(),
                this.IonApp()
            ];
        }
        getRoutes() {
            return [];
        }
        IonRouter() {
            const obj = new this.$.$milkywaystd_ionui_router();
            obj.sub = () => this.getRoutes();
            return obj;
        }
        IonMenuI() {
            const obj = new this.$.$IonMenu();
            return obj;
        }
        RouterOutlet() {
            const obj = new this.$.$RouterOutlet();
            return obj;
        }
        IonApp() {
            const obj = new this.$.$milkywaystd_ionui_app();
            obj.sub = () => [
                this.IonMenuI(),
                this.RouterOutlet()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_route.prototype, "IonRouter", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_route.prototype, "IonMenuI", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_route.prototype, "RouterOutlet", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_route.prototype, "IonApp", null);
    $.$milkywaystd_ionui_demo_route = $milkywaystd_ionui_demo_route;
    class $RouterOutlet extends $milkywaystd_ionui_routeroutlet {
        attr() {
            return {
                ...super.attr(),
                id: "outlet"
            };
        }
    }
    $.$RouterOutlet = $RouterOutlet;
    class $IonMenu extends $milkywaystd_ionui_menu {
        attr() {
            return {
                ...super.attr(),
                "content-id": "outlet"
            };
        }
        sub() {
            return [
                this.IonHeader(),
                this.MenuContent()
            ];
        }
        MenuTitleText() {
            return "Menu";
        }
        IonTitle() {
            const obj = new this.$.$milkywaystd_ionui_title();
            obj.sub = () => [
                this.MenuTitleText()
            ];
            return obj;
        }
        IonToolbar() {
            const obj = new this.$.$milkywaystd_ionui_toolbar();
            obj.sub = () => [
                this.IonTitle()
            ];
            return obj;
        }
        IonHeader() {
            const obj = new this.$.$milkywaystd_ionui_header();
            obj.sub = () => [
                this.IonToolbar()
            ];
            return obj;
        }
        ilh() {
            return "Navigation";
        }
        IonListHeader() {
            const obj = new this.$.$milkywaystd_ionui_listheader();
            obj.sub = () => [
                this.ilh()
            ];
            return obj;
        }
        ic1() {
            const obj = new this.$.$milkywaystd_ionui_icon();
            obj.attr = () => ({
                slot: "start",
                name: "home"
            });
            return obj;
        }
        hl() {
            return "Home";
        }
        il1() {
            const obj = new this.$.$milkywaystd_ionui_label();
            obj.sub = () => [
                this.hl()
            ];
            return obj;
        }
        IonItem() {
            const obj = new this.$.$milkywaystd_ionui_item();
            obj.attr = () => ({
                button: "true",
                href: "/"
            });
            obj.sub = () => [
                this.ic1(),
                this.il1()
            ];
            return obj;
        }
        IonMenuToggle() {
            const obj = new this.$.$milkywaystd_ionui_menutoggle();
            obj.sub = () => [
                this.IonItem()
            ];
            return obj;
        }
        ic3() {
            const obj = new this.$.$milkywaystd_ionui_icon();
            obj.attr = () => ({
                slot: "start",
                name: "logo-octocat"
            });
            return obj;
        }
        hl3() {
            return "Foto feed";
        }
        il3() {
            const obj = new this.$.$milkywaystd_ionui_label();
            obj.sub = () => [
                this.hl3()
            ];
            return obj;
        }
        IonItem3() {
            const obj = new this.$.$milkywaystd_ionui_item();
            obj.attr = () => ({
                button: "true",
                href: "virtual"
            });
            obj.sub = () => [
                this.ic3(),
                this.il3()
            ];
            return obj;
        }
        IonMenuToggle3() {
            const obj = new this.$.$milkywaystd_ionui_menutoggle();
            obj.sub = () => [
                this.IonItem3()
            ];
            return obj;
        }
        MenuContent() {
            const obj = new this.$.$milkywaystd_ionui_content();
            obj.sub = () => [
                this.IonListHeader(),
                this.IonMenuToggle(),
                this.IonMenuToggle3()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonTitle", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonToolbar", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonHeader", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonListHeader", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "ic1", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "il1", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonItem", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonMenuToggle", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "ic3", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "il3", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonItem3", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonMenuToggle3", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "MenuContent", null);
    $.$IonMenu = $IonMenu;
})($ || ($ = {}));
//milkywaystd/ionui/demo/route/-view.tree/route.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_route extends $mol_view {
        dom_name() {
            return "ion-route";
        }
    }
    $.$milkywaystd_ionui_route = $milkywaystd_ionui_route;
})($ || ($ = {}));
//milkywaystd/ionui/route/-view.tree/route.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_ionui_route extends $.$milkywaystd_ionui_route {
            component = null;
            url = null;
            cmp = null;
            constructor(component = null, url = null, cmp = null) {
                super();
                this.component = component;
                this.url = url;
                this.cmp = cmp;
            }
            attr() {
                return { ...super.attr(),
                    url: this.url,
                    id: "route_" + this.component?.toString(),
                    component: "component_" + this.component?.toString(),
                };
            }
            auto() {
                this.dom_node().componentProps = () => ({
                    component: this.component,
                });
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_route.prototype, "attr", null);
        $$.$milkywaystd_ionui_route = $milkywaystd_ionui_route;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/ionui/route/route.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_menubutton extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-menu-button";
        }
    }
    $.$milkywaystd_ionui_menubutton = $milkywaystd_ionui_menubutton;
})($ || ($ = {}));
//milkywaystd/ionui/menubutton/-view.tree/menubutton.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_buttons extends $mol_view {
        dom_name() {
            return "ion-buttons";
        }
    }
    $.$milkywaystd_ionui_buttons = $milkywaystd_ionui_buttons;
})($ || ($ = {}));
//milkywaystd/ionui/buttons/-view.tree/buttons.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_demo_pages_page2 extends $milkywaystd_ionui_component {
        sub() {
            return [
                this.IonHeader(),
                this.IonContent()
            ];
        }
        IonMenuButton() {
            const obj = new this.$.$milkywaystd_ionui_menubutton();
            return obj;
        }
        IonButtons() {
            const obj = new this.$.$milkywaystd_ionui_buttons();
            obj.attr = () => ({
                slot: "start"
            });
            obj.sub = () => [
                this.IonMenuButton()
            ];
            return obj;
        }
        Text() {
            return "Main";
        }
        IonTitle() {
            const obj = new this.$.$milkywaystd_ionui_title();
            obj.sub = () => [
                this.Text()
            ];
            return obj;
        }
        IonTollbar() {
            const obj = new this.$.$milkywaystd_ionui_toolbar();
            obj.sub = () => [
                this.IonButtons(),
                this.IonTitle()
            ];
            return obj;
        }
        IonHeader() {
            const obj = new this.$.$milkywaystd_ionui_header();
            obj.sub = () => [
                this.IonTollbar()
            ];
            return obj;
        }
        IonContent() {
            const obj = new this.$.$IC2();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page2.prototype, "IonMenuButton", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page2.prototype, "IonButtons", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page2.prototype, "IonTitle", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page2.prototype, "IonTollbar", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page2.prototype, "IonHeader", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page2.prototype, "IonContent", null);
    $.$milkywaystd_ionui_demo_pages_page2 = $milkywaystd_ionui_demo_pages_page2;
    class $IC2 extends $milkywaystd_ionui_content {
        classes() {
            return [
                "ion-padding"
            ];
        }
        sub() {
            return [
                this.titleel()
            ];
        }
        text1() {
            return "Hello $mol!";
        }
        titleel() {
            const obj = new this.$.$milkywaystd_ionui_title();
            obj.sub = () => [
                this.text1()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $IC2.prototype, "titleel", null);
    $.$IC2 = $IC2;
})($ || ($ = {}));
//milkywaystd/ionui/demo/pages/page2/-view.tree/page2.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_ionui_demo_route extends $.$milkywaystd_ionui_demo_route {
            getRoutes() {
                return [
                    new $milkywaystd_ionui_route(new $milkywaystd_ionui_demo_pages_page2(), '/'),
                    new $milkywaystd_ionui_route(new $$.$milkywaystd_ionui_demo_pages_page4(), '/virtual')
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_route.prototype, "getRoutes", null);
        $$.$milkywaystd_ionui_demo_route = $milkywaystd_ionui_demo_route;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/ionui/demo/route/route.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_refreshercontent extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-refresher-content";
        }
    }
    $.$milkywaystd_ionui_refreshercontent = $milkywaystd_ionui_refreshercontent;
})($ || ($ = {}));
//milkywaystd/ionui/refreshercontent/-view.tree/refreshercontent.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_refresher extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-refresher";
        }
    }
    $.$milkywaystd_ionui_refresher = $milkywaystd_ionui_refresher;
})($ || ($ = {}));
//milkywaystd/ionui/refresher/-view.tree/refresher.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_spinner extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-spinner";
        }
    }
    $.$milkywaystd_ionui_spinner = $milkywaystd_ionui_spinner;
})($ || ($ = {}));
//milkywaystd/ionui/spinner/-view.tree/spinner.view.tree.ts
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
    class $milkywaystd_ionui_demo_pages_page4 extends $milkywaystd_ionui_component {
        sub() {
            return [
                this.IonHeader(),
                this.IonContent()
            ];
        }
        IonMenuButton() {
            const obj = new this.$.$milkywaystd_ionui_menubutton();
            return obj;
        }
        IonButtons() {
            const obj = new this.$.$milkywaystd_ionui_buttons();
            obj.attr = () => ({
                slot: "start"
            });
            obj.sub = () => [
                this.IonMenuButton()
            ];
            return obj;
        }
        Text() {
            return "Foto feed";
        }
        IonTitle() {
            const obj = new this.$.$milkywaystd_ionui_title();
            obj.sub = () => [
                this.Text()
            ];
            return obj;
        }
        IonTollbar() {
            const obj = new this.$.$milkywaystd_ionui_toolbar();
            obj.sub = () => [
                this.IonButtons(),
                this.IonTitle()
            ];
            return obj;
        }
        IonHeader() {
            const obj = new this.$.$milkywaystd_ionui_header();
            obj.sub = () => [
                this.IonTollbar()
            ];
            return obj;
        }
        ionRefresh(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        getRefersherDisabled() {
            return true;
        }
        RefresherContent() {
            const obj = new this.$.$milkywaystd_ionui_refreshercontent();
            return obj;
        }
        Refresher() {
            const obj = new this.$.$milkywaystd_ionui_refresher();
            obj.event = () => ({
                ionRefresh: (val) => this.ionRefresh(val)
            });
            obj.attr = () => ({
                slot: "fixed",
                disabled: this.getRefersherDisabled()
            });
            obj.sub = () => [
                this.RefresherContent()
            ];
            return obj;
        }
        itemRendererFactory() {
            return null;
        }
        getSpinnerDisplay() {
            return "flex";
        }
        infspin() {
            const obj = new this.$.$milkywaystd_ionui_spinner();
            obj.attr = () => ({
                slot: "fixed"
            });
            obj.style = () => ({
                width: "100%",
                height: "32px",
                "margin-top": "22px",
                display: this.getSpinnerDisplay()
            });
            return obj;
        }
        viewPort() {
            const obj = new this.$.$milkywaystd_scroll_VirtualScrollViewport();
            obj.itemRendererFactory = () => this.itemRendererFactory();
            obj.itemHeight = () => 600;
            obj.minBufferPx = () => 2400;
            obj.maxBufferPx = () => 4800;
            obj.style = () => ({
                height: "100%"
            });
            obj.pre_sub = () => [];
            obj.post_sub = () => [
                this.infspin()
            ];
            return obj;
        }
        IonContent() {
            const obj = new this.$.$IC4();
            obj.sub = () => [
                this.Refresher(),
                this.viewPort()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "IonMenuButton", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "IonButtons", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "IonTitle", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "IonTollbar", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "IonHeader", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "ionRefresh", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "RefresherContent", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "Refresher", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "infspin", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "viewPort", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "IonContent", null);
    $.$milkywaystd_ionui_demo_pages_page4 = $milkywaystd_ionui_demo_pages_page4;
    class $IC4 extends $milkywaystd_ionui_content {
        attr() {
            return {
                "scroll-y": "false"
            };
        }
        classes() {
            return [
                "ion-padding"
            ];
        }
    }
    $.$IC4 = $IC4;
})($ || ($ = {}));
//milkywaystd/ionui/demo/pages/page4/-view.tree/page4.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_img extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-img";
        }
    }
    $.$milkywaystd_ionui_img = $milkywaystd_ionui_img;
})($ || ($ = {}));
//milkywaystd/ionui/img/-view.tree/img.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_cardsubtitle extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-card-subtitle";
        }
    }
    $.$milkywaystd_ionui_cardsubtitle = $milkywaystd_ionui_cardsubtitle;
})($ || ($ = {}));
//milkywaystd/ionui/cardsubtitle/-view.tree/cardsubtitle.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_cardheader extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-card-header";
        }
    }
    $.$milkywaystd_ionui_cardheader = $milkywaystd_ionui_cardheader;
})($ || ($ = {}));
//milkywaystd/ionui/cardheader/-view.tree/cardheader.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_button extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-button";
        }
        sub() {
            return [
                this.title()
            ];
        }
    }
    $.$milkywaystd_ionui_button = $milkywaystd_ionui_button;
})($ || ($ = {}));
//milkywaystd/ionui/button/-view.tree/button.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_cardcontent extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-card-content";
        }
    }
    $.$milkywaystd_ionui_cardcontent = $milkywaystd_ionui_cardcontent;
})($ || ($ = {}));
//milkywaystd/ionui/cardcontent/-view.tree/cardcontent.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_card extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-card";
        }
    }
    $.$milkywaystd_ionui_card = $milkywaystd_ionui_card;
})($ || ($ = {}));
//milkywaystd/ionui/card/-view.tree/card.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_demo_catrotator extends $milkywaystd_viewcontainer {
        sub() {
            return [
                this.IonCard()
            ];
        }
        imgSrc() {
            return null;
        }
        IonImg() {
            const obj = new this.$.$milkywaystd_ionui_img();
            obj.attr = () => ({
                src: this.imgSrc()
            });
            return obj;
        }
        txt() {
            return "Awesome images";
        }
        IonCardSubitle() {
            const obj = new this.$.$milkywaystd_ionui_cardsubtitle();
            obj.sub = () => [
                this.txt()
            ];
            return obj;
        }
        IonCardHeader() {
            const obj = new this.$.$milkywaystd_ionui_cardheader();
            obj.sub = () => [
                this.IonCardSubitle()
            ];
            return obj;
        }
        idx() {
            return 0;
        }
        txt2() {
            return "Vote";
        }
        rotate(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        btn() {
            const obj = new this.$.$milkywaystd_ionui_button();
            obj.sub = () => [
                this.txt2()
            ];
            obj.event = () => ({
                click: (val) => this.rotate(val)
            });
            return obj;
        }
        IonCardcontent() {
            const obj = new this.$.$milkywaystd_ionui_cardcontent();
            obj.sub = () => [
                this.idx(),
                this.btn()
            ];
            return obj;
        }
        IonCard() {
            const obj = new this.$.$milkywaystd_ionui_card();
            obj.sub = () => [
                this.IonImg(),
                this.IonCardHeader(),
                this.IonCardcontent()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "IonImg", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "IonCardSubitle", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "IonCardHeader", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "rotate", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "btn", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "IonCardcontent", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "IonCard", null);
    $.$milkywaystd_ionui_demo_catrotator = $milkywaystd_ionui_demo_catrotator;
})($ || ($ = {}));
//milkywaystd/ionui/demo/catrotator/-view.tree/catrotator.view.tree.ts
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
    var $$;
    (function ($$) {
        class $milkywaystd_ionui_demo_catrotator extends $.$milkywaystd_ionui_demo_catrotator {
            static cache = new Map();
            src() {
                if (this.idx() !== null)
                    return 'https://loremflickr.com/360/640?r=' + this.idx();
                return null;
            }
            idx() {
                return this.implicit() ? this.implicit().id : 0;
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
            imgSrc() {
                if (!this.src())
                    return null;
                if ($milkywaystd_ionui_demo_catrotator.cache.has(this.src()))
                    return $milkywaystd_ionui_demo_catrotator.cache.get(this.src());
                const buffer = $mol_fetch.buffer(this.src());
                const blob = new Blob([buffer], { type: "image/jpeg" });
                const urlCreator = window.URL || window.webkitURL;
                const imageUrl = urlCreator.createObjectURL(blob);
                $milkywaystd_ionui_demo_catrotator.cache.set(this.src(), imageUrl);
                return imageUrl;
            }
            subsciber = null;
            rotate() {
                $milkywaystd_ionui_demo_pages_page4.alert();
            }
            dom_id() {
                return '$milkywaystd_ionui_demo_route_catrotator_' + this.idx();
            }
            onData(obj) {
                this.context(obj);
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_catrotator.prototype, "src", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_catrotator.prototype, "idx", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_catrotator.prototype, "context", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_catrotator.prototype, "implicit", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_catrotator.prototype, "imgSrc", null);
        $$.$milkywaystd_ionui_demo_catrotator = $milkywaystd_ionui_demo_catrotator;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/ionui/demo/catrotator/catrotator.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("milkywaystd/ionui/demo/catrotator/catrotator.view.css", "[milkywaystd_ionui_demo_catrotator]::part(image) {\n\tmax-height: 240px;\n}\n");
})($ || ($ = {}));
//milkywaystd/ionui/demo/catrotator/-css/catrotator.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_ionui_demo_pages_page4 extends $.$milkywaystd_ionui_demo_pages_page4 {
            ar = [];
            static alert() {
                const alert = document.createElement('ion-alert');
                alert.header = 'Alert';
                alert.subHeader = 'Vote';
                alert.message = 'Accepted';
                alert.buttons = ['OK'];
                document.body.appendChild(alert);
                alert.present();
            }
            pending(next) {
                if (undefined !== next)
                    return next;
                return false;
            }
            loadnext() {
                this.pending(true);
                setTimeout(() => {
                    this.pending(false);
                    const l = this.ar.length + 1;
                    for (let index = 0; index < 10; index++) {
                        this.ar.push({ id: l + index });
                        this.viewPort().setData(this.ar);
                    }
                }, 2000);
            }
            loadnew() {
                this.pending(true);
                setTimeout(() => {
                    $milkywaystd_ionui_demo_catrotator.cache.clear();
                    this.ar = [];
                    for (let index = 0; index < 10; index++) {
                        this.ar.push({ id: index });
                    }
                    this.viewPort().setData(this.ar);
                    this.Refresher().dom_node().complete();
                    this.pending(false);
                }, 2000);
            }
            getRefersherDisabled(next) {
                if (undefined !== next)
                    return next;
                return false;
            }
            ionRefresh() {
                this.loadnew();
            }
            auto() {
                this.loadnew();
                this.viewPort()
                    .forOfCtl?.elementScrolled()
                    ?.auditTime(200)
                    .subscribe((range) => {
                    if (this.viewPort()?.forOfCtl?.measureScrollOffset("bottom") <
                        20 &&
                        !this.pending()) {
                        this.loadnext();
                    }
                    if (this.viewPort()?.forOfCtl?.measureScrollOffset("top") < 50) {
                        this.getRefersherDisabled(false);
                    }
                    else {
                        this.getRefersherDisabled(true);
                    }
                });
                return null;
            }
            itemRendererFactory() {
                return new $milkywaystd_ionui_demo_catrotator();
            }
            getSpinnerDisplay() {
                return this.pending() ? "flex" : "none";
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_pages_page4.prototype, "pending", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_pages_page4.prototype, "getRefersherDisabled", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_pages_page4.prototype, "getSpinnerDisplay", null);
        $$.$milkywaystd_ionui_demo_pages_page4 = $milkywaystd_ionui_demo_pages_page4;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/ionui/demo/pages/page4/page4.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_demo extends $mol_example_large {
        title() {
            return "Ionic implementation";
        }
        sub() {
            return [
                this.View()
            ];
        }
        View() {
            const obj = new this.$.$milkywaystd_ionui_demo_route();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo.prototype, "View", null);
    $.$milkywaystd_ionui_demo = $milkywaystd_ionui_demo;
})($ || ($ = {}));
//milkywaystd/ionui/demo/-view.tree/demo.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("milkywaystd/ionui/demo/demo.view.css", "\n");
})($ || ($ = {}));
//milkywaystd/ionui/demo/-css/demo.view.css.ts

export default $
//# sourceMappingURL=web.js.map

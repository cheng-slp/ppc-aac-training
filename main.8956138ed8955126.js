"use strict";
(self.webpackChunkcats = self.webpackChunkcats || []).push([[179], {
    857: ()=>{
        function me(n) {
            return "function" == typeof n
        }
        function fo(n) {
            const t = n(r=>{
                Error.call(r),
                r.stack = (new Error).stack
            }
            );
            return t.prototype = Object.create(Error.prototype),
            t.prototype.constructor = t,
            t
        }
        const Ws = fo(n=>function(t) {
            n(this),
            this.message = t ? `${t.length} errors occurred during unsubscription:\n${t.map((r,i)=>`${i + 1}) ${r.toString()}`).join("\n  ")}` : "",
            this.name = "UnsubscriptionError",
            this.errors = t
        }
        );
        function oi(n, e) {
            if (n) {
                const t = n.indexOf(e);
                0 <= t && n.splice(t, 1)
            }
        }
        class yt {
            constructor(e) {
                this.initialTeardown = e,
                this.closed = !1,
                this._parentage = null,
                this._finalizers = null
            }
            unsubscribe() {
                let e;
                if (!this.closed) {
                    this.closed = !0;
                    const {_parentage: t} = this;
                    if (t)
                        if (this._parentage = null,
                        Array.isArray(t))
                            for (const o of t)
                                o.remove(this);
                        else
                            t.remove(this);
                    const {initialTeardown: r} = this;
                    if (me(r))
                        try {
                            r()
                        } catch (o) {
                            e = o instanceof Ws ? o.errors : [o]
                        }
                    const {_finalizers: i} = this;
                    if (i) {
                        this._finalizers = null;
                        for (const o of i)
                            try {
                                Cp(o)
                            } catch (s) {
                                e = e ?? [],
                                s instanceof Ws ? e = [...e, ...s.errors] : e.push(s)
                            }
                    }
                    if (e)
                        throw new Ws(e)
                }
            }
            add(e) {
                var t;
                if (e && e !== this)
                    if (this.closed)
                        Cp(e);
                    else {
                        if (e instanceof yt) {
                            if (e.closed || e._hasParent(this))
                                return;
                            e._addParent(this)
                        }
                        (this._finalizers = null !== (t = this._finalizers) && void 0 !== t ? t : []).push(e)
                    }
            }
            _hasParent(e) {
                const {_parentage: t} = this;
                return t === e || Array.isArray(t) && t.includes(e)
            }
            _addParent(e) {
                const {_parentage: t} = this;
                this._parentage = Array.isArray(t) ? (t.push(e),
                t) : t ? [t, e] : e
            }
            _removeParent(e) {
                const {_parentage: t} = this;
                t === e ? this._parentage = null : Array.isArray(t) && oi(t, e)
            }
            remove(e) {
                const {_finalizers: t} = this;
                t && oi(t, e),
                e instanceof yt && e._removeParent(this)
            }
        }
        yt.EMPTY = (()=>{
            const n = new yt;
            return n.closed = !0,
            n
        }
        )();
        const vp = yt.EMPTY;
        function Ep(n) {
            return n instanceof yt || n && "closed"in n && me(n.remove) && me(n.add) && me(n.unsubscribe)
        }
        function Cp(n) {
            me(n) ? n() : n.unsubscribe()
        }
        const Sr = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1
        }
          , qs = {
            setTimeout(n, e, ...t) {
                const {delegate: r} = qs;
                return r?.setTimeout ? r.setTimeout(n, e, ...t) : setTimeout(n, e, ...t)
            },
            clearTimeout(n) {
                const {delegate: e} = qs;
                return (e?.clearTimeout || clearTimeout)(n)
            },
            delegate: void 0
        };
        function bp(n) {
            qs.setTimeout(()=>{
                const {onUnhandledError: e} = Sr;
                if (!e)
                    throw n;
                e(n)
            }
            )
        }
        function Tu() {}
        const sI = wu("C", void 0, void 0);
        function wu(n, e, t) {
            return {
                kind: n,
                value: e,
                error: t
            }
        }
        let Ir = null;
        function Ks(n) {
            if (Sr.useDeprecatedSynchronousErrorHandling) {
                const e = !Ir;
                if (e && (Ir = {
                    errorThrown: !1,
                    error: null
                }),
                n(),
                e) {
                    const {errorThrown: t, error: r} = Ir;
                    if (Ir = null,
                    t)
                        throw r
                }
            } else
                n()
        }
        class Au extends yt {
            constructor(e) {
                super(),
                this.isStopped = !1,
                e ? (this.destination = e,
                Ep(e) && e.add(this)) : this.destination = fI
            }
            static create(e, t, r) {
                return new po(e,t,r)
            }
            next(e) {
                this.isStopped ? Nu(function lI(n) {
                    return wu("N", n, void 0)
                }(e), this) : this._next(e)
            }
            error(e) {
                this.isStopped ? Nu(function aI(n) {
                    return wu("E", void 0, n)
                }(e), this) : (this.isStopped = !0,
                this._error(e))
            }
            complete() {
                this.isStopped ? Nu(sI, this) : (this.isStopped = !0,
                this._complete())
            }
            unsubscribe() {
                this.closed || (this.isStopped = !0,
                super.unsubscribe(),
                this.destination = null)
            }
            _next(e) {
                this.destination.next(e)
            }
            _error(e) {
                try {
                    this.destination.error(e)
                } finally {
                    this.unsubscribe()
                }
            }
            _complete() {
                try {
                    this.destination.complete()
                } finally {
                    this.unsubscribe()
                }
            }
        }
        const cI = Function.prototype.bind;
        function Mu(n, e) {
            return cI.call(n, e)
        }
        class dI {
            constructor(e) {
                this.partialObserver = e
            }
            next(e) {
                const {partialObserver: t} = this;
                if (t.next)
                    try {
                        t.next(e)
                    } catch (r) {
                        Qs(r)
                    }
            }
            error(e) {
                const {partialObserver: t} = this;
                if (t.error)
                    try {
                        t.error(e)
                    } catch (r) {
                        Qs(r)
                    }
                else
                    Qs(e)
            }
            complete() {
                const {partialObserver: e} = this;
                if (e.complete)
                    try {
                        e.complete()
                    } catch (t) {
                        Qs(t)
                    }
            }
        }
        class po extends Au {
            constructor(e, t, r) {
                let i;
                if (super(),
                me(e) || !e)
                    i = {
                        next: e ?? void 0,
                        error: t ?? void 0,
                        complete: r ?? void 0
                    };
                else {
                    let o;
                    this && Sr.useDeprecatedNextContext ? (o = Object.create(e),
                    o.unsubscribe = ()=>this.unsubscribe(),
                    i = {
                        next: e.next && Mu(e.next, o),
                        error: e.error && Mu(e.error, o),
                        complete: e.complete && Mu(e.complete, o)
                    }) : i = e
                }
                this.destination = new dI(i)
            }
        }
        function Qs(n) {
            Sr.useDeprecatedSynchronousErrorHandling ? function uI(n) {
                Sr.useDeprecatedSynchronousErrorHandling && Ir && (Ir.errorThrown = !0,
                Ir.error = n)
            }(n) : bp(n)
        }
        function Nu(n, e) {
            const {onStoppedNotification: t} = Sr;
            t && qs.setTimeout(()=>t(n, e))
        }
        const fI = {
            closed: !0,
            next: Tu,
            error: function hI(n) {
                throw n
            },
            complete: Tu
        }
          , Ou = "function" == typeof Symbol && Symbol.observable || "@@observable";
        function tr(n) {
            return n
        }
        function Dp(n) {
            return 0 === n.length ? tr : 1 === n.length ? n[0] : function(t) {
                return n.reduce((r,i)=>i(r), t)
            }
        }
        let xe = (()=>{
            class n {
                constructor(t) {
                    t && (this._subscribe = t)
                }
                lift(t) {
                    const r = new n;
                    return r.source = this,
                    r.operator = t,
                    r
                }
                subscribe(t, r, i) {
                    const o = function gI(n) {
                        return n && n instanceof Au || function mI(n) {
                            return n && me(n.next) && me(n.error) && me(n.complete)
                        }(n) && Ep(n)
                    }(t) ? t : new po(t,r,i);
                    return Ks(()=>{
                        const {operator: s, source: a} = this;
                        o.add(s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o))
                    }
                    ),
                    o
                }
                _trySubscribe(t) {
                    try {
                        return this._subscribe(t)
                    } catch (r) {
                        t.error(r)
                    }
                }
                forEach(t, r) {
                    return new (r = Sp(r))((i,o)=>{
                        const s = new po({
                            next: a=>{
                                try {
                                    t(a)
                                } catch (l) {
                                    o(l),
                                    s.unsubscribe()
                                }
                            }
                            ,
                            error: o,
                            complete: i
                        });
                        this.subscribe(s)
                    }
                    )
                }
                _subscribe(t) {
                    var r;
                    return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(t)
                }
                [Ou]() {
                    return this
                }
                pipe(...t) {
                    return Dp(t)(this)
                }
                toPromise(t) {
                    return new (t = Sp(t))((r,i)=>{
                        let o;
                        this.subscribe(s=>o = s, s=>i(s), ()=>r(o))
                    }
                    )
                }
            }
            return n.create = e=>new n(e),
            n
        }
        )();
        function Sp(n) {
            var e;
            return null !== (e = n ?? Sr.Promise) && void 0 !== e ? e : Promise
        }
        const _I = fo(n=>function() {
            n(this),
            this.name = "ObjectUnsubscribedError",
            this.message = "object unsubscribed"
        }
        );
        let Fe = (()=>{
            class n extends xe {
                constructor() {
                    super(),
                    this.closed = !1,
                    this.currentObservers = null,
                    this.observers = [],
                    this.isStopped = !1,
                    this.hasError = !1,
                    this.thrownError = null
                }
                lift(t) {
                    const r = new Ip(this,this);
                    return r.operator = t,
                    r
                }
                _throwIfClosed() {
                    if (this.closed)
                        throw new _I
                }
                next(t) {
                    Ks(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.currentObservers || (this.currentObservers = Array.from(this.observers));
                            for (const r of this.currentObservers)
                                r.next(t)
                        }
                    }
                    )
                }
                error(t) {
                    Ks(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.hasError = this.isStopped = !0,
                            this.thrownError = t;
                            const {observers: r} = this;
                            for (; r.length; )
                                r.shift().error(t)
                        }
                    }
                    )
                }
                complete() {
                    Ks(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.isStopped = !0;
                            const {observers: t} = this;
                            for (; t.length; )
                                t.shift().complete()
                        }
                    }
                    )
                }
                unsubscribe() {
                    this.isStopped = this.closed = !0,
                    this.observers = this.currentObservers = null
                }
                get observed() {
                    var t;
                    return (null === (t = this.observers) || void 0 === t ? void 0 : t.length) > 0
                }
                _trySubscribe(t) {
                    return this._throwIfClosed(),
                    super._trySubscribe(t)
                }
                _subscribe(t) {
                    return this._throwIfClosed(),
                    this._checkFinalizedStatuses(t),
                    this._innerSubscribe(t)
                }
                _innerSubscribe(t) {
                    const {hasError: r, isStopped: i, observers: o} = this;
                    return r || i ? vp : (this.currentObservers = null,
                    o.push(t),
                    new yt(()=>{
                        this.currentObservers = null,
                        oi(o, t)
                    }
                    ))
                }
                _checkFinalizedStatuses(t) {
                    const {hasError: r, thrownError: i, isStopped: o} = this;
                    r ? t.error(i) : o && t.complete()
                }
                asObservable() {
                    const t = new xe;
                    return t.source = this,
                    t
                }
            }
            return n.create = (e,t)=>new Ip(e,t),
            n
        }
        )();
        class Ip extends Fe {
            constructor(e, t) {
                super(),
                this.destination = e,
                this.source = t
            }
            next(e) {
                var t, r;
                null === (r = null === (t = this.destination) || void 0 === t ? void 0 : t.next) || void 0 === r || r.call(t, e)
            }
            error(e) {
                var t, r;
                null === (r = null === (t = this.destination) || void 0 === t ? void 0 : t.error) || void 0 === r || r.call(t, e)
            }
            complete() {
                var e, t;
                null === (t = null === (e = this.destination) || void 0 === e ? void 0 : e.complete) || void 0 === t || t.call(e)
            }
            _subscribe(e) {
                var t, r;
                return null !== (r = null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(e)) && void 0 !== r ? r : vp
            }
        }
        function Tp(n) {
            return me(n?.lift)
        }
        function Pe(n) {
            return e=>{
                if (Tp(e))
                    return e.lift(function(t) {
                        try {
                            return n(t, this)
                        } catch (r) {
                            this.error(r)
                        }
                    });
                throw new TypeError("Unable to lift unknown Observable type")
            }
        }
        function we(n, e, t, r, i) {
            return new yI(n,e,t,r,i)
        }
        class yI extends Au {
            constructor(e, t, r, i, o, s) {
                super(e),
                this.onFinalize = o,
                this.shouldUnsubscribe = s,
                this._next = t ? function(a) {
                    try {
                        t(a)
                    } catch (l) {
                        e.error(l)
                    }
                }
                : super._next,
                this._error = i ? function(a) {
                    try {
                        i(a)
                    } catch (l) {
                        e.error(l)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._error,
                this._complete = r ? function() {
                    try {
                        r()
                    } catch (a) {
                        e.error(a)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._complete
            }
            unsubscribe() {
                var e;
                if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                    const {closed: t} = this;
                    super.unsubscribe(),
                    !t && (null === (e = this.onFinalize) || void 0 === e || e.call(this))
                }
            }
        }
        function J(n, e) {
            return Pe((t,r)=>{
                let i = 0;
                t.subscribe(we(r, o=>{
                    r.next(n.call(e, o, i++))
                }
                ))
            }
            )
        }
        function Tr(n) {
            return this instanceof Tr ? (this.v = n,
            this) : new Tr(n)
        }
        function CI(n, e, t) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var i, r = t.apply(n, e || []), o = [];
            return i = {},
            s("next"),
            s("throw"),
            s("return"),
            i[Symbol.asyncIterator] = function() {
                return this
            }
            ,
            i;
            function s(h) {
                r[h] && (i[h] = function(f) {
                    return new Promise(function(p, g) {
                        o.push([h, f, p, g]) > 1 || a(h, f)
                    }
                    )
                }
                )
            }
            function a(h, f) {
                try {
                    !function l(h) {
                        h.value instanceof Tr ? Promise.resolve(h.value.v).then(u, c) : d(o[0][2], h)
                    }(r[h](f))
                } catch (p) {
                    d(o[0][3], p)
                }
            }
            function u(h) {
                a("next", h)
            }
            function c(h) {
                a("throw", h)
            }
            function d(h, f) {
                h(f),
                o.shift(),
                o.length && a(o[0][0], o[0][1])
            }
        }
        function bI(n) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var t, e = n[Symbol.asyncIterator];
            return e ? e.call(n) : (n = function Mp(n) {
                var e = "function" == typeof Symbol && Symbol.iterator
                  , t = e && n[e]
                  , r = 0;
                if (t)
                    return t.call(n);
                if (n && "number" == typeof n.length)
                    return {
                        next: function() {
                            return n && r >= n.length && (n = void 0),
                            {
                                value: n && n[r++],
                                done: !n
                            }
                        }
                    };
                throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }(n),
            t = {},
            r("next"),
            r("throw"),
            r("return"),
            t[Symbol.asyncIterator] = function() {
                return this
            }
            ,
            t);
            function r(o) {
                t[o] = n[o] && function(s) {
                    return new Promise(function(a, l) {
                        !function i(o, s, a, l) {
                            Promise.resolve(l).then(function(u) {
                                o({
                                    value: u,
                                    done: a
                                })
                            }, s)
                        }(a, l, (s = n[o](s)).done, s.value)
                    }
                    )
                }
            }
        }
        const Np = n=>n && "number" == typeof n.length && "function" != typeof n;
        function Op(n) {
            return me(n?.then)
        }
        function Rp(n) {
            return me(n[Ou])
        }
        function xp(n) {
            return Symbol.asyncIterator && me(n?.[Symbol.asyncIterator])
        }
        function Fp(n) {
            return new TypeError(`You provided ${null !== n && "object" == typeof n ? "an invalid object" : `'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
        }
        const Pp = function SI() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }();
        function kp(n) {
            return me(n?.[Pp])
        }
        function Lp(n) {
            return CI(this, arguments, function*() {
                const t = n.getReader();
                try {
                    for (; ; ) {
                        const {value: r, done: i} = yield Tr(t.read());
                        if (i)
                            return yield Tr(void 0);
                        yield yield Tr(r)
                    }
                } finally {
                    t.releaseLock()
                }
            })
        }
        function Vp(n) {
            return me(n?.getReader)
        }
        function Ht(n) {
            if (n instanceof xe)
                return n;
            if (null != n) {
                if (Rp(n))
                    return function II(n) {
                        return new xe(e=>{
                            const t = n[Ou]();
                            if (me(t.subscribe))
                                return t.subscribe(e);
                            throw new TypeError("Provided object does not correctly implement Symbol.observable")
                        }
                        )
                    }(n);
                if (Np(n))
                    return function TI(n) {
                        return new xe(e=>{
                            for (let t = 0; t < n.length && !e.closed; t++)
                                e.next(n[t]);
                            e.complete()
                        }
                        )
                    }(n);
                if (Op(n))
                    return function wI(n) {
                        return new xe(e=>{
                            n.then(t=>{
                                e.closed || (e.next(t),
                                e.complete())
                            }
                            , t=>e.error(t)).then(null, bp)
                        }
                        )
                    }(n);
                if (xp(n))
                    return Up(n);
                if (kp(n))
                    return function AI(n) {
                        return new xe(e=>{
                            for (const t of n)
                                if (e.next(t),
                                e.closed)
                                    return;
                            e.complete()
                        }
                        )
                    }(n);
                if (Vp(n))
                    return function MI(n) {
                        return Up(Lp(n))
                    }(n)
            }
            throw Fp(n)
        }
        function Up(n) {
            return new xe(e=>{
                (function NI(n, e) {
                    var t, r, i, o;
                    return function vI(n, e, t, r) {
                        return new (t || (t = Promise))(function(o, s) {
                            function a(c) {
                                try {
                                    u(r.next(c))
                                } catch (d) {
                                    s(d)
                                }
                            }
                            function l(c) {
                                try {
                                    u(r.throw(c))
                                } catch (d) {
                                    s(d)
                                }
                            }
                            function u(c) {
                                c.done ? o(c.value) : function i(o) {
                                    return o instanceof t ? o : new t(function(s) {
                                        s(o)
                                    }
                                    )
                                }(c.value).then(a, l)
                            }
                            u((r = r.apply(n, e || [])).next())
                        }
                        )
                    }(this, void 0, void 0, function*() {
                        try {
                            for (t = bI(n); !(r = yield t.next()).done; )
                                if (e.next(r.value),
                                e.closed)
                                    return
                        } catch (s) {
                            i = {
                                error: s
                            }
                        } finally {
                            try {
                                r && !r.done && (o = t.return) && (yield o.call(t))
                            } finally {
                                if (i)
                                    throw i.error
                            }
                        }
                        e.complete()
                    })
                }
                )(n, e).catch(t=>e.error(t))
            }
            )
        }
        function On(n, e, t, r=0, i=!1) {
            const o = e.schedule(function() {
                t(),
                i ? n.add(this.schedule(null, r)) : this.unsubscribe()
            }, r);
            if (n.add(o),
            !i)
                return o
        }
        function Qe(n, e, t=1 / 0) {
            return me(e) ? Qe((r,i)=>J((o,s)=>e(r, o, i, s))(Ht(n(r, i))), t) : ("number" == typeof e && (t = e),
            Pe((r,i)=>function OI(n, e, t, r, i, o, s, a) {
                const l = [];
                let u = 0
                  , c = 0
                  , d = !1;
                const h = ()=>{
                    d && !l.length && !u && e.complete()
                }
                  , f = g=>u < r ? p(g) : l.push(g)
                  , p = g=>{
                    o && e.next(g),
                    u++;
                    let y = !1;
                    Ht(t(g, c++)).subscribe(we(e, C=>{
                        i?.(C),
                        o ? f(C) : e.next(C)
                    }
                    , ()=>{
                        y = !0
                    }
                    , void 0, ()=>{
                        if (y)
                            try {
                                for (u--; l.length && u < r; ) {
                                    const C = l.shift();
                                    s ? On(e, s, ()=>p(C)) : p(C)
                                }
                                h()
                            } catch (C) {
                                e.error(C)
                            }
                    }
                    ))
                }
                ;
                return n.subscribe(we(e, f, ()=>{
                    d = !0,
                    h()
                }
                )),
                ()=>{
                    a?.()
                }
            }(r, i, n, t)))
        }
        function si(n=1 / 0) {
            return Qe(tr, n)
        }
        const Rn = new xe(n=>n.complete());
        function xu(n) {
            return n[n.length - 1]
        }
        function Bp(n) {
            return me(xu(n)) ? n.pop() : void 0
        }
        function mo(n) {
            return function xI(n) {
                return n && me(n.schedule)
            }(xu(n)) ? n.pop() : void 0
        }
        function Hp(n, e=0) {
            return Pe((t,r)=>{
                t.subscribe(we(r, i=>On(r, n, ()=>r.next(i), e), ()=>On(r, n, ()=>r.complete(), e), i=>On(r, n, ()=>r.error(i), e)))
            }
            )
        }
        function jp(n, e=0) {
            return Pe((t,r)=>{
                r.add(n.schedule(()=>t.subscribe(r), e))
            }
            )
        }
        function Gp(n, e) {
            if (!n)
                throw new Error("Iterable cannot be null");
            return new xe(t=>{
                On(t, e, ()=>{
                    const r = n[Symbol.asyncIterator]();
                    On(t, e, ()=>{
                        r.next().then(i=>{
                            i.done ? t.complete() : t.next(i.value)
                        }
                        )
                    }
                    , 0, !0)
                }
                )
            }
            )
        }
        function Le(n, e) {
            return e ? function BI(n, e) {
                if (null != n) {
                    if (Rp(n))
                        return function PI(n, e) {
                            return Ht(n).pipe(jp(e), Hp(e))
                        }(n, e);
                    if (Np(n))
                        return function LI(n, e) {
                            return new xe(t=>{
                                let r = 0;
                                return e.schedule(function() {
                                    r === n.length ? t.complete() : (t.next(n[r++]),
                                    t.closed || this.schedule())
                                })
                            }
                            )
                        }(n, e);
                    if (Op(n))
                        return function kI(n, e) {
                            return Ht(n).pipe(jp(e), Hp(e))
                        }(n, e);
                    if (xp(n))
                        return Gp(n, e);
                    if (kp(n))
                        return function VI(n, e) {
                            return new xe(t=>{
                                let r;
                                return On(t, e, ()=>{
                                    r = n[Pp](),
                                    On(t, e, ()=>{
                                        let i, o;
                                        try {
                                            ({value: i, done: o} = r.next())
                                        } catch (s) {
                                            return void t.error(s)
                                        }
                                        o ? t.complete() : t.next(i)
                                    }
                                    , 0, !0)
                                }
                                ),
                                ()=>me(r?.return) && r.return()
                            }
                            )
                        }(n, e);
                    if (Vp(n))
                        return function UI(n, e) {
                            return Gp(Lp(n), e)
                        }(n, e)
                }
                throw Fp(n)
            }(n, e) : Ht(n)
        }
        function go(...n) {
            const e = mo(n)
              , t = function FI(n, e) {
                return "number" == typeof xu(n) ? n.pop() : e
            }(n, 1 / 0)
              , r = n;
            return r.length ? 1 === r.length ? Ht(r[0]) : si(t)(Le(r, e)) : Rn
        }
        function Fu(n, e, ...t) {
            if (!0 === e)
                return void n();
            if (!1 === e)
                return;
            const r = new po({
                next: ()=>{
                    r.unsubscribe(),
                    n()
                }
            });
            return e(...t).subscribe(r)
        }
        function fe(n) {
            for (let e in n)
                if (n[e] === fe)
                    return e;
            throw Error("Could not find renamed property on target object.")
        }
        function Pu(n, e) {
            for (const t in e)
                e.hasOwnProperty(t) && !n.hasOwnProperty(t) && (n[t] = e[t])
        }
        function pe(n) {
            if ("string" == typeof n)
                return n;
            if (Array.isArray(n))
                return "[" + n.map(pe).join(", ") + "]";
            if (null == n)
                return "" + n;
            if (n.overriddenName)
                return `${n.overriddenName}`;
            if (n.name)
                return `${n.name}`;
            const e = n.toString();
            if (null == e)
                return "" + e;
            const t = e.indexOf("\n");
            return -1 === t ? e : e.substring(0, t)
        }
        function ku(n, e) {
            return null == n || "" === n ? null === e ? "" : e : null == e || "" === e ? n : n + " " + e
        }
        const jI = fe({
            __forward_ref__: fe
        });
        function ge(n) {
            return n.__forward_ref__ = ge,
            n.toString = function() {
                return pe(this())
            }
            ,
            n
        }
        function j(n) {
            return function Lu(n) {
                return "function" == typeof n && n.hasOwnProperty(jI) && n.__forward_ref__ === ge
            }(n) ? n() : n
        }
        class b extends Error {
            constructor(e, t) {
                super(function Ys(n, e) {
                    return `NG0${Math.abs(n)}${e ? ": " + e.trim() : ""}`
                }(e, t)),
                this.code = e
            }
        }
        function z(n) {
            return "string" == typeof n ? n : null == n ? "" : String(n)
        }
        function Zs(n, e) {
            throw new b(-201,!1)
        }
        function wt(n, e) {
            null == n && function ue(n, e, t, r) {
                throw new Error(`ASSERTION ERROR: ${n}` + (null == r ? "" : ` [Expected=> ${t} ${r} ${e} <=Actual]`))
            }(e, n, null, "!=")
        }
        function F(n) {
            return {
                token: n.token,
                providedIn: n.providedIn || null,
                factory: n.factory,
                value: void 0
            }
        }
        function ut(n) {
            return {
                providers: n.providers || [],
                imports: n.imports || []
            }
        }
        function Xs(n) {
            return $p(n, Js) || $p(n, Wp)
        }
        function $p(n, e) {
            return n.hasOwnProperty(e) ? n[e] : null
        }
        function zp(n) {
            return n && (n.hasOwnProperty(Vu) || n.hasOwnProperty(ZI)) ? n[Vu] : null
        }
        const Js = fe({
            \u0275prov: fe
        })
          , Vu = fe({
            \u0275inj: fe
        })
          , Wp = fe({
            ngInjectableDef: fe
        })
          , ZI = fe({
            ngInjectorDef: fe
        });
        var U = (()=>((U = U || {})[U.Default = 0] = "Default",
        U[U.Host = 1] = "Host",
        U[U.Self = 2] = "Self",
        U[U.SkipSelf = 4] = "SkipSelf",
        U[U.Optional = 8] = "Optional",
        U))();
        let Uu;
        function jt(n) {
            const e = Uu;
            return Uu = n,
            e
        }
        function qp(n, e, t) {
            const r = Xs(n);
            return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : t & U.Optional ? null : void 0 !== e ? e : void Zs(pe(n))
        }
        function nr(n) {
            return {
                toString: n
            }.toString()
        }
        var nn = (()=>((nn = nn || {})[nn.OnPush = 0] = "OnPush",
        nn[nn.Default = 1] = "Default",
        nn))()
          , rn = (()=>{
            return (n = rn || (rn = {}))[n.Emulated = 0] = "Emulated",
            n[n.None = 2] = "None",
            n[n.ShadowDom = 3] = "ShadowDom",
            rn;
            var n
        }
        )();
        const _e = (()=>typeof globalThis < "u" && globalThis || typeof global < "u" && global || typeof window < "u" && window || typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self)()
          , ai = {}
          , le = []
          , ea = fe({
            \u0275cmp: fe
        })
          , Bu = fe({
            \u0275dir: fe
        })
          , Hu = fe({
            \u0275pipe: fe
        })
          , Kp = fe({
            \u0275mod: fe
        })
          , Fn = fe({
            \u0275fac: fe
        })
          , _o = fe({
            __NG_ELEMENT_ID__: fe
        });
        let JI = 0;
        function li(n) {
            return nr(()=>{
                const t = !0 === n.standalone
                  , r = {}
                  , i = {
                    type: n.type,
                    providersResolver: null,
                    decls: n.decls,
                    vars: n.vars,
                    factory: null,
                    template: n.template || null,
                    consts: n.consts || null,
                    ngContentSelectors: n.ngContentSelectors,
                    hostBindings: n.hostBindings || null,
                    hostVars: n.hostVars || 0,
                    hostAttrs: n.hostAttrs || null,
                    contentQueries: n.contentQueries || null,
                    declaredInputs: r,
                    inputs: null,
                    outputs: null,
                    exportAs: n.exportAs || null,
                    onPush: n.changeDetection === nn.OnPush,
                    directiveDefs: null,
                    pipeDefs: null,
                    standalone: t,
                    dependencies: t && n.dependencies || null,
                    getStandaloneInjector: null,
                    selectors: n.selectors || le,
                    viewQuery: n.viewQuery || null,
                    features: n.features || null,
                    data: n.data || {},
                    encapsulation: n.encapsulation || rn.Emulated,
                    id: "c" + JI++,
                    styles: n.styles || le,
                    _: null,
                    setInput: null,
                    schemas: n.schemas || null,
                    tView: null
                }
                  , o = n.dependencies
                  , s = n.features;
                return i.inputs = Zp(n.inputs, r),
                i.outputs = Zp(n.outputs),
                s && s.forEach(a=>a(i)),
                i.directiveDefs = o ? ()=>("function" == typeof o ? o() : o).map(Qp).filter(Yp) : null,
                i.pipeDefs = o ? ()=>("function" == typeof o ? o() : o).map(dt).filter(Yp) : null,
                i
            }
            )
        }
        function Qp(n) {
            return ce(n) || ct(n)
        }
        function Yp(n) {
            return null !== n
        }
        function vt(n) {
            return nr(()=>({
                type: n.type,
                bootstrap: n.bootstrap || le,
                declarations: n.declarations || le,
                imports: n.imports || le,
                exports: n.exports || le,
                transitiveCompileScopes: null,
                schemas: n.schemas || null,
                id: n.id || null
            }))
        }
        function Zp(n, e) {
            if (null == n)
                return ai;
            const t = {};
            for (const r in n)
                if (n.hasOwnProperty(r)) {
                    let i = n[r]
                      , o = i;
                    Array.isArray(i) && (o = i[1],
                    i = i[0]),
                    t[i] = r,
                    e && (e[i] = o)
                }
            return t
        }
        const x = li;
        function ce(n) {
            return n[ea] || null
        }
        function ct(n) {
            return n[Bu] || null
        }
        function dt(n) {
            return n[Hu] || null
        }
        function At(n, e) {
            const t = n[Kp] || null;
            if (!t && !0 === e)
                throw new Error(`Type ${pe(n)} does not have '\u0275mod' property.`);
            return t
        }
        const Y = 11;
        function Ct(n) {
            return Array.isArray(n) && "object" == typeof n[1]
        }
        function sn(n) {
            return Array.isArray(n) && !0 === n[1]
        }
        function $u(n) {
            return 0 != (8 & n.flags)
        }
        function ia(n) {
            return 2 == (2 & n.flags)
        }
        function oa(n) {
            return 1 == (1 & n.flags)
        }
        function an(n) {
            return null !== n.template
        }
        function oT(n) {
            return 0 != (256 & n[2])
        }
        function Or(n, e) {
            return n.hasOwnProperty(Fn) ? n[Fn] : null
        }
        class lT {
            constructor(e, t, r) {
                this.previousValue = e,
                this.currentValue = t,
                this.firstChange = r
            }
            isFirstChange() {
                return this.firstChange
            }
        }
        function Nt() {
            return em
        }
        function em(n) {
            return n.type.prototype.ngOnChanges && (n.setInput = cT),
            uT
        }
        function uT() {
            const n = nm(this)
              , e = n?.current;
            if (e) {
                const t = n.previous;
                if (t === ai)
                    n.previous = e;
                else
                    for (let r in e)
                        t[r] = e[r];
                n.current = null,
                this.ngOnChanges(e)
            }
        }
        function cT(n, e, t, r) {
            const i = nm(n) || function dT(n, e) {
                return n[tm] = e
            }(n, {
                previous: ai,
                current: null
            })
              , o = i.current || (i.current = {})
              , s = i.previous
              , a = this.declaredInputs[t]
              , l = s[a];
            o[a] = new lT(l && l.currentValue,e,s === ai),
            n[r] = e
        }
        Nt.ngInherit = !0;
        const tm = "__ngSimpleChanges__";
        function nm(n) {
            return n[tm] || null
        }
        function Ve(n) {
            for (; Array.isArray(n); )
                n = n[0];
            return n
        }
        function sa(n, e) {
            return Ve(e[n])
        }
        function zt(n, e) {
            return Ve(e[n.index])
        }
        function Qu(n, e) {
            return n.data[e]
        }
        function Ot(n, e) {
            const t = e[n];
            return Ct(t) ? t : t[0]
        }
        function aa(n) {
            return 64 == (64 & n[2])
        }
        function rr(n, e) {
            return null == e ? null : n[e]
        }
        function rm(n) {
            n[18] = 0
        }
        function Yu(n, e) {
            n[5] += e;
            let t = n
              , r = n[3];
            for (; null !== r && (1 === e && 1 === t[5] || -1 === e && 0 === t[5]); )
                r[5] += e,
                t = r,
                r = r[3]
        }
        const G = {
            lFrame: fm(null),
            bindingsEnabled: !0
        };
        function om() {
            return G.bindingsEnabled
        }
        function D() {
            return G.lFrame.lView
        }
        function ne() {
            return G.lFrame.tView
        }
        function Rr(n) {
            return G.lFrame.contextLView = n,
            n[8]
        }
        function xr(n) {
            return G.lFrame.contextLView = null,
            n
        }
        function Ge() {
            let n = sm();
            for (; null !== n && 64 === n.type; )
                n = n.parent;
            return n
        }
        function sm() {
            return G.lFrame.currentTNode
        }
        function _n(n, e) {
            const t = G.lFrame;
            t.currentTNode = n,
            t.isParent = e
        }
        function Zu() {
            return G.lFrame.isParent
        }
        function Xu() {
            G.lFrame.isParent = !1
        }
        function pi() {
            return G.lFrame.bindingIndex++
        }
        function TT(n, e) {
            const t = G.lFrame;
            t.bindingIndex = t.bindingRootIndex = n,
            Ju(e)
        }
        function Ju(n) {
            G.lFrame.currentDirectiveIndex = n
        }
        function cm() {
            return G.lFrame.currentQueryIndex
        }
        function tc(n) {
            G.lFrame.currentQueryIndex = n
        }
        function AT(n) {
            const e = n[1];
            return 2 === e.type ? e.declTNode : 1 === e.type ? n[6] : null
        }
        function dm(n, e, t) {
            if (t & U.SkipSelf) {
                let i = e
                  , o = n;
                for (; !(i = i.parent,
                null !== i || t & U.Host || (i = AT(o),
                null === i || (o = o[15],
                10 & i.type))); )
                    ;
                if (null === i)
                    return !1;
                e = i,
                n = o
            }
            const r = G.lFrame = hm();
            return r.currentTNode = e,
            r.lView = n,
            !0
        }
        function nc(n) {
            const e = hm()
              , t = n[1];
            G.lFrame = e,
            e.currentTNode = t.firstChild,
            e.lView = n,
            e.tView = t,
            e.contextLView = n,
            e.bindingIndex = t.bindingStartIndex,
            e.inI18n = !1
        }
        function hm() {
            const n = G.lFrame
              , e = null === n ? null : n.child;
            return null === e ? fm(n) : e
        }
        function fm(n) {
            const e = {
                currentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: -1,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent: n,
                child: null,
                inI18n: !1
            };
            return null !== n && (n.child = e),
            e
        }
        function pm() {
            const n = G.lFrame;
            return G.lFrame = n.parent,
            n.currentTNode = null,
            n.lView = null,
            n
        }
        const mm = pm;
        function rc() {
            const n = pm();
            n.isParent = !0,
            n.tView = null,
            n.selectedIndex = -1,
            n.contextLView = null,
            n.elementDepthCount = 0,
            n.currentDirectiveIndex = -1,
            n.currentNamespace = null,
            n.bindingRootIndex = -1,
            n.bindingIndex = -1,
            n.currentQueryIndex = 0
        }
        function ft() {
            return G.lFrame.selectedIndex
        }
        function ir(n) {
            G.lFrame.selectedIndex = n
        }
        function Me() {
            const n = G.lFrame;
            return Qu(n.tView, n.selectedIndex)
        }
        function la(n, e) {
            for (let t = e.directiveStart, r = e.directiveEnd; t < r; t++) {
                const o = n.data[t].type.prototype
                  , {ngAfterContentInit: s, ngAfterContentChecked: a, ngAfterViewInit: l, ngAfterViewChecked: u, ngOnDestroy: c} = o;
                s && (n.contentHooks || (n.contentHooks = [])).push(-t, s),
                a && ((n.contentHooks || (n.contentHooks = [])).push(t, a),
                (n.contentCheckHooks || (n.contentCheckHooks = [])).push(t, a)),
                l && (n.viewHooks || (n.viewHooks = [])).push(-t, l),
                u && ((n.viewHooks || (n.viewHooks = [])).push(t, u),
                (n.viewCheckHooks || (n.viewCheckHooks = [])).push(t, u)),
                null != c && (n.destroyHooks || (n.destroyHooks = [])).push(t, c)
            }
        }
        function ua(n, e, t) {
            gm(n, e, 3, t)
        }
        function ca(n, e, t, r) {
            (3 & n[2]) === t && gm(n, e, t, r)
        }
        function ic(n, e) {
            let t = n[2];
            (3 & t) === e && (t &= 2047,
            t += 1,
            n[2] = t)
        }
        function gm(n, e, t, r) {
            const o = r ?? -1
              , s = e.length - 1;
            let a = 0;
            for (let l = void 0 !== r ? 65535 & n[18] : 0; l < s; l++)
                if ("number" == typeof e[l + 1]) {
                    if (a = e[l],
                    null != r && a >= r)
                        break
                } else
                    e[l] < 0 && (n[18] += 65536),
                    (a < o || -1 == o) && (LT(n, t, e, l),
                    n[18] = (4294901760 & n[18]) + l + 2),
                    l++
        }
        function LT(n, e, t, r) {
            const i = t[r] < 0
              , o = t[r + 1]
              , a = n[i ? -t[r] : t[r]];
            if (i) {
                if (n[2] >> 11 < n[18] >> 16 && (3 & n[2]) === e) {
                    n[2] += 2048;
                    try {
                        o.call(a)
                    } finally {}
                }
            } else
                try {
                    o.call(a)
                } finally {}
        }
        class Do {
            constructor(e, t, r) {
                this.factory = e,
                this.resolving = !1,
                this.canSeeViewProviders = t,
                this.injectImpl = r
            }
        }
        function da(n, e, t) {
            let r = 0;
            for (; r < t.length; ) {
                const i = t[r];
                if ("number" == typeof i) {
                    if (0 !== i)
                        break;
                    r++;
                    const o = t[r++]
                      , s = t[r++]
                      , a = t[r++];
                    n.setAttribute(e, s, a, o)
                } else {
                    const o = i
                      , s = t[++r];
                    ym(o) ? n.setProperty(e, o, s) : n.setAttribute(e, o, s),
                    r++
                }
            }
            return r
        }
        function _m(n) {
            return 3 === n || 4 === n || 6 === n
        }
        function ym(n) {
            return 64 === n.charCodeAt(0)
        }
        function ha(n, e) {
            if (null !== e && 0 !== e.length)
                if (null === n || 0 === n.length)
                    n = e.slice();
                else {
                    let t = -1;
                    for (let r = 0; r < e.length; r++) {
                        const i = e[r];
                        "number" == typeof i ? t = i : 0 === t || vm(n, t, i, null, -1 === t || 2 === t ? e[++r] : null)
                    }
                }
            return n
        }
        function vm(n, e, t, r, i) {
            let o = 0
              , s = n.length;
            if (-1 === e)
                s = -1;
            else
                for (; o < n.length; ) {
                    const a = n[o++];
                    if ("number" == typeof a) {
                        if (a === e) {
                            s = -1;
                            break
                        }
                        if (a > e) {
                            s = o - 1;
                            break
                        }
                    }
                }
            for (; o < n.length; ) {
                const a = n[o];
                if ("number" == typeof a)
                    break;
                if (a === t) {
                    if (null === r)
                        return void (null !== i && (n[o + 1] = i));
                    if (r === n[o + 1])
                        return void (n[o + 2] = i)
                }
                o++,
                null !== r && o++,
                null !== i && o++
            }
            -1 !== s && (n.splice(s, 0, e),
            o = s + 1),
            n.splice(o++, 0, t),
            null !== r && n.splice(o++, 0, r),
            null !== i && n.splice(o++, 0, i)
        }
        function Em(n) {
            return -1 !== n
        }
        function mi(n) {
            return 32767 & n
        }
        function gi(n, e) {
            let t = function jT(n) {
                return n >> 16
            }(n)
              , r = e;
            for (; t > 0; )
                r = r[15],
                t--;
            return r
        }
        let sc = !0;
        function fa(n) {
            const e = sc;
            return sc = n,
            e
        }
        let GT = 0;
        const yn = {};
        function Io(n, e) {
            const t = lc(n, e);
            if (-1 !== t)
                return t;
            const r = e[1];
            r.firstCreatePass && (n.injectorIndex = e.length,
            ac(r.data, n),
            ac(e, null),
            ac(r.blueprint, null));
            const i = pa(n, e)
              , o = n.injectorIndex;
            if (Em(i)) {
                const s = mi(i)
                  , a = gi(i, e)
                  , l = a[1].data;
                for (let u = 0; u < 8; u++)
                    e[o + u] = a[s + u] | l[s + u]
            }
            return e[o + 8] = i,
            o
        }
        function ac(n, e) {
            n.push(0, 0, 0, 0, 0, 0, 0, 0, e)
        }
        function lc(n, e) {
            return -1 === n.injectorIndex || n.parent && n.parent.injectorIndex === n.injectorIndex || null === e[n.injectorIndex + 8] ? -1 : n.injectorIndex
        }
        function pa(n, e) {
            if (n.parent && -1 !== n.parent.injectorIndex)
                return n.parent.injectorIndex;
            let t = 0
              , r = null
              , i = e;
            for (; null !== i; ) {
                if (r = Mm(i),
                null === r)
                    return -1;
                if (t++,
                i = i[15],
                -1 !== r.injectorIndex)
                    return r.injectorIndex | t << 16
            }
            return -1
        }
        function ma(n, e, t) {
            !function $T(n, e, t) {
                let r;
                "string" == typeof t ? r = t.charCodeAt(0) || 0 : t.hasOwnProperty(_o) && (r = t[_o]),
                null == r && (r = t[_o] = GT++);
                const i = 255 & r;
                e.data[n + (i >> 5)] |= 1 << i
            }(n, e, t)
        }
        function Dm(n, e, t) {
            if (t & U.Optional || void 0 !== n)
                return n;
            Zs()
        }
        function Sm(n, e, t, r) {
            if (t & U.Optional && void 0 === r && (r = null),
            0 == (t & (U.Self | U.Host))) {
                const i = n[9]
                  , o = jt(void 0);
                try {
                    return i ? i.get(e, r, t & U.Optional) : qp(e, r, t & U.Optional)
                } finally {
                    jt(o)
                }
            }
            return Dm(r, 0, t)
        }
        function Im(n, e, t, r=U.Default, i) {
            if (null !== n) {
                if (1024 & e[2]) {
                    const s = function QT(n, e, t, r, i) {
                        let o = n
                          , s = e;
                        for (; null !== o && null !== s && 1024 & s[2] && !(256 & s[2]); ) {
                            const a = Tm(o, s, t, r | U.Self, yn);
                            if (a !== yn)
                                return a;
                            let l = o.parent;
                            if (!l) {
                                const u = s[21];
                                if (u) {
                                    const c = u.get(t, yn, r);
                                    if (c !== yn)
                                        return c
                                }
                                l = Mm(s),
                                s = s[15]
                            }
                            o = l
                        }
                        return i
                    }(n, e, t, r, yn);
                    if (s !== yn)
                        return s
                }
                const o = Tm(n, e, t, r, yn);
                if (o !== yn)
                    return o
            }
            return Sm(e, t, r, i)
        }
        function Tm(n, e, t, r, i) {
            const o = function qT(n) {
                if ("string" == typeof n)
                    return n.charCodeAt(0) || 0;
                const e = n.hasOwnProperty(_o) ? n[_o] : void 0;
                return "number" == typeof e ? e >= 0 ? 255 & e : KT : e
            }(t);
            if ("function" == typeof o) {
                if (!dm(e, n, r))
                    return r & U.Host ? Dm(i, 0, r) : Sm(e, t, r, i);
                try {
                    const s = o(r);
                    if (null != s || r & U.Optional)
                        return s;
                    Zs()
                } finally {
                    mm()
                }
            } else if ("number" == typeof o) {
                let s = null
                  , a = lc(n, e)
                  , l = -1
                  , u = r & U.Host ? e[16][6] : null;
                for ((-1 === a || r & U.SkipSelf) && (l = -1 === a ? pa(n, e) : e[a + 8],
                -1 !== l && Am(r, !1) ? (s = e[1],
                a = mi(l),
                e = gi(l, e)) : a = -1); -1 !== a; ) {
                    const c = e[1];
                    if (wm(o, a, c.data)) {
                        const d = WT(a, e, t, s, r, u);
                        if (d !== yn)
                            return d
                    }
                    l = e[a + 8],
                    -1 !== l && Am(r, e[1].data[a + 8] === u) && wm(o, a, e) ? (s = c,
                    a = mi(l),
                    e = gi(l, e)) : a = -1
                }
            }
            return i
        }
        function WT(n, e, t, r, i, o) {
            const s = e[1]
              , a = s.data[n + 8]
              , c = ga(a, s, t, null == r ? ia(a) && sc : r != s && 0 != (3 & a.type), i & U.Host && o === a);
            return null !== c ? To(e, s, c, a) : yn
        }
        function ga(n, e, t, r, i) {
            const o = n.providerIndexes
              , s = e.data
              , a = 1048575 & o
              , l = n.directiveStart
              , c = o >> 20
              , h = i ? a + c : n.directiveEnd;
            for (let f = r ? a : a + c; f < h; f++) {
                const p = s[f];
                if (f < l && t === p || f >= l && p.type === t)
                    return f
            }
            if (i) {
                const f = s[l];
                if (f && an(f) && f.type === t)
                    return l
            }
            return null
        }
        function To(n, e, t, r) {
            let i = n[t];
            const o = e.data;
            if (function VT(n) {
                return n instanceof Do
            }(i)) {
                const s = i;
                s.resolving && function GI(n, e) {
                    const t = e ? `. Dependency path: ${e.join(" > ")} > ${n}` : "";
                    throw new b(-200,`Circular dependency in DI detected for ${n}${t}`)
                }(function ae(n) {
                    return "function" == typeof n ? n.name || n.toString() : "object" == typeof n && null != n && "function" == typeof n.type ? n.type.name || n.type.toString() : z(n)
                }(o[t]));
                const a = fa(s.canSeeViewProviders);
                s.resolving = !0;
                const l = s.injectImpl ? jt(s.injectImpl) : null;
                dm(n, r, U.Default);
                try {
                    i = n[t] = s.factory(void 0, o, n, r),
                    e.firstCreatePass && t >= r.directiveStart && function kT(n, e, t) {
                        const {ngOnChanges: r, ngOnInit: i, ngDoCheck: o} = e.type.prototype;
                        if (r) {
                            const s = em(e);
                            (t.preOrderHooks || (t.preOrderHooks = [])).push(n, s),
                            (t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n, s)
                        }
                        i && (t.preOrderHooks || (t.preOrderHooks = [])).push(0 - n, i),
                        o && ((t.preOrderHooks || (t.preOrderHooks = [])).push(n, o),
                        (t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n, o))
                    }(t, o[t], e)
                } finally {
                    null !== l && jt(l),
                    fa(a),
                    s.resolving = !1,
                    mm()
                }
            }
            return i
        }
        function wm(n, e, t) {
            return !!(t[e + (n >> 5)] & 1 << n)
        }
        function Am(n, e) {
            return !(n & U.Self || n & U.Host && e)
        }
        class _i {
            constructor(e, t) {
                this._tNode = e,
                this._lView = t
            }
            get(e, t, r) {
                return Im(this._tNode, this._lView, e, r, t)
            }
        }
        function KT() {
            return new _i(Ge(),D())
        }
        function Mm(n) {
            const e = n[1]
              , t = e.type;
            return 2 === t ? e.declTNode : 1 === t ? n[6] : null
        }
        function yi(n) {
            return function zT(n, e) {
                if ("class" === e)
                    return n.classes;
                if ("style" === e)
                    return n.styles;
                const t = n.attrs;
                if (t) {
                    const r = t.length;
                    let i = 0;
                    for (; i < r; ) {
                        const o = t[i];
                        if (_m(o))
                            break;
                        if (0 === o)
                            i += 2;
                        else if ("number" == typeof o)
                            for (i++; i < r && "string" == typeof t[i]; )
                                i++;
                        else {
                            if (o === e)
                                return t[i + 1];
                            i += 2
                        }
                    }
                }
                return null
            }(Ge(), n)
        }
        const Ei = "__parameters__";
        function bi(n, e, t) {
            return nr(()=>{
                const r = function cc(n) {
                    return function(...t) {
                        if (n) {
                            const r = n(...t);
                            for (const i in r)
                                this[i] = r[i]
                        }
                    }
                }(e);
                function i(...o) {
                    if (this instanceof i)
                        return r.apply(this, o),
                        this;
                    const s = new i(...o);
                    return a.annotation = s,
                    a;
                    function a(l, u, c) {
                        const d = l.hasOwnProperty(Ei) ? l[Ei] : Object.defineProperty(l, Ei, {
                            value: []
                        })[Ei];
                        for (; d.length <= c; )
                            d.push(null);
                        return (d[c] = d[c] || []).push(s),
                        l
                    }
                }
                return t && (i.prototype = Object.create(t.prototype)),
                i.prototype.ngMetadataName = n,
                i.annotationCls = i,
                i
            }
            )
        }
        class A {
            constructor(e, t) {
                this._desc = e,
                this.ngMetadataName = "InjectionToken",
                this.\u0275prov = void 0,
                "number" == typeof t ? this.__NG_ELEMENT_ID__ = t : void 0 !== t && (this.\u0275prov = F({
                    token: this,
                    providedIn: t.providedIn || "root",
                    factory: t.factory
                }))
            }
            get multi() {
                return this
            }
            toString() {
                return `InjectionToken ${this._desc}`
            }
        }
        function Rt(n, e) {
            void 0 === e && (e = n);
            for (let t = 0; t < n.length; t++) {
                let r = n[t];
                Array.isArray(r) ? (e === n && (e = n.slice(0, t)),
                Rt(r, e)) : e !== n && e.push(r)
            }
            return e
        }
        function Ln(n, e) {
            n.forEach(t=>Array.isArray(t) ? Ln(t, e) : e(t))
        }
        function Om(n, e, t) {
            e >= n.length ? n.push(t) : n.splice(e, 0, t)
        }
        function _a(n, e) {
            return e >= n.length - 1 ? n.pop() : n.splice(e, 1)[0]
        }
        function Mo(n, e) {
            const t = [];
            for (let r = 0; r < n; r++)
                t.push(e);
            return t
        }
        function xt(n, e, t) {
            let r = Di(n, e);
            return r >= 0 ? n[1 | r] = t : (r = ~r,
            function JT(n, e, t, r) {
                let i = n.length;
                if (i == e)
                    n.push(t, r);
                else if (1 === i)
                    n.push(r, n[0]),
                    n[0] = t;
                else {
                    for (i--,
                    n.push(n[i - 1], n[i]); i > e; )
                        n[i] = n[i - 2],
                        i--;
                    n[e] = t,
                    n[e + 1] = r
                }
            }(n, r, e, t)),
            r
        }
        function hc(n, e) {
            const t = Di(n, e);
            if (t >= 0)
                return n[1 | t]
        }
        function Di(n, e) {
            return function Fm(n, e, t) {
                let r = 0
                  , i = n.length >> t;
                for (; i !== r; ) {
                    const o = r + (i - r >> 1)
                      , s = n[o << t];
                    if (e === s)
                        return o << t;
                    s > e ? i = o : r = o + 1
                }
                return ~(i << t)
            }(n, e, 1)
        }
        const No = {}
          , pc = "__NG_DI_FLAG__"
          , va = "ngTempTokenPath"
          , aw = /\n/gm
          , Pm = "__source";
        let Oo;
        function Si(n) {
            const e = Oo;
            return Oo = n,
            e
        }
        function uw(n, e=U.Default) {
            if (void 0 === Oo)
                throw new b(-203,!1);
            return null === Oo ? qp(n, void 0, e) : Oo.get(n, e & U.Optional ? null : void 0, e)
        }
        function T(n, e=U.Default) {
            return (function XI() {
                return Uu
            }() || uw)(j(n), e)
        }
        function be(n, e=U.Default) {
            return "number" != typeof e && (e = 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)),
            T(n, e)
        }
        function mc(n) {
            const e = [];
            for (let t = 0; t < n.length; t++) {
                const r = j(n[t]);
                if (Array.isArray(r)) {
                    if (0 === r.length)
                        throw new b(900,!1);
                    let i, o = U.Default;
                    for (let s = 0; s < r.length; s++) {
                        const a = r[s]
                          , l = cw(a);
                        "number" == typeof l ? -1 === l ? i = a.token : o |= l : i = a
                    }
                    e.push(T(i, o))
                } else
                    e.push(T(r))
            }
            return e
        }
        function Ro(n, e) {
            return n[pc] = e,
            n.prototype[pc] = e,
            n
        }
        function cw(n) {
            return n[pc]
        }
        const xo = Ro(bi("Optional"), 8)
          , Fo = Ro(bi("SkipSelf"), 4);
        let _c;
        const Ic = new A("ENVIRONMENT_INITIALIZER")
          , ng = new A("INJECTOR",-1)
          , rg = new A("INJECTOR_DEF_TYPES");
        class ig {
            get(e, t=No) {
                if (t === No) {
                    const r = new Error(`NullInjectorError: No provider for ${pe(e)}!`);
                    throw r.name = "NullInjectorError",
                    r
                }
                return t
            }
        }
        function Kw(...n) {
            return {
                \u0275providers: og(0, n)
            }
        }
        function og(n, ...e) {
            const t = []
              , r = new Set;
            let i;
            return Ln(e, o=>{
                const s = o;
                Tc(s, t, [], r) && (i || (i = []),
                i.push(s))
            }
            ),
            void 0 !== i && sg(i, t),
            t
        }
        function sg(n, e) {
            for (let t = 0; t < n.length; t++) {
                const {providers: i} = n[t];
                Ln(i, o=>{
                    e.push(o)
                }
                )
            }
        }
        function Tc(n, e, t, r) {
            if (!(n = j(n)))
                return !1;
            let i = null
              , o = zp(n);
            const s = !o && ce(n);
            if (o || s) {
                if (s && !s.standalone)
                    return !1;
                i = n
            } else {
                const l = n.ngModule;
                if (o = zp(l),
                !o)
                    return !1;
                i = l
            }
            const a = r.has(i);
            if (s) {
                if (a)
                    return !1;
                if (r.add(i),
                s.dependencies) {
                    const l = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                    for (const u of l)
                        Tc(u, e, t, r)
                }
            } else {
                if (!o)
                    return !1;
                {
                    if (null != o.imports && !a) {
                        let u;
                        r.add(i);
                        try {
                            Ln(o.imports, c=>{
                                Tc(c, e, t, r) && (u || (u = []),
                                u.push(c))
                            }
                            )
                        } finally {}
                        void 0 !== u && sg(u, e)
                    }
                    if (!a) {
                        const u = Or(i) || (()=>new i);
                        e.push({
                            provide: i,
                            useFactory: u,
                            deps: le
                        }, {
                            provide: rg,
                            useValue: i,
                            multi: !0
                        }, {
                            provide: Ic,
                            useValue: ()=>T(i),
                            multi: !0
                        })
                    }
                    const l = o.providers;
                    null == l || a || Ln(l, c=>{
                        e.push(c)
                    }
                    )
                }
            }
            return i !== n && void 0 !== n.providers
        }
        const Qw = fe({
            provide: String,
            useValue: fe
        });
        function wc(n) {
            return null !== n && "object" == typeof n && Qw in n
        }
        function Fr(n) {
            return "function" == typeof n
        }
        const Ac = new A("Set Injector scope.")
          , Ia = {}
          , Zw = {};
        let Mc;
        function Ta() {
            return void 0 === Mc && (Mc = new ig),
            Mc
        }
        class ar {
        }
        class ug extends ar {
            constructor(e, t, r, i) {
                super(),
                this.parent = t,
                this.source = r,
                this.scopes = i,
                this.records = new Map,
                this._ngOnDestroyHooks = new Set,
                this._onDestroyHooks = [],
                this._destroyed = !1,
                Oc(e, s=>this.processProvider(s)),
                this.records.set(ng, wi(void 0, this)),
                i.has("environment") && this.records.set(ar, wi(void 0, this));
                const o = this.records.get(Ac);
                null != o && "string" == typeof o.value && this.scopes.add(o.value),
                this.injectorDefTypes = new Set(this.get(rg.multi, le, U.Self))
            }
            get destroyed() {
                return this._destroyed
            }
            destroy() {
                this.assertNotDestroyed(),
                this._destroyed = !0;
                try {
                    for (const e of this._ngOnDestroyHooks)
                        e.ngOnDestroy();
                    for (const e of this._onDestroyHooks)
                        e()
                } finally {
                    this.records.clear(),
                    this._ngOnDestroyHooks.clear(),
                    this.injectorDefTypes.clear(),
                    this._onDestroyHooks.length = 0
                }
            }
            onDestroy(e) {
                this._onDestroyHooks.push(e)
            }
            runInContext(e) {
                this.assertNotDestroyed();
                const t = Si(this)
                  , r = jt(void 0);
                try {
                    return e()
                } finally {
                    Si(t),
                    jt(r)
                }
            }
            get(e, t=No, r=U.Default) {
                this.assertNotDestroyed();
                const i = Si(this)
                  , o = jt(void 0);
                try {
                    if (!(r & U.SkipSelf)) {
                        let a = this.records.get(e);
                        if (void 0 === a) {
                            const l = function nA(n) {
                                return "function" == typeof n || "object" == typeof n && n instanceof A
                            }(e) && Xs(e);
                            a = l && this.injectableDefInScope(l) ? wi(Nc(e), Ia) : null,
                            this.records.set(e, a)
                        }
                        if (null != a)
                            return this.hydrate(e, a)
                    }
                    return (r & U.Self ? Ta() : this.parent).get(e, t = r & U.Optional && t === No ? null : t)
                } catch (s) {
                    if ("NullInjectorError" === s.name) {
                        if ((s[va] = s[va] || []).unshift(pe(e)),
                        i)
                            throw s;
                        return function dw(n, e, t, r) {
                            const i = n[va];
                            throw e[Pm] && i.unshift(e[Pm]),
                            n.message = function hw(n, e, t, r=null) {
                                n = n && "\n" === n.charAt(0) && "\u0275" == n.charAt(1) ? n.slice(2) : n;
                                let i = pe(e);
                                if (Array.isArray(e))
                                    i = e.map(pe).join(" -> ");
                                else if ("object" == typeof e) {
                                    let o = [];
                                    for (let s in e)
                                        if (e.hasOwnProperty(s)) {
                                            let a = e[s];
                                            o.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : pe(a)))
                                        }
                                    i = `{${o.join(", ")}}`
                                }
                                return `${t}${r ? "(" + r + ")" : ""}[${i}]: ${n.replace(aw, "\n  ")}`
                            }("\n" + n.message, i, t, r),
                            n.ngTokenPath = i,
                            n[va] = null,
                            n
                        }(s, e, "R3InjectorError", this.source)
                    }
                    throw s
                } finally {
                    jt(o),
                    Si(i)
                }
            }
            resolveInjectorInitializers() {
                const e = Si(this)
                  , t = jt(void 0);
                try {
                    const r = this.get(Ic.multi, le, U.Self);
                    for (const i of r)
                        i()
                } finally {
                    Si(e),
                    jt(t)
                }
            }
            toString() {
                const e = []
                  , t = this.records;
                for (const r of t.keys())
                    e.push(pe(r));
                return `R3Injector[${e.join(", ")}]`
            }
            assertNotDestroyed() {
                if (this._destroyed)
                    throw new b(205,!1)
            }
            processProvider(e) {
                let t = Fr(e = j(e)) ? e : j(e && e.provide);
                const r = function Jw(n) {
                    return wc(n) ? wi(void 0, n.useValue) : wi(cg(n), Ia)
                }(e);
                if (Fr(e) || !0 !== e.multi)
                    this.records.get(t);
                else {
                    let i = this.records.get(t);
                    i || (i = wi(void 0, Ia, !0),
                    i.factory = ()=>mc(i.multi),
                    this.records.set(t, i)),
                    t = e,
                    i.multi.push(e)
                }
                this.records.set(t, r)
            }
            hydrate(e, t) {
                return t.value === Ia && (t.value = Zw,
                t.value = t.factory()),
                "object" == typeof t.value && t.value && function tA(n) {
                    return null !== n && "object" == typeof n && "function" == typeof n.ngOnDestroy
                }(t.value) && this._ngOnDestroyHooks.add(t.value),
                t.value
            }
            injectableDefInScope(e) {
                if (!e.providedIn)
                    return !1;
                const t = j(e.providedIn);
                return "string" == typeof t ? "any" === t || this.scopes.has(t) : this.injectorDefTypes.has(t)
            }
        }
        function Nc(n) {
            const e = Xs(n)
              , t = null !== e ? e.factory : Or(n);
            if (null !== t)
                return t;
            if (n instanceof A)
                throw new b(204,!1);
            if (n instanceof Function)
                return function Xw(n) {
                    const e = n.length;
                    if (e > 0)
                        throw Mo(e, "?"),
                        new b(204,!1);
                    const t = function QI(n) {
                        const e = n && (n[Js] || n[Wp]);
                        if (e) {
                            const t = function YI(n) {
                                if (n.hasOwnProperty("name"))
                                    return n.name;
                                const e = ("" + n).match(/^function\s*([^\s(]+)/);
                                return null === e ? "" : e[1]
                            }(n);
                            return console.warn(`DEPRECATED: DI is instantiating a token "${t}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${t}" class.`),
                            e
                        }
                        return null
                    }(n);
                    return null !== t ? ()=>t.factory(n) : ()=>new n
                }(n);
            throw new b(204,!1)
        }
        function cg(n, e, t) {
            let r;
            if (Fr(n)) {
                const i = j(n);
                return Or(i) || Nc(i)
            }
            if (wc(n))
                r = ()=>j(n.useValue);
            else if (function lg(n) {
                return !(!n || !n.useFactory)
            }(n))
                r = ()=>n.useFactory(...mc(n.deps || []));
            else if (function ag(n) {
                return !(!n || !n.useExisting)
            }(n))
                r = ()=>T(j(n.useExisting));
            else {
                const i = j(n && (n.useClass || n.provide));
                if (!function eA(n) {
                    return !!n.deps
                }(n))
                    return Or(i) || Nc(i);
                r = ()=>new i(...mc(n.deps))
            }
            return r
        }
        function wi(n, e, t=!1) {
            return {
                factory: n,
                value: e,
                multi: t ? [] : void 0
            }
        }
        function rA(n) {
            return !!n.\u0275providers
        }
        function Oc(n, e) {
            for (const t of n)
                Array.isArray(t) ? Oc(t, e) : rA(t) ? Oc(t.\u0275providers, e) : e(t)
        }
        class dg {
        }
        class sA {
            resolveComponentFactory(e) {
                throw function oA(n) {
                    const e = Error(`No component factory found for ${pe(n)}. Did you add it to @NgModule.entryComponents?`);
                    return e.ngComponent = n,
                    e
                }(e)
            }
        }
        let Bo = (()=>{
            class n {
            }
            return n.NULL = new sA,
            n
        }
        )();
        function aA() {
            return Ai(Ge(), D())
        }
        function Ai(n, e) {
            return new Be(zt(n, e))
        }
        let Be = (()=>{
            class n {
                constructor(t) {
                    this.nativeElement = t
                }
            }
            return n.__NG_ELEMENT_ID__ = aA,
            n
        }
        )();
        function lA(n) {
            return n instanceof Be ? n.nativeElement : n
        }
        class Ho {
        }
        let cA = (()=>{
            class n {
            }
            return n.\u0275prov = F({
                token: n,
                providedIn: "root",
                factory: ()=>null
            }),
            n
        }
        )();
        class Pr {
            constructor(e) {
                this.full = e,
                this.major = e.split(".")[0],
                this.minor = e.split(".")[1],
                this.patch = e.split(".").slice(2).join(".")
            }
        }
        const dA = new Pr("14.2.9")
          , Rc = {};
        function Lc(n) {
            return n.ngOriginalError
        }
        class Mi {
            constructor() {
                this._console = console
            }
            handleError(e) {
                const t = this._findOriginalError(e);
                this._console.error("ERROR", e),
                t && this._console.error("ORIGINAL ERROR", t)
            }
            _findOriginalError(e) {
                let t = e && Lc(e);
                for (; t && Lc(t); )
                    t = Lc(t);
                return t || null
            }
        }
        const Vc = new Map;
        let DA = 0;
        const Bc = "__ngContext__";
        function rt(n, e) {
            Ct(e) ? (n[Bc] = e[20],
            function IA(n) {
                Vc.set(n[20], n)
            }(e)) : n[Bc] = e
        }
        function Bn(n) {
            return n instanceof Function ? n() : n
        }
        var bt = (()=>((bt = bt || {})[bt.Important = 1] = "Important",
        bt[bt.DashCase = 2] = "DashCase",
        bt))();
        function jc(n, e) {
            return undefined(n, e)
        }
        function Go(n) {
            const e = n[3];
            return sn(e) ? e[3] : e
        }
        function Gc(n) {
            return Tg(n[13])
        }
        function $c(n) {
            return Tg(n[4])
        }
        function Tg(n) {
            for (; null !== n && !sn(n); )
                n = n[4];
            return n
        }
        function Oi(n, e, t, r, i) {
            if (null != r) {
                let o, s = !1;
                sn(r) ? o = r : Ct(r) && (s = !0,
                r = r[0]);
                const a = Ve(r);
                0 === n && null !== t ? null == i ? Rg(e, t, a) : kr(e, t, a, i || null, !0) : 1 === n && null !== t ? kr(e, t, a, i || null, !0) : 2 === n ? function Ug(n, e, t) {
                    const r = wa(n, e);
                    r && function XA(n, e, t, r) {
                        n.removeChild(e, t, r)
                    }(n, r, e, t)
                }(e, a, s) : 3 === n && e.destroyNode(a),
                null != o && function tM(n, e, t, r, i) {
                    const o = t[7];
                    o !== Ve(t) && Oi(e, n, r, o, i);
                    for (let a = 10; a < t.length; a++) {
                        const l = t[a];
                        $o(l[1], l, n, e, r, o)
                    }
                }(e, n, o, t, i)
            }
        }
        function Wc(n, e, t) {
            return n.createElement(e, t)
        }
        function Ag(n, e) {
            const t = n[9]
              , r = t.indexOf(e)
              , i = e[3];
            512 & e[2] && (e[2] &= -513,
            Yu(i, -1)),
            t.splice(r, 1)
        }
        function qc(n, e) {
            if (n.length <= 10)
                return;
            const t = 10 + e
              , r = n[t];
            if (r) {
                const i = r[17];
                null !== i && i !== n && Ag(i, r),
                e > 0 && (n[t - 1][4] = r[4]);
                const o = _a(n, 10 + e);
                !function $A(n, e) {
                    $o(n, e, e[Y], 2, null, null),
                    e[0] = null,
                    e[6] = null
                }(r[1], r);
                const s = o[19];
                null !== s && s.detachView(o[1]),
                r[3] = null,
                r[4] = null,
                r[2] &= -65
            }
            return r
        }
        function Mg(n, e) {
            if (!(128 & e[2])) {
                const t = e[Y];
                t.destroyNode && $o(n, e, t, 3, null, null),
                function qA(n) {
                    let e = n[13];
                    if (!e)
                        return Kc(n[1], n);
                    for (; e; ) {
                        let t = null;
                        if (Ct(e))
                            t = e[13];
                        else {
                            const r = e[10];
                            r && (t = r)
                        }
                        if (!t) {
                            for (; e && !e[4] && e !== n; )
                                Ct(e) && Kc(e[1], e),
                                e = e[3];
                            null === e && (e = n),
                            Ct(e) && Kc(e[1], e),
                            t = e && e[4]
                        }
                        e = t
                    }
                }(e)
            }
        }
        function Kc(n, e) {
            if (!(128 & e[2])) {
                e[2] &= -65,
                e[2] |= 128,
                function ZA(n, e) {
                    let t;
                    if (null != n && null != (t = n.destroyHooks))
                        for (let r = 0; r < t.length; r += 2) {
                            const i = e[t[r]];
                            if (!(i instanceof Do)) {
                                const o = t[r + 1];
                                if (Array.isArray(o))
                                    for (let s = 0; s < o.length; s += 2) {
                                        const a = i[o[s]]
                                          , l = o[s + 1];
                                        try {
                                            l.call(a)
                                        } finally {}
                                    }
                                else
                                    try {
                                        o.call(i)
                                    } finally {}
                            }
                        }
                }(n, e),
                function YA(n, e) {
                    const t = n.cleanup
                      , r = e[7];
                    let i = -1;
                    if (null !== t)
                        for (let o = 0; o < t.length - 1; o += 2)
                            if ("string" == typeof t[o]) {
                                const s = t[o + 1]
                                  , a = "function" == typeof s ? s(e) : Ve(e[s])
                                  , l = r[i = t[o + 2]]
                                  , u = t[o + 3];
                                "boolean" == typeof u ? a.removeEventListener(t[o], l, u) : u >= 0 ? r[i = u]() : r[i = -u].unsubscribe(),
                                o += 2
                            } else {
                                const s = r[i = t[o + 1]];
                                t[o].call(s)
                            }
                    if (null !== r) {
                        for (let o = i + 1; o < r.length; o++)
                            (0,
                            r[o])();
                        e[7] = null
                    }
                }(n, e),
                1 === e[1].type && e[Y].destroy();
                const t = e[17];
                if (null !== t && sn(e[3])) {
                    t !== e[3] && Ag(t, e);
                    const r = e[19];
                    null !== r && r.detachView(n)
                }
                !function TA(n) {
                    Vc.delete(n[20])
                }(e)
            }
        }
        function Ng(n, e, t) {
            return function Og(n, e, t) {
                let r = e;
                for (; null !== r && 40 & r.type; )
                    r = (e = r).parent;
                if (null === r)
                    return t[0];
                if (2 & r.flags) {
                    const i = n.data[r.directiveStart].encapsulation;
                    if (i === rn.None || i === rn.Emulated)
                        return null
                }
                return zt(r, t)
            }(n, e.parent, t)
        }
        function kr(n, e, t, r, i) {
            n.insertBefore(e, t, r, i)
        }
        function Rg(n, e, t) {
            n.appendChild(e, t)
        }
        function xg(n, e, t, r, i) {
            null !== r ? kr(n, e, t, r, i) : Rg(n, e, t)
        }
        function wa(n, e) {
            return n.parentNode(e)
        }
        function Fg(n, e, t) {
            return kg(n, e, t)
        }
        let kg = function Pg(n, e, t) {
            return 40 & n.type ? zt(n, t) : null
        };
        function Aa(n, e, t, r) {
            const i = Ng(n, r, e)
              , o = e[Y]
              , a = Fg(r.parent || e[6], r, e);
            if (null != i)
                if (Array.isArray(t))
                    for (let l = 0; l < t.length; l++)
                        xg(o, i, t[l], a, !1);
                else
                    xg(o, i, t, a, !1)
        }
        function Ma(n, e) {
            if (null !== e) {
                const t = e.type;
                if (3 & t)
                    return zt(e, n);
                if (4 & t)
                    return Yc(-1, n[e.index]);
                if (8 & t) {
                    const r = e.child;
                    if (null !== r)
                        return Ma(n, r);
                    {
                        const i = n[e.index];
                        return sn(i) ? Yc(-1, i) : Ve(i)
                    }
                }
                if (32 & t)
                    return jc(e, n)() || Ve(n[e.index]);
                {
                    const r = Vg(n, e);
                    return null !== r ? Array.isArray(r) ? r[0] : Ma(Go(n[16]), r) : Ma(n, e.next)
                }
            }
            return null
        }
        function Vg(n, e) {
            return null !== e ? n[16][6].projection[e.projection] : null
        }
        function Yc(n, e) {
            const t = 10 + n + 1;
            if (t < e.length) {
                const r = e[t]
                  , i = r[1].firstChild;
                if (null !== i)
                    return Ma(r, i)
            }
            return e[7]
        }
        function Zc(n, e, t, r, i, o, s) {
            for (; null != t; ) {
                const a = r[t.index]
                  , l = t.type;
                if (s && 0 === e && (a && rt(Ve(a), r),
                t.flags |= 4),
                64 != (64 & t.flags))
                    if (8 & l)
                        Zc(n, e, t.child, r, i, o, !1),
                        Oi(e, n, i, a, o);
                    else if (32 & l) {
                        const u = jc(t, r);
                        let c;
                        for (; c = u(); )
                            Oi(e, n, i, c, o);
                        Oi(e, n, i, a, o)
                    } else
                        16 & l ? Bg(n, e, r, t, i, o) : Oi(e, n, i, a, o);
                t = s ? t.projectionNext : t.next
            }
        }
        function $o(n, e, t, r, i, o) {
            Zc(t, r, n.firstChild, e, i, o, !1)
        }
        function Bg(n, e, t, r, i, o) {
            const s = t[16]
              , l = s[6].projection[r.projection];
            if (Array.isArray(l))
                for (let u = 0; u < l.length; u++)
                    Oi(e, n, i, l[u], o);
            else
                Zc(n, e, l, s[3], i, o, !0)
        }
        function Hg(n, e, t) {
            n.setAttribute(e, "style", t)
        }
        function Xc(n, e, t) {
            "" === t ? n.removeAttribute(e, "class") : n.setAttribute(e, "class", t)
        }
        function jg(n, e, t) {
            let r = n.length;
            for (; ; ) {
                const i = n.indexOf(e, t);
                if (-1 === i)
                    return i;
                if (0 === i || n.charCodeAt(i - 1) <= 32) {
                    const o = e.length;
                    if (i + o === r || n.charCodeAt(i + o) <= 32)
                        return i
                }
                t = i + 1
            }
        }
        const Gg = "ng-template";
        function rM(n, e, t) {
            let r = 0;
            for (; r < n.length; ) {
                let i = n[r++];
                if (t && "class" === i) {
                    if (i = n[r],
                    -1 !== jg(i.toLowerCase(), e, 0))
                        return !0
                } else if (1 === i) {
                    for (; r < n.length && "string" == typeof (i = n[r++]); )
                        if (i.toLowerCase() === e)
                            return !0;
                    return !1
                }
            }
            return !1
        }
        function $g(n) {
            return 4 === n.type && n.value !== Gg
        }
        function iM(n, e, t) {
            return e === (4 !== n.type || t ? n.value : Gg)
        }
        function oM(n, e, t) {
            let r = 4;
            const i = n.attrs || []
              , o = function lM(n) {
                for (let e = 0; e < n.length; e++)
                    if (_m(n[e]))
                        return e;
                return n.length
            }(i);
            let s = !1;
            for (let a = 0; a < e.length; a++) {
                const l = e[a];
                if ("number" != typeof l) {
                    if (!s)
                        if (4 & r) {
                            if (r = 2 | 1 & r,
                            "" !== l && !iM(n, l, t) || "" === l && 1 === e.length) {
                                if (ln(r))
                                    return !1;
                                s = !0
                            }
                        } else {
                            const u = 8 & r ? l : e[++a];
                            if (8 & r && null !== n.attrs) {
                                if (!rM(n.attrs, u, t)) {
                                    if (ln(r))
                                        return !1;
                                    s = !0
                                }
                                continue
                            }
                            const d = sM(8 & r ? "class" : l, i, $g(n), t);
                            if (-1 === d) {
                                if (ln(r))
                                    return !1;
                                s = !0;
                                continue
                            }
                            if ("" !== u) {
                                let h;
                                h = d > o ? "" : i[d + 1].toLowerCase();
                                const f = 8 & r ? h : null;
                                if (f && -1 !== jg(f, u, 0) || 2 & r && u !== h) {
                                    if (ln(r))
                                        return !1;
                                    s = !0
                                }
                            }
                        }
                } else {
                    if (!s && !ln(r) && !ln(l))
                        return !1;
                    if (s && ln(l))
                        continue;
                    s = !1,
                    r = l | 1 & r
                }
            }
            return ln(r) || s
        }
        function ln(n) {
            return 0 == (1 & n)
        }
        function sM(n, e, t, r) {
            if (null === e)
                return -1;
            let i = 0;
            if (r || !t) {
                let o = !1;
                for (; i < e.length; ) {
                    const s = e[i];
                    if (s === n)
                        return i;
                    if (3 === s || 6 === s)
                        o = !0;
                    else {
                        if (1 === s || 2 === s) {
                            let a = e[++i];
                            for (; "string" == typeof a; )
                                a = e[++i];
                            continue
                        }
                        if (4 === s)
                            break;
                        if (0 === s) {
                            i += 4;
                            continue
                        }
                    }
                    i += o ? 1 : 2
                }
                return -1
            }
            return function uM(n, e) {
                let t = n.indexOf(4);
                if (t > -1)
                    for (t++; t < n.length; ) {
                        const r = n[t];
                        if ("number" == typeof r)
                            return -1;
                        if (r === e)
                            return t;
                        t++
                    }
                return -1
            }(e, n)
        }
        function zg(n, e, t=!1) {
            for (let r = 0; r < e.length; r++)
                if (oM(n, e[r], t))
                    return !0;
            return !1
        }
        function cM(n, e) {
            e: for (let t = 0; t < e.length; t++) {
                const r = e[t];
                if (n.length === r.length) {
                    for (let i = 0; i < n.length; i++)
                        if (n[i] !== r[i])
                            continue e;
                    return !0
                }
            }
            return !1
        }
        function Wg(n, e) {
            return n ? ":not(" + e.trim() + ")" : e
        }
        function dM(n) {
            let e = n[0]
              , t = 1
              , r = 2
              , i = ""
              , o = !1;
            for (; t < n.length; ) {
                let s = n[t];
                if ("string" == typeof s)
                    if (2 & r) {
                        const a = n[++t];
                        i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                    } else
                        8 & r ? i += "." + s : 4 & r && (i += " " + s);
                else
                    "" !== i && !ln(s) && (e += Wg(o, i),
                    i = ""),
                    r = s,
                    o = o || !ln(r);
                t++
            }
            return "" !== i && (e += Wg(o, i)),
            e
        }
        const W = {};
        function Ye(n) {
            qg(ne(), D(), ft() + n, !1)
        }
        function qg(n, e, t, r) {
            if (!r)
                if (3 == (3 & e[2])) {
                    const o = n.preOrderCheckHooks;
                    null !== o && ua(e, o, t)
                } else {
                    const o = n.preOrderHooks;
                    null !== o && ca(e, o, 0, t)
                }
            ir(t)
        }
        function Zg(n, e=null, t=null, r) {
            const i = Xg(n, e, t, r);
            return i.resolveInjectorInitializers(),
            i
        }
        function Xg(n, e=null, t=null, r, i=new Set) {
            const o = [t || le, Kw(n)];
            return r = r || ("object" == typeof n ? void 0 : pe(n)),
            new ug(o,e || Ta(),r || null,i)
        }
        let Wt = (()=>{
            class n {
                static create(t, r) {
                    if (Array.isArray(t))
                        return Zg({
                            name: ""
                        }, r, t, "");
                    {
                        const i = t.name ?? "";
                        return Zg({
                            name: i
                        }, t.parent, t.providers, i)
                    }
                }
            }
            return n.THROW_IF_NOT_FOUND = No,
            n.NULL = new ig,
            n.\u0275prov = F({
                token: n,
                providedIn: "any",
                factory: ()=>T(ng)
            }),
            n.__NG_ELEMENT_ID__ = -1,
            n
        }
        )();
        function E(n, e=U.Default) {
            const t = D();
            return null === t ? T(n, e) : Im(Ge(), t, j(n), e)
        }
        function rd() {
            throw new Error("invalid")
        }
        function Oa(n, e) {
            return n << 17 | e << 2
        }
        function un(n) {
            return n >> 17 & 32767
        }
        function id(n) {
            return 2 | n
        }
        function Hn(n) {
            return (131068 & n) >> 2
        }
        function od(n, e) {
            return -131069 & n | e << 2
        }
        function sd(n) {
            return 1 | n
        }
        function m_(n, e) {
            const t = n.contentQueries;
            if (null !== t)
                for (let r = 0; r < t.length; r += 2) {
                    const i = t[r]
                      , o = t[r + 1];
                    if (-1 !== o) {
                        const s = n.data[o];
                        tc(i),
                        s.contentQueries(2, e[o], o)
                    }
                }
        }
        function Fa(n, e, t, r, i, o, s, a, l, u, c) {
            const d = e.blueprint.slice();
            return d[0] = i,
            d[2] = 76 | r,
            (null !== c || n && 1024 & n[2]) && (d[2] |= 1024),
            rm(d),
            d[3] = d[15] = n,
            d[8] = t,
            d[10] = s || n && n[10],
            d[Y] = a || n && n[Y],
            d[12] = l || n && n[12] || null,
            d[9] = u || n && n[9] || null,
            d[6] = o,
            d[20] = function SA() {
                return DA++
            }(),
            d[21] = c,
            d[16] = 2 == e.type ? n[16] : d,
            d
        }
        function xi(n, e, t, r, i) {
            let o = n.data[e];
            if (null === o)
                o = function pd(n, e, t, r, i) {
                    const o = sm()
                      , s = Zu()
                      , l = n.data[e] = function qM(n, e, t, r, i, o) {
                        return {
                            type: t,
                            index: r,
                            insertBeforeIndex: null,
                            injectorIndex: e ? e.injectorIndex : -1,
                            directiveStart: -1,
                            directiveEnd: -1,
                            directiveStylingLast: -1,
                            propertyBindings: null,
                            flags: 0,
                            providerIndexes: 0,
                            value: i,
                            attrs: o,
                            mergedAttrs: null,
                            localNames: null,
                            initialInputs: void 0,
                            inputs: null,
                            outputs: null,
                            tViews: null,
                            next: null,
                            projectionNext: null,
                            child: null,
                            parent: e,
                            projection: null,
                            styles: null,
                            stylesWithoutHost: null,
                            residualStyles: void 0,
                            classes: null,
                            classesWithoutHost: null,
                            residualClasses: void 0,
                            classBindings: 0,
                            styleBindings: 0
                        }
                    }(0, s ? o : o && o.parent, t, e, r, i);
                    return null === n.firstChild && (n.firstChild = l),
                    null !== o && (s ? null == o.child && null !== l.parent && (o.child = l) : null === o.next && (o.next = l)),
                    l
                }(n, e, t, r, i),
                function IT() {
                    return G.lFrame.inI18n
                }() && (o.flags |= 64);
            else if (64 & o.type) {
                o.type = t,
                o.value = r,
                o.attrs = i;
                const s = function bo() {
                    const n = G.lFrame
                      , e = n.currentTNode;
                    return n.isParent ? e : e.parent
                }();
                o.injectorIndex = null === s ? -1 : s.injectorIndex
            }
            return _n(o, !0),
            o
        }
        function Fi(n, e, t, r) {
            if (0 === t)
                return -1;
            const i = e.length;
            for (let o = 0; o < t; o++)
                e.push(r),
                n.blueprint.push(r),
                n.data.push(null);
            return i
        }
        function md(n, e, t) {
            nc(e);
            try {
                const r = n.viewQuery;
                null !== r && Dd(1, r, t);
                const i = n.template;
                null !== i && g_(n, e, i, 1, t),
                n.firstCreatePass && (n.firstCreatePass = !1),
                n.staticContentQueries && m_(n, e),
                n.staticViewQueries && Dd(2, n.viewQuery, t);
                const o = n.components;
                null !== o && function $M(n, e) {
                    for (let t = 0; t < e.length; t++)
                        c0(n, e[t])
                }(e, o)
            } catch (r) {
                throw n.firstCreatePass && (n.incompleteFirstPass = !0,
                n.firstCreatePass = !1),
                r
            } finally {
                e[2] &= -5,
                rc()
            }
        }
        function Pa(n, e, t, r) {
            const i = e[2];
            if (128 != (128 & i)) {
                nc(e);
                try {
                    rm(e),
                    function lm(n) {
                        return G.lFrame.bindingIndex = n
                    }(n.bindingStartIndex),
                    null !== t && g_(n, e, t, 2, r);
                    const s = 3 == (3 & i);
                    if (s) {
                        const u = n.preOrderCheckHooks;
                        null !== u && ua(e, u, null)
                    } else {
                        const u = n.preOrderHooks;
                        null !== u && ca(e, u, 0, null),
                        ic(e, 0)
                    }
                    if (function l0(n) {
                        for (let e = Gc(n); null !== e; e = $c(e)) {
                            if (!e[2])
                                continue;
                            const t = e[9];
                            for (let r = 0; r < t.length; r++) {
                                const i = t[r]
                                  , o = i[3];
                                0 == (512 & i[2]) && Yu(o, 1),
                                i[2] |= 512
                            }
                        }
                    }(e),
                    function a0(n) {
                        for (let e = Gc(n); null !== e; e = $c(e))
                            for (let t = 10; t < e.length; t++) {
                                const r = e[t]
                                  , i = r[1];
                                aa(r) && Pa(i, r, i.template, r[8])
                            }
                    }(e),
                    null !== n.contentQueries && m_(n, e),
                    s) {
                        const u = n.contentCheckHooks;
                        null !== u && ua(e, u)
                    } else {
                        const u = n.contentHooks;
                        null !== u && ca(e, u, 1),
                        ic(e, 1)
                    }
                    !function jM(n, e) {
                        const t = n.hostBindingOpCodes;
                        if (null !== t)
                            try {
                                for (let r = 0; r < t.length; r++) {
                                    const i = t[r];
                                    if (i < 0)
                                        ir(~i);
                                    else {
                                        const o = i
                                          , s = t[++r]
                                          , a = t[++r];
                                        TT(s, o),
                                        a(2, e[o])
                                    }
                                }
                            } finally {
                                ir(-1)
                            }
                    }(n, e);
                    const a = n.components;
                    null !== a && function GM(n, e) {
                        for (let t = 0; t < e.length; t++)
                            u0(n, e[t])
                    }(e, a);
                    const l = n.viewQuery;
                    if (null !== l && Dd(2, l, r),
                    s) {
                        const u = n.viewCheckHooks;
                        null !== u && ua(e, u)
                    } else {
                        const u = n.viewHooks;
                        null !== u && ca(e, u, 2),
                        ic(e, 2)
                    }
                    !0 === n.firstUpdatePass && (n.firstUpdatePass = !1),
                    e[2] &= -41,
                    512 & e[2] && (e[2] &= -513,
                    Yu(e[3], -1))
                } finally {
                    rc()
                }
            }
        }
        function g_(n, e, t, r, i) {
            const o = ft()
              , s = 2 & r;
            try {
                ir(-1),
                s && e.length > 22 && qg(n, e, 22, !1),
                t(r, i)
            } finally {
                ir(o)
            }
        }
        function __(n, e, t) {
            if ($u(e)) {
                const i = e.directiveEnd;
                for (let o = e.directiveStart; o < i; o++) {
                    const s = n.data[o];
                    s.contentQueries && s.contentQueries(1, t[o], o)
                }
            }
        }
        function gd(n, e, t) {
            !om() || (function XM(n, e, t, r) {
                const i = t.directiveStart
                  , o = t.directiveEnd;
                n.firstCreatePass || Io(t, e),
                rt(r, e);
                const s = t.initialInputs;
                for (let a = i; a < o; a++) {
                    const l = n.data[a]
                      , u = an(l);
                    u && r0(e, t, l);
                    const c = To(e, n, a, t);
                    rt(c, e),
                    null !== s && o0(0, a - i, c, l, 0, s),
                    u && (Ot(t.index, e)[8] = c)
                }
            }(n, e, t, zt(t, e)),
            128 == (128 & t.flags) && function JM(n, e, t) {
                const r = t.directiveStart
                  , i = t.directiveEnd
                  , o = t.index
                  , s = function wT() {
                    return G.lFrame.currentDirectiveIndex
                }();
                try {
                    ir(o);
                    for (let a = r; a < i; a++) {
                        const l = n.data[a]
                          , u = e[a];
                        Ju(a),
                        (null !== l.hostBindings || 0 !== l.hostVars || null !== l.hostAttrs) && S_(l, u)
                    }
                } finally {
                    ir(-1),
                    Ju(s)
                }
            }(n, e, t))
        }
        function _d(n, e, t=zt) {
            const r = e.localNames;
            if (null !== r) {
                let i = e.index + 1;
                for (let o = 0; o < r.length; o += 2) {
                    const s = r[o + 1]
                      , a = -1 === s ? t(e, n) : n[s];
                    n[i++] = a
                }
            }
        }
        function y_(n) {
            const e = n.tView;
            return null === e || e.incompleteFirstPass ? n.tView = yd(1, null, n.template, n.decls, n.vars, n.directiveDefs, n.pipeDefs, n.viewQuery, n.schemas, n.consts) : e
        }
        function yd(n, e, t, r, i, o, s, a, l, u) {
            const c = 22 + r
              , d = c + i
              , h = function zM(n, e) {
                const t = [];
                for (let r = 0; r < e; r++)
                    t.push(r < n ? null : W);
                return t
            }(c, d)
              , f = "function" == typeof u ? u() : u;
            return h[1] = {
                type: n,
                blueprint: h,
                template: t,
                queries: null,
                viewQuery: a,
                declTNode: e,
                data: h.slice().fill(null, c),
                bindingStartIndex: c,
                expandoStartIndex: d,
                hostBindingOpCodes: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof o ? o() : o,
                pipeRegistry: "function" == typeof s ? s() : s,
                firstChild: null,
                schemas: l,
                consts: f,
                incompleteFirstPass: !1
            }
        }
        function v_(n, e, t, r) {
            const i = M_(e);
            null === t ? i.push(r) : (i.push(t),
            n.firstCreatePass && N_(n).push(r, i.length - 1))
        }
        function E_(n, e, t) {
            for (let r in n)
                if (n.hasOwnProperty(r)) {
                    const i = n[r];
                    (t = null === t ? {} : t).hasOwnProperty(r) ? t[r].push(e, i) : t[r] = [e, i]
                }
            return t
        }
        function C_(n, e) {
            const r = e.directiveEnd
              , i = n.data
              , o = e.attrs
              , s = [];
            let a = null
              , l = null;
            for (let u = e.directiveStart; u < r; u++) {
                const c = i[u]
                  , d = c.inputs
                  , h = null === o || $g(e) ? null : s0(d, o);
                s.push(h),
                a = E_(d, u, a),
                l = E_(c.outputs, u, l)
            }
            null !== a && (a.hasOwnProperty("class") && (e.flags |= 16),
            a.hasOwnProperty("style") && (e.flags |= 32)),
            e.initialInputs = s,
            e.inputs = a,
            e.outputs = l
        }
        function Ft(n, e, t, r, i, o, s, a) {
            const l = zt(e, t);
            let c, u = e.inputs;
            !a && null != u && (c = u[r]) ? (Sd(n, t, c, r, i),
            ia(e) && b_(t, e.index)) : 3 & e.type && (r = function KM(n) {
                return "class" === n ? "className" : "for" === n ? "htmlFor" : "formaction" === n ? "formAction" : "innerHtml" === n ? "innerHTML" : "readonly" === n ? "readOnly" : "tabindex" === n ? "tabIndex" : n
            }(r),
            i = null != s ? s(i, e.value || "", r) : i,
            o.setProperty(l, r, i))
        }
        function b_(n, e) {
            const t = Ot(e, n);
            16 & t[2] || (t[2] |= 32)
        }
        function vd(n, e, t, r) {
            let i = !1;
            if (om()) {
                const o = function e0(n, e, t) {
                    const r = n.directiveRegistry;
                    let i = null;
                    if (r)
                        for (let o = 0; o < r.length; o++) {
                            const s = r[o];
                            zg(t, s.selectors, !1) && (i || (i = []),
                            ma(Io(t, e), n, s.type),
                            an(s) ? (I_(n, t),
                            i.unshift(s)) : i.push(s))
                        }
                    return i
                }(n, e, t)
                  , s = null === r ? null : {
                    "": -1
                };
                if (null !== o) {
                    i = !0,
                    T_(t, n.data.length, o.length);
                    for (let c = 0; c < o.length; c++) {
                        const d = o[c];
                        d.providersResolver && d.providersResolver(d)
                    }
                    let a = !1
                      , l = !1
                      , u = Fi(n, e, o.length, null);
                    for (let c = 0; c < o.length; c++) {
                        const d = o[c];
                        t.mergedAttrs = ha(t.mergedAttrs, d.hostAttrs),
                        w_(n, t, e, u, d),
                        n0(u, d, s),
                        null !== d.contentQueries && (t.flags |= 8),
                        (null !== d.hostBindings || null !== d.hostAttrs || 0 !== d.hostVars) && (t.flags |= 128);
                        const h = d.type.prototype;
                        !a && (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) && ((n.preOrderHooks || (n.preOrderHooks = [])).push(t.index),
                        a = !0),
                        !l && (h.ngOnChanges || h.ngDoCheck) && ((n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t.index),
                        l = !0),
                        u++
                    }
                    C_(n, t)
                }
                s && function t0(n, e, t) {
                    if (e) {
                        const r = n.localNames = [];
                        for (let i = 0; i < e.length; i += 2) {
                            const o = t[e[i + 1]];
                            if (null == o)
                                throw new b(-301,!1);
                            r.push(e[i], o)
                        }
                    }
                }(t, r, s)
            }
            return t.mergedAttrs = ha(t.mergedAttrs, t.attrs),
            i
        }
        function D_(n, e, t, r, i, o) {
            const s = o.hostBindings;
            if (s) {
                let a = n.hostBindingOpCodes;
                null === a && (a = n.hostBindingOpCodes = []);
                const l = ~e.index;
                (function ZM(n) {
                    let e = n.length;
                    for (; e > 0; ) {
                        const t = n[--e];
                        if ("number" == typeof t && t < 0)
                            return t
                    }
                    return 0
                }
                )(a) != l && a.push(l),
                a.push(r, i, s)
            }
        }
        function S_(n, e) {
            null !== n.hostBindings && n.hostBindings(1, e)
        }
        function I_(n, e) {
            e.flags |= 2,
            (n.components || (n.components = [])).push(e.index)
        }
        function n0(n, e, t) {
            if (t) {
                if (e.exportAs)
                    for (let r = 0; r < e.exportAs.length; r++)
                        t[e.exportAs[r]] = n;
                an(e) && (t[""] = n)
            }
        }
        function T_(n, e, t) {
            n.flags |= 1,
            n.directiveStart = e,
            n.directiveEnd = e + t,
            n.providerIndexes = e
        }
        function w_(n, e, t, r, i) {
            n.data[r] = i;
            const o = i.factory || (i.factory = Or(i.type))
              , s = new Do(o,an(i),E);
            n.blueprint[r] = s,
            t[r] = s,
            D_(n, e, 0, r, Fi(n, t, i.hostVars, W), i)
        }
        function r0(n, e, t) {
            const r = zt(e, n)
              , i = y_(t)
              , o = n[10]
              , s = ka(n, Fa(n, i, null, t.onPush ? 32 : 16, r, e, o, o.createRenderer(r, t), null, null, null));
            n[e.index] = s
        }
        function vn(n, e, t, r, i, o) {
            const s = zt(n, e);
            !function Ed(n, e, t, r, i, o, s) {
                if (null == o)
                    n.removeAttribute(e, i, t);
                else {
                    const a = null == s ? z(o) : s(o, r || "", i);
                    n.setAttribute(e, i, a, t)
                }
            }(e[Y], s, o, n.value, t, r, i)
        }
        function o0(n, e, t, r, i, o) {
            const s = o[e];
            if (null !== s) {
                const a = r.setInput;
                for (let l = 0; l < s.length; ) {
                    const u = s[l++]
                      , c = s[l++]
                      , d = s[l++];
                    null !== a ? r.setInput(t, d, u, c) : t[c] = d
                }
            }
        }
        function s0(n, e) {
            let t = null
              , r = 0;
            for (; r < e.length; ) {
                const i = e[r];
                if (0 !== i)
                    if (5 !== i) {
                        if ("number" == typeof i)
                            break;
                        n.hasOwnProperty(i) && (null === t && (t = []),
                        t.push(i, n[i], e[r + 1])),
                        r += 2
                    } else
                        r += 2;
                else
                    r += 4
            }
            return t
        }
        function A_(n, e, t, r) {
            return new Array(n,!0,!1,e,null,0,r,t,null,null)
        }
        function u0(n, e) {
            const t = Ot(e, n);
            if (aa(t)) {
                const r = t[1];
                48 & t[2] ? Pa(r, t, r.template, t[8]) : t[5] > 0 && Cd(t)
            }
        }
        function Cd(n) {
            for (let r = Gc(n); null !== r; r = $c(r))
                for (let i = 10; i < r.length; i++) {
                    const o = r[i];
                    if (aa(o))
                        if (512 & o[2]) {
                            const s = o[1];
                            Pa(s, o, s.template, o[8])
                        } else
                            o[5] > 0 && Cd(o)
                }
            const t = n[1].components;
            if (null !== t)
                for (let r = 0; r < t.length; r++) {
                    const i = Ot(t[r], n);
                    aa(i) && i[5] > 0 && Cd(i)
                }
        }
        function c0(n, e) {
            const t = Ot(e, n)
              , r = t[1];
            (function d0(n, e) {
                for (let t = e.length; t < n.blueprint.length; t++)
                    e.push(n.blueprint[t])
            }
            )(r, t),
            md(r, t, t[8])
        }
        function ka(n, e) {
            return n[13] ? n[14][4] = e : n[13] = e,
            n[14] = e,
            e
        }
        function bd(n) {
            for (; n; ) {
                n[2] |= 32;
                const e = Go(n);
                if (oT(n) && !e)
                    return n;
                n = e
            }
            return null
        }
        function La(n, e, t, r=!0) {
            const i = e[10];
            i.begin && i.begin();
            try {
                Pa(n, e, n.template, t)
            } catch (s) {
                throw r && R_(e, s),
                s
            } finally {
                i.end && i.end()
            }
        }
        function Dd(n, e, t) {
            tc(0),
            e(n, t)
        }
        function M_(n) {
            return n[7] || (n[7] = [])
        }
        function N_(n) {
            return n.cleanup || (n.cleanup = [])
        }
        function R_(n, e) {
            const t = n[9]
              , r = t ? t.get(Mi, null) : null;
            r && r.handleError(e)
        }
        function Sd(n, e, t, r, i) {
            for (let o = 0; o < t.length; ) {
                const s = t[o++]
                  , a = t[o++]
                  , l = e[s]
                  , u = n.data[s];
                null !== u.setInput ? u.setInput(l, i, r, a) : l[a] = i
            }
        }
        function Va(n, e, t) {
            let r = t ? n.styles : null
              , i = t ? n.classes : null
              , o = 0;
            if (null !== e)
                for (let s = 0; s < e.length; s++) {
                    const a = e[s];
                    "number" == typeof a ? o = a : 1 == o ? i = ku(i, a) : 2 == o && (r = ku(r, a + ": " + e[++s] + ";"))
                }
            t ? n.styles = r : n.stylesWithoutHost = r,
            t ? n.classes = i : n.classesWithoutHost = i
        }
        function Ua(n, e, t, r, i=!1) {
            for (; null !== t; ) {
                const o = e[t.index];
                if (null !== o && r.push(Ve(o)),
                sn(o))
                    for (let a = 10; a < o.length; a++) {
                        const l = o[a]
                          , u = l[1].firstChild;
                        null !== u && Ua(l[1], l, u, r)
                    }
                const s = t.type;
                if (8 & s)
                    Ua(n, e, t.child, r);
                else if (32 & s) {
                    const a = jc(t, e);
                    let l;
                    for (; l = a(); )
                        r.push(l)
                } else if (16 & s) {
                    const a = Vg(e, t);
                    if (Array.isArray(a))
                        r.push(...a);
                    else {
                        const l = Go(e[16]);
                        Ua(l[1], l, a, r, !0)
                    }
                }
                t = i ? t.projectionNext : t.next
            }
            return r
        }
        class zo {
            constructor(e, t) {
                this._lView = e,
                this._cdRefInjectingView = t,
                this._appRef = null,
                this._attachedToViewContainer = !1
            }
            get rootNodes() {
                const e = this._lView
                  , t = e[1];
                return Ua(t, e, t.firstChild, [])
            }
            get context() {
                return this._lView[8]
            }
            set context(e) {
                this._lView[8] = e
            }
            get destroyed() {
                return 128 == (128 & this._lView[2])
            }
            destroy() {
                if (this._appRef)
                    this._appRef.detachView(this);
                else if (this._attachedToViewContainer) {
                    const e = this._lView[3];
                    if (sn(e)) {
                        const t = e[8]
                          , r = t ? t.indexOf(this) : -1;
                        r > -1 && (qc(e, r),
                        _a(t, r))
                    }
                    this._attachedToViewContainer = !1
                }
                Mg(this._lView[1], this._lView)
            }
            onDestroy(e) {
                v_(this._lView[1], this._lView, null, e)
            }
            markForCheck() {
                bd(this._cdRefInjectingView || this._lView)
            }
            detach() {
                this._lView[2] &= -65
            }
            reattach() {
                this._lView[2] |= 64
            }
            detectChanges() {
                La(this._lView[1], this._lView, this.context)
            }
            checkNoChanges() {}
            attachToViewContainerRef() {
                if (this._appRef)
                    throw new b(902,!1);
                this._attachedToViewContainer = !0
            }
            detachFromAppRef() {
                this._appRef = null,
                function WA(n, e) {
                    $o(n, e, e[Y], 2, null, null)
                }(this._lView[1], this._lView)
            }
            attachToAppRef(e) {
                if (this._attachedToViewContainer)
                    throw new b(902,!1);
                this._appRef = e
            }
        }
        class h0 extends zo {
            constructor(e) {
                super(e),
                this._view = e
            }
            detectChanges() {
                const e = this._view;
                La(e[1], e, e[8], !1)
            }
            checkNoChanges() {}
            get context() {
                return null
            }
        }
        class Id extends Bo {
            constructor(e) {
                super(),
                this.ngModule = e
            }
            resolveComponentFactory(e) {
                const t = ce(e);
                return new Wo(t,this.ngModule)
            }
        }
        function x_(n) {
            const e = [];
            for (let t in n)
                n.hasOwnProperty(t) && e.push({
                    propName: n[t],
                    templateName: t
                });
            return e
        }
        class p0 {
            constructor(e, t) {
                this.injector = e,
                this.parentInjector = t
            }
            get(e, t, r) {
                const i = this.injector.get(e, Rc, r);
                return i !== Rc || t === Rc ? i : this.parentInjector.get(e, t, r)
            }
        }
        class Wo extends dg {
            constructor(e, t) {
                super(),
                this.componentDef = e,
                this.ngModule = t,
                this.componentType = e.type,
                this.selector = function hM(n) {
                    return n.map(dM).join(",")
                }(e.selectors),
                this.ngContentSelectors = e.ngContentSelectors ? e.ngContentSelectors : [],
                this.isBoundToModule = !!t
            }
            get inputs() {
                return x_(this.componentDef.inputs)
            }
            get outputs() {
                return x_(this.componentDef.outputs)
            }
            create(e, t, r, i) {
                let o = (i = i || this.ngModule)instanceof ar ? i : i?.injector;
                o && null !== this.componentDef.getStandaloneInjector && (o = this.componentDef.getStandaloneInjector(o) || o);
                const s = o ? new p0(e,o) : e
                  , a = s.get(Ho, null);
                if (null === a)
                    throw new b(407,!1);
                const l = s.get(cA, null)
                  , u = a.createRenderer(null, this.componentDef)
                  , c = this.componentDef.selectors[0][0] || "div"
                  , d = r ? function WM(n, e, t) {
                    return n.selectRootElement(e, t === rn.ShadowDom)
                }(u, r, this.componentDef.encapsulation) : Wc(a.createRenderer(null, this.componentDef), c, function f0(n) {
                    const e = n.toLowerCase();
                    return "svg" === e ? "svg" : "math" === e ? "math" : null
                }(c))
                  , h = this.componentDef.onPush ? 288 : 272
                  , f = yd(0, null, null, 1, 0, null, null, null, null, null)
                  , p = Fa(null, f, null, h, null, null, a, u, l, s, null);
                let g, y;
                nc(p);
                try {
                    const C = function _0(n, e, t, r, i, o) {
                        const s = t[1];
                        t[22] = n;
                        const l = xi(s, 22, 2, "#host", null)
                          , u = l.mergedAttrs = e.hostAttrs;
                        null !== u && (Va(l, u, !0),
                        null !== n && (da(i, n, u),
                        null !== l.classes && Xc(i, n, l.classes),
                        null !== l.styles && Hg(i, n, l.styles)));
                        const c = r.createRenderer(n, e)
                          , d = Fa(t, y_(e), null, e.onPush ? 32 : 16, t[22], l, r, c, o || null, null, null);
                        return s.firstCreatePass && (ma(Io(l, t), s, e.type),
                        I_(s, l),
                        T_(l, t.length, 1)),
                        ka(t, d),
                        t[22] = d
                    }(d, this.componentDef, p, a, u);
                    if (d)
                        if (r)
                            da(u, d, ["ng-version", dA.full]);
                        else {
                            const {attrs: S, classes: v} = function fM(n) {
                                const e = []
                                  , t = [];
                                let r = 1
                                  , i = 2;
                                for (; r < n.length; ) {
                                    let o = n[r];
                                    if ("string" == typeof o)
                                        2 === i ? "" !== o && e.push(o, n[++r]) : 8 === i && t.push(o);
                                    else {
                                        if (!ln(i))
                                            break;
                                        i = o
                                    }
                                    r++
                                }
                                return {
                                    attrs: e,
                                    classes: t
                                }
                            }(this.componentDef.selectors[0]);
                            S && da(u, d, S),
                            v && v.length > 0 && Xc(u, d, v.join(" "))
                        }
                    if (y = Qu(f, 22),
                    void 0 !== t) {
                        const S = y.projection = [];
                        for (let v = 0; v < this.ngContentSelectors.length; v++) {
                            const N = t[v];
                            S.push(null != N ? Array.from(N) : null)
                        }
                    }
                    g = function y0(n, e, t, r) {
                        const i = t[1]
                          , o = function YM(n, e, t) {
                            const r = Ge();
                            n.firstCreatePass && (t.providersResolver && t.providersResolver(t),
                            w_(n, r, e, Fi(n, e, 1, null), t),
                            C_(n, r));
                            const i = To(e, n, r.directiveStart, r);
                            rt(i, e);
                            const o = zt(r, e);
                            return o && rt(o, e),
                            i
                        }(i, t, e);
                        if (n[8] = t[8] = o,
                        null !== r)
                            for (const a of r)
                                a(o, e);
                        if (e.contentQueries) {
                            const a = Ge();
                            e.contentQueries(1, o, a.directiveStart)
                        }
                        const s = Ge();
                        return !i.firstCreatePass || null === e.hostBindings && null === e.hostAttrs || (ir(s.index),
                        D_(t[1], s, 0, s.directiveStart, s.directiveEnd, e),
                        S_(e, o)),
                        o
                    }(C, this.componentDef, p, [v0]),
                    md(f, p, null)
                } finally {
                    rc()
                }
                return new g0(this.componentType,g,Ai(y, p),p,y)
            }
        }
        class g0 extends class iA {
        }
        {
            constructor(e, t, r, i, o) {
                super(),
                this.location = r,
                this._rootLView = i,
                this._tNode = o,
                this.instance = t,
                this.hostView = this.changeDetectorRef = new h0(i),
                this.componentType = e
            }
            setInput(e, t) {
                const r = this._tNode.inputs;
                let i;
                if (null !== r && (i = r[e])) {
                    const o = this._rootLView;
                    Sd(o[1], o, i, e, t),
                    b_(o, this._tNode.index)
                }
            }
            get injector() {
                return new _i(this._tNode,this._rootLView)
            }
            destroy() {
                this.hostView.destroy()
            }
            onDestroy(e) {
                this.hostView.onDestroy(e)
            }
        }
        function v0() {
            const n = Ge();
            la(D()[1], n)
        }
        function se(n) {
            let e = function F_(n) {
                return Object.getPrototypeOf(n.prototype).constructor
            }(n.type)
              , t = !0;
            const r = [n];
            for (; e; ) {
                let i;
                if (an(n))
                    i = e.\u0275cmp || e.\u0275dir;
                else {
                    if (e.\u0275cmp)
                        throw new b(903,!1);
                    i = e.\u0275dir
                }
                if (i) {
                    if (t) {
                        r.push(i);
                        const s = n;
                        s.inputs = Td(n.inputs),
                        s.declaredInputs = Td(n.declaredInputs),
                        s.outputs = Td(n.outputs);
                        const a = i.hostBindings;
                        a && D0(n, a);
                        const l = i.viewQuery
                          , u = i.contentQueries;
                        if (l && C0(n, l),
                        u && b0(n, u),
                        Pu(n.inputs, i.inputs),
                        Pu(n.declaredInputs, i.declaredInputs),
                        Pu(n.outputs, i.outputs),
                        an(i) && i.data.animation) {
                            const c = n.data;
                            c.animation = (c.animation || []).concat(i.data.animation)
                        }
                    }
                    const o = i.features;
                    if (o)
                        for (let s = 0; s < o.length; s++) {
                            const a = o[s];
                            a && a.ngInherit && a(n),
                            a === se && (t = !1)
                        }
                }
                e = Object.getPrototypeOf(e)
            }
            !function E0(n) {
                let e = 0
                  , t = null;
                for (let r = n.length - 1; r >= 0; r--) {
                    const i = n[r];
                    i.hostVars = e += i.hostVars,
                    i.hostAttrs = ha(i.hostAttrs, t = ha(t, i.hostAttrs))
                }
            }(r)
        }
        function Td(n) {
            return n === ai ? {} : n === le ? [] : n
        }
        function C0(n, e) {
            const t = n.viewQuery;
            n.viewQuery = t ? (r,i)=>{
                e(r, i),
                t(r, i)
            }
            : e
        }
        function b0(n, e) {
            const t = n.contentQueries;
            n.contentQueries = t ? (r,i,o)=>{
                e(r, i, o),
                t(r, i, o)
            }
            : e
        }
        function D0(n, e) {
            const t = n.hostBindings;
            n.hostBindings = t ? (r,i)=>{
                e(r, i),
                t(r, i)
            }
            : e
        }
        let Ba = null;
        function Lr() {
            if (!Ba) {
                const n = _e.Symbol;
                if (n && n.iterator)
                    Ba = n.iterator;
                else {
                    const e = Object.getOwnPropertyNames(Map.prototype);
                    for (let t = 0; t < e.length; ++t) {
                        const r = e[t];
                        "entries" !== r && "size" !== r && Map.prototype[r] === Map.prototype.entries && (Ba = r)
                    }
                }
            }
            return Ba
        }
        function qo(n) {
            return !!function wd(n) {
                return null !== n && ("function" == typeof n || "object" == typeof n)
            }(n) && (Array.isArray(n) || !(n instanceof Map) && Lr()in n)
        }
        function it(n, e, t) {
            return !Object.is(n[e], t) && (n[e] = t,
            !0)
        }
        function Dt(n, e, t, r) {
            const i = D();
            return it(i, pi(), e) && (ne(),
            vn(Me(), i, n, e, t, r)),
            Dt
        }
        function cr(n, e, t, r, i, o, s, a) {
            const l = D()
              , u = ne()
              , c = n + 22
              , d = u.firstCreatePass ? function O0(n, e, t, r, i, o, s, a, l) {
                const u = e.consts
                  , c = xi(e, n, 4, s || null, rr(u, a));
                vd(e, t, c, rr(u, l)),
                la(e, c);
                const d = c.tViews = yd(2, c, r, i, o, e.directiveRegistry, e.pipeRegistry, null, e.schemas, u);
                return null !== e.queries && (e.queries.template(e, c),
                d.queries = e.queries.embeddedTView(c)),
                c
            }(c, u, l, e, t, r, i, o, s) : u.data[c];
            _n(d, !1);
            const h = l[Y].createComment("");
            Aa(u, l, h, d),
            rt(h, l),
            ka(l, l[c] = A_(h, l, h, d)),
            oa(d) && gd(u, l, d),
            null != s && _d(l, d, a)
        }
        function ot(n, e, t) {
            const r = D();
            return it(r, pi(), e) && Ft(ne(), Me(), r, n, e, r[Y], t, !1),
            ot
        }
        function Ad(n, e, t, r, i) {
            const s = i ? "class" : "style";
            Sd(n, t, e.inputs[s], s, r)
        }
        function re(n, e, t, r) {
            const i = D()
              , o = ne()
              , s = 22 + n
              , a = i[Y]
              , l = i[s] = Wc(a, e, function PT() {
                return G.lFrame.currentNamespace
            }())
              , u = o.firstCreatePass ? function F0(n, e, t, r, i, o, s) {
                const a = e.consts
                  , u = xi(e, n, 2, i, rr(a, o));
                return vd(e, t, u, rr(a, s)),
                null !== u.attrs && Va(u, u.attrs, !1),
                null !== u.mergedAttrs && Va(u, u.mergedAttrs, !0),
                null !== e.queries && e.queries.elementStart(e, u),
                u
            }(s, o, i, 0, e, t, r) : o.data[s];
            _n(u, !0);
            const c = u.mergedAttrs;
            null !== c && da(a, l, c);
            const d = u.classes;
            null !== d && Xc(a, l, d);
            const h = u.styles;
            return null !== h && Hg(a, l, h),
            64 != (64 & u.flags) && Aa(o, i, l, u),
            0 === function vT() {
                return G.lFrame.elementDepthCount
            }() && rt(l, i),
            function ET() {
                G.lFrame.elementDepthCount++
            }(),
            oa(u) && (gd(o, i, u),
            __(o, u, i)),
            null !== r && _d(i, u),
            re
        }
        function ie() {
            let n = Ge();
            Zu() ? Xu() : (n = n.parent,
            _n(n, !1));
            const e = n;
            !function CT() {
                G.lFrame.elementDepthCount--
            }();
            const t = ne();
            return t.firstCreatePass && (la(t, n),
            $u(n) && t.queries.elementEnd(n)),
            null != e.classesWithoutHost && function BT(n) {
                return 0 != (16 & n.flags)
            }(e) && Ad(t, e, D(), e.classesWithoutHost, !0),
            null != e.stylesWithoutHost && function HT(n) {
                return 0 != (32 & n.flags)
            }(e) && Ad(t, e, D(), e.stylesWithoutHost, !1),
            ie
        }
        function Qo(n, e, t, r) {
            return re(n, e, t, r),
            ie(),
            Qo
        }
        function ja(n, e, t) {
            const r = D()
              , i = ne()
              , o = n + 22
              , s = i.firstCreatePass ? function P0(n, e, t, r, i) {
                const o = e.consts
                  , s = rr(o, r)
                  , a = xi(e, n, 8, "ng-container", s);
                return null !== s && Va(a, s, !0),
                vd(e, t, a, rr(o, i)),
                null !== e.queries && e.queries.elementStart(e, a),
                a
            }(o, i, r, e, t) : i.data[o];
            _n(s, !0);
            const a = r[o] = r[Y].createComment("");
            return Aa(i, r, a, s),
            rt(a, r),
            oa(s) && (gd(i, r, s),
            __(i, s, r)),
            null != t && _d(r, s),
            ja
        }
        function Ga() {
            let n = Ge();
            const e = ne();
            return Zu() ? Xu() : (n = n.parent,
            _n(n, !1)),
            e.firstCreatePass && (la(e, n),
            $u(n) && e.queries.elementEnd(n)),
            Ga
        }
        function Ur() {
            return D()
        }
        function Yo(n) {
            return !!n && "function" == typeof n.then
        }
        const Md = function z_(n) {
            return !!n && "function" == typeof n.subscribe
        };
        function De(n, e, t, r) {
            const i = D()
              , o = ne()
              , s = Ge();
            return function q_(n, e, t, r, i, o, s, a) {
                const l = oa(r)
                  , c = n.firstCreatePass && N_(n)
                  , d = e[8]
                  , h = M_(e);
                let f = !0;
                if (3 & r.type || a) {
                    const y = zt(r, e)
                      , C = a ? a(y) : y
                      , S = h.length
                      , v = a ? Q=>a(Ve(Q[r.index])) : r.index;
                    let N = null;
                    if (!a && l && (N = function k0(n, e, t, r) {
                        const i = n.cleanup;
                        if (null != i)
                            for (let o = 0; o < i.length - 1; o += 2) {
                                const s = i[o];
                                if (s === t && i[o + 1] === r) {
                                    const a = e[7]
                                      , l = i[o + 2];
                                    return a.length > l ? a[l] : null
                                }
                                "string" == typeof s && (o += 2)
                            }
                        return null
                    }(n, e, i, r.index)),
                    null !== N)
                        (N.__ngLastListenerFn__ || N).__ngNextListenerFn__ = o,
                        N.__ngLastListenerFn__ = o,
                        f = !1;
                    else {
                        o = Q_(r, e, d, o, !1);
                        const Q = t.listen(C, i, o);
                        h.push(o, Q),
                        c && c.push(i, v, S, S + 1)
                    }
                } else
                    o = Q_(r, e, d, o, !1);
                const p = r.outputs;
                let g;
                if (f && null !== p && (g = p[i])) {
                    const y = g.length;
                    if (y)
                        for (let C = 0; C < y; C += 2) {
                            const te = e[g[C]][g[C + 1]].subscribe(o)
                              , Ie = h.length;
                            h.push(o, te),
                            c && c.push(i, r.index, Ie, -(Ie + 1))
                        }
                }
            }(o, i, i[Y], s, n, e, 0, r),
            De
        }
        function K_(n, e, t, r) {
            try {
                return !1 !== t(r)
            } catch (i) {
                return R_(n, i),
                !1
            }
        }
        function Q_(n, e, t, r, i) {
            return function o(s) {
                if (s === Function)
                    return r;
                bd(2 & n.flags ? Ot(n.index, e) : e);
                let l = K_(e, 0, r, s)
                  , u = o.__ngNextListenerFn__;
                for (; u; )
                    l = K_(e, 0, u, s) && l,
                    u = u.__ngNextListenerFn__;
                return i && !1 === l && (s.preventDefault(),
                s.returnValue = !1),
                l
            }
        }
        function St(n=1) {
            return function MT(n) {
                return (G.lFrame.contextLView = function NT(n, e) {
                    for (; n > 0; )
                        e = e[15],
                        n--;
                    return e
                }(n, G.lFrame.contextLView))[8]
            }(n)
        }
        function L0(n, e) {
            let t = null;
            const r = function aM(n) {
                const e = n.attrs;
                if (null != e) {
                    const t = e.indexOf(5);
                    if (0 == (1 & t))
                        return e[t + 1]
                }
                return null
            }(n);
            for (let i = 0; i < e.length; i++) {
                const o = e[i];
                if ("*" !== o) {
                    if (null === r ? zg(n, o, !0) : cM(r, o))
                        return i
                } else
                    t = i
            }
            return t
        }
        function Nd(n) {
            const e = D()[16][6];
            if (!e.projection) {
                const r = e.projection = Mo(n ? n.length : 1, null)
                  , i = r.slice();
                let o = e.child;
                for (; null !== o; ) {
                    const s = n ? L0(o, n) : 0;
                    null !== s && (i[s] ? i[s].projectionNext = o : r[s] = o,
                    i[s] = o),
                    o = o.next
                }
            }
        }
        function Od(n, e=0, t) {
            const r = D()
              , i = ne()
              , o = xi(i, 22 + n, 16, null, t || null);
            null === o.projection && (o.projection = e),
            Xu(),
            64 != (64 & o.flags) && function eM(n, e, t) {
                Bg(e[Y], 0, e, t, Ng(n, t, e), Fg(t.parent || e[6], t, e))
            }(i, r, o)
        }
        function oy(n, e, t, r, i) {
            const o = n[t + 1]
              , s = null === e;
            let a = r ? un(o) : Hn(o)
              , l = !1;
            for (; 0 !== a && (!1 === l || s); ) {
                const c = n[a + 1];
                B0(n[a], e) && (l = !0,
                n[a + 1] = r ? sd(c) : id(c)),
                a = r ? un(c) : Hn(c)
            }
            l && (n[t + 1] = r ? id(o) : sd(o))
        }
        function B0(n, e) {
            return null === n || null == e || (Array.isArray(n) ? n[1] : n) === e || !(!Array.isArray(n) || "string" != typeof e) && Di(n, e) >= 0
        }
        function xd(n, e, t) {
            return cn(n, e, t, !1),
            xd
        }
        function Gn(n, e) {
            return cn(n, e, null, !0),
            Gn
        }
        function cn(n, e, t, r) {
            const i = D()
              , o = ne()
              , s = function kn(n) {
                const e = G.lFrame
                  , t = e.bindingIndex;
                return e.bindingIndex = e.bindingIndex + n,
                t
            }(2);
            o.firstUpdatePass && function fy(n, e, t, r) {
                const i = n.data;
                if (null === i[t + 1]) {
                    const o = i[ft()]
                      , s = function hy(n, e) {
                        return e >= n.expandoStartIndex
                    }(n, t);
                    (function _y(n, e) {
                        return 0 != (n.flags & (e ? 16 : 32))
                    }
                    )(o, r) && null === e && !s && (e = !1),
                    e = function Q0(n, e, t, r) {
                        const i = function ec(n) {
                            const e = G.lFrame.currentDirectiveIndex;
                            return -1 === e ? null : n[e]
                        }(n);
                        let o = r ? e.residualClasses : e.residualStyles;
                        if (null === i)
                            0 === (r ? e.classBindings : e.styleBindings) && (t = Zo(t = Fd(null, n, e, t, r), e.attrs, r),
                            o = null);
                        else {
                            const s = e.directiveStylingLast;
                            if (-1 === s || n[s] !== i)
                                if (t = Fd(i, n, e, t, r),
                                null === o) {
                                    let l = function Y0(n, e, t) {
                                        const r = t ? e.classBindings : e.styleBindings;
                                        if (0 !== Hn(r))
                                            return n[un(r)]
                                    }(n, e, r);
                                    void 0 !== l && Array.isArray(l) && (l = Fd(null, n, e, l[1], r),
                                    l = Zo(l, e.attrs, r),
                                    function Z0(n, e, t, r) {
                                        n[un(t ? e.classBindings : e.styleBindings)] = r
                                    }(n, e, r, l))
                                } else
                                    o = function X0(n, e, t) {
                                        let r;
                                        const i = e.directiveEnd;
                                        for (let o = 1 + e.directiveStylingLast; o < i; o++)
                                            r = Zo(r, n[o].hostAttrs, t);
                                        return Zo(r, e.attrs, t)
                                    }(n, e, r)
                        }
                        return void 0 !== o && (r ? e.residualClasses = o : e.residualStyles = o),
                        t
                    }(i, o, e, r),
                    function V0(n, e, t, r, i, o) {
                        let s = o ? e.classBindings : e.styleBindings
                          , a = un(s)
                          , l = Hn(s);
                        n[r] = t;
                        let c, u = !1;
                        if (Array.isArray(t)) {
                            const d = t;
                            c = d[1],
                            (null === c || Di(d, c) > 0) && (u = !0)
                        } else
                            c = t;
                        if (i)
                            if (0 !== l) {
                                const h = un(n[a + 1]);
                                n[r + 1] = Oa(h, a),
                                0 !== h && (n[h + 1] = od(n[h + 1], r)),
                                n[a + 1] = function RM(n, e) {
                                    return 131071 & n | e << 17
                                }(n[a + 1], r)
                            } else
                                n[r + 1] = Oa(a, 0),
                                0 !== a && (n[a + 1] = od(n[a + 1], r)),
                                a = r;
                        else
                            n[r + 1] = Oa(l, 0),
                            0 === a ? a = r : n[l + 1] = od(n[l + 1], r),
                            l = r;
                        u && (n[r + 1] = id(n[r + 1])),
                        oy(n, c, r, !0),
                        oy(n, c, r, !1),
                        function U0(n, e, t, r, i) {
                            const o = i ? n.residualClasses : n.residualStyles;
                            null != o && "string" == typeof e && Di(o, e) >= 0 && (t[r + 1] = sd(t[r + 1]))
                        }(e, c, n, r, o),
                        s = Oa(a, l),
                        o ? e.classBindings = s : e.styleBindings = s
                    }(i, o, e, t, s, r)
                }
            }(o, n, s, r),
            e !== W && it(i, s, e) && function my(n, e, t, r, i, o, s, a) {
                if (!(3 & e.type))
                    return;
                const l = n.data
                  , u = l[a + 1];
                $a(function a_(n) {
                    return 1 == (1 & n)
                }(u) ? gy(l, e, t, i, Hn(u), s) : void 0) || ($a(o) || function s_(n) {
                    return 2 == (2 & n)
                }(u) && (o = gy(l, null, t, i, a, s)),
                function nM(n, e, t, r, i) {
                    if (e)
                        i ? n.addClass(t, r) : n.removeClass(t, r);
                    else {
                        let o = -1 === r.indexOf("-") ? void 0 : bt.DashCase;
                        null == i ? n.removeStyle(t, r, o) : ("string" == typeof i && i.endsWith("!important") && (i = i.slice(0, -10),
                        o |= bt.Important),
                        n.setStyle(t, r, i, o))
                    }
                }(r, s, sa(ft(), t), i, o))
            }(o, o.data[ft()], i, i[Y], n, i[s + 1] = function tN(n, e) {
                return null == n || ("string" == typeof e ? n += e : "object" == typeof n && (n = pe(function sr(n) {
                    return n instanceof class Km {
                        constructor(e) {
                            this.changingThisBreaksApplicationSecurity = e
                        }
                        toString() {
                            return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`
                        }
                    }
                    ? n.changingThisBreaksApplicationSecurity : n
                }(n)))),
                n
            }(e, t), r, s)
        }
        function Fd(n, e, t, r, i) {
            let o = null;
            const s = t.directiveEnd;
            let a = t.directiveStylingLast;
            for (-1 === a ? a = t.directiveStart : a++; a < s && (o = e[a],
            r = Zo(r, o.hostAttrs, i),
            o !== n); )
                a++;
            return null !== n && (t.directiveStylingLast = a),
            r
        }
        function Zo(n, e, t) {
            const r = t ? 1 : 2;
            let i = -1;
            if (null !== e)
                for (let o = 0; o < e.length; o++) {
                    const s = e[o];
                    "number" == typeof s ? i = s : i === r && (Array.isArray(n) || (n = void 0 === n ? [] : ["", n]),
                    xt(n, s, !!t || e[++o]))
                }
            return void 0 === n ? null : n
        }
        function gy(n, e, t, r, i, o) {
            const s = null === e;
            let a;
            for (; i > 0; ) {
                const l = n[i]
                  , u = Array.isArray(l)
                  , c = u ? l[1] : l
                  , d = null === c;
                let h = t[i + 1];
                h === W && (h = d ? le : void 0);
                let f = d ? hc(h, r) : c === r ? h : void 0;
                if (u && !$a(f) && (f = hc(l, r)),
                $a(f) && (a = f,
                s))
                    return a;
                const p = n[i + 1];
                i = s ? un(p) : Hn(p)
            }
            if (null !== e) {
                let l = o ? e.residualClasses : e.residualStyles;
                null != l && (a = hc(l, r))
            }
            return a
        }
        function $a(n) {
            return void 0 !== n
        }
        function Ne(n, e="") {
            const t = D()
              , r = ne()
              , i = n + 22
              , o = r.firstCreatePass ? xi(r, i, 1, e, null) : r.data[i]
              , s = t[i] = function zc(n, e) {
                return n.createText(e)
            }(t[Y], e);
            Aa(r, t, s, o),
            _n(o, !1)
        }
        function dr(n) {
            return za("", n, ""),
            dr
        }
        function za(n, e, t) {
            const r = D()
              , i = function ki(n, e, t, r) {
                return it(n, pi(), t) ? e + z(t) + r : W
            }(r, n, e, t);
            return i !== W && function jn(n, e, t) {
                const r = sa(e, n);
                !function wg(n, e, t) {
                    n.setValue(e, t)
                }(n[Y], r, t)
            }(r, ft(), i),
            za
        }
        function Wa(n, e, t) {
            const r = D();
            return it(r, pi(), e) && Ft(ne(), Me(), r, n, e, r[Y], t, !0),
            Wa
        }
        const Wi = "en-US";
        let Vy = Wi;
        function Ld(n, e, t, r, i) {
            if (n = j(n),
            Array.isArray(n))
                for (let o = 0; o < n.length; o++)
                    Ld(n[o], e, t, r, i);
            else {
                const o = ne()
                  , s = D();
                let a = Fr(n) ? n : j(n.provide)
                  , l = cg(n);
                const u = Ge()
                  , c = 1048575 & u.providerIndexes
                  , d = u.directiveStart
                  , h = u.providerIndexes >> 20;
                if (Fr(n) || !n.multi) {
                    const f = new Do(l,i,E)
                      , p = Ud(a, e, i ? c : c + h, d);
                    -1 === p ? (ma(Io(u, s), o, a),
                    Vd(o, n, e.length),
                    e.push(a),
                    u.directiveStart++,
                    u.directiveEnd++,
                    i && (u.providerIndexes += 1048576),
                    t.push(f),
                    s.push(f)) : (t[p] = f,
                    s[p] = f)
                } else {
                    const f = Ud(a, e, c + h, d)
                      , p = Ud(a, e, c, c + h)
                      , g = f >= 0 && t[f]
                      , y = p >= 0 && t[p];
                    if (i && !y || !i && !g) {
                        ma(Io(u, s), o, a);
                        const C = function vO(n, e, t, r, i) {
                            const o = new Do(n,t,E);
                            return o.multi = [],
                            o.index = e,
                            o.componentProviders = 0,
                            uv(o, i, r && !t),
                            o
                        }(i ? yO : _O, t.length, i, r, l);
                        !i && y && (t[p].providerFactory = C),
                        Vd(o, n, e.length, 0),
                        e.push(a),
                        u.directiveStart++,
                        u.directiveEnd++,
                        i && (u.providerIndexes += 1048576),
                        t.push(C),
                        s.push(C)
                    } else
                        Vd(o, n, f > -1 ? f : p, uv(t[i ? p : f], l, !i && r));
                    !i && r && y && t[p].componentProviders++
                }
            }
        }
        function Vd(n, e, t, r) {
            const i = Fr(e)
              , o = function Yw(n) {
                return !!n.useClass
            }(e);
            if (i || o) {
                const l = (o ? j(e.useClass) : e).prototype.ngOnDestroy;
                if (l) {
                    const u = n.destroyHooks || (n.destroyHooks = []);
                    if (!i && e.multi) {
                        const c = u.indexOf(t);
                        -1 === c ? u.push(t, [r, l]) : u[c + 1].push(r, l)
                    } else
                        u.push(t, l)
                }
            }
        }
        function uv(n, e, t) {
            return t && n.componentProviders++,
            n.multi.push(e) - 1
        }
        function Ud(n, e, t, r) {
            for (let i = t; i < r; i++)
                if (e[i] === n)
                    return i;
            return -1
        }
        function _O(n, e, t, r) {
            return Bd(this.multi, [])
        }
        function yO(n, e, t, r) {
            const i = this.multi;
            let o;
            if (this.providerFactory) {
                const s = this.providerFactory.componentProviders
                  , a = To(t, t[1], this.providerFactory.index, r);
                o = a.slice(0, s),
                Bd(i, o);
                for (let l = s; l < a.length; l++)
                    o.push(a[l])
            } else
                o = [],
                Bd(i, o);
            return o
        }
        function Bd(n, e) {
            for (let t = 0; t < n.length; t++)
                e.push((0,
                n[t])());
            return e
        }
        function he(n, e=[]) {
            return t=>{
                t.providersResolver = (r,i)=>function gO(n, e, t) {
                    const r = ne();
                    if (r.firstCreatePass) {
                        const i = an(n);
                        Ld(t, r.data, r.blueprint, i, !0),
                        Ld(e, r.data, r.blueprint, i, !1)
                    }
                }(r, i ? i(n) : n, e)
            }
        }
        class Hr {
        }
        class cv {
        }
        class dv extends Hr {
            constructor(e, t) {
                super(),
                this._parent = t,
                this._bootstrapComponents = [],
                this.destroyCbs = [],
                this.componentFactoryResolver = new Id(this);
                const r = At(e);
                this._bootstrapComponents = Bn(r.bootstrap),
                this._r3Injector = Xg(e, t, [{
                    provide: Hr,
                    useValue: this
                }, {
                    provide: Bo,
                    useValue: this.componentFactoryResolver
                }], pe(e), new Set(["environment"])),
                this._r3Injector.resolveInjectorInitializers(),
                this.instance = this._r3Injector.get(e)
            }
            get injector() {
                return this._r3Injector
            }
            destroy() {
                const e = this._r3Injector;
                !e.destroyed && e.destroy(),
                this.destroyCbs.forEach(t=>t()),
                this.destroyCbs = null
            }
            onDestroy(e) {
                this.destroyCbs.push(e)
            }
        }
        class Hd extends cv {
            constructor(e) {
                super(),
                this.moduleType = e
            }
            create(e) {
                return new dv(this.moduleType,e)
            }
        }
        class CO extends Hr {
            constructor(e, t, r) {
                super(),
                this.componentFactoryResolver = new Id(this),
                this.instance = null;
                const i = new ug([...e, {
                    provide: Hr,
                    useValue: this
                }, {
                    provide: Bo,
                    useValue: this.componentFactoryResolver
                }],t || Ta(),r,new Set(["environment"]));
                this.injector = i,
                i.resolveInjectorInitializers()
            }
            destroy() {
                this.injector.destroy()
            }
            onDestroy(e) {
                this.injector.onDestroy(e)
            }
        }
        function Za(n, e, t=null) {
            return new CO(n,e,t).injector
        }
        let bO = (()=>{
            class n {
                constructor(t) {
                    this._injector = t,
                    this.cachedInjectors = new Map
                }
                getOrCreateStandaloneInjector(t) {
                    if (!t.standalone)
                        return null;
                    if (!this.cachedInjectors.has(t.id)) {
                        const r = og(0, t.type)
                          , i = r.length > 0 ? Za([r], this._injector, `Standalone[${t.type.name}]`) : null;
                        this.cachedInjectors.set(t.id, i)
                    }
                    return this.cachedInjectors.get(t.id)
                }
                ngOnDestroy() {
                    try {
                        for (const t of this.cachedInjectors.values())
                            null !== t && t.destroy()
                    } finally {
                        this.cachedInjectors.clear()
                    }
                }
            }
            return n.\u0275prov = F({
                token: n,
                providedIn: "environment",
                factory: ()=>new n(T(ar))
            }),
            n
        }
        )();
        function hv(n) {
            n.getStandaloneInjector = e=>e.get(bO).getOrCreateStandaloneInjector(n)
        }
        function Gd(n) {
            return e=>{
                setTimeout(n, void 0, e)
            }
        }
        const de = class KO extends Fe {
            constructor(e=!1) {
                super(),
                this.__isAsync = e
            }
            emit(e) {
                super.next(e)
            }
            subscribe(e, t, r) {
                let i = e
                  , o = t || (()=>null)
                  , s = r;
                if (e && "object" == typeof e) {
                    const l = e;
                    i = l.next?.bind(l),
                    o = l.error?.bind(l),
                    s = l.complete?.bind(l)
                }
                this.__isAsync && (o = Gd(o),
                i && (i = Gd(i)),
                s && (s = Gd(s)));
                const a = super.subscribe({
                    next: i,
                    error: o,
                    complete: s
                });
                return e instanceof yt && e.add(a),
                a
            }
        }
        ;
        function QO() {
            return this._results[Lr()]()
        }
        class os {
            constructor(e=!1) {
                this._emitDistinctChangesOnly = e,
                this.dirty = !0,
                this._results = [],
                this._changesDetected = !1,
                this._changes = null,
                this.length = 0,
                this.first = void 0,
                this.last = void 0;
                const t = Lr()
                  , r = os.prototype;
                r[t] || (r[t] = QO)
            }
            get changes() {
                return this._changes || (this._changes = new de)
            }
            get(e) {
                return this._results[e]
            }
            map(e) {
                return this._results.map(e)
            }
            filter(e) {
                return this._results.filter(e)
            }
            find(e) {
                return this._results.find(e)
            }
            reduce(e, t) {
                return this._results.reduce(e, t)
            }
            forEach(e) {
                this._results.forEach(e)
            }
            some(e) {
                return this._results.some(e)
            }
            toArray() {
                return this._results.slice()
            }
            toString() {
                return this._results.toString()
            }
            reset(e, t) {
                const r = this;
                r.dirty = !1;
                const i = Rt(e);
                (this._changesDetected = !function ZT(n, e, t) {
                    if (n.length !== e.length)
                        return !1;
                    for (let r = 0; r < n.length; r++) {
                        let i = n[r]
                          , o = e[r];
                        if (t && (i = t(i),
                        o = t(o)),
                        o !== i)
                            return !1
                    }
                    return !0
                }(r._results, i, t)) && (r._results = i,
                r.length = i.length,
                r.last = i[this.length - 1],
                r.first = i[0])
            }
            notifyOnChanges() {
                this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this)
            }
            setDirty() {
                this.dirty = !0
            }
            destroy() {
                this.changes.complete(),
                this.changes.unsubscribe()
            }
        }
        let $n = (()=>{
            class n {
            }
            return n.__NG_ELEMENT_ID__ = XO,
            n
        }
        )();
        const YO = $n
          , ZO = class extends YO {
            constructor(e, t, r) {
                super(),
                this._declarationLView = e,
                this._declarationTContainer = t,
                this.elementRef = r
            }
            createEmbeddedView(e, t) {
                const r = this._declarationTContainer.tViews
                  , i = Fa(this._declarationLView, r, e, 16, null, r.declTNode, null, null, null, null, t || null);
                i[17] = this._declarationLView[this._declarationTContainer.index];
                const s = this._declarationLView[19];
                return null !== s && (i[19] = s.createEmbeddedView(r)),
                md(r, i, e),
                new zo(i)
            }
        }
        ;
        function XO() {
            return Xa(Ge(), D())
        }
        function Xa(n, e) {
            return 4 & n.type ? new ZO(e,n,Ai(n, e)) : null
        }
        let hn = (()=>{
            class n {
            }
            return n.__NG_ELEMENT_ID__ = JO,
            n
        }
        )();
        function JO() {
            return Tv(Ge(), D())
        }
        const eR = hn
          , Sv = class extends eR {
            constructor(e, t, r) {
                super(),
                this._lContainer = e,
                this._hostTNode = t,
                this._hostLView = r
            }
            get element() {
                return Ai(this._hostTNode, this._hostLView)
            }
            get injector() {
                return new _i(this._hostTNode,this._hostLView)
            }
            get parentInjector() {
                const e = pa(this._hostTNode, this._hostLView);
                if (Em(e)) {
                    const t = gi(e, this._hostLView)
                      , r = mi(e);
                    return new _i(t[1].data[r + 8],t)
                }
                return new _i(null,this._hostLView)
            }
            clear() {
                for (; this.length > 0; )
                    this.remove(this.length - 1)
            }
            get(e) {
                const t = Iv(this._lContainer);
                return null !== t && t[e] || null
            }
            get length() {
                return this._lContainer.length - 10
            }
            createEmbeddedView(e, t, r) {
                let i, o;
                "number" == typeof r ? i = r : null != r && (i = r.index,
                o = r.injector);
                const s = e.createEmbeddedView(t || {}, o);
                return this.insert(s, i),
                s
            }
            createComponent(e, t, r, i, o) {
                const s = e && !function Ao(n) {
                    return "function" == typeof n
                }(e);
                let a;
                if (s)
                    a = t;
                else {
                    const d = t || {};
                    a = d.index,
                    r = d.injector,
                    i = d.projectableNodes,
                    o = d.environmentInjector || d.ngModuleRef
                }
                const l = s ? e : new Wo(ce(e))
                  , u = r || this.parentInjector;
                if (!o && null == l.ngModule) {
                    const h = (s ? u : this.parentInjector).get(ar, null);
                    h && (o = h)
                }
                const c = l.create(u, i, void 0, o);
                return this.insert(c.hostView, a),
                c
            }
            insert(e, t) {
                const r = e._lView
                  , i = r[1];
                if (function yT(n) {
                    return sn(n[3])
                }(r)) {
                    const c = this.indexOf(e);
                    if (-1 !== c)
                        this.detach(c);
                    else {
                        const d = r[3]
                          , h = new Sv(d,d[6],d[3]);
                        h.detach(h.indexOf(e))
                    }
                }
                const o = this._adjustIndex(t)
                  , s = this._lContainer;
                !function KA(n, e, t, r) {
                    const i = 10 + r
                      , o = t.length;
                    r > 0 && (t[i - 1][4] = e),
                    r < o - 10 ? (e[4] = t[i],
                    Om(t, 10 + r, e)) : (t.push(e),
                    e[4] = null),
                    e[3] = t;
                    const s = e[17];
                    null !== s && t !== s && function QA(n, e) {
                        const t = n[9];
                        e[16] !== e[3][3][16] && (n[2] = !0),
                        null === t ? n[9] = [e] : t.push(e)
                    }(s, e);
                    const a = e[19];
                    null !== a && a.insertView(n),
                    e[2] |= 64
                }(i, r, s, o);
                const a = Yc(o, s)
                  , l = r[Y]
                  , u = wa(l, s[7]);
                return null !== u && function zA(n, e, t, r, i, o) {
                    r[0] = i,
                    r[6] = e,
                    $o(n, r, t, 1, i, o)
                }(i, s[6], l, r, u, a),
                e.attachToViewContainerRef(),
                Om($d(s), o, e),
                e
            }
            move(e, t) {
                return this.insert(e, t)
            }
            indexOf(e) {
                const t = Iv(this._lContainer);
                return null !== t ? t.indexOf(e) : -1
            }
            remove(e) {
                const t = this._adjustIndex(e, -1)
                  , r = qc(this._lContainer, t);
                r && (_a($d(this._lContainer), t),
                Mg(r[1], r))
            }
            detach(e) {
                const t = this._adjustIndex(e, -1)
                  , r = qc(this._lContainer, t);
                return r && null != _a($d(this._lContainer), t) ? new zo(r) : null
            }
            _adjustIndex(e, t=0) {
                return e ?? this.length + t
            }
        }
        ;
        function Iv(n) {
            return n[8]
        }
        function $d(n) {
            return n[8] || (n[8] = [])
        }
        function Tv(n, e) {
            let t;
            const r = e[n.index];
            if (sn(r))
                t = r;
            else {
                let i;
                if (8 & n.type)
                    i = Ve(r);
                else {
                    const o = e[Y];
                    i = o.createComment("");
                    const s = zt(n, e);
                    kr(o, wa(o, s), i, function JA(n, e) {
                        return n.nextSibling(e)
                    }(o, s), !1)
                }
                e[n.index] = t = A_(r, e, i, n),
                ka(e, t)
            }
            return new Sv(t,n,e)
        }
        class zd {
            constructor(e) {
                this.queryList = e,
                this.matches = null
            }
            clone() {
                return new zd(this.queryList)
            }
            setDirty() {
                this.queryList.setDirty()
            }
        }
        class Wd {
            constructor(e=[]) {
                this.queries = e
            }
            createEmbeddedView(e) {
                const t = e.queries;
                if (null !== t) {
                    const r = null !== e.contentQueries ? e.contentQueries[0] : t.length
                      , i = [];
                    for (let o = 0; o < r; o++) {
                        const s = t.getByIndex(o);
                        i.push(this.queries[s.indexInDeclarationView].clone())
                    }
                    return new Wd(i)
                }
                return null
            }
            insertView(e) {
                this.dirtyQueriesWithMatches(e)
            }
            detachView(e) {
                this.dirtyQueriesWithMatches(e)
            }
            dirtyQueriesWithMatches(e) {
                for (let t = 0; t < this.queries.length; t++)
                    null !== Rv(e, t).matches && this.queries[t].setDirty()
            }
        }
        class wv {
            constructor(e, t, r=null) {
                this.predicate = e,
                this.flags = t,
                this.read = r
            }
        }
        class qd {
            constructor(e=[]) {
                this.queries = e
            }
            elementStart(e, t) {
                for (let r = 0; r < this.queries.length; r++)
                    this.queries[r].elementStart(e, t)
            }
            elementEnd(e) {
                for (let t = 0; t < this.queries.length; t++)
                    this.queries[t].elementEnd(e)
            }
            embeddedTView(e) {
                let t = null;
                for (let r = 0; r < this.length; r++) {
                    const i = null !== t ? t.length : 0
                      , o = this.getByIndex(r).embeddedTView(e, i);
                    o && (o.indexInDeclarationView = r,
                    null !== t ? t.push(o) : t = [o])
                }
                return null !== t ? new qd(t) : null
            }
            template(e, t) {
                for (let r = 0; r < this.queries.length; r++)
                    this.queries[r].template(e, t)
            }
            getByIndex(e) {
                return this.queries[e]
            }
            get length() {
                return this.queries.length
            }
            track(e) {
                this.queries.push(e)
            }
        }
        class Kd {
            constructor(e, t=-1) {
                this.metadata = e,
                this.matches = null,
                this.indexInDeclarationView = -1,
                this.crossesNgTemplate = !1,
                this._appliesToNextNode = !0,
                this._declarationNodeIndex = t
            }
            elementStart(e, t) {
                this.isApplyingToNode(t) && this.matchTNode(e, t)
            }
            elementEnd(e) {
                this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1)
            }
            template(e, t) {
                this.elementStart(e, t)
            }
            embeddedTView(e, t) {
                return this.isApplyingToNode(e) ? (this.crossesNgTemplate = !0,
                this.addMatch(-e.index, t),
                new Kd(this.metadata)) : null
            }
            isApplyingToNode(e) {
                if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
                    const t = this._declarationNodeIndex;
                    let r = e.parent;
                    for (; null !== r && 8 & r.type && r.index !== t; )
                        r = r.parent;
                    return t === (null !== r ? r.index : -1)
                }
                return this._appliesToNextNode
            }
            matchTNode(e, t) {
                const r = this.metadata.predicate;
                if (Array.isArray(r))
                    for (let i = 0; i < r.length; i++) {
                        const o = r[i];
                        this.matchTNodeWithReadOption(e, t, rR(t, o)),
                        this.matchTNodeWithReadOption(e, t, ga(t, e, o, !1, !1))
                    }
                else
                    r === $n ? 4 & t.type && this.matchTNodeWithReadOption(e, t, -1) : this.matchTNodeWithReadOption(e, t, ga(t, e, r, !1, !1))
            }
            matchTNodeWithReadOption(e, t, r) {
                if (null !== r) {
                    const i = this.metadata.read;
                    if (null !== i)
                        if (i === Be || i === hn || i === $n && 4 & t.type)
                            this.addMatch(t.index, -2);
                        else {
                            const o = ga(t, e, i, !1, !1);
                            null !== o && this.addMatch(t.index, o)
                        }
                    else
                        this.addMatch(t.index, r)
                }
            }
            addMatch(e, t) {
                null === this.matches ? this.matches = [e, t] : this.matches.push(e, t)
            }
        }
        function rR(n, e) {
            const t = n.localNames;
            if (null !== t)
                for (let r = 0; r < t.length; r += 2)
                    if (t[r] === e)
                        return t[r + 1];
            return null
        }
        function oR(n, e, t, r) {
            return -1 === t ? function iR(n, e) {
                return 11 & n.type ? Ai(n, e) : 4 & n.type ? Xa(n, e) : null
            }(e, n) : -2 === t ? function sR(n, e, t) {
                return t === Be ? Ai(e, n) : t === $n ? Xa(e, n) : t === hn ? Tv(e, n) : void 0
            }(n, e, r) : To(n, n[1], t, e)
        }
        function Av(n, e, t, r) {
            const i = e[19].queries[r];
            if (null === i.matches) {
                const o = n.data
                  , s = t.matches
                  , a = [];
                for (let l = 0; l < s.length; l += 2) {
                    const u = s[l];
                    a.push(u < 0 ? null : oR(e, o[u], s[l + 1], t.metadata.read))
                }
                i.matches = a
            }
            return i.matches
        }
        function Qd(n, e, t, r) {
            const i = n.queries.getByIndex(t)
              , o = i.matches;
            if (null !== o) {
                const s = Av(n, e, i, t);
                for (let a = 0; a < o.length; a += 2) {
                    const l = o[a];
                    if (l > 0)
                        r.push(s[a / 2]);
                    else {
                        const u = o[a + 1]
                          , c = e[-l];
                        for (let d = 10; d < c.length; d++) {
                            const h = c[d];
                            h[17] === h[3] && Qd(h[1], h, u, r)
                        }
                        if (null !== c[9]) {
                            const d = c[9];
                            for (let h = 0; h < d.length; h++) {
                                const f = d[h];
                                Qd(f[1], f, u, r)
                            }
                        }
                    }
                }
            }
            return r
        }
        function hr(n) {
            const e = D()
              , t = ne()
              , r = cm();
            tc(r + 1);
            const i = Rv(t, r);
            if (n.dirty && function _T(n) {
                return 4 == (4 & n[2])
            }(e) === (2 == (2 & i.metadata.flags))) {
                if (null === i.matches)
                    n.reset([]);
                else {
                    const o = i.crossesNgTemplate ? Qd(t, e, r, []) : Av(t, e, i, r);
                    n.reset(o, lA),
                    n.notifyOnChanges()
                }
                return !0
            }
            return !1
        }
        function jr(n, e, t, r) {
            const i = ne();
            if (i.firstCreatePass) {
                const o = Ge();
                Ov(i, new wv(e,t,r), o.index),
                function lR(n, e) {
                    const t = n.contentQueries || (n.contentQueries = []);
                    e !== (t.length ? t[t.length - 1] : -1) && t.push(n.queries.length - 1, e)
                }(i, n),
                2 == (2 & t) && (i.staticContentQueries = !0)
            }
            Nv(i, D(), t)
        }
        function fr() {
            return function aR(n, e) {
                return n[19].queries[e].queryList
            }(D(), cm())
        }
        function Nv(n, e, t) {
            const r = new os(4 == (4 & t));
            v_(n, e, r, r.destroy),
            null === e[19] && (e[19] = new Wd),
            e[19].queries.push(new zd(r))
        }
        function Ov(n, e, t) {
            null === n.queries && (n.queries = new qd),
            n.queries.track(new Kd(e,t))
        }
        function Rv(n, e) {
            return n.queries.getByIndex(e)
        }
        function el(...n) {}
        const tl = new A("Application Initializer");
        let nl = (()=>{
            class n {
                constructor(t) {
                    this.appInits = t,
                    this.resolve = el,
                    this.reject = el,
                    this.initialized = !1,
                    this.done = !1,
                    this.donePromise = new Promise((r,i)=>{
                        this.resolve = r,
                        this.reject = i
                    }
                    )
                }
                runInitializers() {
                    if (this.initialized)
                        return;
                    const t = []
                      , r = ()=>{
                        this.done = !0,
                        this.resolve()
                    }
                    ;
                    if (this.appInits)
                        for (let i = 0; i < this.appInits.length; i++) {
                            const o = this.appInits[i]();
                            if (Yo(o))
                                t.push(o);
                            else if (Md(o)) {
                                const s = new Promise((a,l)=>{
                                    o.subscribe({
                                        complete: a,
                                        error: l
                                    })
                                }
                                );
                                t.push(s)
                            }
                        }
                    Promise.all(t).then(()=>{
                        r()
                    }
                    ).catch(i=>{
                        this.reject(i)
                    }
                    ),
                    0 === t.length && r(),
                    this.initialized = !0
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(tl, 8))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        const as = new A("AppId",{
            providedIn: "root",
            factory: function Zv() {
                return `${eh()}${eh()}${eh()}`
            }
        });
        function eh() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()))
        }
        const Xv = new A("Platform Initializer")
          , th = new A("Platform ID",{
            providedIn: "platform",
            factory: ()=>"unknown"
        })
          , Jv = new A("appBootstrapListener")
          , ls = new A("AnimationModuleType");
        let MR = (()=>{
            class n {
                log(t) {
                    console.log(t)
                }
                warn(t) {
                    console.warn(t)
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "platform"
            }),
            n
        }
        )();
        const Dn = new A("LocaleId",{
            providedIn: "root",
            factory: ()=>be(Dn, U.Optional | U.SkipSelf) || function NR() {
                return typeof $localize < "u" && $localize.locale || Wi
            }()
        });
        class RR {
            constructor(e, t) {
                this.ngModuleFactory = e,
                this.componentFactories = t
            }
        }
        let nh = (()=>{
            class n {
                compileModuleSync(t) {
                    return new Hd(t)
                }
                compileModuleAsync(t) {
                    return Promise.resolve(this.compileModuleSync(t))
                }
                compileModuleAndAllComponentsSync(t) {
                    const r = this.compileModuleSync(t)
                      , o = Bn(At(t).declarations).reduce((s,a)=>{
                        const l = ce(a);
                        return l && s.push(new Wo(l)),
                        s
                    }
                    , []);
                    return new RR(r,o)
                }
                compileModuleAndAllComponentsAsync(t) {
                    return Promise.resolve(this.compileModuleAndAllComponentsSync(t))
                }
                clearCache() {}
                clearCacheFor(t) {}
                getModuleId(t) {}
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        const PR = (()=>Promise.resolve(0))();
        function rh(n) {
            typeof Zone > "u" ? PR.then(()=>{
                n && n.apply(null, null)
            }
            ) : Zone.current.scheduleMicroTask("scheduleMicrotask", n)
        }
        class ve {
            constructor({enableLongStackTrace: e=!1, shouldCoalesceEventChangeDetection: t=!1, shouldCoalesceRunChangeDetection: r=!1}) {
                if (this.hasPendingMacrotasks = !1,
                this.hasPendingMicrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new de(!1),
                this.onMicrotaskEmpty = new de(!1),
                this.onStable = new de(!1),
                this.onError = new de(!1),
                typeof Zone > "u")
                    throw new b(908,!1);
                Zone.assertZonePatched();
                const i = this;
                if (i._nesting = 0,
                i._outer = i._inner = Zone.current,
                Zone.AsyncStackTaggingZoneSpec) {
                    const o = Zone.AsyncStackTaggingZoneSpec;
                    i._inner = i._inner.fork(new o("Angular"))
                }
                Zone.TaskTrackingZoneSpec && (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec)),
                e && Zone.longStackTraceZoneSpec && (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
                i.shouldCoalesceEventChangeDetection = !r && t,
                i.shouldCoalesceRunChangeDetection = r,
                i.lastRequestAnimationFrameId = -1,
                i.nativeRequestAnimationFrame = function kR() {
                    let n = _e.requestAnimationFrame
                      , e = _e.cancelAnimationFrame;
                    if (typeof Zone < "u" && n && e) {
                        const t = n[Zone.__symbol__("OriginalDelegate")];
                        t && (n = t);
                        const r = e[Zone.__symbol__("OriginalDelegate")];
                        r && (e = r)
                    }
                    return {
                        nativeRequestAnimationFrame: n,
                        nativeCancelAnimationFrame: e
                    }
                }().nativeRequestAnimationFrame,
                function UR(n) {
                    const e = ()=>{
                        !function VR(n) {
                            n.isCheckStableRunning || -1 !== n.lastRequestAnimationFrameId || (n.lastRequestAnimationFrameId = n.nativeRequestAnimationFrame.call(_e, ()=>{
                                n.fakeTopEventTask || (n.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", ()=>{
                                    n.lastRequestAnimationFrameId = -1,
                                    oh(n),
                                    n.isCheckStableRunning = !0,
                                    ih(n),
                                    n.isCheckStableRunning = !1
                                }
                                , void 0, ()=>{}
                                , ()=>{}
                                )),
                                n.fakeTopEventTask.invoke()
                            }
                            ),
                            oh(n))
                        }(n)
                    }
                    ;
                    n._inner = n._inner.fork({
                        name: "angular",
                        properties: {
                            isAngularZone: !0
                        },
                        onInvokeTask: (t,r,i,o,s,a)=>{
                            try {
                                return nE(n),
                                t.invokeTask(i, o, s, a)
                            } finally {
                                (n.shouldCoalesceEventChangeDetection && "eventTask" === o.type || n.shouldCoalesceRunChangeDetection) && e(),
                                rE(n)
                            }
                        }
                        ,
                        onInvoke: (t,r,i,o,s,a,l)=>{
                            try {
                                return nE(n),
                                t.invoke(i, o, s, a, l)
                            } finally {
                                n.shouldCoalesceRunChangeDetection && e(),
                                rE(n)
                            }
                        }
                        ,
                        onHasTask: (t,r,i,o)=>{
                            t.hasTask(i, o),
                            r === i && ("microTask" == o.change ? (n._hasPendingMicrotasks = o.microTask,
                            oh(n),
                            ih(n)) : "macroTask" == o.change && (n.hasPendingMacrotasks = o.macroTask))
                        }
                        ,
                        onHandleError: (t,r,i,o)=>(t.handleError(i, o),
                        n.runOutsideAngular(()=>n.onError.emit(o)),
                        !1)
                    })
                }(i)
            }
            static isInAngularZone() {
                return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone")
            }
            static assertInAngularZone() {
                if (!ve.isInAngularZone())
                    throw new b(909,!1)
            }
            static assertNotInAngularZone() {
                if (ve.isInAngularZone())
                    throw new b(909,!1)
            }
            run(e, t, r) {
                return this._inner.run(e, t, r)
            }
            runTask(e, t, r, i) {
                const o = this._inner
                  , s = o.scheduleEventTask("NgZoneEvent: " + i, e, LR, el, el);
                try {
                    return o.runTask(s, t, r)
                } finally {
                    o.cancelTask(s)
                }
            }
            runGuarded(e, t, r) {
                return this._inner.runGuarded(e, t, r)
            }
            runOutsideAngular(e) {
                return this._outer.run(e)
            }
        }
        const LR = {};
        function ih(n) {
            if (0 == n._nesting && !n.hasPendingMicrotasks && !n.isStable)
                try {
                    n._nesting++,
                    n.onMicrotaskEmpty.emit(null)
                } finally {
                    if (n._nesting--,
                    !n.hasPendingMicrotasks)
                        try {
                            n.runOutsideAngular(()=>n.onStable.emit(null))
                        } finally {
                            n.isStable = !0
                        }
                }
        }
        function oh(n) {
            n.hasPendingMicrotasks = !!(n._hasPendingMicrotasks || (n.shouldCoalesceEventChangeDetection || n.shouldCoalesceRunChangeDetection) && -1 !== n.lastRequestAnimationFrameId)
        }
        function nE(n) {
            n._nesting++,
            n.isStable && (n.isStable = !1,
            n.onUnstable.emit(null))
        }
        function rE(n) {
            n._nesting--,
            ih(n)
        }
        class BR {
            constructor() {
                this.hasPendingMicrotasks = !1,
                this.hasPendingMacrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new de,
                this.onMicrotaskEmpty = new de,
                this.onStable = new de,
                this.onError = new de
            }
            run(e, t, r) {
                return e.apply(t, r)
            }
            runGuarded(e, t, r) {
                return e.apply(t, r)
            }
            runOutsideAngular(e) {
                return e()
            }
            runTask(e, t, r, i) {
                return e.apply(t, r)
            }
        }
        const iE = new A("")
          , rl = new A("");
        let lh, sh = (()=>{
            class n {
                constructor(t, r, i) {
                    this._ngZone = t,
                    this.registry = r,
                    this._pendingCount = 0,
                    this._isZoneStable = !0,
                    this._didWork = !1,
                    this._callbacks = [],
                    this.taskTrackingZone = null,
                    lh || (function HR(n) {
                        lh = n
                    }(i),
                    i.addToWindow(r)),
                    this._watchAngularEvents(),
                    t.run(()=>{
                        this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                    }
                    )
                }
                _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                        next: ()=>{
                            this._didWork = !0,
                            this._isZoneStable = !1
                        }
                    }),
                    this._ngZone.runOutsideAngular(()=>{
                        this._ngZone.onStable.subscribe({
                            next: ()=>{
                                ve.assertNotInAngularZone(),
                                rh(()=>{
                                    this._isZoneStable = !0,
                                    this._runCallbacksIfReady()
                                }
                                )
                            }
                        })
                    }
                    )
                }
                increasePendingRequestCount() {
                    return this._pendingCount += 1,
                    this._didWork = !0,
                    this._pendingCount
                }
                decreasePendingRequestCount() {
                    if (this._pendingCount -= 1,
                    this._pendingCount < 0)
                        throw new Error("pending async requests below zero");
                    return this._runCallbacksIfReady(),
                    this._pendingCount
                }
                isStable() {
                    return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                }
                _runCallbacksIfReady() {
                    if (this.isStable())
                        rh(()=>{
                            for (; 0 !== this._callbacks.length; ) {
                                let t = this._callbacks.pop();
                                clearTimeout(t.timeoutId),
                                t.doneCb(this._didWork)
                            }
                            this._didWork = !1
                        }
                        );
                    else {
                        let t = this.getPendingTasks();
                        this._callbacks = this._callbacks.filter(r=>!r.updateCb || !r.updateCb(t) || (clearTimeout(r.timeoutId),
                        !1)),
                        this._didWork = !0
                    }
                }
                getPendingTasks() {
                    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(t=>({
                        source: t.source,
                        creationLocation: t.creationLocation,
                        data: t.data
                    })) : []
                }
                addCallback(t, r, i) {
                    let o = -1;
                    r && r > 0 && (o = setTimeout(()=>{
                        this._callbacks = this._callbacks.filter(s=>s.timeoutId !== o),
                        t(this._didWork, this.getPendingTasks())
                    }
                    , r)),
                    this._callbacks.push({
                        doneCb: t,
                        timeoutId: o,
                        updateCb: i
                    })
                }
                whenStable(t, r, i) {
                    if (i && !this.taskTrackingZone)
                        throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                    this.addCallback(t, r, i),
                    this._runCallbacksIfReady()
                }
                getPendingRequestCount() {
                    return this._pendingCount
                }
                registerApplication(t) {
                    this.registry.registerApplication(t, this)
                }
                unregisterApplication(t) {
                    this.registry.unregisterApplication(t)
                }
                findProviders(t, r, i) {
                    return []
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(ve),T(ah),T(rl))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac
            }),
            n
        }
        )(), ah = (()=>{
            class n {
                constructor() {
                    this._applications = new Map
                }
                registerApplication(t, r) {
                    this._applications.set(t, r)
                }
                unregisterApplication(t) {
                    this._applications.delete(t)
                }
                unregisterAllApplications() {
                    this._applications.clear()
                }
                getTestability(t) {
                    return this._applications.get(t) || null
                }
                getAllTestabilities() {
                    return Array.from(this._applications.values())
                }
                getAllRootElements() {
                    return Array.from(this._applications.keys())
                }
                findTestabilityInTree(t, r=!0) {
                    return lh?.findTestabilityInTree(this, t, r) ?? null
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "platform"
            }),
            n
        }
        )(), pr = null;
        const oE = new A("AllowMultipleToken")
          , uh = new A("PlatformDestroyListeners");
        class sE {
            constructor(e, t) {
                this.name = e,
                this.token = t
            }
        }
        function lE(n, e, t=[]) {
            const r = `Platform: ${e}`
              , i = new A(r);
            return (o=[])=>{
                let s = ch();
                if (!s || s.injector.get(oE, !1)) {
                    const a = [...t, ...o, {
                        provide: i,
                        useValue: !0
                    }];
                    n ? n(a) : function $R(n) {
                        if (pr && !pr.get(oE, !1))
                            throw new b(400,!1);
                        pr = n;
                        const e = n.get(cE);
                        (function aE(n) {
                            const e = n.get(Xv, null);
                            e && e.forEach(t=>t())
                        }
                        )(n)
                    }(function uE(n=[], e) {
                        return Wt.create({
                            name: e,
                            providers: [{
                                provide: Ac,
                                useValue: "platform"
                            }, {
                                provide: uh,
                                useValue: new Set([()=>pr = null])
                            }, ...n]
                        })
                    }(a, r))
                }
                return function WR(n) {
                    const e = ch();
                    if (!e)
                        throw new b(401,!1);
                    return e
                }()
            }
        }
        function ch() {
            return pr?.get(cE) ?? null
        }
        let cE = (()=>{
            class n {
                constructor(t) {
                    this._injector = t,
                    this._modules = [],
                    this._destroyListeners = [],
                    this._destroyed = !1
                }
                bootstrapModuleFactory(t, r) {
                    const i = function hE(n, e) {
                        let t;
                        return t = "noop" === n ? new BR : ("zone.js" === n ? void 0 : n) || new ve(e),
                        t
                    }(r?.ngZone, function dE(n) {
                        return {
                            enableLongStackTrace: !1,
                            shouldCoalesceEventChangeDetection: !(!n || !n.ngZoneEventCoalescing) || !1,
                            shouldCoalesceRunChangeDetection: !(!n || !n.ngZoneRunCoalescing) || !1
                        }
                    }(r))
                      , o = [{
                        provide: ve,
                        useValue: i
                    }];
                    return i.run(()=>{
                        const s = Wt.create({
                            providers: o,
                            parent: this.injector,
                            name: t.moduleType.name
                        })
                          , a = t.create(s)
                          , l = a.injector.get(Mi, null);
                        if (!l)
                            throw new b(402,!1);
                        return i.runOutsideAngular(()=>{
                            const u = i.onError.subscribe({
                                next: c=>{
                                    l.handleError(c)
                                }
                            });
                            a.onDestroy(()=>{
                                il(this._modules, a),
                                u.unsubscribe()
                            }
                            )
                        }
                        ),
                        function fE(n, e, t) {
                            try {
                                const r = t();
                                return Yo(r) ? r.catch(i=>{
                                    throw e.runOutsideAngular(()=>n.handleError(i)),
                                    i
                                }
                                ) : r
                            } catch (r) {
                                throw e.runOutsideAngular(()=>n.handleError(r)),
                                r
                            }
                        }(l, i, ()=>{
                            const u = a.injector.get(nl);
                            return u.runInitializers(),
                            u.donePromise.then(()=>(function Uy(n) {
                                wt(n, "Expected localeId to be defined"),
                                "string" == typeof n && (Vy = n.toLowerCase().replace(/_/g, "-"))
                            }(a.injector.get(Dn, Wi) || Wi),
                            this._moduleDoBootstrap(a),
                            a))
                        }
                        )
                    }
                    )
                }
                bootstrapModule(t, r=[]) {
                    const i = pE({}, r);
                    return function jR(n, e, t) {
                        const r = new Hd(t);
                        return Promise.resolve(r)
                    }(0, 0, t).then(o=>this.bootstrapModuleFactory(o, i))
                }
                _moduleDoBootstrap(t) {
                    const r = t.injector.get(us);
                    if (t._bootstrapComponents.length > 0)
                        t._bootstrapComponents.forEach(i=>r.bootstrap(i));
                    else {
                        if (!t.instance.ngDoBootstrap)
                            throw new b(403,!1);
                        t.instance.ngDoBootstrap(r)
                    }
                    this._modules.push(t)
                }
                onDestroy(t) {
                    this._destroyListeners.push(t)
                }
                get injector() {
                    return this._injector
                }
                destroy() {
                    if (this._destroyed)
                        throw new b(404,!1);
                    this._modules.slice().forEach(r=>r.destroy()),
                    this._destroyListeners.forEach(r=>r());
                    const t = this._injector.get(uh, null);
                    t && (t.forEach(r=>r()),
                    t.clear()),
                    this._destroyed = !0
                }
                get destroyed() {
                    return this._destroyed
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Wt))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "platform"
            }),
            n
        }
        )();
        function pE(n, e) {
            return Array.isArray(e) ? e.reduce(pE, n) : {
                ...n,
                ...e
            }
        }
        let us = (()=>{
            class n {
                constructor(t, r, i) {
                    this._zone = t,
                    this._injector = r,
                    this._exceptionHandler = i,
                    this._bootstrapListeners = [],
                    this._views = [],
                    this._runningTick = !1,
                    this._stable = !0,
                    this._destroyed = !1,
                    this._destroyListeners = [],
                    this.componentTypes = [],
                    this.components = [],
                    this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                        next: ()=>{
                            this._zone.run(()=>{
                                this.tick()
                            }
                            )
                        }
                    });
                    const o = new xe(a=>{
                        this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks,
                        this._zone.runOutsideAngular(()=>{
                            a.next(this._stable),
                            a.complete()
                        }
                        )
                    }
                    )
                      , s = new xe(a=>{
                        let l;
                        this._zone.runOutsideAngular(()=>{
                            l = this._zone.onStable.subscribe(()=>{
                                ve.assertNotInAngularZone(),
                                rh(()=>{
                                    !this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && (this._stable = !0,
                                    a.next(!0))
                                }
                                )
                            }
                            )
                        }
                        );
                        const u = this._zone.onUnstable.subscribe(()=>{
                            ve.assertInAngularZone(),
                            this._stable && (this._stable = !1,
                            this._zone.runOutsideAngular(()=>{
                                a.next(!1)
                            }
                            ))
                        }
                        );
                        return ()=>{
                            l.unsubscribe(),
                            u.unsubscribe()
                        }
                    }
                    );
                    this.isStable = go(o, s.pipe(function HI(n={}) {
                        const {connector: e=(()=>new Fe), resetOnError: t=!0, resetOnComplete: r=!0, resetOnRefCountZero: i=!0} = n;
                        return o=>{
                            let s, a, l, u = 0, c = !1, d = !1;
                            const h = ()=>{
                                a?.unsubscribe(),
                                a = void 0
                            }
                              , f = ()=>{
                                h(),
                                s = l = void 0,
                                c = d = !1
                            }
                              , p = ()=>{
                                const g = s;
                                f(),
                                g?.unsubscribe()
                            }
                            ;
                            return Pe((g,y)=>{
                                u++,
                                !d && !c && h();
                                const C = l = l ?? e();
                                y.add(()=>{
                                    u--,
                                    0 === u && !d && !c && (a = Fu(p, i))
                                }
                                ),
                                C.subscribe(y),
                                !s && u > 0 && (s = new po({
                                    next: S=>C.next(S),
                                    error: S=>{
                                        d = !0,
                                        h(),
                                        a = Fu(f, t, S),
                                        C.error(S)
                                    }
                                    ,
                                    complete: ()=>{
                                        c = !0,
                                        h(),
                                        a = Fu(f, r),
                                        C.complete()
                                    }
                                }),
                                Ht(g).subscribe(s))
                            }
                            )(o)
                        }
                    }()))
                }
                get destroyed() {
                    return this._destroyed
                }
                get injector() {
                    return this._injector
                }
                bootstrap(t, r) {
                    const i = t instanceof dg;
                    if (!this._injector.get(nl).done)
                        throw !i && function ui(n) {
                            const e = ce(n) || ct(n) || dt(n);
                            return null !== e && e.standalone
                        }(t),
                        new b(405,false);
                    let s;
                    s = i ? t : this._injector.get(Bo).resolveComponentFactory(t),
                    this.componentTypes.push(s.componentType);
                    const a = function GR(n) {
                        return n.isBoundToModule
                    }(s) ? void 0 : this._injector.get(Hr)
                      , u = s.create(Wt.NULL, [], r || s.selector, a)
                      , c = u.location.nativeElement
                      , d = u.injector.get(iE, null);
                    return d?.registerApplication(c),
                    u.onDestroy(()=>{
                        this.detachView(u.hostView),
                        il(this.components, u),
                        d?.unregisterApplication(c)
                    }
                    ),
                    this._loadComponent(u),
                    u
                }
                tick() {
                    if (this._runningTick)
                        throw new b(101,!1);
                    try {
                        this._runningTick = !0;
                        for (let t of this._views)
                            t.detectChanges()
                    } catch (t) {
                        this._zone.runOutsideAngular(()=>this._exceptionHandler.handleError(t))
                    } finally {
                        this._runningTick = !1
                    }
                }
                attachView(t) {
                    const r = t;
                    this._views.push(r),
                    r.attachToAppRef(this)
                }
                detachView(t) {
                    const r = t;
                    il(this._views, r),
                    r.detachFromAppRef()
                }
                _loadComponent(t) {
                    this.attachView(t.hostView),
                    this.tick(),
                    this.components.push(t),
                    this._injector.get(Jv, []).concat(this._bootstrapListeners).forEach(i=>i(t))
                }
                ngOnDestroy() {
                    if (!this._destroyed)
                        try {
                            this._destroyListeners.forEach(t=>t()),
                            this._views.slice().forEach(t=>t.destroy()),
                            this._onMicrotaskEmptySubscription.unsubscribe()
                        } finally {
                            this._destroyed = !0,
                            this._views = [],
                            this._bootstrapListeners = [],
                            this._destroyListeners = []
                        }
                }
                onDestroy(t) {
                    return this._destroyListeners.push(t),
                    ()=>il(this._destroyListeners, t)
                }
                destroy() {
                    if (this._destroyed)
                        throw new b(406,!1);
                    const t = this._injector;
                    t.destroy && !t.destroyed && t.destroy()
                }
                get viewCount() {
                    return this._views.length
                }
                warnIfDestroyed() {}
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(ve),T(ar),T(Mi))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        function il(n, e) {
            const t = n.indexOf(e);
            t > -1 && n.splice(t, 1)
        }
        let gE = !0
          , Qi = (()=>{
            class n {
            }
            return n.__NG_ELEMENT_ID__ = QR,
            n
        }
        )();
        function QR(n) {
            return function YR(n, e, t) {
                if (ia(n) && !t) {
                    const r = Ot(n.index, e);
                    return new zo(r,r)
                }
                return 47 & n.type ? new zo(e[16],e) : null
            }(Ge(), D(), 16 == (16 & n))
        }
        class CE {
            constructor() {}
            supports(e) {
                return qo(e)
            }
            create(e) {
                return new nx(e)
            }
        }
        const tx = (n,e)=>e;
        class nx {
            constructor(e) {
                this.length = 0,
                this._linkedRecords = null,
                this._unlinkedRecords = null,
                this._previousItHead = null,
                this._itHead = null,
                this._itTail = null,
                this._additionsHead = null,
                this._additionsTail = null,
                this._movesHead = null,
                this._movesTail = null,
                this._removalsHead = null,
                this._removalsTail = null,
                this._identityChangesHead = null,
                this._identityChangesTail = null,
                this._trackByFn = e || tx
            }
            forEachItem(e) {
                let t;
                for (t = this._itHead; null !== t; t = t._next)
                    e(t)
            }
            forEachOperation(e) {
                let t = this._itHead
                  , r = this._removalsHead
                  , i = 0
                  , o = null;
                for (; t || r; ) {
                    const s = !r || t && t.currentIndex < DE(r, i, o) ? t : r
                      , a = DE(s, i, o)
                      , l = s.currentIndex;
                    if (s === r)
                        i--,
                        r = r._nextRemoved;
                    else if (t = t._next,
                    null == s.previousIndex)
                        i++;
                    else {
                        o || (o = []);
                        const u = a - i
                          , c = l - i;
                        if (u != c) {
                            for (let h = 0; h < u; h++) {
                                const f = h < o.length ? o[h] : o[h] = 0
                                  , p = f + h;
                                c <= p && p < u && (o[h] = f + 1)
                            }
                            o[s.previousIndex] = c - u
                        }
                    }
                    a !== l && e(s, a, l)
                }
            }
            forEachPreviousItem(e) {
                let t;
                for (t = this._previousItHead; null !== t; t = t._nextPrevious)
                    e(t)
            }
            forEachAddedItem(e) {
                let t;
                for (t = this._additionsHead; null !== t; t = t._nextAdded)
                    e(t)
            }
            forEachMovedItem(e) {
                let t;
                for (t = this._movesHead; null !== t; t = t._nextMoved)
                    e(t)
            }
            forEachRemovedItem(e) {
                let t;
                for (t = this._removalsHead; null !== t; t = t._nextRemoved)
                    e(t)
            }
            forEachIdentityChange(e) {
                let t;
                for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange)
                    e(t)
            }
            diff(e) {
                if (null == e && (e = []),
                !qo(e))
                    throw new b(900,!1);
                return this.check(e) ? this : null
            }
            onDestroy() {}
            check(e) {
                this._reset();
                let i, o, s, t = this._itHead, r = !1;
                if (Array.isArray(e)) {
                    this.length = e.length;
                    for (let a = 0; a < this.length; a++)
                        o = e[a],
                        s = this._trackByFn(a, o),
                        null !== t && Object.is(t.trackById, s) ? (r && (t = this._verifyReinsertion(t, o, s, a)),
                        Object.is(t.item, o) || this._addIdentityChange(t, o)) : (t = this._mismatch(t, o, s, a),
                        r = !0),
                        t = t._next
                } else
                    i = 0,
                    function A0(n, e) {
                        if (Array.isArray(n))
                            for (let t = 0; t < n.length; t++)
                                e(n[t]);
                        else {
                            const t = n[Lr()]();
                            let r;
                            for (; !(r = t.next()).done; )
                                e(r.value)
                        }
                    }(e, a=>{
                        s = this._trackByFn(i, a),
                        null !== t && Object.is(t.trackById, s) ? (r && (t = this._verifyReinsertion(t, a, s, i)),
                        Object.is(t.item, a) || this._addIdentityChange(t, a)) : (t = this._mismatch(t, a, s, i),
                        r = !0),
                        t = t._next,
                        i++
                    }
                    ),
                    this.length = i;
                return this._truncate(t),
                this.collection = e,
                this.isDirty
            }
            get isDirty() {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
            }
            _reset() {
                if (this.isDirty) {
                    let e;
                    for (e = this._previousItHead = this._itHead; null !== e; e = e._next)
                        e._nextPrevious = e._next;
                    for (e = this._additionsHead; null !== e; e = e._nextAdded)
                        e.previousIndex = e.currentIndex;
                    for (this._additionsHead = this._additionsTail = null,
                    e = this._movesHead; null !== e; e = e._nextMoved)
                        e.previousIndex = e.currentIndex;
                    this._movesHead = this._movesTail = null,
                    this._removalsHead = this._removalsTail = null,
                    this._identityChangesHead = this._identityChangesTail = null
                }
            }
            _mismatch(e, t, r, i) {
                let o;
                return null === e ? o = this._itTail : (o = e._prev,
                this._remove(e)),
                null !== (e = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null)) ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, o, i)) : null !== (e = null === this._linkedRecords ? null : this._linkedRecords.get(r, i)) ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, o, i)) : e = this._addAfter(new rx(t,r), o, i),
                e
            }
            _verifyReinsertion(e, t, r, i) {
                let o = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
                return null !== o ? e = this._reinsertAfter(o, e._prev, i) : e.currentIndex != i && (e.currentIndex = i,
                this._addToMoves(e, i)),
                e
            }
            _truncate(e) {
                for (; null !== e; ) {
                    const t = e._next;
                    this._addToRemovals(this._unlink(e)),
                    e = t
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                null !== this._additionsTail && (this._additionsTail._nextAdded = null),
                null !== this._movesTail && (this._movesTail._nextMoved = null),
                null !== this._itTail && (this._itTail._next = null),
                null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
                null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
            }
            _reinsertAfter(e, t, r) {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
                const i = e._prevRemoved
                  , o = e._nextRemoved;
                return null === i ? this._removalsHead = o : i._nextRemoved = o,
                null === o ? this._removalsTail = i : o._prevRemoved = i,
                this._insertAfter(e, t, r),
                this._addToMoves(e, r),
                e
            }
            _moveAfter(e, t, r) {
                return this._unlink(e),
                this._insertAfter(e, t, r),
                this._addToMoves(e, r),
                e
            }
            _addAfter(e, t, r) {
                return this._insertAfter(e, t, r),
                this._additionsTail = null === this._additionsTail ? this._additionsHead = e : this._additionsTail._nextAdded = e,
                e
            }
            _insertAfter(e, t, r) {
                const i = null === t ? this._itHead : t._next;
                return e._next = i,
                e._prev = t,
                null === i ? this._itTail = e : i._prev = e,
                null === t ? this._itHead = e : t._next = e,
                null === this._linkedRecords && (this._linkedRecords = new bE),
                this._linkedRecords.put(e),
                e.currentIndex = r,
                e
            }
            _remove(e) {
                return this._addToRemovals(this._unlink(e))
            }
            _unlink(e) {
                null !== this._linkedRecords && this._linkedRecords.remove(e);
                const t = e._prev
                  , r = e._next;
                return null === t ? this._itHead = r : t._next = r,
                null === r ? this._itTail = t : r._prev = t,
                e
            }
            _addToMoves(e, t) {
                return e.previousIndex === t || (this._movesTail = null === this._movesTail ? this._movesHead = e : this._movesTail._nextMoved = e),
                e
            }
            _addToRemovals(e) {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new bE),
                this._unlinkedRecords.put(e),
                e.currentIndex = null,
                e._nextRemoved = null,
                null === this._removalsTail ? (this._removalsTail = this._removalsHead = e,
                e._prevRemoved = null) : (e._prevRemoved = this._removalsTail,
                this._removalsTail = this._removalsTail._nextRemoved = e),
                e
            }
            _addIdentityChange(e, t) {
                return e.item = t,
                this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = e : this._identityChangesTail._nextIdentityChange = e,
                e
            }
        }
        class rx {
            constructor(e, t) {
                this.item = e,
                this.trackById = t,
                this.currentIndex = null,
                this.previousIndex = null,
                this._nextPrevious = null,
                this._prev = null,
                this._next = null,
                this._prevDup = null,
                this._nextDup = null,
                this._prevRemoved = null,
                this._nextRemoved = null,
                this._nextAdded = null,
                this._nextMoved = null,
                this._nextIdentityChange = null
            }
        }
        class ix {
            constructor() {
                this._head = null,
                this._tail = null
            }
            add(e) {
                null === this._head ? (this._head = this._tail = e,
                e._nextDup = null,
                e._prevDup = null) : (this._tail._nextDup = e,
                e._prevDup = this._tail,
                e._nextDup = null,
                this._tail = e)
            }
            get(e, t) {
                let r;
                for (r = this._head; null !== r; r = r._nextDup)
                    if ((null === t || t <= r.currentIndex) && Object.is(r.trackById, e))
                        return r;
                return null
            }
            remove(e) {
                const t = e._prevDup
                  , r = e._nextDup;
                return null === t ? this._head = r : t._nextDup = r,
                null === r ? this._tail = t : r._prevDup = t,
                null === this._head
            }
        }
        class bE {
            constructor() {
                this.map = new Map
            }
            put(e) {
                const t = e.trackById;
                let r = this.map.get(t);
                r || (r = new ix,
                this.map.set(t, r)),
                r.add(e)
            }
            get(e, t) {
                const i = this.map.get(e);
                return i ? i.get(e, t) : null
            }
            remove(e) {
                const t = e.trackById;
                return this.map.get(t).remove(e) && this.map.delete(t),
                e
            }
            get isEmpty() {
                return 0 === this.map.size
            }
            clear() {
                this.map.clear()
            }
        }
        function DE(n, e, t) {
            const r = n.previousIndex;
            if (null === r)
                return r;
            let i = 0;
            return t && r < t.length && (i = t[r]),
            r + e + i
        }
        function IE() {
            return new al([new CE])
        }
        let al = (()=>{
            class n {
                constructor(t) {
                    this.factories = t
                }
                static create(t, r) {
                    if (null != r) {
                        const i = r.factories.slice();
                        t = t.concat(i)
                    }
                    return new n(t)
                }
                static extend(t) {
                    return {
                        provide: n,
                        useFactory: r=>n.create(t, r || IE()),
                        deps: [[n, new Fo, new xo]]
                    }
                }
                find(t) {
                    const r = this.factories.find(i=>i.supports(t));
                    if (null != r)
                        return r;
                    throw new b(901,!1)
                }
            }
            return n.\u0275prov = F({
                token: n,
                providedIn: "root",
                factory: IE
            }),
            n
        }
        )();
        const ux = lE(null, "core", []);
        let cx = (()=>{
            class n {
                constructor(t) {}
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(us))
            }
            ,
            n.\u0275mod = vt({
                type: n
            }),
            n.\u0275inj = ut({}),
            n
        }
        )()
          , ll = null;
        function Sn() {
            return ll
        }
        const Re = new A("DocumentToken");
        let mh = (()=>{
            class n {
                historyGo(t) {
                    throw new Error("Not implemented")
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: function() {
                    return function px() {
                        return T(wE)
                    }()
                },
                providedIn: "platform"
            }),
            n
        }
        )();
        const mx = new A("Location Initialized");
        let wE = (()=>{
            class n extends mh {
                constructor(t) {
                    super(),
                    this._doc = t,
                    this._init()
                }
                _init() {
                    this.location = window.location,
                    this._history = window.history
                }
                getBaseHrefFromDOM() {
                    return Sn().getBaseHref(this._doc)
                }
                onPopState(t) {
                    const r = Sn().getGlobalEventTarget(this._doc, "window");
                    return r.addEventListener("popstate", t, !1),
                    ()=>r.removeEventListener("popstate", t)
                }
                onHashChange(t) {
                    const r = Sn().getGlobalEventTarget(this._doc, "window");
                    return r.addEventListener("hashchange", t, !1),
                    ()=>r.removeEventListener("hashchange", t)
                }
                get href() {
                    return this.location.href
                }
                get protocol() {
                    return this.location.protocol
                }
                get hostname() {
                    return this.location.hostname
                }
                get port() {
                    return this.location.port
                }
                get pathname() {
                    return this.location.pathname
                }
                get search() {
                    return this.location.search
                }
                get hash() {
                    return this.location.hash
                }
                set pathname(t) {
                    this.location.pathname = t
                }
                pushState(t, r, i) {
                    AE() ? this._history.pushState(t, r, i) : this.location.hash = i
                }
                replaceState(t, r, i) {
                    AE() ? this._history.replaceState(t, r, i) : this.location.hash = i
                }
                forward() {
                    this._history.forward()
                }
                back() {
                    this._history.back()
                }
                historyGo(t=0) {
                    this._history.go(t)
                }
                getState() {
                    return this._history.state
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Re))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: function() {
                    return function gx() {
                        return new wE(T(Re))
                    }()
                },
                providedIn: "platform"
            }),
            n
        }
        )();
        function AE() {
            return !!window.history.pushState
        }
        function gh(n, e) {
            if (0 == n.length)
                return e;
            if (0 == e.length)
                return n;
            let t = 0;
            return n.endsWith("/") && t++,
            e.startsWith("/") && t++,
            2 == t ? n + e.substring(1) : 1 == t ? n + e : n + "/" + e
        }
        function ME(n) {
            const e = n.match(/#|\?|$/)
              , t = e && e.index || n.length;
            return n.slice(0, t - ("/" === n[t - 1] ? 1 : 0)) + n.slice(t)
        }
        function qn(n) {
            return n && "?" !== n[0] ? "?" + n : n
        }
        let $r = (()=>{
            class n {
                historyGo(t) {
                    throw new Error("Not implemented")
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: function() {
                    return be(OE)
                },
                providedIn: "root"
            }),
            n
        }
        )();
        const NE = new A("appBaseHref");
        let OE = (()=>{
            class n extends $r {
                constructor(t, r) {
                    super(),
                    this._platformLocation = t,
                    this._removeListenerFns = [],
                    this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? be(Re).location?.origin ?? ""
                }
                ngOnDestroy() {
                    for (; this._removeListenerFns.length; )
                        this._removeListenerFns.pop()()
                }
                onPopState(t) {
                    this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
                }
                getBaseHref() {
                    return this._baseHref
                }
                prepareExternalUrl(t) {
                    return gh(this._baseHref, t)
                }
                path(t=!1) {
                    const r = this._platformLocation.pathname + qn(this._platformLocation.search)
                      , i = this._platformLocation.hash;
                    return i && t ? `${r}${i}` : r
                }
                pushState(t, r, i, o) {
                    const s = this.prepareExternalUrl(i + qn(o));
                    this._platformLocation.pushState(t, r, s)
                }
                replaceState(t, r, i, o) {
                    const s = this.prepareExternalUrl(i + qn(o));
                    this._platformLocation.replaceState(t, r, s)
                }
                forward() {
                    this._platformLocation.forward()
                }
                back() {
                    this._platformLocation.back()
                }
                getState() {
                    return this._platformLocation.getState()
                }
                historyGo(t=0) {
                    this._platformLocation.historyGo?.(t)
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(mh),T(NE, 8))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )()
          , _x = (()=>{
            class n extends $r {
                constructor(t, r) {
                    super(),
                    this._platformLocation = t,
                    this._baseHref = "",
                    this._removeListenerFns = [],
                    null != r && (this._baseHref = r)
                }
                ngOnDestroy() {
                    for (; this._removeListenerFns.length; )
                        this._removeListenerFns.pop()()
                }
                onPopState(t) {
                    this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
                }
                getBaseHref() {
                    return this._baseHref
                }
                path(t=!1) {
                    let r = this._platformLocation.hash;
                    return null == r && (r = "#"),
                    r.length > 0 ? r.substring(1) : r
                }
                prepareExternalUrl(t) {
                    const r = gh(this._baseHref, t);
                    return r.length > 0 ? "#" + r : r
                }
                pushState(t, r, i, o) {
                    let s = this.prepareExternalUrl(i + qn(o));
                    0 == s.length && (s = this._platformLocation.pathname),
                    this._platformLocation.pushState(t, r, s)
                }
                replaceState(t, r, i, o) {
                    let s = this.prepareExternalUrl(i + qn(o));
                    0 == s.length && (s = this._platformLocation.pathname),
                    this._platformLocation.replaceState(t, r, s)
                }
                forward() {
                    this._platformLocation.forward()
                }
                back() {
                    this._platformLocation.back()
                }
                getState() {
                    return this._platformLocation.getState()
                }
                historyGo(t=0) {
                    this._platformLocation.historyGo?.(t)
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(mh),T(NE, 8))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac
            }),
            n
        }
        )()
          , _h = (()=>{
            class n {
                constructor(t) {
                    this._subject = new de,
                    this._urlChangeListeners = [],
                    this._urlChangeSubscription = null,
                    this._locationStrategy = t;
                    const r = this._locationStrategy.getBaseHref();
                    this._baseHref = ME(RE(r)),
                    this._locationStrategy.onPopState(i=>{
                        this._subject.emit({
                            url: this.path(!0),
                            pop: !0,
                            state: i.state,
                            type: i.type
                        })
                    }
                    )
                }
                ngOnDestroy() {
                    this._urlChangeSubscription?.unsubscribe(),
                    this._urlChangeListeners = []
                }
                path(t=!1) {
                    return this.normalize(this._locationStrategy.path(t))
                }
                getState() {
                    return this._locationStrategy.getState()
                }
                isCurrentPathEqualTo(t, r="") {
                    return this.path() == this.normalize(t + qn(r))
                }
                normalize(t) {
                    return n.stripTrailingSlash(function vx(n, e) {
                        return n && e.startsWith(n) ? e.substring(n.length) : e
                    }(this._baseHref, RE(t)))
                }
                prepareExternalUrl(t) {
                    return t && "/" !== t[0] && (t = "/" + t),
                    this._locationStrategy.prepareExternalUrl(t)
                }
                go(t, r="", i=null) {
                    this._locationStrategy.pushState(i, "", t, r),
                    this._notifyUrlChangeListeners(this.prepareExternalUrl(t + qn(r)), i)
                }
                replaceState(t, r="", i=null) {
                    this._locationStrategy.replaceState(i, "", t, r),
                    this._notifyUrlChangeListeners(this.prepareExternalUrl(t + qn(r)), i)
                }
                forward() {
                    this._locationStrategy.forward()
                }
                back() {
                    this._locationStrategy.back()
                }
                historyGo(t=0) {
                    this._locationStrategy.historyGo?.(t)
                }
                onUrlChange(t) {
                    return this._urlChangeListeners.push(t),
                    this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(r=>{
                        this._notifyUrlChangeListeners(r.url, r.state)
                    }
                    )),
                    ()=>{
                        const r = this._urlChangeListeners.indexOf(t);
                        this._urlChangeListeners.splice(r, 1),
                        0 === this._urlChangeListeners.length && (this._urlChangeSubscription?.unsubscribe(),
                        this._urlChangeSubscription = null)
                    }
                }
                _notifyUrlChangeListeners(t="", r) {
                    this._urlChangeListeners.forEach(i=>i(t, r))
                }
                subscribe(t, r, i) {
                    return this._subject.subscribe({
                        next: t,
                        error: r,
                        complete: i
                    })
                }
            }
            return n.normalizeQueryParams = qn,
            n.joinWithSlash = gh,
            n.stripTrailingSlash = ME,
            n.\u0275fac = function(t) {
                return new (t || n)(T($r))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: function() {
                    return function yx() {
                        return new _h(T($r))
                    }()
                },
                providedIn: "root"
            }),
            n
        }
        )();
        function RE(n) {
            return n.replace(/\/index.html$/, "")
        }
        class oF {
            constructor(e, t, r, i) {
                this.$implicit = e,
                this.ngForOf = t,
                this.index = r,
                this.count = i
            }
            get first() {
                return 0 === this.index
            }
            get last() {
                return this.index === this.count - 1
            }
            get even() {
                return this.index % 2 == 0
            }
            get odd() {
                return !this.even
            }
        }
        let GE = (()=>{
            class n {
                constructor(t, r, i) {
                    this._viewContainer = t,
                    this._template = r,
                    this._differs = i,
                    this._ngForOf = null,
                    this._ngForOfDirty = !0,
                    this._differ = null
                }
                set ngForOf(t) {
                    this._ngForOf = t,
                    this._ngForOfDirty = !0
                }
                set ngForTrackBy(t) {
                    this._trackByFn = t
                }
                get ngForTrackBy() {
                    return this._trackByFn
                }
                set ngForTemplate(t) {
                    t && (this._template = t)
                }
                ngDoCheck() {
                    if (this._ngForOfDirty) {
                        this._ngForOfDirty = !1;
                        const t = this._ngForOf;
                        !this._differ && t && (this._differ = this._differs.find(t).create(this.ngForTrackBy))
                    }
                    if (this._differ) {
                        const t = this._differ.diff(this._ngForOf);
                        t && this._applyChanges(t)
                    }
                }
                _applyChanges(t) {
                    const r = this._viewContainer;
                    t.forEachOperation((i,o,s)=>{
                        if (null == i.previousIndex)
                            r.createEmbeddedView(this._template, new oF(i.item,this._ngForOf,-1,-1), null === s ? void 0 : s);
                        else if (null == s)
                            r.remove(null === o ? void 0 : o);
                        else if (null !== o) {
                            const a = r.get(o);
                            r.move(a, s),
                            $E(a, i)
                        }
                    }
                    );
                    for (let i = 0, o = r.length; i < o; i++) {
                        const a = r.get(i).context;
                        a.index = i,
                        a.count = o,
                        a.ngForOf = this._ngForOf
                    }
                    t.forEachIdentityChange(i=>{
                        $E(r.get(i.currentIndex), i)
                    }
                    )
                }
                static ngTemplateContextGuard(t, r) {
                    return !0
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(E(hn),E($n),E(al))
            }
            ,
            n.\u0275dir = x({
                type: n,
                selectors: [["", "ngFor", "", "ngForOf", ""]],
                inputs: {
                    ngForOf: "ngForOf",
                    ngForTrackBy: "ngForTrackBy",
                    ngForTemplate: "ngForTemplate"
                },
                standalone: !0
            }),
            n
        }
        )();
        function $E(n, e) {
            n.context.$implicit = e.item
        }
        let PF = (()=>{
            class n {
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275mod = vt({
                type: n
            }),
            n.\u0275inj = ut({}),
            n
        }
        )();
        const KE = "browser";
        let BF = (()=>{
            class n {
            }
            return n.\u0275prov = F({
                token: n,
                providedIn: "root",
                factory: ()=>new HF(T(Re),window)
            }),
            n
        }
        )();
        class HF {
            constructor(e, t) {
                this.document = e,
                this.window = t,
                this.offset = ()=>[0, 0]
            }
            setOffset(e) {
                this.offset = Array.isArray(e) ? ()=>e : e
            }
            getScrollPosition() {
                return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
            }
            scrollToPosition(e) {
                this.supportsScrolling() && this.window.scrollTo(e[0], e[1])
            }
            scrollToAnchor(e) {
                if (!this.supportsScrolling())
                    return;
                const t = function jF(n, e) {
                    const t = n.getElementById(e) || n.getElementsByName(e)[0];
                    if (t)
                        return t;
                    if ("function" == typeof n.createTreeWalker && n.body && (n.body.createShadowRoot || n.body.attachShadow)) {
                        const r = n.createTreeWalker(n.body, NodeFilter.SHOW_ELEMENT);
                        let i = r.currentNode;
                        for (; i; ) {
                            const o = i.shadowRoot;
                            if (o) {
                                const s = o.getElementById(e) || o.querySelector(`[name="${e}"]`);
                                if (s)
                                    return s
                            }
                            i = r.nextNode()
                        }
                    }
                    return null
                }(this.document, e);
                t && (this.scrollToElement(t),
                t.focus())
            }
            setHistoryScrollRestoration(e) {
                if (this.supportScrollRestoration()) {
                    const t = this.window.history;
                    t && t.scrollRestoration && (t.scrollRestoration = e)
                }
            }
            scrollToElement(e) {
                const t = e.getBoundingClientRect()
                  , r = t.left + this.window.pageXOffset
                  , i = t.top + this.window.pageYOffset
                  , o = this.offset();
                this.window.scrollTo(r - o[0], i - o[1])
            }
            supportScrollRestoration() {
                try {
                    if (!this.supportsScrolling())
                        return !1;
                    const e = QE(this.window.history) || QE(Object.getPrototypeOf(this.window.history));
                    return !(!e || !e.writable && !e.set)
                } catch {
                    return !1
                }
            }
            supportsScrolling() {
                try {
                    return !!this.window && !!this.window.scrollTo && "pageXOffset"in this.window
                } catch {
                    return !1
                }
            }
        }
        function QE(n) {
            return Object.getOwnPropertyDescriptor(n, "scrollRestoration")
        }
        class xh extends class aP extends class fx {
        }
        {
            constructor() {
                super(...arguments),
                this.supportsDOMEvents = !0
            }
        }
        {
            static makeCurrent() {
                !function hx(n) {
                    ll || (ll = n)
                }(new xh)
            }
            onAndCancel(e, t, r) {
                return e.addEventListener(t, r, !1),
                ()=>{
                    e.removeEventListener(t, r, !1)
                }
            }
            dispatchEvent(e, t) {
                e.dispatchEvent(t)
            }
            remove(e) {
                e.parentNode && e.parentNode.removeChild(e)
            }
            createElement(e, t) {
                return (t = t || this.getDefaultDocument()).createElement(e)
            }
            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }
            getDefaultDocument() {
                return document
            }
            isElementNode(e) {
                return e.nodeType === Node.ELEMENT_NODE
            }
            isShadowRoot(e) {
                return e instanceof DocumentFragment
            }
            getGlobalEventTarget(e, t) {
                return "window" === t ? window : "document" === t ? e : "body" === t ? e.body : null
            }
            getBaseHref(e) {
                const t = function lP() {
                    return ps = ps || document.querySelector("base"),
                    ps ? ps.getAttribute("href") : null
                }();
                return null == t ? null : function uP(n) {
                    vl = vl || document.createElement("a"),
                    vl.setAttribute("href", n);
                    const e = vl.pathname;
                    return "/" === e.charAt(0) ? e : `/${e}`
                }(t)
            }
            resetBaseElement() {
                ps = null
            }
            getUserAgent() {
                return window.navigator.userAgent
            }
            getCookie(e) {
                return function nF(n, e) {
                    e = encodeURIComponent(e);
                    for (const t of n.split(";")) {
                        const r = t.indexOf("=")
                          , [i,o] = -1 == r ? [t, ""] : [t.slice(0, r), t.slice(r + 1)];
                        if (i.trim() === e)
                            return decodeURIComponent(o)
                    }
                    return null
                }(document.cookie, e)
            }
        }
        let vl, ps = null;
        const JE = new A("TRANSITION_ID")
          , dP = [{
            provide: tl,
            useFactory: function cP(n, e, t) {
                return ()=>{
                    t.get(nl).donePromise.then(()=>{
                        const r = Sn()
                          , i = e.querySelectorAll(`style[ng-transition="${n}"]`);
                        for (let o = 0; o < i.length; o++)
                            r.remove(i[o])
                    }
                    )
                }
            },
            deps: [JE, Re, Wt],
            multi: !0
        }];
        let fP = (()=>{
            class n {
                build() {
                    return new XMLHttpRequest
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac
            }),
            n
        }
        )();
        const El = new A("EventManagerPlugins");
        let Cl = (()=>{
            class n {
                constructor(t, r) {
                    this._zone = r,
                    this._eventNameToPlugin = new Map,
                    t.forEach(i=>i.manager = this),
                    this._plugins = t.slice().reverse()
                }
                addEventListener(t, r, i) {
                    return this._findPluginFor(r).addEventListener(t, r, i)
                }
                addGlobalEventListener(t, r, i) {
                    return this._findPluginFor(r).addGlobalEventListener(t, r, i)
                }
                getZone() {
                    return this._zone
                }
                _findPluginFor(t) {
                    const r = this._eventNameToPlugin.get(t);
                    if (r)
                        return r;
                    const i = this._plugins;
                    for (let o = 0; o < i.length; o++) {
                        const s = i[o];
                        if (s.supports(t))
                            return this._eventNameToPlugin.set(t, s),
                            s
                    }
                    throw new Error(`No event manager plugin found for event ${t}`)
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(El),T(ve))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac
            }),
            n
        }
        )();
        class eC {
            constructor(e) {
                this._doc = e
            }
            addGlobalEventListener(e, t, r) {
                const i = Sn().getGlobalEventTarget(this._doc, e);
                if (!i)
                    throw new Error(`Unsupported event target ${i} for event ${t}`);
                return this.addEventListener(i, t, r)
            }
        }
        let tC = (()=>{
            class n {
                constructor() {
                    this._stylesSet = new Set
                }
                addStyles(t) {
                    const r = new Set;
                    t.forEach(i=>{
                        this._stylesSet.has(i) || (this._stylesSet.add(i),
                        r.add(i))
                    }
                    ),
                    this.onStylesAdded(r)
                }
                onStylesAdded(t) {}
                getAllStyles() {
                    return Array.from(this._stylesSet)
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac
            }),
            n
        }
        )()
          , ms = (()=>{
            class n extends tC {
                constructor(t) {
                    super(),
                    this._doc = t,
                    this._hostNodes = new Map,
                    this._hostNodes.set(t.head, [])
                }
                _addStylesToHost(t, r, i) {
                    t.forEach(o=>{
                        const s = this._doc.createElement("style");
                        s.textContent = o,
                        i.push(r.appendChild(s))
                    }
                    )
                }
                addHost(t) {
                    const r = [];
                    this._addStylesToHost(this._stylesSet, t, r),
                    this._hostNodes.set(t, r)
                }
                removeHost(t) {
                    const r = this._hostNodes.get(t);
                    r && r.forEach(nC),
                    this._hostNodes.delete(t)
                }
                onStylesAdded(t) {
                    this._hostNodes.forEach((r,i)=>{
                        this._addStylesToHost(t, i, r)
                    }
                    )
                }
                ngOnDestroy() {
                    this._hostNodes.forEach(t=>t.forEach(nC))
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Re))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac
            }),
            n
        }
        )();
        function nC(n) {
            Sn().remove(n)
        }
        const Fh = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/",
            math: "http://www.w3.org/1998/MathML/"
        }
          , Ph = /%COMP%/g;
        function bl(n, e, t) {
            for (let r = 0; r < e.length; r++) {
                let i = e[r];
                Array.isArray(i) ? bl(n, i, t) : (i = i.replace(Ph, n),
                t.push(i))
            }
            return t
        }
        function oC(n) {
            return e=>{
                if ("__ngUnwrap__" === e)
                    return n;
                !1 === n(e) && (e.preventDefault(),
                e.returnValue = !1)
            }
        }
        let Dl = (()=>{
            class n {
                constructor(t, r, i) {
                    this.eventManager = t,
                    this.sharedStylesHost = r,
                    this.appId = i,
                    this.rendererByCompId = new Map,
                    this.defaultRenderer = new kh(t)
                }
                createRenderer(t, r) {
                    if (!t || !r)
                        return this.defaultRenderer;
                    switch (r.encapsulation) {
                    case rn.Emulated:
                        {
                            let i = this.rendererByCompId.get(r.id);
                            return i || (i = new vP(this.eventManager,this.sharedStylesHost,r,this.appId),
                            this.rendererByCompId.set(r.id, i)),
                            i.applyToHost(t),
                            i
                        }
                    case 1:
                    case rn.ShadowDom:
                        return new EP(this.eventManager,this.sharedStylesHost,t,r);
                    default:
                        if (!this.rendererByCompId.has(r.id)) {
                            const i = bl(r.id, r.styles, []);
                            this.sharedStylesHost.addStyles(i),
                            this.rendererByCompId.set(r.id, this.defaultRenderer)
                        }
                        return this.defaultRenderer
                    }
                }
                begin() {}
                end() {}
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Cl),T(ms),T(as))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac
            }),
            n
        }
        )();
        class kh {
            constructor(e) {
                this.eventManager = e,
                this.data = Object.create(null),
                this.destroyNode = null
            }
            destroy() {}
            createElement(e, t) {
                return t ? document.createElementNS(Fh[t] || t, e) : document.createElement(e)
            }
            createComment(e) {
                return document.createComment(e)
            }
            createText(e) {
                return document.createTextNode(e)
            }
            appendChild(e, t) {
                (aC(e) ? e.content : e).appendChild(t)
            }
            insertBefore(e, t, r) {
                e && (aC(e) ? e.content : e).insertBefore(t, r)
            }
            removeChild(e, t) {
                e && e.removeChild(t)
            }
            selectRootElement(e, t) {
                let r = "string" == typeof e ? document.querySelector(e) : e;
                if (!r)
                    throw new Error(`The selector "${e}" did not match any elements`);
                return t || (r.textContent = ""),
                r
            }
            parentNode(e) {
                return e.parentNode
            }
            nextSibling(e) {
                return e.nextSibling
            }
            setAttribute(e, t, r, i) {
                if (i) {
                    t = i + ":" + t;
                    const o = Fh[i];
                    o ? e.setAttributeNS(o, t, r) : e.setAttribute(t, r)
                } else
                    e.setAttribute(t, r)
            }
            removeAttribute(e, t, r) {
                if (r) {
                    const i = Fh[r];
                    i ? e.removeAttributeNS(i, t) : e.removeAttribute(`${r}:${t}`)
                } else
                    e.removeAttribute(t)
            }
            addClass(e, t) {
                e.classList.add(t)
            }
            removeClass(e, t) {
                e.classList.remove(t)
            }
            setStyle(e, t, r, i) {
                i & (bt.DashCase | bt.Important) ? e.style.setProperty(t, r, i & bt.Important ? "important" : "") : e.style[t] = r
            }
            removeStyle(e, t, r) {
                r & bt.DashCase ? e.style.removeProperty(t) : e.style[t] = ""
            }
            setProperty(e, t, r) {
                e[t] = r
            }
            setValue(e, t) {
                e.nodeValue = t
            }
            listen(e, t, r) {
                return "string" == typeof e ? this.eventManager.addGlobalEventListener(e, t, oC(r)) : this.eventManager.addEventListener(e, t, oC(r))
            }
        }
        function aC(n) {
            return "TEMPLATE" === n.tagName && void 0 !== n.content
        }
        class vP extends kh {
            constructor(e, t, r, i) {
                super(e),
                this.component = r;
                const o = bl(i + "-" + r.id, r.styles, []);
                t.addStyles(o),
                this.contentAttr = function gP(n) {
                    return "_ngcontent-%COMP%".replace(Ph, n)
                }(i + "-" + r.id),
                this.hostAttr = function _P(n) {
                    return "_nghost-%COMP%".replace(Ph, n)
                }(i + "-" + r.id)
            }
            applyToHost(e) {
                super.setAttribute(e, this.hostAttr, "")
            }
            createElement(e, t) {
                const r = super.createElement(e, t);
                return super.setAttribute(r, this.contentAttr, ""),
                r
            }
        }
        class EP extends kh {
            constructor(e, t, r, i) {
                super(e),
                this.sharedStylesHost = t,
                this.hostEl = r,
                this.shadowRoot = r.attachShadow({
                    mode: "open"
                }),
                this.sharedStylesHost.addHost(this.shadowRoot);
                const o = bl(i.id, i.styles, []);
                for (let s = 0; s < o.length; s++) {
                    const a = document.createElement("style");
                    a.textContent = o[s],
                    this.shadowRoot.appendChild(a)
                }
            }
            nodeOrShadowRoot(e) {
                return e === this.hostEl ? this.shadowRoot : e
            }
            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }
            appendChild(e, t) {
                return super.appendChild(this.nodeOrShadowRoot(e), t)
            }
            insertBefore(e, t, r) {
                return super.insertBefore(this.nodeOrShadowRoot(e), t, r)
            }
            removeChild(e, t) {
                return super.removeChild(this.nodeOrShadowRoot(e), t)
            }
            parentNode(e) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))
            }
        }
        let CP = (()=>{
            class n extends eC {
                constructor(t) {
                    super(t)
                }
                supports(t) {
                    return !0
                }
                addEventListener(t, r, i) {
                    return t.addEventListener(r, i, !1),
                    ()=>this.removeEventListener(t, r, i)
                }
                removeEventListener(t, r, i) {
                    return t.removeEventListener(r, i)
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Re))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac
            }),
            n
        }
        )();
        const lC = ["alt", "control", "meta", "shift"]
          , bP = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }
          , DP = {
            alt: n=>n.altKey,
            control: n=>n.ctrlKey,
            meta: n=>n.metaKey,
            shift: n=>n.shiftKey
        };
        let SP = (()=>{
            class n extends eC {
                constructor(t) {
                    super(t)
                }
                supports(t) {
                    return null != n.parseEventName(t)
                }
                addEventListener(t, r, i) {
                    const o = n.parseEventName(r)
                      , s = n.eventCallback(o.fullKey, i, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(()=>Sn().onAndCancel(t, o.domEventName, s))
                }
                static parseEventName(t) {
                    const r = t.toLowerCase().split(".")
                      , i = r.shift();
                    if (0 === r.length || "keydown" !== i && "keyup" !== i)
                        return null;
                    const o = n._normalizeKey(r.pop());
                    let s = ""
                      , a = r.indexOf("code");
                    if (a > -1 && (r.splice(a, 1),
                    s = "code."),
                    lC.forEach(u=>{
                        const c = r.indexOf(u);
                        c > -1 && (r.splice(c, 1),
                        s += u + ".")
                    }
                    ),
                    s += o,
                    0 != r.length || 0 === o.length)
                        return null;
                    const l = {};
                    return l.domEventName = i,
                    l.fullKey = s,
                    l
                }
                static matchEventFullKeyCode(t, r) {
                    let i = bP[t.key] || t.key
                      , o = "";
                    return r.indexOf("code.") > -1 && (i = t.code,
                    o = "code."),
                    !(null == i || !i) && (i = i.toLowerCase(),
                    " " === i ? i = "space" : "." === i && (i = "dot"),
                    lC.forEach(s=>{
                        s !== i && (0,
                        DP[s])(t) && (o += s + ".")
                    }
                    ),
                    o += i,
                    o === r)
                }
                static eventCallback(t, r, i) {
                    return o=>{
                        n.matchEventFullKeyCode(o, t) && i.runGuarded(()=>r(o))
                    }
                }
                static _normalizeKey(t) {
                    return "esc" === t ? "escape" : t
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Re))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac
            }),
            n
        }
        )();
        const AP = lE(ux, "browser", [{
            provide: th,
            useValue: KE
        }, {
            provide: Xv,
            useValue: function IP() {
                xh.makeCurrent()
            },
            multi: !0
        }, {
            provide: Re,
            useFactory: function wP() {
                return function bw(n) {
                    _c = n
                }(document),
                document
            },
            deps: []
        }])
          , dC = new A("")
          , hC = [{
            provide: rl,
            useClass: class hP {
                addToWindow(e) {
                    _e.getAngularTestability = (r,i=!0)=>{
                        const o = e.findTestabilityInTree(r, i);
                        if (null == o)
                            throw new Error("Could not find testability for element.");
                        return o
                    }
                    ,
                    _e.getAllAngularTestabilities = ()=>e.getAllTestabilities(),
                    _e.getAllAngularRootElements = ()=>e.getAllRootElements(),
                    _e.frameworkStabilizers || (_e.frameworkStabilizers = []),
                    _e.frameworkStabilizers.push(r=>{
                        const i = _e.getAllAngularTestabilities();
                        let o = i.length
                          , s = !1;
                        const a = function(l) {
                            s = s || l,
                            o--,
                            0 == o && r(s)
                        };
                        i.forEach(function(l) {
                            l.whenStable(a)
                        })
                    }
                    )
                }
                findTestabilityInTree(e, t, r) {
                    return null == t ? null : e.getTestability(t) ?? (r ? Sn().isShadowRoot(t) ? this.findTestabilityInTree(e, t.host, !0) : this.findTestabilityInTree(e, t.parentElement, !0) : null)
                }
            }
            ,
            deps: []
        }, {
            provide: iE,
            useClass: sh,
            deps: [ve, ah, rl]
        }, {
            provide: sh,
            useClass: sh,
            deps: [ve, ah, rl]
        }]
          , fC = [{
            provide: Ac,
            useValue: "root"
        }, {
            provide: Mi,
            useFactory: function TP() {
                return new Mi
            },
            deps: []
        }, {
            provide: El,
            useClass: CP,
            multi: !0,
            deps: [Re, ve, th]
        }, {
            provide: El,
            useClass: SP,
            multi: !0,
            deps: [Re]
        }, {
            provide: Dl,
            useClass: Dl,
            deps: [Cl, ms, as]
        }, {
            provide: Ho,
            useExisting: Dl
        }, {
            provide: tC,
            useExisting: ms
        }, {
            provide: ms,
            useClass: ms,
            deps: [Re]
        }, {
            provide: Cl,
            useClass: Cl,
            deps: [El, ve]
        }, {
            provide: class GF {
            }
            ,
            useClass: fP,
            deps: []
        }, []];
        let Uh, pC = (()=>{
            class n {
                constructor(t) {}
                static withServerTransition(t) {
                    return {
                        ngModule: n,
                        providers: [{
                            provide: as,
                            useValue: t.appId
                        }, {
                            provide: JE,
                            useExisting: as
                        }, dP]
                    }
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(dC, 12))
            }
            ,
            n.\u0275mod = vt({
                type: n
            }),
            n.\u0275inj = ut({
                providers: [...fC, ...hC],
                imports: [PF, cx]
            }),
            n
        }
        )(), mC = (()=>{
            class n {
                constructor(t) {
                    this._doc = t
                }
                getTitle() {
                    return this._doc.title
                }
                setTitle(t) {
                    this._doc.title = t || ""
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Re))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: function(t) {
                    let r = null;
                    return r = t ? new t : function NP() {
                        return new mC(T(Re))
                    }(),
                    r
                },
                providedIn: "root"
            }),
            n
        }
        )();
        typeof window < "u" && window;
        try {
            Uh = typeof Intl < "u" && Intl.v8BreakIterator
        } catch {
            Uh = !1
        }
        let gs, Hh, Yi = (()=>{
            class n {
                constructor(t) {
                    this._platformId = t,
                    this.isBrowser = this._platformId ? function UF(n) {
                        return n === KE
                    }(this._platformId) : "object" == typeof document && !!document,
                    this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent),
                    this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent),
                    this.BLINK = this.isBrowser && !(!window.chrome && !Uh) && typeof CSS < "u" && !this.EDGE && !this.TRIDENT,
                    this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT,
                    this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream"in window),
                    this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent),
                    this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT,
                    this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(th))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        function Bh(n) {
            return function VP() {
                if (null == gs && typeof window < "u")
                    try {
                        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
                            get: ()=>gs = !0
                        }))
                    } finally {
                        gs = gs || !1
                    }
                return gs
            }() ? n : !!n.capture
        }
        function _s(n) {
            return n.composedPath ? n.composedPath()[0] : n.target
        }
        class Yt extends Fe {
            constructor(e) {
                super(),
                this._value = e
            }
            get value() {
                return this.getValue()
            }
            _subscribe(e) {
                const t = super._subscribe(e);
                return !t.closed && e.next(this._value),
                t
            }
            getValue() {
                const {hasError: e, thrownError: t, _value: r} = this;
                if (e)
                    throw t;
                return this._throwIfClosed(),
                r
            }
            next(e) {
                super.next(this._value = e)
            }
        }
        function P(...n) {
            return Le(n, mo(n))
        }
        function Ze(n, e, t) {
            const r = me(n) || e || t ? {
                next: n,
                error: e,
                complete: t
            } : n;
            return r ? Pe((i,o)=>{
                var s;
                null === (s = r.subscribe) || void 0 === s || s.call(r);
                let a = !0;
                i.subscribe(we(o, l=>{
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                    o.next(l)
                }
                , ()=>{
                    var l;
                    a = !1,
                    null === (l = r.complete) || void 0 === l || l.call(r),
                    o.complete()
                }
                , l=>{
                    var u;
                    a = !1,
                    null === (u = r.error) || void 0 === u || u.call(r, l),
                    o.error(l)
                }
                , ()=>{
                    var l, u;
                    a && (null === (l = r.unsubscribe) || void 0 === l || l.call(r)),
                    null === (u = r.finalize) || void 0 === u || u.call(r)
                }
                ))
            }
            ) : tr
        }
        class sk extends yt {
            constructor(e, t) {
                super()
            }
            schedule(e, t=0) {
                return this
            }
        }
        const Il = {
            setInterval(n, e, ...t) {
                const {delegate: r} = Il;
                return r?.setInterval ? r.setInterval(n, e, ...t) : setInterval(n, e, ...t)
            },
            clearInterval(n) {
                const {delegate: e} = Il;
                return (e?.clearInterval || clearInterval)(n)
            },
            delegate: void 0
        }
          , EC = {
            now: ()=>(EC.delegate || Date).now(),
            delegate: void 0
        };
        class ys {
            constructor(e, t=ys.now) {
                this.schedulerActionCtor = e,
                this.now = t
            }
            schedule(e, t=0, r) {
                return new this.schedulerActionCtor(this,e).schedule(r, t)
            }
        }
        ys.now = EC.now;
        const uk = new class lk extends ys {
            constructor(e, t=ys.now) {
                super(e, t),
                this.actions = [],
                this._active = !1
            }
            flush(e) {
                const {actions: t} = this;
                if (this._active)
                    return void t.push(e);
                let r;
                this._active = !0;
                do {
                    if (r = e.execute(e.state, e.delay))
                        break
                } while (e = t.shift());
                if (this._active = !1,
                r) {
                    for (; e = t.shift(); )
                        e.unsubscribe();
                    throw r
                }
            }
        }
        (class ak extends sk {
            constructor(e, t) {
                super(e, t),
                this.scheduler = e,
                this.work = t,
                this.pending = !1
            }
            schedule(e, t=0) {
                var r;
                if (this.closed)
                    return this;
                this.state = e;
                const i = this.id
                  , o = this.scheduler;
                return null != i && (this.id = this.recycleAsyncId(o, i, t)),
                this.pending = !0,
                this.delay = t,
                this.id = null !== (r = this.id) && void 0 !== r ? r : this.requestAsyncId(o, this.id, t),
                this
            }
            requestAsyncId(e, t, r=0) {
                return Il.setInterval(e.flush.bind(e, this), r)
            }
            recycleAsyncId(e, t, r=0) {
                if (null != r && this.delay === r && !1 === this.pending)
                    return t;
                null != t && Il.clearInterval(t)
            }
            execute(e, t) {
                if (this.closed)
                    return new Error("executing a cancelled action");
                this.pending = !1;
                const r = this._execute(e, t);
                if (r)
                    return r;
                !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
            }
            _execute(e, t) {
                let i, r = !1;
                try {
                    this.work(e)
                } catch (o) {
                    r = !0,
                    i = o || new Error("Scheduled action threw falsy error")
                }
                if (r)
                    return this.unsubscribe(),
                    i
            }
            unsubscribe() {
                if (!this.closed) {
                    const {id: e, scheduler: t} = this
                      , {actions: r} = t;
                    this.work = this.state = this.scheduler = null,
                    this.pending = !1,
                    oi(r, this),
                    null != e && (this.id = this.recycleAsyncId(t, e, null)),
                    this.delay = null,
                    super.unsubscribe()
                }
            }
        }
        );
        function CC(n, e=uk) {
            return Pe((t,r)=>{
                let i = null
                  , o = null
                  , s = null;
                const a = ()=>{
                    if (i) {
                        i.unsubscribe(),
                        i = null;
                        const u = o;
                        o = null,
                        r.next(u)
                    }
                }
                ;
                function l() {
                    const u = s + n
                      , c = e.now();
                    if (c < u)
                        return i = this.schedule(void 0, u - c),
                        void r.add(i);
                    a()
                }
                t.subscribe(we(r, u=>{
                    o = u,
                    s = e.now(),
                    i || (i = e.schedule(l, n),
                    r.add(i))
                }
                , ()=>{
                    a(),
                    r.complete()
                }
                , void 0, ()=>{
                    o = i = null
                }
                ))
            }
            )
        }
        function In(n, e) {
            return Pe((t,r)=>{
                let i = 0;
                t.subscribe(we(r, o=>n.call(e, o, i++) && r.next(o)))
            }
            )
        }
        function bC(n) {
            return In((e,t)=>n <= t)
        }
        function dk(n, e) {
            return n === e
        }
        function vs(n) {
            return Pe((e,t)=>{
                Ht(n).subscribe(we(t, ()=>t.complete(), Tu)),
                !t.closed && e.subscribe(t)
            }
            )
        }
        function Zt(n) {
            return null != n && "false" != `${n}`
        }
        function DC(n) {
            return Array.isArray(n) ? n : [n]
        }
        function Es(n) {
            return n instanceof Be ? n.nativeElement : n
        }
        const {isArray: pk} = Array
          , {getPrototypeOf: mk, prototype: gk, keys: _k} = Object;
        function SC(n) {
            if (1 === n.length) {
                const e = n[0];
                if (pk(e))
                    return {
                        args: e,
                        keys: null
                    };
                if (function yk(n) {
                    return n && "object" == typeof n && mk(n) === gk
                }(e)) {
                    const t = _k(e);
                    return {
                        args: t.map(r=>e[r]),
                        keys: t
                    }
                }
            }
            return {
                args: n,
                keys: null
            }
        }
        const {isArray: vk} = Array;
        function IC(n) {
            return J(e=>function Ek(n, e) {
                return vk(e) ? n(...e) : n(e)
            }(n, e))
        }
        function TC(n, e) {
            return n.reduce((t,r,i)=>(t[r] = e[i],
            t), {})
        }
        function $h(...n) {
            const e = mo(n)
              , t = Bp(n)
              , {args: r, keys: i} = SC(n);
            if (0 === r.length)
                return Le([], e);
            const o = new xe(function Ck(n, e, t=tr) {
                return r=>{
                    wC(e, ()=>{
                        const {length: i} = n
                          , o = new Array(i);
                        let s = i
                          , a = i;
                        for (let l = 0; l < i; l++)
                            wC(e, ()=>{
                                const u = Le(n[l], e);
                                let c = !1;
                                u.subscribe(we(r, d=>{
                                    o[l] = d,
                                    c || (c = !0,
                                    a--),
                                    a || r.next(t(o.slice()))
                                }
                                , ()=>{
                                    --s || r.complete()
                                }
                                ))
                            }
                            , r)
                    }
                    , r)
                }
            }(r, e, i ? s=>TC(i, s) : tr));
            return t ? o.pipe(IC(t)) : o
        }
        function wC(n, e, t) {
            n ? On(t, n, e) : e()
        }
        function Tl(...n) {
            return function bk() {
                return si(1)
            }()(Le(n, mo(n)))
        }
        function Wr(n) {
            return n <= 0 ? ()=>Rn : Pe((e,t)=>{
                let r = 0;
                e.subscribe(we(t, i=>{
                    ++r <= n && (t.next(i),
                    n <= r && t.complete())
                }
                ))
            }
            )
        }
        function zh(...n) {
            const e = mo(n);
            return Pe((t,r)=>{
                (e ? Tl(n, t, e) : Tl(n, t)).subscribe(r)
            }
            )
        }
        const AC = new Set;
        let Xi, Dk = (()=>{
            class n {
                constructor(t) {
                    this._platform = t,
                    this._matchMedia = this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : Ik
                }
                matchMedia(t) {
                    return (this._platform.WEBKIT || this._platform.BLINK) && function Sk(n) {
                        if (!AC.has(n))
                            try {
                                Xi || (Xi = document.createElement("style"),
                                Xi.setAttribute("type", "text/css"),
                                document.head.appendChild(Xi)),
                                Xi.sheet && (Xi.sheet.insertRule(`@media ${n} {body{ }}`, 0),
                                AC.add(n))
                            } catch (e) {
                                console.error(e)
                            }
                    }(t),
                    this._matchMedia(t)
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Yi))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        function Ik(n) {
            return {
                matches: "all" === n || "" === n,
                media: n,
                addListener: ()=>{}
                ,
                removeListener: ()=>{}
            }
        }
        let Tk = (()=>{
            class n {
                constructor(t, r) {
                    this._mediaMatcher = t,
                    this._zone = r,
                    this._queries = new Map,
                    this._destroySubject = new Fe
                }
                ngOnDestroy() {
                    this._destroySubject.next(),
                    this._destroySubject.complete()
                }
                isMatched(t) {
                    return MC(DC(t)).some(i=>this._registerQuery(i).mql.matches)
                }
                observe(t) {
                    let o = $h(MC(DC(t)).map(s=>this._registerQuery(s).observable));
                    return o = Tl(o.pipe(Wr(1)), o.pipe(bC(1), CC(0))),
                    o.pipe(J(s=>{
                        const a = {
                            matches: !1,
                            breakpoints: {}
                        };
                        return s.forEach(({matches: l, query: u})=>{
                            a.matches = a.matches || l,
                            a.breakpoints[u] = l
                        }
                        ),
                        a
                    }
                    ))
                }
                _registerQuery(t) {
                    if (this._queries.has(t))
                        return this._queries.get(t);
                    const r = this._mediaMatcher.matchMedia(t)
                      , o = {
                        observable: new xe(s=>{
                            const a = l=>this._zone.run(()=>s.next(l));
                            return r.addListener(a),
                            ()=>{
                                r.removeListener(a)
                            }
                        }
                        ).pipe(zh(r), J(({matches: s})=>({
                            query: t,
                            matches: s
                        })), vs(this._destroySubject)),
                        mql: r
                    };
                    return this._queries.set(t, o),
                    o
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Dk),T(ve))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        function MC(n) {
            return n.map(e=>e.split(",")).reduce((e,t)=>e.concat(t)).map(e=>e.trim())
        }
        class Nk extends class Mk {
            constructor(e) {
                this._items = e,
                this._activeItemIndex = -1,
                this._activeItem = null,
                this._wrap = !1,
                this._letterKeyStream = new Fe,
                this._typeaheadSubscription = yt.EMPTY,
                this._vertical = !0,
                this._allowedModifierKeys = [],
                this._homeAndEnd = !1,
                this._skipPredicateFn = t=>t.disabled,
                this._pressedLetters = [],
                this.tabOut = new Fe,
                this.change = new Fe,
                e instanceof os && e.changes.subscribe(t=>{
                    if (this._activeItem) {
                        const i = t.toArray().indexOf(this._activeItem);
                        i > -1 && i !== this._activeItemIndex && (this._activeItemIndex = i)
                    }
                }
                )
            }
            skipPredicate(e) {
                return this._skipPredicateFn = e,
                this
            }
            withWrap(e=!0) {
                return this._wrap = e,
                this
            }
            withVerticalOrientation(e=!0) {
                return this._vertical = e,
                this
            }
            withHorizontalOrientation(e) {
                return this._horizontal = e,
                this
            }
            withAllowedModifierKeys(e) {
                return this._allowedModifierKeys = e,
                this
            }
            withTypeAhead(e=200) {
                return this._typeaheadSubscription.unsubscribe(),
                this._typeaheadSubscription = this._letterKeyStream.pipe(Ze(t=>this._pressedLetters.push(t)), CC(e), In(()=>this._pressedLetters.length > 0), J(()=>this._pressedLetters.join(""))).subscribe(t=>{
                    const r = this._getItemsArray();
                    for (let i = 1; i < r.length + 1; i++) {
                        const o = (this._activeItemIndex + i) % r.length
                          , s = r[o];
                        if (!this._skipPredicateFn(s) && 0 === s.getLabel().toUpperCase().trim().indexOf(t)) {
                            this.setActiveItem(o);
                            break
                        }
                    }
                    this._pressedLetters = []
                }
                ),
                this
            }
            withHomeAndEnd(e=!0) {
                return this._homeAndEnd = e,
                this
            }
            setActiveItem(e) {
                const t = this._activeItem;
                this.updateActiveItem(e),
                this._activeItem !== t && this.change.next(this._activeItemIndex)
            }
            onKeydown(e) {
                const t = e.keyCode
                  , i = ["altKey", "ctrlKey", "metaKey", "shiftKey"].every(o=>!e[o] || this._allowedModifierKeys.indexOf(o) > -1);
                switch (t) {
                case 9:
                    return void this.tabOut.next();
                case 40:
                    if (this._vertical && i) {
                        this.setNextItemActive();
                        break
                    }
                    return;
                case 38:
                    if (this._vertical && i) {
                        this.setPreviousItemActive();
                        break
                    }
                    return;
                case 39:
                    if (this._horizontal && i) {
                        "rtl" === this._horizontal ? this.setPreviousItemActive() : this.setNextItemActive();
                        break
                    }
                    return;
                case 37:
                    if (this._horizontal && i) {
                        "rtl" === this._horizontal ? this.setNextItemActive() : this.setPreviousItemActive();
                        break
                    }
                    return;
                case 36:
                    if (this._homeAndEnd && i) {
                        this.setFirstItemActive();
                        break
                    }
                    return;
                case 35:
                    if (this._homeAndEnd && i) {
                        this.setLastItemActive();
                        break
                    }
                    return;
                default:
                    return void ((i || function Gh(n, ...e) {
                        return e.length ? e.some(t=>n[t]) : n.altKey || n.shiftKey || n.ctrlKey || n.metaKey
                    }(e, "shiftKey")) && (e.key && 1 === e.key.length ? this._letterKeyStream.next(e.key.toLocaleUpperCase()) : (t >= 65 && t <= 90 || t >= 48 && t <= 57) && this._letterKeyStream.next(String.fromCharCode(t))))
                }
                this._pressedLetters = [],
                e.preventDefault()
            }
            get activeItemIndex() {
                return this._activeItemIndex
            }
            get activeItem() {
                return this._activeItem
            }
            isTyping() {
                return this._pressedLetters.length > 0
            }
            setFirstItemActive() {
                this._setActiveItemByIndex(0, 1)
            }
            setLastItemActive() {
                this._setActiveItemByIndex(this._items.length - 1, -1)
            }
            setNextItemActive() {
                this._activeItemIndex < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1)
            }
            setPreviousItemActive() {
                this._activeItemIndex < 0 && this._wrap ? this.setLastItemActive() : this._setActiveItemByDelta(-1)
            }
            updateActiveItem(e) {
                const t = this._getItemsArray()
                  , r = "number" == typeof e ? e : t.indexOf(e);
                this._activeItem = t[r] ?? null,
                this._activeItemIndex = r
            }
            _setActiveItemByDelta(e) {
                this._wrap ? this._setActiveInWrapMode(e) : this._setActiveInDefaultMode(e)
            }
            _setActiveInWrapMode(e) {
                const t = this._getItemsArray();
                for (let r = 1; r <= t.length; r++) {
                    const i = (this._activeItemIndex + e * r + t.length) % t.length;
                    if (!this._skipPredicateFn(t[i]))
                        return void this.setActiveItem(i)
                }
            }
            _setActiveInDefaultMode(e) {
                this._setActiveItemByIndex(this._activeItemIndex + e, e)
            }
            _setActiveItemByIndex(e, t) {
                const r = this._getItemsArray();
                if (r[e]) {
                    for (; this._skipPredicateFn(r[e]); )
                        if (!r[e += t])
                            return;
                    this.setActiveItem(e)
                }
            }
            _getItemsArray() {
                return this._items instanceof os ? this._items.toArray() : this._items
            }
        }
        {
            constructor() {
                super(...arguments),
                this._origin = "program"
            }
            setFocusOrigin(e) {
                return this._origin = e,
                this
            }
            setActiveItem(e) {
                super.setActiveItem(e),
                this.activeItem && this.activeItem.focus(this._origin)
            }
        }
        function xC(n) {
            return 0 === n.buttons || 0 === n.offsetX && 0 === n.offsetY
        }
        function FC(n) {
            const e = n.touches && n.touches[0] || n.changedTouches && n.changedTouches[0];
            return !(!e || -1 !== e.identifier || null != e.radiusX && 1 !== e.radiusX || null != e.radiusY && 1 !== e.radiusY)
        }
        const kk = new A("cdk-input-modality-detector-options")
          , Lk = {
            ignoreKeys: [18, 17, 224, 91, 16]
        }
          , Ji = Bh({
            passive: !0,
            capture: !0
        });
        let Vk = (()=>{
            class n {
                constructor(t, r, i, o) {
                    this._platform = t,
                    this._mostRecentTarget = null,
                    this._modality = new Yt(null),
                    this._lastTouchMs = 0,
                    this._onKeydown = s=>{
                        this._options?.ignoreKeys?.some(a=>a === s.keyCode) || (this._modality.next("keyboard"),
                        this._mostRecentTarget = _s(s))
                    }
                    ,
                    this._onMousedown = s=>{
                        Date.now() - this._lastTouchMs < 650 || (this._modality.next(xC(s) ? "keyboard" : "mouse"),
                        this._mostRecentTarget = _s(s))
                    }
                    ,
                    this._onTouchstart = s=>{
                        FC(s) ? this._modality.next("keyboard") : (this._lastTouchMs = Date.now(),
                        this._modality.next("touch"),
                        this._mostRecentTarget = _s(s))
                    }
                    ,
                    this._options = {
                        ...Lk,
                        ...o
                    },
                    this.modalityDetected = this._modality.pipe(bC(1)),
                    this.modalityChanged = this.modalityDetected.pipe(function ck(n, e=tr) {
                        return n = n ?? dk,
                        Pe((t,r)=>{
                            let i, o = !0;
                            t.subscribe(we(r, s=>{
                                const a = e(s);
                                (o || !n(i, a)) && (o = !1,
                                i = a,
                                r.next(s))
                            }
                            ))
                        }
                        )
                    }()),
                    t.isBrowser && r.runOutsideAngular(()=>{
                        i.addEventListener("keydown", this._onKeydown, Ji),
                        i.addEventListener("mousedown", this._onMousedown, Ji),
                        i.addEventListener("touchstart", this._onTouchstart, Ji)
                    }
                    )
                }
                get mostRecentModality() {
                    return this._modality.value
                }
                ngOnDestroy() {
                    this._modality.complete(),
                    this._platform.isBrowser && (document.removeEventListener("keydown", this._onKeydown, Ji),
                    document.removeEventListener("mousedown", this._onMousedown, Ji),
                    document.removeEventListener("touchstart", this._onTouchstart, Ji))
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Yi),T(ve),T(Re),T(kk, 8))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        const Bk = new A("cdk-focus-monitor-default-options")
          , wl = Bh({
            passive: !0,
            capture: !0
        });
        let Hk = (()=>{
            class n {
                constructor(t, r, i, o, s) {
                    this._ngZone = t,
                    this._platform = r,
                    this._inputModalityDetector = i,
                    this._origin = null,
                    this._windowFocused = !1,
                    this._originFromTouchInteraction = !1,
                    this._elementInfo = new Map,
                    this._monitoredElementCount = 0,
                    this._rootNodeFocusListenerCount = new Map,
                    this._windowFocusListener = ()=>{
                        this._windowFocused = !0,
                        this._windowFocusTimeoutId = window.setTimeout(()=>this._windowFocused = !1)
                    }
                    ,
                    this._stopInputModalityDetector = new Fe,
                    this._rootNodeFocusAndBlurListener = a=>{
                        for (let u = _s(a); u; u = u.parentElement)
                            "focus" === a.type ? this._onFocus(a, u) : this._onBlur(a, u)
                    }
                    ,
                    this._document = o,
                    this._detectionMode = s?.detectionMode || 0
                }
                monitor(t, r=!1) {
                    const i = Es(t);
                    if (!this._platform.isBrowser || 1 !== i.nodeType)
                        return P(null);
                    const o = function BP(n) {
                        if (function UP() {
                            if (null == Hh) {
                                const n = typeof document < "u" ? document.head : null;
                                Hh = !(!n || !n.createShadowRoot && !n.attachShadow)
                            }
                            return Hh
                        }()) {
                            const e = n.getRootNode ? n.getRootNode() : null;
                            if (typeof ShadowRoot < "u" && ShadowRoot && e instanceof ShadowRoot)
                                return e
                        }
                        return null
                    }(i) || this._getDocument()
                      , s = this._elementInfo.get(i);
                    if (s)
                        return r && (s.checkChildren = !0),
                        s.subject;
                    const a = {
                        checkChildren: r,
                        subject: new Fe,
                        rootNode: o
                    };
                    return this._elementInfo.set(i, a),
                    this._registerGlobalListeners(a),
                    a.subject
                }
                stopMonitoring(t) {
                    const r = Es(t)
                      , i = this._elementInfo.get(r);
                    i && (i.subject.complete(),
                    this._setClasses(r),
                    this._elementInfo.delete(r),
                    this._removeGlobalListeners(i))
                }
                focusVia(t, r, i) {
                    const o = Es(t);
                    o === this._getDocument().activeElement ? this._getClosestElementsInfo(o).forEach(([a,l])=>this._originChanged(a, r, l)) : (this._setOrigin(r),
                    "function" == typeof o.focus && o.focus(i))
                }
                ngOnDestroy() {
                    this._elementInfo.forEach((t,r)=>this.stopMonitoring(r))
                }
                _getDocument() {
                    return this._document || document
                }
                _getWindow() {
                    return this._getDocument().defaultView || window
                }
                _getFocusOrigin(t) {
                    return this._origin ? this._originFromTouchInteraction ? this._shouldBeAttributedToTouch(t) ? "touch" : "program" : this._origin : this._windowFocused && this._lastFocusOrigin ? this._lastFocusOrigin : t && this._isLastInteractionFromInputLabel(t) ? "mouse" : "program"
                }
                _shouldBeAttributedToTouch(t) {
                    return 1 === this._detectionMode || !!t?.contains(this._inputModalityDetector._mostRecentTarget)
                }
                _setClasses(t, r) {
                    t.classList.toggle("cdk-focused", !!r),
                    t.classList.toggle("cdk-touch-focused", "touch" === r),
                    t.classList.toggle("cdk-keyboard-focused", "keyboard" === r),
                    t.classList.toggle("cdk-mouse-focused", "mouse" === r),
                    t.classList.toggle("cdk-program-focused", "program" === r)
                }
                _setOrigin(t, r=!1) {
                    this._ngZone.runOutsideAngular(()=>{
                        this._origin = t,
                        this._originFromTouchInteraction = "touch" === t && r,
                        0 === this._detectionMode && (clearTimeout(this._originTimeoutId),
                        this._originTimeoutId = setTimeout(()=>this._origin = null, this._originFromTouchInteraction ? 650 : 1))
                    }
                    )
                }
                _onFocus(t, r) {
                    const i = this._elementInfo.get(r)
                      , o = _s(t);
                    !i || !i.checkChildren && r !== o || this._originChanged(r, this._getFocusOrigin(o), i)
                }
                _onBlur(t, r) {
                    const i = this._elementInfo.get(r);
                    !i || i.checkChildren && t.relatedTarget instanceof Node && r.contains(t.relatedTarget) || (this._setClasses(r),
                    this._emitOrigin(i, null))
                }
                _emitOrigin(t, r) {
                    t.subject.observers.length && this._ngZone.run(()=>t.subject.next(r))
                }
                _registerGlobalListeners(t) {
                    if (!this._platform.isBrowser)
                        return;
                    const r = t.rootNode
                      , i = this._rootNodeFocusListenerCount.get(r) || 0;
                    i || this._ngZone.runOutsideAngular(()=>{
                        r.addEventListener("focus", this._rootNodeFocusAndBlurListener, wl),
                        r.addEventListener("blur", this._rootNodeFocusAndBlurListener, wl)
                    }
                    ),
                    this._rootNodeFocusListenerCount.set(r, i + 1),
                    1 == ++this._monitoredElementCount && (this._ngZone.runOutsideAngular(()=>{
                        this._getWindow().addEventListener("focus", this._windowFocusListener)
                    }
                    ),
                    this._inputModalityDetector.modalityDetected.pipe(vs(this._stopInputModalityDetector)).subscribe(o=>{
                        this._setOrigin(o, !0)
                    }
                    ))
                }
                _removeGlobalListeners(t) {
                    const r = t.rootNode;
                    if (this._rootNodeFocusListenerCount.has(r)) {
                        const i = this._rootNodeFocusListenerCount.get(r);
                        i > 1 ? this._rootNodeFocusListenerCount.set(r, i - 1) : (r.removeEventListener("focus", this._rootNodeFocusAndBlurListener, wl),
                        r.removeEventListener("blur", this._rootNodeFocusAndBlurListener, wl),
                        this._rootNodeFocusListenerCount.delete(r))
                    }
                    --this._monitoredElementCount || (this._getWindow().removeEventListener("focus", this._windowFocusListener),
                    this._stopInputModalityDetector.next(),
                    clearTimeout(this._windowFocusTimeoutId),
                    clearTimeout(this._originTimeoutId))
                }
                _originChanged(t, r, i) {
                    this._setClasses(t, r),
                    this._emitOrigin(i, r),
                    this._lastFocusOrigin = r
                }
                _getClosestElementsInfo(t) {
                    const r = [];
                    return this._elementInfo.forEach((i,o)=>{
                        (o === t || i.checkChildren && o.contains(t)) && r.push([o, i])
                    }
                    ),
                    r
                }
                _isLastInteractionFromInputLabel(t) {
                    const {_mostRecentTarget: r, mostRecentModality: i} = this._inputModalityDetector;
                    if ("mouse" !== i || !r || r === t || "INPUT" !== t.nodeName && "TEXTAREA" !== t.nodeName || t.disabled)
                        return !1;
                    const o = t.labels;
                    if (o)
                        for (let s = 0; s < o.length; s++)
                            if (o[s].contains(r))
                                return !0;
                    return !1
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(ve),T(Yi),T(Vk),T(Re, 8),T(Bk, 8))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        const kC = "cdk-high-contrast-black-on-white"
          , LC = "cdk-high-contrast-white-on-black"
          , Wh = "cdk-high-contrast-active";
        let jk = (()=>{
            class n {
                constructor(t, r) {
                    this._platform = t,
                    this._document = r,
                    this._breakpointSubscription = be(Tk).observe("(forced-colors: active)").subscribe(()=>{
                        this._hasCheckedHighContrastMode && (this._hasCheckedHighContrastMode = !1,
                        this._applyBodyHighContrastModeCssClasses())
                    }
                    )
                }
                getHighContrastMode() {
                    if (!this._platform.isBrowser)
                        return 0;
                    const t = this._document.createElement("div");
                    t.style.backgroundColor = "rgb(1,2,3)",
                    t.style.position = "absolute",
                    this._document.body.appendChild(t);
                    const r = this._document.defaultView || window
                      , i = r && r.getComputedStyle ? r.getComputedStyle(t) : null
                      , o = (i && i.backgroundColor || "").replace(/ /g, "");
                    switch (t.remove(),
                    o) {
                    case "rgb(0,0,0)":
                    case "rgb(45,50,54)":
                    case "rgb(32,32,32)":
                        return 2;
                    case "rgb(255,255,255)":
                    case "rgb(255,250,239)":
                        return 1
                    }
                    return 0
                }
                ngOnDestroy() {
                    this._breakpointSubscription.unsubscribe()
                }
                _applyBodyHighContrastModeCssClasses() {
                    if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
                        const t = this._document.body.classList;
                        t.remove(Wh, kC, LC),
                        this._hasCheckedHighContrastMode = !0;
                        const r = this.getHighContrastMode();
                        1 === r ? t.add(Wh, kC) : 2 === r && t.add(Wh, LC)
                    }
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Yi),T(Re))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        const Gk = new A("cdk-dir-doc",{
            providedIn: "root",
            factory: function $k() {
                return be(Re)
            }
        })
          , zk = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
        let qk = (()=>{
            class n {
                constructor(t) {
                    if (this.value = "ltr",
                    this.change = new de,
                    t) {
                        const i = t.documentElement ? t.documentElement.dir : null;
                        this.value = function Wk(n) {
                            const e = n?.toLowerCase() || "";
                            return "auto" === e && typeof navigator < "u" && navigator?.language ? zk.test(navigator.language) ? "rtl" : "ltr" : "rtl" === e ? "rtl" : "ltr"
                        }((t.body ? t.body.dir : null) || i || "ltr")
                    }
                }
                ngOnDestroy() {
                    this.change.complete()
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Gk, 8))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )()
          , VC = (()=>{
            class n {
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275mod = vt({
                type: n
            }),
            n.\u0275inj = ut({}),
            n
        }
        )();
        const Qk = new A("mat-sanity-checks",{
            providedIn: "root",
            factory: function Kk() {
                return !0
            }
        });
        let Cs = (()=>{
            class n {
                constructor(t, r, i) {
                    this._sanityChecks = r,
                    this._document = i,
                    this._hasDoneGlobalChecks = !1,
                    t._applyBodyHighContrastModeCssClasses(),
                    this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0)
                }
                _checkIsEnabled(t) {
                    return !function HP() {
                        return typeof __karma__ < "u" && !!__karma__ || typeof jasmine < "u" && !!jasmine || typeof jest < "u" && !!jest || typeof Mocha < "u" && !!Mocha
                    }() && ("boolean" == typeof this._sanityChecks ? this._sanityChecks : !!this._sanityChecks[t])
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(jk),T(Qk, 8),T(Re))
            }
            ,
            n.\u0275mod = vt({
                type: n
            }),
            n.\u0275inj = ut({
                imports: [VC, VC]
            }),
            n
        }
        )();
        function Yk(n) {
            return class extends n {
                constructor(...e) {
                    super(...e),
                    this._disabled = !1
                }
                get disabled() {
                    return this._disabled
                }
                set disabled(e) {
                    this._disabled = Zt(e)
                }
            }
        }
        function HC(n, e) {
            return class extends n {
                constructor(...t) {
                    super(...t),
                    this.defaultColor = e,
                    this.color = e
                }
                get color() {
                    return this._color
                }
                set color(t) {
                    const r = t || this.defaultColor;
                    r !== this._color && (this._color && this._elementRef.nativeElement.classList.remove(`mat-${this._color}`),
                    r && this._elementRef.nativeElement.classList.add(`mat-${r}`),
                    this._color = r)
                }
            }
        }
        function jC(n) {
            return class extends n {
                constructor(...e) {
                    super(...e),
                    this._disableRipple = !1
                }
                get disableRipple() {
                    return this._disableRipple
                }
                set disableRipple(e) {
                    this._disableRipple = Zt(e)
                }
            }
        }
        function Zk(n, e=0) {
            return class extends n {
                constructor(...t) {
                    super(...t),
                    this._tabIndex = e,
                    this.defaultTabIndex = e
                }
                get tabIndex() {
                    return this.disabled ? -1 : this._tabIndex
                }
                set tabIndex(t) {
                    this._tabIndex = null != t ? function hk(n, e=0) {
                        return function fk(n) {
                            return !isNaN(parseFloat(n)) && !isNaN(Number(n))
                        }(n) ? Number(n) : e
                    }(t) : this.defaultTabIndex
                }
            }
        }
        function Xk(n) {
            return class extends n {
                constructor(...e) {
                    super(...e),
                    this.errorState = !1
                }
                updateErrorState() {
                    const e = this.errorState
                      , o = (this.errorStateMatcher || this._defaultErrorStateMatcher).isErrorState(this.ngControl ? this.ngControl.control : null, this._parentFormGroup || this._parentForm);
                    o !== e && (this.errorState = o,
                    this.stateChanges.next())
                }
            }
        }
        let GC = (()=>{
            class n {
                isErrorState(t, r) {
                    return !!(t && t.invalid && (t.touched || r && r.submitted))
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        class e1 {
            constructor(e, t, r, i=!1) {
                this._renderer = e,
                this.element = t,
                this.config = r,
                this._animationForciblyDisabledThroughCss = i,
                this.state = 3
            }
            fadeOut() {
                this._renderer.fadeOutRipple(this)
            }
        }
        const $C = {
            enterDuration: 225,
            exitDuration: 150
        }
          , qh = Bh({
            passive: !0
        })
          , zC = ["mousedown", "touchstart"]
          , WC = ["mouseup", "mouseleave", "touchend", "touchcancel"];
        class qC {
            constructor(e, t, r, i) {
                this._target = e,
                this._ngZone = t,
                this._isPointerDown = !1,
                this._activeRipples = new Map,
                this._pointerUpEventsRegistered = !1,
                i.isBrowser && (this._containerElement = Es(r))
            }
            fadeInRipple(e, t, r={}) {
                const i = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect()
                  , o = {
                    ...$C,
                    ...r.animation
                };
                r.centered && (e = i.left + i.width / 2,
                t = i.top + i.height / 2);
                const s = r.radius || function n1(n, e, t) {
                    const r = Math.max(Math.abs(n - t.left), Math.abs(n - t.right))
                      , i = Math.max(Math.abs(e - t.top), Math.abs(e - t.bottom));
                    return Math.sqrt(r * r + i * i)
                }(e, t, i)
                  , a = e - i.left
                  , l = t - i.top
                  , u = o.enterDuration
                  , c = document.createElement("div");
                c.classList.add("mat-ripple-element"),
                c.style.left = a - s + "px",
                c.style.top = l - s + "px",
                c.style.height = 2 * s + "px",
                c.style.width = 2 * s + "px",
                null != r.color && (c.style.backgroundColor = r.color),
                c.style.transitionDuration = `${u}ms`,
                this._containerElement.appendChild(c);
                const d = window.getComputedStyle(c)
                  , f = d.transitionDuration
                  , p = "none" === d.transitionProperty || "0s" === f || "0s, 0s" === f
                  , g = new e1(this,c,r,p);
                c.style.transform = "scale3d(1, 1, 1)",
                g.state = 0,
                r.persistent || (this._mostRecentTransientRipple = g);
                let y = null;
                return !p && (u || o.exitDuration) && this._ngZone.runOutsideAngular(()=>{
                    const C = ()=>this._finishRippleTransition(g)
                      , S = ()=>this._destroyRipple(g);
                    c.addEventListener("transitionend", C),
                    c.addEventListener("transitioncancel", S),
                    y = {
                        onTransitionEnd: C,
                        onTransitionCancel: S
                    }
                }
                ),
                this._activeRipples.set(g, y),
                (p || !u) && this._finishRippleTransition(g),
                g
            }
            fadeOutRipple(e) {
                if (2 === e.state || 3 === e.state)
                    return;
                const t = e.element
                  , r = {
                    ...$C,
                    ...e.config.animation
                };
                t.style.transitionDuration = `${r.exitDuration}ms`,
                t.style.opacity = "0",
                e.state = 2,
                (e._animationForciblyDisabledThroughCss || !r.exitDuration) && this._finishRippleTransition(e)
            }
            fadeOutAll() {
                this._getActiveRipples().forEach(e=>e.fadeOut())
            }
            fadeOutAllNonPersistent() {
                this._getActiveRipples().forEach(e=>{
                    e.config.persistent || e.fadeOut()
                }
                )
            }
            setupTriggerEvents(e) {
                const t = Es(e);
                !t || t === this._triggerElement || (this._removeTriggerEvents(),
                this._triggerElement = t,
                this._registerEvents(zC))
            }
            handleEvent(e) {
                "mousedown" === e.type ? this._onMousedown(e) : "touchstart" === e.type ? this._onTouchStart(e) : this._onPointerUp(),
                this._pointerUpEventsRegistered || (this._registerEvents(WC),
                this._pointerUpEventsRegistered = !0)
            }
            _finishRippleTransition(e) {
                0 === e.state ? this._startFadeOutTransition(e) : 2 === e.state && this._destroyRipple(e)
            }
            _startFadeOutTransition(e) {
                const t = e === this._mostRecentTransientRipple
                  , {persistent: r} = e.config;
                e.state = 1,
                !r && (!t || !this._isPointerDown) && e.fadeOut()
            }
            _destroyRipple(e) {
                const t = this._activeRipples.get(e) ?? null;
                this._activeRipples.delete(e),
                this._activeRipples.size || (this._containerRect = null),
                e === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null),
                e.state = 3,
                null !== t && (e.element.removeEventListener("transitionend", t.onTransitionEnd),
                e.element.removeEventListener("transitioncancel", t.onTransitionCancel)),
                e.element.remove()
            }
            _onMousedown(e) {
                const t = xC(e)
                  , r = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + 800;
                !this._target.rippleDisabled && !t && !r && (this._isPointerDown = !0,
                this.fadeInRipple(e.clientX, e.clientY, this._target.rippleConfig))
            }
            _onTouchStart(e) {
                if (!this._target.rippleDisabled && !FC(e)) {
                    this._lastTouchStartEvent = Date.now(),
                    this._isPointerDown = !0;
                    const t = e.changedTouches;
                    for (let r = 0; r < t.length; r++)
                        this.fadeInRipple(t[r].clientX, t[r].clientY, this._target.rippleConfig)
                }
            }
            _onPointerUp() {
                !this._isPointerDown || (this._isPointerDown = !1,
                this._getActiveRipples().forEach(e=>{
                    !e.config.persistent && (1 === e.state || e.config.terminateOnPointerUp && 0 === e.state) && e.fadeOut()
                }
                ))
            }
            _registerEvents(e) {
                this._ngZone.runOutsideAngular(()=>{
                    e.forEach(t=>{
                        this._triggerElement.addEventListener(t, this, qh)
                    }
                    )
                }
                )
            }
            _getActiveRipples() {
                return Array.from(this._activeRipples.keys())
            }
            _removeTriggerEvents() {
                this._triggerElement && (zC.forEach(e=>{
                    this._triggerElement.removeEventListener(e, this, qh)
                }
                ),
                this._pointerUpEventsRegistered && WC.forEach(e=>{
                    this._triggerElement.removeEventListener(e, this, qh)
                }
                ))
            }
        }
        const KC = new A("mat-ripple-global-options");
        let QC = (()=>{
            class n {
                constructor(t, r, i, o, s) {
                    this._elementRef = t,
                    this._animationMode = s,
                    this.radius = 0,
                    this._disabled = !1,
                    this._isInitialized = !1,
                    this._globalOptions = o || {},
                    this._rippleRenderer = new qC(this,r,t,i)
                }
                get disabled() {
                    return this._disabled
                }
                set disabled(t) {
                    t && this.fadeOutAllNonPersistent(),
                    this._disabled = t,
                    this._setupTriggerEventsIfEnabled()
                }
                get trigger() {
                    return this._trigger || this._elementRef.nativeElement
                }
                set trigger(t) {
                    this._trigger = t,
                    this._setupTriggerEventsIfEnabled()
                }
                ngOnInit() {
                    this._isInitialized = !0,
                    this._setupTriggerEventsIfEnabled()
                }
                ngOnDestroy() {
                    this._rippleRenderer._removeTriggerEvents()
                }
                fadeOutAll() {
                    this._rippleRenderer.fadeOutAll()
                }
                fadeOutAllNonPersistent() {
                    this._rippleRenderer.fadeOutAllNonPersistent()
                }
                get rippleConfig() {
                    return {
                        centered: this.centered,
                        radius: this.radius,
                        color: this.color,
                        animation: {
                            ...this._globalOptions.animation,
                            ..."NoopAnimations" === this._animationMode ? {
                                enterDuration: 0,
                                exitDuration: 0
                            } : {},
                            ...this.animation
                        },
                        terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
                    }
                }
                get rippleDisabled() {
                    return this.disabled || !!this._globalOptions.disabled
                }
                _setupTriggerEventsIfEnabled() {
                    !this.disabled && this._isInitialized && this._rippleRenderer.setupTriggerEvents(this.trigger)
                }
                launch(t, r=0, i) {
                    return "number" == typeof t ? this._rippleRenderer.fadeInRipple(t, r, {
                        ...this.rippleConfig,
                        ...i
                    }) : this._rippleRenderer.fadeInRipple(0, 0, {
                        ...this.rippleConfig,
                        ...t
                    })
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(E(Be),E(ve),E(Yi),E(KC, 8),E(ls, 8))
            }
            ,
            n.\u0275dir = x({
                type: n,
                selectors: [["", "mat-ripple", ""], ["", "matRipple", ""]],
                hostAttrs: [1, "mat-ripple"],
                hostVars: 2,
                hostBindings: function(t, r) {
                    2 & t && Gn("mat-ripple-unbounded", r.unbounded)
                },
                inputs: {
                    color: ["matRippleColor", "color"],
                    unbounded: ["matRippleUnbounded", "unbounded"],
                    centered: ["matRippleCentered", "centered"],
                    radius: ["matRippleRadius", "radius"],
                    animation: ["matRippleAnimation", "animation"],
                    disabled: ["matRippleDisabled", "disabled"],
                    trigger: ["matRippleTrigger", "trigger"]
                },
                exportAs: ["matRipple"]
            }),
            n
        }
        )()
          , r1 = (()=>{
            class n {
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275mod = vt({
                type: n
            }),
            n.\u0275inj = ut({
                imports: [Cs, Cs]
            }),
            n
        }
        )();
        const o1 = ["mat-button", ""]
          , s1 = ["*"]
          , l1 = ["mat-button", "mat-flat-button", "mat-icon-button", "mat-raised-button", "mat-stroked-button", "mat-mini-fab", "mat-fab"]
          , u1 = HC(Yk(jC(class {
            constructor(n) {
                this._elementRef = n
            }
        }
        )));
        let c1 = (()=>{
            class n extends u1 {
                constructor(t, r, i) {
                    super(t),
                    this._focusMonitor = r,
                    this._animationMode = i,
                    this.isRoundButton = this._hasHostAttributes("mat-fab", "mat-mini-fab"),
                    this.isIconButton = this._hasHostAttributes("mat-icon-button");
                    for (const o of l1)
                        this._hasHostAttributes(o) && this._getHostElement().classList.add(o);
                    t.nativeElement.classList.add("mat-button-base"),
                    this.isRoundButton && (this.color = "accent")
                }
                ngAfterViewInit() {
                    this._focusMonitor.monitor(this._elementRef, !0)
                }
                ngOnDestroy() {
                    this._focusMonitor.stopMonitoring(this._elementRef)
                }
                focus(t, r) {
                    t ? this._focusMonitor.focusVia(this._getHostElement(), t, r) : this._getHostElement().focus(r)
                }
                _getHostElement() {
                    return this._elementRef.nativeElement
                }
                _isRippleDisabled() {
                    return this.disableRipple || this.disabled
                }
                _hasHostAttributes(...t) {
                    return t.some(r=>this._getHostElement().hasAttribute(r))
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(E(Be),E(Hk),E(ls, 8))
            }
            ,
            n.\u0275cmp = li({
                type: n,
                selectors: [["button", "mat-button", ""], ["button", "mat-raised-button", ""], ["button", "mat-icon-button", ""], ["button", "mat-fab", ""], ["button", "mat-mini-fab", ""], ["button", "mat-stroked-button", ""], ["button", "mat-flat-button", ""]],
                viewQuery: function(t, r) {
                    if (1 & t && function Mv(n, e, t) {
                        const r = ne();
                        r.firstCreatePass && (Ov(r, new wv(n,e,t), -1),
                        2 == (2 & e) && (r.staticViewQueries = !0)),
                        Nv(r, D(), e)
                    }(QC, 5),
                    2 & t) {
                        let i;
                        hr(i = fr()) && (r.ripple = i.first)
                    }
                },
                hostAttrs: [1, "mat-focus-indicator"],
                hostVars: 5,
                hostBindings: function(t, r) {
                    2 & t && (Dt("disabled", r.disabled || null),
                    Gn("_mat-animation-noopable", "NoopAnimations" === r._animationMode)("mat-button-disabled", r.disabled))
                },
                inputs: {
                    disabled: "disabled",
                    disableRipple: "disableRipple",
                    color: "color"
                },
                exportAs: ["matButton"],
                features: [se],
                attrs: o1,
                ngContentSelectors: s1,
                decls: 4,
                vars: 5,
                consts: [[1, "mat-button-wrapper"], ["matRipple", "", 1, "mat-button-ripple", 3, "matRippleDisabled", "matRippleCentered", "matRippleTrigger"], [1, "mat-button-focus-overlay"]],
                template: function(t, r) {
                    1 & t && (Nd(),
                    re(0, "span", 0),
                    Od(1),
                    ie(),
                    Qo(2, "span", 1)(3, "span", 2)),
                    2 & t && (Ye(2),
                    Gn("mat-button-ripple-round", r.isRoundButton || r.isIconButton),
                    ot("matRippleDisabled", r._isRippleDisabled())("matRippleCentered", r.isIconButton)("matRippleTrigger", r._getHostElement()))
                },
                dependencies: [QC],
                styles: [".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}.mat-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.mat-flat-button::before,.mat-raised-button::before,.mat-fab::before,.mat-mini-fab::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-stroked-button::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1)}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}"],
                encapsulation: 2,
                changeDetection: 0
            }),
            n
        }
        )()
          , d1 = (()=>{
            class n {
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275mod = vt({
                type: n
            }),
            n.\u0275inj = ut({
                imports: [r1, Cs, Cs]
            }),
            n
        }
        )();
        class h1 {
            constructor(e=!1, t, r=!0, i) {
                this._multiple = e,
                this._emitChanges = r,
                this.compareWith = i,
                this._selection = new Set,
                this._deselectedToEmit = [],
                this._selectedToEmit = [],
                this.changed = new Fe,
                t && t.length && (e ? t.forEach(o=>this._markSelected(o)) : this._markSelected(t[0]),
                this._selectedToEmit.length = 0)
            }
            get selected() {
                return this._selected || (this._selected = Array.from(this._selection.values())),
                this._selected
            }
            select(...e) {
                this._verifyValueAssignment(e),
                e.forEach(r=>this._markSelected(r));
                const t = this._hasQueuedChanges();
                return this._emitChangeEvent(),
                t
            }
            deselect(...e) {
                this._verifyValueAssignment(e),
                e.forEach(r=>this._unmarkSelected(r));
                const t = this._hasQueuedChanges();
                return this._emitChangeEvent(),
                t
            }
            setSelection(...e) {
                this._verifyValueAssignment(e);
                const t = this.selected
                  , r = new Set(e);
                e.forEach(o=>this._markSelected(o)),
                t.filter(o=>!r.has(o)).forEach(o=>this._unmarkSelected(o));
                const i = this._hasQueuedChanges();
                return this._emitChangeEvent(),
                i
            }
            toggle(e) {
                return this.isSelected(e) ? this.deselect(e) : this.select(e)
            }
            clear(e=!0) {
                this._unmarkAll();
                const t = this._hasQueuedChanges();
                return e && this._emitChangeEvent(),
                t
            }
            isSelected(e) {
                if (this.compareWith) {
                    for (const t of this._selection)
                        if (this.compareWith(t, e))
                            return !0;
                    return !1
                }
                return this._selection.has(e)
            }
            isEmpty() {
                return 0 === this._selection.size
            }
            hasValue() {
                return !this.isEmpty()
            }
            sort(e) {
                this._multiple && this.selected && this._selected.sort(e)
            }
            isMultipleSelection() {
                return this._multiple
            }
            _emitChangeEvent() {
                this._selected = null,
                (this._selectedToEmit.length || this._deselectedToEmit.length) && (this.changed.next({
                    source: this,
                    added: this._selectedToEmit,
                    removed: this._deselectedToEmit
                }),
                this._deselectedToEmit = [],
                this._selectedToEmit = [])
            }
            _markSelected(e) {
                this.isSelected(e) || (this._multiple || this._unmarkAll(),
                this.isSelected(e) || this._selection.add(e),
                this._emitChanges && this._selectedToEmit.push(e))
            }
            _unmarkSelected(e) {
                this.isSelected(e) && (this._selection.delete(e),
                this._emitChanges && this._deselectedToEmit.push(e))
            }
            _unmarkAll() {
                this.isEmpty() || this._selection.forEach(e=>this._unmarkSelected(e))
            }
            _verifyValueAssignment(e) {}
            _hasQueuedChanges() {
                return !(!this._deselectedToEmit.length && !this._selectedToEmit.length)
            }
        }
        function gr(n) {
            return null == n || ("string" == typeof n || Array.isArray(n)) && 0 === n.length
        }
        function XC(n) {
            return null != n && "number" == typeof n.length
        }
        const at = new A("NgValidators")
          , _r = new A("NgAsyncValidators")
          , v1 = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        class E1 {
            static min(e) {
                return function JC(n) {
                    return e=>{
                        if (gr(e.value) || gr(n))
                            return null;
                        const t = parseFloat(e.value);
                        return !isNaN(t) && t < n ? {
                            min: {
                                min: n,
                                actual: e.value
                            }
                        } : null
                    }
                }(e)
            }
            static max(e) {
                return function eb(n) {
                    return e=>{
                        if (gr(e.value) || gr(n))
                            return null;
                        const t = parseFloat(e.value);
                        return !isNaN(t) && t > n ? {
                            max: {
                                max: n,
                                actual: e.value
                            }
                        } : null
                    }
                }(e)
            }
            static required(e) {
                return function tb(n) {
                    return gr(n.value) ? {
                        required: !0
                    } : null
                }(e)
            }
            static requiredTrue(e) {
                return function nb(n) {
                    return !0 === n.value ? null : {
                        required: !0
                    }
                }(e)
            }
            static email(e) {
                return function rb(n) {
                    return gr(n.value) || v1.test(n.value) ? null : {
                        email: !0
                    }
                }(e)
            }
            static minLength(e) {
                return function ib(n) {
                    return e=>gr(e.value) || !XC(e.value) ? null : e.value.length < n ? {
                        minlength: {
                            requiredLength: n,
                            actualLength: e.value.length
                        }
                    } : null
                }(e)
            }
            static maxLength(e) {
                return function ob(n) {
                    return e=>XC(e.value) && e.value.length > n ? {
                        maxlength: {
                            requiredLength: n,
                            actualLength: e.value.length
                        }
                    } : null
                }(e)
            }
            static pattern(e) {
                return function sb(n) {
                    if (!n)
                        return Al;
                    let e, t;
                    return "string" == typeof n ? (t = "",
                    "^" !== n.charAt(0) && (t += "^"),
                    t += n,
                    "$" !== n.charAt(n.length - 1) && (t += "$"),
                    e = new RegExp(t)) : (t = n.toString(),
                    e = n),
                    r=>{
                        if (gr(r.value))
                            return null;
                        const i = r.value;
                        return e.test(i) ? null : {
                            pattern: {
                                requiredPattern: t,
                                actualValue: i
                            }
                        }
                    }
                }(e)
            }
            static nullValidator(e) {
                return null
            }
            static compose(e) {
                return hb(e)
            }
            static composeAsync(e) {
                return fb(e)
            }
        }
        function Al(n) {
            return null
        }
        function ab(n) {
            return null != n
        }
        function lb(n) {
            return Yo(n) ? Le(n) : n
        }
        function ub(n) {
            let e = {};
            return n.forEach(t=>{
                e = null != t ? {
                    ...e,
                    ...t
                } : e
            }
            ),
            0 === Object.keys(e).length ? null : e
        }
        function cb(n, e) {
            return e.map(t=>t(n))
        }
        function db(n) {
            return n.map(e=>function C1(n) {
                return !n.validate
            }(e) ? e : t=>e.validate(t))
        }
        function hb(n) {
            if (!n)
                return null;
            const e = n.filter(ab);
            return 0 == e.length ? null : function(t) {
                return ub(cb(t, e))
            }
        }
        function Qh(n) {
            return null != n ? hb(db(n)) : null
        }
        function fb(n) {
            if (!n)
                return null;
            const e = n.filter(ab);
            return 0 == e.length ? null : function(t) {
                return function f1(...n) {
                    const e = Bp(n)
                      , {args: t, keys: r} = SC(n)
                      , i = new xe(o=>{
                        const {length: s} = t;
                        if (!s)
                            return void o.complete();
                        const a = new Array(s);
                        let l = s
                          , u = s;
                        for (let c = 0; c < s; c++) {
                            let d = !1;
                            Ht(t[c]).subscribe(we(o, h=>{
                                d || (d = !0,
                                u--),
                                a[c] = h
                            }
                            , ()=>l--, void 0, ()=>{
                                (!l || !d) && (u || o.next(r ? TC(r, a) : a),
                                o.complete())
                            }
                            ))
                        }
                    }
                    );
                    return e ? i.pipe(IC(e)) : i
                }(cb(t, e).map(lb)).pipe(J(ub))
            }
        }
        function Yh(n) {
            return null != n ? fb(db(n)) : null
        }
        function pb(n, e) {
            return null === n ? [e] : Array.isArray(n) ? [...n, e] : [n, e]
        }
        function mb(n) {
            return n._rawValidators
        }
        function gb(n) {
            return n._rawAsyncValidators
        }
        function Zh(n) {
            return n ? Array.isArray(n) ? n : [n] : []
        }
        function Ml(n, e) {
            return Array.isArray(n) ? n.includes(e) : n === e
        }
        function _b(n, e) {
            const t = Zh(e);
            return Zh(n).forEach(i=>{
                Ml(t, i) || t.push(i)
            }
            ),
            t
        }
        function yb(n, e) {
            return Zh(e).filter(t=>!Ml(n, t))
        }
        class vb {
            constructor() {
                this._rawValidators = [],
                this._rawAsyncValidators = [],
                this._onDestroyCallbacks = []
            }
            get value() {
                return this.control ? this.control.value : null
            }
            get valid() {
                return this.control ? this.control.valid : null
            }
            get invalid() {
                return this.control ? this.control.invalid : null
            }
            get pending() {
                return this.control ? this.control.pending : null
            }
            get disabled() {
                return this.control ? this.control.disabled : null
            }
            get enabled() {
                return this.control ? this.control.enabled : null
            }
            get errors() {
                return this.control ? this.control.errors : null
            }
            get pristine() {
                return this.control ? this.control.pristine : null
            }
            get dirty() {
                return this.control ? this.control.dirty : null
            }
            get touched() {
                return this.control ? this.control.touched : null
            }
            get status() {
                return this.control ? this.control.status : null
            }
            get untouched() {
                return this.control ? this.control.untouched : null
            }
            get statusChanges() {
                return this.control ? this.control.statusChanges : null
            }
            get valueChanges() {
                return this.control ? this.control.valueChanges : null
            }
            get path() {
                return null
            }
            _setValidators(e) {
                this._rawValidators = e || [],
                this._composedValidatorFn = Qh(this._rawValidators)
            }
            _setAsyncValidators(e) {
                this._rawAsyncValidators = e || [],
                this._composedAsyncValidatorFn = Yh(this._rawAsyncValidators)
            }
            get validator() {
                return this._composedValidatorFn || null
            }
            get asyncValidator() {
                return this._composedAsyncValidatorFn || null
            }
            _registerOnDestroy(e) {
                this._onDestroyCallbacks.push(e)
            }
            _invokeOnDestroyCallbacks() {
                this._onDestroyCallbacks.forEach(e=>e()),
                this._onDestroyCallbacks = []
            }
            reset(e) {
                this.control && this.control.reset(e)
            }
            hasError(e, t) {
                return !!this.control && this.control.hasError(e, t)
            }
            getError(e, t) {
                return this.control ? this.control.getError(e, t) : null
            }
        }
        class _t extends vb {
            get formDirective() {
                return null
            }
            get path() {
                return null
            }
        }
        class Qn extends vb {
            constructor() {
                super(...arguments),
                this._parent = null,
                this.name = null,
                this.valueAccessor = null
            }
        }
        const Ds = "VALID"
          , Ol = "INVALID"
          , eo = "PENDING"
          , Ss = "DISABLED";
        function tf(n) {
            return (Rl(n) ? n.validators : n) || null
        }
        function bb(n) {
            return Array.isArray(n) ? Qh(n) : n || null
        }
        function nf(n, e) {
            return (Rl(e) ? e.asyncValidators : n) || null
        }
        function Db(n) {
            return Array.isArray(n) ? Yh(n) : n || null
        }
        function Rl(n) {
            return null != n && !Array.isArray(n) && "object" == typeof n
        }
        class Tb {
            constructor(e, t) {
                this._pendingDirty = !1,
                this._hasOwnPendingAsyncValidator = !1,
                this._pendingTouched = !1,
                this._onCollectionChange = ()=>{}
                ,
                this._parent = null,
                this.pristine = !0,
                this.touched = !1,
                this._onDisabledChange = [],
                this._rawValidators = e,
                this._rawAsyncValidators = t,
                this._composedValidatorFn = bb(this._rawValidators),
                this._composedAsyncValidatorFn = Db(this._rawAsyncValidators)
            }
            get validator() {
                return this._composedValidatorFn
            }
            set validator(e) {
                this._rawValidators = this._composedValidatorFn = e
            }
            get asyncValidator() {
                return this._composedAsyncValidatorFn
            }
            set asyncValidator(e) {
                this._rawAsyncValidators = this._composedAsyncValidatorFn = e
            }
            get parent() {
                return this._parent
            }
            get valid() {
                return this.status === Ds
            }
            get invalid() {
                return this.status === Ol
            }
            get pending() {
                return this.status == eo
            }
            get disabled() {
                return this.status === Ss
            }
            get enabled() {
                return this.status !== Ss
            }
            get dirty() {
                return !this.pristine
            }
            get untouched() {
                return !this.touched
            }
            get updateOn() {
                return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
            }
            setValidators(e) {
                this._rawValidators = e,
                this._composedValidatorFn = bb(e)
            }
            setAsyncValidators(e) {
                this._rawAsyncValidators = e,
                this._composedAsyncValidatorFn = Db(e)
            }
            addValidators(e) {
                this.setValidators(_b(e, this._rawValidators))
            }
            addAsyncValidators(e) {
                this.setAsyncValidators(_b(e, this._rawAsyncValidators))
            }
            removeValidators(e) {
                this.setValidators(yb(e, this._rawValidators))
            }
            removeAsyncValidators(e) {
                this.setAsyncValidators(yb(e, this._rawAsyncValidators))
            }
            hasValidator(e) {
                return Ml(this._rawValidators, e)
            }
            hasAsyncValidator(e) {
                return Ml(this._rawAsyncValidators, e)
            }
            clearValidators() {
                this.validator = null
            }
            clearAsyncValidators() {
                this.asyncValidator = null
            }
            markAsTouched(e={}) {
                this.touched = !0,
                this._parent && !e.onlySelf && this._parent.markAsTouched(e)
            }
            markAllAsTouched() {
                this.markAsTouched({
                    onlySelf: !0
                }),
                this._forEachChild(e=>e.markAllAsTouched())
            }
            markAsUntouched(e={}) {
                this.touched = !1,
                this._pendingTouched = !1,
                this._forEachChild(t=>{
                    t.markAsUntouched({
                        onlySelf: !0
                    })
                }
                ),
                this._parent && !e.onlySelf && this._parent._updateTouched(e)
            }
            markAsDirty(e={}) {
                this.pristine = !1,
                this._parent && !e.onlySelf && this._parent.markAsDirty(e)
            }
            markAsPristine(e={}) {
                this.pristine = !0,
                this._pendingDirty = !1,
                this._forEachChild(t=>{
                    t.markAsPristine({
                        onlySelf: !0
                    })
                }
                ),
                this._parent && !e.onlySelf && this._parent._updatePristine(e)
            }
            markAsPending(e={}) {
                this.status = eo,
                !1 !== e.emitEvent && this.statusChanges.emit(this.status),
                this._parent && !e.onlySelf && this._parent.markAsPending(e)
            }
            disable(e={}) {
                const t = this._parentMarkedDirty(e.onlySelf);
                this.status = Ss,
                this.errors = null,
                this._forEachChild(r=>{
                    r.disable({
                        ...e,
                        onlySelf: !0
                    })
                }
                ),
                this._updateValue(),
                !1 !== e.emitEvent && (this.valueChanges.emit(this.value),
                this.statusChanges.emit(this.status)),
                this._updateAncestors({
                    ...e,
                    skipPristineCheck: t
                }),
                this._onDisabledChange.forEach(r=>r(!0))
            }
            enable(e={}) {
                const t = this._parentMarkedDirty(e.onlySelf);
                this.status = Ds,
                this._forEachChild(r=>{
                    r.enable({
                        ...e,
                        onlySelf: !0
                    })
                }
                ),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: e.emitEvent
                }),
                this._updateAncestors({
                    ...e,
                    skipPristineCheck: t
                }),
                this._onDisabledChange.forEach(r=>r(!1))
            }
            _updateAncestors(e) {
                this._parent && !e.onlySelf && (this._parent.updateValueAndValidity(e),
                e.skipPristineCheck || this._parent._updatePristine(),
                this._parent._updateTouched())
            }
            setParent(e) {
                this._parent = e
            }
            getRawValue() {
                return this.value
            }
            updateValueAndValidity(e={}) {
                this._setInitialStatus(),
                this._updateValue(),
                this.enabled && (this._cancelExistingSubscription(),
                this.errors = this._runValidator(),
                this.status = this._calculateStatus(),
                (this.status === Ds || this.status === eo) && this._runAsyncValidator(e.emitEvent)),
                !1 !== e.emitEvent && (this.valueChanges.emit(this.value),
                this.statusChanges.emit(this.status)),
                this._parent && !e.onlySelf && this._parent.updateValueAndValidity(e)
            }
            _updateTreeValidity(e={
                emitEvent: !0
            }) {
                this._forEachChild(t=>t._updateTreeValidity(e)),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: e.emitEvent
                })
            }
            _setInitialStatus() {
                this.status = this._allControlsDisabled() ? Ss : Ds
            }
            _runValidator() {
                return this.validator ? this.validator(this) : null
            }
            _runAsyncValidator(e) {
                if (this.asyncValidator) {
                    this.status = eo,
                    this._hasOwnPendingAsyncValidator = !0;
                    const t = lb(this.asyncValidator(this));
                    this._asyncValidationSubscription = t.subscribe(r=>{
                        this._hasOwnPendingAsyncValidator = !1,
                        this.setErrors(r, {
                            emitEvent: e
                        })
                    }
                    )
                }
            }
            _cancelExistingSubscription() {
                this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(),
                this._hasOwnPendingAsyncValidator = !1)
            }
            setErrors(e, t={}) {
                this.errors = e,
                this._updateControlsErrors(!1 !== t.emitEvent)
            }
            get(e) {
                let t = e;
                return null == t || (Array.isArray(t) || (t = t.split(".")),
                0 === t.length) ? null : t.reduce((r,i)=>r && r._find(i), this)
            }
            getError(e, t) {
                const r = t ? this.get(t) : this;
                return r && r.errors ? r.errors[e] : null
            }
            hasError(e, t) {
                return !!this.getError(e, t)
            }
            get root() {
                let e = this;
                for (; e._parent; )
                    e = e._parent;
                return e
            }
            _updateControlsErrors(e) {
                this.status = this._calculateStatus(),
                e && this.statusChanges.emit(this.status),
                this._parent && this._parent._updateControlsErrors(e)
            }
            _initObservables() {
                this.valueChanges = new de,
                this.statusChanges = new de
            }
            _calculateStatus() {
                return this._allControlsDisabled() ? Ss : this.errors ? Ol : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(eo) ? eo : this._anyControlsHaveStatus(Ol) ? Ol : Ds
            }
            _anyControlsHaveStatus(e) {
                return this._anyControls(t=>t.status === e)
            }
            _anyControlsDirty() {
                return this._anyControls(e=>e.dirty)
            }
            _anyControlsTouched() {
                return this._anyControls(e=>e.touched)
            }
            _updatePristine(e={}) {
                this.pristine = !this._anyControlsDirty(),
                this._parent && !e.onlySelf && this._parent._updatePristine(e)
            }
            _updateTouched(e={}) {
                this.touched = this._anyControlsTouched(),
                this._parent && !e.onlySelf && this._parent._updateTouched(e)
            }
            _registerOnCollectionChange(e) {
                this._onCollectionChange = e
            }
            _setUpdateStrategy(e) {
                Rl(e) && null != e.updateOn && (this._updateOn = e.updateOn)
            }
            _parentMarkedDirty(e) {
                return !e && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty()
            }
            _find(e) {
                return null
            }
        }
        class rf extends Tb {
            constructor(e, t, r) {
                super(tf(t), nf(r, t)),
                this.controls = e,
                this._initObservables(),
                this._setUpdateStrategy(t),
                this._setUpControls(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!this.asyncValidator
                })
            }
            registerControl(e, t) {
                return this.controls[e] ? this.controls[e] : (this.controls[e] = t,
                t.setParent(this),
                t._registerOnCollectionChange(this._onCollectionChange),
                t)
            }
            addControl(e, t, r={}) {
                this.registerControl(e, t),
                this.updateValueAndValidity({
                    emitEvent: r.emitEvent
                }),
                this._onCollectionChange()
            }
            removeControl(e, t={}) {
                this.controls[e] && this.controls[e]._registerOnCollectionChange(()=>{}
                ),
                delete this.controls[e],
                this.updateValueAndValidity({
                    emitEvent: t.emitEvent
                }),
                this._onCollectionChange()
            }
            setControl(e, t, r={}) {
                this.controls[e] && this.controls[e]._registerOnCollectionChange(()=>{}
                ),
                delete this.controls[e],
                t && this.registerControl(e, t),
                this.updateValueAndValidity({
                    emitEvent: r.emitEvent
                }),
                this._onCollectionChange()
            }
            contains(e) {
                return this.controls.hasOwnProperty(e) && this.controls[e].enabled
            }
            setValue(e, t={}) {
                (function Ib(n, e, t) {
                    n._forEachChild((r,i)=>{
                        if (void 0 === t[i])
                            throw new b(1002,"")
                    }
                    )
                }
                )(this, 0, e),
                Object.keys(e).forEach(r=>{
                    (function Sb(n, e, t) {
                        const r = n.controls;
                        if (!(e ? Object.keys(r) : r).length)
                            throw new b(1e3,"");
                        if (!r[t])
                            throw new b(1001,"")
                    }
                    )(this, !0, r),
                    this.controls[r].setValue(e[r], {
                        onlySelf: !0,
                        emitEvent: t.emitEvent
                    })
                }
                ),
                this.updateValueAndValidity(t)
            }
            patchValue(e, t={}) {
                null != e && (Object.keys(e).forEach(r=>{
                    const i = this.controls[r];
                    i && i.patchValue(e[r], {
                        onlySelf: !0,
                        emitEvent: t.emitEvent
                    })
                }
                ),
                this.updateValueAndValidity(t))
            }
            reset(e={}, t={}) {
                this._forEachChild((r,i)=>{
                    r.reset(e[i], {
                        onlySelf: !0,
                        emitEvent: t.emitEvent
                    })
                }
                ),
                this._updatePristine(t),
                this._updateTouched(t),
                this.updateValueAndValidity(t)
            }
            getRawValue() {
                return this._reduceChildren({}, (e,t,r)=>(e[r] = t.getRawValue(),
                e))
            }
            _syncPendingControls() {
                let e = this._reduceChildren(!1, (t,r)=>!!r._syncPendingControls() || t);
                return e && this.updateValueAndValidity({
                    onlySelf: !0
                }),
                e
            }
            _forEachChild(e) {
                Object.keys(this.controls).forEach(t=>{
                    const r = this.controls[t];
                    r && e(r, t)
                }
                )
            }
            _setUpControls() {
                this._forEachChild(e=>{
                    e.setParent(this),
                    e._registerOnCollectionChange(this._onCollectionChange)
                }
                )
            }
            _updateValue() {
                this.value = this._reduceValue()
            }
            _anyControls(e) {
                for (const [t,r] of Object.entries(this.controls))
                    if (this.contains(t) && e(r))
                        return !0;
                return !1
            }
            _reduceValue() {
                return this._reduceChildren({}, (t,r,i)=>((r.enabled || this.disabled) && (t[i] = r.value),
                t))
            }
            _reduceChildren(e, t) {
                let r = e;
                return this._forEachChild((i,o)=>{
                    r = t(r, i, o)
                }
                ),
                r
            }
            _allControlsDisabled() {
                for (const e of Object.keys(this.controls))
                    if (this.controls[e].enabled)
                        return !1;
                return Object.keys(this.controls).length > 0 || this.disabled
            }
            _find(e) {
                return this.controls.hasOwnProperty(e) ? this.controls[e] : null
            }
        }
        function Is(n, e) {
            sf(n, e),
            e.valueAccessor.writeValue(n.value),
            n.disabled && e.valueAccessor.setDisabledState?.(!0),
            function R1(n, e) {
                e.valueAccessor.registerOnChange(t=>{
                    n._pendingValue = t,
                    n._pendingChange = !0,
                    n._pendingDirty = !0,
                    "change" === n.updateOn && wb(n, e)
                }
                )
            }(n, e),
            function F1(n, e) {
                const t = (r,i)=>{
                    e.valueAccessor.writeValue(r),
                    i && e.viewToModelUpdate(r)
                }
                ;
                n.registerOnChange(t),
                e._registerOnDestroy(()=>{
                    n._unregisterOnChange(t)
                }
                )
            }(n, e),
            function x1(n, e) {
                e.valueAccessor.registerOnTouched(()=>{
                    n._pendingTouched = !0,
                    "blur" === n.updateOn && n._pendingChange && wb(n, e),
                    "submit" !== n.updateOn && n.markAsTouched()
                }
                )
            }(n, e),
            function O1(n, e) {
                if (e.valueAccessor.setDisabledState) {
                    const t = r=>{
                        e.valueAccessor.setDisabledState(r)
                    }
                    ;
                    n.registerOnDisabledChange(t),
                    e._registerOnDestroy(()=>{
                        n._unregisterOnDisabledChange(t)
                    }
                    )
                }
            }(n, e)
        }
        function Fl(n, e, t=!0) {
            const r = ()=>{}
            ;
            e.valueAccessor && (e.valueAccessor.registerOnChange(r),
            e.valueAccessor.registerOnTouched(r)),
            kl(n, e),
            n && (e._invokeOnDestroyCallbacks(),
            n._registerOnCollectionChange(()=>{}
            ))
        }
        function Pl(n, e) {
            n.forEach(t=>{
                t.registerOnValidatorChange && t.registerOnValidatorChange(e)
            }
            )
        }
        function sf(n, e) {
            const t = mb(n);
            null !== e.validator ? n.setValidators(pb(t, e.validator)) : "function" == typeof t && n.setValidators([t]);
            const r = gb(n);
            null !== e.asyncValidator ? n.setAsyncValidators(pb(r, e.asyncValidator)) : "function" == typeof r && n.setAsyncValidators([r]);
            const i = ()=>n.updateValueAndValidity();
            Pl(e._rawValidators, i),
            Pl(e._rawAsyncValidators, i)
        }
        function kl(n, e) {
            let t = !1;
            if (null !== n) {
                if (null !== e.validator) {
                    const i = mb(n);
                    if (Array.isArray(i) && i.length > 0) {
                        const o = i.filter(s=>s !== e.validator);
                        o.length !== i.length && (t = !0,
                        n.setValidators(o))
                    }
                }
                if (null !== e.asyncValidator) {
                    const i = gb(n);
                    if (Array.isArray(i) && i.length > 0) {
                        const o = i.filter(s=>s !== e.asyncValidator);
                        o.length !== i.length && (t = !0,
                        n.setAsyncValidators(o))
                    }
                }
            }
            const r = ()=>{}
            ;
            return Pl(e._rawValidators, r),
            Pl(e._rawAsyncValidators, r),
            t
        }
        function wb(n, e) {
            n._pendingDirty && n.markAsDirty(),
            n.setValue(n._pendingValue, {
                emitModelToViewChange: !1
            }),
            e.viewToModelUpdate(n._pendingValue),
            n._pendingChange = !1
        }
        function Ab(n, e) {
            sf(n, e)
        }
        function Nb(n, e) {
            n._syncPendingControls(),
            e.forEach(t=>{
                const r = t.control;
                "submit" === r.updateOn && r._pendingChange && (t.viewToModelUpdate(r._pendingValue),
                r._pendingChange = !1)
            }
            )
        }
        const U1 = {
            provide: _t,
            useExisting: ge(()=>Ll)
        }
          , Ts = (()=>Promise.resolve())();
        let Ll = (()=>{
            class n extends _t {
                constructor(t, r) {
                    super(),
                    this.submitted = !1,
                    this._directives = new Set,
                    this.ngSubmit = new de,
                    this.form = new rf({},Qh(t),Yh(r))
                }
                ngAfterViewInit() {
                    this._setUpdateStrategy()
                }
                get formDirective() {
                    return this
                }
                get control() {
                    return this.form
                }
                get path() {
                    return []
                }
                get controls() {
                    return this.form.controls
                }
                addControl(t) {
                    Ts.then(()=>{
                        const r = this._findContainer(t.path);
                        t.control = r.registerControl(t.name, t.control),
                        Is(t.control, t),
                        t.control.updateValueAndValidity({
                            emitEvent: !1
                        }),
                        this._directives.add(t)
                    }
                    )
                }
                getControl(t) {
                    return this.form.get(t.path)
                }
                removeControl(t) {
                    Ts.then(()=>{
                        const r = this._findContainer(t.path);
                        r && r.removeControl(t.name),
                        this._directives.delete(t)
                    }
                    )
                }
                addFormGroup(t) {
                    Ts.then(()=>{
                        const r = this._findContainer(t.path)
                          , i = new rf({});
                        Ab(i, t),
                        r.registerControl(t.name, i),
                        i.updateValueAndValidity({
                            emitEvent: !1
                        })
                    }
                    )
                }
                removeFormGroup(t) {
                    Ts.then(()=>{
                        const r = this._findContainer(t.path);
                        r && r.removeControl(t.name)
                    }
                    )
                }
                getFormGroup(t) {
                    return this.form.get(t.path)
                }
                updateModel(t, r) {
                    Ts.then(()=>{
                        this.form.get(t.path).setValue(r)
                    }
                    )
                }
                setValue(t) {
                    this.control.setValue(t)
                }
                onSubmit(t) {
                    return this.submitted = !0,
                    Nb(this.form, this._directives),
                    this.ngSubmit.emit(t),
                    "dialog" === t?.target?.method
                }
                onReset() {
                    this.resetForm()
                }
                resetForm(t) {
                    this.form.reset(t),
                    this.submitted = !1
                }
                _setUpdateStrategy() {
                    this.options && null != this.options.updateOn && (this.form._updateOn = this.options.updateOn)
                }
                _findContainer(t) {
                    return t.pop(),
                    t.length ? this.form.get(t) : this.form
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(E(at, 10),E(_r, 10))
            }
            ,
            n.\u0275dir = x({
                type: n,
                selectors: [["form", 3, "ngNoForm", "", 3, "formGroup", ""], ["ng-form"], ["", "ngForm", ""]],
                hostBindings: function(t, r) {
                    1 & t && De("submit", function(o) {
                        return r.onSubmit(o)
                    })("reset", function() {
                        return r.onReset()
                    })
                },
                inputs: {
                    options: ["ngFormOptions", "options"]
                },
                outputs: {
                    ngSubmit: "ngSubmit"
                },
                exportAs: ["ngForm"],
                features: [he([U1]), se]
            }),
            n
        }
        )();
        function Ob(n, e) {
            const t = n.indexOf(e);
            t > -1 && n.splice(t, 1)
        }
        function Rb(n) {
            return "object" == typeof n && null !== n && 2 === Object.keys(n).length && "value"in n && "disabled"in n
        }
        const xb = class extends Tb {
            constructor(e=null, t, r) {
                super(tf(t), nf(r, t)),
                this.defaultValue = null,
                this._onChange = [],
                this._pendingChange = !1,
                this._applyFormState(e),
                this._setUpdateStrategy(t),
                this._initObservables(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!this.asyncValidator
                }),
                Rl(t) && (t.nonNullable || t.initialValueIsDefault) && (this.defaultValue = Rb(e) ? e.value : e)
            }
            setValue(e, t={}) {
                this.value = this._pendingValue = e,
                this._onChange.length && !1 !== t.emitModelToViewChange && this._onChange.forEach(r=>r(this.value, !1 !== t.emitViewToModelChange)),
                this.updateValueAndValidity(t)
            }
            patchValue(e, t={}) {
                this.setValue(e, t)
            }
            reset(e=this.defaultValue, t={}) {
                this._applyFormState(e),
                this.markAsPristine(t),
                this.markAsUntouched(t),
                this.setValue(this.value, t),
                this._pendingChange = !1
            }
            _updateValue() {}
            _anyControls(e) {
                return !1
            }
            _allControlsDisabled() {
                return this.disabled
            }
            registerOnChange(e) {
                this._onChange.push(e)
            }
            _unregisterOnChange(e) {
                Ob(this._onChange, e)
            }
            registerOnDisabledChange(e) {
                this._onDisabledChange.push(e)
            }
            _unregisterOnDisabledChange(e) {
                Ob(this._onDisabledChange, e)
            }
            _forEachChild(e) {}
            _syncPendingControls() {
                return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(),
                this._pendingTouched && this.markAsTouched(),
                !this._pendingChange) || (this.setValue(this._pendingValue, {
                    onlySelf: !0,
                    emitModelToViewChange: !1
                }),
                0))
            }
            _applyFormState(e) {
                Rb(e) ? (this.value = this._pendingValue = e.value,
                e.disabled ? this.disable({
                    onlySelf: !0,
                    emitEvent: !1
                }) : this.enable({
                    onlySelf: !0,
                    emitEvent: !1
                })) : this.value = this._pendingValue = e
            }
        }
          , Y1 = {
            provide: _t,
            useExisting: ge(()=>Vl)
        };
        let Vl = (()=>{
            class n extends _t {
                constructor(t, r) {
                    super(),
                    this.submitted = !1,
                    this._onCollectionChange = ()=>this._updateDomValue(),
                    this.directives = [],
                    this.form = null,
                    this.ngSubmit = new de,
                    this._setValidators(t),
                    this._setAsyncValidators(r)
                }
                ngOnChanges(t) {
                    this._checkFormPresent(),
                    t.hasOwnProperty("form") && (this._updateValidators(),
                    this._updateDomValue(),
                    this._updateRegistrations(),
                    this._oldForm = this.form)
                }
                ngOnDestroy() {
                    this.form && (kl(this.form, this),
                    this.form._onCollectionChange === this._onCollectionChange && this.form._registerOnCollectionChange(()=>{}
                    ))
                }
                get formDirective() {
                    return this
                }
                get control() {
                    return this.form
                }
                get path() {
                    return []
                }
                addControl(t) {
                    const r = this.form.get(t.path);
                    return Is(r, t),
                    r.updateValueAndValidity({
                        emitEvent: !1
                    }),
                    this.directives.push(t),
                    r
                }
                getControl(t) {
                    return this.form.get(t.path)
                }
                removeControl(t) {
                    Fl(t.control || null, t, !1),
                    function V1(n, e) {
                        const t = n.indexOf(e);
                        t > -1 && n.splice(t, 1)
                    }(this.directives, t)
                }
                addFormGroup(t) {
                    this._setUpFormContainer(t)
                }
                removeFormGroup(t) {
                    this._cleanUpFormContainer(t)
                }
                getFormGroup(t) {
                    return this.form.get(t.path)
                }
                addFormArray(t) {
                    this._setUpFormContainer(t)
                }
                removeFormArray(t) {
                    this._cleanUpFormContainer(t)
                }
                getFormArray(t) {
                    return this.form.get(t.path)
                }
                updateModel(t, r) {
                    this.form.get(t.path).setValue(r)
                }
                onSubmit(t) {
                    return this.submitted = !0,
                    Nb(this.form, this.directives),
                    this.ngSubmit.emit(t),
                    "dialog" === t?.target?.method
                }
                onReset() {
                    this.resetForm()
                }
                resetForm(t) {
                    this.form.reset(t),
                    this.submitted = !1
                }
                _updateDomValue() {
                    this.directives.forEach(t=>{
                        const r = t.control
                          , i = this.form.get(t.path);
                        r !== i && (Fl(r || null, t),
                        (n=>n instanceof xb)(i) && (Is(i, t),
                        t.control = i))
                    }
                    ),
                    this.form._updateTreeValidity({
                        emitEvent: !1
                    })
                }
                _setUpFormContainer(t) {
                    const r = this.form.get(t.path);
                    Ab(r, t),
                    r.updateValueAndValidity({
                        emitEvent: !1
                    })
                }
                _cleanUpFormContainer(t) {
                    if (this.form) {
                        const r = this.form.get(t.path);
                        r && function P1(n, e) {
                            return kl(n, e)
                        }(r, t) && r.updateValueAndValidity({
                            emitEvent: !1
                        })
                    }
                }
                _updateRegistrations() {
                    this.form._registerOnCollectionChange(this._onCollectionChange),
                    this._oldForm && this._oldForm._registerOnCollectionChange(()=>{}
                    )
                }
                _updateValidators() {
                    sf(this.form, this),
                    this._oldForm && kl(this._oldForm, this)
                }
                _checkFormPresent() {}
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(E(at, 10),E(_r, 10))
            }
            ,
            n.\u0275dir = x({
                type: n,
                selectors: [["", "formGroup", ""]],
                hostBindings: function(t, r) {
                    1 & t && De("submit", function(o) {
                        return r.onSubmit(o)
                    })("reset", function() {
                        return r.onReset()
                    })
                },
                inputs: {
                    form: ["formGroup", "form"]
                },
                outputs: {
                    ngSubmit: "ngSubmit"
                },
                exportAs: ["ngForm"],
                features: [he([Y1]), se, Nt]
            }),
            n
        }
        )();
        class nD {
        }
        const Yn = "*";
        function rD(n, e=null) {
            return {
                type: 2,
                steps: n,
                options: e
            }
        }
        function Ul(n) {
            return {
                type: 6,
                styles: n,
                offset: null
            }
        }
        function iD(n) {
            Promise.resolve().then(n)
        }
        class ws {
            constructor(e=0, t=0) {
                this._onDoneFns = [],
                this._onStartFns = [],
                this._onDestroyFns = [],
                this._originalOnDoneFns = [],
                this._originalOnStartFns = [],
                this._started = !1,
                this._destroyed = !1,
                this._finished = !1,
                this._position = 0,
                this.parentPlayer = null,
                this.totalTime = e + t
            }
            _onFinish() {
                this._finished || (this._finished = !0,
                this._onDoneFns.forEach(e=>e()),
                this._onDoneFns = [])
            }
            onStart(e) {
                this._originalOnStartFns.push(e),
                this._onStartFns.push(e)
            }
            onDone(e) {
                this._originalOnDoneFns.push(e),
                this._onDoneFns.push(e)
            }
            onDestroy(e) {
                this._onDestroyFns.push(e)
            }
            hasStarted() {
                return this._started
            }
            init() {}
            play() {
                this.hasStarted() || (this._onStart(),
                this.triggerMicrotask()),
                this._started = !0
            }
            triggerMicrotask() {
                iD(()=>this._onFinish())
            }
            _onStart() {
                this._onStartFns.forEach(e=>e()),
                this._onStartFns = []
            }
            pause() {}
            restart() {}
            finish() {
                this._onFinish()
            }
            destroy() {
                this._destroyed || (this._destroyed = !0,
                this.hasStarted() || this._onStart(),
                this.finish(),
                this._onDestroyFns.forEach(e=>e()),
                this._onDestroyFns = [])
            }
            reset() {
                this._started = !1,
                this._finished = !1,
                this._onStartFns = this._originalOnStartFns,
                this._onDoneFns = this._originalOnDoneFns
            }
            setPosition(e) {
                this._position = this.totalTime ? e * this.totalTime : 1
            }
            getPosition() {
                return this.totalTime ? this._position / this.totalTime : 1
            }
            triggerCallback(e) {
                const t = "start" == e ? this._onStartFns : this._onDoneFns;
                t.forEach(r=>r()),
                t.length = 0
            }
        }
        class oD {
            constructor(e) {
                this._onDoneFns = [],
                this._onStartFns = [],
                this._finished = !1,
                this._started = !1,
                this._destroyed = !1,
                this._onDestroyFns = [],
                this.parentPlayer = null,
                this.totalTime = 0,
                this.players = e;
                let t = 0
                  , r = 0
                  , i = 0;
                const o = this.players.length;
                0 == o ? iD(()=>this._onFinish()) : this.players.forEach(s=>{
                    s.onDone(()=>{
                        ++t == o && this._onFinish()
                    }
                    ),
                    s.onDestroy(()=>{
                        ++r == o && this._onDestroy()
                    }
                    ),
                    s.onStart(()=>{
                        ++i == o && this._onStart()
                    }
                    )
                }
                ),
                this.totalTime = this.players.reduce((s,a)=>Math.max(s, a.totalTime), 0)
            }
            _onFinish() {
                this._finished || (this._finished = !0,
                this._onDoneFns.forEach(e=>e()),
                this._onDoneFns = [])
            }
            init() {
                this.players.forEach(e=>e.init())
            }
            onStart(e) {
                this._onStartFns.push(e)
            }
            _onStart() {
                this.hasStarted() || (this._started = !0,
                this._onStartFns.forEach(e=>e()),
                this._onStartFns = [])
            }
            onDone(e) {
                this._onDoneFns.push(e)
            }
            onDestroy(e) {
                this._onDestroyFns.push(e)
            }
            hasStarted() {
                return this._started
            }
            play() {
                this.parentPlayer || this.init(),
                this._onStart(),
                this.players.forEach(e=>e.play())
            }
            pause() {
                this.players.forEach(e=>e.pause())
            }
            restart() {
                this.players.forEach(e=>e.restart())
            }
            finish() {
                this._onFinish(),
                this.players.forEach(e=>e.finish())
            }
            destroy() {
                this._onDestroy()
            }
            _onDestroy() {
                this._destroyed || (this._destroyed = !0,
                this._onFinish(),
                this.players.forEach(e=>e.destroy()),
                this._onDestroyFns.forEach(e=>e()),
                this._onDestroyFns = [])
            }
            reset() {
                this.players.forEach(e=>e.reset()),
                this._destroyed = !1,
                this._finished = !1,
                this._started = !1
            }
            setPosition(e) {
                const t = e * this.totalTime;
                this.players.forEach(r=>{
                    const i = r.totalTime ? Math.min(1, t / r.totalTime) : 1;
                    r.setPosition(i)
                }
                )
            }
            getPosition() {
                const e = this.players.reduce((t,r)=>null === t || r.totalTime > t.totalTime ? r : t, null);
                return null != e ? e.getPosition() : 0
            }
            beforeDestroy() {
                this.players.forEach(e=>{
                    e.beforeDestroy && e.beforeDestroy()
                }
                )
            }
            triggerCallback(e) {
                const t = "start" == e ? this._onStartFns : this._onDoneFns;
                t.forEach(r=>r()),
                t.length = 0
            }
        }
        let SL = (()=>{
            class n {
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275dir = x({
                type: n
            }),
            n
        }
        )();
        const IL = ["*"]
          , sD = new A("MatChipRemove")
          , aD = new A("MatChipAvatar")
          , lD = new A("MatChipTrailingIcon");
        class TL {
            constructor(e) {
                this._elementRef = e
            }
        }
        const wL = Zk(HC(jC(TL), "primary"), -1);
        let Bl = (()=>{
            class n extends wL {
                constructor(t, r, i, o, s, a, l, u) {
                    super(t),
                    this._ngZone = r,
                    this._changeDetectorRef = s,
                    this._hasFocus = !1,
                    this.chipListSelectable = !0,
                    this._chipListMultiple = !1,
                    this._chipListDisabled = !1,
                    this.role = "option",
                    this._selected = !1,
                    this._selectable = !0,
                    this._disabled = !1,
                    this._removable = !0,
                    this._onFocus = new Fe,
                    this._onBlur = new Fe,
                    this.selectionChange = new de,
                    this.destroyed = new de,
                    this.removed = new de,
                    this._addHostClassName(),
                    this._chipRippleTarget = a.createElement("div"),
                    this._chipRippleTarget.classList.add("mat-chip-ripple"),
                    this._elementRef.nativeElement.appendChild(this._chipRippleTarget),
                    this._chipRipple = new qC(this,r,this._chipRippleTarget,i),
                    this._chipRipple.setupTriggerEvents(t),
                    this.rippleConfig = o || {},
                    this._animationsDisabled = "NoopAnimations" === l,
                    this.tabIndex = null != u && parseInt(u) || -1
                }
                get rippleDisabled() {
                    return this.disabled || this.disableRipple || this._animationsDisabled || !!this.rippleConfig.disabled
                }
                get selected() {
                    return this._selected
                }
                set selected(t) {
                    const r = Zt(t);
                    r !== this._selected && (this._selected = r,
                    this._dispatchSelectionChange())
                }
                get value() {
                    return void 0 !== this._value ? this._value : this._elementRef.nativeElement.textContent
                }
                set value(t) {
                    this._value = t
                }
                get selectable() {
                    return this._selectable && this.chipListSelectable
                }
                set selectable(t) {
                    this._selectable = Zt(t)
                }
                get disabled() {
                    return this._chipListDisabled || this._disabled
                }
                set disabled(t) {
                    this._disabled = Zt(t)
                }
                get removable() {
                    return this._removable
                }
                set removable(t) {
                    this._removable = Zt(t)
                }
                get ariaSelected() {
                    return this.selectable && (this._chipListMultiple || this.selected) ? this.selected.toString() : null
                }
                _addHostClassName() {
                    const t = "mat-basic-chip"
                      , r = this._elementRef.nativeElement;
                    r.hasAttribute(t) || r.tagName.toLowerCase() === t ? r.classList.add(t) : r.classList.add("mat-standard-chip")
                }
                ngOnDestroy() {
                    this.destroyed.emit({
                        chip: this
                    }),
                    this._chipRipple._removeTriggerEvents()
                }
                select() {
                    this._selected || (this._selected = !0,
                    this._dispatchSelectionChange(),
                    this._changeDetectorRef.markForCheck())
                }
                deselect() {
                    this._selected && (this._selected = !1,
                    this._dispatchSelectionChange(),
                    this._changeDetectorRef.markForCheck())
                }
                selectViaInteraction() {
                    this._selected || (this._selected = !0,
                    this._dispatchSelectionChange(!0),
                    this._changeDetectorRef.markForCheck())
                }
                toggleSelected(t=!1) {
                    return this._selected = !this.selected,
                    this._dispatchSelectionChange(t),
                    this._changeDetectorRef.markForCheck(),
                    this.selected
                }
                focus() {
                    this._hasFocus || (this._elementRef.nativeElement.focus(),
                    this._onFocus.next({
                        chip: this
                    })),
                    this._hasFocus = !0
                }
                remove() {
                    this.removable && this.removed.emit({
                        chip: this
                    })
                }
                _handleClick(t) {
                    this.disabled && t.preventDefault()
                }
                _handleKeydown(t) {
                    if (!this.disabled)
                        switch (t.keyCode) {
                        case 46:
                        case 8:
                            this.remove(),
                            t.preventDefault();
                            break;
                        case 32:
                            this.selectable && this.toggleSelected(!0),
                            t.preventDefault()
                        }
                }
                _blur() {
                    this._ngZone.onStable.pipe(Wr(1)).subscribe(()=>{
                        this._ngZone.run(()=>{
                            this._hasFocus = !1,
                            this._onBlur.next({
                                chip: this
                            })
                        }
                        )
                    }
                    )
                }
                _dispatchSelectionChange(t=!1) {
                    this.selectionChange.emit({
                        source: this,
                        isUserInput: t,
                        selected: this._selected
                    })
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(E(Be),E(ve),E(Yi),E(KC, 8),E(Qi),E(Re),E(ls, 8),yi("tabindex"))
            }
            ,
            n.\u0275dir = x({
                type: n,
                selectors: [["mat-basic-chip"], ["", "mat-basic-chip", ""], ["mat-chip"], ["", "mat-chip", ""]],
                contentQueries: function(t, r, i) {
                    if (1 & t && (jr(i, aD, 5),
                    jr(i, lD, 5),
                    jr(i, sD, 5)),
                    2 & t) {
                        let o;
                        hr(o = fr()) && (r.avatar = o.first),
                        hr(o = fr()) && (r.trailingIcon = o.first),
                        hr(o = fr()) && (r.removeIcon = o.first)
                    }
                },
                hostAttrs: [1, "mat-chip", "mat-focus-indicator"],
                hostVars: 15,
                hostBindings: function(t, r) {
                    1 & t && De("click", function(o) {
                        return r._handleClick(o)
                    })("keydown", function(o) {
                        return r._handleKeydown(o)
                    })("focus", function() {
                        return r.focus()
                    })("blur", function() {
                        return r._blur()
                    }),
                    2 & t && (Dt("tabindex", r.disabled ? null : r.tabIndex)("role", r.role)("disabled", r.disabled || null)("aria-disabled", r.disabled.toString())("aria-selected", r.ariaSelected),
                    Gn("mat-chip-selected", r.selected)("mat-chip-with-avatar", r.avatar)("mat-chip-with-trailing-icon", r.trailingIcon || r.removeIcon)("mat-chip-disabled", r.disabled)("_mat-animation-noopable", r._animationsDisabled))
                },
                inputs: {
                    color: "color",
                    disableRipple: "disableRipple",
                    tabIndex: "tabIndex",
                    role: "role",
                    selected: "selected",
                    value: "value",
                    selectable: "selectable",
                    disabled: "disabled",
                    removable: "removable"
                },
                outputs: {
                    selectionChange: "selectionChange",
                    destroyed: "destroyed",
                    removed: "removed"
                },
                exportAs: ["matChip"],
                features: [se]
            }),
            n
        }
        )();
        const uD = new A("mat-chips-default-options")
          , OL = Xk(class {
            constructor(n, e, t, r) {
                this._defaultErrorStateMatcher = n,
                this._parentForm = e,
                this._parentFormGroup = t,
                this.ngControl = r,
                this.stateChanges = new Fe
            }
        }
        );
        let RL = 0;
        class xL {
            constructor(e, t) {
                this.source = e,
                this.value = t
            }
        }
        let cD = (()=>{
            class n extends OL {
                constructor(t, r, i, o, s, a, l) {
                    super(a, o, s, l),
                    this._elementRef = t,
                    this._changeDetectorRef = r,
                    this._dir = i,
                    this.controlType = "mat-chip-list",
                    this._lastDestroyedChipIndex = null,
                    this._destroyed = new Fe,
                    this._uid = "mat-chip-list-" + RL++,
                    this._tabIndex = 0,
                    this._userTabIndex = null,
                    this._onTouched = ()=>{}
                    ,
                    this._onChange = ()=>{}
                    ,
                    this._multiple = !1,
                    this._compareWith = (u,c)=>u === c,
                    this._disabled = !1,
                    this.ariaOrientation = "horizontal",
                    this._selectable = !0,
                    this.change = new de,
                    this.valueChange = new de,
                    this.ngControl && (this.ngControl.valueAccessor = this)
                }
                get selected() {
                    return this.multiple ? this._selectionModel?.selected || [] : this._selectionModel?.selected[0]
                }
                get role() {
                    return this._explicitRole ? this._explicitRole : this.empty ? null : "listbox"
                }
                set role(t) {
                    this._explicitRole = t
                }
                get multiple() {
                    return this._multiple
                }
                set multiple(t) {
                    this._multiple = Zt(t),
                    this._syncChipsState()
                }
                get compareWith() {
                    return this._compareWith
                }
                set compareWith(t) {
                    this._compareWith = t,
                    this._selectionModel && this._initializeSelection()
                }
                get value() {
                    return this._value
                }
                set value(t) {
                    this.writeValue(t),
                    this._value = t
                }
                get id() {
                    return this._chipInput ? this._chipInput.id : this._uid
                }
                get required() {
                    return this._required ?? this.ngControl?.control?.hasValidator(E1.required) ?? !1
                }
                set required(t) {
                    this._required = Zt(t),
                    this.stateChanges.next()
                }
                get placeholder() {
                    return this._chipInput ? this._chipInput.placeholder : this._placeholder
                }
                set placeholder(t) {
                    this._placeholder = t,
                    this.stateChanges.next()
                }
                get focused() {
                    return this._chipInput && this._chipInput.focused || this._hasFocusedChip()
                }
                get empty() {
                    return (!this._chipInput || this._chipInput.empty) && (!this.chips || 0 === this.chips.length)
                }
                get shouldLabelFloat() {
                    return !this.empty || this.focused
                }
                get disabled() {
                    return this.ngControl ? !!this.ngControl.disabled : this._disabled
                }
                set disabled(t) {
                    this._disabled = Zt(t),
                    this._syncChipsState()
                }
                get selectable() {
                    return this._selectable
                }
                set selectable(t) {
                    this._selectable = Zt(t),
                    this._syncChipsState()
                }
                set tabIndex(t) {
                    this._userTabIndex = t,
                    this._tabIndex = t
                }
                get chipSelectionChanges() {
                    return go(...this.chips.map(t=>t.selectionChange))
                }
                get chipFocusChanges() {
                    return go(...this.chips.map(t=>t._onFocus))
                }
                get chipBlurChanges() {
                    return go(...this.chips.map(t=>t._onBlur))
                }
                get chipRemoveChanges() {
                    return go(...this.chips.map(t=>t.destroyed))
                }
                ngAfterContentInit() {
                    this._keyManager = new Nk(this.chips).withWrap().withVerticalOrientation().withHomeAndEnd().withHorizontalOrientation(this._dir ? this._dir.value : "ltr"),
                    this._dir && this._dir.change.pipe(vs(this._destroyed)).subscribe(t=>this._keyManager.withHorizontalOrientation(t)),
                    this._keyManager.tabOut.pipe(vs(this._destroyed)).subscribe(()=>{
                        this._allowFocusEscape()
                    }
                    ),
                    this.chips.changes.pipe(zh(null), vs(this._destroyed)).subscribe(()=>{
                        (this.disabled || !this.selectable) && Promise.resolve().then(()=>{
                            this._syncChipsState()
                        }
                        ),
                        this._resetChips(),
                        this._initializeSelection(),
                        this._updateTabIndex(),
                        this._updateFocusForDestroyedChips(),
                        this.stateChanges.next()
                    }
                    )
                }
                ngOnInit() {
                    this._selectionModel = new h1(this.multiple,void 0,!1),
                    this.stateChanges.next()
                }
                ngDoCheck() {
                    this.ngControl && (this.updateErrorState(),
                    this.ngControl.disabled !== this._disabled && (this.disabled = !!this.ngControl.disabled))
                }
                ngOnDestroy() {
                    this._destroyed.next(),
                    this._destroyed.complete(),
                    this.stateChanges.complete(),
                    this._dropSubscriptions()
                }
                registerInput(t) {
                    this._chipInput = t,
                    this._elementRef.nativeElement.setAttribute("data-mat-chip-input", t.id)
                }
                setDescribedByIds(t) {
                    t.length ? this._elementRef.nativeElement.setAttribute("aria-describedby", t.join(" ")) : this._elementRef.nativeElement.removeAttribute("aria-describedby")
                }
                writeValue(t) {
                    this.chips && this._setSelectionByValue(t, !1)
                }
                registerOnChange(t) {
                    this._onChange = t
                }
                registerOnTouched(t) {
                    this._onTouched = t
                }
                setDisabledState(t) {
                    this.disabled = t,
                    this.stateChanges.next()
                }
                onContainerClick(t) {
                    this._originatesFromChip(t) || this.focus()
                }
                focus(t) {
                    this.disabled || this._chipInput && this._chipInput.focused || (this.chips.length > 0 ? (this._keyManager.setFirstItemActive(),
                    this.stateChanges.next()) : (this._focusInput(t),
                    this.stateChanges.next()))
                }
                _focusInput(t) {
                    this._chipInput && this._chipInput.focus(t)
                }
                _keydown(t) {
                    const r = t.target;
                    r && r.classList.contains("mat-chip") && (this._keyManager.onKeydown(t),
                    this.stateChanges.next())
                }
                _updateTabIndex() {
                    this._tabIndex = this._userTabIndex || (0 === this.chips.length ? -1 : 0)
                }
                _updateFocusForDestroyedChips() {
                    if (null != this._lastDestroyedChipIndex)
                        if (this.chips.length) {
                            const t = Math.min(this._lastDestroyedChipIndex, this.chips.length - 1);
                            this._keyManager.setActiveItem(t)
                        } else
                            this.focus();
                    this._lastDestroyedChipIndex = null
                }
                _isValidIndex(t) {
                    return t >= 0 && t < this.chips.length
                }
                _setSelectionByValue(t, r=!0) {
                    if (this._clearSelection(),
                    this.chips.forEach(i=>i.deselect()),
                    Array.isArray(t))
                        t.forEach(i=>this._selectValue(i, r)),
                        this._sortValues();
                    else {
                        const i = this._selectValue(t, r);
                        i && r && this._keyManager.setActiveItem(i)
                    }
                }
                _selectValue(t, r=!0) {
                    const i = this.chips.find(o=>null != o.value && this._compareWith(o.value, t));
                    return i && (r ? i.selectViaInteraction() : i.select(),
                    this._selectionModel.select(i)),
                    i
                }
                _initializeSelection() {
                    Promise.resolve().then(()=>{
                        (this.ngControl || this._value) && (this._setSelectionByValue(this.ngControl ? this.ngControl.value : this._value, !1),
                        this.stateChanges.next())
                    }
                    )
                }
                _clearSelection(t) {
                    this._selectionModel.clear(),
                    this.chips.forEach(r=>{
                        r !== t && r.deselect()
                    }
                    ),
                    this.stateChanges.next()
                }
                _sortValues() {
                    this._multiple && (this._selectionModel.clear(),
                    this.chips.forEach(t=>{
                        t.selected && this._selectionModel.select(t)
                    }
                    ),
                    this.stateChanges.next())
                }
                _propagateChanges(t) {
                    let r = null;
                    r = Array.isArray(this.selected) ? this.selected.map(i=>i.value) : this.selected ? this.selected.value : t,
                    this._value = r,
                    this.change.emit(new xL(this,r)),
                    this.valueChange.emit(r),
                    this._onChange(r),
                    this._changeDetectorRef.markForCheck()
                }
                _blur() {
                    this._hasFocusedChip() || this._keyManager.setActiveItem(-1),
                    this.disabled || (this._chipInput ? setTimeout(()=>{
                        this.focused || this._markAsTouched()
                    }
                    ) : this._markAsTouched())
                }
                _markAsTouched() {
                    this._onTouched(),
                    this._changeDetectorRef.markForCheck(),
                    this.stateChanges.next()
                }
                _allowFocusEscape() {
                    -1 !== this._tabIndex && (this._tabIndex = -1,
                    setTimeout(()=>{
                        this._tabIndex = this._userTabIndex || 0,
                        this._changeDetectorRef.markForCheck()
                    }
                    ))
                }
                _resetChips() {
                    this._dropSubscriptions(),
                    this._listenToChipsFocus(),
                    this._listenToChipsSelection(),
                    this._listenToChipsRemoved()
                }
                _dropSubscriptions() {
                    this._chipFocusSubscription && (this._chipFocusSubscription.unsubscribe(),
                    this._chipFocusSubscription = null),
                    this._chipBlurSubscription && (this._chipBlurSubscription.unsubscribe(),
                    this._chipBlurSubscription = null),
                    this._chipSelectionSubscription && (this._chipSelectionSubscription.unsubscribe(),
                    this._chipSelectionSubscription = null),
                    this._chipRemoveSubscription && (this._chipRemoveSubscription.unsubscribe(),
                    this._chipRemoveSubscription = null)
                }
                _listenToChipsSelection() {
                    this._chipSelectionSubscription = this.chipSelectionChanges.subscribe(t=>{
                        t.source.selected ? this._selectionModel.select(t.source) : this._selectionModel.deselect(t.source),
                        this.multiple || this.chips.forEach(r=>{
                            !this._selectionModel.isSelected(r) && r.selected && r.deselect()
                        }
                        ),
                        t.isUserInput && this._propagateChanges()
                    }
                    )
                }
                _listenToChipsFocus() {
                    this._chipFocusSubscription = this.chipFocusChanges.subscribe(t=>{
                        let r = this.chips.toArray().indexOf(t.chip);
                        this._isValidIndex(r) && this._keyManager.updateActiveItem(r),
                        this.stateChanges.next()
                    }
                    ),
                    this._chipBlurSubscription = this.chipBlurChanges.subscribe(()=>{
                        this._blur(),
                        this.stateChanges.next()
                    }
                    )
                }
                _listenToChipsRemoved() {
                    this._chipRemoveSubscription = this.chipRemoveChanges.subscribe(t=>{
                        const r = t.chip
                          , i = this.chips.toArray().indexOf(t.chip);
                        this._isValidIndex(i) && r._hasFocus && (this._lastDestroyedChipIndex = i)
                    }
                    )
                }
                _originatesFromChip(t) {
                    let r = t.target;
                    for (; r && r !== this._elementRef.nativeElement; ) {
                        if (r.classList.contains("mat-chip"))
                            return !0;
                        r = r.parentElement
                    }
                    return !1
                }
                _hasFocusedChip() {
                    return this.chips && this.chips.some(t=>t._hasFocus)
                }
                _syncChipsState() {
                    this.chips && this.chips.forEach(t=>{
                        t._chipListDisabled = this._disabled,
                        t._chipListMultiple = this.multiple,
                        t.chipListSelectable = this._selectable
                    }
                    )
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(E(Be),E(Qi),E(qk, 8),E(Ll, 8),E(Vl, 8),E(GC),E(Qn, 10))
            }
            ,
            n.\u0275cmp = li({
                type: n,
                selectors: [["mat-chip-list"]],
                contentQueries: function(t, r, i) {
                    if (1 & t && jr(i, Bl, 5),
                    2 & t) {
                        let o;
                        hr(o = fr()) && (r.chips = o)
                    }
                },
                hostAttrs: [1, "mat-chip-list"],
                hostVars: 14,
                hostBindings: function(t, r) {
                    1 & t && De("focus", function() {
                        return r.focus()
                    })("blur", function() {
                        return r._blur()
                    })("keydown", function(o) {
                        return r._keydown(o)
                    }),
                    2 & t && (Wa("id", r._uid),
                    Dt("tabindex", r.disabled ? null : r._tabIndex)("aria-required", r.role ? r.required : null)("aria-disabled", r.disabled.toString())("aria-invalid", r.errorState)("aria-multiselectable", r.multiple)("role", r.role)("aria-orientation", r.ariaOrientation),
                    Gn("mat-chip-list-disabled", r.disabled)("mat-chip-list-invalid", r.errorState)("mat-chip-list-required", r.required))
                },
                inputs: {
                    role: "role",
                    userAriaDescribedBy: ["aria-describedby", "userAriaDescribedBy"],
                    errorStateMatcher: "errorStateMatcher",
                    multiple: "multiple",
                    compareWith: "compareWith",
                    value: "value",
                    required: "required",
                    placeholder: "placeholder",
                    disabled: "disabled",
                    ariaOrientation: ["aria-orientation", "ariaOrientation"],
                    selectable: "selectable",
                    tabIndex: "tabIndex"
                },
                outputs: {
                    change: "change",
                    valueChange: "valueChange"
                },
                exportAs: ["matChipList"],
                features: [he([{
                    provide: SL,
                    useExisting: n
                }]), se],
                ngContentSelectors: IL,
                decls: 2,
                vars: 0,
                consts: [[1, "mat-chip-list-wrapper"]],
                template: function(t, r) {
                    1 & t && (Nd(),
                    re(0, "div", 0),
                    Od(1),
                    ie())
                },
                styles: ['.mat-chip{position:relative;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0);border:none;-webkit-appearance:none;-moz-appearance:none}.mat-chip::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-standard-chip{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:inline-flex;padding:7px 12px;border-radius:16px;align-items:center;cursor:default;min-height:32px;height:1px}.mat-standard-chip._mat-animation-noopable{transition:none !important;animation:none !important}.mat-standard-chip .mat-chip-remove{border:none;-webkit-appearance:none;-moz-appearance:none;padding:0;background:none}.mat-standard-chip .mat-chip-remove.mat-icon,.mat-standard-chip .mat-chip-remove .mat-icon{width:18px;height:18px;font-size:18px}.mat-standard-chip::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;opacity:0;content:"";pointer-events:none;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-standard-chip:hover::after{opacity:.12}.mat-standard-chip:focus{outline:none}.mat-standard-chip:focus::after{opacity:.16}.cdk-high-contrast-active .mat-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-standard-chip.mat-chip-selected{outline-width:3px}.mat-standard-chip.mat-chip-disabled::after{opacity:0}.mat-standard-chip.mat-chip-disabled .mat-chip-remove,.mat-standard-chip.mat-chip-disabled .mat-chip-trailing-icon{cursor:default}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar,.mat-standard-chip.mat-chip-with-avatar{padding-top:0;padding-bottom:0}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-right:8px;padding-left:0}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-left:8px;padding-right:0}.mat-standard-chip.mat-chip-with-trailing-icon{padding-top:7px;padding-bottom:7px;padding-right:8px;padding-left:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon{padding-left:8px;padding-right:12px}.mat-standard-chip.mat-chip-with-avatar{padding-left:0;padding-right:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-avatar{padding-right:0;padding-left:12px}.mat-standard-chip .mat-chip-avatar{width:24px;height:24px;margin-right:8px;margin-left:4px}[dir=rtl] .mat-standard-chip .mat-chip-avatar{margin-left:8px;margin-right:4px}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{width:18px;height:18px;cursor:pointer}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{margin-left:8px;margin-right:0}[dir=rtl] .mat-standard-chip .mat-chip-remove,[dir=rtl] .mat-standard-chip .mat-chip-trailing-icon{margin-right:8px;margin-left:0}.mat-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit;overflow:hidden;transform:translateZ(0)}.mat-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;margin:-4px}.mat-chip-list-wrapper input.mat-input-element,.mat-chip-list-wrapper .mat-standard-chip{margin:4px}.mat-chip-list-stacked .mat-chip-list-wrapper{flex-direction:column;align-items:flex-start}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-standard-chip{width:100%}.mat-chip-avatar{border-radius:50%;justify-content:center;align-items:center;display:flex;overflow:hidden;object-fit:cover}input.mat-chip-input{width:150px;margin:4px;flex:1 0 150px}'],
                encapsulation: 2,
                changeDetection: 0
            }),
            n
        }
        )()
          , kL = (()=>{
            class n {
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275mod = vt({
                type: n
            }),
            n.\u0275inj = ut({
                providers: [GC, {
                    provide: uD,
                    useValue: {
                        separatorKeyCodes: [13]
                    }
                }],
                imports: [Cs]
            }),
            n
        }
        )();
        const Hl = fo(n=>function() {
            n(this),
            this.name = "EmptyError",
            this.message = "no elements in sequence"
        }
        );
        function dD(n) {
            return new xe(e=>{
                Ht(n()).subscribe(e)
            }
            )
        }
        function As(n, e) {
            const t = me(n) ? n : ()=>n
              , r = i=>i.error(t());
            return new xe(e ? i=>e.schedule(r, 0, i) : r)
        }
        function mf() {
            return Pe((n,e)=>{
                let t = null;
                n._refCount++;
                const r = we(e, void 0, void 0, void 0, ()=>{
                    if (!n || n._refCount <= 0 || 0 < --n._refCount)
                        return void (t = null);
                    const i = n._connection
                      , o = t;
                    t = null,
                    i && (!o || i === o) && i.unsubscribe(),
                    e.unsubscribe()
                }
                );
                n.subscribe(r),
                r.closed || (t = n.connect())
            }
            )
        }
        class hD extends xe {
            constructor(e, t) {
                super(),
                this.source = e,
                this.subjectFactory = t,
                this._subject = null,
                this._refCount = 0,
                this._connection = null,
                Tp(e) && (this.lift = e.lift)
            }
            _subscribe(e) {
                return this.getSubject().subscribe(e)
            }
            getSubject() {
                const e = this._subject;
                return (!e || e.isStopped) && (this._subject = this.subjectFactory()),
                this._subject
            }
            _teardown() {
                this._refCount = 0;
                const {_connection: e} = this;
                this._subject = this._connection = null,
                e?.unsubscribe()
            }
            connect() {
                let e = this._connection;
                if (!e) {
                    e = this._connection = new yt;
                    const t = this.getSubject();
                    e.add(this.source.subscribe(we(t, void 0, ()=>{
                        this._teardown(),
                        t.complete()
                    }
                    , r=>{
                        this._teardown(),
                        t.error(r)
                    }
                    , ()=>this._teardown()))),
                    e.closed && (this._connection = null,
                    e = yt.EMPTY)
                }
                return e
            }
            refCount() {
                return mf()(this)
            }
        }
        function wn(n, e) {
            return Pe((t,r)=>{
                let i = null
                  , o = 0
                  , s = !1;
                const a = ()=>s && !i && r.complete();
                t.subscribe(we(r, l=>{
                    i?.unsubscribe();
                    let u = 0;
                    const c = o++;
                    Ht(n(l, c)).subscribe(i = we(r, d=>r.next(e ? e(l, d, c, u++) : d), ()=>{
                        i = null,
                        a()
                    }
                    ))
                }
                , ()=>{
                    s = !0,
                    a()
                }
                ))
            }
            )
        }
        function jl(n) {
            return Pe((e,t)=>{
                let r = !1;
                e.subscribe(we(t, i=>{
                    r = !0,
                    t.next(i)
                }
                , ()=>{
                    r || t.next(n),
                    t.complete()
                }
                ))
            }
            )
        }
        function fD(n=LL) {
            return Pe((e,t)=>{
                let r = !1;
                e.subscribe(we(t, i=>{
                    r = !0,
                    t.next(i)
                }
                , ()=>r ? t.complete() : t.error(n())))
            }
            )
        }
        function LL() {
            return new Hl
        }
        function yr(n, e) {
            const t = arguments.length >= 2;
            return r=>r.pipe(n ? In((i,o)=>n(i, o, r)) : tr, Wr(1), t ? jl(e) : fD(()=>new Hl))
        }
        function Qr(n, e) {
            return me(e) ? Qe(n, e, 1) : Qe(n, 1)
        }
        function vr(n) {
            return Pe((e,t)=>{
                let o, r = null, i = !1;
                r = e.subscribe(we(t, void 0, void 0, s=>{
                    o = Ht(n(s, vr(n)(e))),
                    r ? (r.unsubscribe(),
                    r = null,
                    o.subscribe(t)) : i = !0
                }
                )),
                i && (r.unsubscribe(),
                r = null,
                o.subscribe(t))
            }
            )
        }
        function VL(n, e, t, r, i) {
            return (o,s)=>{
                let a = t
                  , l = e
                  , u = 0;
                o.subscribe(we(s, c=>{
                    const d = u++;
                    l = a ? n(l, c, d) : (a = !0,
                    c),
                    r && s.next(l)
                }
                , i && (()=>{
                    a && s.next(l),
                    s.complete()
                }
                )))
            }
        }
        function pD(n, e) {
            return Pe(VL(n, e, arguments.length >= 2, !0))
        }
        function gf(n) {
            return n <= 0 ? ()=>Rn : Pe((e,t)=>{
                let r = [];
                e.subscribe(we(t, i=>{
                    r.push(i),
                    n < r.length && r.shift()
                }
                , ()=>{
                    for (const i of r)
                        t.next(i);
                    t.complete()
                }
                , void 0, ()=>{
                    r = null
                }
                ))
            }
            )
        }
        function mD(n, e) {
            const t = arguments.length >= 2;
            return r=>r.pipe(n ? In((i,o)=>n(i, o, r)) : tr, gf(1), t ? jl(e) : fD(()=>new Hl))
        }
        function _f(n) {
            return Pe((e,t)=>{
                try {
                    e.subscribe(t)
                } finally {
                    t.add(n)
                }
            }
            )
        }
        const Z = "primary"
          , Ms = Symbol("RouteTitle");
        class HL {
            constructor(e) {
                this.params = e || {}
            }
            has(e) {
                return Object.prototype.hasOwnProperty.call(this.params, e)
            }
            get(e) {
                if (this.has(e)) {
                    const t = this.params[e];
                    return Array.isArray(t) ? t[0] : t
                }
                return null
            }
            getAll(e) {
                if (this.has(e)) {
                    const t = this.params[e];
                    return Array.isArray(t) ? t : [t]
                }
                return []
            }
            get keys() {
                return Object.keys(this.params)
            }
        }
        function to(n) {
            return new HL(n)
        }
        function jL(n, e, t) {
            const r = t.path.split("/");
            if (r.length > n.length || "full" === t.pathMatch && (e.hasChildren() || r.length < n.length))
                return null;
            const i = {};
            for (let o = 0; o < r.length; o++) {
                const s = r[o]
                  , a = n[o];
                if (s.startsWith(":"))
                    i[s.substring(1)] = a;
                else if (s !== a.path)
                    return null
            }
            return {
                consumed: n.slice(0, r.length),
                posParams: i
            }
        }
        function An(n, e) {
            const t = n ? Object.keys(n) : void 0
              , r = e ? Object.keys(e) : void 0;
            if (!t || !r || t.length != r.length)
                return !1;
            let i;
            for (let o = 0; o < t.length; o++)
                if (i = t[o],
                !gD(n[i], e[i]))
                    return !1;
            return !0
        }
        function gD(n, e) {
            if (Array.isArray(n) && Array.isArray(e)) {
                if (n.length !== e.length)
                    return !1;
                const t = [...n].sort()
                  , r = [...e].sort();
                return t.every((i,o)=>r[o] === i)
            }
            return n === e
        }
        function _D(n) {
            return Array.prototype.concat.apply([], n)
        }
        function yD(n) {
            return n.length > 0 ? n[n.length - 1] : null
        }
        function Xe(n, e) {
            for (const t in n)
                n.hasOwnProperty(t) && e(n[t], t)
        }
        function Er(n) {
            return Md(n) ? n : Yo(n) ? Le(Promise.resolve(n)) : P(n)
        }
        const zL = {
            exact: function CD(n, e, t) {
                if (!Zr(n.segments, e.segments) || !Gl(n.segments, e.segments, t) || n.numberOfChildren !== e.numberOfChildren)
                    return !1;
                for (const r in e.children)
                    if (!n.children[r] || !CD(n.children[r], e.children[r], t))
                        return !1;
                return !0
            },
            subset: bD
        }
          , vD = {
            exact: function WL(n, e) {
                return An(n, e)
            },
            subset: function qL(n, e) {
                return Object.keys(e).length <= Object.keys(n).length && Object.keys(e).every(t=>gD(n[t], e[t]))
            },
            ignored: ()=>!0
        };
        function ED(n, e, t) {
            return zL[t.paths](n.root, e.root, t.matrixParams) && vD[t.queryParams](n.queryParams, e.queryParams) && !("exact" === t.fragment && n.fragment !== e.fragment)
        }
        function bD(n, e, t) {
            return DD(n, e, e.segments, t)
        }
        function DD(n, e, t, r) {
            if (n.segments.length > t.length) {
                const i = n.segments.slice(0, t.length);
                return !(!Zr(i, t) || e.hasChildren() || !Gl(i, t, r))
            }
            if (n.segments.length === t.length) {
                if (!Zr(n.segments, t) || !Gl(n.segments, t, r))
                    return !1;
                for (const i in e.children)
                    if (!n.children[i] || !bD(n.children[i], e.children[i], r))
                        return !1;
                return !0
            }
            {
                const i = t.slice(0, n.segments.length)
                  , o = t.slice(n.segments.length);
                return !!(Zr(n.segments, i) && Gl(n.segments, i, r) && n.children[Z]) && DD(n.children[Z], e, o, r)
            }
        }
        function Gl(n, e, t) {
            return e.every((r,i)=>vD[t](n[i].parameters, r.parameters))
        }
        class Yr {
            constructor(e, t, r) {
                this.root = e,
                this.queryParams = t,
                this.fragment = r
            }
            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = to(this.queryParams)),
                this._queryParamMap
            }
            toString() {
                return YL.serialize(this)
            }
        }
        class X {
            constructor(e, t) {
                this.segments = e,
                this.children = t,
                this.parent = null,
                Xe(t, (r,i)=>r.parent = this)
            }
            hasChildren() {
                return this.numberOfChildren > 0
            }
            get numberOfChildren() {
                return Object.keys(this.children).length
            }
            toString() {
                return $l(this)
            }
        }
        class Ns {
            constructor(e, t) {
                this.path = e,
                this.parameters = t
            }
            get parameterMap() {
                return this._parameterMap || (this._parameterMap = to(this.parameters)),
                this._parameterMap
            }
            toString() {
                return wD(this)
            }
        }
        function Zr(n, e) {
            return n.length === e.length && n.every((t,r)=>t.path === e[r].path)
        }
        let SD = (()=>{
            class n {
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: function() {
                    return new vf
                },
                providedIn: "root"
            }),
            n
        }
        )();
        class vf {
            parse(e) {
                const t = new oV(e);
                return new Yr(t.parseRootSegment(),t.parseQueryParams(),t.parseFragment())
            }
            serialize(e) {
                const t = `/${Os(e.root, !0)}`
                  , r = function JL(n) {
                    const e = Object.keys(n).map(t=>{
                        const r = n[t];
                        return Array.isArray(r) ? r.map(i=>`${zl(t)}=${zl(i)}`).join("&") : `${zl(t)}=${zl(r)}`
                    }
                    ).filter(t=>!!t);
                    return e.length ? `?${e.join("&")}` : ""
                }(e.queryParams);
                return `${t}${r}${"string" == typeof e.fragment ? `#${function ZL(n) {
                    return encodeURI(n)
                }(e.fragment)}` : ""}`
            }
        }
        const YL = new vf;
        function $l(n) {
            return n.segments.map(e=>wD(e)).join("/")
        }
        function Os(n, e) {
            if (!n.hasChildren())
                return $l(n);
            if (e) {
                const t = n.children[Z] ? Os(n.children[Z], !1) : ""
                  , r = [];
                return Xe(n.children, (i,o)=>{
                    o !== Z && r.push(`${o}:${Os(i, !1)}`)
                }
                ),
                r.length > 0 ? `${t}(${r.join("//")})` : t
            }
            {
                const t = function QL(n, e) {
                    let t = [];
                    return Xe(n.children, (r,i)=>{
                        i === Z && (t = t.concat(e(r, i)))
                    }
                    ),
                    Xe(n.children, (r,i)=>{
                        i !== Z && (t = t.concat(e(r, i)))
                    }
                    ),
                    t
                }(n, (r,i)=>i === Z ? [Os(n.children[Z], !1)] : [`${i}:${Os(r, !1)}`]);
                return 1 === Object.keys(n.children).length && null != n.children[Z] ? `${$l(n)}/${t[0]}` : `${$l(n)}/(${t.join("//")})`
            }
        }
        function ID(n) {
            return encodeURIComponent(n).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
        }
        function zl(n) {
            return ID(n).replace(/%3B/gi, ";")
        }
        function Ef(n) {
            return ID(n).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
        }
        function Wl(n) {
            return decodeURIComponent(n)
        }
        function TD(n) {
            return Wl(n.replace(/\+/g, "%20"))
        }
        function wD(n) {
            return `${Ef(n.path)}${function XL(n) {
                return Object.keys(n).map(e=>`;${Ef(e)}=${Ef(n[e])}`).join("")
            }(n.parameters)}`
        }
        const eV = /^[^\/()?;=#]+/;
        function ql(n) {
            const e = n.match(eV);
            return e ? e[0] : ""
        }
        const tV = /^[^=?&#]+/
          , rV = /^[^&#]+/;
        class oV {
            constructor(e) {
                this.url = e,
                this.remaining = e
            }
            parseRootSegment() {
                return this.consumeOptional("/"),
                "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new X([],{}) : new X([],this.parseChildren())
            }
            parseQueryParams() {
                const e = {};
                if (this.consumeOptional("?"))
                    do {
                        this.parseQueryParam(e)
                    } while (this.consumeOptional("&"));
                return e
            }
            parseFragment() {
                return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
            }
            parseChildren() {
                if ("" === this.remaining)
                    return {};
                this.consumeOptional("/");
                const e = [];
                for (this.peekStartsWith("(") || e.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/("); )
                    this.capture("/"),
                    e.push(this.parseSegment());
                let t = {};
                this.peekStartsWith("/(") && (this.capture("/"),
                t = this.parseParens(!0));
                let r = {};
                return this.peekStartsWith("(") && (r = this.parseParens(!1)),
                (e.length > 0 || Object.keys(t).length > 0) && (r[Z] = new X(e,t)),
                r
            }
            parseSegment() {
                const e = ql(this.remaining);
                if ("" === e && this.peekStartsWith(";"))
                    throw new b(4009,!1);
                return this.capture(e),
                new Ns(Wl(e),this.parseMatrixParams())
            }
            parseMatrixParams() {
                const e = {};
                for (; this.consumeOptional(";"); )
                    this.parseParam(e);
                return e
            }
            parseParam(e) {
                const t = ql(this.remaining);
                if (!t)
                    return;
                this.capture(t);
                let r = "";
                if (this.consumeOptional("=")) {
                    const i = ql(this.remaining);
                    i && (r = i,
                    this.capture(r))
                }
                e[Wl(t)] = Wl(r)
            }
            parseQueryParam(e) {
                const t = function nV(n) {
                    const e = n.match(tV);
                    return e ? e[0] : ""
                }(this.remaining);
                if (!t)
                    return;
                this.capture(t);
                let r = "";
                if (this.consumeOptional("=")) {
                    const s = function iV(n) {
                        const e = n.match(rV);
                        return e ? e[0] : ""
                    }(this.remaining);
                    s && (r = s,
                    this.capture(r))
                }
                const i = TD(t)
                  , o = TD(r);
                if (e.hasOwnProperty(i)) {
                    let s = e[i];
                    Array.isArray(s) || (s = [s],
                    e[i] = s),
                    s.push(o)
                } else
                    e[i] = o
            }
            parseParens(e) {
                const t = {};
                for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0; ) {
                    const r = ql(this.remaining)
                      , i = this.remaining[r.length];
                    if ("/" !== i && ")" !== i && ";" !== i)
                        throw new b(4010,!1);
                    let o;
                    r.indexOf(":") > -1 ? (o = r.slice(0, r.indexOf(":")),
                    this.capture(o),
                    this.capture(":")) : e && (o = Z);
                    const s = this.parseChildren();
                    t[o] = 1 === Object.keys(s).length ? s[Z] : new X([],s),
                    this.consumeOptional("//")
                }
                return t
            }
            peekStartsWith(e) {
                return this.remaining.startsWith(e)
            }
            consumeOptional(e) {
                return !!this.peekStartsWith(e) && (this.remaining = this.remaining.substring(e.length),
                !0)
            }
            capture(e) {
                if (!this.consumeOptional(e))
                    throw new b(4011,!1)
            }
        }
        function Cf(n) {
            return n.segments.length > 0 ? new X([],{
                [Z]: n
            }) : n
        }
        function Kl(n) {
            const e = {};
            for (const r of Object.keys(n.children)) {
                const o = Kl(n.children[r]);
                (o.segments.length > 0 || o.hasChildren()) && (e[r] = o)
            }
            return function sV(n) {
                if (1 === n.numberOfChildren && n.children[Z]) {
                    const e = n.children[Z];
                    return new X(n.segments.concat(e.segments),e.children)
                }
                return n
            }(new X(n.segments,e))
        }
        function Xr(n) {
            return n instanceof Yr
        }
        function uV(n, e, t, r, i) {
            if (0 === t.length)
                return no(e.root, e.root, e.root, r, i);
            const o = function ND(n) {
                if ("string" == typeof n[0] && 1 === n.length && "/" === n[0])
                    return new MD(!0,0,n);
                let e = 0
                  , t = !1;
                const r = n.reduce((i,o,s)=>{
                    if ("object" == typeof o && null != o) {
                        if (o.outlets) {
                            const a = {};
                            return Xe(o.outlets, (l,u)=>{
                                a[u] = "string" == typeof l ? l.split("/") : l
                            }
                            ),
                            [...i, {
                                outlets: a
                            }]
                        }
                        if (o.segmentPath)
                            return [...i, o.segmentPath]
                    }
                    return "string" != typeof o ? [...i, o] : 0 === s ? (o.split("/").forEach((a,l)=>{
                        0 == l && "." === a || (0 == l && "" === a ? t = !0 : ".." === a ? e++ : "" != a && i.push(a))
                    }
                    ),
                    i) : [...i, o]
                }
                , []);
                return new MD(t,e,r)
            }(t);
            return o.toRoot() ? no(e.root, e.root, new X([],{}), r, i) : function s(l) {
                const u = function dV(n, e, t, r) {
                    if (n.isAbsolute)
                        return new ro(e.root,!0,0);
                    if (-1 === r)
                        return new ro(t,t === e.root,0);
                    return function OD(n, e, t) {
                        let r = n
                          , i = e
                          , o = t;
                        for (; o > i; ) {
                            if (o -= i,
                            r = r.parent,
                            !r)
                                throw new b(4005,!1);
                            i = r.segments.length
                        }
                        return new ro(r,!1,i - o)
                    }(t, r + (Rs(n.commands[0]) ? 0 : 1), n.numberOfDoubleDots)
                }(o, e, n.snapshot?._urlSegment, l)
                  , c = u.processChildren ? Fs(u.segmentGroup, u.index, o.commands) : Df(u.segmentGroup, u.index, o.commands);
                return no(e.root, u.segmentGroup, c, r, i)
            }(n.snapshot?._lastPathIndex)
        }
        function Rs(n) {
            return "object" == typeof n && null != n && !n.outlets && !n.segmentPath
        }
        function xs(n) {
            return "object" == typeof n && null != n && n.outlets
        }
        function no(n, e, t, r, i) {
            let s, o = {};
            r && Xe(r, (l,u)=>{
                o[u] = Array.isArray(l) ? l.map(c=>`${c}`) : `${l}`
            }
            ),
            s = n === e ? t : AD(n, e, t);
            const a = Cf(Kl(s));
            return new Yr(a,o,i)
        }
        function AD(n, e, t) {
            const r = {};
            return Xe(n.children, (i,o)=>{
                r[o] = i === e ? t : AD(i, e, t)
            }
            ),
            new X(n.segments,r)
        }
        class MD {
            constructor(e, t, r) {
                if (this.isAbsolute = e,
                this.numberOfDoubleDots = t,
                this.commands = r,
                e && r.length > 0 && Rs(r[0]))
                    throw new b(4003,!1);
                const i = r.find(xs);
                if (i && i !== yD(r))
                    throw new b(4004,!1)
            }
            toRoot() {
                return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
            }
        }
        class ro {
            constructor(e, t, r) {
                this.segmentGroup = e,
                this.processChildren = t,
                this.index = r
            }
        }
        function Df(n, e, t) {
            if (n || (n = new X([],{})),
            0 === n.segments.length && n.hasChildren())
                return Fs(n, e, t);
            const r = function fV(n, e, t) {
                let r = 0
                  , i = e;
                const o = {
                    match: !1,
                    pathIndex: 0,
                    commandIndex: 0
                };
                for (; i < n.segments.length; ) {
                    if (r >= t.length)
                        return o;
                    const s = n.segments[i]
                      , a = t[r];
                    if (xs(a))
                        break;
                    const l = `${a}`
                      , u = r < t.length - 1 ? t[r + 1] : null;
                    if (i > 0 && void 0 === l)
                        break;
                    if (l && u && "object" == typeof u && void 0 === u.outlets) {
                        if (!xD(l, u, s))
                            return o;
                        r += 2
                    } else {
                        if (!xD(l, {}, s))
                            return o;
                        r++
                    }
                    i++
                }
                return {
                    match: !0,
                    pathIndex: i,
                    commandIndex: r
                }
            }(n, e, t)
              , i = t.slice(r.commandIndex);
            if (r.match && r.pathIndex < n.segments.length) {
                const o = new X(n.segments.slice(0, r.pathIndex),{});
                return o.children[Z] = new X(n.segments.slice(r.pathIndex),n.children),
                Fs(o, 0, i)
            }
            return r.match && 0 === i.length ? new X(n.segments,{}) : r.match && !n.hasChildren() ? Sf(n, e, t) : r.match ? Fs(n, 0, i) : Sf(n, e, t)
        }
        function Fs(n, e, t) {
            if (0 === t.length)
                return new X(n.segments,{});
            {
                const r = function hV(n) {
                    return xs(n[0]) ? n[0].outlets : {
                        [Z]: n
                    }
                }(t)
                  , i = {};
                return Xe(r, (o,s)=>{
                    "string" == typeof o && (o = [o]),
                    null !== o && (i[s] = Df(n.children[s], e, o))
                }
                ),
                Xe(n.children, (o,s)=>{
                    void 0 === r[s] && (i[s] = o)
                }
                ),
                new X(n.segments,i)
            }
        }
        function Sf(n, e, t) {
            const r = n.segments.slice(0, e);
            let i = 0;
            for (; i < t.length; ) {
                const o = t[i];
                if (xs(o)) {
                    const l = pV(o.outlets);
                    return new X(r,l)
                }
                if (0 === i && Rs(t[0])) {
                    r.push(new Ns(n.segments[e].path,RD(t[0]))),
                    i++;
                    continue
                }
                const s = xs(o) ? o.outlets[Z] : `${o}`
                  , a = i < t.length - 1 ? t[i + 1] : null;
                s && a && Rs(a) ? (r.push(new Ns(s,RD(a))),
                i += 2) : (r.push(new Ns(s,{})),
                i++)
            }
            return new X(r,{})
        }
        function pV(n) {
            const e = {};
            return Xe(n, (t,r)=>{
                "string" == typeof t && (t = [t]),
                null !== t && (e[r] = Sf(new X([],{}), 0, t))
            }
            ),
            e
        }
        function RD(n) {
            const e = {};
            return Xe(n, (t,r)=>e[r] = `${t}`),
            e
        }
        function xD(n, e, t) {
            return n == t.path && An(e, t.parameters)
        }
        class Zn {
            constructor(e, t) {
                this.id = e,
                this.url = t
            }
        }
        class If extends Zn {
            constructor(e, t, r="imperative", i=null) {
                super(e, t),
                this.type = 0,
                this.navigationTrigger = r,
                this.restoredState = i
            }
            toString() {
                return `NavigationStart(id: ${this.id}, url: '${this.url}')`
            }
        }
        class Jr extends Zn {
            constructor(e, t, r) {
                super(e, t),
                this.urlAfterRedirects = r,
                this.type = 1
            }
            toString() {
                return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
            }
        }
        class Ql extends Zn {
            constructor(e, t, r, i) {
                super(e, t),
                this.reason = r,
                this.code = i,
                this.type = 2
            }
            toString() {
                return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
            }
        }
        class FD extends Zn {
            constructor(e, t, r, i) {
                super(e, t),
                this.error = r,
                this.target = i,
                this.type = 3
            }
            toString() {
                return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
            }
        }
        class mV extends Zn {
            constructor(e, t, r, i) {
                super(e, t),
                this.urlAfterRedirects = r,
                this.state = i,
                this.type = 4
            }
            toString() {
                return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class gV extends Zn {
            constructor(e, t, r, i) {
                super(e, t),
                this.urlAfterRedirects = r,
                this.state = i,
                this.type = 7
            }
            toString() {
                return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class _V extends Zn {
            constructor(e, t, r, i, o) {
                super(e, t),
                this.urlAfterRedirects = r,
                this.state = i,
                this.shouldActivate = o,
                this.type = 8
            }
            toString() {
                return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
            }
        }
        class yV extends Zn {
            constructor(e, t, r, i) {
                super(e, t),
                this.urlAfterRedirects = r,
                this.state = i,
                this.type = 5
            }
            toString() {
                return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class vV extends Zn {
            constructor(e, t, r, i) {
                super(e, t),
                this.urlAfterRedirects = r,
                this.state = i,
                this.type = 6
            }
            toString() {
                return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class EV {
            constructor(e) {
                this.route = e,
                this.type = 9
            }
            toString() {
                return `RouteConfigLoadStart(path: ${this.route.path})`
            }
        }
        class CV {
            constructor(e) {
                this.route = e,
                this.type = 10
            }
            toString() {
                return `RouteConfigLoadEnd(path: ${this.route.path})`
            }
        }
        class bV {
            constructor(e) {
                this.snapshot = e,
                this.type = 11
            }
            toString() {
                return `ChildActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class DV {
            constructor(e) {
                this.snapshot = e,
                this.type = 12
            }
            toString() {
                return `ChildActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class SV {
            constructor(e) {
                this.snapshot = e,
                this.type = 13
            }
            toString() {
                return `ActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class IV {
            constructor(e) {
                this.snapshot = e,
                this.type = 14
            }
            toString() {
                return `ActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class PD {
            constructor(e, t, r) {
                this.routerEvent = e,
                this.position = t,
                this.anchor = r,
                this.type = 15
            }
            toString() {
                return `Scroll(anchor: '${this.anchor}', position: '${this.position ? `${this.position[0]}, ${this.position[1]}` : null}')`
            }
        }
        class kD {
            constructor(e) {
                this._root = e
            }
            get root() {
                return this._root.value
            }
            parent(e) {
                const t = this.pathFromRoot(e);
                return t.length > 1 ? t[t.length - 2] : null
            }
            children(e) {
                const t = Tf(e, this._root);
                return t ? t.children.map(r=>r.value) : []
            }
            firstChild(e) {
                const t = Tf(e, this._root);
                return t && t.children.length > 0 ? t.children[0].value : null
            }
            siblings(e) {
                const t = wf(e, this._root);
                return t.length < 2 ? [] : t[t.length - 2].children.map(i=>i.value).filter(i=>i !== e)
            }
            pathFromRoot(e) {
                return wf(e, this._root).map(t=>t.value)
            }
        }
        function Tf(n, e) {
            if (n === e.value)
                return e;
            for (const t of e.children) {
                const r = Tf(n, t);
                if (r)
                    return r
            }
            return null
        }
        function wf(n, e) {
            if (n === e.value)
                return [e];
            for (const t of e.children) {
                const r = wf(n, t);
                if (r.length)
                    return r.unshift(e),
                    r
            }
            return []
        }
        class Xn {
            constructor(e, t) {
                this.value = e,
                this.children = t
            }
            toString() {
                return `TreeNode(${this.value})`
            }
        }
        function io(n) {
            const e = {};
            return n && n.children.forEach(t=>e[t.value.outlet] = t),
            e
        }
        class LD extends kD {
            constructor(e, t) {
                super(e),
                this.snapshot = t,
                Af(this, e)
            }
            toString() {
                return this.snapshot.toString()
            }
        }
        function VD(n, e) {
            const t = function wV(n, e) {
                const s = new Yl([],{},{},"",{},Z,e,null,n.root,-1,{});
                return new BD("",new Xn(s,[]))
            }(n, e)
              , r = new Yt([new Ns("",{})])
              , i = new Yt({})
              , o = new Yt({})
              , s = new Yt({})
              , a = new Yt("")
              , l = new ei(r,i,s,a,o,Z,e,t.root);
            return l.snapshot = t.root,
            new LD(new Xn(l,[]),t)
        }
        class ei {
            constructor(e, t, r, i, o, s, a, l) {
                this.url = e,
                this.params = t,
                this.queryParams = r,
                this.fragment = i,
                this.data = o,
                this.outlet = s,
                this.component = a,
                this.title = this.data?.pipe(J(u=>u[Ms])) ?? P(void 0),
                this._futureSnapshot = l
            }
            get routeConfig() {
                return this._futureSnapshot.routeConfig
            }
            get root() {
                return this._routerState.root
            }
            get parent() {
                return this._routerState.parent(this)
            }
            get firstChild() {
                return this._routerState.firstChild(this)
            }
            get children() {
                return this._routerState.children(this)
            }
            get pathFromRoot() {
                return this._routerState.pathFromRoot(this)
            }
            get paramMap() {
                return this._paramMap || (this._paramMap = this.params.pipe(J(e=>to(e)))),
                this._paramMap
            }
            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(J(e=>to(e)))),
                this._queryParamMap
            }
            toString() {
                return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
            }
        }
        function UD(n, e="emptyOnly") {
            const t = n.pathFromRoot;
            let r = 0;
            if ("always" !== e)
                for (r = t.length - 1; r >= 1; ) {
                    const i = t[r]
                      , o = t[r - 1];
                    if (i.routeConfig && "" === i.routeConfig.path)
                        r--;
                    else {
                        if (o.component)
                            break;
                        r--
                    }
                }
            return function AV(n) {
                return n.reduce((e,t)=>({
                    params: {
                        ...e.params,
                        ...t.params
                    },
                    data: {
                        ...e.data,
                        ...t.data
                    },
                    resolve: {
                        ...t.data,
                        ...e.resolve,
                        ...t.routeConfig?.data,
                        ...t._resolvedData
                    }
                }), {
                    params: {},
                    data: {},
                    resolve: {}
                })
            }(t.slice(r))
        }
        class Yl {
            constructor(e, t, r, i, o, s, a, l, u, c, d, h) {
                this.url = e,
                this.params = t,
                this.queryParams = r,
                this.fragment = i,
                this.data = o,
                this.outlet = s,
                this.component = a,
                this.title = this.data?.[Ms],
                this.routeConfig = l,
                this._urlSegment = u,
                this._lastPathIndex = c,
                this._correctedLastPathIndex = h ?? c,
                this._resolve = d
            }
            get root() {
                return this._routerState.root
            }
            get parent() {
                return this._routerState.parent(this)
            }
            get firstChild() {
                return this._routerState.firstChild(this)
            }
            get children() {
                return this._routerState.children(this)
            }
            get pathFromRoot() {
                return this._routerState.pathFromRoot(this)
            }
            get paramMap() {
                return this._paramMap || (this._paramMap = to(this.params)),
                this._paramMap
            }
            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = to(this.queryParams)),
                this._queryParamMap
            }
            toString() {
                return `Route(url:'${this.url.map(r=>r.toString()).join("/")}', path:'${this.routeConfig ? this.routeConfig.path : ""}')`
            }
        }
        class BD extends kD {
            constructor(e, t) {
                super(t),
                this.url = e,
                Af(this, t)
            }
            toString() {
                return HD(this._root)
            }
        }
        function Af(n, e) {
            e.value._routerState = n,
            e.children.forEach(t=>Af(n, t))
        }
        function HD(n) {
            const e = n.children.length > 0 ? ` { ${n.children.map(HD).join(", ")} } ` : "";
            return `${n.value}${e}`
        }
        function Mf(n) {
            if (n.snapshot) {
                const e = n.snapshot
                  , t = n._futureSnapshot;
                n.snapshot = t,
                An(e.queryParams, t.queryParams) || n.queryParams.next(t.queryParams),
                e.fragment !== t.fragment && n.fragment.next(t.fragment),
                An(e.params, t.params) || n.params.next(t.params),
                function GL(n, e) {
                    if (n.length !== e.length)
                        return !1;
                    for (let t = 0; t < n.length; ++t)
                        if (!An(n[t], e[t]))
                            return !1;
                    return !0
                }(e.url, t.url) || n.url.next(t.url),
                An(e.data, t.data) || n.data.next(t.data)
            } else
                n.snapshot = n._futureSnapshot,
                n.data.next(n._futureSnapshot.data)
        }
        function Nf(n, e) {
            const t = An(n.params, e.params) && function KL(n, e) {
                return Zr(n, e) && n.every((t,r)=>An(t.parameters, e[r].parameters))
            }(n.url, e.url);
            return t && !(!n.parent != !e.parent) && (!n.parent || Nf(n.parent, e.parent))
        }
        function Ps(n, e, t) {
            if (t && n.shouldReuseRoute(e.value, t.value.snapshot)) {
                const r = t.value;
                r._futureSnapshot = e.value;
                const i = function NV(n, e, t) {
                    return e.children.map(r=>{
                        for (const i of t.children)
                            if (n.shouldReuseRoute(r.value, i.value.snapshot))
                                return Ps(n, r, i);
                        return Ps(n, r)
                    }
                    )
                }(n, e, t);
                return new Xn(r,i)
            }
            {
                if (n.shouldAttach(e.value)) {
                    const o = n.retrieve(e.value);
                    if (null !== o) {
                        const s = o.route;
                        return s.value._futureSnapshot = e.value,
                        s.children = e.children.map(a=>Ps(n, a)),
                        s
                    }
                }
                const r = function OV(n) {
                    return new ei(new Yt(n.url),new Yt(n.params),new Yt(n.queryParams),new Yt(n.fragment),new Yt(n.data),n.outlet,n.component,n)
                }(e.value)
                  , i = e.children.map(o=>Ps(n, o));
                return new Xn(r,i)
            }
        }
        const Of = "ngNavigationCancelingError";
        function jD(n, e) {
            const {redirectTo: t, navigationBehaviorOptions: r} = Xr(e) ? {
                redirectTo: e,
                navigationBehaviorOptions: void 0
            } : e
              , i = GD(!1, 0, e);
            return i.url = t,
            i.navigationBehaviorOptions = r,
            i
        }
        function GD(n, e, t) {
            const r = new Error("NavigationCancelingError: " + (n || ""));
            return r[Of] = !0,
            r.cancellationCode = e,
            t && (r.url = t),
            r
        }
        function $D(n) {
            return zD(n) && Xr(n.url)
        }
        function zD(n) {
            return n && n[Of]
        }
        class RV {
            constructor() {
                this.outlet = null,
                this.route = null,
                this.resolver = null,
                this.injector = null,
                this.children = new ks,
                this.attachRef = null
            }
        }
        let ks = (()=>{
            class n {
                constructor() {
                    this.contexts = new Map
                }
                onChildOutletCreated(t, r) {
                    const i = this.getOrCreateContext(t);
                    i.outlet = r,
                    this.contexts.set(t, i)
                }
                onChildOutletDestroyed(t) {
                    const r = this.getContext(t);
                    r && (r.outlet = null,
                    r.attachRef = null)
                }
                onOutletDeactivated() {
                    const t = this.contexts;
                    return this.contexts = new Map,
                    t
                }
                onOutletReAttached(t) {
                    this.contexts = t
                }
                getOrCreateContext(t) {
                    let r = this.getContext(t);
                    return r || (r = new RV,
                    this.contexts.set(t, r)),
                    r
                }
                getContext(t) {
                    return this.contexts.get(t) || null
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        const Zl = !1;
        let Rf = (()=>{
            class n {
                constructor(t, r, i, o, s) {
                    this.parentContexts = t,
                    this.location = r,
                    this.changeDetector = o,
                    this.environmentInjector = s,
                    this.activated = null,
                    this._activatedRoute = null,
                    this.activateEvents = new de,
                    this.deactivateEvents = new de,
                    this.attachEvents = new de,
                    this.detachEvents = new de,
                    this.name = i || Z,
                    t.onChildOutletCreated(this.name, this)
                }
                ngOnDestroy() {
                    this.parentContexts.getContext(this.name)?.outlet === this && this.parentContexts.onChildOutletDestroyed(this.name)
                }
                ngOnInit() {
                    if (!this.activated) {
                        const t = this.parentContexts.getContext(this.name);
                        t && t.route && (t.attachRef ? this.attach(t.attachRef, t.route) : this.activateWith(t.route, t.injector))
                    }
                }
                get isActivated() {
                    return !!this.activated
                }
                get component() {
                    if (!this.activated)
                        throw new b(4012,Zl);
                    return this.activated.instance
                }
                get activatedRoute() {
                    if (!this.activated)
                        throw new b(4012,Zl);
                    return this._activatedRoute
                }
                get activatedRouteData() {
                    return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
                }
                detach() {
                    if (!this.activated)
                        throw new b(4012,Zl);
                    this.location.detach();
                    const t = this.activated;
                    return this.activated = null,
                    this._activatedRoute = null,
                    this.detachEvents.emit(t.instance),
                    t
                }
                attach(t, r) {
                    this.activated = t,
                    this._activatedRoute = r,
                    this.location.insert(t.hostView),
                    this.attachEvents.emit(t.instance)
                }
                deactivate() {
                    if (this.activated) {
                        const t = this.component;
                        this.activated.destroy(),
                        this.activated = null,
                        this._activatedRoute = null,
                        this.deactivateEvents.emit(t)
                    }
                }
                activateWith(t, r) {
                    if (this.isActivated)
                        throw new b(4013,Zl);
                    this._activatedRoute = t;
                    const i = this.location
                      , s = t._futureSnapshot.component
                      , a = this.parentContexts.getOrCreateContext(this.name).children
                      , l = new xV(t,a,i.injector);
                    if (r && function FV(n) {
                        return !!n.resolveComponentFactory
                    }(r)) {
                        const u = r.resolveComponentFactory(s);
                        this.activated = i.createComponent(u, i.length, l)
                    } else
                        this.activated = i.createComponent(s, {
                            index: i.length,
                            injector: l,
                            environmentInjector: r ?? this.environmentInjector
                        });
                    this.changeDetector.markForCheck(),
                    this.activateEvents.emit(this.activated.instance)
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(E(ks),E(hn),yi("name"),E(Qi),E(ar))
            }
            ,
            n.\u0275dir = x({
                type: n,
                selectors: [["router-outlet"]],
                outputs: {
                    activateEvents: "activate",
                    deactivateEvents: "deactivate",
                    attachEvents: "attach",
                    detachEvents: "detach"
                },
                exportAs: ["outlet"],
                standalone: !0
            }),
            n
        }
        )();
        class xV {
            constructor(e, t, r) {
                this.route = e,
                this.childContexts = t,
                this.parent = r
            }
            get(e, t) {
                return e === ei ? this.route : e === ks ? this.childContexts : this.parent.get(e, t)
            }
        }
        let xf = (()=>{
            class n {
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275cmp = li({
                type: n,
                selectors: [["ng-component"]],
                standalone: !0,
                features: [hv],
                decls: 1,
                vars: 0,
                template: function(t, r) {
                    1 & t && Qo(0, "router-outlet")
                },
                dependencies: [Rf],
                encapsulation: 2
            }),
            n
        }
        )();
        function WD(n, e) {
            return n.providers && !n._injector && (n._injector = Za(n.providers, e, `Route: ${n.path}`)),
            n._injector ?? e
        }
        function Pf(n) {
            const e = n.children && n.children.map(Pf)
              , t = e ? {
                ...n,
                children: e
            } : {
                ...n
            };
            return !t.component && !t.loadComponent && (e || t.loadChildren) && t.outlet && t.outlet !== Z && (t.component = xf),
            t
        }
        function Xt(n) {
            return n.outlet || Z
        }
        function qD(n, e) {
            const t = n.filter(r=>Xt(r) === e);
            return t.push(...n.filter(r=>Xt(r) !== e)),
            t
        }
        function Ls(n) {
            if (!n)
                return null;
            if (n.routeConfig?._injector)
                return n.routeConfig._injector;
            for (let e = n.parent; e; e = e.parent) {
                const t = e.routeConfig;
                if (t?._loadedInjector)
                    return t._loadedInjector;
                if (t?._injector)
                    return t._injector
            }
            return null
        }
        class UV {
            constructor(e, t, r, i) {
                this.routeReuseStrategy = e,
                this.futureState = t,
                this.currState = r,
                this.forwardEvent = i
            }
            activate(e) {
                const t = this.futureState._root
                  , r = this.currState ? this.currState._root : null;
                this.deactivateChildRoutes(t, r, e),
                Mf(this.futureState.root),
                this.activateChildRoutes(t, r, e)
            }
            deactivateChildRoutes(e, t, r) {
                const i = io(t);
                e.children.forEach(o=>{
                    const s = o.value.outlet;
                    this.deactivateRoutes(o, i[s], r),
                    delete i[s]
                }
                ),
                Xe(i, (o,s)=>{
                    this.deactivateRouteAndItsChildren(o, r)
                }
                )
            }
            deactivateRoutes(e, t, r) {
                const i = e.value
                  , o = t ? t.value : null;
                if (i === o)
                    if (i.component) {
                        const s = r.getContext(i.outlet);
                        s && this.deactivateChildRoutes(e, t, s.children)
                    } else
                        this.deactivateChildRoutes(e, t, r);
                else
                    o && this.deactivateRouteAndItsChildren(t, r)
            }
            deactivateRouteAndItsChildren(e, t) {
                e.value.component && this.routeReuseStrategy.shouldDetach(e.value.snapshot) ? this.detachAndStoreRouteSubtree(e, t) : this.deactivateRouteAndOutlet(e, t)
            }
            detachAndStoreRouteSubtree(e, t) {
                const r = t.getContext(e.value.outlet)
                  , i = r && e.value.component ? r.children : t
                  , o = io(e);
                for (const s of Object.keys(o))
                    this.deactivateRouteAndItsChildren(o[s], i);
                if (r && r.outlet) {
                    const s = r.outlet.detach()
                      , a = r.children.onOutletDeactivated();
                    this.routeReuseStrategy.store(e.value.snapshot, {
                        componentRef: s,
                        route: e,
                        contexts: a
                    })
                }
            }
            deactivateRouteAndOutlet(e, t) {
                const r = t.getContext(e.value.outlet)
                  , i = r && e.value.component ? r.children : t
                  , o = io(e);
                for (const s of Object.keys(o))
                    this.deactivateRouteAndItsChildren(o[s], i);
                r && r.outlet && (r.outlet.deactivate(),
                r.children.onOutletDeactivated(),
                r.attachRef = null,
                r.resolver = null,
                r.route = null)
            }
            activateChildRoutes(e, t, r) {
                const i = io(t);
                e.children.forEach(o=>{
                    this.activateRoutes(o, i[o.value.outlet], r),
                    this.forwardEvent(new IV(o.value.snapshot))
                }
                ),
                e.children.length && this.forwardEvent(new DV(e.value.snapshot))
            }
            activateRoutes(e, t, r) {
                const i = e.value
                  , o = t ? t.value : null;
                if (Mf(i),
                i === o)
                    if (i.component) {
                        const s = r.getOrCreateContext(i.outlet);
                        this.activateChildRoutes(e, t, s.children)
                    } else
                        this.activateChildRoutes(e, t, r);
                else if (i.component) {
                    const s = r.getOrCreateContext(i.outlet);
                    if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
                        const a = this.routeReuseStrategy.retrieve(i.snapshot);
                        this.routeReuseStrategy.store(i.snapshot, null),
                        s.children.onOutletReAttached(a.contexts),
                        s.attachRef = a.componentRef,
                        s.route = a.route.value,
                        s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                        Mf(a.route.value),
                        this.activateChildRoutes(e, null, s.children)
                    } else {
                        const a = Ls(i.snapshot)
                          , l = a?.get(Bo) ?? null;
                        s.attachRef = null,
                        s.route = i,
                        s.resolver = l,
                        s.injector = a,
                        s.outlet && s.outlet.activateWith(i, s.injector),
                        this.activateChildRoutes(e, null, s.children)
                    }
                } else
                    this.activateChildRoutes(e, null, r)
            }
        }
        class KD {
            constructor(e) {
                this.path = e,
                this.route = this.path[this.path.length - 1]
            }
        }
        class Xl {
            constructor(e, t) {
                this.component = e,
                this.route = t
            }
        }
        function BV(n, e, t) {
            const r = n._root;
            return Vs(r, e ? e._root : null, t, [r.value])
        }
        function oo(n, e) {
            const t = Symbol()
              , r = e.get(n, t);
            return r === t ? "function" != typeof n || function KI(n) {
                return null !== Xs(n)
            }(n) ? e.get(n) : n : r
        }
        function Vs(n, e, t, r, i={
            canDeactivateChecks: [],
            canActivateChecks: []
        }) {
            const o = io(e);
            return n.children.forEach(s=>{
                (function jV(n, e, t, r, i={
                    canDeactivateChecks: [],
                    canActivateChecks: []
                }) {
                    const o = n.value
                      , s = e ? e.value : null
                      , a = t ? t.getContext(n.value.outlet) : null;
                    if (s && o.routeConfig === s.routeConfig) {
                        const l = function GV(n, e, t) {
                            if ("function" == typeof t)
                                return t(n, e);
                            switch (t) {
                            case "pathParamsChange":
                                return !Zr(n.url, e.url);
                            case "pathParamsOrQueryParamsChange":
                                return !Zr(n.url, e.url) || !An(n.queryParams, e.queryParams);
                            case "always":
                                return !0;
                            case "paramsOrQueryParamsChange":
                                return !Nf(n, e) || !An(n.queryParams, e.queryParams);
                            default:
                                return !Nf(n, e)
                            }
                        }(s, o, o.routeConfig.runGuardsAndResolvers);
                        l ? i.canActivateChecks.push(new KD(r)) : (o.data = s.data,
                        o._resolvedData = s._resolvedData),
                        Vs(n, e, o.component ? a ? a.children : null : t, r, i),
                        l && a && a.outlet && a.outlet.isActivated && i.canDeactivateChecks.push(new Xl(a.outlet.component,s))
                    } else
                        s && Us(e, a, i),
                        i.canActivateChecks.push(new KD(r)),
                        Vs(n, null, o.component ? a ? a.children : null : t, r, i)
                }
                )(s, o[s.value.outlet], t, r.concat([s.value]), i),
                delete o[s.value.outlet]
            }
            ),
            Xe(o, (s,a)=>Us(s, t.getContext(a), i)),
            i
        }
        function Us(n, e, t) {
            const r = io(n)
              , i = n.value;
            Xe(r, (o,s)=>{
                Us(o, i.component ? e ? e.children.getContext(s) : null : e, t)
            }
            ),
            t.canDeactivateChecks.push(new Xl(i.component && e && e.outlet && e.outlet.isActivated ? e.outlet.component : null,i))
        }
        function Bs(n) {
            return "function" == typeof n
        }
        function kf(n) {
            return n instanceof Hl || "EmptyError" === n?.name
        }
        const Jl = Symbol("INITIAL_VALUE");
        function so() {
            return wn(n=>$h(n.map(e=>e.pipe(Wr(1), zh(Jl)))).pipe(J(e=>{
                for (const t of e)
                    if (!0 !== t) {
                        if (t === Jl)
                            return Jl;
                        if (!1 === t || t instanceof Yr)
                            return t
                    }
                return !0
            }
            ), In(e=>e !== Jl), Wr(1)))
        }
        function QD(n) {
            return function pI(...n) {
                return Dp(n)
            }(Ze(e=>{
                if (Xr(e))
                    throw jD(0, e)
            }
            ), J(e=>!0 === e))
        }
        const Lf = {
            matched: !1,
            consumedSegments: [],
            remainingSegments: [],
            parameters: {},
            positionalParamSegments: {}
        };
        function YD(n, e, t, r, i) {
            const o = Vf(n, e, t);
            return o.matched ? function sU(n, e, t, r) {
                const i = e.canMatch;
                return i && 0 !== i.length ? P(i.map(s=>{
                    const a = oo(s, n);
                    return Er(function QV(n) {
                        return n && Bs(n.canMatch)
                    }(a) ? a.canMatch(e, t) : n.runInContext(()=>a(e, t)))
                }
                )).pipe(so(), QD()) : P(!0)
            }(r = WD(e, r), e, t).pipe(J(s=>!0 === s ? o : {
                ...Lf
            })) : P(o)
        }
        function Vf(n, e, t) {
            if ("" === e.path)
                return "full" === e.pathMatch && (n.hasChildren() || t.length > 0) ? {
                    ...Lf
                } : {
                    matched: !0,
                    consumedSegments: [],
                    remainingSegments: t,
                    parameters: {},
                    positionalParamSegments: {}
                };
            const i = (e.matcher || jL)(t, n, e);
            if (!i)
                return {
                    ...Lf
                };
            const o = {};
            Xe(i.posParams, (a,l)=>{
                o[l] = a.path
            }
            );
            const s = i.consumed.length > 0 ? {
                ...o,
                ...i.consumed[i.consumed.length - 1].parameters
            } : o;
            return {
                matched: !0,
                consumedSegments: i.consumed,
                remainingSegments: t.slice(i.consumed.length),
                parameters: s,
                positionalParamSegments: i.posParams ?? {}
            }
        }
        function eu(n, e, t, r, i="corrected") {
            if (t.length > 0 && function uU(n, e, t) {
                return t.some(r=>tu(n, e, r) && Xt(r) !== Z)
            }(n, t, r)) {
                const s = new X(e,function lU(n, e, t, r) {
                    const i = {};
                    i[Z] = r,
                    r._sourceSegment = n,
                    r._segmentIndexShift = e.length;
                    for (const o of t)
                        if ("" === o.path && Xt(o) !== Z) {
                            const s = new X([],{});
                            s._sourceSegment = n,
                            s._segmentIndexShift = e.length,
                            i[Xt(o)] = s
                        }
                    return i
                }(n, e, r, new X(t,n.children)));
                return s._sourceSegment = n,
                s._segmentIndexShift = e.length,
                {
                    segmentGroup: s,
                    slicedSegments: []
                }
            }
            if (0 === t.length && function cU(n, e, t) {
                return t.some(r=>tu(n, e, r))
            }(n, t, r)) {
                const s = new X(n.segments,function aU(n, e, t, r, i, o) {
                    const s = {};
                    for (const a of r)
                        if (tu(n, t, a) && !i[Xt(a)]) {
                            const l = new X([],{});
                            l._sourceSegment = n,
                            l._segmentIndexShift = "legacy" === o ? n.segments.length : e.length,
                            s[Xt(a)] = l
                        }
                    return {
                        ...i,
                        ...s
                    }
                }(n, e, t, r, n.children, i));
                return s._sourceSegment = n,
                s._segmentIndexShift = e.length,
                {
                    segmentGroup: s,
                    slicedSegments: t
                }
            }
            const o = new X(n.segments,n.children);
            return o._sourceSegment = n,
            o._segmentIndexShift = e.length,
            {
                segmentGroup: o,
                slicedSegments: t
            }
        }
        function tu(n, e, t) {
            return (!(n.hasChildren() || e.length > 0) || "full" !== t.pathMatch) && "" === t.path
        }
        function ZD(n, e, t, r) {
            return !!(Xt(n) === r || r !== Z && tu(e, t, n)) && ("**" === n.path || Vf(e, n, t).matched)
        }
        function XD(n, e, t) {
            return 0 === e.length && !n.children[t]
        }
        const nu = !1;
        class ru {
            constructor(e) {
                this.segmentGroup = e || null
            }
        }
        class JD {
            constructor(e) {
                this.urlTree = e
            }
        }
        function Hs(n) {
            return As(new ru(n))
        }
        function eS(n) {
            return As(new JD(n))
        }
        class pU {
            constructor(e, t, r, i, o) {
                this.injector = e,
                this.configLoader = t,
                this.urlSerializer = r,
                this.urlTree = i,
                this.config = o,
                this.allowRedirects = !0
            }
            apply() {
                const e = eu(this.urlTree.root, [], [], this.config).segmentGroup
                  , t = new X(e.segments,e.children);
                return this.expandSegmentGroup(this.injector, this.config, t, Z).pipe(J(o=>this.createUrlTree(Kl(o), this.urlTree.queryParams, this.urlTree.fragment))).pipe(vr(o=>{
                    if (o instanceof JD)
                        return this.allowRedirects = !1,
                        this.match(o.urlTree);
                    throw o instanceof ru ? this.noMatchError(o) : o
                }
                ))
            }
            match(e) {
                return this.expandSegmentGroup(this.injector, this.config, e.root, Z).pipe(J(i=>this.createUrlTree(Kl(i), e.queryParams, e.fragment))).pipe(vr(i=>{
                    throw i instanceof ru ? this.noMatchError(i) : i
                }
                ))
            }
            noMatchError(e) {
                return new b(4002,nu)
            }
            createUrlTree(e, t, r) {
                const i = Cf(e);
                return new Yr(i,t,r)
            }
            expandSegmentGroup(e, t, r, i) {
                return 0 === r.segments.length && r.hasChildren() ? this.expandChildren(e, t, r).pipe(J(o=>new X([],o))) : this.expandSegment(e, r, t, r.segments, i, !0)
            }
            expandChildren(e, t, r) {
                const i = [];
                for (const o of Object.keys(r.children))
                    "primary" === o ? i.unshift(o) : i.push(o);
                return Le(i).pipe(Qr(o=>{
                    const s = r.children[o]
                      , a = qD(t, o);
                    return this.expandSegmentGroup(e, a, s, o).pipe(J(l=>({
                        segment: l,
                        outlet: o
                    })))
                }
                ), pD((o,s)=>(o[s.outlet] = s.segment,
                o), {}), mD())
            }
            expandSegment(e, t, r, i, o, s) {
                return Le(r).pipe(Qr(a=>this.expandSegmentAgainstRoute(e, t, r, a, i, o, s).pipe(vr(u=>{
                    if (u instanceof ru)
                        return P(null);
                    throw u
                }
                ))), yr(a=>!!a), vr((a,l)=>{
                    if (kf(a))
                        return XD(t, i, o) ? P(new X([],{})) : Hs(t);
                    throw a
                }
                ))
            }
            expandSegmentAgainstRoute(e, t, r, i, o, s, a) {
                return ZD(i, t, o, s) ? void 0 === i.redirectTo ? this.matchSegmentAgainstRoute(e, t, i, o, s) : a && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(e, t, r, i, o, s) : Hs(t) : Hs(t)
            }
            expandSegmentAgainstRouteUsingRedirect(e, t, r, i, o, s) {
                return "**" === i.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(e, r, i, s) : this.expandRegularSegmentAgainstRouteUsingRedirect(e, t, r, i, o, s)
            }
            expandWildCardWithParamsAgainstRouteUsingRedirect(e, t, r, i) {
                const o = this.applyRedirectCommands([], r.redirectTo, {});
                return r.redirectTo.startsWith("/") ? eS(o) : this.lineralizeSegments(r, o).pipe(Qe(s=>{
                    const a = new X(s,{});
                    return this.expandSegment(e, a, t, s, i, !1)
                }
                ))
            }
            expandRegularSegmentAgainstRouteUsingRedirect(e, t, r, i, o, s) {
                const {matched: a, consumedSegments: l, remainingSegments: u, positionalParamSegments: c} = Vf(t, i, o);
                if (!a)
                    return Hs(t);
                const d = this.applyRedirectCommands(l, i.redirectTo, c);
                return i.redirectTo.startsWith("/") ? eS(d) : this.lineralizeSegments(i, d).pipe(Qe(h=>this.expandSegment(e, t, r, h.concat(u), s, !1)))
            }
            matchSegmentAgainstRoute(e, t, r, i, o) {
                return "**" === r.path ? (e = WD(r, e),
                r.loadChildren ? (r._loadedRoutes ? P({
                    routes: r._loadedRoutes,
                    injector: r._loadedInjector
                }) : this.configLoader.loadChildren(e, r)).pipe(J(a=>(r._loadedRoutes = a.routes,
                r._loadedInjector = a.injector,
                new X(i,{})))) : P(new X(i,{}))) : YD(t, r, i, e).pipe(wn(({matched: s, consumedSegments: a, remainingSegments: l})=>s ? this.getChildConfig(e = r._injector ?? e, r, i).pipe(Qe(c=>{
                    const d = c.injector ?? e
                      , h = c.routes
                      , {segmentGroup: f, slicedSegments: p} = eu(t, a, l, h)
                      , g = new X(f.segments,f.children);
                    if (0 === p.length && g.hasChildren())
                        return this.expandChildren(d, h, g).pipe(J(v=>new X(a,v)));
                    if (0 === h.length && 0 === p.length)
                        return P(new X(a,{}));
                    const y = Xt(r) === o;
                    return this.expandSegment(d, g, h, p, y ? Z : o, !0).pipe(J(S=>new X(a.concat(S.segments),S.children)))
                }
                )) : Hs(t)))
            }
            getChildConfig(e, t, r) {
                return t.children ? P({
                    routes: t.children,
                    injector: e
                }) : t.loadChildren ? void 0 !== t._loadedRoutes ? P({
                    routes: t._loadedRoutes,
                    injector: t._loadedInjector
                }) : function oU(n, e, t, r) {
                    const i = e.canLoad;
                    return void 0 === i || 0 === i.length ? P(!0) : P(i.map(s=>{
                        const a = oo(s, n);
                        return Er(function zV(n) {
                            return n && Bs(n.canLoad)
                        }(a) ? a.canLoad(e, t) : n.runInContext(()=>a(e, t)))
                    }
                    )).pipe(so(), QD())
                }(e, t, r).pipe(Qe(i=>i ? this.configLoader.loadChildren(e, t).pipe(Ze(o=>{
                    t._loadedRoutes = o.routes,
                    t._loadedInjector = o.injector
                }
                )) : function hU(n) {
                    return As(GD(nu, 3))
                }())) : P({
                    routes: [],
                    injector: e
                })
            }
            lineralizeSegments(e, t) {
                let r = []
                  , i = t.root;
                for (; ; ) {
                    if (r = r.concat(i.segments),
                    0 === i.numberOfChildren)
                        return P(r);
                    if (i.numberOfChildren > 1 || !i.children[Z])
                        return As(new b(4e3,nu));
                    i = i.children[Z]
                }
            }
            applyRedirectCommands(e, t, r) {
                return this.applyRedirectCreateUrlTree(t, this.urlSerializer.parse(t), e, r)
            }
            applyRedirectCreateUrlTree(e, t, r, i) {
                const o = this.createSegmentGroup(e, t.root, r, i);
                return new Yr(o,this.createQueryParams(t.queryParams, this.urlTree.queryParams),t.fragment)
            }
            createQueryParams(e, t) {
                const r = {};
                return Xe(e, (i,o)=>{
                    if ("string" == typeof i && i.startsWith(":")) {
                        const a = i.substring(1);
                        r[o] = t[a]
                    } else
                        r[o] = i
                }
                ),
                r
            }
            createSegmentGroup(e, t, r, i) {
                const o = this.createSegments(e, t.segments, r, i);
                let s = {};
                return Xe(t.children, (a,l)=>{
                    s[l] = this.createSegmentGroup(e, a, r, i)
                }
                ),
                new X(o,s)
            }
            createSegments(e, t, r, i) {
                return t.map(o=>o.path.startsWith(":") ? this.findPosParam(e, o, i) : this.findOrReturn(o, r))
            }
            findPosParam(e, t, r) {
                const i = r[t.path.substring(1)];
                if (!i)
                    throw new b(4001,nu);
                return i
            }
            findOrReturn(e, t) {
                let r = 0;
                for (const i of t) {
                    if (i.path === e.path)
                        return t.splice(r),
                        i;
                    r++
                }
                return e
            }
        }
        class gU {
        }
        class vU {
            constructor(e, t, r, i, o, s, a, l) {
                this.injector = e,
                this.rootComponentType = t,
                this.config = r,
                this.urlTree = i,
                this.url = o,
                this.paramsInheritanceStrategy = s,
                this.relativeLinkResolution = a,
                this.urlSerializer = l
            }
            recognize() {
                const e = eu(this.urlTree.root, [], [], this.config.filter(t=>void 0 === t.redirectTo), this.relativeLinkResolution).segmentGroup;
                return this.processSegmentGroup(this.injector, this.config, e, Z).pipe(J(t=>{
                    if (null === t)
                        return null;
                    const r = new Yl([],Object.freeze({}),Object.freeze({
                        ...this.urlTree.queryParams
                    }),this.urlTree.fragment,{},Z,this.rootComponentType,null,this.urlTree.root,-1,{})
                      , i = new Xn(r,t)
                      , o = new BD(this.url,i);
                    return this.inheritParamsAndData(o._root),
                    o
                }
                ))
            }
            inheritParamsAndData(e) {
                const t = e.value
                  , r = UD(t, this.paramsInheritanceStrategy);
                t.params = Object.freeze(r.params),
                t.data = Object.freeze(r.data),
                e.children.forEach(i=>this.inheritParamsAndData(i))
            }
            processSegmentGroup(e, t, r, i) {
                return 0 === r.segments.length && r.hasChildren() ? this.processChildren(e, t, r) : this.processSegment(e, t, r, r.segments, i)
            }
            processChildren(e, t, r) {
                return Le(Object.keys(r.children)).pipe(Qr(i=>{
                    const o = r.children[i]
                      , s = qD(t, i);
                    return this.processSegmentGroup(e, s, o, i)
                }
                ), pD((i,o)=>i && o ? (i.push(...o),
                i) : null), function UL(n, e=!1) {
                    return Pe((t,r)=>{
                        let i = 0;
                        t.subscribe(we(r, o=>{
                            const s = n(o, i++);
                            (s || e) && r.next(o),
                            !s && r.complete()
                        }
                        ))
                    }
                    )
                }(i=>null !== i), jl(null), mD(), J(i=>{
                    if (null === i)
                        return null;
                    const o = tS(i);
                    return function EU(n) {
                        n.sort((e,t)=>e.value.outlet === Z ? -1 : t.value.outlet === Z ? 1 : e.value.outlet.localeCompare(t.value.outlet))
                    }(o),
                    o
                }
                ))
            }
            processSegment(e, t, r, i, o) {
                return Le(t).pipe(Qr(s=>this.processSegmentAgainstRoute(s._injector ?? e, s, r, i, o)), yr(s=>!!s), vr(s=>{
                    if (kf(s))
                        return XD(r, i, o) ? P([]) : P(null);
                    throw s
                }
                ))
            }
            processSegmentAgainstRoute(e, t, r, i, o) {
                if (t.redirectTo || !ZD(t, r, i, o))
                    return P(null);
                let s;
                if ("**" === t.path) {
                    const a = i.length > 0 ? yD(i).parameters : {}
                      , l = rS(r) + i.length;
                    s = P({
                        snapshot: new Yl(i,a,Object.freeze({
                            ...this.urlTree.queryParams
                        }),this.urlTree.fragment,oS(t),Xt(t),t.component ?? t._loadedComponent ?? null,t,nS(r),l,sS(t),l),
                        consumedSegments: [],
                        remainingSegments: []
                    })
                } else
                    s = YD(r, t, i, e).pipe(J(({matched: a, consumedSegments: l, remainingSegments: u, parameters: c})=>{
                        if (!a)
                            return null;
                        const d = rS(r) + l.length;
                        return {
                            snapshot: new Yl(l,c,Object.freeze({
                                ...this.urlTree.queryParams
                            }),this.urlTree.fragment,oS(t),Xt(t),t.component ?? t._loadedComponent ?? null,t,nS(r),d,sS(t),d),
                            consumedSegments: l,
                            remainingSegments: u
                        }
                    }
                    ));
                return s.pipe(wn(a=>{
                    if (null === a)
                        return P(null);
                    const {snapshot: l, consumedSegments: u, remainingSegments: c} = a;
                    e = t._injector ?? e;
                    const d = t._loadedInjector ?? e
                      , h = function CU(n) {
                        return n.children ? n.children : n.loadChildren ? n._loadedRoutes : []
                    }(t)
                      , {segmentGroup: f, slicedSegments: p} = eu(r, u, c, h.filter(y=>void 0 === y.redirectTo), this.relativeLinkResolution);
                    if (0 === p.length && f.hasChildren())
                        return this.processChildren(d, h, f).pipe(J(y=>null === y ? null : [new Xn(l,y)]));
                    if (0 === h.length && 0 === p.length)
                        return P([new Xn(l,[])]);
                    const g = Xt(t) === o;
                    return this.processSegment(d, h, f, p, g ? Z : o).pipe(J(y=>null === y ? null : [new Xn(l,y)]))
                }
                ))
            }
        }
        function bU(n) {
            const e = n.value.routeConfig;
            return e && "" === e.path && void 0 === e.redirectTo
        }
        function tS(n) {
            const e = []
              , t = new Set;
            for (const r of n) {
                if (!bU(r)) {
                    e.push(r);
                    continue
                }
                const i = e.find(o=>r.value.routeConfig === o.value.routeConfig);
                void 0 !== i ? (i.children.push(...r.children),
                t.add(i)) : e.push(r)
            }
            for (const r of t) {
                const i = tS(r.children);
                e.push(new Xn(r.value,i))
            }
            return e.filter(r=>!t.has(r))
        }
        function nS(n) {
            let e = n;
            for (; e._sourceSegment; )
                e = e._sourceSegment;
            return e
        }
        function rS(n) {
            let e = n
              , t = e._segmentIndexShift ?? 0;
            for (; e._sourceSegment; )
                e = e._sourceSegment,
                t += e._segmentIndexShift ?? 0;
            return t - 1
        }
        function oS(n) {
            return n.data || {}
        }
        function sS(n) {
            return n.resolve || {}
        }
        function aS(n) {
            return "string" == typeof n.title || null === n.title
        }
        function Uf(n) {
            return wn(e=>{
                const t = n(e);
                return t ? Le(t).pipe(J(()=>e)) : P(e)
            }
            )
        }
        let lS = (()=>{
            class n {
                buildTitle(t) {
                    let r, i = t.root;
                    for (; void 0 !== i; )
                        r = this.getResolvedTitleForRoute(i) ?? r,
                        i = i.children.find(o=>o.outlet === Z);
                    return r
                }
                getResolvedTitleForRoute(t) {
                    return t.data[Ms]
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: function() {
                    return be(uS)
                },
                providedIn: "root"
            }),
            n
        }
        )()
          , uS = (()=>{
            class n extends lS {
                constructor(t) {
                    super(),
                    this.title = t
                }
                updateTitle(t) {
                    const r = this.buildTitle(t);
                    void 0 !== r && this.title.setTitle(r)
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(mC))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        class NU {
        }
        class RU extends class OU {
            shouldDetach(e) {
                return !1
            }
            store(e, t) {}
            shouldAttach(e) {
                return !1
            }
            retrieve(e) {
                return null
            }
            shouldReuseRoute(e, t) {
                return e.routeConfig === t.routeConfig
            }
        }
        {
        }
        const ou = new A("",{
            providedIn: "root",
            factory: ()=>({})
        })
          , Bf = new A("ROUTES");
        let Hf = (()=>{
            class n {
                constructor(t, r) {
                    this.injector = t,
                    this.compiler = r,
                    this.componentLoaders = new WeakMap,
                    this.childrenLoaders = new WeakMap
                }
                loadComponent(t) {
                    if (this.componentLoaders.get(t))
                        return this.componentLoaders.get(t);
                    if (t._loadedComponent)
                        return P(t._loadedComponent);
                    this.onLoadStartListener && this.onLoadStartListener(t);
                    const r = Er(t.loadComponent()).pipe(Ze(o=>{
                        this.onLoadEndListener && this.onLoadEndListener(t),
                        t._loadedComponent = o
                    }
                    ), _f(()=>{
                        this.componentLoaders.delete(t)
                    }
                    ))
                      , i = new hD(r,()=>new Fe).pipe(mf());
                    return this.componentLoaders.set(t, i),
                    i
                }
                loadChildren(t, r) {
                    if (this.childrenLoaders.get(r))
                        return this.childrenLoaders.get(r);
                    if (r._loadedRoutes)
                        return P({
                            routes: r._loadedRoutes,
                            injector: r._loadedInjector
                        });
                    this.onLoadStartListener && this.onLoadStartListener(r);
                    const o = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(J(a=>{
                        this.onLoadEndListener && this.onLoadEndListener(r);
                        let l, u, c = !1;
                        Array.isArray(a) ? u = a : (l = a.create(t).injector,
                        u = _D(l.get(Bf, [], U.Self | U.Optional)));
                        return {
                            routes: u.map(Pf),
                            injector: l
                        }
                    }
                    ), _f(()=>{
                        this.childrenLoaders.delete(r)
                    }
                    ))
                      , s = new hD(o,()=>new Fe).pipe(mf());
                    return this.childrenLoaders.set(r, s),
                    s
                }
                loadModuleFactoryOrRoutes(t) {
                    return Er(t()).pipe(Qe(r=>r instanceof cv || Array.isArray(r) ? P(r) : Le(this.compiler.compileModuleAsync(r))))
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Wt),T(nh))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        class FU {
        }
        class PU {
            shouldProcessUrl(e) {
                return !0
            }
            extract(e) {
                return e
            }
            merge(e, t) {
                return e
            }
        }
        function kU(n) {
            throw n
        }
        function LU(n, e, t) {
            return e.parse("/")
        }
        const VU = {
            paths: "exact",
            fragment: "ignored",
            matrixParams: "ignored",
            queryParams: "exact"
        }
          , UU = {
            paths: "subset",
            fragment: "ignored",
            matrixParams: "ignored",
            queryParams: "subset"
        };
        function dS() {
            const n = be(SD)
              , e = be(ks)
              , t = be(_h)
              , r = be(Wt)
              , i = be(nh)
              , o = be(Bf, {
                optional: !0
            }) ?? []
              , s = be(ou, {
                optional: !0
            }) ?? {}
              , a = be(uS)
              , l = be(lS, {
                optional: !0
            })
              , u = be(FU, {
                optional: !0
            })
              , c = be(NU, {
                optional: !0
            })
              , d = new Je(null,n,e,t,r,i,_D(o));
            return u && (d.urlHandlingStrategy = u),
            c && (d.routeReuseStrategy = c),
            d.titleStrategy = l ?? a,
            function BU(n, e) {
                n.errorHandler && (e.errorHandler = n.errorHandler),
                n.malformedUriErrorHandler && (e.malformedUriErrorHandler = n.malformedUriErrorHandler),
                n.onSameUrlNavigation && (e.onSameUrlNavigation = n.onSameUrlNavigation),
                n.paramsInheritanceStrategy && (e.paramsInheritanceStrategy = n.paramsInheritanceStrategy),
                n.relativeLinkResolution && (e.relativeLinkResolution = n.relativeLinkResolution),
                n.urlUpdateStrategy && (e.urlUpdateStrategy = n.urlUpdateStrategy),
                n.canceledNavigationResolution && (e.canceledNavigationResolution = n.canceledNavigationResolution)
            }(s, d),
            d
        }
        let Je = (()=>{
            class n {
                constructor(t, r, i, o, s, a, l) {
                    this.rootComponentType = t,
                    this.urlSerializer = r,
                    this.rootContexts = i,
                    this.location = o,
                    this.config = l,
                    this.lastSuccessfulNavigation = null,
                    this.currentNavigation = null,
                    this.disposed = !1,
                    this.navigationId = 0,
                    this.currentPageId = 0,
                    this.isNgZoneEnabled = !1,
                    this.events = new Fe,
                    this.errorHandler = kU,
                    this.malformedUriErrorHandler = LU,
                    this.navigated = !1,
                    this.lastSuccessfulId = -1,
                    this.afterPreactivation = ()=>P(void 0),
                    this.urlHandlingStrategy = new PU,
                    this.routeReuseStrategy = new RU,
                    this.onSameUrlNavigation = "ignore",
                    this.paramsInheritanceStrategy = "emptyOnly",
                    this.urlUpdateStrategy = "deferred",
                    this.relativeLinkResolution = "corrected",
                    this.canceledNavigationResolution = "replace",
                    this.configLoader = s.get(Hf),
                    this.configLoader.onLoadEndListener = h=>this.triggerEvent(new CV(h)),
                    this.configLoader.onLoadStartListener = h=>this.triggerEvent(new EV(h)),
                    this.ngModule = s.get(Hr),
                    this.console = s.get(MR);
                    const d = s.get(ve);
                    this.isNgZoneEnabled = d instanceof ve && ve.isInAngularZone(),
                    this.resetConfig(l),
                    this.currentUrlTree = function $L() {
                        return new Yr(new X([],{}),{},null)
                    }(),
                    this.rawUrlTree = this.currentUrlTree,
                    this.browserUrlTree = this.currentUrlTree,
                    this.routerState = VD(this.currentUrlTree, this.rootComponentType),
                    this.transitions = new Yt({
                        id: 0,
                        targetPageId: 0,
                        currentUrlTree: this.currentUrlTree,
                        currentRawUrl: this.currentUrlTree,
                        extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
                        urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
                        rawUrl: this.currentUrlTree,
                        extras: {},
                        resolve: null,
                        reject: null,
                        promise: Promise.resolve(!0),
                        source: "imperative",
                        restoredState: null,
                        currentSnapshot: this.routerState.snapshot,
                        targetSnapshot: null,
                        currentRouterState: this.routerState,
                        targetRouterState: null,
                        guards: {
                            canActivateChecks: [],
                            canDeactivateChecks: []
                        },
                        guardsResult: null
                    }),
                    this.navigations = this.setupNavigations(this.transitions),
                    this.processNavigations()
                }
                get browserPageId() {
                    return this.location.getState()?.\u0275routerPageId
                }
                setupNavigations(t) {
                    const r = this.events;
                    return t.pipe(In(i=>0 !== i.id), J(i=>({
                        ...i,
                        extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl)
                    })), wn(i=>{
                        let o = !1
                          , s = !1;
                        return P(i).pipe(Ze(a=>{
                            this.currentNavigation = {
                                id: a.id,
                                initialUrl: a.rawUrl,
                                extractedUrl: a.extractedUrl,
                                trigger: a.source,
                                extras: a.extras,
                                previousNavigation: this.lastSuccessfulNavigation ? {
                                    ...this.lastSuccessfulNavigation,
                                    previousNavigation: null
                                } : null
                            }
                        }
                        ), wn(a=>{
                            const l = this.browserUrlTree.toString()
                              , u = !this.navigated || a.extractedUrl.toString() !== l || l !== this.currentUrlTree.toString();
                            if (("reload" === this.onSameUrlNavigation || u) && this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))
                                return hS(a.source) && (this.browserUrlTree = a.extractedUrl),
                                P(a).pipe(wn(d=>{
                                    const h = this.transitions.getValue();
                                    return r.next(new If(d.id,this.serializeUrl(d.extractedUrl),d.source,d.restoredState)),
                                    h !== this.transitions.getValue() ? Rn : Promise.resolve(d)
                                }
                                ), function mU(n, e, t, r) {
                                    return wn(i=>function fU(n, e, t, r, i) {
                                        return new pU(n,e,t,r,i).apply()
                                    }(n, e, t, i.extractedUrl, r).pipe(J(o=>({
                                        ...i,
                                        urlAfterRedirects: o
                                    }))))
                                }(this.ngModule.injector, this.configLoader, this.urlSerializer, this.config), Ze(d=>{
                                    this.currentNavigation = {
                                        ...this.currentNavigation,
                                        finalUrl: d.urlAfterRedirects
                                    },
                                    i.urlAfterRedirects = d.urlAfterRedirects
                                }
                                ), function SU(n, e, t, r, i, o) {
                                    return Qe(s=>function yU(n, e, t, r, i, o, s="emptyOnly", a="legacy") {
                                        return new vU(n,e,t,r,i,s,a,o).recognize().pipe(wn(l=>null === l ? function _U(n) {
                                            return new xe(e=>e.error(n))
                                        }(new gU) : P(l)))
                                    }(n, e, t, s.urlAfterRedirects, r.serialize(s.urlAfterRedirects), r, i, o).pipe(J(a=>({
                                        ...s,
                                        targetSnapshot: a
                                    }))))
                                }(this.ngModule.injector, this.rootComponentType, this.config, this.urlSerializer, this.paramsInheritanceStrategy, this.relativeLinkResolution), Ze(d=>{
                                    if (i.targetSnapshot = d.targetSnapshot,
                                    "eager" === this.urlUpdateStrategy) {
                                        if (!d.extras.skipLocationChange) {
                                            const f = this.urlHandlingStrategy.merge(d.urlAfterRedirects, d.rawUrl);
                                            this.setBrowserUrl(f, d)
                                        }
                                        this.browserUrlTree = d.urlAfterRedirects
                                    }
                                    const h = new mV(d.id,this.serializeUrl(d.extractedUrl),this.serializeUrl(d.urlAfterRedirects),d.targetSnapshot);
                                    r.next(h)
                                }
                                ));
                            if (u && this.rawUrlTree && this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
                                const {id: h, extractedUrl: f, source: p, restoredState: g, extras: y} = a
                                  , C = new If(h,this.serializeUrl(f),p,g);
                                r.next(C);
                                const S = VD(f, this.rootComponentType).snapshot;
                                return P(i = {
                                    ...a,
                                    targetSnapshot: S,
                                    urlAfterRedirects: f,
                                    extras: {
                                        ...y,
                                        skipLocationChange: !1,
                                        replaceUrl: !1
                                    }
                                })
                            }
                            return this.rawUrlTree = a.rawUrl,
                            a.resolve(null),
                            Rn
                        }
                        ), Ze(a=>{
                            const l = new gV(a.id,this.serializeUrl(a.extractedUrl),this.serializeUrl(a.urlAfterRedirects),a.targetSnapshot);
                            this.triggerEvent(l)
                        }
                        ), J(a=>i = {
                            ...a,
                            guards: BV(a.targetSnapshot, a.currentSnapshot, this.rootContexts)
                        }), function ZV(n, e) {
                            return Qe(t=>{
                                const {targetSnapshot: r, currentSnapshot: i, guards: {canActivateChecks: o, canDeactivateChecks: s}} = t;
                                return 0 === s.length && 0 === o.length ? P({
                                    ...t,
                                    guardsResult: !0
                                }) : function XV(n, e, t, r) {
                                    return Le(n).pipe(Qe(i=>function iU(n, e, t, r, i) {
                                        const o = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
                                        return o && 0 !== o.length ? P(o.map(a=>{
                                            const l = Ls(e) ?? i
                                              , u = oo(a, l);
                                            return Er(function KV(n) {
                                                return n && Bs(n.canDeactivate)
                                            }(u) ? u.canDeactivate(n, e, t, r) : l.runInContext(()=>u(n, e, t, r))).pipe(yr())
                                        }
                                        )).pipe(so()) : P(!0)
                                    }(i.component, i.route, t, e, r)), yr(i=>!0 !== i, !0))
                                }(s, r, i, n).pipe(Qe(a=>a && function $V(n) {
                                    return "boolean" == typeof n
                                }(a) ? function JV(n, e, t, r) {
                                    return Le(e).pipe(Qr(i=>Tl(function tU(n, e) {
                                        return null !== n && e && e(new bV(n)),
                                        P(!0)
                                    }(i.route.parent, r), function eU(n, e) {
                                        return null !== n && e && e(new SV(n)),
                                        P(!0)
                                    }(i.route, r), function rU(n, e, t) {
                                        const r = e[e.length - 1]
                                          , o = e.slice(0, e.length - 1).reverse().map(s=>function HV(n) {
                                            const e = n.routeConfig ? n.routeConfig.canActivateChild : null;
                                            return e && 0 !== e.length ? {
                                                node: n,
                                                guards: e
                                            } : null
                                        }(s)).filter(s=>null !== s).map(s=>dD(()=>P(s.guards.map(l=>{
                                            const u = Ls(s.node) ?? t
                                              , c = oo(l, u);
                                            return Er(function qV(n) {
                                                return n && Bs(n.canActivateChild)
                                            }(c) ? c.canActivateChild(r, n) : u.runInContext(()=>c(r, n))).pipe(yr())
                                        }
                                        )).pipe(so())));
                                        return P(o).pipe(so())
                                    }(n, i.path, t), function nU(n, e, t) {
                                        const r = e.routeConfig ? e.routeConfig.canActivate : null;
                                        if (!r || 0 === r.length)
                                            return P(!0);
                                        const i = r.map(o=>dD(()=>{
                                            const s = Ls(e) ?? t
                                              , a = oo(o, s);
                                            return Er(function WV(n) {
                                                return n && Bs(n.canActivate)
                                            }(a) ? a.canActivate(e, n) : s.runInContext(()=>a(e, n))).pipe(yr())
                                        }
                                        ));
                                        return P(i).pipe(so())
                                    }(n, i.route, t))), yr(i=>!0 !== i, !0))
                                }(r, o, n, e) : P(a)), J(a=>({
                                    ...t,
                                    guardsResult: a
                                })))
                            }
                            )
                        }(this.ngModule.injector, a=>this.triggerEvent(a)), Ze(a=>{
                            if (i.guardsResult = a.guardsResult,
                            Xr(a.guardsResult))
                                throw jD(0, a.guardsResult);
                            const l = new _V(a.id,this.serializeUrl(a.extractedUrl),this.serializeUrl(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);
                            this.triggerEvent(l)
                        }
                        ), In(a=>!!a.guardsResult || (this.restoreHistory(a),
                        this.cancelNavigationTransition(a, "", 3),
                        !1)), Uf(a=>{
                            if (a.guards.canActivateChecks.length)
                                return P(a).pipe(Ze(l=>{
                                    const u = new yV(l.id,this.serializeUrl(l.extractedUrl),this.serializeUrl(l.urlAfterRedirects),l.targetSnapshot);
                                    this.triggerEvent(u)
                                }
                                ), wn(l=>{
                                    let u = !1;
                                    return P(l).pipe(function IU(n, e) {
                                        return Qe(t=>{
                                            const {targetSnapshot: r, guards: {canActivateChecks: i}} = t;
                                            if (!i.length)
                                                return P(t);
                                            let o = 0;
                                            return Le(i).pipe(Qr(s=>function TU(n, e, t, r) {
                                                const i = n.routeConfig
                                                  , o = n._resolve;
                                                return void 0 !== i?.title && !aS(i) && (o[Ms] = i.title),
                                                function wU(n, e, t, r) {
                                                    const i = function AU(n) {
                                                        return [...Object.keys(n), ...Object.getOwnPropertySymbols(n)]
                                                    }(n);
                                                    if (0 === i.length)
                                                        return P({});
                                                    const o = {};
                                                    return Le(i).pipe(Qe(s=>function MU(n, e, t, r) {
                                                        const i = Ls(e) ?? r
                                                          , o = oo(n, i);
                                                        return Er(o.resolve ? o.resolve(e, t) : i.runInContext(()=>o(e, t)))
                                                    }(n[s], e, t, r).pipe(yr(), Ze(a=>{
                                                        o[s] = a
                                                    }
                                                    ))), gf(1), function BL(n) {
                                                        return J(()=>n)
                                                    }(o), vr(s=>kf(s) ? Rn : As(s)))
                                                }(o, n, e, r).pipe(J(s=>(n._resolvedData = s,
                                                n.data = UD(n, t).resolve,
                                                i && aS(i) && (n.data[Ms] = i.title),
                                                null)))
                                            }(s.route, r, n, e)), Ze(()=>o++), gf(1), Qe(s=>o === i.length ? P(t) : Rn))
                                        }
                                        )
                                    }(this.paramsInheritanceStrategy, this.ngModule.injector), Ze({
                                        next: ()=>u = !0,
                                        complete: ()=>{
                                            u || (this.restoreHistory(l),
                                            this.cancelNavigationTransition(l, "", 2))
                                        }
                                    }))
                                }
                                ), Ze(l=>{
                                    const u = new vV(l.id,this.serializeUrl(l.extractedUrl),this.serializeUrl(l.urlAfterRedirects),l.targetSnapshot);
                                    this.triggerEvent(u)
                                }
                                ))
                        }
                        ), Uf(a=>{
                            const l = u=>{
                                const c = [];
                                u.routeConfig?.loadComponent && !u.routeConfig._loadedComponent && c.push(this.configLoader.loadComponent(u.routeConfig).pipe(Ze(d=>{
                                    u.component = d
                                }
                                ), J(()=>{}
                                )));
                                for (const d of u.children)
                                    c.push(...l(d));
                                return c
                            }
                            ;
                            return $h(l(a.targetSnapshot.root)).pipe(jl(), Wr(1))
                        }
                        ), Uf(()=>this.afterPreactivation()), J(a=>{
                            const l = function MV(n, e, t) {
                                const r = Ps(n, e._root, t ? t._root : void 0);
                                return new LD(r,e)
                            }(this.routeReuseStrategy, a.targetSnapshot, a.currentRouterState);
                            return i = {
                                ...a,
                                targetRouterState: l
                            }
                        }
                        ), Ze(a=>{
                            this.currentUrlTree = a.urlAfterRedirects,
                            this.rawUrlTree = this.urlHandlingStrategy.merge(a.urlAfterRedirects, a.rawUrl),
                            this.routerState = a.targetRouterState,
                            "deferred" === this.urlUpdateStrategy && (a.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, a),
                            this.browserUrlTree = a.urlAfterRedirects)
                        }
                        ), ((n,e,t)=>J(r=>(new UV(e,r.targetRouterState,r.currentRouterState,t).activate(n),
                        r)))(this.rootContexts, this.routeReuseStrategy, a=>this.triggerEvent(a)), Ze({
                            next() {
                                o = !0
                            },
                            complete() {
                                o = !0
                            }
                        }), _f(()=>{
                            o || s || this.cancelNavigationTransition(i, "", 1),
                            this.currentNavigation?.id === i.id && (this.currentNavigation = null)
                        }
                        ), vr(a=>{
                            if (s = !0,
                            zD(a)) {
                                $D(a) || (this.navigated = !0,
                                this.restoreHistory(i, !0));
                                const l = new Ql(i.id,this.serializeUrl(i.extractedUrl),a.message,a.cancellationCode);
                                if (r.next(l),
                                $D(a)) {
                                    const u = this.urlHandlingStrategy.merge(a.url, this.rawUrlTree)
                                      , c = {
                                        skipLocationChange: i.extras.skipLocationChange,
                                        replaceUrl: "eager" === this.urlUpdateStrategy || hS(i.source)
                                    };
                                    this.scheduleNavigation(u, "imperative", null, c, {
                                        resolve: i.resolve,
                                        reject: i.reject,
                                        promise: i.promise
                                    })
                                } else
                                    i.resolve(!1)
                            } else {
                                this.restoreHistory(i, !0);
                                const l = new FD(i.id,this.serializeUrl(i.extractedUrl),a,i.targetSnapshot ?? void 0);
                                r.next(l);
                                try {
                                    i.resolve(this.errorHandler(a))
                                } catch (u) {
                                    i.reject(u)
                                }
                            }
                            return Rn
                        }
                        ))
                    }
                    ))
                }
                resetRootComponentType(t) {
                    this.rootComponentType = t,
                    this.routerState.root.component = this.rootComponentType
                }
                setTransition(t) {
                    this.transitions.next({
                        ...this.transitions.value,
                        ...t
                    })
                }
                initialNavigation() {
                    this.setUpLocationChangeListener(),
                    0 === this.navigationId && this.navigateByUrl(this.location.path(!0), {
                        replaceUrl: !0
                    })
                }
                setUpLocationChangeListener() {
                    this.locationSubscription || (this.locationSubscription = this.location.subscribe(t=>{
                        const r = "popstate" === t.type ? "popstate" : "hashchange";
                        "popstate" === r && setTimeout(()=>{
                            const i = {
                                replaceUrl: !0
                            }
                              , o = t.state?.navigationId ? t.state : null;
                            if (o) {
                                const a = {
                                    ...o
                                };
                                delete a.navigationId,
                                delete a.\u0275routerPageId,
                                0 !== Object.keys(a).length && (i.state = a)
                            }
                            const s = this.parseUrl(t.url);
                            this.scheduleNavigation(s, r, o, i)
                        }
                        , 0)
                    }
                    ))
                }
                get url() {
                    return this.serializeUrl(this.currentUrlTree)
                }
                getCurrentNavigation() {
                    return this.currentNavigation
                }
                triggerEvent(t) {
                    this.events.next(t)
                }
                resetConfig(t) {
                    this.config = t.map(Pf),
                    this.navigated = !1,
                    this.lastSuccessfulId = -1
                }
                ngOnDestroy() {
                    this.dispose()
                }
                dispose() {
                    this.transitions.complete(),
                    this.locationSubscription && (this.locationSubscription.unsubscribe(),
                    this.locationSubscription = void 0),
                    this.disposed = !0
                }
                createUrlTree(t, r={}) {
                    const {relativeTo: i, queryParams: o, fragment: s, queryParamsHandling: a, preserveFragment: l} = r
                      , u = i || this.routerState.root
                      , c = l ? this.currentUrlTree.fragment : s;
                    let d = null;
                    switch (a) {
                    case "merge":
                        d = {
                            ...this.currentUrlTree.queryParams,
                            ...o
                        };
                        break;
                    case "preserve":
                        d = this.currentUrlTree.queryParams;
                        break;
                    default:
                        d = o || null
                    }
                    return null !== d && (d = this.removeEmptyProps(d)),
                    uV(u, this.currentUrlTree, t, d, c ?? null)
                }
                navigateByUrl(t, r={
                    skipLocationChange: !1
                }) {
                    const i = Xr(t) ? t : this.parseUrl(t)
                      , o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
                    return this.scheduleNavigation(o, "imperative", null, r)
                }
                navigate(t, r={
                    skipLocationChange: !1
                }) {
                    return function HU(n) {
                        for (let e = 0; e < n.length; e++) {
                            if (null == n[e])
                                throw new b(4008,false)
                        }
                    }(t),
                    this.navigateByUrl(this.createUrlTree(t, r), r)
                }
                serializeUrl(t) {
                    return this.urlSerializer.serialize(t)
                }
                parseUrl(t) {
                    let r;
                    try {
                        r = this.urlSerializer.parse(t)
                    } catch (i) {
                        r = this.malformedUriErrorHandler(i, this.urlSerializer, t)
                    }
                    return r
                }
                isActive(t, r) {
                    let i;
                    if (i = !0 === r ? {
                        ...VU
                    } : !1 === r ? {
                        ...UU
                    } : r,
                    Xr(t))
                        return ED(this.currentUrlTree, t, i);
                    const o = this.parseUrl(t);
                    return ED(this.currentUrlTree, o, i)
                }
                removeEmptyProps(t) {
                    return Object.keys(t).reduce((r,i)=>{
                        const o = t[i];
                        return null != o && (r[i] = o),
                        r
                    }
                    , {})
                }
                processNavigations() {
                    this.navigations.subscribe(t=>{
                        this.navigated = !0,
                        this.lastSuccessfulId = t.id,
                        this.currentPageId = t.targetPageId,
                        this.events.next(new Jr(t.id,this.serializeUrl(t.extractedUrl),this.serializeUrl(this.currentUrlTree))),
                        this.lastSuccessfulNavigation = this.currentNavigation,
                        this.titleStrategy?.updateTitle(this.routerState.snapshot),
                        t.resolve(!0)
                    }
                    , t=>{
                        this.console.warn(`Unhandled Navigation Error: ${t}`)
                    }
                    )
                }
                scheduleNavigation(t, r, i, o, s) {
                    if (this.disposed)
                        return Promise.resolve(!1);
                    let a, l, u;
                    s ? (a = s.resolve,
                    l = s.reject,
                    u = s.promise) : u = new Promise((h,f)=>{
                        a = h,
                        l = f
                    }
                    );
                    const c = ++this.navigationId;
                    let d;
                    return "computed" === this.canceledNavigationResolution ? (0 === this.currentPageId && (i = this.location.getState()),
                    d = i && i.\u0275routerPageId ? i.\u0275routerPageId : o.replaceUrl || o.skipLocationChange ? this.browserPageId ?? 0 : (this.browserPageId ?? 0) + 1) : d = 0,
                    this.setTransition({
                        id: c,
                        targetPageId: d,
                        source: r,
                        restoredState: i,
                        currentUrlTree: this.currentUrlTree,
                        currentRawUrl: this.rawUrlTree,
                        rawUrl: t,
                        extras: o,
                        resolve: a,
                        reject: l,
                        promise: u,
                        currentSnapshot: this.routerState.snapshot,
                        currentRouterState: this.routerState
                    }),
                    u.catch(h=>Promise.reject(h))
                }
                setBrowserUrl(t, r) {
                    const i = this.urlSerializer.serialize(t)
                      , o = {
                        ...r.extras.state,
                        ...this.generateNgRouterState(r.id, r.targetPageId)
                    };
                    this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl ? this.location.replaceState(i, "", o) : this.location.go(i, "", o)
                }
                restoreHistory(t, r=!1) {
                    if ("computed" === this.canceledNavigationResolution) {
                        const i = this.currentPageId - t.targetPageId;
                        "popstate" !== t.source && "eager" !== this.urlUpdateStrategy && this.currentUrlTree !== this.currentNavigation?.finalUrl || 0 === i ? this.currentUrlTree === this.currentNavigation?.finalUrl && 0 === i && (this.resetState(t),
                        this.browserUrlTree = t.currentUrlTree,
                        this.resetUrlToCurrentUrlTree()) : this.location.historyGo(i)
                    } else
                        "replace" === this.canceledNavigationResolution && (r && this.resetState(t),
                        this.resetUrlToCurrentUrlTree())
                }
                resetState(t) {
                    this.routerState = t.currentRouterState,
                    this.currentUrlTree = t.currentUrlTree,
                    this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl)
                }
                resetUrlToCurrentUrlTree() {
                    this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
                }
                cancelNavigationTransition(t, r, i) {
                    const o = new Ql(t.id,this.serializeUrl(t.extractedUrl),r,i);
                    this.triggerEvent(o),
                    t.resolve(!1)
                }
                generateNgRouterState(t, r) {
                    return "computed" === this.canceledNavigationResolution ? {
                        navigationId: t,
                        \u0275routerPageId: r
                    } : {
                        navigationId: t
                    }
                }
            }
            return n.\u0275fac = function(t) {
                rd()
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: function() {
                    return dS()
                },
                providedIn: "root"
            }),
            n
        }
        )();
        function hS(n) {
            return "imperative" !== n
        }
        class fS {
        }
        let $U = (()=>{
            class n {
                constructor(t, r, i, o, s) {
                    this.router = t,
                    this.injector = i,
                    this.preloadingStrategy = o,
                    this.loader = s
                }
                setUpPreloading() {
                    this.subscription = this.router.events.pipe(In(t=>t instanceof Jr), Qr(()=>this.preload())).subscribe(()=>{}
                    )
                }
                preload() {
                    return this.processRoutes(this.injector, this.router.config)
                }
                ngOnDestroy() {
                    this.subscription && this.subscription.unsubscribe()
                }
                processRoutes(t, r) {
                    const i = [];
                    for (const o of r) {
                        o.providers && !o._injector && (o._injector = Za(o.providers, t, `Route: ${o.path}`));
                        const s = o._injector ?? t
                          , a = o._loadedInjector ?? s;
                        o.loadChildren && !o._loadedRoutes && void 0 === o.canLoad || o.loadComponent && !o._loadedComponent ? i.push(this.preloadConfig(s, o)) : (o.children || o._loadedRoutes) && i.push(this.processRoutes(a, o.children ?? o._loadedRoutes))
                    }
                    return Le(i).pipe(si())
                }
                preloadConfig(t, r) {
                    return this.preloadingStrategy.preload(r, ()=>{
                        let i;
                        i = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(t, r) : P(null);
                        const o = i.pipe(Qe(s=>null === s ? P(void 0) : (r._loadedRoutes = s.routes,
                        r._loadedInjector = s.injector,
                        this.processRoutes(s.injector ?? t, s.routes))));
                        return r.loadComponent && !r._loadedComponent ? Le([o, this.loader.loadComponent(r)]).pipe(si()) : o
                    }
                    )
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Je),T(nh),T(ar),T(fS),T(Hf))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac,
                providedIn: "root"
            }),
            n
        }
        )();
        const $f = new A("");
        let pS = (()=>{
            class n {
                constructor(t, r, i={}) {
                    this.router = t,
                    this.viewportScroller = r,
                    this.options = i,
                    this.lastId = 0,
                    this.lastSource = "imperative",
                    this.restoredId = 0,
                    this.store = {},
                    i.scrollPositionRestoration = i.scrollPositionRestoration || "disabled",
                    i.anchorScrolling = i.anchorScrolling || "disabled"
                }
                init() {
                    "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"),
                    this.routerEventsSubscription = this.createScrollEvents(),
                    this.scrollEventsSubscription = this.consumeScrollEvents()
                }
                createScrollEvents() {
                    return this.router.events.subscribe(t=>{
                        t instanceof If ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(),
                        this.lastSource = t.navigationTrigger,
                        this.restoredId = t.restoredState ? t.restoredState.navigationId : 0) : t instanceof Jr && (this.lastId = t.id,
                        this.scheduleScrollEvent(t, this.router.parseUrl(t.urlAfterRedirects).fragment))
                    }
                    )
                }
                consumeScrollEvents() {
                    return this.router.events.subscribe(t=>{
                        t instanceof PD && (t.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(t.position) : t.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(t.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
                    }
                    )
                }
                scheduleScrollEvent(t, r) {
                    this.router.triggerEvent(new PD(t,"popstate" === this.lastSource ? this.store[this.restoredId] : null,r))
                }
                ngOnDestroy() {
                    this.routerEventsSubscription && this.routerEventsSubscription.unsubscribe(),
                    this.scrollEventsSubscription && this.scrollEventsSubscription.unsubscribe()
                }
            }
            return n.\u0275fac = function(t) {
                rd()
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac
            }),
            n
        }
        )();
        function ao(n, e) {
            return {
                \u0275kind: n,
                \u0275providers: e
            }
        }
        function zf(n) {
            return [{
                provide: Bf,
                multi: !0,
                useValue: n
            }]
        }
        function gS() {
            const n = be(Wt);
            return e=>{
                const t = n.get(us);
                if (e !== t.components[0])
                    return;
                const r = n.get(Je)
                  , i = n.get(_S);
                1 === n.get(Wf) && r.initialNavigation(),
                n.get(yS, null, U.Optional)?.setUpPreloading(),
                n.get($f, null, U.Optional)?.init(),
                r.resetRootComponentType(t.componentTypes[0]),
                i.next(),
                i.complete()
            }
        }
        const _S = new A("",{
            factory: ()=>new Fe
        })
          , Wf = new A("",{
            providedIn: "root",
            factory: ()=>1
        });
        const yS = new A("");
        function KU(n) {
            return ao(0, [{
                provide: yS,
                useExisting: $U
            }, {
                provide: fS,
                useExisting: n
            }])
        }
        const vS = new A("ROUTER_FORROOT_GUARD")
          , QU = [_h, {
            provide: SD,
            useClass: vf
        }, {
            provide: Je,
            useFactory: dS
        }, ks, {
            provide: ei,
            useFactory: function mS(n) {
                return n.routerState.root
            },
            deps: [Je]
        }, Hf];
        function YU() {
            return new sE("Router",Je)
        }
        let ES = (()=>{
            class n {
                constructor(t) {}
                static forRoot(t, r) {
                    return {
                        ngModule: n,
                        providers: [QU, [], zf(t), {
                            provide: vS,
                            useFactory: eB,
                            deps: [[Je, new xo, new Fo]]
                        }, {
                            provide: ou,
                            useValue: r || {}
                        }, r?.useHash ? {
                            provide: $r,
                            useClass: _x
                        } : {
                            provide: $r,
                            useClass: OE
                        }, {
                            provide: $f,
                            useFactory: ()=>{
                                const n = be(Je)
                                  , e = be(BF)
                                  , t = be(ou);
                                return t.scrollOffset && e.setOffset(t.scrollOffset),
                                new pS(n,e,t)
                            }
                        }, r?.preloadingStrategy ? KU(r.preloadingStrategy).\u0275providers : [], {
                            provide: sE,
                            multi: !0,
                            useFactory: YU
                        }, r?.initialNavigation ? tB(r) : [], [{
                            provide: CS,
                            useFactory: gS
                        }, {
                            provide: Jv,
                            multi: !0,
                            useExisting: CS
                        }]]
                    }
                }
                static forChild(t) {
                    return {
                        ngModule: n,
                        providers: [zf(t)]
                    }
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(vS, 8))
            }
            ,
            n.\u0275mod = vt({
                type: n
            }),
            n.\u0275inj = ut({
                imports: [xf]
            }),
            n
        }
        )();
        function eB(n) {
            return "guarded"
        }
        function tB(n) {
            return ["disabled" === n.initialNavigation ? ao(3, [{
                provide: tl,
                multi: !0,
                useFactory: ()=>{
                    const e = be(Je);
                    return ()=>{
                        e.setUpLocationChangeListener()
                    }
                }
            }, {
                provide: Wf,
                useValue: 2
            }]).\u0275providers : [], "enabledBlocking" === n.initialNavigation ? ao(2, [{
                provide: Wf,
                useValue: 0
            }, {
                provide: tl,
                multi: !0,
                deps: [Wt],
                useFactory: e=>{
                    const t = e.get(mx, Promise.resolve());
                    let r = !1;
                    return ()=>t.then(()=>new Promise(o=>{
                        const s = e.get(Je)
                          , a = e.get(_S);
                        (function i(o) {
                            e.get(Je).events.pipe(In(a=>a instanceof Jr || a instanceof Ql || a instanceof FD), J(a=>a instanceof Jr || a instanceof Ql && (0 === a.code || 1 === a.code) && null), In(a=>null !== a), Wr(1)).subscribe(()=>{
                                o()
                            }
                            )
                        }
                        )(()=>{
                            o(!0),
                            r = !0
                        }
                        ),
                        s.afterPreactivation = ()=>(o(!0),
                        r || a.closed ? P(void 0) : a),
                        s.initialNavigation()
                    }
                    ))
                }
            }]).\u0275providers : []]
        }
        const CS = new A("")
          , rB = [];
        let iB = (()=>{
            class n {
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275mod = vt({
                type: n
            }),
            n.\u0275inj = ut({
                imports: [ES.forRoot(rB), ES]
            }),
            n
        }
        )();
        function oB(n, e) {
            if (1 & n) {
                const t = Ur();
                re(0, "mat-chip", 8),
                De("click", function() {
                    const o = Rr(t).$implicit;
                    return xr(St().toggleSkill(o))
                }),
                Ne(1),
                ie()
            }
            if (2 & n) {
                const t = e.$implicit
                  , r = St();
                ot("selected", r.selectedSkills.has(t))("disabled", !r.remainingSkills.has(t)),
                Ye(1),
                dr(t)
            }
        }
        function sB(n, e) {
            if (1 & n) {
                const t = Ur();
                re(0, "mat-chip", 8),
                De("click", function() {
                    const o = Rr(t).$implicit;
                    return xr(St().toggleSkill(o))
                }),
                Ne(1),
                ie()
            }
            if (2 & n) {
                const t = e.$implicit
                  , r = St();
                ot("selected", r.selectedSkills.has(t))("disabled", !r.remainingSkills.has(t)),
                Ye(1),
                dr(t)
            }
        }
        function aB(n, e) {
            if (1 & n) {
                const t = Ur();
                re(0, "mat-chip", 8),
                De("click", function() {
                    const o = Rr(t).$implicit;
                    return xr(St().toggleSkill(o))
                }),
                Ne(1),
                ie()
            }
            if (2 & n) {
                const t = e.$implicit
                  , r = St();
                ot("selected", r.selectedSkills.has(t))("disabled", !r.remainingSkills.has(t)),
                Ye(1),
                dr(t)
            }
        }
        function lB(n, e) {
            if (1 & n) {
                const t = Ur();
                re(0, "mat-chip", 8),
                De("click", function() {
                    const o = Rr(t).$implicit;
                    return xr(St().toggleSkill(o))
                }),
                Ne(1),
                ie()
            }
            if (2 & n) {
                const t = e.$implicit
                  , r = St();
                ot("selected", r.selectedSkills.has(t))("disabled", !r.remainingSkills.has(t)),
                Ye(1),
                dr(t)
            }
        }
        function uB(n, e) {
            if (1 & n) {
                const t = Ur();
                re(0, "mat-chip", 8),
                De("click", function() {
                    const o = Rr(t).$implicit;
                    return xr(St().toggleSkill(o))
                }),
                Ne(1),
                ie()
            }
            if (2 & n) {
                const t = e.$implicit
                  , r = St();
                ot("selected", r.selectedSkills.has(t))("disabled", !r.remainingSkills.has(t)),
                Ye(1),
                dr(t)
            }
        }
        function cB(n, e) {
            if (1 & n) {
                const t = Ur();
                re(0, "mat-chip", 8),
                De("click", function() {
                    const o = Rr(t).$implicit;
                    return xr(St().toggleSkill(o))
                }),
                Ne(1),
                ie()
            }
            if (2 & n) {
                const t = e.$implicit
                  , r = St();
                ot("selected", r.selectedSkills.has(t))("disabled", !r.remainingSkills.has(t)),
                Ye(1),
                dr(t)
            }
        }
        function ttB(n, e) {
            if (1 & n) {
                const t = Ur();
                re(0, "mat-chip", 8),
                De("click", function() {
                    const o = Rr(t).$implicit;
                    return xr(St().toggleSkill(o))
                }),
                Ne(1),
                ie()
            }
            if (2 & n) {
                const t = e.$implicit
                  , r = St();
                ot("selected", r.selectedSkills.has(t))("disabled", !r.remainingSkills.has(t)),
                Ye(1),
                dr(t)
            }
        }
        function dB(n, e) {
            if (1 & n && (ja(0)(1),
            re(2, "li", 9),
            Ne(3),
            ie(),
            Ga()()),
            2 & n) {
                const t = e.$implicit
                  , r = St();
                Ye(2),
                xd("color", r.matchingAssessments.has(t) ? "black" : "LightGray"),
                Ye(1),
                za(" ", t.name, " ")
            }
        }
        var _ = (()=>{
            return (n = _ || (_ = {})).ASKING_QUESTIONS = "Student Asking Questions",
            n.ANSWERING_QUESTIONS = "Answering Questions",
            n.BEHAVIOR_REGULATION = "Behavior Regulation",
            n.COMMENTING = "Commenting",
            n.JOINT_ATTENTION = "Joint Attention",
            n.LABELING = "Labeling",
            n.PARTICIPATING_SOCIAL_INTERACTIONS = "Participating in Social Interactions",
            n.PROTEST = "Protest",
            n.REQUESTING_MORE = "Requesting More of Something",
            n.REQUESTING_NEW = "Requesting Something New",
            n.SENSORY_TEST = "SENSORY TEST",
            _;
            var n
        }
        )()
          , m = (()=>{
            return (n = m || (m = {})).ABSTRACT_LANGUAGE = "Abstract Language",
            n.ABSTRACT_SYMBOLS = "Abstract Symbols",
            n.ACTIVATING_SWITCH = "Activating a Switch/VOCA",
            n.BODY_MOVEMENTS = "Body Movements",
            n.CONCRETE_SYMBOLS = "Concrete Symbols",
            n.CONVENTIONAL_GESTURES = "Conventional Gestures",
            n.CONVENTIONAL_VOCALIZATIONS = "Conventional Vocalizations",
            n.EARLY_SOUNDS = "Early Sounds",
            n.FACIAL_EXPRESSIONS = "Facial Expressions",
            n.LOOKING_AT_SOMEONE_SOMETHING = "Looking at Someone or Something",
            n.SIMPLE_GESTURES = "Simple Gestures",
            n.USING_ECHOLALIA = "Using Echolalia",
            n.USING_LANGUAGE = "Using Language",
            n.COGNITION_TEST = "COGNITION TEST",
            m;
            var n
        }
        )()
          , I = (()=>{
            return (n = I || (I = {})).ADAPTATION_OF_ENVIRONMENT = "Adaptation of the Environment",
            n.CHILD_ADULT_RELATIONSHIPS = "Child-Adult Relationships",
            n.DEVELOPMENT_GROUP_ACTIVITIES = "Development of Group Activities",
            n.MODELING_ACCEPTANCE_INDIVIDUAL_DIFFERENCES = "Modeling Acceptance of Individual Differences",
            n.PROGRESS_MONITORING = "Progress Monitoring",
            n.RELATIONSHIPS_WITH_FAMILIES = "Relationships with Families",
            n.RESOLVING_CONFLICTS = "Resolving Conflicts",
            n.SUPPORTING_COMMUNICATION = "Supporting Communication",
            n.SUPPORTING_USE_OF_OBJECTS_MATERIALS = "Supporting Use of Objects/Materials",
            n.TEACHERS_PARTICIPATION_IN_ACTIVITY = "Teacher's Participation in Activity",
            n.TRANSITIONING_FROM_ACTIVITY_TO_ANOTHER = "Transitioning from 1 Activity to Another",
            n.MOTOR_TEST = "MOTOR TEST",
            I;
            var n
        }
        )()
          , O = (()=>{
            return (n = O || (O = {})).ACTIVATING_BACKGROUND_KNOWLEDGE = "Activating Background Knowledge",
            n.ASKING_QUESTIONS = "Instructor Asking Questions",
            n.CORRECTING_ERRORS = "Correcting Errors",
            n.DEFINING_KEY_TERMS = "Defining Key Terms",
            n.GUIDED_PRACTICES = "Guided Practices",
            n.MODELING = "Modeling",
            n.OFFERING_CHOICES = "Offering Choices",
            n.OFFERING_EXPLANATIONS = "Offering Explanations",
            n.PRAISE = "Praise",
            n.PROMPTING = "Prompting",
            n.PROVIDING_SPOKEN_WRITTEN_DIRECTIONS = "Providing Spoken and Written Directions",
            n.TEACHER_TEACHER_INTERACTIONS = "Teacher-to-Teacher Interactions",
            n.SPEECH_TEST = "SPEECH TEST",
            O;
            var n
        }
        )()
          , k = (()=>{
            return (n = k || (k = {})).AAC_SYSTEM = "AAC System",
            n.ACTIVITIES = "Activites",
            n.MATERIALS_USED = "Materials Used",
            n.OPPORTUNITIES_USE_MATERIALS = "Opportunities to Use Materials",
            n.PHYSICAL_SPACE = "Physical Space",
            n.LANGUAGE_TEST = "LANGUAGE TEST",
            k;
            var n
        }
        )()
          , $ = (()=>{
            return (n = $ || ($ = {})).ADULT_STUDENT_INTERACTIONS = "Adult-to-Student Interactions",
            n.CHILDS_SOCIAL_COMMUNICATION_SYSTEM = "Child's Social Communication System",
            n.COMMUNICATION_OPPORTUNITIES = "Communication Opportunities",
            n.STUDENT_STUDENT_INTERACTIONS = "Student-to-Student Interactions",
            n.TEACHER_TEACHER_INTERACTIONS = "Communication Partner Interactions",
            n.LITERACY_TEST = "LITERACY TEST",
            $;
            var n
        }
        )()
            , tts = (()=>{
            return (n = tts || (tts = {})).ADULT_STUDENT_INTERACTIONS = "Adult-to-Student Interactions",
            n.CARE_GIVER_TEST = "CARE GIVER TEST",
            tts;
            var n
        }
        )();
        const hB = [{
            name: "Communication Complexity Scale",
            studentCommunicationSkills: new Set([_.PROTEST, _.REQUESTING_MORE, _.REQUESTING_NEW, _.ANSWERING_QUESTIONS, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, _.BEHAVIOR_REGULATION, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.FACIAL_EXPRESSIONS, m.LOOKING_AT_SOMEONE_SOMETHING, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONVENTIONAL_VOCALIZATIONS, m.CONCRETE_SYMBOLS, m.ABSTRACT_SYMBOLS, m.USING_LANGUAGE, m.ACTIVATING_SWITCH, m.USING_ECHOLALIA])
        }, {
            name: "Optimizing learning opportunities for students",
            studentCommunicationSkills: new Set([_.ANSWERING_QUESTIONS, _.COMMENTING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.BEHAVIOR_REGULATION, m.BODY_MOVEMENTS, m.CONVENTIONAL_GESTURES, m.USING_LANGUAGE, I.RESOLVING_CONFLICTS, I.CHILD_ADULT_RELATIONSHIPS, I.SUPPORTING_USE_OF_OBJECTS_MATERIALS, I.TRANSITIONING_FROM_ACTIVITY_TO_ANOTHER, I.TEACHERS_PARTICIPATION_IN_ACTIVITY, O.OFFERING_EXPLANATIONS, O.PROVIDING_SPOKEN_WRITTEN_DIRECTIONS, O.DEFINING_KEY_TERMS, O.GUIDED_PRACTICES, O.PROMPTING, O.ASKING_QUESTIONS])
        }, {
            name: "Every Move Counts",
            studentCommunicationSkills: new Set([_.REQUESTING_MORE, _.REQUESTING_NEW, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.FACIAL_EXPRESSIONS, m.LOOKING_AT_SOMEONE_SOMETHING, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONVENTIONAL_VOCALIZATIONS, m.CONCRETE_SYMBOLS, m.ABSTRACT_SYMBOLS, m.USING_LANGUAGE, m.ACTIVATING_SWITCH, m.USING_ECHOLALIA])
        }, {
            name: "The Assessment of Learning Process (ALP) for AAC",
            studentCommunicationSkills: new Set([_.REQUESTING_MORE, _.REQUESTING_NEW, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, m.EARLY_SOUNDS, m.FACIAL_EXPRESSIONS, m.LOOKING_AT_SOMEONE_SOMETHING])
        }, {
            name: "Communication Matrix",
            studentCommunicationSkills: new Set([_.REQUESTING_MORE, _.PROTEST, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.ANSWERING_QUESTIONS, _.COMMENTING, _.LABELING, _.PARTICIPATING_SOCIAL_INTERACTIONS, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.FACIAL_EXPRESSIONS, m.LOOKING_AT_SOMEONE_SOMETHING, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONVENTIONAL_VOCALIZATIONS, m.CONCRETE_SYMBOLS, m.ABSTRACT_SYMBOLS, m.USING_LANGUAGE])
        }, {
            name: "Early Childhood Classroom Observation Measure",
            studentCommunicationSkills: new Set([I.ADAPTATION_OF_ENVIRONMENT, I.SUPPORTING_COMMUNICATION, I.RESOLVING_CONFLICTS, I.CHILD_ADULT_RELATIONSHIPS, I.PROGRESS_MONITORING, I.TEACHERS_PARTICIPATION_IN_ACTIVITY, O.OFFERING_EXPLANATIONS, O.PROVIDING_SPOKEN_WRITTEN_DIRECTIONS, O.MODELING, O.CORRECTING_ERRORS, O.PROMPTING, O.ASKING_QUESTIONS, k.ACTIVITIES, $.COMMUNICATION_OPPORTUNITIES, $.ADULT_STUDENT_INTERACTIONS])
        }, {
            name: "QIAT",
            studentCommunicationSkills: new Set([I.ADAPTATION_OF_ENVIRONMENT, I.SUPPORTING_COMMUNICATION, I.SUPPORTING_USE_OF_OBJECTS_MATERIALS, I.PROGRESS_MONITORING, k.OPPORTUNITIES_USE_MATERIALS, k.ACTIVITIES, k.MATERIALS_USED, k.AAC_SYSTEM, $.COMMUNICATION_OPPORTUNITIES, $.ADULT_STUDENT_INTERACTIONS, $.TEACHER_TEACHER_INTERACTIONS, $.CHILDS_SOCIAL_COMMUNICATION_SYSTEM])
        }, {
            name: "AAC Profile",
            studentCommunicationSkills: new Set([I.ADAPTATION_OF_ENVIRONMENT, I.SUPPORTING_COMMUNICATION, I.RESOLVING_CONFLICTS, I.CHILD_ADULT_RELATIONSHIPS, I.SUPPORTING_USE_OF_OBJECTS_MATERIALS, I.DEVELOPMENT_GROUP_ACTIVITIES, I.TEACHERS_PARTICIPATION_IN_ACTIVITY, I.MODELING_ACCEPTANCE_INDIVIDUAL_DIFFERENCES, O.MODELING, O.ASKING_QUESTIONS, _.REQUESTING_MORE, _.PROTEST, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.ANSWERING_QUESTIONS, _.COMMENTING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, _.BEHAVIOR_REGULATION, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.FACIAL_EXPRESSIONS, m.CONCRETE_SYMBOLS, m.ABSTRACT_SYMBOLS, m.USING_LANGUAGE, m.ACTIVATING_SWITCH])
        }, {
            name: "Inclusive Classroom Profile",
            studentCommunicationSkills: new Set([I.ADAPTATION_OF_ENVIRONMENT, I.SUPPORTING_COMMUNICATION, I.RESOLVING_CONFLICTS, I.CHILD_ADULT_RELATIONSHIPS, I.SUPPORTING_USE_OF_OBJECTS_MATERIALS, I.DEVELOPMENT_GROUP_ACTIVITIES, I.TRANSITIONING_FROM_ACTIVITY_TO_ANOTHER, I.PROGRESS_MONITORING, I.TEACHERS_PARTICIPATION_IN_ACTIVITY, I.RELATIONSHIPS_WITH_FAMILIES, I.MODELING_ACCEPTANCE_INDIVIDUAL_DIFFERENCES, k.OPPORTUNITIES_USE_MATERIALS, k.ACTIVITIES, k.MATERIALS_USED, k.PHYSICAL_SPACE, k.AAC_SYSTEM, $.ADULT_STUDENT_INTERACTIONS, $.STUDENT_STUDENT_INTERACTIONS])
        }, {
            name: "CSI-CY",
            studentCommunicationSkills: new Set([I.ADAPTATION_OF_ENVIRONMENT, I.SUPPORTING_COMMUNICATION, I.RESOLVING_CONFLICTS, I.SUPPORTING_USE_OF_OBJECTS_MATERIALS, _.REQUESTING_MORE, _.PROTEST, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.ANSWERING_QUESTIONS, _.COMMENTING, _.LABELING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, _.BEHAVIOR_REGULATION, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.FACIAL_EXPRESSIONS, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONVENTIONAL_VOCALIZATIONS, m.CONCRETE_SYMBOLS, m.ABSTRACT_LANGUAGE, m.ACTIVATING_SWITCH, k.OPPORTUNITIES_USE_MATERIALS, k.ACTIVITIES, k.MATERIALS_USED, k.PHYSICAL_SPACE, k.AAC_SYSTEM, $.COMMUNICATION_OPPORTUNITIES, $.ADULT_STUDENT_INTERACTIONS, $.STUDENT_STUDENT_INTERACTIONS, $.CHILDS_SOCIAL_COMMUNICATION_SYSTEM])
        }, {
            name: "MOSAIC",
            studentCommunicationSkills: new Set([I.SUPPORTING_COMMUNICATION, O.PROMPTING, O.ASKING_QUESTIONS, _.REQUESTING_MORE, _.PROTEST, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.ANSWERING_QUESTIONS, _.COMMENTING, _.LABELING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, _.BEHAVIOR_REGULATION, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.FACIAL_EXPRESSIONS, m.LOOKING_AT_SOMEONE_SOMETHING, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONVENTIONAL_VOCALIZATIONS, m.CONCRETE_SYMBOLS, m.ABSTRACT_LANGUAGE, m.USING_LANGUAGE, k.OPPORTUNITIES_USE_MATERIALS, k.ACTIVITIES, k.MATERIALS_USED, k.PHYSICAL_SPACE, k.AAC_SYSTEM, $.COMMUNICATION_OPPORTUNITIES, $.ADULT_STUDENT_INTERACTIONS, $.STUDENT_STUDENT_INTERACTIONS, $.CHILDS_SOCIAL_COMMUNICATION_SYSTEM])
        }, {
            name: "WIAT",
            studentCommunicationSkills: new Set([_.REQUESTING_MORE, _.PROTEST, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.ANSWERING_QUESTIONS, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, _.BEHAVIOR_REGULATION, m.BODY_MOVEMENTS, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONCRETE_SYMBOLS, m.ABSTRACT_LANGUAGE, m.ACTIVATING_SWITCH, m.USING_LANGUAGE, k.OPPORTUNITIES_USE_MATERIALS, k.ACTIVITIES, k.MATERIALS_USED, k.PHYSICAL_SPACE, $.COMMUNICATION_OPPORTUNITIES, $.ADULT_STUDENT_INTERACTIONS, $.STUDENT_STUDENT_INTERACTIONS])
        }, {
            name: "ELLCO",
            studentCommunicationSkills: new Set([I.ADAPTATION_OF_ENVIRONMENT, I.SUPPORTING_COMMUNICATION, I.RESOLVING_CONFLICTS, I.CHILD_ADULT_RELATIONSHIPS, I.SUPPORTING_USE_OF_OBJECTS_MATERIALS, I.DEVELOPMENT_GROUP_ACTIVITIES, I.TEACHERS_PARTICIPATION_IN_ACTIVITY, I.MODELING_ACCEPTANCE_INDIVIDUAL_DIFFERENCES, O.OFFERING_EXPLANATIONS, O.PROVIDING_SPOKEN_WRITTEN_DIRECTIONS, O.DEFINING_KEY_TERMS, O.MODELING, O.CORRECTING_ERRORS, O.PROMPTING, O.ASKING_QUESTIONS, O.TEACHER_TEACHER_INTERACTIONS, O.PRAISE, O.ACTIVATING_BACKGROUND_KNOWLEDGE, k.OPPORTUNITIES_USE_MATERIALS, k.ACTIVITIES, k.MATERIALS_USED, k.PHYSICAL_SPACE, $.COMMUNICATION_OPPORTUNITIES, $.ADULT_STUDENT_INTERACTIONS, $.STUDENT_STUDENT_INTERACTIONS, $.TEACHER_TEACHER_INTERACTIONS])
        }, {
            name: "SETT Framework",
            studentCommunicationSkills: new Set([I.SUPPORTING_COMMUNICATION, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.BEHAVIOR_REGULATION, m.BODY_MOVEMENTS, m.CONVENTIONAL_VOCALIZATIONS, m.USING_LANGUAGE, k.OPPORTUNITIES_USE_MATERIALS, k.ACTIVITIES, k.MATERIALS_USED, k.PHYSICAL_SPACE, k.AAC_SYSTEM, $.COMMUNICATION_OPPORTUNITIES, $.ADULT_STUDENT_INTERACTIONS, $.STUDENT_STUDENT_INTERACTIONS, $.CHILDS_SOCIAL_COMMUNICATION_SYSTEM])
        }, {
            name: "QUAD Profile",
            studentCommunicationSkills: new Set([_.REQUESTING_MORE, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.COMMENTING, _.LABELING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, _.BEHAVIOR_REGULATION, m.CONCRETE_SYMBOLS, m.ABSTRACT_SYMBOLS, m.USING_LANGUAGE])
        }, {
            name: "Functional Communication Profile - Revised",
            studentCommunicationSkills: new Set([_.REQUESTING_MORE, _.PROTEST, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.ANSWERING_QUESTIONS, _.COMMENTING, _.LABELING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, _.BEHAVIOR_REGULATION, m.EARLY_SOUNDS, m.FACIAL_EXPRESSIONS, m.LOOKING_AT_SOMEONE_SOMETHING, m.CONVENTIONAL_VOCALIZATIONS, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONCRETE_SYMBOLS, m.ABSTRACT_LANGUAGE, m.USING_LANGUAGE, m.USING_ECHOLALIA])
        }, {
            name: "CLASS",
            studentCommunicationSkills: new Set([I.ADAPTATION_OF_ENVIRONMENT, I.SUPPORTING_COMMUNICATION, I.RESOLVING_CONFLICTS, I.CHILD_ADULT_RELATIONSHIPS, I.TRANSITIONING_FROM_ACTIVITY_TO_ANOTHER, I.PROGRESS_MONITORING, I.TEACHERS_PARTICIPATION_IN_ACTIVITY, I.MODELING_ACCEPTANCE_INDIVIDUAL_DIFFERENCES, O.PROVIDING_SPOKEN_WRITTEN_DIRECTIONS, O.MODELING, O.CORRECTING_ERRORS, O.GUIDED_PRACTICES, O.PROMPTING, O.ASKING_QUESTIONS, O.PRAISE, O.ACTIVATING_BACKGROUND_KNOWLEDGE, O.OFFERING_CHOICES, k.OPPORTUNITIES_USE_MATERIALS, k.ACTIVITIES, $.COMMUNICATION_OPPORTUNITIES, $.ADULT_STUDENT_INTERACTIONS, $.STUDENT_STUDENT_INTERACTIONS])
        }, {
            name: "Pragmatics Profile for People who use AAC",
            studentCommunicationSkills: new Set([_.REQUESTING_MORE, _.PROTEST, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.ANSWERING_QUESTIONS, _.COMMENTING, _.LABELING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.FACIAL_EXPRESSIONS, m.LOOKING_AT_SOMEONE_SOMETHING, m.CONVENTIONAL_VOCALIZATIONS, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONCRETE_SYMBOLS, m.ABSTRACT_SYMBOLS, m.USING_LANGUAGE, m.ACTIVATING_SWITCH])
        }, {
            name: "Pragmatics Profile of Everyday Communication Skills in Children",
            studentCommunicationSkills: new Set([_.REQUESTING_MORE, _.PROTEST, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.ANSWERING_QUESTIONS, _.COMMENTING, _.LABELING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.FACIAL_EXPRESSIONS, m.LOOKING_AT_SOMEONE_SOMETHING, m.CONVENTIONAL_VOCALIZATIONS, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.USING_LANGUAGE])
        }, {
            name: "Pre Verbal Communication Schedule",
            studentCommunicationSkills: new Set([_.REQUESTING_MORE, _.PROTEST, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.LABELING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, _.BEHAVIOR_REGULATION, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.FACIAL_EXPRESSIONS, m.LOOKING_AT_SOMEONE_SOMETHING, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONCRETE_SYMBOLS, m.ABSTRACT_SYMBOLS])
        }, {
            name: "M-COSMIC",
            studentCommunicationSkills: new Set([I.SUPPORTING_COMMUNICATION, I.SUPPORTING_USE_OF_OBJECTS_MATERIALS, I.DEVELOPMENT_GROUP_ACTIVITIES, I.TRANSITIONING_FROM_ACTIVITY_TO_ANOTHER, O.PROVIDING_SPOKEN_WRITTEN_DIRECTIONS, O.MODELING, O.PROMPTING, _.PROTEST, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.COMMENTING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, _.BEHAVIOR_REGULATION, m.BODY_MOVEMENTS, m.LOOKING_AT_SOMEONE_SOMETHING, m.CONVENTIONAL_GESTURES, m.CONVENTIONAL_VOCALIZATIONS, m.USING_LANGUAGE])
        }, {
            name: "Social Networks Inventory",
            studentCommunicationSkills: new Set([I.SUPPORTING_COMMUNICATION, _.PARTICIPATING_SOCIAL_INTERACTIONS, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.FACIAL_EXPRESSIONS, m.LOOKING_AT_SOMEONE_SOMETHING, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONCRETE_SYMBOLS, m.ABSTRACT_SYMBOLS, m.USING_LANGUAGE, m.ACTIVATING_SWITCH])
        }, {
            name: "Test of Early Communication and Emerging Language Informal Assessment portion",
            studentCommunicationSkills: new Set([_.PROTEST, _.REQUESTING_MORE, _.REQUESTING_NEW, _.ANSWERING_QUESTIONS, _.COMMENTING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.BEHAVIOR_REGULATION, m.LOOKING_AT_SOMEONE_SOMETHING, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONCRETE_SYMBOLS, m.ABSTRACT_SYMBOLS, m.USING_LANGUAGE, m.ACTIVATING_SWITCH])
        }, {
            name: "Unstructured Language Sampling",
            studentCommunicationSkills: new Set([_.REQUESTING_MORE, _.REQUESTING_NEW, _.PARTICIPATING_SOCIAL_INTERACTIONS, m.EARLY_SOUNDS, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONVENTIONAL_VOCALIZATIONS, m.CONCRETE_SYMBOLS, m.ABSTRACT_SYMBOLS, m.USING_LANGUAGE, m.ACTIVATING_SWITCH, m.USING_ECHOLALIA])
        }, {
            name: "ECERS-3",
            studentCommunicationSkills: new Set([I.ADAPTATION_OF_ENVIRONMENT, I.SUPPORTING_COMMUNICATION, I.CHILD_ADULT_RELATIONSHIPS, I.SUPPORTING_USE_OF_OBJECTS_MATERIALS, I.DEVELOPMENT_GROUP_ACTIVITIES, I.TRANSITIONING_FROM_ACTIVITY_TO_ANOTHER, I.TEACHERS_PARTICIPATION_IN_ACTIVITY, I.MODELING_ACCEPTANCE_INDIVIDUAL_DIFFERENCES, O.MODELING, O.ASKING_QUESTIONS, k.OPPORTUNITIES_USE_MATERIALS, k.ACTIVITIES, k.MATERIALS_USED, k.PHYSICAL_SPACE, $.COMMUNICATION_OPPORTUNITIES, $.ADULT_STUDENT_INTERACTIONS, $.STUDENT_STUDENT_INTERACTIONS])
        }, {
            name: "Design to Learn Inventory",
            studentCommunicationSkills: new Set([I.SUPPORTING_COMMUNICATION, I.CHILD_ADULT_RELATIONSHIPS, I.SUPPORTING_USE_OF_OBJECTS_MATERIALS, I.DEVELOPMENT_GROUP_ACTIVITIES, I.TRANSITIONING_FROM_ACTIVITY_TO_ANOTHER, I.PROGRESS_MONITORING, I.TEACHERS_PARTICIPATION_IN_ACTIVITY, O.ASKING_QUESTIONS, _.PROTEST, _.REQUESTING_MORE, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.COMMENTING, _.LABELING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, k.OPPORTUNITIES_USE_MATERIALS, k.ACTIVITIES, k.MATERIALS_USED, k.PHYSICAL_SPACE, k.AAC_SYSTEM, $.COMMUNICATION_OPPORTUNITIES, $.ADULT_STUDENT_INTERACTIONS, $.STUDENT_STUDENT_INTERACTIONS, $.CHILDS_SOCIAL_COMMUNICATION_SYSTEM])
        }, {
            name: "TPOT",
            studentCommunicationSkills: new Set([I.ADAPTATION_OF_ENVIRONMENT, I.SUPPORTING_COMMUNICATION, I.RESOLVING_CONFLICTS, I.CHILD_ADULT_RELATIONSHIPS, I.SUPPORTING_USE_OF_OBJECTS_MATERIALS, I.DEVELOPMENT_GROUP_ACTIVITIES, I.TRANSITIONING_FROM_ACTIVITY_TO_ANOTHER, I.TEACHERS_PARTICIPATION_IN_ACTIVITY, I.MODELING_ACCEPTANCE_INDIVIDUAL_DIFFERENCES, O.PROVIDING_SPOKEN_WRITTEN_DIRECTIONS, O.DEFINING_KEY_TERMS, O.MODELING, O.CORRECTING_ERRORS, O.GUIDED_PRACTICES, O.PROMPTING, O.ASKING_QUESTIONS, O.TEACHER_TEACHER_INTERACTIONS, O.PRAISE, k.OPPORTUNITIES_USE_MATERIALS, k.ACTIVITIES, k.MATERIALS_USED, k.PHYSICAL_SPACE, k.AAC_SYSTEM, $.COMMUNICATION_OPPORTUNITIES, $.ADULT_STUDENT_INTERACTIONS, $.STUDENT_STUDENT_INTERACTIONS, $.CHILDS_SOCIAL_COMMUNICATION_SYSTEM])
        }, {
            name: "ENGAGE",
            studentCommunicationSkills: new Set([I.ADAPTATION_OF_ENVIRONMENT, I.SUPPORTING_COMMUNICATION, I.CHILD_ADULT_RELATIONSHIPS, I.SUPPORTING_USE_OF_OBJECTS_MATERIALS, O.PROVIDING_SPOKEN_WRITTEN_DIRECTIONS, O.MODELING, O.CORRECTING_ERRORS, O.GUIDED_PRACTICES, O.PROMPTING, O.ASKING_QUESTIONS, O.PRAISE, O.ACTIVATING_BACKGROUND_KNOWLEDGE, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.LOOKING_AT_SOMEONE_SOMETHING, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONVENTIONAL_VOCALIZATIONS, m.CONCRETE_SYMBOLS, m.ABSTRACT_SYMBOLS, m.USING_LANGUAGE])
        }, {
            name: "DAGG-2",
            studentCommunicationSkills: new Set([_.REQUESTING_MORE, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, _.BEHAVIOR_REGULATION, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.FACIAL_EXPRESSIONS, m.LOOKING_AT_SOMEONE_SOMETHING, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONVENTIONAL_VOCALIZATIONS, m.CONCRETE_SYMBOLS, m.ABSTRACT_SYMBOLS, m.USING_LANGUAGE])
        }, {
            name: "INCH",
            studentCommunicationSkills: new Set([_.REQUESTING_MORE, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, _.BEHAVIOR_REGULATION, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.FACIAL_EXPRESSIONS, m.LOOKING_AT_SOMEONE_SOMETHING, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONVENTIONAL_VOCALIZATIONS, m.CONCRETE_SYMBOLS, m.ABSTRACT_SYMBOLS, m.USING_LANGUAGE])
        }, {
            name: "Oregon Project",
            studentCommunicationSkills: new Set([_.PROTEST, _.REQUESTING_MORE, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.ANSWERING_QUESTIONS, _.COMMENTING, _.LABELING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, _.BEHAVIOR_REGULATION, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONVENTIONAL_VOCALIZATIONS, m.USING_LANGUAGE])
        }, {
            name: "IPCA",
            studentCommunicationSkills: new Set([_.PROTEST, _.REQUESTING_MORE, _.REQUESTING_NEW, _.ASKING_QUESTIONS, _.ANSWERING_QUESTIONS, _.COMMENTING, _.LABELING, _.PARTICIPATING_SOCIAL_INTERACTIONS, _.JOINT_ATTENTION, _.BEHAVIOR_REGULATION, m.EARLY_SOUNDS, m.BODY_MOVEMENTS, m.SIMPLE_GESTURES, m.CONVENTIONAL_GESTURES, m.CONVENTIONAL_VOCALIZATIONS, m.USING_LANGUAGE])
        }, {
            name: "Barker et al.",
            studentCommunicationSkills: new Set([I.SUPPORTING_COMMUNICATION, O.CORRECTING_ERRORS, O.PROMPTING, O.ASKING_QUESTIONS, O.PRAISE])
        }];
        let fB = (()=>{
            class n {
                constructor() {
                    this.Sensory = Object.values(_),
                    this.Cognition = Object.values(m),
                    this.Motor = Object.values(I),
                    this.Speech = Object.values(O),
                    this.Language = Object.values(k),
                    this.Literacy = Object.values($),
                    this.CareGiver = Object.values(tts),
                    this.assessments = hB,
                    this.selectedSkills = new Set,
                    this.remainingSkills = new Set,
                    this.matchingAssessments = new Set
                }
                ngOnInit() {
                    this.updateRemainingSkills()
                }
                toggleSkill(t) {
                    !this.remainingSkills.has(t) || (this.selectedSkills.has(t) ? this.selectedSkills.delete(t) : this.selectedSkills.add(t),
                    this.updateRemainingSkills())
                }
                resetFilters() {
                    this.selectedSkills.clear(),
                    this.updateRemainingSkills()
                }
                updateRemainingSkills() {
                    this.remainingSkills.clear(),
                    this.matchingAssessments.clear();
                    for (const t of this.assessments)
                        if (this.assessmentHasSelectedSkills(t)) {
                            for (const r of t.studentCommunicationSkills)
                                this.remainingSkills.add(r);
                            this.matchingAssessments.add(t)
                        }
                }
                assessmentHasSelectedSkills(t) {
                    for (const r of this.selectedSkills)
                        if (!t.studentCommunicationSkills.has(r))
                            return !1;
                    return !0
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275cmp = li({
                type: n,
                selectors: [["app-root"]],
                decls: 46,
                vars: 7,
                consts: [["role", "banner", 1, "toolbar"], [2, "padding-left", "20px"], ["role", "main", 1, "content"], [2, "margin-top", "15px"], ["mat-stroked-button", "", 3, "click"], ["selectable", "true", "multiple", "true"], ["color", "primary", 3, "selected", "disabled", "click", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], ["color", "primary", 3, "selected", "disabled", "click"], [2, "font-size", "20px"]],
                template: function(t, r) {
                    1 & t && (re(0, "div", 0)(1, "span", 1),
                    Ne(2, "Communication Assessment and Feature Matching Filter"),
                    ie()(),
                    re(3, "div", 2)(4, "h3"),
                    Ne(5, "Instructions"),
                    ie(),
                    re(6, "p"),
                    Ne(7, " Select assessment characteristics below to filter the matching assessments below. "),
                    ie(),
                    re(8, "div", 3)(9, "button", 4),
                    De("click", function() {
                        return r.resetFilters()
                    }),
                    Ne(10, "Reset Filters"),
                    ie()(),
                    re(11, "h2"),
                    Ne(12, "Student Communication Skills"),
                    ie(),
                    re(13, "h3"),
                    Ne(14, "Sensory"),
                    ie(),
                    re(15, "mat-chip-list", 5),
                    cr(16, oB, 2, 3, "mat-chip", 6),
                    ie(),
                    re(17, "h3"),
                    Ne(18, "Cognition"),
                    ie(),
                    re(19, "mat-chip-list", 5),
                    cr(20, sB, 2, 3, "mat-chip", 6),
                    ie(),
                    re(21, "h3"),
                    Ne(22, "Motor"),
                    ie(),
                    re(23, "mat-chip-list", 5),
                    cr(24, aB, 2, 3, "mat-chip", 6),
                    ie(),
                    re(25, "h3"),
                    Ne(26, "Speech"),
                    ie(),
                    re(27, "mat-chip-list", 5),
                    cr(28, lB, 2, 3, "mat-chip", 6),
                    ie(),
                    re(29, "h3"),
                    Ne(30, "Language"),
                    ie(),
                    re(31, "mat-chip-list", 5),
                    cr(32, uB, 2, 3, "mat-chip", 6),
                    ie(),
                    re(33, "h3"),
                    Ne(34, "Literacy"),
                    ie(),
                    re(35, "mat-chip-list", 5),
                    cr(36, cB, 2, 3, "mat-chip", 6),
                    ie(),
                    re(37, "h3"),
                    Ne(38, "Care Giver"),
                    ie(),
                    re(39, "mat-chip-list", 5),
                    cr(40, ttB, 2, 3, "mat-chip", 6),
                    ie(),
                    re(41, "h3"),
                    Ne(42, "Matching AAC Assessments"),
                    ie(),
                    re(43, "ul"),
                    cr(44, dB, 4, 3, "ng-container", 7),
                    ie()(),
                    Qo(45, "router-outlet")),
                    2 & t && (Ye(16),
                    ot("ngForOf", r.Sensory),
                    Ye(4),
                    ot("ngForOf", r.Cognition),
                    Ye(6),
                    ot("ngForOf", r.Motor),
                    Ye(4),
                    ot("ngForOf", r.Speech),
                    Ye(6),
                    ot("ngForOf", r.Language),
                    Ye(4),
                    ot("ngForOf", r.Literacy),
                    Ye(4),
                    ot("ngForOf", r.CareGiver),
                    Ye(4),
                    ot("ngForOf", r.assessments))
                },
                dependencies: [GE, Rf, c1, cD, Bl],
                styles: ['[_nghost-%COMP%] {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n    font-size: 14px;\n    color: #333;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%] {\n    margin: 8px 0;\n  }\n\n  p[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n\n  .spacer[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .toolbar[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 8px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%]:hover, .toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%]:hover {\n    opacity: 0.8;\n  }\n\n  .content[_ngcontent-%COMP%] {\n    display: flex;\n    margin: 82px auto 32px;\n    padding: 0 16px;\n    max-width: 960px;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%] {\n    height: 24px;\n    width: auto;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 8px;\n  }\n\n  .card[_ngcontent-%COMP%]   svg.material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: #888;\n  }\n\n  .card-container[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    margin-top: 16px;\n  }\n\n  .card[_ngcontent-%COMP%] {\n    all: unset;\n    border-radius: 4px;\n    border: 1px solid #eee;\n    background-color: #fafafa;\n    height: 40px;\n    width: 200px;\n    margin: 0 8px 16px;\n    padding: 16px;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    transition: all 0.2s ease-in-out;\n    line-height: 24px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 0;\n  }\n\n  .card.card-small[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 168px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card) {\n    cursor: pointer;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover {\n    transform: translateY(-3px);\n    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover   .material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: rgb(105, 103, 103);\n  }\n\n  .card.highlight-card[_ngcontent-%COMP%] {\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n    border: none;\n    width: auto;\n    min-width: 30%;\n    position: relative;\n  }\n\n  .card.card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-left: 60px;\n  }\n\n  svg#rocket[_ngcontent-%COMP%] {\n    width: 80px;\n    position: absolute;\n    left: -10px;\n    top: -24px;\n  }\n\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    height: calc(100vh - 95px);\n    position: absolute;\n    top: 10px;\n    right: 180px;\n    z-index: -10;\n  }\n\n  a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover {\n    color: #1976d2;\n    text-decoration: none;\n  }\n\n  a[_ngcontent-%COMP%]:hover {\n    color: #125699;\n  }\n\n  .terminal[_ngcontent-%COMP%] {\n    position: relative;\n    width: 80%;\n    max-width: 600px;\n    border-radius: 6px;\n    padding-top: 45px;\n    margin-top: 8px;\n    overflow: hidden;\n    background-color: rgb(15, 15, 16);\n  }\n\n  .terminal[_ngcontent-%COMP%]::before {\n    content: "\\2022 \\2022 \\2022";\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 4px;\n    background: rgb(58, 58, 58);\n    color: #c2c3c4;\n    width: 100%;\n    font-size: 2rem;\n    line-height: 0;\n    padding: 14px 0;\n    text-indent: 4px;\n  }\n\n  .terminal[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;\n    color: white;\n    padding: 0 1rem 1rem;\n    margin: 0;\n  }\n\n  .circle-link[_ngcontent-%COMP%] {\n    height: 40px;\n    width: 40px;\n    border-radius: 40px;\n    margin: 8px;\n    background-color: white;\n    border: 1px solid #eeeeee;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: 1s ease-out;\n  }\n\n  .circle-link[_ngcontent-%COMP%]:hover {\n    transform: translateY(-0.25rem);\n    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n  }\n\n  footer[_ngcontent-%COMP%] {\n    margin-top: 8px;\n    display: flex;\n    align-items: center;\n    line-height: 20px;\n  }\n\n  footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%] {\n    color: #24292e;\n    display: flex;\n    align-items: center;\n    font-size: 12px;\n    padding: 3px 10px;\n    border: 1px solid rgba(27,31,35,.2);\n    border-radius: 3px;\n    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);\n    margin-left: 4px;\n    font-weight: 600;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]:hover {\n    background-image: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);\n    border-color: rgba(27,31,35,.35);\n    background-position: -.5em;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 16px;\n    margin-right: 4px;\n  }\n\n  svg#clouds[_ngcontent-%COMP%] {\n    position: fixed;\n    bottom: -160px;\n    left: -230px;\n    z-index: -10;\n    width: 1920px;\n  }\n\n  \n  @media screen and (max-width: 767px) {\n    .card-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.circle-link), .terminal[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n\n    .card[_ngcontent-%COMP%]:not(.highlight-card) {\n      height: 16px;\n      margin: 8px 0;\n    }\n\n    .card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      margin-left: 72px;\n    }\n\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      right: 120px;\n      transform: rotate(-5deg);\n    }\n  }\n\n  @media screen and (max-width: 575px) {\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      display: none;\n      visibility: hidden;\n    }\n  }']
            }),
            n
        }
        )();
        function bS(n) {
            return new b(3e3,!1)
        }
        function KB() {
            return typeof window < "u" && typeof window.document < "u"
        }
        function qf() {
            return typeof process < "u" && "[object process]" === {}.toString.call(process)
        }
        function Cr(n) {
            switch (n.length) {
            case 0:
                return new ws;
            case 1:
                return n[0];
            default:
                return new oD(n)
            }
        }
        function DS(n, e, t, r, i=new Map, o=new Map) {
            const s = []
              , a = [];
            let l = -1
              , u = null;
            if (r.forEach(c=>{
                const d = c.get("offset")
                  , h = d == l
                  , f = h && u || new Map;
                c.forEach((p,g)=>{
                    let y = g
                      , C = p;
                    if ("offset" !== g)
                        switch (y = e.normalizePropertyName(y, s),
                        C) {
                        case "!":
                            C = i.get(g);
                            break;
                        case Yn:
                            C = o.get(g);
                            break;
                        default:
                            C = e.normalizeStyleValue(g, y, C, s)
                        }
                    f.set(y, C)
                }
                ),
                h || a.push(f),
                u = f,
                l = d
            }
            ),
            s.length)
                throw function kB(n) {
                    return new b(3502,!1)
                }();
            return a
        }
        function Kf(n, e, t, r) {
            switch (e) {
            case "start":
                n.onStart(()=>r(t && Qf(t, "start", n)));
                break;
            case "done":
                n.onDone(()=>r(t && Qf(t, "done", n)));
                break;
            case "destroy":
                n.onDestroy(()=>r(t && Qf(t, "destroy", n)))
            }
        }
        function Qf(n, e, t) {
            const o = Yf(n.element, n.triggerName, n.fromState, n.toState, e || n.phaseName, t.totalTime ?? n.totalTime, !!t.disabled)
              , s = n._data;
            return null != s && (o._data = s),
            o
        }
        function Yf(n, e, t, r, i="", o=0, s) {
            return {
                element: n,
                triggerName: e,
                fromState: t,
                toState: r,
                phaseName: i,
                totalTime: o,
                disabled: !!s
            }
        }
        function Pt(n, e, t) {
            let r = n.get(e);
            return r || n.set(e, r = t),
            r
        }
        function SS(n) {
            const e = n.indexOf(":");
            return [n.substring(1, e), n.slice(e + 1)]
        }
        let Zf = (n,e)=>!1
          , IS = (n,e,t)=>[]
          , TS = null;
        function Xf(n) {
            const e = n.parentNode || n.host;
            return e === TS ? null : e
        }
        (qf() || typeof Element < "u") && (KB() ? (TS = (()=>document.documentElement)(),
        Zf = (n,e)=>{
            for (; e; ) {
                if (e === n)
                    return !0;
                e = Xf(e)
            }
            return !1
        }
        ) : Zf = (n,e)=>n.contains(e),
        IS = (n,e,t)=>{
            if (t)
                return Array.from(n.querySelectorAll(e));
            const r = n.querySelector(e);
            return r ? [r] : []
        }
        );
        let ti = null
          , wS = !1;
        const AS = Zf
          , MS = IS;
        let NS = (()=>{
            class n {
                validateStyleProperty(t) {
                    return function YB(n) {
                        ti || (ti = function ZB() {
                            return typeof document < "u" ? document.body : null
                        }() || {},
                        wS = !!ti.style && "WebkitAppearance"in ti.style);
                        let e = !0;
                        return ti.style && !function QB(n) {
                            return "ebkit" == n.substring(1, 6)
                        }(n) && (e = n in ti.style,
                        !e && wS && (e = "Webkit" + n.charAt(0).toUpperCase() + n.slice(1)in ti.style)),
                        e
                    }(t)
                }
                matchesElement(t, r) {
                    return !1
                }
                containsElement(t, r) {
                    return AS(t, r)
                }
                getParentElement(t) {
                    return Xf(t)
                }
                query(t, r, i) {
                    return MS(t, r, i)
                }
                computeStyle(t, r, i) {
                    return i || ""
                }
                animate(t, r, i, o, s, a=[], l) {
                    return new ws(i,o)
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac
            }),
            n
        }
        )()
          , Jf = (()=>{
            class n {
            }
            return n.NOOP = new NS,
            n
        }
        )();
        const ep = "ng-enter"
          , uu = "ng-leave"
          , cu = "ng-trigger"
          , du = ".ng-trigger"
          , RS = "ng-animating"
          , tp = ".ng-animating";
        function Jn(n) {
            if ("number" == typeof n)
                return n;
            const e = n.match(/^(-?[\.\d]+)(m?s)/);
            return !e || e.length < 2 ? 0 : np(parseFloat(e[1]), e[2])
        }
        function np(n, e) {
            return "s" === e ? 1e3 * n : n
        }
        function hu(n, e, t) {
            return n.hasOwnProperty("duration") ? n : function e2(n, e, t) {
                let i, o = 0, s = "";
                if ("string" == typeof n) {
                    const a = n.match(/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
                    if (null === a)
                        return e.push(bS()),
                        {
                            duration: 0,
                            delay: 0,
                            easing: ""
                        };
                    i = np(parseFloat(a[1]), a[2]);
                    const l = a[3];
                    null != l && (o = np(parseFloat(l), a[4]));
                    const u = a[5];
                    u && (s = u)
                } else
                    i = n;
                if (!t) {
                    let a = !1
                      , l = e.length;
                    i < 0 && (e.push(function pB() {
                        return new b(3100,!1)
                    }()),
                    a = !0),
                    o < 0 && (e.push(function mB() {
                        return new b(3101,!1)
                    }()),
                    a = !0),
                    a && e.splice(l, 0, bS())
                }
                return {
                    duration: i,
                    delay: o,
                    easing: s
                }
            }(n, e, t)
        }
        function js(n, e={}) {
            return Object.keys(n).forEach(t=>{
                e[t] = n[t]
            }
            ),
            e
        }
        function xS(n) {
            const e = new Map;
            return Object.keys(n).forEach(t=>{
                e.set(t, n[t])
            }
            ),
            e
        }
        function br(n, e=new Map, t) {
            if (t)
                for (let[r,i] of t)
                    e.set(r, i);
            for (let[r,i] of n)
                e.set(r, i);
            return e
        }
        function PS(n, e, t) {
            return t ? e + ":" + t + ";" : ""
        }
        function kS(n) {
            let e = "";
            for (let t = 0; t < n.style.length; t++) {
                const r = n.style.item(t);
                e += PS(0, r, n.style.getPropertyValue(r))
            }
            for (const t in n.style)
                n.style.hasOwnProperty(t) && !t.startsWith("_") && (e += PS(0, o2(t), n.style[t]));
            n.setAttribute("style", e)
        }
        function Mn(n, e, t) {
            n.style && (e.forEach((r,i)=>{
                const o = ip(i);
                t && !t.has(i) && t.set(i, n.style[o]),
                n.style[o] = r
            }
            ),
            qf() && kS(n))
        }
        function ni(n, e) {
            n.style && (e.forEach((t,r)=>{
                const i = ip(r);
                n.style[i] = ""
            }
            ),
            qf() && kS(n))
        }
        function Gs(n) {
            return Array.isArray(n) ? 1 == n.length ? n[0] : rD(n) : n
        }
        const rp = new RegExp("{{\\s*(.+?)\\s*}}","g");
        function LS(n) {
            let e = [];
            if ("string" == typeof n) {
                let t;
                for (; t = rp.exec(n); )
                    e.push(t[1]);
                rp.lastIndex = 0
            }
            return e
        }
        function $s(n, e, t) {
            const r = n.toString()
              , i = r.replace(rp, (o,s)=>{
                let a = e[s];
                return null == a && (t.push(function _B(n) {
                    return new b(3003,!1)
                }()),
                a = ""),
                a.toString()
            }
            );
            return i == r ? n : i
        }
        function fu(n) {
            const e = [];
            let t = n.next();
            for (; !t.done; )
                e.push(t.value),
                t = n.next();
            return e
        }
        const r2 = /-+([a-z0-9])/g;
        function ip(n) {
            return n.replace(r2, (...e)=>e[1].toUpperCase())
        }
        function o2(n) {
            return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
        }
        function kt(n, e, t) {
            switch (e.type) {
            case 7:
                return n.visitTrigger(e, t);
            case 0:
                return n.visitState(e, t);
            case 1:
                return n.visitTransition(e, t);
            case 2:
                return n.visitSequence(e, t);
            case 3:
                return n.visitGroup(e, t);
            case 4:
                return n.visitAnimate(e, t);
            case 5:
                return n.visitKeyframes(e, t);
            case 6:
                return n.visitStyle(e, t);
            case 8:
                return n.visitReference(e, t);
            case 9:
                return n.visitAnimateChild(e, t);
            case 10:
                return n.visitAnimateRef(e, t);
            case 11:
                return n.visitQuery(e, t);
            case 12:
                return n.visitStagger(e, t);
            default:
                throw function yB(n) {
                    return new b(3004,!1)
                }()
            }
        }
        function VS(n, e) {
            return window.getComputedStyle(n)[e]
        }
        function d2(n, e) {
            const t = [];
            return "string" == typeof n ? n.split(/\s*,\s*/).forEach(r=>function h2(n, e, t) {
                if (":" == n[0]) {
                    const l = function f2(n, e) {
                        switch (n) {
                        case ":enter":
                            return "void => *";
                        case ":leave":
                            return "* => void";
                        case ":increment":
                            return (t,r)=>parseFloat(r) > parseFloat(t);
                        case ":decrement":
                            return (t,r)=>parseFloat(r) < parseFloat(t);
                        default:
                            return e.push(function RB(n) {
                                return new b(3016,!1)
                            }()),
                            "* => *"
                        }
                    }(n, t);
                    if ("function" == typeof l)
                        return void e.push(l);
                    n = l
                }
                const r = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                if (null == r || r.length < 4)
                    return t.push(function OB(n) {
                        return new b(3015,!1)
                    }()),
                    e;
                const i = r[1]
                  , o = r[2]
                  , s = r[3];
                e.push(US(i, s));
                "<" == o[0] && !("*" == i && "*" == s) && e.push(US(s, i))
            }(r, t, e)) : t.push(n),
            t
        }
        const _u = new Set(["true", "1"])
          , yu = new Set(["false", "0"]);
        function US(n, e) {
            const t = _u.has(n) || yu.has(n)
              , r = _u.has(e) || yu.has(e);
            return (i,o)=>{
                let s = "*" == n || n == i
                  , a = "*" == e || e == o;
                return !s && t && "boolean" == typeof i && (s = i ? _u.has(n) : yu.has(n)),
                !a && r && "boolean" == typeof o && (a = o ? _u.has(e) : yu.has(e)),
                s && a
            }
        }
        const p2 = new RegExp("s*:selfs*,?","g");
        function op(n, e, t, r) {
            return new m2(n).build(e, t, r)
        }
        class m2 {
            constructor(e) {
                this._driver = e
            }
            build(e, t, r) {
                const i = new y2(t);
                return this._resetContextStyleTimingState(i),
                kt(this, Gs(e), i)
            }
            _resetContextStyleTimingState(e) {
                e.currentQuerySelector = "",
                e.collectedStyles = new Map,
                e.collectedStyles.set("", new Map),
                e.currentTime = 0
            }
            visitTrigger(e, t) {
                let r = t.queryCount = 0
                  , i = t.depCount = 0;
                const o = []
                  , s = [];
                return "@" == e.name.charAt(0) && t.errors.push(function EB() {
                    return new b(3006,!1)
                }()),
                e.definitions.forEach(a=>{
                    if (this._resetContextStyleTimingState(t),
                    0 == a.type) {
                        const l = a
                          , u = l.name;
                        u.toString().split(/\s*,\s*/).forEach(c=>{
                            l.name = c,
                            o.push(this.visitState(l, t))
                        }
                        ),
                        l.name = u
                    } else if (1 == a.type) {
                        const l = this.visitTransition(a, t);
                        r += l.queryCount,
                        i += l.depCount,
                        s.push(l)
                    } else
                        t.errors.push(function CB() {
                            return new b(3007,!1)
                        }())
                }
                ),
                {
                    type: 7,
                    name: e.name,
                    states: o,
                    transitions: s,
                    queryCount: r,
                    depCount: i,
                    options: null
                }
            }
            visitState(e, t) {
                const r = this.visitStyle(e.styles, t)
                  , i = e.options && e.options.params || null;
                if (r.containsDynamicStyles) {
                    const o = new Set
                      , s = i || {};
                    r.styles.forEach(a=>{
                        a instanceof Map && a.forEach(l=>{
                            LS(l).forEach(u=>{
                                s.hasOwnProperty(u) || o.add(u)
                            }
                            )
                        }
                        )
                    }
                    ),
                    o.size && (fu(o.values()),
                    t.errors.push(function bB(n, e) {
                        return new b(3008,!1)
                    }()))
                }
                return {
                    type: 0,
                    name: e.name,
                    style: r,
                    options: i ? {
                        params: i
                    } : null
                }
            }
            visitTransition(e, t) {
                t.queryCount = 0,
                t.depCount = 0;
                const r = kt(this, Gs(e.animation), t);
                return {
                    type: 1,
                    matchers: d2(e.expr, t.errors),
                    animation: r,
                    queryCount: t.queryCount,
                    depCount: t.depCount,
                    options: ri(e.options)
                }
            }
            visitSequence(e, t) {
                return {
                    type: 2,
                    steps: e.steps.map(r=>kt(this, r, t)),
                    options: ri(e.options)
                }
            }
            visitGroup(e, t) {
                const r = t.currentTime;
                let i = 0;
                const o = e.steps.map(s=>{
                    t.currentTime = r;
                    const a = kt(this, s, t);
                    return i = Math.max(i, t.currentTime),
                    a
                }
                );
                return t.currentTime = i,
                {
                    type: 3,
                    steps: o,
                    options: ri(e.options)
                }
            }
            visitAnimate(e, t) {
                const r = function E2(n, e) {
                    if (n.hasOwnProperty("duration"))
                        return n;
                    if ("number" == typeof n)
                        return sp(hu(n, e).duration, 0, "");
                    const t = n;
                    if (t.split(/\s+/).some(o=>"{" == o.charAt(0) && "{" == o.charAt(1))) {
                        const o = sp(0, 0, "");
                        return o.dynamic = !0,
                        o.strValue = t,
                        o
                    }
                    const i = hu(t, e);
                    return sp(i.duration, i.delay, i.easing)
                }(e.timings, t.errors);
                t.currentAnimateTimings = r;
                let i, o = e.styles ? e.styles : Ul({});
                if (5 == o.type)
                    i = this.visitKeyframes(o, t);
                else {
                    let s = e.styles
                      , a = !1;
                    if (!s) {
                        a = !0;
                        const u = {};
                        r.easing && (u.easing = r.easing),
                        s = Ul(u)
                    }
                    t.currentTime += r.duration + r.delay;
                    const l = this.visitStyle(s, t);
                    l.isEmptyStep = a,
                    i = l
                }
                return t.currentAnimateTimings = null,
                {
                    type: 4,
                    timings: r,
                    style: i,
                    options: null
                }
            }
            visitStyle(e, t) {
                const r = this._makeStyleAst(e, t);
                return this._validateStyleAst(r, t),
                r
            }
            _makeStyleAst(e, t) {
                const r = []
                  , i = Array.isArray(e.styles) ? e.styles : [e.styles];
                for (let a of i)
                    "string" == typeof a ? a === Yn ? r.push(a) : t.errors.push(new b(3002,!1)) : r.push(xS(a));
                let o = !1
                  , s = null;
                return r.forEach(a=>{
                    if (a instanceof Map && (a.has("easing") && (s = a.get("easing"),
                    a.delete("easing")),
                    !o))
                        for (let l of a.values())
                            if (l.toString().indexOf("{{") >= 0) {
                                o = !0;
                                break
                            }
                }
                ),
                {
                    type: 6,
                    styles: r,
                    easing: s,
                    offset: e.offset,
                    containsDynamicStyles: o,
                    options: null
                }
            }
            _validateStyleAst(e, t) {
                const r = t.currentAnimateTimings;
                let i = t.currentTime
                  , o = t.currentTime;
                r && o > 0 && (o -= r.duration + r.delay),
                e.styles.forEach(s=>{
                    "string" != typeof s && s.forEach((a,l)=>{
                        const u = t.collectedStyles.get(t.currentQuerySelector)
                          , c = u.get(l);
                        let d = !0;
                        c && (o != i && o >= c.startTime && i <= c.endTime && (t.errors.push(function SB(n, e, t, r, i) {
                            return new b(3010,!1)
                        }()),
                        d = !1),
                        o = c.startTime),
                        d && u.set(l, {
                            startTime: o,
                            endTime: i
                        }),
                        t.options && function n2(n, e, t) {
                            const r = e.params || {}
                              , i = LS(n);
                            i.length && i.forEach(o=>{
                                r.hasOwnProperty(o) || t.push(function gB(n) {
                                    return new b(3001,!1)
                                }())
                            }
                            )
                        }(a, t.options, t.errors)
                    }
                    )
                }
                )
            }
            visitKeyframes(e, t) {
                const r = {
                    type: 5,
                    styles: [],
                    options: null
                };
                if (!t.currentAnimateTimings)
                    return t.errors.push(function IB() {
                        return new b(3011,!1)
                    }()),
                    r;
                let o = 0;
                const s = [];
                let a = !1
                  , l = !1
                  , u = 0;
                const c = e.steps.map(C=>{
                    const S = this._makeStyleAst(C, t);
                    let v = null != S.offset ? S.offset : function v2(n) {
                        if ("string" == typeof n)
                            return null;
                        let e = null;
                        if (Array.isArray(n))
                            n.forEach(t=>{
                                if (t instanceof Map && t.has("offset")) {
                                    const r = t;
                                    e = parseFloat(r.get("offset")),
                                    r.delete("offset")
                                }
                            }
                            );
                        else if (n instanceof Map && n.has("offset")) {
                            const t = n;
                            e = parseFloat(t.get("offset")),
                            t.delete("offset")
                        }
                        return e
                    }(S.styles)
                      , N = 0;
                    return null != v && (o++,
                    N = S.offset = v),
                    l = l || N < 0 || N > 1,
                    a = a || N < u,
                    u = N,
                    s.push(N),
                    S
                }
                );
                l && t.errors.push(function TB() {
                    return new b(3012,!1)
                }()),
                a && t.errors.push(function wB() {
                    return new b(3200,!1)
                }());
                const d = e.steps.length;
                let h = 0;
                o > 0 && o < d ? t.errors.push(function AB() {
                    return new b(3202,!1)
                }()) : 0 == o && (h = 1 / (d - 1));
                const f = d - 1
                  , p = t.currentTime
                  , g = t.currentAnimateTimings
                  , y = g.duration;
                return c.forEach((C,S)=>{
                    const v = h > 0 ? S == f ? 1 : h * S : s[S]
                      , N = v * y;
                    t.currentTime = p + g.delay + N,
                    g.duration = N,
                    this._validateStyleAst(C, t),
                    C.offset = v,
                    r.styles.push(C)
                }
                ),
                r
            }
            visitReference(e, t) {
                return {
                    type: 8,
                    animation: kt(this, Gs(e.animation), t),
                    options: ri(e.options)
                }
            }
            visitAnimateChild(e, t) {
                return t.depCount++,
                {
                    type: 9,
                    options: ri(e.options)
                }
            }
            visitAnimateRef(e, t) {
                return {
                    type: 10,
                    animation: this.visitReference(e.animation, t),
                    options: ri(e.options)
                }
            }
            visitQuery(e, t) {
                const r = t.currentQuerySelector
                  , i = e.options || {};
                t.queryCount++,
                t.currentQuery = e;
                const [o,s] = function g2(n) {
                    const e = !!n.split(/\s*,\s*/).find(t=>":self" == t);
                    return e && (n = n.replace(p2, "")),
                    n = n.replace(/@\*/g, du).replace(/@\w+/g, t=>du + "-" + t.slice(1)).replace(/:animating/g, tp),
                    [n, e]
                }(e.selector);
                t.currentQuerySelector = r.length ? r + " " + o : o,
                Pt(t.collectedStyles, t.currentQuerySelector, new Map);
                const a = kt(this, Gs(e.animation), t);
                return t.currentQuery = null,
                t.currentQuerySelector = r,
                {
                    type: 11,
                    selector: o,
                    limit: i.limit || 0,
                    optional: !!i.optional,
                    includeSelf: s,
                    animation: a,
                    originalSelector: e.selector,
                    options: ri(e.options)
                }
            }
            visitStagger(e, t) {
                t.currentQuery || t.errors.push(function MB() {
                    return new b(3013,!1)
                }());
                const r = "full" === e.timings ? {
                    duration: 0,
                    delay: 0,
                    easing: "full"
                } : hu(e.timings, t.errors, !0);
                return {
                    type: 12,
                    animation: kt(this, Gs(e.animation), t),
                    timings: r,
                    options: null
                }
            }
        }
        class y2 {
            constructor(e) {
                this.errors = e,
                this.queryCount = 0,
                this.depCount = 0,
                this.currentTransition = null,
                this.currentQuery = null,
                this.currentQuerySelector = null,
                this.currentAnimateTimings = null,
                this.currentTime = 0,
                this.collectedStyles = new Map,
                this.options = null,
                this.unsupportedCSSPropertiesFound = new Set
            }
        }
        function ri(n) {
            return n ? (n = js(n)).params && (n.params = function _2(n) {
                return n ? js(n) : null
            }(n.params)) : n = {},
            n
        }
        function sp(n, e, t) {
            return {
                duration: n,
                delay: e,
                easing: t
            }
        }
        function ap(n, e, t, r, i, o, s=null, a=!1) {
            return {
                type: 1,
                element: n,
                keyframes: e,
                preStyleProps: t,
                postStyleProps: r,
                duration: i,
                delay: o,
                totalTime: i + o,
                easing: s,
                subTimeline: a
            }
        }
        class vu {
            constructor() {
                this._map = new Map
            }
            get(e) {
                return this._map.get(e) || []
            }
            append(e, t) {
                let r = this._map.get(e);
                r || this._map.set(e, r = []),
                r.push(...t)
            }
            has(e) {
                return this._map.has(e)
            }
            clear() {
                this._map.clear()
            }
        }
        const D2 = new RegExp(":enter","g")
          , I2 = new RegExp(":leave","g");
        function lp(n, e, t, r, i, o=new Map, s=new Map, a, l, u=[]) {
            return (new T2).buildKeyframes(n, e, t, r, i, o, s, a, l, u)
        }
        class T2 {
            buildKeyframes(e, t, r, i, o, s, a, l, u, c=[]) {
                u = u || new vu;
                const d = new up(e,t,u,i,o,c,[]);
                d.options = l;
                const h = l.delay ? Jn(l.delay) : 0;
                d.currentTimeline.delayNextStep(h),
                d.currentTimeline.setStyles([s], null, d.errors, l),
                kt(this, r, d);
                const f = d.timelines.filter(p=>p.containsAnimation());
                if (f.length && a.size) {
                    let p;
                    for (let g = f.length - 1; g >= 0; g--) {
                        const y = f[g];
                        if (y.element === t) {
                            p = y;
                            break
                        }
                    }
                    p && !p.allowOnlyTimelineStyles() && p.setStyles([a], null, d.errors, l)
                }
                return f.length ? f.map(p=>p.buildKeyframes()) : [ap(t, [], [], [], 0, h, "", !1)]
            }
            visitTrigger(e, t) {}
            visitState(e, t) {}
            visitTransition(e, t) {}
            visitAnimateChild(e, t) {
                const r = t.subInstructions.get(t.element);
                if (r) {
                    const i = t.createSubContext(e.options)
                      , o = t.currentTimeline.currentTime
                      , s = this._visitSubInstructions(r, i, i.options);
                    o != s && t.transformIntoNewTimeline(s)
                }
                t.previousNode = e
            }
            visitAnimateRef(e, t) {
                const r = t.createSubContext(e.options);
                r.transformIntoNewTimeline(),
                this._applyAnimationRefDelays([e.options, e.animation.options], t, r),
                this.visitReference(e.animation, r),
                t.transformIntoNewTimeline(r.currentTimeline.currentTime),
                t.previousNode = e
            }
            _applyAnimationRefDelays(e, t, r) {
                for (const i of e) {
                    const o = i?.delay;
                    if (o) {
                        const s = "number" == typeof o ? o : Jn($s(o, i?.params ?? {}, t.errors));
                        r.delayNextStep(s)
                    }
                }
            }
            _visitSubInstructions(e, t, r) {
                let o = t.currentTimeline.currentTime;
                const s = null != r.duration ? Jn(r.duration) : null
                  , a = null != r.delay ? Jn(r.delay) : null;
                return 0 !== s && e.forEach(l=>{
                    const u = t.appendInstructionToTimeline(l, s, a);
                    o = Math.max(o, u.duration + u.delay)
                }
                ),
                o
            }
            visitReference(e, t) {
                t.updateOptions(e.options, !0),
                kt(this, e.animation, t),
                t.previousNode = e
            }
            visitSequence(e, t) {
                const r = t.subContextCount;
                let i = t;
                const o = e.options;
                if (o && (o.params || o.delay) && (i = t.createSubContext(o),
                i.transformIntoNewTimeline(),
                null != o.delay)) {
                    6 == i.previousNode.type && (i.currentTimeline.snapshotCurrentStyles(),
                    i.previousNode = Eu);
                    const s = Jn(o.delay);
                    i.delayNextStep(s)
                }
                e.steps.length && (e.steps.forEach(s=>kt(this, s, i)),
                i.currentTimeline.applyStylesToKeyframe(),
                i.subContextCount > r && i.transformIntoNewTimeline()),
                t.previousNode = e
            }
            visitGroup(e, t) {
                const r = [];
                let i = t.currentTimeline.currentTime;
                const o = e.options && e.options.delay ? Jn(e.options.delay) : 0;
                e.steps.forEach(s=>{
                    const a = t.createSubContext(e.options);
                    o && a.delayNextStep(o),
                    kt(this, s, a),
                    i = Math.max(i, a.currentTimeline.currentTime),
                    r.push(a.currentTimeline)
                }
                ),
                r.forEach(s=>t.currentTimeline.mergeTimelineCollectedStyles(s)),
                t.transformIntoNewTimeline(i),
                t.previousNode = e
            }
            _visitTiming(e, t) {
                if (e.dynamic) {
                    const r = e.strValue;
                    return hu(t.params ? $s(r, t.params, t.errors) : r, t.errors)
                }
                return {
                    duration: e.duration,
                    delay: e.delay,
                    easing: e.easing
                }
            }
            visitAnimate(e, t) {
                const r = t.currentAnimateTimings = this._visitTiming(e.timings, t)
                  , i = t.currentTimeline;
                r.delay && (t.incrementTime(r.delay),
                i.snapshotCurrentStyles());
                const o = e.style;
                5 == o.type ? this.visitKeyframes(o, t) : (t.incrementTime(r.duration),
                this.visitStyle(o, t),
                i.applyStylesToKeyframe()),
                t.currentAnimateTimings = null,
                t.previousNode = e
            }
            visitStyle(e, t) {
                const r = t.currentTimeline
                  , i = t.currentAnimateTimings;
                !i && r.hasCurrentStyleProperties() && r.forwardFrame();
                const o = i && i.easing || e.easing;
                e.isEmptyStep ? r.applyEmptyStep(o) : r.setStyles(e.styles, o, t.errors, t.options),
                t.previousNode = e
            }
            visitKeyframes(e, t) {
                const r = t.currentAnimateTimings
                  , i = t.currentTimeline.duration
                  , o = r.duration
                  , a = t.createSubContext().currentTimeline;
                a.easing = r.easing,
                e.styles.forEach(l=>{
                    a.forwardTime((l.offset || 0) * o),
                    a.setStyles(l.styles, l.easing, t.errors, t.options),
                    a.applyStylesToKeyframe()
                }
                ),
                t.currentTimeline.mergeTimelineCollectedStyles(a),
                t.transformIntoNewTimeline(i + o),
                t.previousNode = e
            }
            visitQuery(e, t) {
                const r = t.currentTimeline.currentTime
                  , i = e.options || {}
                  , o = i.delay ? Jn(i.delay) : 0;
                o && (6 === t.previousNode.type || 0 == r && t.currentTimeline.hasCurrentStyleProperties()) && (t.currentTimeline.snapshotCurrentStyles(),
                t.previousNode = Eu);
                let s = r;
                const a = t.invokeQuery(e.selector, e.originalSelector, e.limit, e.includeSelf, !!i.optional, t.errors);
                t.currentQueryTotal = a.length;
                let l = null;
                a.forEach((u,c)=>{
                    t.currentQueryIndex = c;
                    const d = t.createSubContext(e.options, u);
                    o && d.delayNextStep(o),
                    u === t.element && (l = d.currentTimeline),
                    kt(this, e.animation, d),
                    d.currentTimeline.applyStylesToKeyframe(),
                    s = Math.max(s, d.currentTimeline.currentTime)
                }
                ),
                t.currentQueryIndex = 0,
                t.currentQueryTotal = 0,
                t.transformIntoNewTimeline(s),
                l && (t.currentTimeline.mergeTimelineCollectedStyles(l),
                t.currentTimeline.snapshotCurrentStyles()),
                t.previousNode = e
            }
            visitStagger(e, t) {
                const r = t.parentContext
                  , i = t.currentTimeline
                  , o = e.timings
                  , s = Math.abs(o.duration)
                  , a = s * (t.currentQueryTotal - 1);
                let l = s * t.currentQueryIndex;
                switch (o.duration < 0 ? "reverse" : o.easing) {
                case "reverse":
                    l = a - l;
                    break;
                case "full":
                    l = r.currentStaggerTime
                }
                const c = t.currentTimeline;
                l && c.delayNextStep(l);
                const d = c.currentTime;
                kt(this, e.animation, t),
                t.previousNode = e,
                r.currentStaggerTime = i.currentTime - d + (i.startTime - r.currentTimeline.startTime)
            }
        }
        const Eu = {};
        class up {
            constructor(e, t, r, i, o, s, a, l) {
                this._driver = e,
                this.element = t,
                this.subInstructions = r,
                this._enterClassName = i,
                this._leaveClassName = o,
                this.errors = s,
                this.timelines = a,
                this.parentContext = null,
                this.currentAnimateTimings = null,
                this.previousNode = Eu,
                this.subContextCount = 0,
                this.options = {},
                this.currentQueryIndex = 0,
                this.currentQueryTotal = 0,
                this.currentStaggerTime = 0,
                this.currentTimeline = l || new Cu(this._driver,t,0),
                a.push(this.currentTimeline)
            }
            get params() {
                return this.options.params
            }
            updateOptions(e, t) {
                if (!e)
                    return;
                const r = e;
                let i = this.options;
                null != r.duration && (i.duration = Jn(r.duration)),
                null != r.delay && (i.delay = Jn(r.delay));
                const o = r.params;
                if (o) {
                    let s = i.params;
                    s || (s = this.options.params = {}),
                    Object.keys(o).forEach(a=>{
                        (!t || !s.hasOwnProperty(a)) && (s[a] = $s(o[a], s, this.errors))
                    }
                    )
                }
            }
            _copyOptions() {
                const e = {};
                if (this.options) {
                    const t = this.options.params;
                    if (t) {
                        const r = e.params = {};
                        Object.keys(t).forEach(i=>{
                            r[i] = t[i]
                        }
                        )
                    }
                }
                return e
            }
            createSubContext(e=null, t, r) {
                const i = t || this.element
                  , o = new up(this._driver,i,this.subInstructions,this._enterClassName,this._leaveClassName,this.errors,this.timelines,this.currentTimeline.fork(i, r || 0));
                return o.previousNode = this.previousNode,
                o.currentAnimateTimings = this.currentAnimateTimings,
                o.options = this._copyOptions(),
                o.updateOptions(e),
                o.currentQueryIndex = this.currentQueryIndex,
                o.currentQueryTotal = this.currentQueryTotal,
                o.parentContext = this,
                this.subContextCount++,
                o
            }
            transformIntoNewTimeline(e) {
                return this.previousNode = Eu,
                this.currentTimeline = this.currentTimeline.fork(this.element, e),
                this.timelines.push(this.currentTimeline),
                this.currentTimeline
            }
            appendInstructionToTimeline(e, t, r) {
                const i = {
                    duration: t ?? e.duration,
                    delay: this.currentTimeline.currentTime + (r ?? 0) + e.delay,
                    easing: ""
                }
                  , o = new w2(this._driver,e.element,e.keyframes,e.preStyleProps,e.postStyleProps,i,e.stretchStartingKeyframe);
                return this.timelines.push(o),
                i
            }
            incrementTime(e) {
                this.currentTimeline.forwardTime(this.currentTimeline.duration + e)
            }
            delayNextStep(e) {
                e > 0 && this.currentTimeline.delayNextStep(e)
            }
            invokeQuery(e, t, r, i, o, s) {
                let a = [];
                if (i && a.push(this.element),
                e.length > 0) {
                    e = (e = e.replace(D2, "." + this._enterClassName)).replace(I2, "." + this._leaveClassName);
                    let u = this._driver.query(this.element, e, 1 != r);
                    0 !== r && (u = r < 0 ? u.slice(u.length + r, u.length) : u.slice(0, r)),
                    a.push(...u)
                }
                return !o && 0 == a.length && s.push(function NB(n) {
                    return new b(3014,!1)
                }()),
                a
            }
        }
        class Cu {
            constructor(e, t, r, i) {
                this._driver = e,
                this.element = t,
                this.startTime = r,
                this._elementTimelineStylesLookup = i,
                this.duration = 0,
                this._previousKeyframe = new Map,
                this._currentKeyframe = new Map,
                this._keyframes = new Map,
                this._styleSummary = new Map,
                this._localTimelineStyles = new Map,
                this._pendingStyles = new Map,
                this._backFill = new Map,
                this._currentEmptyStepKeyframe = null,
                this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map),
                this._globalTimelineStyles = this._elementTimelineStylesLookup.get(t),
                this._globalTimelineStyles || (this._globalTimelineStyles = this._localTimelineStyles,
                this._elementTimelineStylesLookup.set(t, this._localTimelineStyles)),
                this._loadKeyframe()
            }
            containsAnimation() {
                switch (this._keyframes.size) {
                case 0:
                    return !1;
                case 1:
                    return this.hasCurrentStyleProperties();
                default:
                    return !0
                }
            }
            hasCurrentStyleProperties() {
                return this._currentKeyframe.size > 0
            }
            get currentTime() {
                return this.startTime + this.duration
            }
            delayNextStep(e) {
                const t = 1 === this._keyframes.size && this._pendingStyles.size;
                this.duration || t ? (this.forwardTime(this.currentTime + e),
                t && this.snapshotCurrentStyles()) : this.startTime += e
            }
            fork(e, t) {
                return this.applyStylesToKeyframe(),
                new Cu(this._driver,e,t || this.currentTime,this._elementTimelineStylesLookup)
            }
            _loadKeyframe() {
                this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
                this._currentKeyframe = this._keyframes.get(this.duration),
                this._currentKeyframe || (this._currentKeyframe = new Map,
                this._keyframes.set(this.duration, this._currentKeyframe))
            }
            forwardFrame() {
                this.duration += 1,
                this._loadKeyframe()
            }
            forwardTime(e) {
                this.applyStylesToKeyframe(),
                this.duration = e,
                this._loadKeyframe()
            }
            _updateStyle(e, t) {
                this._localTimelineStyles.set(e, t),
                this._globalTimelineStyles.set(e, t),
                this._styleSummary.set(e, {
                    time: this.currentTime,
                    value: t
                })
            }
            allowOnlyTimelineStyles() {
                return this._currentEmptyStepKeyframe !== this._currentKeyframe
            }
            applyEmptyStep(e) {
                e && this._previousKeyframe.set("easing", e);
                for (let[t,r] of this._globalTimelineStyles)
                    this._backFill.set(t, r || Yn),
                    this._currentKeyframe.set(t, Yn);
                this._currentEmptyStepKeyframe = this._currentKeyframe
            }
            setStyles(e, t, r, i) {
                t && this._previousKeyframe.set("easing", t);
                const o = i && i.params || {}
                  , s = function A2(n, e) {
                    const t = new Map;
                    let r;
                    return n.forEach(i=>{
                        if ("*" === i) {
                            r = r || e.keys();
                            for (let o of r)
                                t.set(o, Yn)
                        } else
                            br(i, t)
                    }
                    ),
                    t
                }(e, this._globalTimelineStyles);
                for (let[a,l] of s) {
                    const u = $s(l, o, r);
                    this._pendingStyles.set(a, u),
                    this._localTimelineStyles.has(a) || this._backFill.set(a, this._globalTimelineStyles.get(a) ?? Yn),
                    this._updateStyle(a, u)
                }
            }
            applyStylesToKeyframe() {
                0 != this._pendingStyles.size && (this._pendingStyles.forEach((e,t)=>{
                    this._currentKeyframe.set(t, e)
                }
                ),
                this._pendingStyles.clear(),
                this._localTimelineStyles.forEach((e,t)=>{
                    this._currentKeyframe.has(t) || this._currentKeyframe.set(t, e)
                }
                ))
            }
            snapshotCurrentStyles() {
                for (let[e,t] of this._localTimelineStyles)
                    this._pendingStyles.set(e, t),
                    this._updateStyle(e, t)
            }
            getFinalKeyframe() {
                return this._keyframes.get(this.duration)
            }
            get properties() {
                const e = [];
                for (let t in this._currentKeyframe)
                    e.push(t);
                return e
            }
            mergeTimelineCollectedStyles(e) {
                e._styleSummary.forEach((t,r)=>{
                    const i = this._styleSummary.get(r);
                    (!i || t.time > i.time) && this._updateStyle(r, t.value)
                }
                )
            }
            buildKeyframes() {
                this.applyStylesToKeyframe();
                const e = new Set
                  , t = new Set
                  , r = 1 === this._keyframes.size && 0 === this.duration;
                let i = [];
                this._keyframes.forEach((a,l)=>{
                    const u = br(a, new Map, this._backFill);
                    u.forEach((c,d)=>{
                        "!" === c ? e.add(d) : c === Yn && t.add(d)
                    }
                    ),
                    r || u.set("offset", l / this.duration),
                    i.push(u)
                }
                );
                const o = e.size ? fu(e.values()) : []
                  , s = t.size ? fu(t.values()) : [];
                if (r) {
                    const a = i[0]
                      , l = new Map(a);
                    a.set("offset", 0),
                    l.set("offset", 1),
                    i = [a, l]
                }
                return ap(this.element, i, o, s, this.duration, this.startTime, this.easing, !1)
            }
        }
        class w2 extends Cu {
            constructor(e, t, r, i, o, s, a=!1) {
                super(e, t, s.delay),
                this.keyframes = r,
                this.preStyleProps = i,
                this.postStyleProps = o,
                this._stretchStartingKeyframe = a,
                this.timings = {
                    duration: s.duration,
                    delay: s.delay,
                    easing: s.easing
                }
            }
            containsAnimation() {
                return this.keyframes.length > 1
            }
            buildKeyframes() {
                let e = this.keyframes
                  , {delay: t, duration: r, easing: i} = this.timings;
                if (this._stretchStartingKeyframe && t) {
                    const o = []
                      , s = r + t
                      , a = t / s
                      , l = br(e[0]);
                    l.set("offset", 0),
                    o.push(l);
                    const u = br(e[0]);
                    u.set("offset", jS(a)),
                    o.push(u);
                    const c = e.length - 1;
                    for (let d = 1; d <= c; d++) {
                        let h = br(e[d]);
                        const f = h.get("offset");
                        h.set("offset", jS((t + f * r) / s)),
                        o.push(h)
                    }
                    r = s,
                    t = 0,
                    i = "",
                    e = o
                }
                return ap(this.element, e, this.preStyleProps, this.postStyleProps, r, t, i, !0)
            }
        }
        function jS(n, e=3) {
            const t = Math.pow(10, e - 1);
            return Math.round(n * t) / t
        }
        class cp {
        }
        const M2 = new Set(["width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "left", "top", "bottom", "right", "fontSize", "outlineWidth", "outlineOffset", "paddingTop", "paddingLeft", "paddingBottom", "paddingRight", "marginTop", "marginLeft", "marginBottom", "marginRight", "borderRadius", "borderWidth", "borderTopWidth", "borderLeftWidth", "borderRightWidth", "borderBottomWidth", "textIndent", "perspective"]);
        class N2 extends cp {
            normalizePropertyName(e, t) {
                return ip(e)
            }
            normalizeStyleValue(e, t, r, i) {
                let o = "";
                const s = r.toString().trim();
                if (M2.has(t) && 0 !== r && "0" !== r)
                    if ("number" == typeof r)
                        o = "px";
                    else {
                        const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
                        a && 0 == a[1].length && i.push(function vB(n, e) {
                            return new b(3005,!1)
                        }())
                    }
                return s + o
            }
        }
        function GS(n, e, t, r, i, o, s, a, l, u, c, d, h) {
            return {
                type: 0,
                element: n,
                triggerName: e,
                isRemovalTransition: i,
                fromState: t,
                fromStyles: o,
                toState: r,
                toStyles: s,
                timelines: a,
                queriedElements: l,
                preStyleProps: u,
                postStyleProps: c,
                totalTime: d,
                errors: h
            }
        }
        const dp = {};
        class $S {
            constructor(e, t, r) {
                this._triggerName = e,
                this.ast = t,
                this._stateStyles = r
            }
            match(e, t, r, i) {
                return function O2(n, e, t, r, i) {
                    return n.some(o=>o(e, t, r, i))
                }(this.ast.matchers, e, t, r, i)
            }
            buildStyles(e, t, r) {
                let i = this._stateStyles.get("*");
                return void 0 !== e && (i = this._stateStyles.get(e?.toString()) || i),
                i ? i.buildStyles(t, r) : new Map
            }
            build(e, t, r, i, o, s, a, l, u, c) {
                const d = []
                  , h = this.ast.options && this.ast.options.params || dp
                  , p = this.buildStyles(r, a && a.params || dp, d)
                  , g = l && l.params || dp
                  , y = this.buildStyles(i, g, d)
                  , C = new Set
                  , S = new Map
                  , v = new Map
                  , N = "void" === i
                  , Q = {
                    params: R2(g, h),
                    delay: this.ast.options?.delay
                }
                  , te = c ? [] : lp(e, t, this.ast.animation, o, s, p, y, Q, u, d);
                let Ie = 0;
                if (te.forEach(Vt=>{
                    Ie = Math.max(Vt.duration + Vt.delay, Ie)
                }
                ),
                d.length)
                    return GS(t, this._triggerName, r, i, N, p, y, [], [], S, v, Ie, d);
                te.forEach(Vt=>{
                    const Ut = Vt.element
                      , uo = Pt(S, Ut, new Set);
                    Vt.preStyleProps.forEach(gn=>uo.add(gn));
                    const er = Pt(v, Ut, new Set);
                    Vt.postStyleProps.forEach(gn=>er.add(gn)),
                    Ut !== t && C.add(Ut)
                }
                );
                const Lt = fu(C.values());
                return GS(t, this._triggerName, r, i, N, p, y, te, Lt, S, v, Ie)
            }
        }
        function R2(n, e) {
            const t = js(e);
            for (const r in n)
                n.hasOwnProperty(r) && null != n[r] && (t[r] = n[r]);
            return t
        }
        class x2 {
            constructor(e, t, r) {
                this.styles = e,
                this.defaultParams = t,
                this.normalizer = r
            }
            buildStyles(e, t) {
                const r = new Map
                  , i = js(this.defaultParams);
                return Object.keys(e).forEach(o=>{
                    const s = e[o];
                    null !== s && (i[o] = s)
                }
                ),
                this.styles.styles.forEach(o=>{
                    "string" != typeof o && o.forEach((s,a)=>{
                        s && (s = $s(s, i, t));
                        const l = this.normalizer.normalizePropertyName(a, t);
                        s = this.normalizer.normalizeStyleValue(a, l, s, t),
                        r.set(l, s)
                    }
                    )
                }
                ),
                r
            }
        }
        class P2 {
            constructor(e, t, r) {
                this.name = e,
                this.ast = t,
                this._normalizer = r,
                this.transitionFactories = [],
                this.states = new Map,
                t.states.forEach(i=>{
                    this.states.set(i.name, new x2(i.style,i.options && i.options.params || {},r))
                }
                ),
                zS(this.states, "true", "1"),
                zS(this.states, "false", "0"),
                t.transitions.forEach(i=>{
                    this.transitionFactories.push(new $S(e,i,this.states))
                }
                ),
                this.fallbackTransition = function k2(n, e, t) {
                    return new $S(n,{
                        type: 1,
                        animation: {
                            type: 2,
                            steps: [],
                            options: null
                        },
                        matchers: [(s,a)=>!0],
                        options: null,
                        queryCount: 0,
                        depCount: 0
                    },e)
                }(e, this.states)
            }
            get containsQueries() {
                return this.ast.queryCount > 0
            }
            matchTransition(e, t, r, i) {
                return this.transitionFactories.find(s=>s.match(e, t, r, i)) || null
            }
            matchStyles(e, t, r) {
                return this.fallbackTransition.buildStyles(e, t, r)
            }
        }
        function zS(n, e, t) {
            n.has(e) ? n.has(t) || n.set(t, n.get(e)) : n.has(t) && n.set(e, n.get(t))
        }
        const L2 = new vu;
        class V2 {
            constructor(e, t, r) {
                this.bodyNode = e,
                this._driver = t,
                this._normalizer = r,
                this._animations = new Map,
                this._playersById = new Map,
                this.players = []
            }
            register(e, t) {
                const r = []
                  , o = op(this._driver, t, r, []);
                if (r.length)
                    throw function LB(n) {
                        return new b(3503,!1)
                    }();
                this._animations.set(e, o)
            }
            _buildPlayer(e, t, r) {
                const i = e.element
                  , o = DS(0, this._normalizer, 0, e.keyframes, t, r);
                return this._driver.animate(i, o, e.duration, e.delay, e.easing, [], !0)
            }
            create(e, t, r={}) {
                const i = []
                  , o = this._animations.get(e);
                let s;
                const a = new Map;
                if (o ? (s = lp(this._driver, t, o, ep, uu, new Map, new Map, r, L2, i),
                s.forEach(c=>{
                    const d = Pt(a, c.element, new Map);
                    c.postStyleProps.forEach(h=>d.set(h, null))
                }
                )) : (i.push(function VB() {
                    return new b(3300,!1)
                }()),
                s = []),
                i.length)
                    throw function UB(n) {
                        return new b(3504,!1)
                    }();
                a.forEach((c,d)=>{
                    c.forEach((h,f)=>{
                        c.set(f, this._driver.computeStyle(d, f, Yn))
                    }
                    )
                }
                );
                const u = Cr(s.map(c=>{
                    const d = a.get(c.element);
                    return this._buildPlayer(c, new Map, d)
                }
                ));
                return this._playersById.set(e, u),
                u.onDestroy(()=>this.destroy(e)),
                this.players.push(u),
                u
            }
            destroy(e) {
                const t = this._getPlayer(e);
                t.destroy(),
                this._playersById.delete(e);
                const r = this.players.indexOf(t);
                r >= 0 && this.players.splice(r, 1)
            }
            _getPlayer(e) {
                const t = this._playersById.get(e);
                if (!t)
                    throw function BB(n) {
                        return new b(3301,!1)
                    }();
                return t
            }
            listen(e, t, r, i) {
                const o = Yf(t, "", "", "");
                return Kf(this._getPlayer(e), r, o, i),
                ()=>{}
            }
            command(e, t, r, i) {
                if ("register" == r)
                    return void this.register(e, i[0]);
                if ("create" == r)
                    return void this.create(e, t, i[0] || {});
                const o = this._getPlayer(e);
                switch (r) {
                case "play":
                    o.play();
                    break;
                case "pause":
                    o.pause();
                    break;
                case "reset":
                    o.reset();
                    break;
                case "restart":
                    o.restart();
                    break;
                case "finish":
                    o.finish();
                    break;
                case "init":
                    o.init();
                    break;
                case "setPosition":
                    o.setPosition(parseFloat(i[0]));
                    break;
                case "destroy":
                    this.destroy(e)
                }
            }
        }
        const WS = "ng-animate-queued"
          , hp = "ng-animate-disabled"
          , G2 = []
          , qS = {
            namespaceId: "",
            setForRemoval: !1,
            setForMove: !1,
            hasAnimation: !1,
            removedBeforeQueried: !1
        }
          , $2 = {
            namespaceId: "",
            setForMove: !1,
            setForRemoval: !1,
            hasAnimation: !1,
            removedBeforeQueried: !0
        }
          , Jt = "__ng_removed";
        class fp {
            constructor(e, t="") {
                this.namespaceId = t;
                const r = e && e.hasOwnProperty("value");
                if (this.value = function K2(n) {
                    return n ?? null
                }(r ? e.value : e),
                r) {
                    const o = js(e);
                    delete o.value,
                    this.options = o
                } else
                    this.options = {};
                this.options.params || (this.options.params = {})
            }
            get params() {
                return this.options.params
            }
            absorbOptions(e) {
                const t = e.params;
                if (t) {
                    const r = this.options.params;
                    Object.keys(t).forEach(i=>{
                        null == r[i] && (r[i] = t[i])
                    }
                    )
                }
            }
        }
        const zs = "void"
          , pp = new fp(zs);
        class z2 {
            constructor(e, t, r) {
                this.id = e,
                this.hostElement = t,
                this._engine = r,
                this.players = [],
                this._triggers = new Map,
                this._queue = [],
                this._elementListeners = new Map,
                this._hostClassName = "ng-tns-" + e,
                en(t, this._hostClassName)
            }
            listen(e, t, r, i) {
                if (!this._triggers.has(t))
                    throw function HB(n, e) {
                        return new b(3302,!1)
                    }();
                if (null == r || 0 == r.length)
                    throw function jB(n) {
                        return new b(3303,!1)
                    }();
                if (!function Q2(n) {
                    return "start" == n || "done" == n
                }(r))
                    throw function GB(n, e) {
                        return new b(3400,!1)
                    }();
                const o = Pt(this._elementListeners, e, [])
                  , s = {
                    name: t,
                    phase: r,
                    callback: i
                };
                o.push(s);
                const a = Pt(this._engine.statesByElement, e, new Map);
                return a.has(t) || (en(e, cu),
                en(e, cu + "-" + t),
                a.set(t, pp)),
                ()=>{
                    this._engine.afterFlush(()=>{
                        const l = o.indexOf(s);
                        l >= 0 && o.splice(l, 1),
                        this._triggers.has(t) || a.delete(t)
                    }
                    )
                }
            }
            register(e, t) {
                return !this._triggers.has(e) && (this._triggers.set(e, t),
                !0)
            }
            _getTrigger(e) {
                const t = this._triggers.get(e);
                if (!t)
                    throw function $B(n) {
                        return new b(3401,!1)
                    }();
                return t
            }
            trigger(e, t, r, i=!0) {
                const o = this._getTrigger(t)
                  , s = new mp(this.id,t,e);
                let a = this._engine.statesByElement.get(e);
                a || (en(e, cu),
                en(e, cu + "-" + t),
                this._engine.statesByElement.set(e, a = new Map));
                let l = a.get(t);
                const u = new fp(r,this.id);
                if (!(r && r.hasOwnProperty("value")) && l && u.absorbOptions(l.options),
                a.set(t, u),
                l || (l = pp),
                u.value !== zs && l.value === u.value) {
                    if (!function X2(n, e) {
                        const t = Object.keys(n)
                          , r = Object.keys(e);
                        if (t.length != r.length)
                            return !1;
                        for (let i = 0; i < t.length; i++) {
                            const o = t[i];
                            if (!e.hasOwnProperty(o) || n[o] !== e[o])
                                return !1
                        }
                        return !0
                    }(l.params, u.params)) {
                        const g = []
                          , y = o.matchStyles(l.value, l.params, g)
                          , C = o.matchStyles(u.value, u.params, g);
                        g.length ? this._engine.reportError(g) : this._engine.afterFlush(()=>{
                            ni(e, y),
                            Mn(e, C)
                        }
                        )
                    }
                    return
                }
                const h = Pt(this._engine.playersByElement, e, []);
                h.forEach(g=>{
                    g.namespaceId == this.id && g.triggerName == t && g.queued && g.destroy()
                }
                );
                let f = o.matchTransition(l.value, u.value, e, u.params)
                  , p = !1;
                if (!f) {
                    if (!i)
                        return;
                    f = o.fallbackTransition,
                    p = !0
                }
                return this._engine.totalQueuedPlayers++,
                this._queue.push({
                    element: e,
                    triggerName: t,
                    transition: f,
                    fromState: l,
                    toState: u,
                    player: s,
                    isFallbackTransition: p
                }),
                p || (en(e, WS),
                s.onStart(()=>{
                    lo(e, WS)
                }
                )),
                s.onDone(()=>{
                    let g = this.players.indexOf(s);
                    g >= 0 && this.players.splice(g, 1);
                    const y = this._engine.playersByElement.get(e);
                    if (y) {
                        let C = y.indexOf(s);
                        C >= 0 && y.splice(C, 1)
                    }
                }
                ),
                this.players.push(s),
                h.push(s),
                s
            }
            deregister(e) {
                this._triggers.delete(e),
                this._engine.statesByElement.forEach(t=>t.delete(e)),
                this._elementListeners.forEach((t,r)=>{
                    this._elementListeners.set(r, t.filter(i=>i.name != e))
                }
                )
            }
            clearElementCache(e) {
                this._engine.statesByElement.delete(e),
                this._elementListeners.delete(e);
                const t = this._engine.playersByElement.get(e);
                t && (t.forEach(r=>r.destroy()),
                this._engine.playersByElement.delete(e))
            }
            _signalRemovalForInnerTriggers(e, t) {
                const r = this._engine.driver.query(e, du, !0);
                r.forEach(i=>{
                    if (i[Jt])
                        return;
                    const o = this._engine.fetchNamespacesByElement(i);
                    o.size ? o.forEach(s=>s.triggerLeaveAnimation(i, t, !1, !0)) : this.clearElementCache(i)
                }
                ),
                this._engine.afterFlushAnimationsDone(()=>r.forEach(i=>this.clearElementCache(i)))
            }
            triggerLeaveAnimation(e, t, r, i) {
                const o = this._engine.statesByElement.get(e)
                  , s = new Map;
                if (o) {
                    const a = [];
                    if (o.forEach((l,u)=>{
                        if (s.set(u, l.value),
                        this._triggers.has(u)) {
                            const c = this.trigger(e, u, zs, i);
                            c && a.push(c)
                        }
                    }
                    ),
                    a.length)
                        return this._engine.markElementAsRemoved(this.id, e, !0, t, s),
                        r && Cr(a).onDone(()=>this._engine.processLeaveNode(e)),
                        !0
                }
                return !1
            }
            prepareLeaveAnimationListeners(e) {
                const t = this._elementListeners.get(e)
                  , r = this._engine.statesByElement.get(e);
                if (t && r) {
                    const i = new Set;
                    t.forEach(o=>{
                        const s = o.name;
                        if (i.has(s))
                            return;
                        i.add(s);
                        const l = this._triggers.get(s).fallbackTransition
                          , u = r.get(s) || pp
                          , c = new fp(zs)
                          , d = new mp(this.id,s,e);
                        this._engine.totalQueuedPlayers++,
                        this._queue.push({
                            element: e,
                            triggerName: s,
                            transition: l,
                            fromState: u,
                            toState: c,
                            player: d,
                            isFallbackTransition: !0
                        })
                    }
                    )
                }
            }
            removeNode(e, t) {
                const r = this._engine;
                if (e.childElementCount && this._signalRemovalForInnerTriggers(e, t),
                this.triggerLeaveAnimation(e, t, !0))
                    return;
                let i = !1;
                if (r.totalAnimations) {
                    const o = r.players.length ? r.playersByQueriedElement.get(e) : [];
                    if (o && o.length)
                        i = !0;
                    else {
                        let s = e;
                        for (; s = s.parentNode; )
                            if (r.statesByElement.get(s)) {
                                i = !0;
                                break
                            }
                    }
                }
                if (this.prepareLeaveAnimationListeners(e),
                i)
                    r.markElementAsRemoved(this.id, e, !1, t);
                else {
                    const o = e[Jt];
                    (!o || o === qS) && (r.afterFlush(()=>this.clearElementCache(e)),
                    r.destroyInnerAnimations(e),
                    r._onRemovalComplete(e, t))
                }
            }
            insertNode(e, t) {
                en(e, this._hostClassName)
            }
            drainQueuedTransitions(e) {
                const t = [];
                return this._queue.forEach(r=>{
                    const i = r.player;
                    if (i.destroyed)
                        return;
                    const o = r.element
                      , s = this._elementListeners.get(o);
                    s && s.forEach(a=>{
                        if (a.name == r.triggerName) {
                            const l = Yf(o, r.triggerName, r.fromState.value, r.toState.value);
                            l._data = e,
                            Kf(r.player, a.phase, l, a.callback)
                        }
                    }
                    ),
                    i.markedForDestroy ? this._engine.afterFlush(()=>{
                        i.destroy()
                    }
                    ) : t.push(r)
                }
                ),
                this._queue = [],
                t.sort((r,i)=>{
                    const o = r.transition.ast.depCount
                      , s = i.transition.ast.depCount;
                    return 0 == o || 0 == s ? o - s : this._engine.driver.containsElement(r.element, i.element) ? 1 : -1
                }
                )
            }
            destroy(e) {
                this.players.forEach(t=>t.destroy()),
                this._signalRemovalForInnerTriggers(this.hostElement, e)
            }
            elementContainsData(e) {
                let t = !1;
                return this._elementListeners.has(e) && (t = !0),
                t = !!this._queue.find(r=>r.element === e) || t,
                t
            }
        }
        class W2 {
            constructor(e, t, r) {
                this.bodyNode = e,
                this.driver = t,
                this._normalizer = r,
                this.players = [],
                this.newHostElements = new Map,
                this.playersByElement = new Map,
                this.playersByQueriedElement = new Map,
                this.statesByElement = new Map,
                this.disabledNodes = new Set,
                this.totalAnimations = 0,
                this.totalQueuedPlayers = 0,
                this._namespaceLookup = {},
                this._namespaceList = [],
                this._flushFns = [],
                this._whenQuietFns = [],
                this.namespacesByHostElement = new Map,
                this.collectedEnterElements = [],
                this.collectedLeaveElements = [],
                this.onRemovalComplete = (i,o)=>{}
            }
            _onRemovalComplete(e, t) {
                this.onRemovalComplete(e, t)
            }
            get queuedPlayers() {
                const e = [];
                return this._namespaceList.forEach(t=>{
                    t.players.forEach(r=>{
                        r.queued && e.push(r)
                    }
                    )
                }
                ),
                e
            }
            createNamespace(e, t) {
                const r = new z2(e,t,this);
                return this.bodyNode && this.driver.containsElement(this.bodyNode, t) ? this._balanceNamespaceList(r, t) : (this.newHostElements.set(t, r),
                this.collectEnterElement(t)),
                this._namespaceLookup[e] = r
            }
            _balanceNamespaceList(e, t) {
                const r = this._namespaceList
                  , i = this.namespacesByHostElement;
                if (r.length - 1 >= 0) {
                    let s = !1
                      , a = this.driver.getParentElement(t);
                    for (; a; ) {
                        const l = i.get(a);
                        if (l) {
                            const u = r.indexOf(l);
                            r.splice(u + 1, 0, e),
                            s = !0;
                            break
                        }
                        a = this.driver.getParentElement(a)
                    }
                    s || r.unshift(e)
                } else
                    r.push(e);
                return i.set(t, e),
                e
            }
            register(e, t) {
                let r = this._namespaceLookup[e];
                return r || (r = this.createNamespace(e, t)),
                r
            }
            registerTrigger(e, t, r) {
                let i = this._namespaceLookup[e];
                i && i.register(t, r) && this.totalAnimations++
            }
            destroy(e, t) {
                if (!e)
                    return;
                const r = this._fetchNamespace(e);
                this.afterFlush(()=>{
                    this.namespacesByHostElement.delete(r.hostElement),
                    delete this._namespaceLookup[e];
                    const i = this._namespaceList.indexOf(r);
                    i >= 0 && this._namespaceList.splice(i, 1)
                }
                ),
                this.afterFlushAnimationsDone(()=>r.destroy(t))
            }
            _fetchNamespace(e) {
                return this._namespaceLookup[e]
            }
            fetchNamespacesByElement(e) {
                const t = new Set
                  , r = this.statesByElement.get(e);
                if (r)
                    for (let i of r.values())
                        if (i.namespaceId) {
                            const o = this._fetchNamespace(i.namespaceId);
                            o && t.add(o)
                        }
                return t
            }
            trigger(e, t, r, i) {
                if (bu(t)) {
                    const o = this._fetchNamespace(e);
                    if (o)
                        return o.trigger(t, r, i),
                        !0
                }
                return !1
            }
            insertNode(e, t, r, i) {
                if (!bu(t))
                    return;
                const o = t[Jt];
                if (o && o.setForRemoval) {
                    o.setForRemoval = !1,
                    o.setForMove = !0;
                    const s = this.collectedLeaveElements.indexOf(t);
                    s >= 0 && this.collectedLeaveElements.splice(s, 1)
                }
                if (e) {
                    const s = this._fetchNamespace(e);
                    s && s.insertNode(t, r)
                }
                i && this.collectEnterElement(t)
            }
            collectEnterElement(e) {
                this.collectedEnterElements.push(e)
            }
            markElementAsDisabled(e, t) {
                t ? this.disabledNodes.has(e) || (this.disabledNodes.add(e),
                en(e, hp)) : this.disabledNodes.has(e) && (this.disabledNodes.delete(e),
                lo(e, hp))
            }
            removeNode(e, t, r, i) {
                if (bu(t)) {
                    const o = e ? this._fetchNamespace(e) : null;
                    if (o ? o.removeNode(t, i) : this.markElementAsRemoved(e, t, !1, i),
                    r) {
                        const s = this.namespacesByHostElement.get(t);
                        s && s.id !== e && s.removeNode(t, i)
                    }
                } else
                    this._onRemovalComplete(t, i)
            }
            markElementAsRemoved(e, t, r, i, o) {
                this.collectedLeaveElements.push(t),
                t[Jt] = {
                    namespaceId: e,
                    setForRemoval: i,
                    hasAnimation: r,
                    removedBeforeQueried: !1,
                    previousTriggersValues: o
                }
            }
            listen(e, t, r, i, o) {
                return bu(t) ? this._fetchNamespace(e).listen(t, r, i, o) : ()=>{}
            }
            _buildInstruction(e, t, r, i, o) {
                return e.transition.build(this.driver, e.element, e.fromState.value, e.toState.value, r, i, e.fromState.options, e.toState.options, t, o)
            }
            destroyInnerAnimations(e) {
                let t = this.driver.query(e, du, !0);
                t.forEach(r=>this.destroyActiveAnimationsForElement(r)),
                0 != this.playersByQueriedElement.size && (t = this.driver.query(e, tp, !0),
                t.forEach(r=>this.finishActiveQueriedAnimationOnElement(r)))
            }
            destroyActiveAnimationsForElement(e) {
                const t = this.playersByElement.get(e);
                t && t.forEach(r=>{
                    r.queued ? r.markedForDestroy = !0 : r.destroy()
                }
                )
            }
            finishActiveQueriedAnimationOnElement(e) {
                const t = this.playersByQueriedElement.get(e);
                t && t.forEach(r=>r.finish())
            }
            whenRenderingDone() {
                return new Promise(e=>{
                    if (this.players.length)
                        return Cr(this.players).onDone(()=>e());
                    e()
                }
                )
            }
            processLeaveNode(e) {
                const t = e[Jt];
                if (t && t.setForRemoval) {
                    if (e[Jt] = qS,
                    t.namespaceId) {
                        this.destroyInnerAnimations(e);
                        const r = this._fetchNamespace(t.namespaceId);
                        r && r.clearElementCache(e)
                    }
                    this._onRemovalComplete(e, t.setForRemoval)
                }
                e.classList?.contains(hp) && this.markElementAsDisabled(e, !1),
                this.driver.query(e, ".ng-animate-disabled", !0).forEach(r=>{
                    this.markElementAsDisabled(r, !1)
                }
                )
            }
            flush(e=-1) {
                let t = [];
                if (this.newHostElements.size && (this.newHostElements.forEach((r,i)=>this._balanceNamespaceList(r, i)),
                this.newHostElements.clear()),
                this.totalAnimations && this.collectedEnterElements.length)
                    for (let r = 0; r < this.collectedEnterElements.length; r++)
                        en(this.collectedEnterElements[r], "ng-star-inserted");
                if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
                    const r = [];
                    try {
                        t = this._flushAnimations(r, e)
                    } finally {
                        for (let i = 0; i < r.length; i++)
                            r[i]()
                    }
                } else
                    for (let r = 0; r < this.collectedLeaveElements.length; r++)
                        this.processLeaveNode(this.collectedLeaveElements[r]);
                if (this.totalQueuedPlayers = 0,
                this.collectedEnterElements.length = 0,
                this.collectedLeaveElements.length = 0,
                this._flushFns.forEach(r=>r()),
                this._flushFns = [],
                this._whenQuietFns.length) {
                    const r = this._whenQuietFns;
                    this._whenQuietFns = [],
                    t.length ? Cr(t).onDone(()=>{
                        r.forEach(i=>i())
                    }
                    ) : r.forEach(i=>i())
                }
            }
            reportError(e) {
                throw function zB(n) {
                    return new b(3402,!1)
                }()
            }
            _flushAnimations(e, t) {
                const r = new vu
                  , i = []
                  , o = new Map
                  , s = []
                  , a = new Map
                  , l = new Map
                  , u = new Map
                  , c = new Set;
                this.disabledNodes.forEach(R=>{
                    c.add(R);
                    const L = this.driver.query(R, ".ng-animate-queued", !0);
                    for (let H = 0; H < L.length; H++)
                        c.add(L[H])
                }
                );
                const d = this.bodyNode
                  , h = Array.from(this.statesByElement.keys())
                  , f = YS(h, this.collectedEnterElements)
                  , p = new Map;
                let g = 0;
                f.forEach((R,L)=>{
                    const H = ep + g++;
                    p.set(L, H),
                    R.forEach(oe=>en(oe, H))
                }
                );
                const y = []
                  , C = new Set
                  , S = new Set;
                for (let R = 0; R < this.collectedLeaveElements.length; R++) {
                    const L = this.collectedLeaveElements[R]
                      , H = L[Jt];
                    H && H.setForRemoval && (y.push(L),
                    C.add(L),
                    H.hasAnimation ? this.driver.query(L, ".ng-star-inserted", !0).forEach(oe=>C.add(oe)) : S.add(L))
                }
                const v = new Map
                  , N = YS(h, Array.from(C));
                N.forEach((R,L)=>{
                    const H = uu + g++;
                    v.set(L, H),
                    R.forEach(oe=>en(oe, H))
                }
                ),
                e.push(()=>{
                    f.forEach((R,L)=>{
                        const H = p.get(L);
                        R.forEach(oe=>lo(oe, H))
                    }
                    ),
                    N.forEach((R,L)=>{
                        const H = v.get(L);
                        R.forEach(oe=>lo(oe, H))
                    }
                    ),
                    y.forEach(R=>{
                        this.processLeaveNode(R)
                    }
                    )
                }
                );
                const Q = []
                  , te = [];
                for (let R = this._namespaceList.length - 1; R >= 0; R--)
                    this._namespaceList[R].drainQueuedTransitions(t).forEach(H=>{
                        const oe = H.player
                          , Ke = H.element;
                        if (Q.push(oe),
                        this.collectedEnterElements.length) {
                            const lt = Ke[Jt];
                            if (lt && lt.setForMove) {
                                if (lt.previousTriggersValues && lt.previousTriggersValues.has(H.triggerName)) {
                                    const ii = lt.previousTriggersValues.get(H.triggerName)
                                      , tn = this.statesByElement.get(H.element);
                                    if (tn && tn.has(H.triggerName)) {
                                        const Iu = tn.get(H.triggerName);
                                        Iu.value = ii,
                                        tn.set(H.triggerName, Iu)
                                    }
                                }
                                return void oe.destroy()
                            }
                        }
                        const Nn = !d || !this.driver.containsElement(d, Ke)
                          , Bt = v.get(Ke)
                          , Dr = p.get(Ke)
                          , Te = this._buildInstruction(H, r, Dr, Bt, Nn);
                        if (Te.errors && Te.errors.length)
                            return void te.push(Te);
                        if (Nn)
                            return oe.onStart(()=>ni(Ke, Te.fromStyles)),
                            oe.onDestroy(()=>Mn(Ke, Te.toStyles)),
                            void i.push(oe);
                        if (H.isFallbackTransition)
                            return oe.onStart(()=>ni(Ke, Te.fromStyles)),
                            oe.onDestroy(()=>Mn(Ke, Te.toStyles)),
                            void i.push(oe);
                        const oI = [];
                        Te.timelines.forEach(lt=>{
                            lt.stretchStartingKeyframe = !0,
                            this.disabledNodes.has(lt.element) || oI.push(lt)
                        }
                        ),
                        Te.timelines = oI,
                        r.append(Ke, Te.timelines),
                        s.push({
                            instruction: Te,
                            player: oe,
                            element: Ke
                        }),
                        Te.queriedElements.forEach(lt=>Pt(a, lt, []).push(oe)),
                        Te.preStyleProps.forEach((lt,ii)=>{
                            if (lt.size) {
                                let tn = l.get(ii);
                                tn || l.set(ii, tn = new Set),
                                lt.forEach((Iu,yp)=>tn.add(yp))
                            }
                        }
                        ),
                        Te.postStyleProps.forEach((lt,ii)=>{
                            let tn = u.get(ii);
                            tn || u.set(ii, tn = new Set),
                            lt.forEach((Iu,yp)=>tn.add(yp))
                        }
                        )
                    }
                    );
                if (te.length) {
                    const R = [];
                    te.forEach(L=>{
                        R.push(function WB(n, e) {
                            return new b(3505,!1)
                        }())
                    }
                    ),
                    Q.forEach(L=>L.destroy()),
                    this.reportError(R)
                }
                const Ie = new Map
                  , Lt = new Map;
                s.forEach(R=>{
                    const L = R.element;
                    r.has(L) && (Lt.set(L, L),
                    this._beforeAnimationBuild(R.player.namespaceId, R.instruction, Ie))
                }
                ),
                i.forEach(R=>{
                    const L = R.element;
                    this._getPreviousPlayers(L, !1, R.namespaceId, R.triggerName, null).forEach(oe=>{
                        Pt(Ie, L, []).push(oe),
                        oe.destroy()
                    }
                    )
                }
                );
                const Vt = y.filter(R=>XS(R, l, u))
                  , Ut = new Map;
                QS(Ut, this.driver, S, u, Yn).forEach(R=>{
                    XS(R, l, u) && Vt.push(R)
                }
                );
                const er = new Map;
                f.forEach((R,L)=>{
                    QS(er, this.driver, new Set(R), l, "!")
                }
                ),
                Vt.forEach(R=>{
                    const L = Ut.get(R)
                      , H = er.get(R);
                    Ut.set(R, new Map([...Array.from(L?.entries() ?? []), ...Array.from(H?.entries() ?? [])]))
                }
                );
                const gn = []
                  , co = []
                  , ho = {};
                s.forEach(R=>{
                    const {element: L, player: H, instruction: oe} = R;
                    if (r.has(L)) {
                        if (c.has(L))
                            return H.onDestroy(()=>Mn(L, oe.toStyles)),
                            H.disabled = !0,
                            H.overrideTotalTime(oe.totalTime),
                            void i.push(H);
                        let Ke = ho;
                        if (Lt.size > 1) {
                            let Bt = L;
                            const Dr = [];
                            for (; Bt = Bt.parentNode; ) {
                                const Te = Lt.get(Bt);
                                if (Te) {
                                    Ke = Te;
                                    break
                                }
                                Dr.push(Bt)
                            }
                            Dr.forEach(Te=>Lt.set(Te, Ke))
                        }
                        const Nn = this._buildAnimation(H.namespaceId, oe, Ie, o, er, Ut);
                        if (H.setRealPlayer(Nn),
                        Ke === ho)
                            gn.push(H);
                        else {
                            const Bt = this.playersByElement.get(Ke);
                            Bt && Bt.length && (H.parentPlayer = Cr(Bt)),
                            i.push(H)
                        }
                    } else
                        ni(L, oe.fromStyles),
                        H.onDestroy(()=>Mn(L, oe.toStyles)),
                        co.push(H),
                        c.has(L) && i.push(H)
                }
                ),
                co.forEach(R=>{
                    const L = o.get(R.element);
                    if (L && L.length) {
                        const H = Cr(L);
                        R.setRealPlayer(H)
                    }
                }
                ),
                i.forEach(R=>{
                    R.parentPlayer ? R.syncPlayerEvents(R.parentPlayer) : R.destroy()
                }
                );
                for (let R = 0; R < y.length; R++) {
                    const L = y[R]
                      , H = L[Jt];
                    if (lo(L, uu),
                    H && H.hasAnimation)
                        continue;
                    let oe = [];
                    if (a.size) {
                        let Nn = a.get(L);
                        Nn && Nn.length && oe.push(...Nn);
                        let Bt = this.driver.query(L, tp, !0);
                        for (let Dr = 0; Dr < Bt.length; Dr++) {
                            let Te = a.get(Bt[Dr]);
                            Te && Te.length && oe.push(...Te)
                        }
                    }
                    const Ke = oe.filter(Nn=>!Nn.destroyed);
                    Ke.length ? Y2(this, L, Ke) : this.processLeaveNode(L)
                }
                return y.length = 0,
                gn.forEach(R=>{
                    this.players.push(R),
                    R.onDone(()=>{
                        R.destroy();
                        const L = this.players.indexOf(R);
                        this.players.splice(L, 1)
                    }
                    ),
                    R.play()
                }
                ),
                gn
            }
            elementContainsData(e, t) {
                let r = !1;
                const i = t[Jt];
                return i && i.setForRemoval && (r = !0),
                this.playersByElement.has(t) && (r = !0),
                this.playersByQueriedElement.has(t) && (r = !0),
                this.statesByElement.has(t) && (r = !0),
                this._fetchNamespace(e).elementContainsData(t) || r
            }
            afterFlush(e) {
                this._flushFns.push(e)
            }
            afterFlushAnimationsDone(e) {
                this._whenQuietFns.push(e)
            }
            _getPreviousPlayers(e, t, r, i, o) {
                let s = [];
                if (t) {
                    const a = this.playersByQueriedElement.get(e);
                    a && (s = a)
                } else {
                    const a = this.playersByElement.get(e);
                    if (a) {
                        const l = !o || o == zs;
                        a.forEach(u=>{
                            u.queued || !l && u.triggerName != i || s.push(u)
                        }
                        )
                    }
                }
                return (r || i) && (s = s.filter(a=>!(r && r != a.namespaceId || i && i != a.triggerName))),
                s
            }
            _beforeAnimationBuild(e, t, r) {
                const o = t.element
                  , s = t.isRemovalTransition ? void 0 : e
                  , a = t.isRemovalTransition ? void 0 : t.triggerName;
                for (const l of t.timelines) {
                    const u = l.element
                      , c = u !== o
                      , d = Pt(r, u, []);
                    this._getPreviousPlayers(u, c, s, a, t.toState).forEach(f=>{
                        const p = f.getRealPlayer();
                        p.beforeDestroy && p.beforeDestroy(),
                        f.destroy(),
                        d.push(f)
                    }
                    )
                }
                ni(o, t.fromStyles)
            }
            _buildAnimation(e, t, r, i, o, s) {
                const a = t.triggerName
                  , l = t.element
                  , u = []
                  , c = new Set
                  , d = new Set
                  , h = t.timelines.map(p=>{
                    const g = p.element;
                    c.add(g);
                    const y = g[Jt];
                    if (y && y.removedBeforeQueried)
                        return new ws(p.duration,p.delay);
                    const C = g !== l
                      , S = function Z2(n) {
                        const e = [];
                        return ZS(n, e),
                        e
                    }((r.get(g) || G2).map(Ie=>Ie.getRealPlayer())).filter(Ie=>!!Ie.element && Ie.element === g)
                      , v = o.get(g)
                      , N = s.get(g)
                      , Q = DS(0, this._normalizer, 0, p.keyframes, v, N)
                      , te = this._buildPlayer(p, Q, S);
                    if (p.subTimeline && i && d.add(g),
                    C) {
                        const Ie = new mp(e,a,g);
                        Ie.setRealPlayer(te),
                        u.push(Ie)
                    }
                    return te
                }
                );
                u.forEach(p=>{
                    Pt(this.playersByQueriedElement, p.element, []).push(p),
                    p.onDone(()=>function q2(n, e, t) {
                        let r = n.get(e);
                        if (r) {
                            if (r.length) {
                                const i = r.indexOf(t);
                                r.splice(i, 1)
                            }
                            0 == r.length && n.delete(e)
                        }
                        return r
                    }(this.playersByQueriedElement, p.element, p))
                }
                ),
                c.forEach(p=>en(p, RS));
                const f = Cr(h);
                return f.onDestroy(()=>{
                    c.forEach(p=>lo(p, RS)),
                    Mn(l, t.toStyles)
                }
                ),
                d.forEach(p=>{
                    Pt(i, p, []).push(f)
                }
                ),
                f
            }
            _buildPlayer(e, t, r) {
                return t.length > 0 ? this.driver.animate(e.element, t, e.duration, e.delay, e.easing, r) : new ws(e.duration,e.delay)
            }
        }
        class mp {
            constructor(e, t, r) {
                this.namespaceId = e,
                this.triggerName = t,
                this.element = r,
                this._player = new ws,
                this._containsRealPlayer = !1,
                this._queuedCallbacks = new Map,
                this.destroyed = !1,
                this.markedForDestroy = !1,
                this.disabled = !1,
                this.queued = !0,
                this.totalTime = 0
            }
            setRealPlayer(e) {
                this._containsRealPlayer || (this._player = e,
                this._queuedCallbacks.forEach((t,r)=>{
                    t.forEach(i=>Kf(e, r, void 0, i))
                }
                ),
                this._queuedCallbacks.clear(),
                this._containsRealPlayer = !0,
                this.overrideTotalTime(e.totalTime),
                this.queued = !1)
            }
            getRealPlayer() {
                return this._player
            }
            overrideTotalTime(e) {
                this.totalTime = e
            }
            syncPlayerEvents(e) {
                const t = this._player;
                t.triggerCallback && e.onStart(()=>t.triggerCallback("start")),
                e.onDone(()=>this.finish()),
                e.onDestroy(()=>this.destroy())
            }
            _queueEvent(e, t) {
                Pt(this._queuedCallbacks, e, []).push(t)
            }
            onDone(e) {
                this.queued && this._queueEvent("done", e),
                this._player.onDone(e)
            }
            onStart(e) {
                this.queued && this._queueEvent("start", e),
                this._player.onStart(e)
            }
            onDestroy(e) {
                this.queued && this._queueEvent("destroy", e),
                this._player.onDestroy(e)
            }
            init() {
                this._player.init()
            }
            hasStarted() {
                return !this.queued && this._player.hasStarted()
            }
            play() {
                !this.queued && this._player.play()
            }
            pause() {
                !this.queued && this._player.pause()
            }
            restart() {
                !this.queued && this._player.restart()
            }
            finish() {
                this._player.finish()
            }
            destroy() {
                this.destroyed = !0,
                this._player.destroy()
            }
            reset() {
                !this.queued && this._player.reset()
            }
            setPosition(e) {
                this.queued || this._player.setPosition(e)
            }
            getPosition() {
                return this.queued ? 0 : this._player.getPosition()
            }
            triggerCallback(e) {
                const t = this._player;
                t.triggerCallback && t.triggerCallback(e)
            }
        }
        function bu(n) {
            return n && 1 === n.nodeType
        }
        function KS(n, e) {
            const t = n.style.display;
            return n.style.display = e ?? "none",
            t
        }
        function QS(n, e, t, r, i) {
            const o = [];
            t.forEach(l=>o.push(KS(l)));
            const s = [];
            r.forEach((l,u)=>{
                const c = new Map;
                l.forEach(d=>{
                    const h = e.computeStyle(u, d, i);
                    c.set(d, h),
                    (!h || 0 == h.length) && (u[Jt] = $2,
                    s.push(u))
                }
                ),
                n.set(u, c)
            }
            );
            let a = 0;
            return t.forEach(l=>KS(l, o[a++])),
            s
        }
        function YS(n, e) {
            const t = new Map;
            if (n.forEach(a=>t.set(a, [])),
            0 == e.length)
                return t;
            const i = new Set(e)
              , o = new Map;
            function s(a) {
                if (!a)
                    return 1;
                let l = o.get(a);
                if (l)
                    return l;
                const u = a.parentNode;
                return l = t.has(u) ? u : i.has(u) ? 1 : s(u),
                o.set(a, l),
                l
            }
            return e.forEach(a=>{
                const l = s(a);
                1 !== l && t.get(l).push(a)
            }
            ),
            t
        }
        function en(n, e) {
            n.classList?.add(e)
        }
        function lo(n, e) {
            n.classList?.remove(e)
        }
        function Y2(n, e, t) {
            Cr(t).onDone(()=>n.processLeaveNode(e))
        }
        function ZS(n, e) {
            for (let t = 0; t < n.length; t++) {
                const r = n[t];
                r instanceof oD ? ZS(r.players, e) : e.push(r)
            }
        }
        function XS(n, e, t) {
            const r = t.get(n);
            if (!r)
                return !1;
            let i = e.get(n);
            return i ? r.forEach(o=>i.add(o)) : e.set(n, r),
            t.delete(n),
            !0
        }
        class Du {
            constructor(e, t, r) {
                this.bodyNode = e,
                this._driver = t,
                this._normalizer = r,
                this._triggerCache = {},
                this.onRemovalComplete = (i,o)=>{}
                ,
                this._transitionEngine = new W2(e,t,r),
                this._timelineEngine = new V2(e,t,r),
                this._transitionEngine.onRemovalComplete = (i,o)=>this.onRemovalComplete(i, o)
            }
            registerTrigger(e, t, r, i, o) {
                const s = e + "-" + i;
                let a = this._triggerCache[s];
                if (!a) {
                    const l = []
                      , c = op(this._driver, o, l, []);
                    if (l.length)
                        throw function PB(n, e) {
                            return new b(3404,!1)
                        }();
                    a = function F2(n, e, t) {
                        return new P2(n,e,t)
                    }(i, c, this._normalizer),
                    this._triggerCache[s] = a
                }
                this._transitionEngine.registerTrigger(t, i, a)
            }
            register(e, t) {
                this._transitionEngine.register(e, t)
            }
            destroy(e, t) {
                this._transitionEngine.destroy(e, t)
            }
            onInsert(e, t, r, i) {
                this._transitionEngine.insertNode(e, t, r, i)
            }
            onRemove(e, t, r, i) {
                this._transitionEngine.removeNode(e, t, i || !1, r)
            }
            disableAnimations(e, t) {
                this._transitionEngine.markElementAsDisabled(e, t)
            }
            process(e, t, r, i) {
                if ("@" == r.charAt(0)) {
                    const [o,s] = SS(r);
                    this._timelineEngine.command(o, t, s, i)
                } else
                    this._transitionEngine.trigger(e, t, r, i)
            }
            listen(e, t, r, i, o) {
                if ("@" == r.charAt(0)) {
                    const [s,a] = SS(r);
                    return this._timelineEngine.listen(s, t, a, o)
                }
                return this._transitionEngine.listen(e, t, r, i, o)
            }
            flush(e=-1) {
                this._transitionEngine.flush(e)
            }
            get players() {
                return this._transitionEngine.players.concat(this._timelineEngine.players)
            }
            whenRenderingDone() {
                return this._transitionEngine.whenRenderingDone()
            }
        }
        let eH = (()=>{
            class n {
                constructor(t, r, i) {
                    this._element = t,
                    this._startStyles = r,
                    this._endStyles = i,
                    this._state = 0;
                    let o = n.initialStylesByElement.get(t);
                    o || n.initialStylesByElement.set(t, o = new Map),
                    this._initialStyles = o
                }
                start() {
                    this._state < 1 && (this._startStyles && Mn(this._element, this._startStyles, this._initialStyles),
                    this._state = 1)
                }
                finish() {
                    this.start(),
                    this._state < 2 && (Mn(this._element, this._initialStyles),
                    this._endStyles && (Mn(this._element, this._endStyles),
                    this._endStyles = null),
                    this._state = 1)
                }
                destroy() {
                    this.finish(),
                    this._state < 3 && (n.initialStylesByElement.delete(this._element),
                    this._startStyles && (ni(this._element, this._startStyles),
                    this._endStyles = null),
                    this._endStyles && (ni(this._element, this._endStyles),
                    this._endStyles = null),
                    Mn(this._element, this._initialStyles),
                    this._state = 3)
                }
            }
            return n.initialStylesByElement = new WeakMap,
            n
        }
        )();
        function gp(n) {
            let e = null;
            return n.forEach((t,r)=>{
                (function tH(n) {
                    return "display" === n || "position" === n
                }
                )(r) && (e = e || new Map,
                e.set(r, t))
            }
            ),
            e
        }
        class JS {
            constructor(e, t, r, i) {
                this.element = e,
                this.keyframes = t,
                this.options = r,
                this._specialStyles = i,
                this._onDoneFns = [],
                this._onStartFns = [],
                this._onDestroyFns = [],
                this._initialized = !1,
                this._finished = !1,
                this._started = !1,
                this._destroyed = !1,
                this._originalOnDoneFns = [],
                this._originalOnStartFns = [],
                this.time = 0,
                this.parentPlayer = null,
                this.currentSnapshot = new Map,
                this._duration = r.duration,
                this._delay = r.delay || 0,
                this.time = this._duration + this._delay
            }
            _onFinish() {
                this._finished || (this._finished = !0,
                this._onDoneFns.forEach(e=>e()),
                this._onDoneFns = [])
            }
            init() {
                this._buildPlayer(),
                this._preparePlayerBeforeStart()
            }
            _buildPlayer() {
                if (this._initialized)
                    return;
                this._initialized = !0;
                const e = this.keyframes;
                this.domPlayer = this._triggerWebAnimation(this.element, e, this.options),
                this._finalKeyframe = e.length ? e[e.length - 1] : new Map,
                this.domPlayer.addEventListener("finish", ()=>this._onFinish())
            }
            _preparePlayerBeforeStart() {
                this._delay ? this._resetDomPlayerState() : this.domPlayer.pause()
            }
            _convertKeyframesToObject(e) {
                const t = [];
                return e.forEach(r=>{
                    t.push(Object.fromEntries(r))
                }
                ),
                t
            }
            _triggerWebAnimation(e, t, r) {
                return e.animate(this._convertKeyframesToObject(t), r)
            }
            onStart(e) {
                this._originalOnStartFns.push(e),
                this._onStartFns.push(e)
            }
            onDone(e) {
                this._originalOnDoneFns.push(e),
                this._onDoneFns.push(e)
            }
            onDestroy(e) {
                this._onDestroyFns.push(e)
            }
            play() {
                this._buildPlayer(),
                this.hasStarted() || (this._onStartFns.forEach(e=>e()),
                this._onStartFns = [],
                this._started = !0,
                this._specialStyles && this._specialStyles.start()),
                this.domPlayer.play()
            }
            pause() {
                this.init(),
                this.domPlayer.pause()
            }
            finish() {
                this.init(),
                this._specialStyles && this._specialStyles.finish(),
                this._onFinish(),
                this.domPlayer.finish()
            }
            reset() {
                this._resetDomPlayerState(),
                this._destroyed = !1,
                this._finished = !1,
                this._started = !1,
                this._onStartFns = this._originalOnStartFns,
                this._onDoneFns = this._originalOnDoneFns
            }
            _resetDomPlayerState() {
                this.domPlayer && this.domPlayer.cancel()
            }
            restart() {
                this.reset(),
                this.play()
            }
            hasStarted() {
                return this._started
            }
            destroy() {
                this._destroyed || (this._destroyed = !0,
                this._resetDomPlayerState(),
                this._onFinish(),
                this._specialStyles && this._specialStyles.destroy(),
                this._onDestroyFns.forEach(e=>e()),
                this._onDestroyFns = [])
            }
            setPosition(e) {
                void 0 === this.domPlayer && this.init(),
                this.domPlayer.currentTime = e * this.time
            }
            getPosition() {
                return this.domPlayer.currentTime / this.time
            }
            get totalTime() {
                return this._delay + this._duration
            }
            beforeDestroy() {
                const e = new Map;
                this.hasStarted() && this._finalKeyframe.forEach((r,i)=>{
                    "offset" !== i && e.set(i, this._finished ? r : VS(this.element, i))
                }
                ),
                this.currentSnapshot = e
            }
            triggerCallback(e) {
                const t = "start" === e ? this._onStartFns : this._onDoneFns;
                t.forEach(r=>r()),
                t.length = 0
            }
        }
        class nH {
            validateStyleProperty(e) {
                return !0
            }
            validateAnimatableStyleProperty(e) {
                return !0
            }
            matchesElement(e, t) {
                return !1
            }
            containsElement(e, t) {
                return AS(e, t)
            }
            getParentElement(e) {
                return Xf(e)
            }
            query(e, t, r) {
                return MS(e, t, r)
            }
            computeStyle(e, t, r) {
                return window.getComputedStyle(e)[t]
            }
            animate(e, t, r, i, o, s=[]) {
                const l = {
                    duration: r,
                    delay: i,
                    fill: 0 == i ? "both" : "forwards"
                };
                o && (l.easing = o);
                const u = new Map
                  , c = s.filter(f=>f instanceof JS);
                (function s2(n, e) {
                    return 0 === n || 0 === e
                }
                )(r, i) && c.forEach(f=>{
                    f.currentSnapshot.forEach((p,g)=>u.set(g, p))
                }
                );
                let d = function t2(n) {
                    return n.length ? n[0]instanceof Map ? n : n.map(e=>xS(e)) : []
                }(t).map(f=>br(f));
                d = function a2(n, e, t) {
                    if (t.size && e.length) {
                        let r = e[0]
                          , i = [];
                        if (t.forEach((o,s)=>{
                            r.has(s) || i.push(s),
                            r.set(s, o)
                        }
                        ),
                        i.length)
                            for (let o = 1; o < e.length; o++) {
                                let s = e[o];
                                i.forEach(a=>s.set(a, VS(n, a)))
                            }
                    }
                    return e
                }(e, d, u);
                const h = function J2(n, e) {
                    let t = null
                      , r = null;
                    return Array.isArray(e) && e.length ? (t = gp(e[0]),
                    e.length > 1 && (r = gp(e[e.length - 1]))) : e instanceof Map && (t = gp(e)),
                    t || r ? new eH(n,t,r) : null
                }(e, d);
                return new JS(e,d,l,h)
            }
        }
        let rH = (()=>{
            class n extends nD {
                constructor(t, r) {
                    super(),
                    this._nextAnimationId = 0,
                    this._renderer = t.createRenderer(r.body, {
                        id: "0",
                        encapsulation: rn.None,
                        styles: [],
                        data: {
                            animation: []
                        }
                    })
                }
                build(t) {
                    const r = this._nextAnimationId.toString();
                    this._nextAnimationId++;
                    const i = Array.isArray(t) ? rD(t) : t;
                    return eI(this._renderer, null, r, "register", [i]),
                    new iH(r,this._renderer)
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Ho),T(Re))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac
            }),
            n
        }
        )();
        class iH extends class mL {
        }
        {
            constructor(e, t) {
                super(),
                this._id = e,
                this._renderer = t
            }
            create(e, t) {
                return new oH(this._id,e,t || {},this._renderer)
            }
        }
        class oH {
            constructor(e, t, r, i) {
                this.id = e,
                this.element = t,
                this._renderer = i,
                this.parentPlayer = null,
                this._started = !1,
                this.totalTime = 0,
                this._command("create", r)
            }
            _listen(e, t) {
                return this._renderer.listen(this.element, `@@${this.id}:${e}`, t)
            }
            _command(e, ...t) {
                return eI(this._renderer, this.element, this.id, e, t)
            }
            onDone(e) {
                this._listen("done", e)
            }
            onStart(e) {
                this._listen("start", e)
            }
            onDestroy(e) {
                this._listen("destroy", e)
            }
            init() {
                this._command("init")
            }
            hasStarted() {
                return this._started
            }
            play() {
                this._command("play"),
                this._started = !0
            }
            pause() {
                this._command("pause")
            }
            restart() {
                this._command("restart")
            }
            finish() {
                this._command("finish")
            }
            destroy() {
                this._command("destroy")
            }
            reset() {
                this._command("reset"),
                this._started = !1
            }
            setPosition(e) {
                this._command("setPosition", e)
            }
            getPosition() {
                return this._renderer.engine.players[+this.id]?.getPosition() ?? 0
            }
        }
        function eI(n, e, t, r, i) {
            return n.setProperty(e, `@@${t}:${r}`, i)
        }
        const tI = "@.disabled";
        let sH = (()=>{
            class n {
                constructor(t, r, i) {
                    this.delegate = t,
                    this.engine = r,
                    this._zone = i,
                    this._currentId = 0,
                    this._microtaskId = 1,
                    this._animationCallbacksBuffer = [],
                    this._rendererCache = new Map,
                    this._cdRecurDepth = 0,
                    this.promise = Promise.resolve(0),
                    r.onRemovalComplete = (o,s)=>{
                        const a = s?.parentNode(o);
                        a && s.removeChild(a, o)
                    }
                }
                createRenderer(t, r) {
                    const o = this.delegate.createRenderer(t, r);
                    if (!(t && r && r.data && r.data.animation)) {
                        let c = this._rendererCache.get(o);
                        return c || (c = new nI("",o,this.engine,()=>this._rendererCache.delete(o)),
                        this._rendererCache.set(o, c)),
                        c
                    }
                    const s = r.id
                      , a = r.id + "-" + this._currentId;
                    this._currentId++,
                    this.engine.register(a, t);
                    const l = c=>{
                        Array.isArray(c) ? c.forEach(l) : this.engine.registerTrigger(s, a, t, c.name, c)
                    }
                    ;
                    return r.data.animation.forEach(l),
                    new aH(this,a,o,this.engine)
                }
                begin() {
                    this._cdRecurDepth++,
                    this.delegate.begin && this.delegate.begin()
                }
                _scheduleCountTask() {
                    this.promise.then(()=>{
                        this._microtaskId++
                    }
                    )
                }
                scheduleListenerCallback(t, r, i) {
                    t >= 0 && t < this._microtaskId ? this._zone.run(()=>r(i)) : (0 == this._animationCallbacksBuffer.length && Promise.resolve(null).then(()=>{
                        this._zone.run(()=>{
                            this._animationCallbacksBuffer.forEach(o=>{
                                const [s,a] = o;
                                s(a)
                            }
                            ),
                            this._animationCallbacksBuffer = []
                        }
                        )
                    }
                    ),
                    this._animationCallbacksBuffer.push([r, i]))
                }
                end() {
                    this._cdRecurDepth--,
                    0 == this._cdRecurDepth && this._zone.runOutsideAngular(()=>{
                        this._scheduleCountTask(),
                        this.engine.flush(this._microtaskId)
                    }
                    ),
                    this.delegate.end && this.delegate.end()
                }
                whenRenderingDone() {
                    return this.engine.whenRenderingDone()
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)(T(Ho),T(Du),T(ve))
            }
            ,
            n.\u0275prov = F({
                token: n,
                factory: n.\u0275fac
            }),
            n
        }
        )();
        class nI {
            constructor(e, t, r, i) {
                this.namespaceId = e,
                this.delegate = t,
                this.engine = r,
                this._onDestroy = i,
                this.destroyNode = this.delegate.destroyNode ? o=>t.destroyNode(o) : null
            }
            get data() {
                return this.delegate.data
            }
            destroy() {
                this.engine.destroy(this.namespaceId, this.delegate),
                this.delegate.destroy(),
                this._onDestroy?.()
            }
            createElement(e, t) {
                return this.delegate.createElement(e, t)
            }
            createComment(e) {
                return this.delegate.createComment(e)
            }
            createText(e) {
                return this.delegate.createText(e)
            }
            appendChild(e, t) {
                this.delegate.appendChild(e, t),
                this.engine.onInsert(this.namespaceId, t, e, !1)
            }
            insertBefore(e, t, r, i=!0) {
                this.delegate.insertBefore(e, t, r),
                this.engine.onInsert(this.namespaceId, t, e, i)
            }
            removeChild(e, t, r) {
                this.engine.onRemove(this.namespaceId, t, this.delegate, r)
            }
            selectRootElement(e, t) {
                return this.delegate.selectRootElement(e, t)
            }
            parentNode(e) {
                return this.delegate.parentNode(e)
            }
            nextSibling(e) {
                return this.delegate.nextSibling(e)
            }
            setAttribute(e, t, r, i) {
                this.delegate.setAttribute(e, t, r, i)
            }
            removeAttribute(e, t, r) {
                this.delegate.removeAttribute(e, t, r)
            }
            addClass(e, t) {
                this.delegate.addClass(e, t)
            }
            removeClass(e, t) {
                this.delegate.removeClass(e, t)
            }
            setStyle(e, t, r, i) {
                this.delegate.setStyle(e, t, r, i)
            }
            removeStyle(e, t, r) {
                this.delegate.removeStyle(e, t, r)
            }
            setProperty(e, t, r) {
                "@" == t.charAt(0) && t == tI ? this.disableAnimations(e, !!r) : this.delegate.setProperty(e, t, r)
            }
            setValue(e, t) {
                this.delegate.setValue(e, t)
            }
            listen(e, t, r) {
                return this.delegate.listen(e, t, r)
            }
            disableAnimations(e, t) {
                this.engine.disableAnimations(e, t)
            }
        }
        class aH extends nI {
            constructor(e, t, r, i, o) {
                super(t, r, i, o),
                this.factory = e,
                this.namespaceId = t
            }
            setProperty(e, t, r) {
                "@" == t.charAt(0) ? "." == t.charAt(1) && t == tI ? this.disableAnimations(e, r = void 0 === r || !!r) : this.engine.process(this.namespaceId, e, t.slice(1), r) : this.delegate.setProperty(e, t, r)
            }
            listen(e, t, r) {
                if ("@" == t.charAt(0)) {
                    const i = function lH(n) {
                        switch (n) {
                        case "body":
                            return document.body;
                        case "document":
                            return document;
                        case "window":
                            return window;
                        default:
                            return n
                        }
                    }(e);
                    let o = t.slice(1)
                      , s = "";
                    return "@" != o.charAt(0) && ([o,s] = function uH(n) {
                        const e = n.indexOf(".");
                        return [n.substring(0, e), n.slice(e + 1)]
                    }(o)),
                    this.engine.listen(this.namespaceId, i, o, s, a=>{
                        this.factory.scheduleListenerCallback(a._data || -1, r, a)
                    }
                    )
                }
                return this.delegate.listen(e, t, r)
            }
        }
        const rI = [{
            provide: nD,
            useClass: rH
        }, {
            provide: cp,
            useFactory: function dH() {
                return new N2
            }
        }, {
            provide: Du,
            useClass: (()=>{
                class n extends Du {
                    constructor(t, r, i, o) {
                        super(t.body, r, i)
                    }
                    ngOnDestroy() {
                        this.flush()
                    }
                }
                return n.\u0275fac = function(t) {
                    return new (t || n)(T(Re),T(Jf),T(cp),T(us))
                }
                ,
                n.\u0275prov = F({
                    token: n,
                    factory: n.\u0275fac
                }),
                n
            }
            )()
        }, {
            provide: Ho,
            useFactory: function hH(n, e, t) {
                return new sH(n,e,t)
            },
            deps: [Dl, Du, ve]
        }]
          , _p = [{
            provide: Jf,
            useFactory: ()=>new nH
        }, {
            provide: ls,
            useValue: "BrowserAnimations"
        }, ...rI]
          , iI = [{
            provide: Jf,
            useClass: NS
        }, {
            provide: ls,
            useValue: "NoopAnimations"
        }, ...rI];
        let fH = (()=>{
            class n {
                static withConfig(t) {
                    return {
                        ngModule: n,
                        providers: t.disableAnimations ? iI : _p
                    }
                }
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275mod = vt({
                type: n
            }),
            n.\u0275inj = ut({
                providers: _p,
                imports: [pC]
            }),
            n
        }
        )()
          , pH = (()=>{
            class n {
            }
            return n.\u0275fac = function(t) {
                return new (t || n)
            }
            ,
            n.\u0275mod = vt({
                type: n,
                bootstrap: [fB]
            }),
            n.\u0275inj = ut({
                imports: [pC, iB, fH, d1, kL]
            }),
            n
        }
        )();
        (function KR() {
            gE = !1
        }
        )(),
        AP().bootstrapModule(pH).catch(n=>console.error(n))
    }
}, me=>{
    me(me.s = 857)
}
]);

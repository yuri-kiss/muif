'use strict';

const chai = require('chai');

describe('lib/lnullj', () => {
  const lnullj = require('../../src/lib/lnullj.cjs');

  it('UNDF === undefined', () => chai.expect(lnullj.UNDF).equals(undefined, 'lnullj.UNDF was not undefined'));
  it('NULL === null', () => chai.expect(lnullj.NULL).equals(null, 'lnullj.NULL was not null'));

  describe('#empty()', () => {
    it('empty(undefined) === true', () => chai.expect(lnullj.empty(undefined), 'empty(undefined) was not true'));
    it('empty(null) === true', () => chai.expect(lnullj.empty(null), 'empty(null) was not true'));

    it('empty({}) === false', () => chai.expect(!lnullj.empty({}), 'empty({}) was not false'));
    it('empty(0) === false', () => chai.expect(!lnullj.empty(0), 'empty(0) was not false'));
    it('empty(1) === false', () => chai.expect(!lnullj.empty(1), 'empty(1) was not false'));
    it("empty('') === false", () => chai.expect(!lnullj.empty(''), "empty('') was not false"));
  });

  describe('#is()', () => {
    it('is({ __proto__: null }) === true', () => chai.expect(lnullj.is({ __proto__: null }), 'is({ __proto__: null }) was not true'));
    it('is({ __proto__: undefined }) === false', () => chai.expect(lnullj.is({ __proto__: undefined }), 'is({ __proto__: undefined }) was not false'));
    it('is({}) === false', () => chai.expect(lnullj.is({}), 'is({}) was not false'));
  });

  describe('#create()', () => {
    it('create() is null prototyped?', () => chai.expect(lnullj.is(lnullj.create()), 'create with no parameters was not null prototyped'));
  });

  describe('#assign()', () => {
    it('assign({ a: 1 }) is null prototyped?', () => chai.expect(lnullj.is(lnullj.assign({ a: 1 })), 'assign return value was not null prototyped'));

    it('create({ a: 1 }).toString === undefined', () => chai.expect(lnullj.assign({ a: 1 }).toString).equals(undefined, 'assign({ a: 1 }).toString was not undefined'));
    it('create({ a: 1 }).a === 1', () => chai.expect(lnullj.assign({ a: 1 }).a).equals(1, 'assign({ a: 1 }).a was not 1'));
  });

  describe('#create({ a: 1 })', () => {
    it('create({ a: 1 }) is null prototyped?', () => chai.expect(lnullj.is(lnullj.create({ a: 1 })), 'create with parameters was not null prototyped'));

    it('create({ a: 1 }).toString === undefined', () => chai.expect(lnullj.create({ a: 1 }).toString).equals(undefined, 'create({ a: 1 }).toString was not undefined'));
    it('create({ a: 1 }).a === 1', () => chai.expect(lnullj.create({ a: 1 }).a).equals(1, 'create({ a: 1 }).a was not 1'));
  });

  describe('#lock()', () => {
    it('lock({}) is null prototyped?', () => chai.expect(lnullj.is(lnullj.lock({})), 'lock({}) was not null prototyped'));
    it('lock({}) is frozen?', () => chai.expect(Object.isFrozen(lnullj.lock({})), 'lock({}) was not frozen'));
  });
});

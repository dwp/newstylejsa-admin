'use strict';

/* globals describe it beforeEach afterEach */

const chai = require('chai');
const dirtyChai = require('dirty-chai');
const expect = chai.expect;
const sinon = require('sinon');

const filters = require('../filters');
const getNextSixMonths = filters().getNextSixMonths;
const moment = filters().moment;
const momentFormat1 = filters().momentFormat1;
const randomise = filters().randomise;
const push = filters().push;
const unshift = filters().unshift;
const momentFormat2 = filters().momentFormat2;

chai.use(dirtyChai);

describe('getNextSixMonths', function () {
  it('should be a function', function () {
    expect(getNextSixMonths).to.be.a('function');
  });

  const baseMockArray = [{
    text: 'January',
    value: 'january-1'
  }, {
    text: 'February',
    value: 'february-1'
  }, {
    text: 'March',
    value: 'march-1'
  }, {
    text: 'April',
    value: 'april-1'
  }, {
    text: 'May',
    value: 'may-1'
  }, {
    text: 'June',
    value: 'june-1'
  }];

  describe('Without a date parameter', function () {
    it('should return the first 6 months of the year', function () {
      expect(getNextSixMonths()).to.be.an('array').to.deep.equal(baseMockArray);
    });
  });

  describe('With an invalid date parameter', function () {
    it('should return the first 6 months of the year', function () {
      expect(getNextSixMonths('hkjasdfhjkasdfhjk')).to.be.an('array').to.deep.equal(baseMockArray);
    });
  });

  describe('With a valid date parameter', function () {
    it('should return the next 6 months from the valid date\'s month', function () {
      expect(getNextSixMonths(5)).to.be.an('array').to.deep.equal([{
        text: 'June',
        value: 'june-1'
      }, {
        text: 'July',
        value: 'july-1'
      }, {
        text: 'August',
        value: 'august-1'
      }, {
        text: 'September',
        value: 'september-1'
      }, {
        text: 'October',
        value: 'october-1'
      }, {
        text: 'November',
        value: 'november-1'
      }]);

      expect(getNextSixMonths(11)).to.be.an('array').to.deep.equal([{
        text: 'December',
        value: 'december-1'
      }, {
        text: 'January',
        value: 'january-2'
      }, {
        text: 'February',
        value: 'february-2'
      }, {
        text: 'March',
        value: 'march-2'
      }, {
        text: 'April',
        value: 'april-2'
      }, {
        text: 'May',
        value: 'may-2'
      }]);
    });
  });
});

describe('moment', function () {
  let clock;

  // Install fake clock to freeze time at 01/01/1970
  beforeEach(function () {
    clock = sinon.useFakeTimers({
      now: 0,
      toFake: ['Date']
    });
  });

  // Restore clock
  afterEach(function () {
    clock.restore();
  });

  it('should be a function', function () {
    expect(moment).to.be.a('function');
  });

  describe('Without parameters', function () {
    it('should return the current date', function () {
      expect(moment()).to.be.a('string').to.equal('01/01/1970');
    });
  });

  describe('With parameters', function () {
    describe('If the date is valid', function () {
      it('should return the correct date string', function () {
        expect(moment('2018', 'add', 12, 'days')).to.be.a('string').to.equal('13/01/2018');
      });

      it('should return the current date', function () {
        expect(moment(Date.now())).to.be.a('string').to.equal('01/01/1970');
      });

      it('should return date 2 days from date passed in', function () {
        expect(moment(Date.now(), 'add', 2, 'days')).to.be.a('string').to.equal('03/01/1970');
      });

      it('should return date 1 months before date passed in', function () {
        expect(moment(Date.now(), 'subtract', 1, 'months')).to.be.a('string').to.equal('01/12/1969');
      });

      describe('If method is not recognised', function () {
        it('should return a before date', function () {
          expect(moment(Date.now(), 'meh', 1, 'months')).to.be.a('string').to.equal('01/12/1969');
        });
      });

      describe('If unit or amount is not passed in or not recognised', function () {
        it('should return date unchanged', function () {
          expect(moment(Date.now(), 'add')).to.be.a('string').to.equal('01/01/1970');
          expect(moment(Date.now(), 'add', 12)).to.be.a('string').to.equal('01/01/1970');
          expect(moment(Date.now(), 'add', 0)).to.be.a('string').to.equal('01/01/1970');
          expect(moment(Date.now(), 'add', 0, 'years')).to.be.a('string').to.equal('01/01/1970');
          expect(moment(Date.now(), 'add', 12, 'year')).to.be.a('string').to.equal('01/01/1970');
          expect(moment(Date.now(), 'add', 12, 'foo')).to.be.a('string').to.equal('01/01/1970');
        });
      });
    });

    describe('If the date is invalid', function () {
      it('should return `Invalid date` message', function () {
        expect(moment('foo', 'add', 12, 'days')).to.be.a('string').to.equal('Invalid date');
      });
    });
  });
});

describe('array methods', () => {
  describe('randomise', function () {
    it('should be a function', function () {
      expect(randomise).to.be.a('function');
    });

    it('should return array of appropriate amount of items', function () {
      expect(randomise([1, 2, 3], 1).length).to.equal(1);
      expect(randomise([1, 2, 3], 2).length).to.equal(2);
      expect(randomise([1, 2, 3], 3).length).to.equal(3);
    });
  });

  describe('push', function () {
    it('should be a function', function () {
      expect(push).to.be.a('function');
    });

    it('should return array plus one item', function () {
      expect(push([1, 2, 3], 4).length).to.equal(4);
      expect(push([1, 2, 3], 4)).to.deep.equal([1, 2, 3, 4]);
    });
  });

  describe('unshift', function () {
    it('should be a function', function () {
      expect(unshift).to.be.a('function');
    });

    it('should return array plus one item', function () {
      expect(unshift([1, 2, 3], 0).length).to.equal(4);
      expect(unshift([1, 2, 3], 0)).to.deep.equal([0, 1, 2, 3]);
    });
  });
});

describe('moment.js methods', () => {
  const date = new Date('Thu Nov 08 2018 13:24:23 GMT+0000 (GMT)');
  let clock;

  // Install fake clock to freeze time at 01/01/1970
  beforeEach(function () {
    clock = sinon.useFakeTimers({
      now: 0,
      toFake: ['Date']
    });
  });

  // Restore clock
  afterEach(function () {
    clock.restore();
  });

  describe('momentFormat1', function () {
    it('should be a function', function () {
      expect(momentFormat1).to.be.a('function');
    });

    describe('Without parameters', function () {
      it('should return the current date', function () {
        expect(momentFormat1()).to.be.a('string').to.equal('on 01/01/1970 at 01:00:00');
      });
    });

    describe('With a valid date parameter', function () {
      it('should return the date in the right format', function () {
        expect(momentFormat1(date)).to.be.a('string').to.equal('on 08/11/2018 at 13:24:23');
      });
    });
  });

  describe('momentFormat2', function () {
    it('should be a function', function () {
      expect(momentFormat2).to.be.a('function');
    });

    describe('Without parameters', function () {
      it('should return the current date', function () {
        expect(momentFormat2()).to.be.a('string').to.equal('at 01:00:00 on 01/01/1970');
      });
    });

    describe('With a valid date parameter', function () {
      it('should return the date in the right format', function () {
        expect(momentFormat2(date)).to.be.a('string').to.equal('at 13:24:23 on 08/11/2018');
      });
    });
  });
});


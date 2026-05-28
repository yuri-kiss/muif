'use strict';

module.exports = (goog) => {
  // NOTE: This is only partially implemented.
  // @todo: Implement the rest of this when we have our own logger system.
  const ns = (goog.log = {});

  ns.ENABLED = false;
  ns.ROOT_LOGGER_NAME = '';
  ns.log = goog.nullFunction;
  ns.warning = goog.nullFunction;
  ns.error = goog.nullFunction;
  ns.fine = goog.nullFunction;
  ns.info = goog.nullFunction;

  ns.Level = () => void 0;
  ns.Level.ALL = { name: 'ALL', value: -1 };
  ns.Level.CONFIG = { name: 'CONFIG', value: -1 };
  ns.Level.FINE = { name: 'FINE', value: -1 };
  ns.Level.FINER = { name: 'FINER', value: -1 };
  ns.Level.FINEST = { name: 'FINEST', value: -1 };
  ns.Level.INFO = { name: 'INFO', value: -1 };
  ns.Level.OFF = { name: 'OFF', value: -1 };
  ns.Level.SEVERE = { name: 'SEVERE', value: -1 };
  ns.Level.SHOUT = { name: 'SHOUT', value: -1 };
  ns.Level.WARNING = { name: 'WARNING', value: -1 };
};

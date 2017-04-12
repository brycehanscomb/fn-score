import AbstractExtendable from './abstract-extendable';

/**
 * @typedef {Object} Duration
 * @property {string} name
 * @property {number} length
 * @property {boolean} isDotted
 */
class Duration extends AbstractExtendable {
    toString() {
        return this.name;
    }
}

export default Duration;
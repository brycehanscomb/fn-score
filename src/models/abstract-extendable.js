export default class AbstractExtendable {
    constructor({...props}) {
        Object.assign(
            this,
            props
        );
    }
}
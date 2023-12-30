import { SecurityUtils } from './security.utils';
import { SessionUtils } from './session.utils';

const securityUtils = new SecurityUtils();
const sessionUtils = new SessionUtils();

export { sessionUtils, securityUtils };

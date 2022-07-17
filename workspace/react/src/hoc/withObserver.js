import { observer } from 'mobx-react-lite';
import inject from './inject';

const withObserver = (props) => (Component) => inject(props)(observer(Component));

export default withObserver;

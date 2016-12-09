/*       */

import { Children, Component } from 'react';


import executeTasks from './executeTasks';


class TaskRoutesExecutor extends Component {


  componentWillMount() {
    if (this.props.location) {
      executeTasks(this.props.location, this.props.dispatch);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location != null && nextProps.location !== this.props.location) {
      executeTasks(nextProps.location, nextProps.dispatch);
    }
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default TaskRoutesExecutor;

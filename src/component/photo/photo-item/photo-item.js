import React from 'react';
import { connect } from 'react-redux';
import PhotoForm from '../photo-form/photo-form';
import { renderIf } from '../../../library/utilities';
import { expenseUpdate, expenseDelete } from '../../actions/expense-actions';

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.expense; 
    this.state.edit = false;
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete() {
    this.props.expenseItemExpenseDelete(this.state);
  }

  handleUpdate () {
    this.props.expenseItemExpenseUpdate(this.state);
  }
  render() { 
    return ( 
      <div className="expense-item" id={this.props.expense._id} onDoubleClick={() => this.setState({edit: !this.state.edit})}>
        <h3>{this.props.expense.title}</h3>
        <p>Price: ${this.props.expense.price}</p>
        <button id={this.props.expense._id} onClick={this.handleDelete}>Delete</button>
        {renderIf(this.state.edit,
          <ExpenseForm expense={this.props.expense} 
            buttonText='Update' 
            onComplete={this.props.expenseItemExpenseUpdate}/>
        )}
      </div>
    );
  }
} 
const mapStateToProps = state => ({
  expenses: state,
});
const mapDispatchToProps = (dispatch, getState) => ({
  expenseItemExpenseUpdate: expense => dispatch(expenseUpdate(expense)),
  expenseItemExpenseDelete: expense => dispatch(expenseDelete(expense)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseItem);
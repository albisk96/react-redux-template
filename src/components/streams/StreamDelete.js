import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    renderAction(){
        const { id } = this.props.match.params;
        return(
        <React.Fragment>
            <button onClick={() => this.props.deleteStream(id)} className="ui primary button">Delete</button>
            <Link to={'/'} className="ui button">Cancel</Link>
        </React.Fragment>
        );
    }

    renderContent(){
        if(!this.props.stream){
            return "Are you sure you want to delete this stream?";
        } 
        return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`;
    }

    render(){
    return (
        <div>
            Stream Delete
            <Modal
            title="Delete Stream"
            content={this.renderContent()}
            action={this.renderAction()}
            onDismiss={() => history.push('/')}
            />
        </div>
    );
    }
}

const mapStatoToProps = (state, ownProps) =>{
    return { stream: state.streams[ownProps.match.params.id]}
};

export default connect(mapStatoToProps, {fetchStream, deleteStream })(StreamDelete);
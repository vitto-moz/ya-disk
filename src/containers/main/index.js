import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthService } from '../../services/auth.service';
import { getFolderPath, getItems} from "../../modules/disk/disk.selectors";
import { getFolderItems, stepBack, setPath} from "../../modules/disk/disk.actions";
import { Grid } from 'react-bootstrap';

import ItemsList from '../../components/itemsList/itemsList';
import Spinner from "../../components/spinner/spinner";
import Navigation from "../../components/navbar/navigation";
import {EMPTY, ERROR, NO_SUCH_FOLDER} from "../../modules/disk/disk.constants";

class Main extends Component { 

    setPath = (path) => {
        this.props.setPath(path);
        window.history.pushState(null, path, `${window.location.pathname}#${path}`);
    };

    stepBack = () => {
        this.props.stepBack();
        const path = getFolderPath(window.location.hash.slice(1));
        window.history.pushState(null, path, `${window.location.pathname}#${path}`);
    };

    onPopStateHandler = () => {
        const path = window.location.hash.slice(1) || 'disk:/';
        this.props.setPath(path);
    };

    componentDidMount() {
        const path = window.location.hash.slice(1) || 'disk:/';
        AuthService.authorize(this.props.getFolderItems, path);
        this.props.setPath(path);
        window.onpopstate = this.onPopStateHandler;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.path !== this.props.path) {
            this.props.getFolderItems(nextProps.path);
        }
    }

    componentWillUnmount() {
        window.onpopstate = null;
    }

    getContent(items){
        switch (items) {
            case ERROR:           return <Spinner/>; break;
            case EMPTY:           return <h2>EMPTY FOLDER</h2>; break;
            case NO_SUCH_FOLDER:  return <h2>NO SUCH FOLDER</h2>; break;
            default:              return <ItemsList onClick={this.setPath} items={items}/>;
        }
    }

    render() {
        return (
            <div className="App">
                <Navigation stepBack={this.stepBack}
                            path={this.props.path}>
                </Navigation>
                <Grid>
                    { this.props.loading
                        ? <Spinner/>
                        : (() => this.getContent(this.props.items))()}
                </Grid>
            </div>
        );
    }
}

export default connect(
    state => ({
        items: getItems(state.diskReducer),
        path: state.diskReducer.path,
        loading: state.diskReducer.loading
    }),
    {
        getFolderItems,
        setPath,
        stepBack
    }
)(Main);

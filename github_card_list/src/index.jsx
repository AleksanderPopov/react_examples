import ReactDOM from 'react-dom';
import './index.css';
import * as React from "react";
import * as axios from "axios";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardsInfo: []
        }
    }

    addNewCard(card) {
        const oldCardsInfo = this.state.cardsInfo;
        this.setState({
            cardsInfo: oldCardsInfo.concat(card)
        });
    }

    render() {
        return (
            <div>
                <Form addNewCard={(c) => this.addNewCard(c)}/>
                <CardList cardsInfo={this.state.cardsInfo   }/>
            </div>
        );
    }
}

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    onSubmitHandler(event, username) {
        event.preventDefault();
        axios.get(`https://api.github.com/users/${username}`).then(response => {
            this.props.addNewCard({
                avatarPath: response.data.avatar_url,
                name: response.data.name
            }) ;
        });
    }

    onChangeHandler(event) {
        event.preventDefault();
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={(e) => this.onSubmitHandler(e, this.state.username)}>
                <input
                    type='text'
                    placeholder='Github username'
                    onChange={(e) => this.onChangeHandler(e)}
                />
                <button type='submit'>Add Card</button>
            </form>
        );
    }
}

const CardList = props => {
    return (
        <div>
            {props.cardsInfo.map(cardInfo => <Card avatarPath={cardInfo.avatarPath} name={cardInfo.name}/>)}
        </div>
    );
};

const Card = props => {
    return (
        <div>
            <img width={75} src={props.avatarPath}/>
            <div style={{display: 'inline-block', marginLeft: 10}}>
                <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
            </div>
        </div>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));

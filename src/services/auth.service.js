import * as constants from "./auth.constants"

let getStateCB = null;
export class AuthService {
    static authorize(getState, path){
        getStateCB = getState.bind(null, path);
        this.checkToken();
    }

    static getCode(){
        window.location.replace(`${constants.AUTH_URL}response_type=${constants.RESPONSE_TYPE}&client_id=${constants.CLIENT_ID}`);
    }

    static checkCode(){
        const params = new URL(window.location.href).searchParams;
        const code = params.get('code');
        code ? this.getToken(code) : this.getCode();
    }

    static validateToken(){
        const expiresIn = parseInt(localStorage.getItem('expires_in'), 10);
        Date.now() >= expiresIn ? this.getToken() : getStateCB();
    }

    static checkToken(code){
        const token = localStorage.getItem('token');
        token === 'undefined' || token === null
            ? this.checkCode()
            : this.validateToken(code);
    }

    static getToken(code){
        const formData = new FormData();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code);
        formData.append('client_id', constants.CLIENT_ID);
        formData.append('client_secret', constants.CLIENT_SECRET);
        fetch( constants.TOKEN_URL, {
            method: 'POST',
            body: formData
        }).then(
            res => {
                if (res.status !== 200) throw new Error('BAD REQUEST');
                else return res.json();
            }
        ).then(json => {
            localStorage.setItem('token', json.access_token);
            localStorage.setItem('expires_in', Date.now() + (json.expires_in * 1000));
            getStateCB();
        }).catch(err => {
            console.log('ERROR: ', err );
            this.getCode();
        })
    }
}
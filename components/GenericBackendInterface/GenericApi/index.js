import jQuery from "jquery";
import csrftoken from "./csrf";

export default class GenericApi {
    constructor(base_url) {
        this.base_url = base_url
    }

    /**
     *
     * @param filter_param_dict
     * @return {Promise<Response>}
     */
    get(filter_param_dict) {
        console.log("GENERIC API FETCHING: ", jQuery.param(filter_param_dict), this.base_url)
        return fetch(`${this.base_url}?${jQuery.param(filter_param_dict)}`, {
            method: 'GET',
        }).then(d => {
            return d.json();
        })
    }

    /**
     * creates Post provided the relevant fields
     * @param filter_param_dict
     * @return {Promise<Response>}
     */
    create(filter_param_dict) {
        return fetch(`${this.base_url}`, {
            method: 'POST',
            credentials: 'include',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(filter_param_dict)
        }).then(d => d.json())
    }

    /**
     *
     * @param filter_param_dict : dict representing post
     * @return {Promise<any>}
     */
    update(filter_param_dict) {
        return fetch(`${this.base_url}/${dict['id']}`, {
            method: 'PUT',
            credentials: 'include',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(post)
        }).then(d => d.json())
    }

}

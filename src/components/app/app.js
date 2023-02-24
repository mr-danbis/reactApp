import React, {Component} from 'react';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';

import './app.css'

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            data: [
                {label: 'Going to learn react', important: false, liked: false, id: 1},
                {label: 'This is so cool', important: false, liked: false, id: 2},
                {label: 'My name is Daniel', important: false, liked: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.maxID = 4;
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
    }

    deleteItem(id){
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArray = [...before, ...after];

            return {
                data: newArray
            }
        });
    }

    addItem(body){
        const newItem = {
            label: body,
            important: false,
            id: this.maxID++
        }

        this.setState(({data}) => {
            const newArray = [...data, newItem];

            return {
                data: newArray
            }
        });
    }

    onToggleImportant(id){
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, important: !old.important};
            const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArray
            }
        });
    }

    onToggleLiked(id){
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, liked: !old.liked};
            const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArray
            }
        });
    }

    searchPost(items, term){
        if (term.length === 0){
            return items
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        });
    }

    filterPost(items, filter){
        if (filter === 'like') {
            return items.filter(item => item.liked);
        } else {
            return items
        }
    }

    onUpdateSearch(term){
        this.setState({term});
    }
    
    onFilterSelect(filter){
        this.setState({filter});
    }


    render(){
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.liked).length;
        const allPosts = data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className='app'> 
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className='search-panel d-flex'>
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm
                    onAdd={this.addItem}
                />
            </div>
        )
    }
}
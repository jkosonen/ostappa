class List {
    constructor() {
        this._id = '';
        this.owner = '';
        this.sharedTo = [];
        /*{
            username: String,
            canWrite: Boolean
        }*/
  
        this.color = "#2CBDD4";
        this.name = 'New list';
        this.items = [];
        /*{
            name: String,
            checked: Boolean,
            addedBy: String
        }*/
    }
}

export default List;
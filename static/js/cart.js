
class Cart{
    
    constructor(){
        this.items = [];
        this.syncCart();
        _events.on("cart_update", this.onUpdate.bind(this));
        this.onChange = function(){};
    }

    onUpdate(){
        this.syncCart();
        this.onChange();
    }

    syncCart(){
        const items = window.localStorage.getItem("cart");
        this.items = items ? JSON.parse(items) : [];
        this.renderBadge();
    }

    setQuantity(id, action){
        const index =  this.items.findIndex(e => e.id == id);
        if(index == -1) return;
        if(this.items[index].qty == 1 && action == "dec") return;
        let newQty = this.items[index].qty;
        if(action == "dec") newQty -= 1;
        else if(action == "inc") newQty += 1;
        this.items[index].qty = newQty;
        this.save();
    }

    itemExists(id){
        const index = this.items.findIndex(e => e.id == id);
        return index == -1 ? false : index;
    }
    
    renderBadge(){
        const cartBadge = document.querySelector(".cart-count");
        if(cartBadge) {
            cartBadge.innerHTML = this.items.length ? `(${this.items.length})` : "";
        };
    }

    toggleItem(item){
        if(typeof item !== "object") item = {id: item};
        const itemIndex = this.itemExists(item.id);
        if(itemIndex !== false){
            this.items.splice(itemIndex, 1);
        }
        else{
            this.items.push({
                ...item,
                qty: 1
            });
        }
        this.renderBadge();
        this.save();
    }

    save(){
        window.localStorage.setItem("cart", JSON.stringify(this.items));
        window._events.emit("cart_update");
        this.onChange();
    }
}

var _cart = new Cart();
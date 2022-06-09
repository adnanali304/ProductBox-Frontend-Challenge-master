
class Events{
    constructor(){
        this.listeners = [];
        this.channel = new BroadcastChannel('randoStore');
        this.channel.onmessage = this.trigger.bind(this);
    }
    trigger({data}){
        const {event} = data;
        const eventIndex = this.listeners.findIndex(e => e.event == event);
        if(eventIndex == -1) return;
        this.listeners[eventIndex].action();
    }
    emit(event){
        this.channel.postMessage({event: event});
    }
    on(event, action){
        this.listeners.push({
            event, action
        });
    }
}

var _events = new Events();
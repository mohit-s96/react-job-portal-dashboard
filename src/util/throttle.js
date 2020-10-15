var wait = false; 
const throttle = (callback, limit) => {                
    return function (...args) {              
        if (!wait) {                               
            callback.call(this, ...args);           
            wait = true;             
            setTimeout(() => {  
                wait = false;      
            }, limit);
        }
    }
}

export default throttle;
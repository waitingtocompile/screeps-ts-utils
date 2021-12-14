//this is a helper for lazy initialisation
//Initialize it with a factory for the desired type, and the first time anything tries to access it via get(), it will use the factory to generate it
//in addition, it offers ifExists to call a function on the lazy if it does indeed exist, returning null if it doesn't

export class Lazy<T>
{
    _factory:()=>T;
    value?:T;
    constructor(factory:()=>T)
    {
        this._factory = factory;
    }

    get():T
    {
        if(this.value === undefined)
        {
            this.value = this._factory();
        }
        return this.value;
    }
    
    initialized():boolean
    {
        return this.value !== undefined;
    }

    reset():void
    {
        this.value = undefined;
    }

    ifExists<R>(fn:(arg:T)=>R):R|null
    {
        if(this.value)
        {
            return fn(this.value);
        }
        return null;
    }
}


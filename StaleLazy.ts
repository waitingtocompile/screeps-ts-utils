import {Lazy} from "./Lazy";

//this is a special kind of lazy that intentionally only lasts a limited number of Game ticks.
//Once the that number of ticks has expired, the value will be deleted the next time it's accessed, and if necessary re-created
export class StaleLazy<T> extends Lazy<T>
{
    createdAt?:number;
    staleAfter:number;
    constructor(factory:() => T, staleAfter:number)
    {
        super(() => {this.createdAt = Game.time; return factory();});
        this.staleAfter = staleAfter;
    }

    clear():void
    {
        this.createdAt = undefined;
        this.value = undefined;
    }

    get():T
    {
        if(this.createdAt !== undefined && this.createdAt + this.staleAfter > Game.time)
        {
            this.createdAt = undefined;
            this.value = undefined;
        }
        return super.get();
    }


    ifExists<R>(fn:(arg:T)=>R):R|null
    {
        if(this.createdAt !== undefined && this.createdAt + this.staleAfter > Game.time)
        {
            return null;
        }
        return super.ifExists(fn);
    }
}


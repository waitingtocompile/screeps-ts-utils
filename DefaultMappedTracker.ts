import {DefaultMap} from "./DefaultMap";

//this is a dumb special case of DefaultMap, to get more expressive syntax on maps of numbers that I might want to increment or decrement
export class DefaultMappedTracker<K> extends DefaultMap<K, number>
{
    adjust(key:K, amount:number)
    {
        this.set(key, this.get(key) + amount);
    }
}

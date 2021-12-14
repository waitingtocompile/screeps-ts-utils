
//DefaultMap functions like a normal map, except that a factory function must be provided during construction
//Then, when trying to retrieve an element that does not exist inside the map, it will use the provided factory to create it and add it to the map
export class DefaultMap<K, V> extends Map<K, V>
{
    factory:(key:K)=>V;
    constructor(defaultFactory:(key:K)=>V)
    {
        super();
        this.factory = defaultFactory;
    }

    get(key:K):V
    {
        if(!this.has(key))
        {
            this.set(key, this.factory(key));
        }
        return super.get(key)!;
    }
}

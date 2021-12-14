declare global{
    interface Array<T>
    {
        clear():void;
    }
}


//this is just a nice little semantic handle for emptying an array. It's not strictly needed, just more expressive than setting the length to zero in place
export function Clear<T>(arr:T[])
{
    arr.length = 0;
}


/*
 * This is a utility function I threw together to be a more flexible version of foreach
 * It takes an array arr, and calls func on each element in sequence.
 * If func returns true, nothing else is done. If it returns false, that element is removed from arr, and ifRemoved is called on it (if provided)
 * The function returns an array of all elements removed from arr
 */
export function SplicingForEach<T>(arr:T[], func:(elem:T)=>boolean, ifRemoved?:(elem:T)=>void):T[]
{
    let removed:T[] = [];
    for(let index = 0; index < arr.length; index++)
    {
        if(!func(arr[index]))
        {
            removed.push(arr[index]);
            if(ifRemoved)ifRemoved(arr[index]);
            arr.splice(index, 1);
            index--;
        }
    }
    return removed;
}

//make sure to call this early on in your main.ts file to set up the array.clear function if you want to use it.
//If you don't care for that syntax, you can use the function as normal
export function AlterPrototypes()
{
    Array.prototype.clear = function()
    {
        Clear(this);
    }
}


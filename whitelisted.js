function whitelisted(obj, whitelist, preKey = null) {
    const cleanObject = (obj) => {
        if (!obj || typeof obj != 'object') return obj

        let newObj = {} 
        Object.keys(obj).forEach( k => {
            const key = preKey ? preKey + '.' + k : k
            const everything = !!whitelist.find( i => i.includes(key + '.' + '*'))
            if (!!obj[k] && typeof obj[k] === 'object' && !everything) {
                if (Array.isArray(obj[k])) {
                    if (whitelist.find( i => i.includes(key)))
                        newObj[k] = whitelisted(obj[k], whitelist, key)
                } else {
                    Object.keys(obj[k]).forEach( k2 => {
                        const kk = k + '.' + k2
                        const key = preKey ? preKey + '.' + kk : kk
                        const everything2 = !!whitelist.find( i => i.includes(key + '.' + '*'))
                        if (typeof obj[k][k2] === 'object' && !everything2) {
                            if (whitelist.find( i => i.includes(key) )) {
                                newObj[k] = newObj[k] || {}
                                newObj[k][k2] = whitelisted(obj[k][k2], whitelist, key)
                            }
                        } else {
                            const str = k + '.' + k2
                            if (whitelist.includes(str) || everything2) {
                                newObj[k] = newObj[k] || {}
                                newObj[k][k2] = obj[k][k2]
                            }
                        }
                    })
                }
            } else {
                const kk = preKey ? preKey + '.' + k : k
                if (whitelist.includes(kk) || everything) newObj[k] = obj[k]
            }
        })
        return newObj
    }

    if (typeof obj == 'object') {
        if (Array.isArray(obj))
            return obj.map( o => cleanObject(o))
        else
            return cleanObject(obj)
    } else {
        return null
    }
}

module.exports = whitelisted
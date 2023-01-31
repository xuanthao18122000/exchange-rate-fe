import md5 from 'md5'

export default function doubleHash(string: string) {
    return md5(md5(string))
}
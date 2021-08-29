export function getPos(ref,height=208){
    const {bottom}=ref.getBoundingClientRect();
    const distanceToBtm=window.innerHeight - bottom;
    const pos=distanceToBtm<height ? 'top':'bottom';
    return pos;
}
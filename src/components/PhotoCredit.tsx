export function PhotoCredit({ place }: { place: 'water' | 'mountain' }) {
  return place === 'water' ? (
    <p><a href="https://commons.wikimedia.org/wiki/File:Zhouzhuang_2.jpg" target="_blank" rel="noreferrer">Zhouzhuang 2</a> by ngader, 2006. <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noreferrer">CC BY 2.0</a>. Resized, converted to WebP and cropped in the layout.</p>
  ) : (
    <p><a href="https://commons.wikimedia.org/wiki/File:Rhumsiki_peak,_North_Cameroon_(25989204581).jpg" target="_blank" rel="noreferrer">Rhumsiki peak, North Cameroon</a> by krishna naudin, 2006. <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noreferrer">CC BY-SA 2.0</a>. Resized, converted to WebP and cropped in the layout; the adapted photograph retains the same license.</p>
  )
}

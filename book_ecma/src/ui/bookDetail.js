export function formatBookDetail(book) {
    const { title, author, isbn, price, publishDate, bookDetail = {} } = book;

    let detailInfo = `제목: ${title}\n`;
    detailInfo += `저자: ${author}\n`;
    detailInfo += `ISBN: ${isbn}\n`;
    detailInfo += `가격: ${price ? '₩' + price.toLocaleString() : '-'}\n`;
    detailInfo += `출판일: ${publishDate || '-'}\n\n`;

    if (bookDetail) {
        detailInfo += `설명: ${bookDetail.description || '-'}\n`;
        detailInfo += `언어: ${bookDetail.language || '-'}\n`;
        detailInfo += `페이지 수: ${bookDetail.pageCount || '-'}\n`;
        detailInfo += `출판사: ${bookDetail.publisher || '-'}\n`;
        detailInfo += `에디션: ${bookDetail.edition || '-'}\n`;
        detailInfo += `표지 이미지: ${bookDetail.coverImageUrl || '-'}`;
    }

    return detailInfo;
}
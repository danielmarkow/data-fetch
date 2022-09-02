import Button from "react-bootstrap/Button";

function Pagination({items, pageSize, onPageChange}) {

    function range(start, end) {
        return Array(end - start + 1)
            .fill(0)
            .map((item, i) => start + i);
    }

    if (items.length <= 1) return null;

    let num = Math.ceil(items.length / pageSize);
    let pages = range(1, num + 1);

    const list = pages.map(page => {
        return (
            <Button key={page} onClick={onPageChange} className="page-item">
                {page}
            </Button>
        );
    });

    return (
        <nav>
            <ul className="pagination">{list}</ul>
        </nav>
    );
};

export default Pagination;
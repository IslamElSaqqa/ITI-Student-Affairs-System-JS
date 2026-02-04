export class Pagination {
    constructor(data, itemsPerPage = 10) {
        this.allData = data;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.totalPages = Math.ceil(data.length / itemsPerPage);
    }

    setData(data) {
        this.allData = data;
        this.totalPages = Math.ceil(data.length / this.itemsPerPage);
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages || 1;
        }
    }

    setItemsPerPage(itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
        this.totalPages = Math.ceil(this.allData.length / itemsPerPage);
        this.currentPage = 1;
    }

    getCurrentPageData() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.allData.slice(startIndex, endIndex);
    }

    goToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
            this.currentPage = pageNumber;
            return true;
        }
        return false;
    }

    nextPage() {
        return this.goToPage(this.currentPage + 1);
    }

    previousPage() {
        return this.goToPage(this.currentPage - 1);
    }

    getPageInfo() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endIndex = Math.min(this.currentPage * this.itemsPerPage, this.allData.length);
        return {
            startIndex,
            endIndex,
            total: this.allData.length,
            currentPage: this.currentPage,
            totalPages: this.totalPages
        };
    }

    renderPaginationButtons(containerId) {
        const container = document.querySelector(containerId);
        if (!container) return;

        container.innerHTML = '';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.textContent = '« Previous';
        prevBtn.disabled = this.currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (this.previousPage()) {
                this.onPageChange && this.onPageChange();
            }
        });
        container.appendChild(prevBtn);

        // Page buttons
        const maxButtons = 10;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(this.totalPages, startPage + maxButtons - 1);

        // Adjust start if we're near the end
        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        // First page button
        if (startPage > 1) {
            const firstBtn = this.createPageButton(1);
            container.appendChild(firstBtn);
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.className = 'page-dots';
                dots.style.padding = '0.5rem';
                container.appendChild(dots);
            }
        }

        // Middle page buttons
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = this.createPageButton(i);
            container.appendChild(pageBtn);
        }

        // Last page button
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.className = 'page-dots';
                dots.style.padding = '0.5rem';
                container.appendChild(dots);
            }
            const lastBtn = this.createPageButton(this.totalPages);
            container.appendChild(lastBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.textContent = 'Next »';
        nextBtn.disabled = this.currentPage === this.totalPages;
        nextBtn.addEventListener('click', () => {
            if (this.nextPage()) {
                this.onPageChange && this.onPageChange();
            }
        });
        container.appendChild(nextBtn);

        // Update page info
        this.updatePageInfo();
    }

    createPageButton(pageNumber) {
        const btn = document.createElement('button');
        btn.className = 'page-btn';
        if (pageNumber === this.currentPage) {
            btn.classList.add('active');
        }
        btn.textContent = pageNumber;
        btn.addEventListener('click', () => {
            if (this.goToPage(pageNumber)) {
                this.onPageChange && this.onPageChange();
            }
        });
        return btn;
    }

    updatePageInfo() {
        const infoElement = document.querySelector('#pageInfo');
        if (!infoElement) return;

        const info = this.getPageInfo();
        if (info.total === 0) {
            infoElement.textContent = 'No entries';
        } else {
            infoElement.textContent = `${info.startIndex} to ${info.endIndex} of ${info.total} entries`;
        }
    }

    setPageChangeCallback(callback) {
        this.onPageChange = callback;
    }
}

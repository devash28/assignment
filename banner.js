(function() {
    const apiUrl = "http://localhost/assignment/banner.php";

    // Get script tag attributes
    const scriptTag = document.currentScript;
    const width = scriptTag.getAttribute("data-width") || "300px";
    const height = scriptTag.getAttribute("data-height") || "250px";
    const position = scriptTag.getAttribute("data-position") || "bottom-right";

    fetch(`${apiUrl}?width=${encodeURIComponent(width)}&height=${encodeURIComponent(height)}&position=${encodeURIComponent(position)}`)
        .then(response => response.json())
        .then(data => {
            if (!data.image || !data.link) {
                console.warn("Banner data is incomplete.");
                return;
            }

            // Create banner container
            const banner = document.createElement("div");
            banner.style.cssText = `
                position: fixed;
                width: ${data.width};
                height: ${data.height};
                z-index: 9999;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                border-radius: 8px;
                overflow: hidden;
                transition: transform 0.3s ease-in-out;
            `;

            // Set position styles
            const positions = {
                "bottom-right": { bottom: "10px", right: "10px" },
                "bottom-left": { bottom: "10px", left: "10px" },
                "top-right": { top: "10px", right: "10px" },
                "top-left": { top: "10px", left: "10px" }
            };

            Object.assign(banner.style, positions[data.position] || positions["bottom-right"]);

            // Create clickable link
            const link = document.createElement("a");
            link.href = data.link;
            link.target = "_blank";
            link.style.display = "block";
            link.style.width = "100%";
            link.style.height = "100%";

            // Create image element
            const img = document.createElement("img");
            img.src = data.image;
            img.alt = data.alt;
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
            `;

            // Create close button
            const closeButton = document.createElement("span");
            closeButton.innerHTML = "&times;";
            closeButton.style.cssText = `
                position: absolute;
                top: 5px;
                right: 10px;
                font-size: 18px;
                color: white;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 50%;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: 0.2s;
            `;

            closeButton.addEventListener("mouseover", () => {
                closeButton.style.background = "red";
            });

            closeButton.addEventListener("mouseout", () => {
                closeButton.style.background = "rgba(0, 0, 0, 0.6)";
            });

            closeButton.addEventListener("click", (e) => {
                e.stopPropagation();
                banner.style.transform = "scale(0)";
                setTimeout(() => banner.remove(), 300);
            });

            // Assemble elements
            link.appendChild(img);
            banner.appendChild(link);
            banner.appendChild(closeButton);
            document.body.appendChild(banner);
        })
        .catch(error => console.error("Banner loading error:", error));
})();

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Section1: React.FC<section1Props> = ({ btnTitle }) => {
  return (
    <section className="dark:bg-gray-900">
      <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="Scribble-19.svg"
        >
          <path
            d="M38.634 119.639C33.7504 117.978 28.8668 116.316 23.9831 114.655C23.4927 116.896 23.0056 119.141 22.5187 121.383C32.9629 122.792 43.4382 126.574 53.9792 131.748C64.5235 136.921 75.1162 143.477 85.7849 150.339C96.4605 157.205 107.205 164.376 118.119 170.755C129.036 177.13 140.123 182.732 151.572 186.366C152.684 186.718 153.893 186.69 154.991 186.341C156.09 185.993 157.078 185.309 157.789 184.404C158.504 183.499 158.939 182.38 159.019 181.23C159.101 180.08 158.846 178.898 158.159 177.762C155.375 173.148 151.69 168.517 147.314 163.792C142.941 159.074 137.868 154.27 132.3 149.41C121.162 139.695 108.02 129.738 94.5367 120.005C81.0531 110.276 67.2243 100.774 54.7804 92.0397C42.3468 83.3155 31.2706 75.327 23.4927 68.827C21.8556 67.4627 19.6866 66.8238 17.5901 67.0068C15.4937 67.1726 13.4802 68.181 12.0884 69.7594C10.6861 71.3274 9.92622 73.4445 10.0057 75.5444C10.0747 77.6478 10.9623 79.727 12.6754 81.3433C28.6491 96.4156 47.6828 112.438 67.8425 126.995C88.0125 141.549 109.281 154.646 129.934 163.833C131.855 164.686 133.972 164.856 135.951 164.424C137.93 164.002 139.767 162.953 141.135 161.46C142.51 159.979 143.404 158.059 143.667 156.055C143.936 154.049 143.594 151.949 142.503 149.953C136.4 138.783 127.862 129.499 118.375 121.269C108.877 113.035 98.3773 105.803 87.9642 98.7918C77.5545 91.791 67.2244 85.0079 58.0719 77.9069C48.9091 70.8129 40.9654 63.4148 35.0974 55.3745C31.7714 61.1768 28.4419 66.9792 25.1159 72.7781C26.6597 72.9473 29.2225 73.5966 32.324 74.7985C35.4323 75.9935 39.1003 77.7135 43.1067 79.8583C51.1367 84.1444 60.5241 90.1022 70.319 96.844C80.1242 103.589 90.3645 111.122 100.284 118.603C105.24 122.343 110.12 126.073 114.831 129.689C119.542 133.302 124.077 136.814 128.37 140.089C132.936 143.567 137.232 146.778 141.156 149.628C145.076 152.481 148.619 154.971 151.724 157.029C154.27 158.715 157.047 159.253 159.658 158.822C162.269 158.407 164.703 156.998 166.365 154.94C168.04 152.895 168.921 150.222 168.789 147.58C168.675 144.938 167.58 142.33 165.726 140.5C151.893 126.84 136.393 115.08 120.996 103.534C105.596 91.9982 90.2507 80.6388 76.7223 68.036C66.9308 58.9215 58.1063 49.1991 50.7463 38.6444C47.144 43.0342 43.5453 47.4205 39.943 51.8102C54.7631 59.1806 69.4692 68.3399 84.0165 78.3005C98.5672 88.2647 112.976 99.0302 127.282 109.63C139.311 118.547 151.109 127.558 162.583 136.21C164.755 137.847 167.315 138.572 169.819 138.445C172.323 138.327 174.775 137.329 176.643 135.657C178.522 134 179.803 131.682 180.211 129.209C180.636 126.74 180.214 124.111 178.871 121.804C166.834 101.175 149.624 82.2759 131.368 64.748C113.108 47.2409 93.7389 31.136 77.3749 16.6681C75.3855 14.9102 72.9749 14.0363 70.5642 14.0017C68.1534 13.9568 65.7392 14.7789 63.8603 16.2882C61.9711 17.7871 60.6311 19.9595 60.1442 22.3184C59.6399 24.6774 59.9576 27.2194 61.1698 29.4402C67.1345 40.3575 75.5237 49.6862 85.0147 58.0616C94.5229 66.4301 105.185 73.8729 116.029 80.8737C126.871 87.8675 137.899 94.4124 148.105 100.829C158.307 107.24 167.684 113.539 175.151 119.843C183.129 126.577 195.335 112.337 187.453 105.492C178.912 98.0734 168.972 91.2315 158.57 84.4656C148.174 77.7065 137.308 71.0374 126.982 64.1575C116.655 57.2845 106.874 50.1973 98.6709 42.7613C90.4544 35.3288 83.868 27.575 79.6129 19.507C74.2112 23.7655 68.8096 28.0206 63.4079 32.2791C79.9342 47.2477 98.8747 63.3804 116.268 80.3591C133.661 97.3137 149.445 115.145 159.682 132.929C165.111 128.128 170.54 123.327 175.97 118.527C164.593 109.878 152.753 100.795 140.544 91.7428C126.032 80.9739 110.776 70.5469 95.1377 61.0491C79.499 51.5512 63.4907 42.972 47.3858 35.8883C45.3135 34.9765 43.3001 34.8592 41.4523 35.3461C39.6011 35.8228 37.9191 36.9245 36.7483 38.4338C35.5636 39.9327 34.897 41.8288 34.8797 43.7387C34.8486 45.6487 35.4461 47.5793 36.5859 49.0575C45.3135 60.379 55.1845 70.4985 65.5009 80.0966C79.7477 93.3452 94.8717 105.668 109.464 118.016C124.053 130.352 138.071 142.675 150.111 155.662C154.777 150.149 159.443 144.641 164.11 139.132C161.46 137.205 158.197 134.718 154.487 131.848C150.778 128.974 146.613 125.714 142.098 122.219C137.85 118.931 133.295 115.432 128.553 111.795C123.807 108.162 118.865 104.401 113.819 100.612C103.72 93.0378 93.2036 85.3635 82.939 78.3869C72.6675 71.4103 62.6722 65.1314 53.4437 60.2996C48.8226 57.882 44.3949 55.8201 40.1157 54.221C35.8296 52.6253 31.7161 51.458 27.4748 51.0021C25.2023 50.7569 23.0713 51.2128 21.2235 52.1833C19.3723 53.1469 17.8078 54.6527 16.7786 56.4659C15.7425 58.2791 15.2417 60.3894 15.3556 62.4754C15.4661 64.5581 16.1604 66.6268 17.4901 68.4055C25.23 78.753 34.8314 87.2976 45.0096 94.9926C55.1948 102.681 66.0018 109.533 76.3769 116.296C86.752 123.048 96.692 129.71 105.136 136.787C113.598 143.864 120.513 151.31 125.227 159.571C129.416 154.943 133.606 150.319 137.795 145.691C118.741 137.667 98.1182 125.634 78.3765 112.054C58.6244 98.474 39.715 83.3465 23.876 69.1619C20.2703 73.334 16.668 77.5063 13.0623 81.6784C21.783 88.5721 33.2807 96.3776 46.0596 104.836C58.8316 113.284 72.8575 122.353 86.4446 131.568C100.025 140.779 113.163 150.142 124.087 159.108C129.548 163.588 134.452 167.967 138.569 172.143C142.686 176.315 146.008 180.294 148.322 183.875C150.519 181.009 152.712 178.142 154.909 175.272C144.589 172.36 133.993 167.477 123.255 161.643C112.514 155.817 101.634 149.058 90.6616 142.486C79.6855 135.916 68.6092 129.534 57.4017 124.478C46.1942 119.421 34.8418 115.691 23.327 114.513C22.3772 114.417 21.5171 114.676 20.8471 115.183C20.1736 115.684 19.6935 116.441 19.5312 117.266C19.3619 118.088 19.5105 118.972 19.9388 119.694C20.3601 120.423 21.0543 120.993 21.8625 121.238C26.7979 122.74 31.7334 124.239 36.6688 125.742C38.2748 126.229 39.9016 125.082 40.3885 123.573C40.8721 122.06 40.2227 120.181 38.634 119.639Z"
            fill="black"
          />
        </svg>
       
        
        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Let&apos;s create more tools and ideas that brings us together.
          </h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            quidem possimus dolorum sed est facilis eaque laborum. Vitae ea unde
            eaque, ex molestiae labore sint aperiam reprehenderit officia
            voluptatum esse!
          </p>
          <Button className="bg-coopBlue hover:bg-coopBlueHover">{btnTitle}</Button>
        </div>
      </div>
    </section>
  );
};

export default Section1;

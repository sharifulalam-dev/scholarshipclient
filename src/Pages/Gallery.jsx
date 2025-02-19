import React from "react";

export default function Gallery() {
  return (
    <div className="bg-white py-10">
      <section className="mx-auto max-w-7xl px-6">
        <h1 className="text-4xl font-bold text-center text-[#2A3B69] mb-12">
          Scholarship Journey Gallery
        </h1>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Graduation Image 1 */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1000w,f_auto,q_auto:best/rockcms/2023-04/graduation-captions-a86b0b.jpg"
              alt="Graduation Ceremony"
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Graduation Image 2 */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://www.nationalgridus.com/News/easset_upload_file54627_268504_e.jpeg"
              alt="Convocation Ceremony"
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Graduation Image 3 */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Convocation_of_UIU%2C_2015.jpg"
              alt="UIU Convocation"
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Graduation Image 4 */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://res.cloudinary.com/iugroup/image/upload/q_auto:eco,c_fill,dpr_auto,w_1980,f_avif,ar_2:1,g_face/2012-graduierung-hero_rbppbm_w4yajg.jpg"
              alt="Graduation Celebration"
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Graduation Image 5 */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://a.storyblok.com/f/207087/1500x700/42b939d0cf/xx-xx_0687_blog-images-for-july-to-upload-in-august_image37_graduation-messages-quotes_1500x700.jpg/m/1500x0/filters:quality(80)"
              alt="Graduation Quotes"
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Graduation Image 6 */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/14249312/763935_420379.png"
              alt="Graduation Ceremony Image"
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Graduation Image 7 */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://res.cloudinary.com/iugroup/image/upload/q_auto:eco,c_fill,dpr_auto,w_1220,f_avif,ar_16:9,g_face/53284357681_133eed975f_k_hagpir.jpg"
              alt="Graduation Group"
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Graduation Image 8 */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://www.universitiesuk.ac.uk/sites/default/files/styles/content_banner_on_desktop/public/image-upload/getti/AdobeStock_238059405.jpeg?h=c26f8f47&itok=7F6qtP7t"
              alt="University Students"
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

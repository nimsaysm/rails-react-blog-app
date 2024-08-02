class ApplicationController < ActionController::API

  private 

  def argument_with_image(post)
    if post.image.attached?
      # if the post contains a image, add image_url to the post object in JSON
      post.as_json.merge(image_url: url_for(post.image))
    else
      post.as_json.merge(image_url: nil)
    end
  end

  def paginate_posts(posts, posts_per_page)
    # page() -> selects the page extracted to HTTP params[:page]
    # per() -> use the number of posts per page to limit it 
    paginated_posts = posts.page(params[:page]).per(posts_per_page)

    # for each post transform it with argument_with_image()
    paginated_posts.map { |post| argument_with_image(post) }
  end
end

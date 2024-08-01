class ApplicationController < ActionController::API

  private 

  def argument_with_image(post)
    if post.image.attached?
      post.as_json.merge(image_url: url_for(post.image))
    else
      post.as_json.merge(image_url: nil)
    end
  end

  def paginate_posts(posts, posts_per_page)
    paginated_posts = posts.page(params[:page]).per(posts_per_page)
    paginated_posts.map { |post| argument_with_image(post) }
  end
end

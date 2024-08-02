class Post < ApplicationRecord
  # it is possible to use images due to active storage
  has_one_attached :image
  validates :title, presence: true
end

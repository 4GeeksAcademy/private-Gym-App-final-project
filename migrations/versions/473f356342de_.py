"""empty message

Revision ID: 473f356342de
Revises: 5314efc9145b
Create Date: 2024-01-02 11:32:51.957101

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '473f356342de'
down_revision = '5314efc9145b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trainer', schema=None) as batch_op:
        batch_op.alter_column('id_user',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trainer', schema=None) as batch_op:
        batch_op.alter_column('id_user',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###